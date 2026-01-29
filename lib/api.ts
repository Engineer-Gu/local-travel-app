import axios from "axios"
import { APP_CONSTANTS } from "@/lib/constants"

// 创建axios实例
export const api = axios.create({
  baseURL: APP_CONSTANTS.API_BASE_URL, // 使用常量，不再依赖环境变量
  timeout: APP_CONSTANTS.API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = localStorage.getItem("token")

    // 如果有token则添加到请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // 后端返回ResultUtil格式：{code, message, data, timestamp, traceId}
    const result = response.data

    // 检查业务错误码，200表示成功
    if (result.code !== 200) {
      const msg = (result.message || "").toLowerCase();

      // 处理认证相关错误：
      // 1. code为401或403
      // 2. 消息包含token/auth/认证/登录等关键词
      if (
        result.code == 401 ||
        result.code == 403 ||
        msg.includes("token") ||
        msg.includes("auth") ||
        msg.includes("认证") ||
        msg.includes("登录")
      ) {
        console.log("检测到认证失效:", result);

        // 清除本地认证信息
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("user")

        // 触发认证失效事件，由MobileApp组件监听并处理跳转
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("auth:unauthorized"))
          // 返回一个永远pending的promise，中断后续错误处理
          return new Promise(() => { })
        }
      }

      // 业务错误，抛出错误信息
      return Promise.reject(new Error(result.message || "请求失败"))
    }

    // 返回完整的ResultUtil对象，让业务层可以访问data字段
    return result
  },
  (error) => {
    // 处理HTTP错误响应
    if (error.response) {
      const { status, data } = error.response

      // 处理401未授权错误 (HTTP状态码)
      if (status === 401) {
        // 清除本地认证信息
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("user")

        // 触发认证失效事件，由MobileApp组件监听并处理跳转
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("auth:unauthorized"))
          // 返回一个永远pending的promise，中断后续错误处理
          return new Promise(() => { })
        }
      }

      // 返回错误信息，优先使用后端返回的message
      const errorMessage = data?.message || data?.data || "请求失败"
      return Promise.reject(new Error(errorMessage))
    }

    // 网络错误或其他错误
    return Promise.reject(new Error("网络错误，请检查您的网络连接"))
  },
)

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
    // 直接返回响应数据
    return response.data
  },
  (error) => {
    // 处理错误响应
    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response

      // 处理401未授权错误
      if (status === 401) {
        // 清除本地token
        localStorage.removeItem("token")
        localStorage.removeItem("user")

        // 如果不是登录页面，可以重定向到登录页
        if (window.location.pathname !== "/login") {
          // 在实际应用中，这里可能需要使用路由导航
          // 由于这是组件内的代码，这里只是示例
          console.error("登录已过期，请重新登录")
        }
      }

      // 返回错误信息
      return Promise.reject(new Error(data.message || "请求失败"))
    }

    // 网络错误或其他错误
    return Promise.reject(new Error("网络错误，请检查您的网络连接"))
  },
)

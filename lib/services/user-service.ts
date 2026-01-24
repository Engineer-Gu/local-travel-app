/**
 * 用户服务
 * 处理与用户相关的API请求
 */

import { api } from "@/lib/api"

/**
 * 用户信息接口（与后端UserResponse对应）
 */
export interface User {
  id: number
  phone: string
  nickname?: string
  avatar?: string
  gender?: string
  birthday?: string
  city?: string
  bio?: string
  isVerified?: number
  level?: number
  points?: number
  balance?: number
  accountStatus?: number
  lastLoginTime?: string
  gmtCreate?: string
}

/**
 * 登录请求接口
 */
export interface LoginRequest {
  phone: string
  password: string
}

/**
 * 登录响应接口
 */
export interface LoginResponse {
  token: string
  refreshToken: string
  userInfo: User
  expiresIn: number
}

/**
 * 注册请求接口
 */
export interface RegisterRequest {
  phone: string
  code: string
  password: string
  nickname?: string
  inviteCode?: string
}

/**
 * 发送验证码请求接口
 */
export interface SendCodeRequest {
  phone: string
  codeType: string
}

/**
 * 更新用户信息请求接口
 */
export interface UpdateProfileRequest {
  nickname?: string
  gender?: string
  birthday?: string
  city?: string
  bio?: string
}

/**
 * 修改密码请求接口
 */
export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

/**
 * 重置密码请求接口
 */
export interface ResetPasswordRequest {
  phone: string
  code: string
  newPassword: string
}

/**
 * 实名认证请求接口
 */
export interface VerificationRequest {
  realName: string
  idNumber: string
  idFrontImage: string
  idBackImage: string
}

/**
 * 用户兴趣标签接口（与后端UserInterestResponse对应）
 */
export interface UserInterest {
  id: number
  userId: number
  tagName: string
  tagCategory: string
  gmtCreate?: string
  gmtModified?: string
}

/**
 * 添加用户兴趣标签请求接口
 */
export interface AddUserInterestRequest {
  tagName: string
  tagCategory: string
}

/**
 * 批量更新用户兴趣标签请求接口
 */
export interface UpdateUserInterestsRequest {
  interests: Array<{
    tagName: string
    tagCategory: string
  }>
}

/**
 * API统一响应接口
 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
  traceId?: string
}

/**
 * 用户服务类
 */
export const userService = {
  /**
   * 用户登录（密码登录）
   * @param phone - 手机号
   * @param password - 密码
   * @returns Promise with login response
   */
  async login(phone: string, password: string): Promise<LoginResponse> {
    const response: ApiResponse<LoginResponse> = await api.post("/api/auth/login", {
      phone,
      password,
    })
    return response.data
  },

  /**
   * 发送验证码
   * @param phone - 手机号
   * @param codeType - 验证码类型：register/login/reset_password
   * @returns Promise
   */
  async sendCode(phone: string, codeType: string): Promise<void> {
    await api.post("/api/auth/sendCode", {
      phone,
      codeType,
    })
  },

  /**
   * 用户注册
   * @param data - 注册数据
   * @returns Promise with userId
   */
  async register(data: RegisterRequest): Promise<number> {
    const response: ApiResponse<number> = await api.post("/api/auth/register", data)
    return response.data
  },

  /**
   * 用户登出
   * @returns Promise
   */
  async logout(): Promise<void> {
    await api.post("/api/auth/logout")
  },

  /**
   * 刷新Token
   * @param refreshToken - 刷新令牌
   * @returns Promise with new token
   */
  async refreshToken(refreshToken: string): Promise<string> {
    const response: ApiResponse<string> = await api.post("/api/auth/refreshToken", null, {
      params: { refreshToken },
    })
    return response.data
  },

  /**
   * 修改密码
   * @param data - 修改密码数据
   * @returns Promise
   */
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await api.post("/api/auth/changePassword", data)
  },

  /**
   * 重置密码
   * @param data - 重置密码数据
   * @returns Promise
   */
  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await api.post("/api/auth/resetPassword", data)
  },

  /**
   * 获取用户信息
   * @returns Promise with user info
   */
  async getProfile(): Promise<User> {
    const response: ApiResponse<User> = await api.get("/api/user/info")
    return response.data
  },

  /**
   * 更新用户信息
   * @param data - 更新数据
   * @returns Promise with updated user info
   */
  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    const response: ApiResponse<User> = await api.post("/api/user/update", data)
    return response.data
  },

  /**
   * 用户签到
   * @returns Promise with checkin result
   */
  async checkin(): Promise<{
    success: boolean
    continuousDays: number
    totalDays: number
    pointsEarned: number
    totalPoints: number
    message: string
  }> {
    const response: ApiResponse<any> = await api.post("/api/user/checkin")
    return response.data
  },

  /**
   * 提交实名认证
   * @param data - 实名认证数据
   * @returns Promise
   */
  async submitVerification(data: VerificationRequest): Promise<void> {
    await api.post("/api/user/verification/submit", data)
  },

  /**
   * 上传头像
   * @param base64Data - 头像Base64数据
   * @returns Promise with updated user info
   */
  async uploadAvatar(base64Data: string): Promise<User> {
    const response: ApiResponse<User> = await api.post("/api/user/avatar/upload", {
      base64Data,
    })
    return response.data
  },

  // ==================== 兴趣标签相关接口 ====================

  /**
   * 获取用户兴趣标签列表
   * @returns Promise with user interests list
   */
  async getInterests(): Promise<UserInterest[]> {
    const response: ApiResponse<UserInterest[]> = await api.get("/api/user/interest/list")
    return response.data
  },

  /**
   * 按分类获取用户兴趣标签列表
   * @param tagCategory - 标签分类
   * @returns Promise with user interests list
   */
  async getInterestsByCategory(tagCategory: string): Promise<UserInterest[]> {
    const response: ApiResponse<UserInterest[]> = await api.get("/api/user/interest/listByCategory", {
      params: { tagCategory },
    })
    return response.data
  },

  /**
   * 添加用户兴趣标签
   * @param tagName - 标签名称
   * @param tagCategory - 标签分类
   * @returns Promise with added interest
   */
  async addInterest(tagName: string, tagCategory: string): Promise<UserInterest> {
    const response: ApiResponse<UserInterest> = await api.post("/api/user/interest/add", {
      tagName,
      tagCategory,
    })
    return response.data
  },

  /**
   * 删除用户兴趣标签
   * @param interestId - 兴趣标签ID
   * @returns Promise
   */
  async deleteInterest(interestId: number): Promise<void> {
    await api.post("/api/user/interest/delete", null, {
      params: { interestId },
    })
  },

  /**
   * 批量更新用户兴趣标签
   * @param interests - 兴趣标签列表
   * @returns Promise with updated interests list
   */
  async updateInterests(interests: Array<{ tagName: string; tagCategory: string }>): Promise<UserInterest[]> {
    const response: ApiResponse<UserInterest[]> = await api.post("/api/user/interest/update", {
      interests,
    })
    return response.data
  },
}

/**
 * 认证工具类
 */
export const authService = {
  /**
   * 保存认证信息到本地存储
   * @param token - 访问令牌
   * @param refreshToken - 刷新令牌
   * @param user - 用户信息
   */
  saveAuth(token: string, refreshToken: string, user: User): void {
    localStorage.setItem("token", token)
    localStorage.setItem("refreshToken", refreshToken)
    localStorage.setItem("user", JSON.stringify(user))
  },

  /**
   * 从本地存储获取认证信息
   * @returns 认证信息
   */
  getAuth(): { token: string | null; refreshToken: string | null; user: User | null } {
    const token = localStorage.getItem("token")
    const refreshToken = localStorage.getItem("refreshToken")
    const userStr = localStorage.getItem("user")
    const user = userStr ? JSON.parse(userStr) : null
    return { token, refreshToken, user }
  },

  /**
   * 清除认证信息
   */
  clearAuth(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
  },

  /**
   * 检查是否已登录
   * @returns 是否已登录
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem("token")
    return token !== null && token !== ""
  },

  /**
   * 获取当前用户信息
   * @returns 用户信息
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  },
}

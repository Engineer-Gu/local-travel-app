/**
 * 用户服务
 * 处理与用户相关的API请求
 */

import { api } from "@/lib/api"

export interface User {
  id: string
  username: string
  nickname?: string
  avatar?: string
  gender?: number
  birthday?: string
  location?: string
  bio?: string
  email?: string
  phone?: string
  profileCompletion?: number
}

export interface UpdateProfileRequest {
  nickname?: string
  gender?: number
  birthday?: string
  location?: string
  bio?: string
}

export interface LocalPlayer {
  id: string
  name: string
  avatar: string
  bio: string
  routes: number
}

// Add these new interfaces for nearby players functionality
export interface NearbyPlayer extends LocalPlayer {
  distance?: string
  lastActive?: string
  interests?: string[]
  compatibility?: number
  isOnline?: boolean
}

export interface NearbyPlayersFilter {
  radius?: number
  interests?: string[]
  gender?: number
  ageRange?: [number, number]
  onlineOnly?: boolean
  withRoutes?: boolean
}

// 兴趣匹配相关接口
export interface InterestMatch {
  userId: string
  username: string
  nickname?: string
  avatar?: string
  matchedInterests: string[]
  compatibilityScore: number
  commonRoutes?: number
  commonDestinations?: string[]
}

export interface InterestCategory {
  id: string
  name: string
  icon?: string
  interests: string[]
}

export interface InterestRecommendation {
  interest: string
  category: string
  popularity: number
  relatedInterests: string[]
}

// 徽章相关接口
export interface Badge {
  id: string
  name: string
  icon: string
  description: string
  category: string
  color: string
  level?: number
  maxLevel?: number
  progress?: number
  earnedDate?: string
  currentValue?: number
  targetValue?: number
  requirement?: string
  isLocked?: boolean
}

export interface BadgeFilter {
  category?: string
  searchText?: string
  sortBy?: "name" | "earnedDate" | "level" | "progress"
  sortOrder?: "asc" | "desc"
  status?: "earned" | "progress" | "locked" | "all"
}

export interface BadgeStats {
  totalBadges: number
  earnedBadges: number
  inProgressBadges: number
  lockedBadges: number
  completionRate: number
  topCategory?: string
  recentlyEarned?: Badge
  nextToEarn?: Badge
  badgesByCategory?: Record<string, number>
}

// 收藏相关接口
export interface FavoriteItem {
  id: string
  type: "route" | "place" | "guide" | "diary" | "product"
  title: string
  image?: string
  tags?: string[]
  date: string
  description?: string
  rating?: number
  location?: string
  price?: string
  author?: {
    id: string
    name: string
    avatar?: string
  }
}

export interface FavoriteFilter {
  type?: "route" | "place" | "guide" | "diary" | "product" | "all"
  searchText?: string
  sortBy?: "date" | "title" | "rating"
  sortOrder?: "asc" | "desc"
  tags?: string[]
}

export interface FavoriteStats {
  totalFavorites: number
  favoritesByType: Record<string, number>
  recentlyAdded?: FavoriteItem
  mostViewed?: FavoriteItem
}

// 去过的城市相关接口
/* export interface VisitedCity {
  id: string
  name: string
  image?: string
  visitDate: string
  visitCount: number
  rating: number
  attractions: string[]
  tags: string[]
  notes?: string
  latitude?: number
  longitude?: number
  country?: string
  province?: string
  photos?: number
  expenses?: number
  duration?: number
} */

/* export interface VisitedCityFilter {
  searchText?: string
  sortBy?: 'date' | 'rating' | 'visitCount' | 'name'
  sortOrder?: 'asc' | 'desc'
  tags?: string[]
  dateRange?: [string, string]
  ratingRange?: [number, number]
} */

/* export interface VisitedCityStats {
  totalCities: number
  totalVisits: number
  averageRating: number
  mostVisitedCity?: string
  topRatedCity?: string
  totalPhotos?: number
  totalExpenses?: number
  totalDuration?: number
  visitsByMonth?: Record<string, number>
  visitsByYear?: Record<string, number>
  visitsByProvince?: Record<string, number>
  visitsByCountry?: Record<string, number>
} */

// 完成的路线相关接口
/* export interface CompletedRoute {
  id: string
  title: string
  image?: string
  completionDate: string
  duration: string
  distance: string
  rating: number
  stops: string[]
  tags: string[]
  companions: number
  photos: number
  notes?: string
  startLocation?: string
  endLocation?: string
  expenses?: number
  weather?: string
  transportation?: string[]
  difficulty?: number
  recommendationScore?: number
} */

/* export interface CompletedRouteFilter {
  searchText?: string
  sortBy?: 'date' | 'rating' | 'distance' | 'duration' | 'companions' | 'photos'
  sortOrder?: 'asc' | 'desc'
  tags?: string[]
  dateRange?: [string, string]
  ratingRange?: [number, number]
  distanceRange?: [number, number]
  durationRange?: [string, string]
  companionsRange?: [number, number]
} */

/* export interface CompletedRouteStats {
  totalRoutes: number
  totalDistance: number
  totalPhotos: number
  averageRating: number
  totalDuration?: string
  totalCompanions?: number
  totalExpenses?: number
  routesByMonth?: Record<string, number>
  routesByYear?: Record<string, number>
  routesByTag?: Record<string, number>
  mostVisitedStop?: string
  longestRoute?: string
  shortestRoute?: string
} */

export const userService = {
  /**
   * 获取用户资料
   * @returns Promise with user profile
   */
  async getProfile(): Promise<User> {
    return api.get("/users/profile")
  },

  /**
   * 更新用户资料
   * @param data - 更新的资料数据
   * @returns Promise with updated profile
   */
  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    return api.put("/users/profile", data)
  },

  /**
   * 上传头像
   * @param formData - 包含头像文件的FormData
   * @returns Promise with avatar URL
   */
  async uploadAvatar(formData: FormData) {
    return api.upload("/users/avatar", formData)
  },

  /**
   * 获取用户兴趣标签
   * @returns Promise with user interests
   */
  async getInterests() {
    return api.get("/users/interests")
  },

  /**
   * 更新用户兴趣标签
   * @param interests - 兴趣标签数组
   * @returns Promise with updated interests
   */
  async updateInterests(interests: string[]) {
    return api.put("/users/interests", { interests })
  },

  /**
   * 获取本地玩家推荐
   * @returns Promise with local players
   */
  async getLocalPlayers(): Promise<LocalPlayer[]> {
    return api.get("/users/local-players")
  },

  // Add these new methods to the userService object after the getLocalPlayers method

  /**
   * 用户登录
   * @param email - 邮箱或手机号
   * @param password - 密码
   * @returns Promise with login result
   */
  /* async login(email: string, password: string): Promise<{ token: string; user: User }> {
    return api.post("/auth/login", { email, password })
  }, */

  /**
   * 手机验证码登录
   * @param phone - 手机号
   * @param code - 验证码
   * @returns Promise with login result
   */
  /* async loginWithPhone(phone: string, code: string): Promise<{ token: string; user: User }> {
    return api.post("/auth/login/phone", { phone, code })
  }, */

  /**
   * 用户注册
   * @param userData - 用户注册数据
   * @returns Promise with registration result
   */
  /* async register(userData: {
    username: string;
    email: string;
    phone: string;
    password: string;
    verificationCode: string;
  }): Promise<{ success: boolean; message: string }> {
    return api.post("/auth/register", userData)
  }, */

  /**
   * 用户登出
   * @returns Promise with logout result
   */
  /* async logout(): Promise<{ success: boolean }> {
    return api.post("/auth/logout")
  }, */

  /**
   * 发送登录验证码
   * @param phone - 手机号
   * @returns Promise with send result
   */
  /* async sendLoginCode(phone: string): Promise<{ success: boolean; message: string }> {
    return api.post("/auth/send-login-code", { phone })
  }, */

  /**
   * 发送注册验证码
   * @param phone - 手机号
   * @returns Promise with send result
   */
  /* async sendRegisterCode(phone: string): Promise<{ success: boolean; message: string }> {
    return api.post("/auth/send-register-code", { phone })
  }, */

  /**
   * 第三方登录
   * @param platform - 平台（微信/QQ/微博等）
   * @param authCode - 授权码
   * @returns Promise with login result
   */
  /* async thirdPartyLogin(platform: string, authCode: string): Promise<{ token: string; user: User; isNewUser: boolean }> {
    return api.post("/auth/third-party", { platform, authCode })
  }, */

  // Add these new methods to the userService object after the getLocalPlayers method
  /**
   * 获取附近的玩家
   * @param lat - 纬度
   * @param lng - 经度
   * @param filter - 筛选条件
   * @returns Promise with nearby players
   */
  /* async getNearbyPlayers(lat: number, lng: number, filter?: NearbyPlayersFilter): Promise<NearbyPlayer[]> {
    return api.get("/users/nearby", {
      params: {
        lat,
        lng,
        radius: filter?.radius || 5,
        interests: filter?.interests?.join(","),
        gender: filter?.gender,
        minAge: filter?.ageRange?.[0],
        maxAge: filter?.ageRange?.[1],
        onlineOnly: filter?.onlineOnly,
        withRoutes: filter?.withRoutes,
      },
    })
  }, */

  /**
   * 发送好友请求给附近玩家
   * @param userId - 目标用户ID
   * @param message - 附加消息
   * @returns Promise with request status
   */
  /* async sendFriendRequest(userId: string, message?: string) {
    return api.post("/social/friend-requests", { userId, message })
  }, */

  /**
   * 获取与附近玩家的兴趣匹配度
   * @param userId - 目标用户ID
   * @returns Promise with compatibility score and matching interests
   */
  /* async getCompatibilityScore(userId: string) {
    return api.get(`/social/compatibility/${userId}`)
  }, */

  /**
   * 邀请附近玩家加入行程
   * @param userId - 目标用户ID
   * @param itineraryId - 行程ID
   * @param message - 邀请消息
   * @returns Promise with invitation status
   */
  /* async inviteToItinerary(userId: string, itineraryId: string, message?: string) {
    return api.post("/social/invitations", { userId, itineraryId, message })
  }, */

  /**
   * 向附近玩家发起聊天
   * @param userId - 目标用户ID
   * @returns Promise with chat session info
   */
  /* async startChat(userId: string) {
    return api.post("/social/chats", { userId })
  }, */

  /**
   * 获取附近的活动和聚会
   * @param lat - 纬度
   * @param lng - 经度
   * @param radius - 半径（公里）
   * @returns Promise with nearby events
   */
  /* async getNearbyEvents(lat: number, lng: number, radius = 5) {
    return api.get("/social/events/nearby", { params: { lat, lng, radius } })
  }, */

  // 兴趣匹配相关接口
  /**
   * 获取兴趣分类列表
   * @returns Promise with interest categories
   */
  /* async getInterestCategories(): Promise<InterestCategory[]> {
    return api.get("/interests/categories")
  }, */

  /**
   * 获取热门兴趣推荐
   * @returns Promise with popular interests
   */
  /* async getPopularInterests(): Promise<string[]> {
    return api.get("/interests/popular")
  }, */

  /**
   * 获取兴趣推荐
   * @param userInterests - 用户当前的兴趣
   * @returns Promise with recommended interests
   */
  /* async getInterestRecommendations(userInterests: string[]): Promise<InterestRecommendation[]> {
    return api.post("/interests/recommendations", { interests: userInterests })
  }, */

  /**
   * 根据兴趣匹配用户
   * @param interests - 兴趣标签数组
   * @param limit - 返回结果数量限制
   * @returns Promise with matched users
   */
  /* async matchUsersByInterests(interests: string[], limit = 10): Promise<InterestMatch[]> {
    return api.post("/social/match/interests", { interests, limit })
  }, */

  /**
   * 获取与特定用户的共同兴趣
   * @param userId - 目标用户ID
   * @returns Promise with common interests
   */
  /* async getCommonInterests(userId: string): Promise<string[]> {
    return api.get(`/social/common-interests/${userId}`)
  }, */

  /**
   * 获取基于兴趣的行程推荐
   * @param interests - 兴趣标签数组
   * @returns Promise with recommended routes
   */
  /* async getInterestBasedRoutes(interests: string[]) {
    return api.post("/routes/recommendations", { interests })
  }, */

  /**
   * 获取基于兴趣的活动推荐
   * @param interests - 兴趣标签数组
   * @returns Promise with recommended events
   */
  /* async getInterestBasedEvents(interests: string[]) {
    return api.post("/events/recommendations", { interests })
  }, */

  /**
   * 更新兴趣权重（用户对某些兴趣的偏好程度）
   * @param interestWeights - 兴趣权重对象，键为兴趣名称，值为权重
   * @returns Promise with updated weights
   */
  /* async updateInterestWeights(interestWeights: Record<string, number>) {
    return api.put("/users/interest-weights", { weights: interestWeights })
  }, */

  // 徽章相关接口
  /**
   * 获取用户徽章列表
   * @param filter - 筛选条件
   * @returns Promise with badges
   */
  /* async getBadges(filter?: BadgeFilter): Promise<Badge[]> {
    return api.get("/users/badges", { params: filter })
  }, */

  /**
   * 获取徽章详情
   * @param badgeId - 徽章ID
   * @returns Promise with badge details
   */
  /* async getBadgeDetail(badgeId: string): Promise<Badge> {
    return api.get(`/users/badges/${badgeId}`)
  }, */

  /**
   * 获取徽章统计数据
   * @returns Promise with badge statistics
   */
  /* async getBadgeStats(): Promise<BadgeStats> {
    return api.get("/users/badges/stats")
  }, */

  /**
   * 分享徽章
   * @param badgeId - 徽章ID
   * @param platform - 分享平台
   * @returns Promise with share status
   */
  /* async shareBadge(badgeId: string, platform: string) {
    return api.post(`/users/badges/${badgeId}/share`, { platform })
  }, */

  /**
   * 获取徽章获取条件
   * @param badgeId - 徽章ID
   * @returns Promise with badge requirements
   */
  /* async getBadgeRequirements(badgeId: string) {
    return api.get(`/users/badges/${badgeId}/requirements`)
  }, */

  /**
   * 获取徽章进度
   * @param badgeId - 徽章ID
   * @returns Promise with badge progress
   */
  /* async getBadgeProgress(badgeId: string) {
    return api.get(`/users/badges/${badgeId}/progress`)
  }, */

  /**
   * 获取徽章分类列表
   * @returns Promise with badge categories
   */
  /* async getBadgeCategories() {
    return api.get("/users/badges/categories")
  }, */

  /**
   * 获取最近获得的徽章
   * @param limit - 返回结果数量限制
   * @returns Promise with recently earned badges
   */
  /* async getRecentlyEarnedBadges(limit = 5): Promise<Badge[]> {
    return api.get("/users/badges/recent", { params: { limit } })
  }, */

  /**
   * 获取即将获得的徽章
   * @param limit - 返回结果数量限制
   * @returns Promise with badges close to earning
   */
  /* async getUpcomingBadges(limit = 5): Promise<Badge[]> {
    return api.get("/users/badges/upcoming", { params: { limit } })
  }, */

  /**
   * 获取徽章排行榜
   * @param category - 徽章分类
   * @returns Promise with badge leaderboard
   */
  /* async getBadgeLeaderboard(category?: string) {
    return api.get("/users/badges/leaderboard", { params: { category } })
  }, */

  // 收藏相关接口
  /**
   * 获取收藏列表
   * @param filter - 筛选条件
   * @returns Promise with favorites
   */
  /* async getFavorites(filter?: FavoriteFilter): Promise<FavoriteItem[]> {
    return api.get("/users/favorites", { params: filter })
  }, */

  /**
   * 获取收藏详情
   * @param favoriteId - 收藏ID
   * @returns Promise with favorite details
   */
  /* async getFavoriteDetail(favoriteId: string): Promise<FavoriteItem> {
    return api.get(`/users/favorites/${favoriteId}`)
  }, */

  /**
   * 添加收藏
   * @param item - 收藏项目信息
   * @returns Promise with added favorite
   */
  /* async addFavorite(item: Partial<FavoriteItem>) {
    return api.post("/users/favorites", item)
  }, */

  /**
   * 删除收藏
   * @param favoriteId - 收藏ID
   * @returns Promise with deletion status
   */
  /* async deleteFavorite(favoriteId: string) {
    return api.delete(`/users/favorites/${favoriteId}`)
  }, */

  /**
   * 获取收藏统计数据
   * @returns Promise with favorite statistics
   */
  /* async getFavoriteStats(): Promise<FavoriteStats> {
    return api.get("/users/favorites/stats")
  }, */

  /**
   * 检查项目是否已收藏
   * @param itemType - 项目类型
   * @param itemId - 项目ID
   * @returns Promise with favorite status
   */
  /* async checkFavoriteStatus(itemType: string, itemId: string): Promise<boolean> {
    return api.get(`/users/favorites/check`, { params: { type: itemType, id: itemId } })
  }, */

  /**
   * 批量删除收藏
   * @param favoriteIds - 收藏ID数组
   * @returns Promise with deletion status
   */
  /* async batchDeleteFavorites(favoriteIds: string[]) {
    return api.post("/users/favorites/batch-delete", { ids: favoriteIds })
  }, */

  /**
   * 分享收藏
   * @param favoriteId - 收藏ID
   * @param platform - 分享平台
   * @returns Promise with share status
   */
  /* async shareFavorite(favoriteId: string, platform: string) {
    return api.post(`/users/favorites/${favoriteId}/share`, { platform })
  }, */

  // 去过的城市相关接口
  /**
   * 获取去过的城市列表
   * @param filter - 筛选条件
   * @returns Promise with visited cities
   */
  /* async getVisitedCities(filter?: VisitedCityFilter) {
    return api.get("/users/visited-cities", { params: filter })
  }, */

  /**
   * 获取去过的城市详情
   * @param cityId - 城市ID
   * @returns Promise with city details
   */
  /* async getVisitedCityDetail(cityId: string) {
    return api.get(`/users/visited-cities/${cityId}`)
  }, */

  /**
   * 添加去过的城市
   * @param city - 城市信息
   * @returns Promise with added city
   */
  /* async addVisitedCity(city: Partial<VisitedCity>) {
    return api.post("/users/visited-cities", city)
  }, */

  /**
   * 更新去过的城市信息
   * @param cityId - 城市ID
   * @param city - 更新的城市信息
   * @returns Promise with updated city
   */
  /* async updateVisitedCity(cityId: string, city: Partial<VisitedCity>) {
    return api.put(`/users/visited-cities/${cityId}`, city)
  }, */

  /**
   * 删除去过的城市
   * @param cityId - 城市ID
   * @returns Promise with deletion status
   */
  /* async deleteVisitedCity(cityId: string) {
    return api.delete(`/users/visited-cities/${cityId}`)
  }, */

  /**
   * 获取去过的城市统计数据
   * @returns Promise with city statistics
   */
  /* async getVisitedCityStats(): Promise<VisitedCityStats> {
    return api.get("/users/visited-cities/stats")
  }, */

  /**
   * 上传城市照片
   * @param cityId - 城市ID
   * @param formData - 包含照片文件的FormData
   * @returns Promise with photo URL
   */
  /* async uploadCityPhoto(cityId: string, formData: FormData) {
    return api.upload(`/users/visited-cities/${cityId}/photos`, formData)
  }, */

  /**
   * 获取城市照片列表
   * @param cityId - 城市ID
   * @returns Promise with city photos
   */
  /* async getCityPhotos(cityId: string) {
    return api.get(`/users/visited-cities/${cityId}/photos`)
  }, */

  /**
   * 分享去过的城市
   * @param cityId - 城市ID
   * @param platform - 分享平台
   * @returns Promise with share status
   */
  /* async shareVisitedCity(cityId: string, platform: string) {
    return api.post(`/users/visited-cities/${cityId}/share`, { platform })
  }, */

  // 完成的路线相关接口
  /**
   * 获取完成的路线列表
   * @param filter - 筛选条件
   * @returns Promise with completed routes
   */
  /* async getCompletedRoutes(filter?: CompletedRouteFilter) {
    return api.get("/users/completed-routes", { params: filter })
  }, */

  /**
   * 获取完成的路线详情
   * @param routeId - 路线ID
   * @returns Promise with route details
   */
  /* async getCompletedRouteDetail(routeId: string) {
    return api.get(`/users/completed-routes/${routeId}`)
  }, */

  /**
   * 添加完成的路线
   * @param route - 路线信息
   * @returns Promise with added route
   */
  /* async addCompletedRoute(route: Partial<CompletedRoute>) {
    return api.post("/users/completed-routes", route)
  }, */

  /**
   * 更新完成的路线信息
   * @param routeId - 路线ID
   * @param route - 更新的路线信息
   * @returns Promise with updated route
   */
  /* async updateCompletedRoute(routeId: string, route: Partial<CompletedRoute>) {
    return api.put(`/users/completed-routes/${routeId}`, route)
  }, */

  /**
   * 删除完成的路线
   * @param routeId - 路线ID
   * @returns Promise with deletion status
   */
  /* async deleteCompletedRoute(routeId: string) {
    return api.delete(`/users/completed-routes/${routeId}`)
  }, */

  /**
   * 获取完成的路线统计数据
   * @returns Promise with route statistics
   */
  /* async getCompletedRouteStats(): Promise<CompletedRouteStats> {
    return api.get("/users/completed-routes/stats")
  }, */

  /**
   * 上传路线照片
   * @param routeId - 路线ID
   * @param formData - 包含照片文件的FormData
   * @returns Promise with photo URL
   */
  /* async uploadRoutePhoto(routeId: string, formData: FormData) {
    return api.upload(`/users/completed-routes/${routeId}/photos`, formData)
  }, */

  /**
   * 获取路线照片列表
   * @param routeId - 路线ID
   * @returns Promise with route photos
   */
  /* async getRoutePhotos(routeId: string) {
    return api.get(`/users/completed-routes/${routeId}/photos`)
  }, */

  /**
   * 分享完成的路线
   * @param routeId - 路线ID
   * @param platform - 分享平台
   * @returns Promise with share status
   */
  /* async shareCompletedRoute(routeId: string, platform: string) {
    return api.post(`/users/completed-routes/${routeId}/share`, { platform })
  }, */

  /**
   * 评价完成的路线
   * @param routeId - 路线ID
   * @param rating - 评分
   * @param comment - 评价内容
   * @returns Promise with rating status
   */
  /* async rateCompletedRoute(routeId: string, rating: number, comment?: string) {
    return api.post(`/users/completed-routes/${routeId}/rate`, { rating, comment })
  }, */

  /**
   * 获取路线同伴信息
   * @param routeId - 路线ID
   * @returns Promise with companions info
   */
  /* async getRouteCompanions(routeId: string) {
    return api.get(`/users/completed-routes/${routeId}/companions`)
  }, */

  /**
   * 添加路线同伴
   * @param routeId - 路线ID
   * @param userId - 用户ID
   * @returns Promise with addition status
   */
  /* async addRouteCompanion(routeId: string, userId: string) {
    return api.post(`/users/completed-routes/${routeId}/companions`, { userId })
  }, */

  /**
   * 获取路线停留点详情
   * @param routeId - 路线ID
   * @param stopIndex - 停留点索引
   * @returns Promise with stop details
   */
  /* async getRouteStopDetail(routeId: string, stopIndex: number) {
    return api.get(`/users/completed-routes/${routeId}/stops/${stopIndex}`)
  }, */

  /**
   * 更新路线停留点信息
   * @param routeId - 路线ID
   * @param stopIndex - 停留点索引
   * @param stopInfo - 停留点信息
   * @returns Promise with updated stop
   */
  /* async updateRouteStop(routeId: string, stopIndex: number, stopInfo: any) {
    return api.put(`/users/completed-routes/${routeId}/stops/${stopIndex}`, stopInfo)
  }, */

  /**
   * 获取相似路线推荐
   * @param routeId - 路线ID
   * @returns Promise with similar routes
   */
  /* async getSimilarRoutes(routeId: string) {
    return api.get(`/users/completed-routes/${routeId}/similar`)
  }, */

  /**
   * 导出路线为GPX格式
   * @param routeId - 路线ID
   * @returns Promise with GPX data
   */
  /* async exportRouteAsGPX(routeId: string) {
    return api.get(`/users/completed-routes/${routeId}/export/gpx`)
  }, */

  /**
   * 导出路线为PDF格式
   * @param routeId - 路线ID
   * @returns Promise with PDF data
   */
  /* async exportRouteAsPDF(routeId: string) {
    return api.get(`/users/completed-routes/${routeId}/export/pdf`)
  }, */

  /**
   * 更新用户密码
   * @param oldPassword - 旧密码
   * @param newPassword - 新密码
   * @returns Promise with update status
   */
  /* async updatePassword(oldPassword: string, newPassword: string): Promise<{ success: boolean }> {
    return api.put("/users/password", { oldPassword, newPassword })
  }, */

  /**
   * 更新用户手机号
   * @param phone - 新手机号
   * @param verificationCode - 验证码
   * @returns Promise with update status
   */
  /* async updatePhone(phone: string, verificationCode: string): Promise<{ success: boolean }> {
    return api.put("/users/phone", { phone, verificationCode })
  }, */

  /**
   * 更新用户邮箱
   * @param email - 新邮箱
   * @param verificationCode - 验证码
   * @returns Promise with update status
   */
  /* async updateEmail(email: string, verificationCode: string): Promise<{ success: boolean }> {
    return api.put("/users/email", { email, verificationCode })
  }, */

  /**
   * 发送手机验证码
   * @param phone - 手机号
   * @param purpose - 用途（注册/登录/修改手机号等）
   * @returns Promise with send status
   */
  /* async sendPhoneVerificationCode(phone: string, purpose: string): Promise<{ success: boolean }> {
    return api.post("/users/send-phone-code", { phone, purpose })
  }, */

  /**
   * 发送邮箱验证码
   * @param email - 邮箱
   * @param purpose - 用途（注册/登录/修改邮箱等）
   * @returns Promise with send status
   */
  /* async sendEmailVerificationCode(email: string, purpose: string): Promise<{ success: boolean }> {
    return api.post("/users/send-email-code", { email, purpose })
  }, */

  /**
   * 验证手机验证码
   * @param phone - 手机号
   * @param code - 验证码
   * @param purpose - 用途
   * @returns Promise with verification status
   */
  /* async verifyPhoneCode(phone: string, code: string, purpose: string): Promise<{ success: boolean }> {
    return api.post("/users/verify-phone-code", { phone, code, purpose })
  }, */

  /**
   * 验证邮箱验证码
   * @param email - 邮箱
   * @param code - 验证码
   * @param purpose - 用途
   * @returns Promise with verification status
   */
  /* async verifyEmailCode(email: string, code: string, purpose: string): Promise<{ success: boolean }> {
    return api.post("/users/verify-email-code", { email, code, purpose })
  }, */

  /**
   * 获取用户隐私设置
   * @returns Promise with privacy settings
   */
  /* async getPrivacySettings(): Promise<any> {
    return api.get("/users/privacy-settings")
  }, */

  /**
   * 更新用户隐私设置
   * @param settings - 更新的设置
   * @returns Promise with updated settings
   */
  /* async updatePrivacySettings(settings: any): Promise<any> {
    return api.put("/users/privacy-settings", settings)
  }, */

  /**
   * 获取账号安全信息
   * @returns Promise with security info
   */
  /* async getSecurityInfo(): Promise<any> {
    return api.get("/users/security-info")
  }, */

  /**
   * 绑定第三方账号
   * @param platform - 平台（微信/QQ/微博等）
   * @param authCode - 授权码
   * @returns Promise with binding status
   */
  /* async bindThirdParty(platform: string, authCode: string): Promise<{ success: boolean }> {
    return api.post("/users/bind-third-party", { platform, authCode })
  }, */

  /**
   * 解绑第三方账号
   * @param platform - 平台
   * @returns Promise with unbinding status
   */
  /* async unbindThirdParty(platform: string): Promise<{ success: boolean }> {
    return api.post("/users/unbind-third-party", { platform })
  }, */

  /**
   * 获取绑定的第三方账号列表
   * @returns Promise with bound accounts
   */
  /* async getBoundThirdPartyAccounts(): Promise<{ platform: string; nickname: string; bindTime: string }[]> {
    return api.get("/users/bound-accounts")
  }, */

  /**
   * 获取实名认证状态
   * @returns Promise with verification status
   */
  /* async getRealNameVerificationStatus(): Promise<{ verified: boolean; name?: string; idNumber?: string }> {
    return api.get("/users/real-name-verification")
  }, */

  /**
   * 提交实名认证
   * @param name - 真实姓名
   * @param idNumber - 身份证号
   * @param idCardFrontImage - 身份证正面照片
   * @param idCardBackImage - 身份证背面照片
   * @returns Promise with submission status
   */
  /* async submitRealNameVerification(
    name: string,
    idNumber: string,
    idCardFrontImage: File,
    idCardBackImage: File
  ): Promise<{ success: boolean; message?: string }> {
  /* async submitRealNameVerification(
    name: string,
    idNumber: string,
    idCardFrontImage: File,
    idCardBackImage: File
  ): Promise<{ success: boolean; message?: string }> {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("idNumber", idNumber)
    formData.append("idCardFront", idCardFrontImage)
    formData.append("idCardBack", idCardBackImage)
    return api.upload("/users/submit-real-name-verification", formData)
  }, */

  /**
   * 注销账号
   * @param reason - 注销原因
   * @param password - 密码确认
   * @returns Promise with deactivation status
   */
  /* async deactivateAccount(reason: string, password: string): Promise<{ success: boolean; message?: string }> {
    return api.post("/users/deactivate", { reason, password })
  }, */

  /**
   * 获取登录设备列表
   * @returns Promise with device list
   */
  /* async getLoginDevices(): Promise<{ id: string; deviceName: string; location: string; lastLogin: string; current: boolean }[]> {
    return api.get("/users/login-devices")
  }, */

  /**
   * 移除登录设备
   * @param deviceId - 设备ID
   * @returns Promise with removal status
   */
  /* async removeLoginDevice(deviceId: string): Promise<{ success: boolean }> {
    return api.delete(`/users/login-devices/${deviceId}`)
  }, */

  /**
   * 获取账号日志
   * @param startDate - 开始日期
   * @param endDate - 结束日期
   * @returns Promise with account logs
   */
  /* async getAccountLogs(startDate?: string, endDate?: string): Promise<{ time: string; action: string; ip: string; location: string; device: string }[]> {
    return api.get("/users/account-logs", { params: { startDate, endDate } })
  }, */
}

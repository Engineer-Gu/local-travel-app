import { api } from "@/lib/api"

export interface RouteStop {
  time: string
  place: string
  activity: string
  duration: string
  location?: {
    latitude: number
    longitude: number
  }
  image?: string
  notes?: string
  cost?: string
  transportation?: string
}

export interface Route {
  id: string
  title: string
  image?: string
  duration: string
  budget: string
  tags: string[]
  rating: number
  description: string
  stops: RouteStop[]
  author?: {
    id: string
    name: string
    avatar?: string
  }
  createdAt?: string
  updatedAt?: string
  distance?: string
  difficulty?: number
  season?: string[]
  isPublic?: boolean
  viewCount?: number
  favoriteCount?: number
  commentCount?: number
  shareCount?: number
  status?: "draft" | "published" | "archived"
}

export interface RouteFilter {
  searchText?: string
  tags?: string[]
  durationRange?: [string, string]
  budgetRange?: [string, string]
  ratingRange?: [number, number]
  sortBy?: "rating" | "createdAt" | "viewCount" | "favoriteCount"
  sortOrder?: "asc" | "desc"
  authorId?: string
  status?: "draft" | "published" | "archived" | "all"
}

export interface RouteComment {
  id: string
  routeId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  rating?: number
  createdAt: string
  likes: number
  replies?: RouteComment[]
}

export interface RouteStat {
  viewCount: number
  favoriteCount: number
  commentCount: number
  shareCount: number
  ratingAverage: number
  ratingCount: number
  completionCount: number
  saveCount: number
}

export interface RouteShareOptions {
  platform: string
  message?: string
  includeImage?: boolean
  includeStops?: boolean
}

export const routeService = {
  /**
   * 获取路线列表
   * @param filter - 筛选条件
   * @returns Promise with routes
   */
  async getRoutes(filter?: RouteFilter): Promise<Route[]> {
    return api.get("/routes", { params: filter })
  },

  /**
   * 获取路线详情
   * @param routeId - 路线ID
   * @returns Promise with route details
   */
  async getRouteDetail(routeId: string): Promise<Route> {
    return api.get(`/routes/${routeId}`)
  },

  /**
   * 创建新路线
   * @param route - 路线信息
   * @returns Promise with created route
   */
  async createRoute(route: Partial<Route>): Promise<Route> {
    return api.post("/routes", route)
  },

  /**
   * 更新路线
   * @param routeId - 路线ID
   * @param route - 更新的路线信息
   * @returns Promise with updated route
   */
  async updateRoute(routeId: string, route: Partial<Route>): Promise<Route> {
    return api.put(`/routes/${routeId}`, route)
  },

  /**
   * 删除路线
   * @param routeId - 路线ID
   * @returns Promise with deletion status
   */
  async deleteRoute(routeId: string) {
    return api.delete(`/routes/${routeId}`)
  },

  /**
   * 获取用户的路线
   * @param userId - 用户ID
   * @param filter - 筛选条件
   * @returns Promise with user routes
   */
  /* async getUserRoutes(userId: string, filter?: RouteFilter): Promise<Route[]> {
    return api.get(`/users/${userId}/routes`, { params: filter })
  }, */

  /**
   * 获取我的路线
   * @param filter - 筛选条件
   * @returns Promise with my routes
   */
  /* async getMyRoutes(filter?: RouteFilter): Promise<Route[]> {
    return api.get("/users/me/routes", { params: filter })
  }, */

  /**
   * 收藏路线
   * @param routeId - 路线ID
   * @returns Promise with favorite status
   */
  /* async favoriteRoute(routeId: string) {
    return api.post(`/routes/${routeId}/favorite`)
  }, */

  /**
   * 取消收藏路线
   * @param routeId - 路线ID
   * @returns Promise with unfavorite status
   */
  /* async unfavoriteRoute(routeId: string) {
    return api.delete(`/routes/${routeId}/favorite`)
  }, */

  /**
   * 检查路线是否已收藏
   * @param routeId - 路线ID
   * @returns Promise with favorite status
   */
  /* async checkFavoriteStatus(routeId: string): Promise<boolean> {
    return api.get(`/routes/${routeId}/favorite/check`)
  }, */

  /**
   * 获取路线评论
   * @param routeId - 路线ID
   * @returns Promise with route comments
   */
  /* async getRouteComments(routeId: string): Promise<RouteComment[]> {
    return api.get(`/routes/${routeId}/comments`)
  }, */

  /**
   * 添加路线评论
   * @param routeId - 路线ID
   * @param content - 评论内容
   * @param rating - 评分
   * @returns Promise with added comment
   */
  /* async addRouteComment(routeId: string, content: string, rating?: number): Promise<RouteComment> {
    return api.post(`/routes/${routeId}/comments`, { content, rating })
  }, */

  /**
   * 删除路线评论
   * @param routeId - 路线ID
   * @param commentId - 评论ID
   * @returns Promise with deletion status
   */
  /* async deleteRouteComment(routeId: string, commentId: string) {
    return api.delete(`/routes/${routeId}/comments/${commentId}`)
  }, */

  /**
   * 获取路线统计数据
   * @param routeId - 路线ID
   * @returns Promise with route statistics
   */
  /* async getRouteStats(routeId: string): Promise<RouteStat> {
    return api.get(`/routes/${routeId}/stats`)
  }, */

  /**
   * 分享路线
   * @param routeId - 路线ID
   * @param options - 分享选项
   * @returns Promise with share status
   */
  /* async shareRoute(routeId: string, options: RouteShareOptions) {
    return api.post(`/routes/${routeId}/share`, options)
  }, */

  /**
   * 上传路线图片
   * @param routeId - 路线ID
   * @param formData - 包含图片文件的FormData
   * @returns Promise with image URL
   */
  /* async uploadRouteImage(routeId: string, formData: FormData) {
    return api.upload(`/routes/${routeId}/image`, formData)
  }, */

  /**
   * 获取相似路线
   * @param routeId - 路线ID
   * @param limit - 返回结果数量限制
   * @returns Promise with similar routes
   */
  /* async getSimilarRoutes(routeId: string, limit = 5): Promise<Route[]> {
    return api.get(`/routes/${routeId}/similar`, { params: { limit } })
  }, */

  /**
   * 获取推荐路线
   * @param limit - 返回结果数量限制
   * @returns Promise with recommended routes
   */
  /* async getRecommendedRoutes(limit = 10): Promise<Route[]> {
    return api.get("/routes/recommended", { params: { limit } })
  }, */

  /**
   * 获取热门路线
   * @param limit - 返回结果数量限制
   * @returns Promise with popular routes
   */
  /* async getPopularRoutes(limit = 10): Promise<Route[]> {
    return api.get("/routes/popular", { params: { limit } })
  }, */

  /**
   * 获取附近的路线
   * @param lat - 纬度
   * @param lng - 经度
   * @param radius - 半径（公里）
   * @param limit - 返回结果数量限制
   * @returns Promise with nearby routes
   */
  /* async getNearbyRoutes(lat: number, lng: number, radius = 5, limit = 10): Promise<Route[]> {
    return api.get("/routes/nearby", { params: { lat, lng, radius, limit } })
  }, */

  /**
   * 导出路线为GPX格式
   * @param routeId - 路线ID
   * @returns Promise with GPX data
   */
  /* async exportRouteAsGPX(routeId: string) {
    return api.get(`/routes/${routeId}/export/gpx`)
  }, */

  /**
   * 导出路线为PDF格式
   * @param routeId - 路线ID
   * @returns Promise with PDF data
   */
  /* async exportRouteAsPDF(routeId: string) {
    return api.get(`/routes/${routeId}/export/pdf`)
  }, */

  /**
   * 复制路线
   * @param routeId - 路线ID
   * @returns Promise with copied route
   */
  /* async cloneRoute(routeId: string): Promise<Route> {
    return api.post(`/routes/${routeId}/clone`)
  }, */
}

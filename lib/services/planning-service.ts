import { api } from "@/lib/api"

// 定义接口类型
export interface City {
  id: string
  name: string
  image: string
}

export interface Location {
  id: string
  name: string
  description: string
  image: string
  tags: string[]
  location: {
    latitude: number
    longitude: number
    address: string
  }
}

export interface RouteStop {
  time: string
  place: string
  activity: string
  duration: string
  day?: number
}

export interface Route {
  id: string
  title: string
  duration: string
  budget: string
  budgetType: string
  stops: RouteStop[]
  aiRecommendation?: string
  tags?: string[]
  location?: {
    latitude: number
    longitude: number
    address: string
  }
  days?: number
  dateInfo?: {
    day: number
    date: string
    dayOfWeek: string
  }[]
}

export interface GenerateRouteParams {
  locationId: string
  budget: number
  budgetType: string
  budgetMode: string
  duration: string
  startDate?: string
  endDate?: string
}

export interface GenerateRouteResponse {
  routes: Route[]
}

// 规划服务
export const planningService = {
  // 获取城市列表
  async getCities(): Promise<City[]> {
    const response = await api.get("/planning/cities")
    return response.data
  },

  // 获取热门地点
  async getPopularLocations(cityId: string): Promise<Location[]> {
    const response = await api.get(`/planning/cities/${cityId}/locations`)
    return response.data
  },

  // 获取地点详情
  async getLocationDetail(locationId: string): Promise<Location> {
    const response = await api.get(`/planning/locations/${locationId}`)
    return response.data
  },

  // 生成路线
  async generateRoute(params: GenerateRouteParams): Promise<GenerateRouteResponse> {
    const response = await api.post("/planning/generate-route", params)
    return response.data
  },

  // 保存路线
  async saveRoute(routeId: string): Promise<void> {
    await api.post(`/planning/routes/${routeId}/save`)
  },

  // 获取我的路线
  async getMyRoutes(): Promise<Route[]> {
    const response = await api.get("/planning/my-routes")
    return response.data
  },

  // 获取路线详情
  async getRouteDetail(routeId: string): Promise<Route> {
    const response = await api.get(`/planning/routes/${routeId}`)
    return response.data
  },

  // 删除路线
  async deleteRoute(routeId: string): Promise<void> {
    await api.delete(`/planning/routes/${routeId}`)
  },

  // 分享路线
  async shareRoute(routeId: string): Promise<{ shareUrl: string }> {
    const response = await api.post(`/planning/routes/${routeId}/share`)
    return response.data
  },
}

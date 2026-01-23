import citiesData from "@/data/cities.json"
import popularLocationsData from "@/data/popular_locations.json"

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
  routes: Route[]
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
  timeOfDay?: string // 用于区分上午/下午半日游
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

// 辅助函数：计算天数
const calculateDays = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) return 3 // 默认3天

  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays + 1 // 包括开始和结束日期
}

// 规划服务
export const planningService = {
  // 获取城市列表
  async getCities(): Promise<City[]> {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 500))
    return citiesData as City[]
  },

  // 获取热门地点
  async getPopularLocations(cityId: string): Promise<Location[]> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const locations = (popularLocationsData as Record<string, any>)[cityId] || []
    return locations as Location[]
  },

  // 获取地点详情
  async getLocationDetail(locationId: string): Promise<Location | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    
    // 在所有城市中查找该地点
    for (const cityLocations of Object.values(popularLocationsData)) {
      const location = (cityLocations as any[]).find((loc: any) => loc.id === locationId)
      if (location) {
        return location as Location
      }
    }
    return null
  },

  // 生成路线
  async generateRoute(params: GenerateRouteParams): Promise<GenerateRouteResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1500)) // 模拟AI生成时间

    const locationDetail = await this.getLocationDetail(params.locationId)
    if (!locationDetail) {
      throw new Error("Location not found")
    }

    let availableRoutes: Route[] = []
    const { duration, budgetType, startDate, endDate } = params

    if (duration === "多日游") {
      // 多日游根据日期范围生成
      const days = calculateDays(startDate, endDate)
      availableRoutes = locationDetail.routes.filter(
        (route: any) =>
          route.duration === "多日游" && route.budgetType === budgetType && (!route.days || route.days === days),
      )

      // 如果没有完全匹配天数的路线，尝试调整路线
      if (availableRoutes.length === 0) {
        const baseRoutes = locationDetail.routes.filter(
          (route: any) => route.duration === "多日游" && route.budgetType === budgetType,
        )

        if (baseRoutes.length > 0) {
          // 复制一个路线并调整天数
          const baseRoute = baseRoutes[0]
          const adjustedRoute = JSON.parse(JSON.stringify(baseRoute))
          adjustedRoute.id = `${adjustedRoute.id}-adjusted-${Date.now()}`
          adjustedRoute.title = `${locationDetail.name}${days}日游`
          adjustedRoute.days = days

          // 根据日期生成每天的行程
          if (startDate && adjustedRoute.stops) {
            const start = new Date(startDate)
            adjustedRoute.stops = adjustedRoute.stops.map((stop: any) => {
              if (stop.day && stop.day <= days) {
                return stop
              } else {
                // 超出天数的行程分配到最后一天
                return { ...stop, day: days }
              }
            })

            // 添加日期信息
            adjustedRoute.dateInfo = []
            for (let i = 0; i < days; i++) {
              const currentDate = new Date(startDate)
              currentDate.setDate(start.getDate() + i)
              adjustedRoute.dateInfo.push({
                day: i + 1,
                date: currentDate.toISOString().split("T")[0],
                dayOfWeek: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][currentDate.getDay()],
              })
            }
          }

          availableRoutes = [adjustedRoute]
        }
      }
    } else {
      // 半日游和一日游的处理
      availableRoutes = locationDetail.routes.filter((route: any) => {
        // 处理半日游的情况
        if (duration === "上午半日游" && route.duration === "半日游" && route.timeOfDay !== "下午") {
          return route.budgetType === budgetType
        }
        if (duration === "下午半日游" && route.duration === "半日游" && route.timeOfDay === "下午") {
          return route.budgetType === budgetType
        }
        // 其他情况
        return route.duration === duration && route.budgetType === budgetType
      })
    }

    // 如果还没有找到路线，尝试只匹配时长
    if (availableRoutes.length === 0) {
      let durationRoutes = []
      if (duration === "多日游") {
        durationRoutes = locationDetail.routes.filter((route: any) => route.duration === "多日游")
      } else if (duration === "上午半日游" || duration === "下午半日游") {
        durationRoutes = locationDetail.routes.filter((route: any) => route.duration === "半日游")
      } else {
        durationRoutes = locationDetail.routes.filter((route: any) => route.duration === duration)
      }

      if (durationRoutes.length > 0) {
        availableRoutes = durationRoutes
      }
    }

    // 最后的兜底：生成一个默认路线
    if (availableRoutes.length === 0) {
      const defaultRoute: Route = {
        id: `generated-route-${Date.now()}`,
        title: `${locationDetail.name}${duration}`,
        duration: duration,
        budget: `¥${params.budget}`,
        budgetType: budgetType,
        tags: locationDetail.tags,
        stops: [
          { time: "09:00", place: `${locationDetail.name}入口`, activity: "开始游览", duration: "30分钟" },
          { time: "10:00", place: `${locationDetail.name}主要景点`, activity: "参观游览", duration: "2小时" },
          { time: "12:00", place: "附近餐厅", activity: "品尝当地美食", duration: "1小时" },
        ],
        location: locationDetail.location,
        aiRecommendation: `根据您的${budgetType}预算和${duration}时间安排，AI为您定制了这条路线，让您能够充分体验${locationDetail.name}的特色景点和文化。`,
      }

      // 如果是多日游，添加多天行程
      if (duration === "多日游") {
        const days = calculateDays(startDate, endDate)
        defaultRoute.days = days
        defaultRoute.stops = []

        // 生成每天的行程
        for (let i = 0; i < days; i++) {
          defaultRoute.stops.push(
            {
              day: i + 1,
              time: "09:00",
              place: `${locationDetail.name}景点${i + 1}`,
              activity: "开始游览",
              duration: "1小时",
            },
            {
              day: i + 1,
              time: "10:30",
              place: `${locationDetail.name}特色景点${i + 1}`,
              activity: "深度体验",
              duration: "2小时",
            },
            { day: i + 1, time: "12:30", place: "当地特色餐厅", activity: "品尝美食", duration: "1.5小时" },
            {
              day: i + 1,
              time: "14:30",
              place: `${locationDetail.name}周边景点${i + 1}`,
              activity: "探索发现",
              duration: "2小时",
            },
            { day: i + 1, time: "17:00", place: "休闲区域", activity: "放松休息", duration: "1小时" },
          )
        }

        // 添加日期信息
        if (startDate) {
          const start = new Date(startDate)
          defaultRoute.dateInfo = []
          for (let i = 0; i < days; i++) {
            const currentDate = new Date(startDate)
            currentDate.setDate(start.getDate() + i)
            defaultRoute.dateInfo.push({
              day: i + 1,
              date: currentDate.toISOString().split("T")[0],
              dayOfWeek: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][currentDate.getDay()],
            })
          }
        }
      }
      
      availableRoutes = [defaultRoute]
    }

    return { routes: availableRoutes }
  },

  // Save route (Mock)
  async saveRoute(routeId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.log(`Route ${routeId} saved`)
  },

  // Get my routes (Mock)
  async getMyRoutes(): Promise<Route[]> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return []
  },

  // Get route detail (Mock)
  async getRouteDetail(routeId: string): Promise<Route> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    // Simplification for mock: return a dummy route or try to find in mock data if we had a flat list
    return {
      id: routeId,
      title: "Mock Route Detail",
      duration: "一日游",
      budget: "¥500",
      budgetType: "经济型",
      stops: []
    }
  },

  // Delete route (Mock)
  async deleteRoute(routeId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log(`Route ${routeId} deleted`)
  },

  // Share route (Mock)
  async shareRoute(routeId: string): Promise<{ shareUrl: string }> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return { shareUrl: `https://localtravel.app/share/${routeId}` }
  },
}

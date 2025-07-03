"use client"

import { useState, useEffect } from "react"
import {
  MapPin,
  Clock,
  Wallet,
  Search,
  ArrowRight,
  Calendar,
  Navigation,
  Users,
  Compass,
  Sparkles,
  Loader2,
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Screen } from "@/components/mobile-app"

// 导入API服务 (注释掉，需要时取消注释)
// import { planningService } from "@/lib/services/planning-service"
// import { useToast } from "@/hooks/use-toast"

interface PlanningProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
  goBack?: () => void
  initialStep?: number
}

// 城市数据
const cities = [
  { id: "hangzhou", name: "杭州", image: "/placeholder.svg?height=120&width=320&text=杭州" },
  { id: "shanghai", name: "上海", image: "/placeholder.svg?height=120&width=320&text=上海" },
  { id: "beijing", name: "北京", image: "/placeholder.svg?height=120&width=320&text=北京" },
  { id: "guangzhou", name: "广州", image: "/placeholder.svg?height=120&width=320&text=广州" },
  { id: "chengdu", name: "成都", image: "/placeholder.svg?height=120&width=320&text=成都" },
  { id: "suzhou", name: "苏州", image: "/placeholder.svg?height=120&width=320&text=苏州" },
  { id: "nanjing", name: "南京", image: "/placeholder.svg?height=120&width=320&text=南京" },
  { id: "xiamen", name: "厦门", image: "/placeholder.svg?height=120&width=320&text=厦门" },
]

// 热门地点数据
const popularLocationsByCity = {
  hangzhou: [
    {
      id: "loc1",
      name: "西湖景区",
      description: "国家5A级景区，以秀丽的湖光山色和众多的人文古迹闻名于世",
      image: "/placeholder.svg?height=120&width=320&text=西湖景区",
      tags: ["自然风光", "历史文化", "摄影胜地"],
      routes: [
        {
          id: "route1",
          title: "西湖文化半日游",
          duration: "半日游",
          budget: "¥300",
          budgetType: "经济型",
          stops: [
            { time: "09:00", place: "西湖博物馆", activity: "参观西湖历史文化展览", duration: "1小时" },
            { time: "10:15", place: "断桥", activity: "欣赏西湖美景，拍照留念", duration: "45分钟" },
            { time: "11:15", place: "平湖秋月", activity: "漫步湖边，感受自然风光", duration: "30分钟" },
            { time: "12:00", place: "楼外楼", activity: "品尝地道杭帮菜", duration: "1小时" },
          ],
          aiRecommendation: "根据您的兴趣偏好和时间安排，这条路线能让您在短时间内体验西湖的精华景点和文化底蕴。",
        },
        {
          id: "route1-2",
          title: "西湖精致半日游",
          duration: "半日游",
          budget: "¥500",
          budgetType: "舒适型",
          stops: [
            { time: "09:00", place: "西湖博物馆VIP导览", activity: "专业讲解员带您了解西湖文化", duration: "1小时" },
            { time: "10:15", place: "断桥", activity: "欣赏西湖美景，专业摄影服务", duration: "45分钟" },
            { time: "11:15", place: "平湖秋月", activity: "包船游览湖景", duration: "45分钟" },
            { time: "12:15", place: "楼外楼包厢", activity: "品尝特色杭帮菜", duration: "1.5小时" },
          ],
          aiRecommendation: "为您精心挑选了更舒适的游览体验，包含专业讲解和特色用餐，让您的西湖之旅更加精致难忘。",
        },
        {
          id: "route1-3",
          title: "西湖奢华半日游",
          duration: "半日游",
          budget: "¥800",
          budgetType: "豪华型",
          stops: [
            {
              time: "09:00",
              place: "西湖博物馆私人导览",
              activity: "博物馆专家带您深度了解西湖文化",
              duration: "1.5小时",
            },
            { time: "10:45", place: "私人游艇", activity: "游艇环湖，欣赏全景", duration: "1小时" },
            { time: "12:00", place: "楼外楼VIP厅", activity: "品尝主厨特制杭帮菜", duration: "1.5小时" },
            { time: "13:30", place: "茶艺体验", activity: "私人茶艺师教学龙井茶冲泡", duration: "1小时" },
          ],
          aiRecommendation: "为追求极致体验的您打造的奢华路线，包含私人导览、游艇和顶级餐饮，让您的西湖之旅尊贵无比。",
        },
        {
          id: "route2",
          title: "西湖全景一日游",
          duration: "一日游",
          budget: "¥500",
          budgetType: "经济型",
          stops: [
            { time: "09:00", place: "西湖博物馆", activity: "参观西湖历史文化展览", duration: "1小时" },
            { time: "10:15", place: "断桥", activity: "欣赏西湖美景，拍照留念", duration: "45分钟" },
            { time: "11:15", place: "平湖秋月", activity: "漫步湖边，感受自然风光", duration: "30分钟" },
            { time: "12:00", place: "楼外楼", activity: "品尝地道杭帮菜", duration: "1小时" },
            { time: "14:00", place: "雷峰塔", activity: "登塔远眺西湖全景", duration: "1小时" },
            { time: "15:30", place: "灵隐寺", activity: "参观千年古刹", duration: "1.5小时" },
            { time: "17:30", place: "河坊街", activity: "体验传统文化，购买纪念品", duration: "1.5小时" },
          ],
          aiRecommendation: "这条路线覆盖了西湖周边的主要景点，既有自然风光，又有人文历史，是体验杭州精华的理想选择。",
        },
        // 其他路线保持不变...
      ],
      location: {
        latitude: 30.259,
        longitude: 120.1388,
        address: "浙江省杭州市西湖区龙井路1号",
      },
    },
    // 其他杭州地点保持不变...
  ],
  shanghai: [
    // 上海的地点保持不变...
  ],
  // 其他城市数据简化...
}

export function Planning({ navigate, goBack, initialStep }: PlanningProps) {
  // 获取初始步骤（如果从AI导游返回）
  const [step, setStep] = useState(initialStep || 1)
  const [budget, setBudget] = useState([300])
  const [budgetType, setBudgetType] = useState("经济型") // 新增预算类型
  const [budgetMode, setBudgetMode] = useState("人均") // 新增预算模式
  const [duration, setDuration] = useState("上午半日游")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState("hangzhou")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [generatedRoute, setGeneratedRoute] = useState<any>(null)
  const [locationDetail, setLocationDetail] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [routeOptions, setRouteOptions] = useState<any[]>([])
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0)
  const [savedState, setSavedState] = useState<any>(null)

  // 添加toast (注释掉，需要时取消注释)
  // const { toast } = useToast()

  // 添加城市列表加载状态 (注释掉，需要时取消注释)
  // const [isLoadingCities, setIsLoadingCities] = useState(false)
  // const [isLoadingLocations, setIsLoadingLocations] = useState(false)

  // 当城市变化时，重置选中的地点
  useEffect(() => {
    setSelectedLocation(null)
    setLocationDetail(null)

    // 获取城市的热门地点 (注释掉，需要时取消注释)
    // fetchPopularLocations()
  }, [selectedCity])

  // 组件挂载时检查是否有初始步骤
  useEffect(() => {
    if (initialStep) {
      setStep(initialStep)
    }

    // 获取城市列表 (注释掉，需要时取消注释)
    // fetchCities()
  }, [initialStep])

  // 获取城市列表 (注释掉，需要时取消注释)
  /*
  const fetchCities = async () => {
    try {
      setIsLoadingCities(true)
      const citiesData = await planningService.getCities()
      // 如果需要替换mock数据，取消下面注释
      // setCities(citiesData)
    } catch (error: any) {
      toast({
        title: "获取城市列表失败",
        description: error.message || "请检查网络连接后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoadingCities(false)
    }
  }
  */

  // 获取城市的热门地点 (注释掉，需要时取消注释)
  /*
  const fetchPopularLocations = async () => {
    if (!selectedCity) return
    
    try {
      setIsLoadingLocations(true)
      const locationsData = await planningService.getPopularLocations(selectedCity)
      // 如果需要替换mock数据，取消下面注释
      // setPopularLocations(locationsData)
    } catch (error: any) {
      toast({
        title: "获取热门地点失败",
        description: error.message || "请检查网络连接后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoadingLocations(false)
    }
  }
  */

  // 根据选择的城市获取热门地点
  const getPopularLocations = () => {
    return popularLocationsByCity[selectedCity as keyof typeof popularLocationsByCity] || []
  }

  const filteredLocations = getPopularLocations().filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId)
    const location = getPopularLocations().find((loc) => loc.id === locationId)
    setLocationDetail(location)

    // 获取地点详情 (注释掉，需要时取消注释)
    /*
    fetchLocationDetail(locationId)
    */

    // 直接进入步骤2
    setStep(2)
  }

  // 获取地点详情 (注释掉，需要时取消注释)
  /*
  const fetchLocationDetail = async (locationId: string) => {
    try {
      const locationData = await planningService.getLocationDetail(locationId)
      // 如果需要替换mock数据，取消下面注释
      // setLocationDetail(locationData)
    } catch (error: any) {
      toast({
        title: "获取地点详情失败",
        description: error.message || "请检查网络连接后重试",
        variant: "destructive",
      })
    }
  }
  */

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  // 根据预算类型获取预算范围
  const getBudgetRange = () => {
    switch (budgetType) {
      case "经济型":
        return { min: 100, max: 500, default: 300 }
      case "舒适型":
        return { min: 300, max: 1000, default: 600 }
      case "豪华型":
        return { min: 800, max: 3000, default: 1500 }
      default:
        return { min: 100, max: 1000, default: 300 }
    }
  }

  // 处理预算类型变化
  const handleBudgetTypeChange = (type: string) => {
    setBudgetType(type)
    const range = getBudgetRange()
    setBudget([range.default])
  }

  // 计算多日游的天数
  const calculateDays = () => {
    if (!startDate || !endDate) return 3 // 默认3天

    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays + 1 // 包括开始和结束日期
  }

  // 生成路线
  const handleGenerateRoute = () => {
    if (!locationDetail) return

    setIsGenerating(true)

    // 调用后端API生成路线 (注释掉，需要时取消注释)
    /*
    generateRouteFromAPI()
    */

    // 模拟AI生成过程 (使用mock数据)
    setTimeout(() => {
      // 根据选择的时长和预算类型筛选路线
      let availableRoutes = []

      if (duration === "多日游") {
        // 多日游根据日期范围生成
        const days = calculateDays()
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
            const adjustedRoute = JSON.parse(JSON.stringify(baseRoutes[0]))
            adjustedRoute.id = `${adjustedRoute.id}-adjusted`
            adjustedRoute.title = `${locationDetail.name}${days}日游`
            adjustedRoute.days = days

            // 根据日期生成每天的行程
            if (startDate && endDate) {
              const start = new Date(startDate)
              adjustedRoute.stops = adjustedRoute.stops.map((stop: any) => {
                if (stop.day <= days) {
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

      if (availableRoutes.length > 0) {
        setRouteOptions(availableRoutes)
        setGeneratedRoute(availableRoutes[0])
        setSelectedRouteIndex(0)
      } else {
        // 如果没有完全匹配的路线，尝试只匹配时长
        let durationRoutes = []

        if (duration === "多日游") {
          durationRoutes = locationDetail.routes.filter((route: any) => route.duration === "多日游")
        } else if (duration === "上午半日游" || duration === "下午半日游") {
          durationRoutes = locationDetail.routes.filter((route: any) => route.duration === "半日游")
        } else {
          durationRoutes = locationDetail.routes.filter((route: any) => route.duration === duration)
        }

        if (durationRoutes.length > 0) {
          setRouteOptions(durationRoutes)
          setGeneratedRoute(durationRoutes[0])
          setSelectedRouteIndex(0)
        } else {
          // 如果还是没有，使用默认路线
          const defaultRoute = {
            id: "generated-route",
            title: `${locationDetail.name}${duration}`,
            image: locationDetail.image,
            duration: duration,
            budget: `¥${budget[0]}`,
            budgetType: budgetType,
            tags: locationDetail.tags,
            rating: 4.9,
            description: `探索${locationDetail.name}周边的景点，体验当地特色。`,
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
            const days = calculateDays()
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
            if (startDate && endDate) {
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

          setRouteOptions([defaultRoute])
          setGeneratedRoute(defaultRoute)
          setSelectedRouteIndex(0)
        }
      }

      setIsGenerating(false)
      // 直接进入步骤3
      setStep(3)

      // 保存当前规划状态，用于从AI导游返回
      setSavedState({
        step: 3,
        selectedLocation,
        locationDetail,
        generatedRoute: generatedRoute || null,
        routeOptions,
        selectedRouteIndex,
        budget,
        budgetType,
        budgetMode,
        duration,
        startDate,
        endDate,
      })
    }, 1500) // 模拟1.5秒的生成时间
  }

  // 调用后端API生成路线 (注释掉，需要时取消注释)
  /*
  const generateRouteFromAPI = async () => {
    if (!locationDetail) return
    
    try {
      setIsGenerating(true)
      
      // 准备请求参数
      const params = {
        locationId: selectedLocation,
        budget: budget[0],
        budgetType: budgetType,
        budgetMode: budgetMode,
        duration: duration,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      }
      
      // 调用路线生成API
      const response = await planningService.generateRoute(params)
      
      // 更新路线选项和当前选中的路线
      setRouteOptions(response.routes || [])
      
      if (response.routes && response.routes.length > 0) {
        setGeneratedRoute(response.routes[0])
        setSelectedRouteIndex(0)
      }
      
      // 保存当前规划状态，用于从AI导游返回
      setSavedState({
        step: 3,
        selectedLocation,
        locationDetail,
        generatedRoute: response.routes[0] || null,
        routeOptions: response.routes || [],
        selectedRouteIndex: 0,
        budget,
        budgetType,
        budgetMode,
        duration,
        startDate,
        endDate,
      })
      
      // 进入步骤3
      setStep(3)
    } catch (error: any) {
      toast({
        title: "生成路线失败",
        description: error.message || "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }
  */

  const handleSelectRoute = (index: number) => {
    setSelectedRouteIndex(index)
    setGeneratedRoute(routeOptions[index])

    // 更新保存的状态
    setSavedState({
      ...savedState,
      generatedRoute: routeOptions[index],
      selectedRouteIndex: index,
    })
  }

  const handleStartNavigation = () => {
    if (generatedRoute && generatedRoute.location) {
      navigate("map", {
        location: {
          name: generatedRoute.title,
          address: generatedRoute.location.address,
          latitude: generatedRoute.location.latitude,
          longitude: generatedRoute.location.longitude,
        },
      })
    }
  }

  // 保存路线到我的收藏 (注释掉，需要时取消注释)
  /*
  const handleSaveRoute = async () => {
    if (!generatedRoute) return
    
    try {
      await planningService.saveRoute(generatedRoute.id)
      
      toast({
        title: "保存成功",
        description: "路线已添加到您的收藏",
      })
      
      navigate("route-detail", { route: generatedRoute })
    } catch (error: any) {
      toast({
        title: "保存失败",
        description: error.message || "请稍后重试",
        variant: "destructive",
      })
    }
  }
  */

  const handleFindCompanions = () => {
    navigate("social", { searchQuery: "寻找玩伴", activity: generatedRoute?.title })
  }

  const handleBookGuide = () => {
    navigate("guides", { searchQuery: "预约导游", location: locationDetail?.name })
  }

  // 处理AI导游讲解
  const handleAIGuide = (place: string, activity: string) => {
    // 保存当前规划状态
    setSavedState({
      step,
      selectedLocation,
      locationDetail,
      generatedRoute,
      routeOptions,
      selectedRouteIndex,
      budget,
      budgetType,
      budgetMode,
      duration,
      startDate,
      endDate,
    })

    // 导航到AI导游页面
    navigate("ai-voice-guide", {
      location: {
        name: place,
        description: activity,
        image: `/placeholder.svg?height=400&width=600&text=${place}`,
      },
      returnToPlanning: true, // 标记是从规划页面跳转过来的
      planningStep: 3, // 传递当前步骤，确保返回时回到正确的步骤
    })
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">选择游玩地点</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">选择城市</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="选择城市" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={`搜索${cities.find((city) => city.id === selectedCity)?.name || ""}的景点`}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">热门地点</h3>
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:border-blue-300 transition-colors"
                    onClick={() => handleLocationSelect(location.id)}
                  >
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <MapPin size={18} className="text-blue-500 mr-2" />
                        <span>{location.name}</span>
                      </div>
                      <ArrowRight size={16} className="text-gray-400" />
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-gray-500 text-center py-3">没有找到匹配的地点，请尝试其他搜索词或选择其他城市</p>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">设置预算和时间</h2>

            <div className="space-y-4">
              {/* 预算类型选择 */}
              <div>
                <label className="font-medium flex items-center mb-2">
                  <Wallet size={18} className="mr-2 text-blue-500" />
                  预算类型
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["经济型", "舒适型", "豪华型"].map((type) => (
                    <Button
                      key={type}
                      variant={budgetType === type ? "default" : "outline"}
                      className={budgetType === type ? "bg-blue-500" : ""}
                      onClick={() => handleBudgetTypeChange(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 预算模式选择 */}
              <div>
                <label className="font-medium flex items-center mb-2">预算模式</label>
                <div className="grid grid-cols-2 gap-2">
                  {["人均", "总预算"].map((mode) => (
                    <Button
                      key={mode}
                      variant={budgetMode === mode ? "default" : "outline"}
                      className={budgetMode === mode ? "bg-blue-500" : ""}
                      onClick={() => setBudgetMode(mode)}
                    >
                      {mode}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 预算滑块 */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-medium flex items-center">
                    <Wallet size={18} className="mr-2 text-blue-500" />
                    预算范围
                  </label>
                  <span className="text-blue-600 font-medium">¥{budget[0]}</span>
                </div>
                <Slider
                  defaultValue={budget}
                  min={getBudgetRange().min}
                  max={getBudgetRange().max}
                  step={50}
                  onValueChange={setBudget}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>¥{getBudgetRange().min}</span>
                  <span>¥{getBudgetRange().max}</span>
                </div>
              </div>

              {/* 游玩时长 */}
              <div>
                <label className="font-medium flex items-center mb-2">
                  <Clock size={18} className="mr-2 text-blue-500" />
                  游玩时长
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["上午半日游", "下午半日游", "一日游", "多日游"].map((option) => (
                    <Button
                      key={option}
                      variant={duration === option ? "default" : "outline"}
                      className={duration === option ? "bg-blue-500" : ""}
                      onClick={() => setDuration(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 日期选择 - 根据游玩时长显示不同的日期选择器 */}
              {duration === "多日游" ? (
                <div className="space-y-3">
                  <label className="font-medium flex items-center mb-2">
                    <Calendar size={18} className="mr-2 text-blue-500" />
                    出行日期范围
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">开始日期</label>
                      <input
                        type="date"
                        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">结束日期</label>
                      <input
                        type="date"
                        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="font-medium flex items-center mb-2">
                    <Calendar size={18} className="mr-2 text-blue-500" />
                    出行日期
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              )}
            </div>

            <Button className="w-full" onClick={handleGenerateRoute}>
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  AI正在生成路线...
                </>
              ) : (
                <>
                  生成路线
                  <Navigation size={16} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">为您规划的路线</h2>

            {/* AI推荐标签 */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg text-white flex items-center">
              <Brain size={24} className="mr-3" />
              <div>
                <h3 className="font-medium">AI智能推荐</h3>
                <p className="text-sm opacity-90">根据您的偏好定制的专属路线</p>
              </div>
            </div>

            {/* 路线选项卡 - 当有多个路线选项时显示 */}
            {routeOptions.length > 1 && (
              <div className="space-y-3">
                <h3 className="font-medium">推荐路线选择</h3>
                <div className="flex overflow-x-auto space-x-2 pb-2">
                  {routeOptions.map((route, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 cursor-pointer p-3 rounded-lg border ${
                        selectedRouteIndex === index ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200"
                      }`}
                      onClick={() => handleSelectRoute(index)}
                    >
                      <div className="whitespace-nowrap font-medium">{route.title}</div>
                      <div className="text-sm mt-1">
                        {route.budget} · {route.budgetType}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 路线详情 */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{generatedRoute?.title || "智能规划路线"}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="mr-3">预算: {generatedRoute?.budget || `¥${budget[0]}`}</span>
                    <span>时长: {generatedRoute?.duration || duration}</span>
                  </div>
                </div>
                <Badge className="bg-blue-500">
                  <Sparkles size={14} className="mr-1" />
                  AI推荐
                </Badge>
              </div>
            </div>

            {/* AI推荐理由 */}
            {generatedRoute?.aiRecommendation && (
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <Brain size={18} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{generatedRoute.aiRecommendation}</p>
                </div>
              </div>
            )}

            {/* 行程安排 */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center">
                <Clock size={18} className="mr-2 text-blue-500" />
                行程安排
              </h3>

              {/* 多日游显示天数选项卡 */}
              {duration === "多日游" && generatedRoute?.days > 1 ? (
                <Tabs defaultValue="1">
                  <TabsList className="w-full">
                    {Array.from({ length: generatedRoute.days }, (_, i) => (
                      <TabsTrigger key={i} value={`${i + 1}`} className="flex-1">
                        {generatedRoute.dateInfo ? (
                          <>
                            第{i + 1}天
                            <span className="text-xs ml-1 opacity-70">{generatedRoute.dateInfo[i].dayOfWeek}</span>
                          </>
                        ) : (
                          `第${i + 1}天`
                        )}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {Array.from({ length: generatedRoute.days }, (_, dayIndex) => (
                    <TabsContent key={dayIndex} value={`${dayIndex + 1}`}>
                      <div className="space-y-3">
                        {(generatedRoute?.stops || [])
                          .filter((item: any) => item.day === dayIndex + 1)
                          .map((item: any, index: number) => (
                            <div key={index} className="relative pl-6 border-l-2 border-blue-300 pb-4 last:border-0">
                              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                              <div className="mb-1 font-medium">
                                {item.time} - {item.place}
                              </div>
                              <div className="text-sm text-gray-600">{item.activity}</div>
                              <div className="text-xs text-gray-500 mt-1">预计: {item.duration}</div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 text-blue-600 p-0 h-auto"
                                onClick={() => handleAIGuide(item.place, item.activity)}
                              >
                                <Sparkles size={14} className="mr-1" />
                                AI导游讲解
                              </Button>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                // 半日游和一日游直接显示行程
                <div className="space-y-3">
                  {(generatedRoute?.stops || []).map((item: any, index: number) => (
                    <div key={index} className="relative pl-6 border-l-2 border-blue-300 pb-4 last:border-0">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                      <div className="mb-1 font-medium">
                        {item.time} - {item.place}
                      </div>
                      <div className="text-sm text-gray-600">{item.activity}</div>
                      <div className="text-xs text-gray-500 mt-1">预计: {item.duration}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-blue-600 p-0 h-auto"
                        onClick={() => handleAIGuide(item.place, item.activity)}
                      >
                        <Sparkles size={14} className="mr-1" />
                        AI导游讲解
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 标签 */}
            {generatedRoute?.tags && (
              <div className="flex flex-wrap gap-2">
                {generatedRoute.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                修改路线
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  navigate("route-detail", { route: generatedRoute })

                  // 保存路线到我的收藏 (注释掉，需要时取消注释)
                  /*
                  handleSaveRoute()
                  */
                }}
              >
                保存路线
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1" onClick={handleFindCompanions}>
                <Users size={16} className="mr-2" />
                寻找玩伴
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleBookGuide}>
                <Compass size={16} className="mr-2" />
                预约导游
              </Button>
            </div>

            <Button className="w-full" onClick={handleStartNavigation}>
              <Navigation size={16} className="mr-2" />
              开始导航
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <h1 className="text-xl font-bold">智能游玩规划</h1>
        {step > 1 && (
          <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setStep(step - 1)}>
            返回
          </Button>
        )}
      </div>

      {renderStep()}
    </div>
  )
}

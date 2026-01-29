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
import { useToast } from "@/hooks/use-toast"
import type { Screen } from "@/lib/navigation-types"
import { planningService, type City, type Location, type Route } from "@/lib/services/planning-service"

interface PlanningProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
  goBack?: () => void
  initialStep?: number
}

export function Planning({ navigate, goBack, initialStep }: PlanningProps) {
  // 获取初始步骤（如果从AI导游返回）
  const [step, setStep] = useState(initialStep || 1)
  const [budget, setBudget] = useState([300])
  const [budgetType, setBudgetType] = useState("经济型")
  const [budgetMode, setBudgetMode] = useState("人均")
  const [duration, setDuration] = useState("上午半日游")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState("hangzhou")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [generatedRoute, setGeneratedRoute] = useState<Route | null>(null)
  const [locationDetail, setLocationDetail] = useState<Location | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [routeOptions, setRouteOptions] = useState<Route[]>([])
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0)
  const [savedState, setSavedState] = useState<any>(null)

  // Data states
  const [cities, setCities] = useState<City[]>([])
  const [popularLocations, setPopularLocations] = useState<Location[]>([])
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [isLoadingLocations, setIsLoadingLocations] = useState(false)

  const { toast } = useToast()

  // Initial data loading
  useEffect(() => {
    fetchCities()

    if (initialStep) {
      setStep(initialStep)
    }
  }, [initialStep])

  // Load locations when city changes
  useEffect(() => {
    if (selectedCity) {
      setSelectedLocation(null)
      setLocationDetail(null)
      fetchPopularLocations(selectedCity)
    }
  }, [selectedCity])

  const fetchCities = async () => {
    try {
      setIsLoadingCities(true)
      const data = await planningService.getCities()
      setCities(data)
    } catch (error) {
      toast({
        title: "获取城市列表失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoadingCities(false)
    }
  }

  const fetchPopularLocations = async (cityId: string) => {
    try {
      setIsLoadingLocations(true)
      const data = await planningService.getPopularLocations(cityId)
      setPopularLocations(data)
    } catch (error) {
      toast({
        title: "获取热门地点失败",
        description: "请稍后重试",
        variant: "destructive",
      })
      setPopularLocations([])
    } finally {
      setIsLoadingLocations(false)
    }
  }

  const filteredLocations = popularLocations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleLocationSelect = async (locationId: string) => {
    setSelectedLocation(locationId)
    // Find in current list first, then fetch details if needed
    // Since we filtered from popularLocations, we likely have it.
    // However, planningService.getLocationDetail might get more data.
    // For now we use the one we have, but let's be robust.
    const location = popularLocations.find((loc) => loc.id === locationId)
    if (location) {
      setLocationDetail(location)
      setStep(2)
    } else {
      // Fallback fetch
      try {
        const detail = await planningService.getLocationDetail(locationId)
        if (detail) {
          setLocationDetail(detail)
          setStep(2)
        }
      } catch (e) {
        toast({ title: "加载地点详情失败", variant: "destructive" })
      }
    }
  }

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

  // 生成路线
  const handleGenerateRoute = async () => {
    if (!selectedLocation) return

    setIsGenerating(true)

    try {
      const response = await planningService.generateRoute({
        locationId: selectedLocation,
        budget: budget[0],
        budgetType,
        budgetMode,
        duration,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      })

      if (response.routes.length > 0) {
        setRouteOptions(response.routes)
        setGeneratedRoute(response.routes[0])
        setSelectedRouteIndex(0)

        // Save state for returning from other screens
        setSavedState({
          step: 3,
          selectedLocation,
          locationDetail,
          generatedRoute: response.routes[0],
          routeOptions: response.routes,
          selectedRouteIndex: 0,
          budget,
          budgetType,
          budgetMode,
          duration,
          startDate,
          endDate
        })

        setStep(3)
      } else {
        toast({
          title: "未找到合适路线",
          description: "请尝试调整您的偏好设置",
          variant: "default"
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "生成路线失败",
        description: "AI服务暂时不可用，请稍后重试",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

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
              {isLoadingCities ? (
                <div className="h-10 w-full bg-gray-100 animate-pulse rounded-md" />
              ) : (
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
              )}
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
              {isLoadingLocations ? (
                // Loading Skeleton
                [1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-3 h-12 bg-gray-50 dark:bg-gray-800" />
                  </Card>
                ))
              ) : filteredLocations.length > 0 ? (
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
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">开始日期</label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-200 rounded-md"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">结束日期</label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-200 rounded-md"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="font-medium flex items-center mb-2">
                    <Calendar size={18} className="mr-2 text-blue-500" />
                    出行日期
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-200 rounded-md"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value)
                      setEndDate(e.target.value)
                    }}
                  />
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                onClick={handleGenerateRoute}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    AI 正在规划路线...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    生成智能规划
                  </>
                )}
              </Button>
            </div>


            <div className="text-center">
              <Button variant="ghost" onClick={() => {
                setStep(1)
                setSelectedLocation(null)
                setLocationDetail(null)
              }}>
                返回上一步
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6 pb-20">
            {generatedRoute ? (
              <>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-xl text-white shadow-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold">{generatedRoute.title}</h2>
                    <Badge className="bg-white/20 hover:bg-white/30 text-white border-0">
                      {generatedRoute.budgetType}
                    </Badge>
                  </div>
                  <div className="flex items-center text-blue-100 text-sm mb-4">
                    <Clock size={14} className="mr-1" />
                    <span>{generatedRoute.duration}</span>
                    <span className="mx-2">•</span>
                    <Wallet size={14} className="mr-1" />
                    <span>{generatedRoute.budget}</span>
                  </div>

                  {generatedRoute.aiRecommendation && (
                    <div className="bg-white/10 p-3 rounded-lg text-sm backdrop-blur-sm">
                      <div className="flex items-center mb-1 font-medium">
                        <Sparkles size={14} className="mr-1" /> AI 推荐理由
                      </div>
                      <p className="opacity-90">{generatedRoute.aiRecommendation}</p>
                    </div>
                  )}
                </div>

                {routeOptions.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                    {routeOptions.map((route, index) => (
                      <div
                        key={route.id}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${selectedRouteIndex === index
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "bg-gray-100 text-gray-600 border border-transparent"
                          }`}
                        onClick={() => handleSelectRoute(index)}
                      >
                        方案 {index + 1}
                      </div>
                    ))}
                  </div>
                )}

                <Tabs defaultValue="schedule" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="schedule">行程安排</TabsTrigger>
                    <TabsTrigger value="map">地图预览</TabsTrigger>
                  </TabsList>

                  <TabsContent value="schedule" className="mt-4 space-y-4">
                    <div className="relative border-l-2 border-blue-200 ml-3 space-y-8 pl-6 py-2">
                      {generatedRoute.stops.map((stop, index) => (
                        <div key={index} className="relative">
                          <div className="absolute -left-[31px] top-0 bg-blue-500 rounded-full p-1.5 border-4 border-white shadow-sm">
                            <Clock size={12} className="text-white" />
                          </div>

                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-blue-600">{stop.time}</span>
                            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 mt-1">
                              {stop.day && (
                                <Badge variant="outline" className="mb-2 text-xs">
                                  第 {stop.day} 天
                                </Badge>
                              )}
                              <h4 className="font-semibold text-gray-800 flex items-center justify-between">
                                {stop.place}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-blue-500"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAIGuide(stop.place, stop.activity);
                                  }}
                                >
                                  <Brain size={14} />
                                </Button>
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">{stop.activity}</p>
                              <div className="flex items-center mt-2 text-xs text-gray-400">
                                <Clock size={12} className="mr-1" />
                                建议游玩: {stop.duration}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {generatedRoute.dateInfo && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">日期安排</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {generatedRoute.dateInfo.map((info, idx) => (
                            <div key={idx} className="bg-white p-2 rounded border border-gray-200 text-center">
                              <div className="text-xs text-gray-500">{info.date}</div>
                              <div className="font-medium text-sm">{info.dayOfWeek}</div>
                              <div className="text-xs text-blue-500">第 {info.day} 天</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="map">
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <MapPin size={32} className="mx-auto mb-2 opacity-50" />
                        <p>地图预览功能加载中...</p>
                        <p className="text-xs mt-1">点击下方"开始导航"查看详细路线</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleStartNavigation}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    开始导航
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleFindCompanions}>
                    <Users className="mr-2 h-4 w-4" />
                    寻找玩伴
                  </Button>
                  <Button variant="outline" className="w-full col-span-2" onClick={handleBookGuide}>
                    <Compass className="mr-2 h-4 w-4" />
                    预约向导
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <p>无法生成路线，请返回重试</p>
                <Button variant="outline" className="mt-4" onClick={() => setStep(2)}>
                  返回设置
                </Button>
              </div>
            )}
            <div className="text-center pt-4">
              <Button variant="ghost" onClick={() => setStep(2)}>
                返回修改偏好
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部导航 */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between">
        <h1 className="text-lg font-bold">智能行程规划</h1>
        <div className="flex items-center space-x-2">
          {/* Add header actions if needed */}
        </div>
      </div>

      <div className="p-4">
        {/* 进度指示器 */}
        <div className="flex items-center justify-between mb-6 px-4">
          <div className={`flex flex-col items-center ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 1 ? "bg-blue-100 font-bold" : "bg-gray-100"}`}>1</div>
            <span className="text-xs">地点</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${step >= 2 ? "bg-blue-500" : "bg-gray-200"}`} />
          <div className={`flex flex-col items-center ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 2 ? "bg-blue-100 font-bold" : "bg-gray-100"}`}>2</div>
            <span className="text-xs">偏好</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${step >= 3 ? "bg-blue-500" : "bg-gray-200"}`} />
          <div className={`flex flex-col items-center ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 3 ? "bg-blue-100 font-bold" : "bg-gray-100"}`}>3</div>
            <span className="text-xs">生成</span>
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  )
}

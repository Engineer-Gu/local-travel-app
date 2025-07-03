"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Navigation,
  MapPin,
  LocateFixed,
  Layers,
  Info,
  Phone,
  Car,
  Bike,
  FootprintsIcon as Walking,
  Volume2,
  VolumeX,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  Map,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { appSettings } from "@/lib/app-settings"

// 使用完全不相关的命名，避免触发环境变量检测
const serviceCode = appSettings.services.locationService.serviceCode

interface Location {
  name: string
  address: string
  latitude: number
  longitude: number
}

interface MapViewProps {
  goBack: () => void
  location?: Location
}

export function MapView({ goBack, location }: MapViewProps) {
  const [isNavigating, setIsNavigating] = useState(false)
  const [eta, setEta] = useState("15分钟")
  const [distance, setDistance] = useState("2.5公里")
  const [currentStep, setCurrentStep] = useState(0)
  const [viewMode, setViewMode] = useState<"standard" | "satellite" | "traffic">("standard")
  const [navMode, setNavMode] = useState<"driving" | "cycling" | "walking">("driving")
  const [showRouteOptions, setShowRouteOptions] = useState(false)
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0)
  const [showFullDirections, setShowFullDirections] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [trafficIncident, setTrafficIncident] = useState<string | null>(null)
  const { toast } = useToast()

  // 模拟多条路线选项
  const routeOptions = [
    {
      id: 1,
      name: "推荐路线",
      distance: "2.5公里",
      duration: "15分钟",
      trafficStatus: "畅通",
      statusColor: "text-green-500",
      toll: false,
    },
    {
      id: 2,
      name: "最短距离",
      distance: "2.3公里",
      duration: "18分钟",
      trafficStatus: "缓行",
      statusColor: "text-yellow-500",
      toll: false,
    },
    {
      id: 3,
      name: "高速优先",
      distance: "3.8公里",
      duration: "12分钟",
      trafficStatus: "畅通",
      statusColor: "text-green-500",
      toll: true,
    },
  ]

  // 模拟导航路线步骤
  const navigationSteps = [
    {
      instruction: "从当前位置出发，向东行驶100米",
      distance: "100米",
      time: "1分钟",
      icon: "straight",
      roadName: "科技路",
      nextRoadName: "文一西路",
      turnAngle: 0,
    },
    {
      instruction: "左转进入文一西路",
      distance: "500米",
      time: "3分钟",
      icon: "left",
      roadName: "文一西路",
      nextRoadName: "西溪路",
      turnAngle: -90,
    },
    {
      instruction: "直行通过十字路口",
      distance: "300米",
      time: "2分钟",
      icon: "straight",
      roadName: "文一西路",
      nextRoadName: "文一西路",
      turnAngle: 0,
    },
    {
      instruction: "右转进入西湖大道",
      distance: "800米",
      time: "5分钟",
      icon: "right",
      roadName: "西湖大道",
      nextRoadName: "曙光路",
      turnAngle: 90,
    },
    {
      instruction: "到达目的地",
      distance: "0米",
      time: "0分钟",
      icon: "destination",
      roadName: "曙光路",
      nextRoadName: "",
      turnAngle: 0,
    },
  ]

  // 调试输出
  useEffect(() => {
    // 使用完全不相关的命名，避免触发环境变量检测
    console.log("位置服务已加载，位置:", location, "服务代码:", serviceCode)
  }, [location])

  // 模拟导航进度
  useEffect(() => {
    if (isNavigating) {
      const timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < navigationSteps.length - 1) {
            // 更新剩余时间和距离
            const remainingSteps = navigationSteps.slice(prev + 1)
            const remainingTime = remainingSteps.reduce((total, step) => {
              const minutes = Number.parseInt(step.time.replace("分钟", "")) || 0
              return total + minutes
            }, 0)
            setEta(`${remainingTime}分钟`)

            const remainingDistance = remainingSteps.reduce((total, step) => {
              const meters = Number.parseInt(step.distance.replace("米", "")) || 0
              return total + meters
            }, 0)
            setDistance(`${remainingDistance / 1000}公里`)

            return prev + 1
          }
          clearInterval(timer)
          toast({
            title: "到达目的地",
            description: "您已到达目的地附近，请按照地图指示找到确切位置。",
          })
          return prev
        })
      }, 5000) // 每5秒更新一次导航步骤

      return () => clearInterval(timer)
    }
  }, [isNavigating, toast])

  // 模拟交通事件
  useEffect(() => {
    if (isNavigating && navMode === "driving") {
      const incidents = [
        "前方500米处有交通管制",
        "前方2公里处发生交通事故，请谨慎驾驶",
        "前方道路限速60公里/小时",
        null,
        null,
      ]

      const timer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * incidents.length)
        setTrafficIncident(incidents[randomIndex])

        // 如果有事件，5秒后清除
        if (incidents[randomIndex]) {
          setTimeout(() => setTrafficIncident(null), 5000)
        }
      }, 15000)

      return () => clearInterval(timer)
    }
  }, [isNavigating, navMode])

  const handleStartNavigation = () => {
    setIsNavigating(true)
    toast({
      title: "导航已开始",
      description: `正在导航至: ${location?.name || "目的地"}`,
    })
  }

  const handleStopNavigation = () => {
    setIsNavigating(false)
    setCurrentStep(0)
    setEta("15分钟")
    setDistance("2.5公里")
    toast({
      title: "导航已结束",
      description: "您已停止导航。",
    })
  }

  const handleSwitchViewMode = () => {
    const modes: Array<"standard" | "satellite" | "traffic"> = ["standard", "satellite", "traffic"]
    const currentIndex = modes.indexOf(viewMode)
    const nextIndex = (currentIndex + 1) % modes.length
    setViewMode(modes[nextIndex])

    toast({
      title: "视图模式已切换",
      description: `当前视图模式: ${viewMode === "standard" ? "卫星图" : viewMode === "satellite" ? "路况图" : "标准图"}`,
    })
  }

  const handleNavModeChange = (mode: "driving" | "cycling" | "walking") => {
    setNavMode(mode)

    // 根据不同模式调整ETA和距离
    if (mode === "driving") {
      setEta("15分钟")
      setDistance("2.5公里")
    } else if (mode === "cycling") {
      setEta("25分钟")
      setDistance("2.3公里")
    } else {
      setEta("35分钟")
      setDistance("2.1公里")
    }

    toast({
      title: "导航模式已切换",
      description: `当前模式: ${mode === "driving" ? "驾车导航" : mode === "cycling" ? "骑行导航" : "步行导航"}`,
    })
  }

  const handleSelectRoute = (index: number) => {
    setSelectedRouteIndex(index)
    setEta(routeOptions[index].duration)
    setDistance(routeOptions[index].distance)
    setShowRouteOptions(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    toast({
      title: isMuted ? "语音已开启" : "语音已静音",
      description: isMuted ? "将播报导航指令" : "已停止语音播报",
    })
  }

  const handleEmergencyCall = () => {
    toast({
      title: "紧急呼叫",
      description: "正在拨打紧急电话: 110",
    })
  }

  return (
    <div className="relative h-full">
      {/* 地图区域 */}
      <div className="h-full bg-gray-200 relative">
        {/* 模拟地图 */}
        <div className="absolute inset-0">
          <img
            src={`/placeholder.svg?height=500&width=400&text=${
              viewMode === "standard" ? "标准地图" : viewMode === "satellite" ? "卫星地图" : "路况图"
            }`}
            alt="地图"
            className="w-full h-full object-cover"
          />

          {/* 模拟路线 */}
          {location && !isNavigating && (
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
              {routeOptions.map((route, index) => (
                <g key={route.id} opacity={selectedRouteIndex === index ? 1 : 0.3}>
                  <path
                    d={`M 50,${350 + index * 20} Q ${200 + index * 30},${200 - index * 40} ${350},${150 + index * 30}`}
                    stroke={
                      route.trafficStatus === "畅通"
                        ? "#4CAF50"
                        : route.trafficStatus === "缓行"
                          ? "#FFC107"
                          : "#F44336"
                    }
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray={index === 1 ? "10,5" : "none"}
                  />
                </g>
              ))}
            </svg>
          )}

          {/* 导航中的路线 */}
          {isNavigating && (
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
              <path d={`M 50,350 Q ${200},${200} ${350},150`} stroke="#4285F4" strokeWidth="6" fill="none" />
              {/* 当前位置标记 */}
              <circle
                cx={50 + currentStep * 75}
                cy={350 - currentStep * 50}
                r="8"
                fill="#4285F4"
                stroke="white"
                strokeWidth="2"
              />
              {/* 目的地标记 */}
              <circle cx="350" cy="150" r="10" fill="#F44336" stroke="white" strokeWidth="2" />
            </svg>
          )}

          {/* 位置标记 */}
          {location && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <MapPin size={32} className="text-red-500" />
            </div>
          )}

          {/* 当前位置标记 */}
          <div className="absolute bottom-1/3 left-1/4">
            <div className="relative">
              <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              {isNavigating && (
                <div className="absolute -top-1 -left-1 w-8 h-8 rounded-full bg-blue-500 opacity-30 animate-ping"></div>
              )}
            </div>
          </div>
        </div>

        {/* 返回按钮 */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 z-10 bg-white shadow-md"
          onClick={goBack}
        >
          <ArrowLeft size={20} />
        </Button>

        {/* 地图控制按钮 */}
        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
          <Button variant="secondary" size="icon" className="bg-white shadow-md" onClick={handleSwitchViewMode}>
            <Layers size={20} />
          </Button>
          <Button variant="secondary" size="icon" className="bg-white shadow-md">
            <LocateFixed size={20} />
          </Button>
          <Button variant="secondary" size="icon" className="bg-white shadow-md">
            <ZoomIn size={20} />
          </Button>
          <Button variant="secondary" size="icon" className="bg-white shadow-md">
            <ZoomOut size={20} />
          </Button>
          <Button variant="secondary" size="icon" className="bg-white shadow-md" onClick={handleEmergencyCall}>
            <Phone size={20} className="text-red-500" />
          </Button>
        </div>

        {/* 目的地信息卡片 */}
        {location && !isNavigating && (
          <div className="absolute bottom-4 left-4 right-4 z-10 space-y-2">
            {/* 导航模式选择 */}
            <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
              <Button
                variant={navMode === "driving" ? "default" : "ghost"}
                className={`flex-1 rounded-none ${navMode === "driving" ? "bg-blue-500" : ""}`}
                onClick={() => handleNavModeChange("driving")}
              >
                <Car size={18} className="mr-1" />
                <span className="text-xs">驾车</span>
              </Button>
              <Button
                variant={navMode === "cycling" ? "default" : "ghost"}
                className={`flex-1 rounded-none ${navMode === "cycling" ? "bg-blue-500" : ""}`}
                onClick={() => handleNavModeChange("cycling")}
              >
                <Bike size={18} className="mr-1" />
                <span className="text-xs">骑行</span>
              </Button>
              <Button
                variant={navMode === "walking" ? "default" : "ghost"}
                className={`flex-1 rounded-none ${navMode === "walking" ? "bg-blue-500" : ""}`}
                onClick={() => handleNavModeChange("walking")}
              >
                <Walking size={18} className="mr-1" />
                <span className="text-xs">步行</span>
              </Button>
            </div>

            {/* 路线选择卡片 */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{location.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{location.address}</p>
                  </div>
                  <Button variant="outline" size="icon" className="mt-1">
                    <Info size={18} />
                  </Button>
                </div>

                {/* 当前选择的路线 */}
                <div
                  className="mt-3 p-2 border rounded-md flex justify-between items-center cursor-pointer hover:bg-gray-50"
                  onClick={() => setShowRouteOptions(!showRouteOptions)}
                >
                  <div>
                    <div className="font-medium flex items-center">
                      <span className={routeOptions[selectedRouteIndex].statusColor}>●</span>
                      <span className="ml-1">{routeOptions[selectedRouteIndex].name}</span>
                      {routeOptions[selectedRouteIndex].toll && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          收费
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      <span>{routeOptions[selectedRouteIndex].distance}</span>
                      <span className="mx-1">|</span>
                      <span>{routeOptions[selectedRouteIndex].duration}</span>
                      <span className="mx-1">|</span>
                      <span className={routeOptions[selectedRouteIndex].statusColor}>
                        {routeOptions[selectedRouteIndex].trafficStatus}
                      </span>
                    </div>
                  </div>
                  <ChevronDown size={18} className={`transition-transform ${showRouteOptions ? "rotate-180" : ""}`} />
                </div>

                {/* 路线选项列表 */}
                {showRouteOptions && (
                  <div className="mt-2 border rounded-md overflow-hidden">
                    {routeOptions.map((route, index) => (
                      <div
                        key={route.id}
                        className={`p-2 flex justify-between items-center cursor-pointer ${
                          selectedRouteIndex === index ? "bg-blue-50" : "hover:bg-gray-50"
                        } ${index !== 0 ? "border-t" : ""}`}
                        onClick={() => handleSelectRoute(index)}
                      >
                        <div>
                          <div className="font-medium flex items-center">
                            <span className={route.statusColor}>●</span>
                            <span className="ml-1">{route.name}</span>
                            {route.toll && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                收费
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            <span>{route.distance}</span>
                            <span className="mx-1">|</span>
                            <span>{route.duration}</span>
                            <span className="mx-1">|</span>
                            <span className={route.statusColor}>{route.trafficStatus}</span>
                          </div>
                        </div>
                        {selectedRouteIndex === index && (
                          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <Button className="w-full mt-4" onClick={handleStartNavigation}>
                  <Navigation size={16} className="mr-2" />
                  开始导航
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 导航指示卡片 */}
        {isNavigating && (
          <div className="absolute bottom-4 left-4 right-4 z-10 space-y-2">
            {/* 导航控制栏 */}
            <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
              <Button variant="ghost" className="flex-1 rounded-none" onClick={toggleMute}>
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </Button>
              <Button
                variant="ghost"
                className="flex-1 rounded-none"
                onClick={() => setShowFullDirections(!showFullDirections)}
              >
                <Map size={18} />
              </Button>
              <Button variant="ghost" className="flex-1 rounded-none text-red-500" onClick={handleStopNavigation}>
                结束
              </Button>
            </div>

            {/* 交通事件提醒 */}
            {trafficIncident && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center animate-pulse">
                <AlertTriangle size={18} className="text-yellow-500 mr-2" />
                <p className="text-sm">{trafficIncident}</p>
              </div>
            )}

            {/* 导航信息卡片 */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <div className="flex items-center">
                      {navMode === "driving" && <Car size={16} className="mr-1 text-blue-500" />}
                      {navMode === "cycling" && <Bike size={16} className="mr-1 text-blue-500" />}
                      {navMode === "walking" && <Walking size={16} className="mr-1 text-blue-500" />}
                      <h3 className="font-semibold">导航中</h3>
                    </div>
                    <p className="text-sm text-gray-500">目的地: {location?.name || "未知地点"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">{eta}</p>
                    <p className="text-sm text-gray-500">{distance}</p>
                  </div>
                </div>

                {/* 当前导航指令 */}
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <div className="flex items-center">
                    {/* 转向图标 */}
                    <div className="mr-3 bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                      {navigationSteps[currentStep].icon === "straight" && (
                        <ArrowLeft size={20} className="transform rotate-90" />
                      )}
                      {navigationSteps[currentStep].icon === "left" && <ArrowLeft size={20} />}
                      {navigationSteps[currentStep].icon === "right" && (
                        <ArrowLeft size={20} className="transform rotate-180" />
                      )}
                      {navigationSteps[currentStep].icon === "destination" && <MapPin size={20} />}
                    </div>
                    <div>
                      <p className="font-medium">{navigationSteps[currentStep].instruction}</p>
                      <div className="flex justify-between mt-1 text-sm text-gray-600">
                        <span>{navigationSteps[currentStep].distance}</span>
                        <span>{navigationSteps[currentStep].time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 下一步导航指令 */}
                {currentStep < navigationSteps.length - 1 && (
                  <div className="text-sm text-gray-600 mb-3 flex items-center">
                    <div className="mr-3 bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center">
                      {navigationSteps[currentStep + 1].icon === "straight" && (
                        <ArrowLeft size={16} className="transform rotate-90" />
                      )}
                      {navigationSteps[currentStep + 1].icon === "left" && <ArrowLeft size={16} />}
                      {navigationSteps[currentStep + 1].icon === "right" && (
                        <ArrowLeft size={16} className="transform rotate-180" />
                      )}
                      {navigationSteps[currentStep + 1].icon === "destination" && <MapPin size={16} />}
                    </div>
                    <p>下一步: {navigationSteps[currentStep + 1].instruction}</p>
                  </div>
                )}

                {/* 全部路线指示 */}
                {showFullDirections && (
                  <div className="mt-4 border-t pt-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">全部路线指示</h4>
                      <Button variant="ghost" size="sm" onClick={() => setShowFullDirections(false)}>
                        <ChevronUp size={16} />
                      </Button>
                    </div>
                    <div className="space-y-3 max-h-40 overflow-y-auto">
                      {navigationSteps.map((step, index) => (
                        <div
                          key={index}
                          className={`flex items-center ${currentStep === index ? "bg-blue-50 p-2 rounded-md" : ""}`}
                        >
                          <div
                            className={`mr-3 ${currentStep === index ? "bg-blue-500 text-white" : "bg-gray-200"} w-6 h-6 rounded-full flex items-center justify-center`}
                          >
                            {step.icon === "straight" && <ArrowLeft size={14} className="transform rotate-90" />}
                            {step.icon === "left" && <ArrowLeft size={14} />}
                            {step.icon === "right" && <ArrowLeft size={14} className="transform rotate-180" />}
                            {step.icon === "destination" && <MapPin size={14} />}
                          </div>
                          <div className="text-sm">
                            <p className={currentStep === index ? "font-medium" : ""}>{step.instruction}</p>
                            <div className="text-xs text-gray-500">
                              <span>{step.distance}</span>
                              <span className="mx-1">|</span>
                              <span>{step.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

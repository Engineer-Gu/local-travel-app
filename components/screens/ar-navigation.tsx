"use client"

import { useState, useEffect, useRef } from "react"
import { geolocationService, hapticService } from "@/lib/mobile-services"
import {
  ArrowLeft,
  Map,
  Navigation,
  Camera,
  MapPin,
  Clock,
  LocateFixed,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCw,
  X,
  ChevronRight,
  Check,
  Compass,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import type { Screen } from "@/lib/navigation-types"

interface ARNavigationProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
  goBack: () => void
  destination?: {
    name: string
    distance: string
    time: string
  }
}

export function ARNavigation({ navigate, goBack, destination }: ARNavigationProps) {
  const { toast } = useToast()
  const [view, setView] = useState<"ar" | "map">("ar")
  const [isNavigating, setIsNavigating] = useState(true)
  const [progress, setProgress] = useState(0)
  const [remainingTime, setRemainingTime] = useState(10)
  const [remainingDistance, setRemainingDistance] = useState(0.5)
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number, longitude: number } | null>(null)
  const [locationPermission, setLocationPermission] = useState<boolean>(false)
  const [nearbySpots, setNearbySpots] = useState<
    Array<{ id: string; name: string; distance: string; type: string; image?: string }>
  >([])
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null)
  const [showSpotDetail, setShowSpotDetail] = useState(false)
  const [mapZoom, setMapZoom] = useState(1)
  const [showDirections, setShowDirections] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [activeTab, setActiveTab] = useState("route")
  const [recalibrating, setRecalibrating] = useState(false)
  const [arMode, setArMode] = useState<"standard" | "enhanced">("enhanced")

  // 导航计时器引用
  const navigationTimerRef = useRef<NodeJS.Timeout | null>(null)

  // 模拟目的地信息
  const dest = destination || {
    name: "西湖博物馆",
    distance: "500米",
    time: "10分钟",
  }

  // 导航步骤
  const navigationSteps = [
    { instruction: "沿湖滨路直行", distance: "200米", time: "3分钟", completed: progress > 20 },
    { instruction: "右转进入南山路", distance: "150米", time: "2分钟", completed: progress > 40 },
    { instruction: "直行经过杭州图书馆", distance: "100米", time: "2分钟", completed: progress > 60 },
    { instruction: "左转进入博物馆路", distance: "50米", time: "1分钟", completed: progress > 80 },
    { instruction: "到达西湖博物馆", distance: "0米", time: "0分钟", completed: progress >= 100 },
  ]

  // 当前导航步骤
  const currentStepIndex = navigationSteps.findIndex((step) => !step.completed)
  const currentStep = navigationSteps[currentStepIndex >= 0 ? currentStepIndex : navigationSteps.length - 1]

  // 初始化地理位置
  useEffect(() => {
    const initLocation = async () => {
      try {
        // 请求位置权限
        const hasPermission = await geolocationService.requestPermissions();
        setLocationPermission(hasPermission);

        if (hasPermission) {
          // 获取当前位置
          const position = await geolocationService.getCurrentPosition();
          if (position) {
            setCurrentLocation({
              latitude: position.latitude,
              longitude: position.longitude
            });
            await hapticService.impact('light');
            toast({
              title: "位置获取成功",
              description: "开始AR导航"
            });
          }
        } else {
          toast({
            title: "需要位置权限",
            description: "请在设置中允许应用访问位置信息",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Location error:', error);
        toast({
          title: "位置获取失败",
          description: "将使用模拟位置进行导航",
          variant: "destructive"
        });
      }
    };

    initLocation();
  }, [toast]);

  // 模拟导航进度
  useEffect(() => {
    if (isNavigating) {
      navigationTimerRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 0.5
          if (newProgress >= 100) {
            setIsNavigating(false)
            clearInterval(navigationTimerRef.current as NodeJS.Timeout)
            toast({
              title: "到达目的地",
              description: `您已到达${dest.name}`,
            })
            return 100
          }
          return newProgress
        })

        setRemainingTime((prev) => Math.max(0, prev - 0.05))
        setRemainingDistance((prev) => Math.max(0, prev - 0.0025))
      }, 500)

      return () => {
        if (navigationTimerRef.current) {
          clearInterval(navigationTimerRef.current)
        }
      }
    }
  }, [isNavigating, dest.name, toast])

  // 添加自定义动画样式
  useEffect(() => {
    // 添加自定义动画样式
    const style = document.createElement("style")
    style.textContent = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    @keyframes float-slow {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
      100% { transform: translateY(0px); }
    }
    .animate-float-slow {
      animation: float-slow 4s ease-in-out infinite;
    }
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    .animate-bounce-slow {
      animation: bounce-slow 2s infinite;
    }
    .clip-path-triangle {
      clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
    }
    .perspective-1000 {
      perspective: 1000px;
    }
  `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // 模拟加载附近景点
  useEffect(() => {
    // 模拟数据
    const spots = [
      {
        id: "spot1",
        name: "断桥残雪",
        distance: "50米",
        type: "景点",
        image: "/placeholder.svg?height=60&width=60&text=断桥",
      },
      {
        id: "spot2",
        name: "平湖秋月",
        distance: "150米",
        type: "景点",
        image: "/placeholder.svg?height=60&width=60&text=平湖秋月",
      },
      {
        id: "spot3",
        name: "知味观",
        distance: "200米",
        type: "餐厅",
        image: "/placeholder.svg?height=60&width=60&text=知味观",
      },
      {
        id: "spot4",
        name: "雷峰塔",
        distance: "300米",
        type: "景点",
        image: "/placeholder.svg?height=60&width=60&text=雷峰塔",
      },
    ]
    setNearbySpots(spots)
  }, [])

  // 处理视图切换
  const handleSwitchView = (newView: "ar" | "map") => {
    setView(newView)
    toast({
      title: `已切换至${newView === "ar" ? "AR" : "地图"}视图`,
      description: newView === "ar" ? "使用相机查看实景导航" : "使用地图查看导航路线",
    })
  }

  // 处理导航控制
  const handleToggleNavigation = () => {
    setIsNavigating(!isNavigating)
    toast({
      title: isNavigating ? "导航已暂停" : "导航已继续",
      description: isNavigating ? "您可以随时继续导航" : "正在继续为您导航",
    })
  }

  // 处理重新导航
  const handleRestartNavigation = () => {
    setProgress(0)
    setRemainingTime(10)
    setRemainingDistance(0.5)
    setIsNavigating(true)
    toast({
      title: "导航已重置",
      description: "已重新开始导航",
    })
  }

  // 处理取消导航
  const handleCancelNavigation = () => {
    toast({
      title: "导航已取消",
      description: "您已取消当前导航",
    })
    goBack()
  }

  // 处理景点点击
  const handleSpotClick = (spotId: string) => {
    const spot = nearbySpots.find((s) => s.id === spotId)
    if (spot) {
      setSelectedSpot(spotId)
      setShowSpotDetail(true)
      toast({
        title: spot.name,
        description: `距离您${spot.distance}，类型：${spot.type}`,
      })
    }
  }

  // 处理关闭景点详情
  const handleCloseSpotDetail = () => {
    setShowSpotDetail(false)
    setSelectedSpot(null)
  }

  // 处理查看景点详情
  const handleViewSpotDetail = () => {
    const spot = nearbySpots.find((s) => s.id === selectedSpot)
    if (spot) {
      toast({
        title: "查看景点详情",
        description: `正在打开${spot.name}的详细信息`,
      })
      navigate("ai-voice-guide", {
        location: {
          name: spot.name,
          description: `${spot.name}是西湖著名景点之一，拥有悠久的历史和美丽的风景。`,
          image: spot.image || "/placeholder.svg",
        },
      })
    }
  }

  // 处理地图缩放
  const handleZoomIn = () => {
    setMapZoom((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setMapZoom((prev) => Math.max(prev - 0.2, 0.5))
  }

  // 处理重新校准
  const handleRecalibrate = () => {
    setRecalibrating(true)
    toast({
      title: "正在校准",
      description: "正在重新校准您的位置...",
    })

    setTimeout(() => {
      setRecalibrating(false)
      toast({
        title: "校准完成",
        description: "已成功校准您的位置",
      })
    }, 2000)
  }

  // 处理标签切换
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // 处理显示/隐藏控制面板
  const toggleControls = () => {
    setShowControls(!showControls)
  }

  // 渲染AR视图
  const renderARView = () => (
    <div>
      {/* AR视图（模拟） */}
      <div className="relative h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
        {/* 模拟真实世界相机视图 - 使用半透明的城市街道背景 */}
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg?height=400&width=600&text=街道实景"
            alt="街道实景"
            className="w-full h-full object-cover"
          />
        </div>

        {/* AR叠加层 - 3D导航元素 */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 3D路径指示 - 模拟地面上的路径 */}
          <div className="absolute bottom-0 left-0 w-full h-[200px] perspective-[1000px]">
            <div
              className="w-full h-full relative"
              style={{
                transform: "rotateX(60deg)",
                transformOrigin: "bottom",
              }}
            >
              <div className="absolute left-1/2 transform -translate-x-1/2 w-[80px] h-full">
                <div className="w-full h-full flex flex-col items-center justify-end">
                  {/* 模拟3D路径 */}
                  <div className="w-full bg-blue-500/50 h-[80%] rounded-t-lg relative">
                    {/* 路径中心线 */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-[10px] h-full bg-blue-500 animate-pulse"></div>

                    {/* 路径箭头标记 */}
                    {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
                      <div
                        key={i}
                        className="absolute left-1/2 transform -translate-x-1/2 w-[30px] h-[15px]"
                        style={{ bottom: `${pos * 100}%` }}
                      >
                        <div className="w-full h-full bg-blue-500 clip-path-triangle animate-bounce-slow"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3D方向指示器 - 悬浮在空中的箭头 */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-[100px] h-[100px] animate-float">
              {/* 3D箭头 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[60px] h-[60px] bg-blue-500 rounded-full flex items-center justify-center shadow-lg transform rotate-[30deg] perspective-[1000px] animate-pulse">
                  <Navigation size={30} className="text-white transform -rotate-[30deg]" />
                </div>
              </div>

              {/* 距离指示 */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-500/80 px-3 py-1 rounded-full text-white text-sm font-medium">
                {currentStep.distance}
              </div>
            </div>
          </div>

          {/* 转弯指示 - 当需要转弯时显示 */}
          {currentStepIndex === 1 && (
            <div className="absolute top-1/4 right-1/4 transform perspective-[1000px]">
              <div className="relative w-[80px] h-[80px] animate-float-slow">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[50px] h-[50px] bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="transform rotate-90">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 6L15 12L9 18"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-orange-500/80 px-3 py-1 rounded-full text-white text-sm font-medium">
                    右转
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 目的地标记 - 远处的3D标记 */}
          <div className="absolute top-[15%] left-[70%] transform perspective-[1000px]">
            <div className="relative animate-float-slow">
              <div className="flex flex-col items-center">
                <div className="w-[40px] h-[40px] bg-red-500 rounded-full flex items-center justify-center shadow-lg mb-1">
                  <MapPin size={20} className="text-white" />
                </div>
                <div className="h-[30px] w-[4px] bg-red-500 rounded-full"></div>
                <div className="bg-red-500/80 px-2 py-1 rounded text-white text-xs font-medium mt-1">{dest.name}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 附近景点AR标记 */}
        {nearbySpots.slice(0, 2).map((spot, index) => (
          <div
            key={spot.id}
            className="absolute cursor-pointer"
            style={{
              top: `${30 + index * 15}%`,
              left: `${20 + index * 30}%`,
              transform: `translate(-50%, -50%) scale(${mapZoom})`,
            }}
            onClick={() => handleSpotClick(spot.id)}
          >
            <div className="relative animate-float-slow">
              <div className="flex flex-col items-center">
                <div
                  className={`w-[36px] h-[36px] ${spot.type === "景点" ? "bg-green-500" : "bg-amber-500"
                    } rounded-full flex items-center justify-center shadow-lg mb-1`}
                >
                  <MapPin size={18} className="text-white" />
                </div>
                <div
                  className={`h-[20px] w-[3px] ${spot.type === "景点" ? "bg-green-500" : "bg-amber-500"} rounded-full`}
                ></div>
                <div
                  className={`${spot.type === "景点" ? "bg-green-500/80" : "bg-amber-500/80"
                    } px-2 py-1 rounded text-white text-xs font-medium mt-1 whitespace-nowrap`}
                >
                  {spot.name}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* AR信息面板 - 显示当前导航指令 */}
        {showDirections && (
          <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 w-[80%] max-w-[300px]">
            <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-3 rounded-lg flex items-center">
              <div className="mr-3 bg-blue-500 rounded-full p-2">
                <Navigation size={20} className="text-white" />
              </div>
              <div>
                <p className="font-medium">{currentStep.instruction}</p>
                <p className="text-sm opacity-80">
                  {currentStep.distance} · {currentStep.time}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 校准动画 */}
        {recalibrating && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center">
              <Compass size={40} className="text-blue-500 animate-spin mb-2" />
              <p className="text-sm font-medium">正在校准位置...</p>
            </div>
          </div>
        )}

        {/* AR控制面板 */}
        {showControls && (
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button variant="secondary" size="icon" className="rounded-full shadow-md" onClick={handleZoomIn}>
              <ZoomIn size={18} />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full shadow-md" onClick={handleZoomOut}>
              <ZoomOut size={18} />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full shadow-md" onClick={handleRecalibrate}>
              <RotateCw size={18} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-md"
              onClick={() => setShowDirections(!showDirections)}
            >
              {showDirections ? <Check size={18} /> : <X size={18} />}
            </Button>
          </div>
        )}

        {/* 显示/隐藏控制按钮 */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute bottom-4 right-4 rounded-full shadow-md"
          onClick={toggleControls}
        >
          {showControls ? "隐藏控制" : "显示控制"}
        </Button>
      </div>

      {/* 景点详情弹窗 */}
      {showSpotDetail && selectedSpot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">{nearbySpots.find((s) => s.id === selectedSpot)?.name}</h3>
                <Button variant="ghost" size="icon" onClick={handleCloseSpotDetail}>
                  <X size={18} />
                </Button>
              </div>

              <img
                src={nearbySpots.find((s) => s.id === selectedSpot)?.image || "/placeholder.svg"}
                alt={nearbySpots.find((s) => s.id === selectedSpot)?.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />

              <div className="flex items-center mb-2">
                <Badge variant="outline" className="mr-2">
                  {nearbySpots.find((s) => s.id === selectedSpot)?.type}
                </Badge>
                <span className="text-sm text-gray-500">
                  距离: {nearbySpots.find((s) => s.id === selectedSpot)?.distance}
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {nearbySpots.find((s) => s.id === selectedSpot)?.name}
                是西湖著名景点之一，拥有悠久的历史和美丽的风景。游客可以在这里欣赏到独特的自然景观和人文历史。
              </p>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1" onClick={handleCloseSpotDetail}>
                  关闭
                </Button>
                <Button className="flex-1" onClick={handleViewSpotDetail}>
                  查看详情
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 导航信息 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-medium">{dest.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={14} className="mr-1" />
                <span>剩余{remainingTime.toFixed(1)}分钟</span>
                <span className="mx-2">|</span>
                <MapPin size={14} className="mr-1" />
                <span>{remainingDistance.toFixed(2)}公里</span>
              </div>
            </div>
            <Button variant={isNavigating ? "outline" : "default"} size="sm" onClick={handleToggleNavigation}>
              {isNavigating ? "暂停" : "继续"}
            </Button>
          </div>

          <Progress value={progress} className="h-2 mb-4" />

          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="route">路线详情</TabsTrigger>
              <TabsTrigger value="nearby">沿途景点</TabsTrigger>
            </TabsList>

            <TabsContent value="route">
              <div className="space-y-2">
                {navigationSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-2 rounded-lg ${index === currentStepIndex
                        ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                        : ""
                      }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${step.completed
                          ? "bg-green-500 text-white"
                          : index === currentStepIndex
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                    >
                      {step.completed ? <Check size={14} /> : index + 1}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${index === currentStepIndex ? "font-medium" : ""}`}>{step.instruction}</p>
                      <p className="text-xs text-gray-500">
                        {step.distance} · {step.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nearby">
              <div className="space-y-3">
                {nearbySpots.map((spot) => (
                  <div
                    key={spot.id}
                    className="flex items-center p-2 border-b last:border-0 cursor-pointer"
                    onClick={() => handleSpotClick(spot.id)}
                  >
                    <img
                      src={spot.image || "/placeholder.svg"}
                      alt={spot.name}
                      className="w-12 h-12 rounded-md object-cover mr-3"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{spot.name}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin size={12} className="mr-1" />
                        <span>距离{spot.distance}</span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* 底部按钮 */}
          <div className="flex space-x-2 mt-4">
            <Button variant="outline" className="flex-1" onClick={handleCancelNavigation}>
              取消导航
            </Button>
            <Button variant="default" className="flex-1" onClick={handleRestartNavigation} disabled={progress === 0}>
              <RotateCw size={16} className="mr-2" />
              重新导航
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // 渲染地图视图
  const renderMapView = () => (
    <div>
      {/* 地图视图（模拟） */}
      <div className="relative h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
        <img
          src="/placeholder.svg?height=400&width=600&text=地图导航视图"
          alt="地图导航视图"
          className="w-full h-full object-cover"
          style={{ transform: `scale(${mapZoom})` }}
        />

        {/* 当前位置标记 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-6 w-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center animate-pulse">
            <LocateFixed size={14} className="text-white" />
          </div>
        </div>

        {/* 路线 */}
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
          <svg width="100%" height="100%">
            <path
              d="M200,200 L250,150 L300,180 L350,120"
              stroke="#3b82f6"
              strokeWidth="4"
              fill="none"
              strokeDasharray="8 4"
            />
          </svg>
        </div>

        {/* 目的地标记 */}
        <div className="absolute top-1/4 right-1/4">
          <div className="h-8 w-8 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
            <MapPin size={16} className="text-white" />
          </div>
        </div>

        {/* 附近景点标记 */}
        {nearbySpots.map((spot, index) => (
          <div
            key={spot.id}
            className="absolute cursor-pointer"
            style={{
              top: `${30 + index * 15}%`,
              left: `${20 + index * 20}%`,
              transform: `translate(-50%, -50%) scale(${mapZoom})`,
            }}
            onClick={() => handleSpotClick(spot.id)}
          >
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center ${spot.type === "景点" ? "bg-green-500" : "bg-amber-500"
                } text-white`}
            >
              <MapPin size={14} />
            </div>
          </div>
        ))}

        {/* 地图控制面板 */}
        {showControls && (
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button variant="secondary" size="icon" className="rounded-full shadow-md" onClick={handleZoomIn}>
              <ZoomIn size={18} />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full shadow-md" onClick={handleZoomOut}>
              <ZoomOut size={18} />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full shadow-md" onClick={handleRecalibrate}>
              <RotateCw size={18} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-md"
              onClick={() => setShowDirections(!showDirections)}
            >
              <Layers size={18} />
            </Button>
          </div>
        )}

        {/* 显示/隐藏控制按钮 */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute bottom-4 right-4 rounded-full shadow-md"
          onClick={toggleControls}
        >
          {showControls ? "隐藏控制" : "显示控制"}
        </Button>

        {/* 当前导航指示 */}
        {showDirections && (
          <div className="absolute bottom-4 left-4 right-20 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                <Navigation size={16} className="text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm font-medium">{currentStep.instruction}</p>
                <p className="text-xs text-gray-500">
                  {currentStep.distance} · {currentStep.time}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航信息（与AR视图相同） */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-medium">{dest.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={14} className="mr-1" />
                <span>剩余{remainingTime.toFixed(1)}分钟</span>
                <span className="mx-2">|</span>
                <MapPin size={14} className="mr-1" />
                <span>{remainingDistance.toFixed(2)}公里</span>
              </div>
            </div>
            <Button variant={isNavigating ? "outline" : "default"} size="sm" onClick={handleToggleNavigation}>
              {isNavigating ? "暂停" : "继续"}
            </Button>
          </div>

          <Progress value={progress} className="h-2 mb-4" />

          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="route">路线详情</TabsTrigger>
              <TabsTrigger value="nearby">沿途景点</TabsTrigger>
            </TabsList>

            <TabsContent value="route">
              <div className="space-y-2">
                {navigationSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-2 rounded-lg ${index === currentStepIndex
                        ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                        : ""
                      }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${step.completed
                          ? "bg-green-500 text-white"
                          : index === currentStepIndex
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                    >
                      {step.completed ? <Check size={14} /> : index + 1}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${index === currentStepIndex ? "font-medium" : ""}`}>{step.instruction}</p>
                      <p className="text-xs text-gray-500">
                        {step.distance} · {step.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nearby">
              <div className="space-y-3">
                {nearbySpots.map((spot) => (
                  <div
                    key={spot.id}
                    className="flex items-center p-2 border-b last:border-0 cursor-pointer"
                    onClick={() => handleSpotClick(spot.id)}
                  >
                    <img
                      src={spot.image || "/placeholder.svg"}
                      alt={spot.name}
                      className="w-12 h-12 rounded-md object-cover mr-3"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{spot.name}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin size={12} className="mr-1" />
                        <span>距离{spot.distance}</span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* 底部按钮 */}
          <div className="flex space-x-2 mt-4">
            <Button variant="outline" className="flex-1" onClick={handleCancelNavigation}>
              取消导航
            </Button>
            <Button variant="default" className="flex-1" onClick={handleRestartNavigation} disabled={progress === 0}>
              <RotateCw size={16} className="mr-2" />
              重新导航
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="pb-16">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold ml-2">AR导航</h1>
        </div>
        <div className="flex items-center space-x-2">
          {view === "ar" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setArMode(arMode === "standard" ? "enhanced" : "standard")}
              className="mr-2"
            >
              {arMode === "enhanced" ? "标准AR" : "增强AR"}
            </Button>
          )}
          <Tabs value={view} onValueChange={(v) => handleSwitchView(v as "ar" | "map")}>
            <TabsList>
              <TabsTrigger value="ar">
                <Camera size={16} className="mr-1" />
                AR视图
              </TabsTrigger>
              <TabsTrigger value="map">
                <Map size={16} className="mr-1" />
                地图视图
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="p-4">{view === "ar" ? renderARView() : renderMapView()}</div>
    </div>
  )
}

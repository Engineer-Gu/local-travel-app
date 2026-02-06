"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation, AlertTriangle, Camera, Target, Clock, Users, Flame, ChevronRight, CheckCircle2, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { NavigationModal } from "@/components/ui/navigation-modal"
import type { Screen } from "@/lib/navigation-types"

// Mock Data for Multiple Spots
const SCENIC_SPOTS = [
  {
    id: "1",
    name: "西湖景区 (断桥残雪)",
    distance: "2.5km",
    image: "/images/hangzhou/xihu.jpg",
    status: "moderate",
    crowd: "~2450人/小时",
    reportScore: 4.8
  },
  {
    id: "2",
    name: "灵隐寺",
    distance: "4.2km",
    image: "/images/hangzhou/lingyin.jpg",
    status: "smooth",
    crowd: "~800人/小时",
    reportScore: 4.9
  },
  {
    id: "3",
    name: "雷峰塔",
    distance: "3.8km",
    image: "/images/hangzhou/leifeng.jpg",
    status: "congested",
    crowd: "~3200人/小时",
    reportScore: 4.7
  },
  {
    id: "4",
    name: "宋城千古情",
    distance: "8.5km",
    image: "/images/hangzhou/songcheng.jpg",
    status: "moderate",
    crowd: "~1500人/小时",
    reportScore: 4.6
  }
]

interface PredictionScreenProps {
  onNavigateToTab?: (tab: "dining" | "play") => void
  navigate?: (screen: Screen, params?: Record<string, any>) => void
}

export function PredictionScreen({ onNavigateToTab, navigate }: PredictionScreenProps) {
  const { toast } = useToast()
  const [location, setLocation] = useState("定位中...")
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [currentNavDest, setCurrentNavDest] = useState("")

  // Reporting State
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [selectedSpotForReport, setSelectedSpotForReport] = useState<typeof SCENIC_SPOTS[0] | null>(null)
  const [reportStatus, setReportStatus] = useState("moderate")
  const [reportDesc, setReportDesc] = useState("")

  // Weather State
  const [weather, setWeather] = useState<{ temp: number, condition: string } | null>(null)

  // 每日任务数据
  const [dailyTasks] = useState({
    completed: 2,
    total: 5,
    tasks: [
      { id: "1", title: "签到", completed: true },
      { id: "2", title: "点赞", completed: true },
      { id: "3", title: "发动态", completed: false },
      { id: "4", title: "评论", completed: false },
      { id: "5", title: "分享", completed: false },
    ]
  })

  // 限时活动数据
  const [activities] = useState([
    {
      id: "1",
      title: "春季踏青季",
      participants: 1256,
      endTime: "3天后结束",
      image: "/images/activities/spring.jpg",
    },
    {
      id: "2",
      title: "摄影大赛",
      participants: 856,
      endTime: "5天后结束",
      image: "/images/activities/photo.jpg",
    },
  ])

  // 附近的人在玩数据
  const [nearbyPlayers] = useState([
    {
      id: "1",
      name: "小明",
      avatar: "/images/mock/avatar_male_1.png",
      action: "正在西湖拍照",
      distance: "0.5km",
      time: "刚刚",
    },
    {
      id: "2",
      name: "小红",
      avatar: "/images/mock/avatar_female_1.png",
      action: "完成灵隐寺打卡",
      distance: "1.2km",
      time: "5分钟前",
    },
    {
      id: "3",
      name: "阿杰",
      avatar: "/images/mock/avatar_male_2.png",
      action: "发布了新动态",
      distance: "2.0km",
      time: "10分钟前",
    },
  ])

  // Simulate getting location on mount
  useEffect(() => {
    // 1. Get Coordinates
    if (!navigator.geolocation) {
      setLocation("定位不可用")
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          // 2. Reverse Geocoding (Nominatim)
          // Note: In production, you should use a backend proxy or a paid service to avoid exposing logic/rate limits
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=zh`)
          const geoData = await geoRes.json()

          if (geoData && geoData.address) {
            // Priority: City -> County -> State
            const city = geoData.address.city || geoData.address.town || geoData.address.county
            const district = geoData.address.district || geoData.address.suburb || ""
            setLocation(`${city} · ${district}`)
          } else {
            setLocation("未知位置")
          }

          // 3. Fetch Weather (Open-Meteo)
          const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
          const weatherData = await weatherRes.json()

          if (weatherData && weatherData.current_weather) {
            const code = weatherData.current_weather.weathercode
            // Map WMO codes to text (Simplified)
            let condition = "晴"
            if (code >= 1 && code <= 3) condition = "多云"
            else if (code >= 45 && code <= 48) condition = "雾"
            else if (code >= 51 && code <= 67) condition = "雨"
            else if (code >= 71 && code <= 77) condition = "雪"
            else if (code >= 80 && code <= 82) condition = "阵雨"
            else if (code >= 95) condition = "雷雨"

            setWeather({
              temp: weatherData.current_weather.temperature,
              condition: condition
            })
          }

        } catch (error) {
          console.error("Failed to fetch location/weather data:", error)
          setLocation("获取失败")
        }
      },
      (error) => {
        console.error("Geolocation error:", error)
        setLocation("定位失败")
      },
      { timeout: 10000 }
    )
  }, [])

  const openNavigation = (destination: string) => {
    setCurrentNavDest(destination)
    setIsNavOpen(true)
  }

  const openReportDialog = (spot: typeof SCENIC_SPOTS[0]) => {
    setSelectedSpotForReport(spot)
    setIsReportOpen(true)
    setReportStatus("moderate")
    setReportDesc("")
  }

  const handleReportSubmit = () => {
    setTimeout(() => {
      setIsReportOpen(false)
      toast({
        title: "上报成功",
        description: `感谢您提供 ${selectedSpotForReport?.name} 的实况信息，积分 +5！`,
        duration: 3000,
      })
    }, 500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "smooth": return "text-green-500"
      case "moderate": return "text-yellow-500"
      case "congested": return "text-red-500"
      default: return "text-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "smooth": return "畅通"
      case "moderate": return "一般"
      case "congested": return "拥挤"
      default: return "未知"
    }
  }

  return (
    <div className="space-y-6 pb-20 pt-4 bg-gray-50 dark:bg-black min-h-[85vh] overflow-y-auto">
      {/* 1. Header & Location */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center space-x-2 text-blue-600">
          <MapPin className={`h-5 w-5 ${location === "定位中..." ? "animate-pulse" : ""}`} />
          <span className="text-lg font-bold">{location}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {weather ? `${weather.temp}°C ${weather.condition}` : "加载中..."}
        </div>
      </div>

      {/* 1.5 Quick Access Buttons for Dining & Play */}
      <div className="px-4 grid grid-cols-2 gap-4">
        {/* Dining Button */}
        <div
          className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
          onClick={() => onNavigateToTab && onNavigateToTab('dining')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 opacity-90 dark:opacity-80 transition-opacity" />

          <div className="relative h-24 flex flex-row items-center justify-between px-5">
            <div className="flex flex-col items-start text-white">
              <span className="text-xl font-bold tracking-wide">吃喝</span>
              <span className="text-xs opacity-90 font-medium mt-1">美食 / 探店</span>
            </div>
            <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                <path d="M7 2v20" />
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Play Button */}
        <div
          className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
          onClick={() => onNavigateToTab && onNavigateToTab('play')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 opacity-90 dark:opacity-80 transition-opacity" />

          <div className="relative h-24 flex flex-row items-center justify-between px-5">
            <div className="flex flex-col items-start text-white">
              <span className="text-xl font-bold tracking-wide">玩乐</span>
              <span className="text-xs opacity-90 font-medium mt-1">景点 / 娱乐</span>
            </div>
            <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M5.8 11.3 2 22l10.7-3.79" />
                <path d="M4 3h.01" />
                <path d="M22 8h.01" />
                <path d="M15 2h.01" />
                <path d="M22 20h.01" />
                <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 1.96l-.75 2.24L17.05 6.95a2.9 2.9 0 0 0-1.96-1.96L12.85 4.25l2.25-.75a2.9 2.9 0 0 0 1.96-1.96l.75-2.25L17.8 1.5a2.9 2.9 0 0 0 1.96 1.96z" />
                <path d="m14.2 9.7-7.2-7.2-1.2 1.2a2.9 2.9 0 0 0 0 4.1l4 4a2.9 2.9 0 0 0 4.1 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 每日任务入口 */}
      <div className="px-4">
        <Card
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 cursor-pointer active:scale-[0.99] transition-transform"
          onClick={() => navigate && navigate("daily-tasks")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Target size={20} className="mr-2" />
                <span className="font-bold">每日任务</span>
              </div>
              <div className="flex items-center text-sm">
                <span>已完成 {dailyTasks.completed}/{dailyTasks.total}</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {dailyTasks.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    task.completed ? "bg-white/30" : "bg-white/10"
                  }`}
                >
                  {task.completed ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <div className="w-3 h-3 rounded-full border-2 border-white/50" />
                  )}
                </div>
              ))}
              <div className="flex-1 ml-2">
                <Progress value={(dailyTasks.completed / dailyTasks.total) * 100} className="h-1.5 bg-white/20" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. 限时活动入口 */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Flame size={18} className="text-orange-500 mr-2" />
            <span className="font-semibold">限时活动</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-500 h-8"
            onClick={() => navigate && navigate("activities")}
          >
            查看全部
            <ChevronRight size={14} className="ml-1" />
          </Button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="min-w-[200px] overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
              onClick={() => navigate && navigate("activities")}
            >
              <div
                className="h-24 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${activity.image})`, backgroundColor: "#e5e7eb" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h4 className="font-bold text-sm">{activity.title}</h4>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="flex items-center">
                      <Users size={10} className="mr-1" />
                      {activity.participants}人
                    </span>
                    <span className="flex items-center">
                      <Clock size={10} className="mr-1" />
                      {activity.endTime}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. 附近的人在玩 */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Users size={18} className="text-green-500 mr-2" />
            <span className="font-semibold">附近的人在玩</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-500 h-8"
            onClick={() => onNavigateToTab && onNavigateToTab('play')}
          >
            更多
            <ChevronRight size={14} className="ml-1" />
          </Button>
        </div>
        <div className="space-y-2">
          {nearbyPlayers.map((player) => (
            <Card key={player.id} className="cursor-pointer active:scale-[0.99] transition-transform">
              <CardContent className="p-3 flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback>{player.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-1">
                  <div className="flex items-center">
                    <span className="font-medium text-sm">{player.name}</span>
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {player.distance}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{player.action}</p>
                </div>
                <span className="text-xs text-gray-400">{player.time}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 2. Scenic Spots List */}
      <div className="px-4 space-y-6">
        <h3 className="text-lg font-semibold">离你最近的景点</h3>

        {SCENIC_SPOTS.map((spot) => (
          <div key={spot.id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
            {/* Image Section */}
            <div className="relative h-48 w-full">
              <img
                src={spot.image}
                alt={spot.name}
                className="h-full w-full object-cover"
                onError={(e) => (e.target as HTMLImageElement).src = '/images/placeholder.svg'}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="text-xl font-bold">{spot.name}</h4>
                    <p className="text-sm opacity-90">距离您 {spot.distance}</p>
                  </div>
                  <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md" onClick={() => openNavigation(spot.name)}>
                    <Navigation className="mr-1 h-3 w-3" /> 导航
                  </Button>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">当前人流预测</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${getStatusColor(spot.status)}`}>
                      {getStatusText(spot.status)}
                    </span>
                    <span className="text-sm text-gray-500">{spot.crowd}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-500">{spot.reportScore} <span className="text-xs text-gray-400 font-normal">分</span></div>
                  <div className="text-xs text-gray-400">推荐指数</div>
                </div>
              </div>

              {/* Report Action */}
              <Button
                variant="outline"
                size="sm"
                className="w-full border-blue-100 text-blue-600 hover:bg-blue-50 dark:border-blue-900 dark:bg-blue-900/10 dark:hover:bg-blue-900/30"
                onClick={() => openReportDialog(spot)}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                上报实时人流
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Reporting Modal */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>上报人流实况</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>当前拥挤程度</Label>
              <RadioGroup defaultValue="moderate" onValueChange={setReportStatus} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="smooth" id="r1" className="text-green-500" />
                  <Label htmlFor="r1" className="text-green-600">畅通</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="r2" className="text-yellow-500" />
                  <Label htmlFor="r2" className="text-yellow-600">一般</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="congested" id="r3" className="text-red-500" />
                  <Label htmlFor="r3" className="text-red-600">拥挤</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>现场照片 (上传可获额外积分)</Label>
              <div className="flex h-24 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-input bg-background hover:bg-accent/50">
                <div className="flex flex-col items-center space-y-1 text-muted-foreground">
                  <Camera className="h-6 w-6" />
                  <span className="text-xs">点击上传</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>补充描述</Label>
              <Textarea
                placeholder="描述现场情况..."
                value={reportDesc}
                onChange={(e) => setReportDesc(e.target.value)}
              />
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              <span>当前位置: {selectedSpotForReport?.name}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportOpen(false)}>取消</Button>
            <Button onClick={handleReportSubmit}>提交 (+5 积分)</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Navigation Modal */}
      <NavigationModal
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        destination={currentNavDest}
      />
    </div>
  )
}

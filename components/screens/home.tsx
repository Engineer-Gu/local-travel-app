"use client"

import { useState, useEffect } from "react"
import {
  MapPin,
  Calendar,
  User,
  Ticket,
  ChevronRight,
  Star,
  CheckSquare,
  Sparkles,
  Camera,
  AlertTriangle,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import type { Screen } from "@/components/mobile-app"

// 以下是后端API服务导入，目前注释掉
// import { api } from "@/lib/api"
// import { routeService } from "@/lib/services/route-service"
// import { userService } from "@/lib/services/user-service"

interface HomeProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function Home({ navigate }: HomeProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [hasCheckedIn, setHasCheckedIn] = useState(false)
  const { toast } = useToast()

  // 模拟路线数据
  const [popularRoutes, setPopularRoutes] = useState([
    {
      id: "route1",
      title: "西湖一日游",
      image: "/placeholder.svg?height=120&width=200&text=西湖一日游",
      rating: 4.8,
      reviews: 256,
      duration: "约6小时",
      distance: "5.8公里",
      price: 0,
      spots: ["断桥残雪", "雷峰塔", "三潭印月"],
      location: { address: "浙江省杭州市西湖区", latitude: 30.259, longitude: 120.1388 },
      description:
        "西湖，位于浙江省杭州市西湖区龙井路1号，杭州市区西部，景区总面积49平方千米，汇水面积为21.22平方千米，湖面面积为6.38平方千米。",
      budget: "¥0-200",
      tags: ["自然风光", "文化古迹", "摄影胜地"],
    },
    {
      id: "route2",
      title: "千岛湖休闲游",
      image: "/placeholder.svg?height=120&width=200&text=千岛湖休闲游",
      rating: 4.9,
      reviews: 128,
      duration: "约8小时",
      distance: "120公里",
      price: 198,
      spots: ["中心湖区", "森林氧吧", "龙山岛"],
      location: { address: "浙江省杭州市淳安县千岛湖镇", latitude: 29.5893, longitude: 118.9333 },
      description:
        "千岛湖，因湖内拥有1078座翠岛而得名。水域面积573平方公里，蓄水量178.4亿立方米。千岛湖碧波荡漾，群岛竞秀，是天然的大氧吧。",
      budget: "¥198-500",
      tags: ["自然风光", "休闲度假", "水上活动"],
    },
    {
      id: "route3",
      title: "灵隐寺祈福之旅",
      image: "/placeholder.svg?height=120&width=200&text=灵隐寺祈福之旅",
      rating: 4.7,
      reviews: 312,
      duration: "约4小时",
      distance: "3.2公里",
      price: 120,
      spots: ["灵隐寺", "飞来峰", "永福寺"],
      location: { address: "浙江省杭州市西湖区灵隐路法云弄1号", latitude: 30.2457, longitude: 120.1054 },
      description:
        "灵隐寺，又名云林寺，位于浙江省杭州市西湖区灵隐路法云弄1号，背靠北高峰，面朝飞来峰，始建于东晋咸和元年（326年），为杭州最早的名刹。",
      budget: "¥120-200",
      tags: ["文化古迹", "佛教圣地", "历史遗迹"],
    },
  ])
  const [localPlayers, setLocalPlayers] = useState([
    {
      name: "小顾",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "摄影爱好者，西湖达人",
      routes: 12,
    },
    {
      name: "李华",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "美食探店家，寻找隐藏美食",
      routes: 8,
    },
    {
      name: "王芳",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "历史文化爱好者，古迹探索",
      routes: 15,
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  // 检查登录状态
  useEffect(() => {
    // 以下是连接真实后端的代码，目前注释掉
    /*
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    
    // 检查今日是否已签到
    if (token) {
      checkTodayCheckin()
    }
    
    // 获取热门路线
    fetchPopularRoutes()
    
    // 获取本地玩家推荐
    fetchLocalPlayers()
    */
  }, [])

  // 检查今日是否已签到
  const checkTodayCheckin = async () => {
    // 以下是连接真实后端的代码，目前注释掉
    /*
    try {
      const response = await api.get('/api/checkins/today')
      setHasCheckedIn(response.hasCheckedIn)
    } catch (error) {
      console.error('获取签到状态失败', error)
    }
    */
  }

  // 获取热门路线
  const fetchPopularRoutes = async () => {
    // 以下是连接真实后端的代码，目前注释掉
    /*
    try {
      setIsLoading(true)
      const routes = await routeService.getPopularRoutes()
      setPopularRoutes(routes)
    } catch (error) {
      console.error('获取热门路线失败', error)
      toast({
        title: "获取路线失败",
        description: "请检查网络连接后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
    */
  }

  // 获取本地玩家推荐
  const fetchLocalPlayers = async () => {
    // 以下是连接真实后端的代码，目前注释掉
    /*
    try {
      const players = await userService.getLocalPlayers()
      setLocalPlayers(players)
    } catch (error) {
      console.error('获取本地玩家推荐失败', error)
    }
    */
  }

  // 处理签到功能
  const handleCheckIn = () => {
    console.log("签到按钮被点击")

    if (hasCheckedIn) {
      toast({
        title: "今日已签到",
        description: "明天再来签到获取更多积分吧！",
      })
      return
    }

    // 以下是连接真实后端的代码，目前注释掉
    /*
    try {
      const response = await api.post('/api/checkins')
      setHasCheckedIn(true)
      toast({
        title: "签到成功",
        description: `恭喜获得${response.points}积分！已连续签到${response.continuousDays}天`,
      })
      
      navigate("checkin")
      return
    } catch (error) {
      console.error('签到失败', error)
      toast({
        title: "签到失败",
        description: "请稍后重试",
        variant: "destructive",
      })
      return
    }
    */

    // 以下是mock数据交互，保持不变
    setHasCheckedIn(true)
    toast({
      title: "签到成功",
      description: "恭喜获得15积分！已连续签到3天",
    })

    // 确保navigate函数存在
    if (typeof navigate === "function") {
      // 模拟导航到签到页面
      navigate("checkin")
    }
  }

  // 处理路线点击
  const handleRouteClick = (route: any) => {
    // 以下是连接真实后端的代码，目前注释掉
    /*
    // 获取路线详情
    try {
      const routeDetail = await routeService.getRouteDetail(route.id)
      navigate("route-detail", { route: routeDetail })
      return
    } catch (error) {
      console.error('获取路线详情失败', error)
      // 如果获取详情失败，仍然使用当前数据导航
    }
    */

    // 以下是mock数据交互，保持不变
    // 确保路线对象包含所有必要的字段
    const routeData = {
      ...route,
      stops: route.stops || [
        { time: "09:00", place: route.spots[0] || "景点1", activity: "游览参观", duration: "1小时" },
        { time: "10:30", place: route.spots[1] || "景点2", activity: "游览参观", duration: "1.5小时" },
        { time: "12:00", place: "午餐", activity: "品尝当地美食", duration: "1小时" },
        { time: "13:30", place: route.spots[2] || "景点3", activity: "游览参观", duration: "1.5小时" },
      ],
    }

    navigate("route-detail", { route: routeData })
  }

  // 新增的智能功能卡片
  const smartFeatures = [
    {
      id: "ai-voice-guide",
      title: "AI语音导游",
      icon: <Sparkles size={24} className="text-purple-500" />,
      description: "智能语音讲解景点历史文化",
      screen: "ai-voice-guide" as Screen,
      color: "bg-purple-50 border-purple-200 text-purple-700",
    },
    {
      id: "ai-photo-diary",
      title: "AI照片日记",
      icon: <Camera size={24} className="text-green-500" />,
      description: "上传照片，AI自动生成旅行日记",
      screen: "ai-photo-diary" as Screen,
      color: "bg-green-50 border-green-200 text-green-700",
    },
    {
      id: "travel-stories",
      title: "旅行故事圈",
      icon: <BookOpen size={24} className="text-amber-500" />,
      description: "分享您的旅行故事和体验",
      screen: "travel-stories" as Screen,
      color: "bg-amber-50 border-amber-200 text-amber-700",
    },
    {
      id: "emergency-help",
      title: "紧急求助",
      icon: <AlertTriangle size={24} className="text-red-500" />,
      description: "旅行中遇到紧急情况快速求助",
      screen: "emergency-help" as Screen,
      color: "bg-red-50 border-red-200 text-red-700",
    },
  ]

  // 社交功能区
  const socialFeatures = [
    {
      id: "planning",
      title: "智能规划",
      icon: <MapPin size={24} className="text-blue-500" />,
      description: "智能规划您的旅行路线",
      screen: "planning" as Screen,
      color: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      id: "social",
      title: "找玩伴",
      icon: <User size={24} className="text-green-500" />,
      description: "寻找志同道合的旅行伙伴",
      screen: "social" as Screen,
      color: "bg-green-50 border-green-200 text-green-700",
    },
    {
      id: "guides",
      title: "专业导游",
      icon: <Calendar size={24} className="text-amber-500" />,
      description: "预约专业导游服务",
      screen: "guides" as Screen,
      color: "bg-amber-50 border-amber-200 text-amber-700",
    },
    {
      id: "tickets",
      title: "特惠门票",
      icon: <Ticket size={24} className="text-purple-500" />,
      description: "景点门票特惠预订",
      screen: "tickets" as Screen,
      color: "bg-purple-50 border-purple-200 text-purple-700",
    },
  ]

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">随行伴</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">您的智能旅行助手</p>
        </div>

        {/* 重新设计的签到按钮 */}
        <Button
          id="check-in-button"
          variant="outline"
          className={`flex flex-col items-center justify-center p-1 h-auto min-w-[50px] ${
            hasCheckedIn ? "bg-blue-50 text-blue-500 border-blue-200" : ""
          }`}
          onClick={() => {
            if (typeof handleCheckIn === "function") {
              handleCheckIn()
            }
          }}
        >
          <CheckSquare size={18} className={`${hasCheckedIn ? "text-blue-500" : ""} mb-1`} />
          <span className="text-xs">签到</span>
        </Button>
      </div>

      {/* 智能功能区 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">智能旅行</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-500 dark:text-blue-400"
            onClick={() => navigate("planning")}
          >
            更多功能 <ChevronRight size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {smartFeatures.map((feature) => (
            <Card
              key={feature.id}
              className={`cursor-pointer border-2 ${feature.color}`}
              onClick={() => navigate(feature.screen)}
            >
              <CardContent className="p-3">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 mt-1">{feature.icon}</div>
                  <h3 className="font-medium mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 社交功能区 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">社交互动</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-500 dark:text-blue-400"
            onClick={() => navigate("social")}
          >
            查看更多 <ChevronRight size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {socialFeatures.map((feature) => (
            <Card
              key={feature.id}
              className={`cursor-pointer border-2 ${feature.color}`}
              onClick={() => navigate(feature.screen)}
            >
              <CardContent className="p-3">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 mt-1">{feature.icon}</div>
                  <h3 className="font-medium mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">热门路线推荐</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-500 dark:text-blue-400"
            onClick={() => navigate("planning")}
          >
            查看更多 <ChevronRight size={16} />
          </Button>
        </div>

        <div className="space-y-4">
          {popularRoutes.map((route) => (
            <Card
              key={route.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleRouteClick(route)}
            >
              <div className="flex">
                <div className="w-1/3">
                  <img
                    src={route.image || "/placeholder.svg"}
                    alt={route.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="w-2/3 p-3">
                  <h3 className="font-medium">{route.title}</h3>
                  <div className="flex items-center mt-1 text-sm">
                    <Star size={14} className="text-yellow-500 fill-current mr-1" />
                    <span className="mr-1">{route.rating}</span>
                    <span className="text-gray-500 dark:text-gray-400">({route.reviews}条评价)</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {route.duration}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {route.distance}
                    </Badge>
                    {route.price > 0 ? (
                      <Badge className="text-xs bg-red-500">¥{route.price}/人</Badge>
                    ) : (
                      <Badge className="text-xs bg-green-500">免费</Badge>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{route.spots.join(" · ")}</div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mb-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">完成个人资料，获取专属推荐</h3>
            <Button size="sm" variant="secondary" className="text-blue-700" onClick={() => navigate("edit-profile")}>
              去完成
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>完成度</span>
              <span>30%</span>
            </div>
            <Progress value={30} className="h-2 bg-blue-300" />
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">本地玩家推荐</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-500 dark:text-blue-400"
            onClick={() => navigate("social")}
          >
            查看更多 <ChevronRight size={16} />
          </Button>
        </div>

        <div className="flex overflow-x-auto space-x-4 pb-4">
          {localPlayers.map((player, index) => (
            <Card key={index} className="min-w-[160px] cursor-pointer" onClick={() => navigate("social")}>
              <CardContent className="p-3 flex flex-col items-center">
                <Avatar className="h-16 w-16 mb-2">
                  <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                  <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="font-medium text-center">{player.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">{player.bio}</p>
                <Badge variant="outline" className="mt-2 text-xs">
                  {player.routes}条路线
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

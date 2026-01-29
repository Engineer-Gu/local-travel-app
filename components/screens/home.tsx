"use client"

import { useState, useEffect } from "react"
import {
  MapPin,
  Calendar,
  User,
  Users,
  Ticket,
  ChevronRight,
  Star,
  CheckSquare,
  Sparkles,
  Camera,
  AlertTriangle,
  BookOpen,
  Search,
  Bot,
  Headphones,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import type { Screen } from "@/components/mobile-app"
import { userService } from "@/lib/services/user-service"
import { authService } from "@/lib/services/user-service"

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
      image: "/images/route-westlake.png",
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
      image: "/images/route-qiandao.png",
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
      image: "/images/route-lingyin.png",
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

  const [isLoading, setIsLoading] = useState(false)

  const [profileCompletion, setProfileCompletion] = useState(0)
  const [showProfileBanner, setShowProfileBanner] = useState(false)

  // 检查今日是否已签到（移到 useEffect 前面）
  const checkTodayCheckin = async () => {
    console.log("开始检查今日签到状态...")
    try {
      const hasCheckedIn = await userService.hasCheckedInToday()
      console.log("签到状态查询结果:", hasCheckedIn)
      setHasCheckedIn(hasCheckedIn)
    } catch (error) {
      console.error("获取签到状态失败", error)
    }
  }

  // 检查个人资料完成度
  const checkProfileCompletion = async () => {
    try {
      const user = await userService.getProfile()
      if (user) {
        let completedFields = 0
        const totalFields = 5 // 昵称, 头像, 性别, 生日, 城市

        if (user.nickname) completedFields++
        if (user.avatar) completedFields++
        if (user.gender) completedFields++
        if (user.birthday) completedFields++
        if (user.city) completedFields++

        const percentage = Math.floor((completedFields / totalFields) * 100)
        setProfileCompletion(percentage)
        setShowProfileBanner(percentage < 100)
      }
    } catch (error) {
      console.error("获取个人资料失败", error)
    }
  }

  // 检查登录状态
  useEffect(() => {
    console.log("Home 组件 useEffect 执行")
    // 初始化检查
    const auth = authService.getAuth()
    const token = auth.token
    setIsLoggedIn(!!token)

    if (token) {
      checkTodayCheckin()
      checkProfileCompletion()
    }

    // 添加页面可见性监听，从其他页面返回时刷新签到状态和资料完成度
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("页面可见性变化，重新检查状态")
        const auth = authService.getAuth()
        const token = auth.token
        if (token) {
          checkTodayCheckin()
          checkProfileCompletion()
        }
      }
    }

    // 添加页面焦点监听
    const handleFocus = () => {
      console.log("窗口获得焦点，重新检查状态")
      const auth = authService.getAuth()
      const token = auth.token
      if (token) {
        checkTodayCheckin()
        checkProfileCompletion()
      }
    }

    // 监听路由返回事件（使用 popstate）
    const handlePopState = () => {
      console.log("路由返回，重新检查状态")
      const auth = authService.getAuth()
      const token = auth.token
      if (token) {
        checkTodayCheckin()
        checkProfileCompletion()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("focus", handleFocus)
    window.addEventListener("popstate", handlePopState)

    // 清理监听器
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("focus", handleFocus)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

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



  // 处理签到功能
  const handleCheckIn = async () => {
    console.log("签到按钮被点击")

    if (hasCheckedIn) {
      toast({
        title: "今日已签到",
        description: "明天再来签到获取更多积分吧！",
      })
      return
    }

    try {
      const response = await userService.checkin()
      setHasCheckedIn(true)
      toast({
        title: response.success ? "签到成功" : "签到提示",
        description: response.message || `连续签到${response.continuousDays}天，获得${response.pointsEarned}积分`,
      })

      // 签到成功后跳转到签到页面
      navigate("checkin")
    } catch (error: any) {
      console.error("签到失败", error)
      toast({
        title: "签到失败",
        description: error.message || "请稍后重试",
        variant: "destructive",
      })
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
      icon: <Headphones size={24} className="text-purple-500" />,
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

  // 主要功能入口 (原底部导航项)
  const mainFeatures = [
    {
      id: "planning",
      title: "智能规划",
      icon: <MapPin size={28} className="text-white" />,
      description: "行程规划",
      screen: "planning" as Screen,
      color: "bg-blue-500",
    },
    {
      id: "social",
      title: "游友社交",
      icon: <Users size={28} className="text-white" />,
      description: "寻找玩伴",
      screen: "social" as Screen,
      color: "bg-green-500",
    },
    {
      id: "guides",
      title: "向导服务",
      icon: <Calendar size={28} className="text-white" />,
      description: "预约导游",
      screen: "guides" as Screen,
      color: "bg-amber-500",
    },
    {
      id: "shop",
      title: "旅行商城",
      icon: <Ticket size={28} className="text-white" />,
      description: "特惠好物",
      screen: "shop" as Screen,
      color: "bg-purple-500",
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
          className={`flex flex-col items-center justify-center p-1 h-auto min-w-[50px] ${hasCheckedIn ? "bg-blue-50 text-blue-500 border-blue-200" : ""
            }`}
          onClick={() => navigate("checkin")}
        >
          <CheckSquare size={18} className={`${hasCheckedIn ? "text-blue-500" : ""} mb-1`} />
          <span className="text-xs">{hasCheckedIn ? "已签到" : "签到"}</span>
        </Button>
      </div>

      {/*主要功能入口 - KingKong区 */}
      <div className="mb-8">
        <div className="grid grid-cols-4 gap-4">
          {mainFeatures.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center justify-center cursor-pointer group"
              onClick={() => navigate(feature.screen)}
            >
              <div className={`
                ${feature.color.replace('bg-', 'bg-').replace('500', '100')} 
                p-3.5 rounded-2xl mb-2 
                group-active:scale-95 transition-all duration-200
                shadow-sm
              `}>
                <div className={`${feature.color.replace('bg-', 'text-').replace('500', '600')}`}>
                  {feature.id === 'planning' && <MapPin size={24} />}
                  {feature.id === 'social' && <Users size={24} />}
                  {feature.id === 'guides' && <Calendar size={24} />}
                  {feature.id === 'shop' && <Ticket size={24} />}
                </div>
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 智能功能区 - 卡片展示 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
            <Bot size={20} className="mr-2 text-purple-600" />
            智能助手
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {smartFeatures.map((feature) => (
            <div
              key={feature.id}
              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm p-3 cursor-pointer active:scale-[0.98] transition-all"
              onClick={() => navigate(feature.screen)}
            >
              <div className="flex flex-col h-full justify-between relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${feature.color.split(' ')[0]} bg-opacity-20`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100">{feature.title}</h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{feature.description}</p>
                </div>
              </div>
              {/* 装饰性背景圆 */}
              <div className={`absolute -right-4 -bottom-4 w-16 h-16 rounded-full opacity-10 ${feature.color.split(' ')[0]}`}></div>
            </div>
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
            <div
              key={route.id}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 cursor-pointer active:scale-[0.99] transition-transform"
              onClick={() => handleRouteClick(route)}
            >
              <div className="flex h-32">
                <div className="w-32 relative shrink-0">
                  <img
                    src={route.image || "/placeholder.svg"}
                    alt={route.title}
                    className="w-full h-full object-cover"
                  />
                  {route.price === 0 && (
                    <div className="absolute top-2 left-2 bg-green-500/90 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                      免费
                    </div>
                  )}
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 line-clamp-1 mb-1">{route.title}</h3>
                    <div className="flex items-center text-xs text-amber-500 mb-2">
                      <Star size={12} className="fill-current mr-1" />
                      <span className="font-medium mr-1">{route.rating}</span>
                      <span className="text-gray-400">({route.reviews})</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {route.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">{route.duration} · {route.distance}</span>
                    <span className="text-red-500 font-bold text-sm">
                      {route.price > 0 ? `¥${route.price}` : "免费"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showProfileBanner && (
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
                <span>{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2 bg-blue-300" />
            </div>
          </CardContent>
        </Card>
      )}


    </div>
  )
}

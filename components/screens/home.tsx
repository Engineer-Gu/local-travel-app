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
  AlertTriangle,
  Camera,
  BookOpen,
  Search,
  Headphones,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import type { Screen } from "@/lib/navigation-types"
import { userService } from "@/lib/services/user-service"
import { authService } from "@/lib/services/user-service"
import { Planning } from "./planning"
import { Social } from "./social"
import { Guides } from "./guides"
import { Shop } from "./shop"
import { PredictionScreen } from "./prediction"
import { PlayScreen } from "./play"
import { DiningScreen } from "./dining"

interface HomeProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function Home({ navigate }: HomeProps) {
  const [activeTab, setActiveTab] = useState<"prediction" | "dining" | "play" | "routes" | "planning" | "guides" | "diary" | "social" | "shop">("prediction")
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [hasCheckedIn, setHasCheckedIn] = useState(false)
  const { toast } = useToast()

  // 模拟路线数据
  // 模拟故事数据
  const [stories, setStories] = useState([
    {
      id: "story1",
      user: {
        id: "user1",
        name: "旅行达人",
        avatar: "/images/mock/avatar_traveler.png",
        isVerified: true,
      },
      location: "杭州·西湖",
      content:
        "西湖的春天真是美不胜收！断桥边的柳树已经泛绿，湖面上荡起了微波。今天天气特别好，拍了很多照片，分享给大家～",
      images: [
        "/images/mock/west_lake_1.png",
        "/images/mock/west_lake_2.png",
      ],
      likes: 256,
      comments: 42,
      time: "2小时前",
      tags: ["春游", "西湖", "摄影"],
      isLiked: false,
    },
    {
      id: "story2",
      user: {
        id: "user2",
        name: "美食猎人",
        avatar: "/images/mock/avatar_foodie.png",
        isVerified: false,
      },
      location: "杭州·知味观",
      content:
        "杭州必吃美食推荐！知味观的西湖醋鱼和东坡肉真的太好吃了，一定要来尝尝。这家店开了上百年，还是老味道，强烈推荐！",
      images: [
        "/images/mock/hangzhou_food_1.png",
        "/images/mock/hangzhou_food_2.png",
      ],
      likes: 189,
      comments: 36,
      time: "5小时前",
      tags: ["美食", "杭帮菜", "推荐"],
      isLiked: true,
    },
    {
      id: "story3",
      user: {
        id: "user3",
        name: "背包客小王",
        avatar: "/images/mock/avatar_backpacker.png",
        isVerified: true,
      },
      location: "千岛湖",
      content:
        "千岛湖的水真清啊，即使是阴天也别有一番风味。租了一艘皮划艇在湖上泛舟，周围青山环绕，感觉整个人都静下来了。",
      images: [
        "/images/mock/qiandao_lake_1.png",
        "/images/mock/qiandao_lake_2.png",
      ],
      likes: 342,
      comments: 56,
      time: "昨天",
      tags: ["千岛湖", "自然", "度假"],
      isLiked: false,
    },
  ])

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



  // 处理签到功能 (已移至Profile)
  /*
  const handleCheckIn = async () => {
    // ...
  }
  */

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
      icon: <CheckSquare size={24} className="text-red-500" />, // AlertTriangle was removed from imports, use CheckSquare as placeholder or re-import
      description: "旅行中遇到紧急情况快速求助",
      screen: "emergency-help" as Screen,
      color: "bg-red-50 border-red-200 text-red-700",
    },
  ]

  const handleStoryClick = (story: any) => {
    navigate("story-detail", { story })
  }

  const handleLike = (e: React.MouseEvent, storyId: string) => {
    e.stopPropagation()
    setStories(stories.map(story => {
      if (story.id === storyId) {
        const newIsLiked = !story.isLiked
        return {
          ...story,
          isLiked: newIsLiked,
          likes: newIsLiked ? story.likes + 1 : story.likes - 1
        }
      }
      return story
    }))

    // Find story to check new state (actually can just use logic above)
    // But since we are inside setStories...
    // Let's just toast
    toast({
      title: "操作成功",
      description: "感谢您的支持！", // Simplified message
    })
  }

  const handleComment = (e: React.MouseEvent, storyId: string) => {
    e.stopPropagation()
    const story = stories.find(s => s.id === storyId)
    navigate("story-detail", { story })
  }

  const handleShare = (e: React.MouseEvent, storyId: string) => {
    e.stopPropagation()
    toast({
      title: "分享成功",
      description: "已复制链接到剪贴板",
    })
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

  // 顶部Tab配置
  const topTabs = [
    { id: "prediction", title: "预测" },
    // { id: "dining", title: "吃喝" }, // Moved to Prediction Screen
    // { id: "play", title: "玩乐" },   // Moved to Prediction Screen
    { id: "routes", title: "路线" },
    { id: "planning", title: "规划" },
    { id: "guides", title: "向导" },
    { id: "diary", title: "日记" },
    { id: "social", title: "社交" },
    { id: "shop", title: "商城" },
  ]

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center justify-between mb-4 sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm -mx-4 px-4 py-2">


        {/* 顶部中央Tabs */}
        <div className="flex items-center flex-1 mx-2 overflow-x-auto no-scrollbar mask-gradient-right">
          <div className="flex space-x-6 px-2 min-w-max">
            {topTabs.map((tab) => (
              <div
                key={tab.id}
                className={`flex flex-col items-center cursor-pointer transition-all ${activeTab === tab.id
                  ? "text-black dark:text-white font-bold scale-110"
                  : "text-gray-400 dark:text-gray-500 font-medium scale-100"
                  }`}
                onClick={() => {
                  setActiveTab(tab.id as any)
                }}
              >
                <span className="text-base whitespace-nowrap">{tab.title}</span>
                {activeTab === tab.id && (
                  <div className="w-4 h-0.5 bg-yellow-400 mt-1 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search/AI button removed - moved to Guides screen */}
        </div>
      </div>

      {/* 顶部侧边栏/Tabs - 已移除，合并到 Header */}

      {/* 内容区域 - 根据Tab显示 */}
      {activeTab === 'diary' && (
        <>
          {/* 智能功能区 - 卡片展示 (保留在推荐页顶部) */}


          {/* 旅行故事圈推荐内容 */}
          <div className="mb-6">
            <div className="space-y-4">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 cursor-pointer active:scale-[0.99] transition-transform"
                  onClick={() => handleStoryClick(story)}
                >
                  {/* 用户信息 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={story.user.avatar} alt={story.user.name} />
                        <AvatarFallback>{story.user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-sm font-semibold">{story.user.name}</h3>
                          {story.user.isVerified && (
                            <Badge className="ml-1 h-3 w-3 p-0 bg-blue-500 flex justify-center items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-2 w-2 text-white">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{story.time} · {story.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* 内容 */}
                  <p className="text-sm mb-3">{story.content}</p>

                  {/* 图片 */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {story.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt="Story image"
                        className={`w-full object-cover rounded-lg ${story.images.length === 1 ? 'h-48' : 'h-24'}`}
                      />
                    ))}
                  </div>

                  {/* 底部互动 */}
                  <div className="flex items-center justify-between text-gray-500 text-xs border-t border-gray-50 pt-3 dark:border-gray-700">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex-1 h-8 ${story.isLiked ? "text-red-500" : ""}`}
                      onClick={(e) => handleLike(e, story.id)}
                    >
                      <Heart size={14} className={`mr-1 ${story.isLiked ? "fill-current" : ""}`} />
                      {story.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 h-8"
                      onClick={(e) => handleComment(e, story.id)}
                    >
                      <MessageCircle size={14} className="mr-1" />
                      {story.comments}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 h-8"
                      onClick={(e) => handleShare(e, story.id)}
                    >
                      <Share size={14} className="mr-1" />
                      分享
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </>
      )}

      {/* 热门路线 Tab (Actually Prediction) */}
      {activeTab === 'prediction' && (
        <PredictionScreen onNavigateToTab={(tab) => setActiveTab(tab)} />
      )}

      {/* 吃喝 Tab */}
      {activeTab === 'dining' && (
        <DiningScreen onBack={() => setActiveTab('prediction')} />
      )}

      {/* 玩乐 Tab */}
      {activeTab === 'play' && (
        <PlayScreen onBack={() => setActiveTab('prediction')} />
      )}

      {activeTab === 'routes' && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">热门路线推荐</h2>
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
                          <span key={i} className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-md">
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
      )}

      {/* Planning Tab */}
      {activeTab === 'planning' && (
        <div className="-mx-4 -mt-4">
          {/* 使用 -mx-4 抵消 Home 的 padding，让 Planning 组件全宽显示 */}
          <Planning navigate={navigate} />
        </div>
      )}

      {/* Social Tab */}
      {activeTab === 'social' && (
        <div className="-mx-4 -mt-4">
          <Social navigate={navigate} />
        </div>
      )}

      {/* Guides Tab */}
      {activeTab === 'guides' && (
        <div className="-mx-4 -mt-4">
          <Guides navigate={navigate} />
        </div>
      )}

      {/* Shop Tab */}
      {activeTab === 'shop' && (
        <div className="-mx-4 -mt-4">
          <Shop navigate={navigate} />
        </div>
      )}



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

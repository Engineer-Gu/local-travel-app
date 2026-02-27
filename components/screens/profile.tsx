"use client"

import { useState, useEffect } from "react"
import {
  User,
  Settings,
  Heart,
  Map,
  Calendar,
  Bell,
  CreditCard,
  Award,
  BookOpen,
  Camera,
  Users,
  ShoppingBag,
  Package,
  Edit2,
  AlertTriangle,
  CheckSquare,
  Clock,
  Trophy,
  Target,
  Flame,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Screen } from "@/lib/navigation-types"
import { userService, authService } from "@/lib/services/user-service"

interface ProfileProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function Profile({ navigate }: ProfileProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  // 兴趣标签数据
  const [interests, setInterests] = useState<string[]>([])
  const [isLoadingInterests, setIsLoadingInterests] = useState(false)

  // Mock数据：后端还未实现的功能字段
  const mockBadges = ["旅行达人", "摄影爱好者", "美食家"]
  const mockTravelDays = 35
  const mockVisitedCities = 8
  const mockCompletedRoutes = 12

  // 背景图状态
  const [backgroundImage, setBackgroundImage] = useState<string>("/images/defaults/profile-bg.png")

  // 从本地存储加载背景图
  useEffect(() => {
    const savedBg = localStorage.getItem("profile_bg_image")
    if (savedBg) {
      setBackgroundImage(savedBg)
    }
  }, [])

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setBackgroundImage(base64)
        localStorage.setItem("profile_bg_image", base64)
      }
      reader.readAsDataURL(file)
    }
  }

  // 检查登录状态和加载用户信息
  useEffect(() => {
    checkLoginStatus()
  }, [])

  // 当用户登录后，加载兴趣标签
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInterests()
    }
  }, [isLoggedIn])

  /**
   * 获取用户兴趣标签
   */
  const fetchUserInterests = () => {
    if (!isLoggedIn) {
      return
    }

    setIsLoadingInterests(true)
    userService
      .getInterests()
      .then((data) => {
        // 提取兴趣标签名称
        const interestNames = data.map((interest: any) => interest.tagName)
        setInterests(interestNames)
      })
      .catch((error) => {
        console.error("获取兴趣标签失败", error)
        // 失败时使用空数组
        setInterests([])
      })
      .finally(() => {
        setIsLoadingInterests(false)
      })
  }

  const checkLoginStatus = () => {
    try {
      if (typeof window !== "undefined") {
        const auth = authService.getAuth()
        const hasAuth = auth.token && auth.user
        setIsLoggedIn(!!hasAuth)

        if (hasAuth && auth.user) {
          setUser(auth.user)
        }
      }
    } catch (error) {
      console.error("检查登录状态失败", error)
      setIsLoggedIn(false)
    } finally {
      setIsCheckingAuth(false)
    }
  }

  // 功能菜单分组
  const menuGroups = [
    {
      title: "我的旅行",
      items: [
        {
          title: "收藏",
          icon: <Heart size={20} className="text-red-500" />,
          screen: "favorites" as Screen,
        },
        {
          title: "路线",
          icon: <Map size={20} className="text-blue-500" />,
          screen: "routes" as Screen,
        },
        {
          title: "行程",
          icon: <Calendar size={20} className="text-green-500" />,
          screen: "itineraries" as Screen,
        },
        {
          title: "日记",
          icon: <BookOpen size={20} className="text-emerald-500" />,
          screen: "travel-diary" as Screen,
        },
        {
          title: "时光机",
          icon: <Clock size={20} className="text-purple-500" />,
          screen: "travel-timeline" as Screen,
        },
        {
          title: "成就",
          icon: <Trophy size={20} className="text-yellow-500" />,
          screen: "badges" as Screen,
        },
      ],
    },
    {
      title: "我的服务",
      items: [
        {
          title: "订单",
          icon: <Package size={20} className="text-purple-500" />,
          screen: "orders" as Screen,
        },
        {
          title: "购物车",
          icon: <ShoppingBag size={20} className="text-orange-500" />,
          screen: "shopping-cart" as Screen,
        },
        {
          title: "钱包",
          icon: <CreditCard size={20} className="text-amber-500" />,
          screen: "wallet" as Screen,
        },
        {
          title: "会员",
          icon: <Award size={20} className="text-yellow-500" />,
          screen: "vip-membership" as Screen,
          badge: "VIP",
        },
        {
          title: "好友",
          icon: <Users size={20} className="text-indigo-500" />,
          screen: "friends" as Screen,
        },
        {
          title: "紧急求助",
          icon: <AlertTriangle size={20} className="text-red-500" />,
          screen: "emergency-help" as Screen,
        },
      ],
    },
    {
      title: "社交",
      items: [],
    },
  ]

  const handleLogin = () => {
    navigate("login")
  }

  // 调用真实登出API
  const handleLogout = () => {
    setIsLoading(true)

    // 调用真实登出API
    userService
      .logout()
      .then(() => {
        // 清除本地存储的认证信息
        authService.clearAuth()

        // 更新状态
        setIsLoggedIn(false)
        setUser(null)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("登出请求失败", error)
        setIsLoading(false)

        // 即使API调用失败，也清除本地存储并更新状态
        authService.clearAuth()
        setIsLoggedIn(false)
        setUser(null)
      })
  }

  const handleEditProfile = () => {
    navigate("edit-profile")
  }

  const handleViewVisitedCities = () => {
    navigate("visited-cities")
  }

  const handleViewCompletedRoutes = () => {
    navigate("completed-routes")
  }

  const handleViewBadges = () => {
    navigate("badges")
  }

  const handleEditInterests = () => {
    navigate("interest-settings")
  }

  // 如果正在检查认证状态，显示加载中
  if (isCheckingAuth) {
    return (
      <div className="p-4 flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    )
  }

  // 未登录状态
  if (!isLoggedIn || !user) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full">
        <Avatar className="h-24 w-24 mb-6">
          <AvatarFallback>
            <User size={40} />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-bold mb-2">欢迎使用随行伴</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">登录账号以使用更多功能</p>
        <Button className="w-full mb-3" onClick={handleLogin}>
          登录
        </Button>
        <Button variant="outline" className="w-full" onClick={() => navigate("register")}>
          注册新账号
        </Button>
      </div>
    )
  }

  // 计算等级进度（使用真实数据）
  const currentLevel = user.level || 1
  const currentPoints = user.points || 0
  const nextLevelPoints = currentLevel * 1000
  const progress = (currentPoints % 1000) / 10

  return (
    <div className="pb-16">
      {/* 用户信息卡片 - 使用真实数据 */}
      {/* 用户信息卡片 - 使用真实数据 */}
      <div className="relative mb-16">
        {/* 背景图 + 遮罩 */}
        <div
          className="h-64 bg-cover bg-center absolute inset-0 z-0 rounded-b-[2rem] shadow-lg overflow-hidden"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        {/* 更换背景按钮 - 放置在右上角 */}
        <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start">
          {/* 顶部工具栏 */}
          <div className="flex space-x-2 ml-auto">
            {/* 签到按钮 */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 rounded-full h-9 px-3 mr-1 bg-white/10 backdrop-blur-md"
              onClick={() => navigate("checkin")}
            >
              <CheckSquare size={16} className="mr-1" />
              <span className="text-xs">签到</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full h-9 w-9"
              onClick={() => navigate("notifications")}
            >
              <Bell size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full h-9 w-9"
              onClick={() => navigate("settings")}
            >
              <Settings size={20} />
            </Button>
            <label htmlFor="bg-upload" className="cursor-pointer bg-white/20 hover:bg-white/30 text-white flex items-center justify-center rounded-full h-9 w-9 backdrop-blur-md transition-all">
              <Camera size={18} />
              <input
                id="bg-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBackgroundUpload}
              />
            </label>
          </div>
        </div>

        <div className="relative z-10 pt-20 pb-8 px-6 text-white flex flex-col items-center">
          <Avatar className="h-24 w-24 border-4 border-white/30 shadow-xl mb-3">
            <AvatarImage
              src={user.avatar ? `data:image/jpeg;base64,${user.avatar}` : "/placeholder.svg"}
              alt={user.nickname || "用户"}
            />
            <AvatarFallback className="text-2xl bg-gray-200 text-gray-500 font-bold">{(user.nickname || "用").slice(0, 2)}</AvatarFallback>
          </Avatar>

          <div className="text-center">
            <div
              className="flex items-center justify-center space-x-2 mb-1 cursor-pointer hover:bg-white/10 rounded-xl px-4 py-1 transition-colors group"
              onClick={handleEditProfile}
            >
              <h1 className="text-2xl font-bold shadow-sm group-hover:text-blue-200 transition-colors">{user.nickname || "用户"}</h1>
              <Edit2 size={16} className="text-white/60 group-hover:text-white transition-colors" />
            </div>

            <div className="flex items-center justify-center space-x-2 mb-3">
              <Badge className="bg-yellow-500/90 hover:bg-yellow-500 text-white border-0 px-2 py-0.5 shadow-sm">Lv.{currentLevel}</Badge>
              <span className="text-xs text-white/80 font-medium">
                {currentPoints}/{nextLevelPoints}
              </span>
            </div>
            <div className="w-32 h-1.5 bg-white/20 rounded-full mx-auto overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 悬浮统计卡片 - Overlapping Card */}
        <div className="absolute -bottom-10 left-4 right-4 z-20">
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm dark:bg-gray-800/95">
            <CardContent className="p-4 flex justify-between items-center text-gray-800 dark:text-gray-100">
              <div
                className="flex-1 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 py-1 px-1 rounded-lg transition-colors"
                onClick={handleViewVisitedCities}
              >
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-0.5">{mockVisitedCities}</div>
                <div className="text-xs text-gray-500">去过的城市</div>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
              <div
                className="flex-1 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 py-1 px-1 rounded-lg transition-colors"
                onClick={handleViewCompletedRoutes}
              >
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-0.5">{mockCompletedRoutes}</div>
                <div className="text-xs text-gray-500">完成的路线</div>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex-1 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 py-1 px-1 rounded-lg transition-colors">
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-0.5">{mockTravelDays}</div>
                <div className="text-xs text-gray-500">旅行天数</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 兴趣标签展示 - 使用真实数据 */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">我的兴趣</h2>
          <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-500 p-0" onClick={handleEditInterests}>
            编辑
          </Button>
        </div>
        {isLoadingInterests ? (
          <div className="text-sm text-gray-400">加载中...</div>
        ) : interests.length === 0 ? (
          <div className="text-sm text-gray-400">还没有添加兴趣标签，点击编辑添加吧！</div>
        ) : (
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
            {interests.map((interest, index) => (
              <Badge key={index} variant="outline" className="py-1 px-3 bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800/50">
                {interest}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* 徽章展示 - Mock数据 */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">我的徽章</h2>
          <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-500 p-0" onClick={handleViewBadges}>
            查看全部
          </Button>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {mockBadges.map((badge, index) => (
            <Badge key={index} variant="outline" className="py-1 px-2.5 text-xs">
              {badge}
            </Badge>
          ))}
          <Badge variant="outline" className="py-1 px-2.5 text-xs border-dashed cursor-pointer" onClick={handleViewBadges}>
            +
          </Badge>
        </div>
      </div>

      {/* 每日任务进度 */}
      <div className="p-4 border-b dark:border-gray-800">
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl cursor-pointer" onClick={() => navigate("daily-tasks")}>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center">
              <div className="w-9 h-9 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center mr-3">
                <Target size={18} className="text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200">每日任务</h3>
                <p className="text-xs text-gray-500">完成任务获取积分</p>
              </div>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <span>连续7天</span>
              <ChevronRight size={14} className="ml-0.5" />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-gray-500">今日进度</span>
            <span className="text-gray-600 dark:text-gray-400">3/5</span>
          </div>
          <Progress value={60} className="h-1.5" />
        </div>
      </div>

      {/* 旅行时光机入口 */}
      <div className="p-4 border-b dark:border-gray-800">
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl cursor-pointer" onClick={() => navigate("travel-timeline")}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mr-3">
                <Clock size={18} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200">旅行时光机</h3>
                <p className="text-xs text-gray-500">回顾旅行足迹</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-base font-semibold text-gray-800 dark:text-gray-200">{mockVisitedCities}</span>
              <span className="text-xs text-gray-500 ml-1">座城市</span>
              <ChevronRight size={14} className="text-gray-400 ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* 功能菜单卡片 */}
      <div className="p-4 space-y-4">
        {menuGroups
          .filter((group) => group.items.length > 0)
          .map((group, groupIndex) => (
            <div key={groupIndex} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">{group.title}</h3>
              <div className="grid grid-cols-4 gap-1">
                {group.items.map((item, itemIndex) => (
                  <Button
                    key={itemIndex}
                    variant="ghost"
                    className="flex flex-col items-center justify-center h-16 p-1"
                    onClick={() => navigate(item.screen)}
                  >
                    <div className="relative text-gray-500 dark:text-gray-400">
                      {item.icon}
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 h-3.5 w-3.5 flex items-center justify-center rounded-full bg-orange-500 text-white text-[8px]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="mt-1.5 text-xs text-gray-600 dark:text-gray-400">{item.title}</span>
                  </Button>
                ))}
              </div>
            </div>
          ))}

        <Button
          variant="ghost"
          className="justify-center h-10 px-4 text-gray-400 w-full mt-4 text-sm"
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? "退出中..." : "退出登录"}
        </Button>
      </div>
    </div>
  )
}

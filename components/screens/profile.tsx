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
  Users,
  ShoppingBag,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Screen } from "@/components/mobile-app"
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
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 text-white">
        <div className="flex items-center">
          <Avatar className="h-16 w-16 border-2 border-white">
            <AvatarImage
              src={user.avatar ? `data:image/jpeg;base64,${user.avatar}` : "/placeholder.svg"}
              alt={user.nickname || "用户"}
            />
            <AvatarFallback>{(user.nickname || "用").slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">{user.nickname || "用户"}</h1>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white h-8 w-8"
                  onClick={() => navigate("notifications")}
                >
                  <Bell size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="text-white h-8 w-8" onClick={() => navigate("settings")}>
                  <Settings size={18} />
                </Button>
                <Button variant="ghost" size="sm" className="text-white" onClick={handleEditProfile}>
                  编辑资料
                </Button>
              </div>
            </div>
            <div className="flex items-center mt-1">
              <Badge className="bg-yellow-500 text-white border-none">Lv.{currentLevel}</Badge>
              <span className="ml-2 text-sm">
                {currentPoints}/{nextLevelPoints}
              </span>
            </div>
            <Progress value={progress} className="h-1.5 mt-1 bg-blue-300" />
          </div>
        </div>

        <div className="flex justify-between mt-4 pt-4 border-t border-blue-400">
          <div
            className="text-center cursor-pointer hover:bg-blue-600 py-2 px-3 rounded-lg transition-colors"
            onClick={handleViewVisitedCities}
          >
            <div className="text-xl font-bold">{mockVisitedCities}</div>
            <div className="text-xs">去过的城市</div>
          </div>
          <div
            className="text-center cursor-pointer hover:bg-blue-600 py-2 px-3 rounded-lg transition-colors"
            onClick={handleViewCompletedRoutes}
          >
            <div className="text-xl font-bold">{mockCompletedRoutes}</div>
            <div className="text-xs">完成的路线</div>
          </div>
          <div className="text-center cursor-pointer hover:bg-blue-600 py-2 px-3 rounded-lg transition-colors">
            <div className="text-xl font-bold">{mockTravelDays}</div>
            <div className="text-xs">旅行天数</div>
          </div>
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
              <Badge key={index} variant="outline" className="py-1 px-3 bg-blue-50">
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
            <Badge key={index} variant="outline" className="py-1 px-3">
              {badge}
            </Badge>
          ))}
          <Badge variant="outline" className="py-1 px-3 border-dashed cursor-pointer" onClick={handleViewBadges}>
            +
          </Badge>
        </div>
      </div>

      {/* 功能菜单卡片 */}
      <div className="p-4 space-y-4">
        {menuGroups
          .filter((group) => group.items.length > 0)
          .map((group, groupIndex) => (
            <Card key={groupIndex} className="overflow-hidden">
              <CardContent className="p-3">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">{group.title}</h3>
                <div className="grid grid-cols-4 gap-2">
                  {group.items.map((item, itemIndex) => (
                    <Button
                      key={itemIndex}
                      variant="ghost"
                      className="flex flex-col items-center justify-center h-20 p-2"
                      onClick={() => navigate(item.screen)}
                    >
                      <div className="relative">
                        {item.icon}
                        {item.badge && (
                          <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center rounded-full bg-yellow-500 text-white border-none text-[10px]">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <span className="mt-2 text-xs">{item.title}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

        <Button
          variant="ghost"
          className="justify-center h-12 px-4 text-red-500 w-full mt-4"
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? "退出中..." : "退出登录"}
        </Button>
      </div>
    </div>
  )
}

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

// 在文件顶部添加导入语句（注释掉）
// import { userService } from "@/lib/services/user-service"

interface ProfileProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function Profile({ navigate }: ProfileProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // 模拟用户数据
  const userData = {
    name: "小顾",
    avatar: "/placeholder.svg?height=100&width=100",
    level: 3,
    points: 2580,
    nextLevelPoints: 5000,
    badges: ["旅行达人", "摄影爱好者", "美食家"],
    interests: ["摄影", "美食", "历史", "户外", "城市探索"], // 从社交中设置的兴趣标签
    travelDays: 35,
    visitedCities: 8,
    completedRoutes: 12,
  }

  // 检查登录状态
  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        // 仅在浏览器环境中执行
        if (typeof window !== "undefined") {
          const token = window.localStorage.getItem("token")
          const user = window.localStorage.getItem("user")
          setIsLoggedIn(!!token && !!user)
        }
      } catch (error) {
        console.error("检查登录状态失败", error)
        setIsLoggedIn(false)
      }
    }

    checkLoginStatus()
  }, [])

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

  // 在handleLogout函数中添加真实API调用（注释掉）
  const handleLogout = () => {
    setIsLoading(true)

    // 真实API调用（注释掉）
    /* try {
      userService.logout()
        .then(response => {
          if (response.success) {
            // 清除本地存储
            if (typeof window !== "undefined") {
              window.localStorage.removeItem("token");
              window.localStorage.removeItem("user");
            }
            
            // 更新状态
            setIsLoggedIn(false);
            setIsLoading(false);
          } else {
            console.error("登出失败");
            setIsLoading(false);
          }
        })
        .catch(error => {
          console.error("登出请求失败", error);
          setIsLoading(false);
          
          // 即使API调用失败，也清除本地存储并更新状态
          if (typeof window !== "undefined") {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("user");
          }
          setIsLoggedIn(false);
        });
    } catch (error) {
      console.error("登出异常", error);
      setIsLoading(false);
      
      // 即使发生异常，也清除本地存储并更新状态
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
      }
      setIsLoggedIn(false);
    } */

    // 模拟登出过程
    setTimeout(() => {
      try {
        // 仅在浏览器环境中执行
        if (typeof window !== "undefined") {
          // 清除本地存储
          window.localStorage.removeItem("token")
          window.localStorage.removeItem("user")
        }
      } catch (error) {
        console.error("清除用户数据失败", error)
      }

      // 更新状态
      setIsLoggedIn(false)
      setIsLoading(false)
    }, 500)
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

  if (!isLoggedIn) {
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

  return (
    <div className="pb-16">
      {/* 用户信息卡片 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 text-white">
        <div className="flex items-center">
          <Avatar className="h-16 w-16 border-2 border-white">
            <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
            <AvatarFallback>{userData.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">{userData.name}</h1>
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
              <Badge className="bg-yellow-500 text-white border-none">Lv.{userData.level}</Badge>
              <span className="ml-2 text-sm">
                {userData.points}/{userData.nextLevelPoints}
              </span>
            </div>
            <Progress value={(userData.points / userData.nextLevelPoints) * 100} className="h-1.5 mt-1 bg-blue-300" />
          </div>
        </div>

        <div className="flex justify-between mt-4 pt-4 border-t border-blue-400">
          <div
            className="text-center cursor-pointer hover:bg-blue-600 py-2 px-3 rounded-lg transition-colors"
            onClick={handleViewVisitedCities}
          >
            <div className="text-xl font-bold">{userData.visitedCities}</div>
            <div className="text-xs">去过的城市</div>
          </div>
          <div
            className="text-center cursor-pointer hover:bg-blue-600 py-2 px-3 rounded-lg transition-colors"
            onClick={handleViewCompletedRoutes}
          >
            <div className="text-xl font-bold">{userData.completedRoutes}</div>
            <div className="text-xs">完成的路线</div>
          </div>
          <div className="text-center cursor-pointer hover:bg-blue-600 py-2 px-3 rounded-lg transition-colors">
            <div className="text-xl font-bold">{userData.travelDays}</div>
            <div className="text-xs">旅行天数</div>
          </div>
        </div>
      </div>

      {/* 兴趣标签展示 */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">我的兴趣</h2>
          <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-500 p-0" onClick={handleEditInterests}>
            编辑
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
          {userData.interests.map((interest, index) => (
            <Badge key={index} variant="outline" className="py-1 px-3 bg-blue-50">
              {interest}
            </Badge>
          ))}
        </div>
      </div>

      {/* 徽章展示 */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">我的徽章</h2>
          <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-500 p-0" onClick={handleViewBadges}>
            查看全部
          </Button>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {userData.badges.map((badge, index) => (
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

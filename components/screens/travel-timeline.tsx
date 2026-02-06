"use client"

import { useState } from "react"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Camera,
  Clock,
  TrendingUp,
  Award,
  Heart,
  ChevronRight,
  Image,
  Route,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import type { Screen } from "@/lib/navigation-types"

/**
 * 旅行时光机页面Props接口
 */
interface TravelTimelineProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

/**
 * 旅行记忆接口定义
 */
interface TravelMemory {
  id: string
  date: string
  location: string
  city: string
  images: string[]
  description: string
  likes: number
}

/**
 * 城市足迹接口定义
 */
interface CityFootprint {
  id: string
  name: string
  image: string
  visitCount: number
  lastVisit: string
  totalDays: number
}

/**
 * 旅行时光机页面组件
 * 提供年度回顾、历史今天、旅行轨迹等功能
 */
export function TravelTimeline({ goBack, navigate }: TravelTimelineProps) {
  // 年度统计数据
  const [yearStats] = useState({
    totalCities: 12,
    totalRoutes: 28,
    totalDays: 45,
    totalPhotos: 356,
    totalDistance: 3680,
    favoriteCity: "杭州",
  })

  // 历史今天数据
  const [todayMemories] = useState<TravelMemory[]>([
    {
      id: "memory1",
      date: "2025-02-06",
      location: "西湖断桥",
      city: "杭州",
      images: ["/images/mock/west_lake_1.png", "/images/mock/west_lake_2.png"],
      description: "去年今天，我在西湖断桥看雪景，美不胜收",
      likes: 128,
    },
    {
      id: "memory2",
      date: "2024-02-06",
      location: "灵隐寺",
      city: "杭州",
      images: ["/images/hangzhou/lingyin.jpg"],
      description: "两年前的今天，在灵隐寺祈福，愿望都实现了",
      likes: 89,
    },
  ])

  // 城市足迹数据
  const [cityFootprints] = useState<CityFootprint[]>([
    {
      id: "city1",
      name: "杭州",
      image: "/images/hangzhou/xihu.jpg",
      visitCount: 15,
      lastVisit: "2026-01-20",
      totalDays: 25,
    },
    {
      id: "city2",
      name: "上海",
      image: "/images/cities/shanghai.jpg",
      visitCount: 8,
      lastVisit: "2025-12-15",
      totalDays: 12,
    },
    {
      id: "city3",
      name: "苏州",
      image: "/images/cities/suzhou.jpg",
      visitCount: 5,
      lastVisit: "2025-10-01",
      totalDays: 6,
    },
    {
      id: "city4",
      name: "南京",
      image: "/images/cities/nanjing.jpg",
      visitCount: 3,
      lastVisit: "2025-08-15",
      totalDays: 4,
    },
  ])

  // 旅行时间线数据
  const [timeline] = useState([
    {
      id: "trip1",
      date: "2026-01-20",
      title: "杭州西湖一日游",
      location: "杭州",
      image: "/images/mock/west_lake_1.png",
      type: "route",
    },
    {
      id: "trip2",
      date: "2026-01-15",
      title: "千岛湖周末游",
      location: "千岛湖",
      image: "/images/route-qiandao.png",
      type: "route",
    },
    {
      id: "trip3",
      date: "2026-01-10",
      title: "灵隐寺祈福",
      location: "杭州",
      image: "/images/hangzhou/lingyin.jpg",
      type: "checkin",
    },
    {
      id: "trip4",
      date: "2025-12-25",
      title: "上海圣诞之旅",
      location: "上海",
      image: "/images/cities/shanghai.jpg",
      type: "route",
    },
    {
      id: "trip5",
      date: "2025-12-15",
      title: "外滩夜景",
      location: "上海",
      image: "/images/cities/shanghai.jpg",
      type: "checkin",
    },
  ])

  /**
   * 获取今天的日期字符串
   */
  const getTodayString = () => {
    const today = new Date()
    return `${today.getMonth() + 1}月${today.getDate()}日`
  }

  return (
    <div className="pb-16">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-bold ml-2">旅行时光机</h1>
        </div>
      </div>

      {/* 年度回顾卡片 */}
      <div className="p-4">
        <Card className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white border-0 overflow-hidden">
          <CardContent className="p-4 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

            <h2 className="text-lg font-bold mb-4 relative z-10">2026年度回顾</h2>

            <div className="grid grid-cols-3 gap-4 relative z-10">
              <div className="text-center">
                <div className="text-2xl font-bold">{yearStats.totalCities}</div>
                <div className="text-xs opacity-80">去过的城市</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{yearStats.totalRoutes}</div>
                <div className="text-xs opacity-80">完成的路线</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{yearStats.totalDays}</div>
                <div className="text-xs opacity-80">旅行天数</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp size={16} className="mr-2" />
                  <span className="text-sm">
                    总里程 {yearStats.totalDistance} 公里
                  </span>
                </div>
                <div className="flex items-center">
                  <Heart size={16} className="mr-2" />
                  <span className="text-sm">
                    最爱 {yearStats.favoriteCity}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 内容Tab */}
      <div className="px-4">
        <Tabs defaultValue="today">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="today">历史今天</TabsTrigger>
            <TabsTrigger value="cities">城市足迹</TabsTrigger>
            <TabsTrigger value="timeline">时间线</TabsTrigger>
          </TabsList>

          {/* 历史今天 */}
          <TabsContent value="today" className="space-y-4">
            <div className="flex items-center mb-2">
              <Calendar size={18} className="text-purple-500 mr-2" />
              <span className="font-medium">{getTodayString()}的旅行记忆</span>
            </div>

            {todayMemories.length > 0 ? (
              todayMemories.map((memory) => (
                <Card key={memory.id} className="overflow-hidden">
                  <div className="relative h-40">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${memory.images[0]})`,
                        backgroundColor: "#e5e7eb",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <Badge className="bg-purple-500 text-white border-0 mb-2">
                        {memory.date.split("-")[0]}年
                      </Badge>
                      <h3 className="font-bold">{memory.location}</h3>
                      <p className="text-sm opacity-90">{memory.city}</p>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {memory.description}
                    </p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Heart size={14} className="mr-1" />
                      <span>{memory.likes}</span>
                      <Camera size={14} className="ml-4 mr-1" />
                      <span>{memory.images.length}张照片</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                <p>今天还没有旅行记忆</p>
                <p className="text-sm mt-1">去创造新的回忆吧</p>
                <Button className="mt-4" onClick={() => navigate("planning")}>
                  开始规划
                </Button>
              </div>
            )}
          </TabsContent>

          {/* 城市足迹 */}
          <TabsContent value="cities" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <MapPin size={18} className="text-green-500 mr-2" />
                <span className="font-medium">
                  已解锁 {cityFootprints.length} 个城市
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("visited-cities")}
              >
                查看全部
                <ChevronRight size={14} className="ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {cityFootprints.map((city) => (
                <Card
                  key={city.id}
                  className="overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                  onClick={() => navigate("visited-cities")}
                >
                  <div className="relative h-24">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${city.image})`,
                        backgroundColor: "#e5e7eb",
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white font-bold text-lg">
                        {city.name}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>去过{city.visitCount}次</span>
                      <span>共{city.totalDays}天</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 足迹地图入口 */}
            <Card
              className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800 cursor-pointer"
              onClick={() => navigate("visited-cities")}
            >
              <CardContent className="p-4 flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <MapPin size={24} className="text-green-500" />
                </div>
                <div className="ml-3 flex-1">
                  <h4 className="font-medium">查看足迹地图</h4>
                  <p className="text-sm text-gray-500">
                    在地图上查看你的旅行轨迹
                  </p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* 时间线 */}
          <TabsContent value="timeline" className="space-y-4">
            <div className="flex items-center mb-2">
              <Clock size={18} className="text-blue-500 mr-2" />
              <span className="font-medium">旅行时间线</span>
            </div>

            <div className="relative">
              {/* 时间线竖线 */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

              {timeline.map((item, index) => (
                <div key={item.id} className="relative pl-10 pb-6">
                  {/* 时间点 */}
                  <div
                    className={`absolute left-2 w-5 h-5 rounded-full border-2 ${
                      item.type === "route"
                        ? "bg-blue-500 border-blue-300"
                        : "bg-green-500 border-green-300"
                    }`}
                  />

                  {/* 日期 */}
                  <div className="text-xs text-gray-500 mb-1">{item.date}</div>

                  {/* 内容卡片 */}
                  <Card className="overflow-hidden">
                    <div className="flex">
                      <div
                        className="w-20 h-20 bg-cover bg-center shrink-0"
                        style={{
                          backgroundImage: `url(${item.image})`,
                          backgroundColor: "#e5e7eb",
                        }}
                      />
                      <CardContent className="p-3 flex-1">
                        <div className="flex items-center mb-1">
                          {item.type === "route" ? (
                            <Route size={14} className="text-blue-500 mr-1" />
                          ) : (
                            <MapPin size={14} className="text-green-500 mr-1" />
                          )}
                          <Badge
                            variant="secondary"
                            className="text-xs"
                          >
                            {item.type === "route" ? "路线" : "打卡"}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          <MapPin size={12} className="inline mr-1" />
                          {item.location}
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            {/* 加载更多 */}
            <Button variant="outline" className="w-full">
              加载更多
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部快捷入口 */}
      <div className="p-4 mt-4">
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => navigate("travel-diary")}
          >
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Image size={20} className="text-purple-500" />
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-sm">照片回忆</h4>
                <p className="text-xs text-gray-500">{yearStats.totalPhotos}张</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => navigate("completed-routes")}
          >
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Route size={20} className="text-blue-500" />
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-sm">完成路线</h4>
                <p className="text-xs text-gray-500">{yearStats.totalRoutes}条</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

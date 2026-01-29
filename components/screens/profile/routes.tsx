"use client"

import { ArrowLeft, Search, Calendar, MapPin, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Screen } from "@/lib/navigation-types"

interface RoutesProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function Routes({ goBack, navigate }: RoutesProps) {
  const savedRoutes = [
    {
      id: "saved1",
      title: "西湖文化半日游",
      image: "/placeholder.svg?height=120&width=320&text=西湖文化半日游",
      date: "2023-10-15",
      duration: "4小时",
      stops: ["西湖博物馆", "断桥", "平湖秋月", "楼外楼"],
      tags: ["文化", "自然", "美食"],
      description: "探索西湖周边的文化景点，欣赏自然风光，品尝地道美食。",
      rating: 4.9,
      budget: "¥300",
      fullRoute: {
        id: "saved1",
        title: "西湖文化半日游",
        image: "/placeholder.svg?height=120&width=320&text=西湖文化半日游",
        duration: "4小时",
        budget: "¥300",
        tags: ["文化", "自然", "美食"],
        rating: 4.9,
        description: "探索西湖周边的文化景点，欣赏自然风光，品尝地道美食。",
        stops: [
          { time: "09:00", place: "西湖博物馆", activity: "参观西湖历史文化展览", duration: "1小时" },
          { time: "10:15", place: "断桥", activity: "欣赏西湖美景，拍照留念", duration: "45分钟" },
          { time: "11:15", place: "平湖秋月", activity: "漫步湖边，感受自然风光", duration: "30分钟" },
          { time: "12:00", place: "楼外楼", activity: "品尝地道杭帮菜", duration: "1小时" },
        ],
      },
    },
    {
      id: "saved2",
      title: "城市中心一日游",
      image: "/placeholder.svg?height=120&width=320&text=城市中心一日游",
      date: "2023-11-20",
      duration: "8小时",
      stops: ["人民广场", "历史博物馆", "老字号餐厅", "传统商业街", "城市公园", "特色小吃街"],
      tags: ["历史", "美食", "购物"],
      description: "探索城市中心的历史文化景点，品尝地道美食，体验当地购物环境。",
      rating: 4.8,
      budget: "¥500",
      fullRoute: {
        id: "saved2",
        title: "城市中心一日游",
        image: "/placeholder.svg?height=120&width=320&text=城市中心一日游",
        duration: "8小时",
        budget: "¥500",
        tags: ["历史", "美食", "购物"],
        rating: 4.8,
        description: "探索城市中心的历史文化景点，品尝地道美食，体验当地购物环境。",
        stops: [
          { time: "09:00", place: "人民广场", activity: "参观城市地标，拍照留念", duration: "45分钟" },
          { time: "10:00", place: "历史博物馆", activity: "了解城市历史文化", duration: "1.5小时" },
          { time: "12:00", place: "老字号餐厅", activity: "品尝地道美食", duration: "1小时" },
          { time: "13:30", place: "传统商业街", activity: "购买特色商品，体验当地文化", duration: "2小时" },
          { time: "16:00", place: "城市公园", activity: "放松休息，欣赏城市风光", duration: "1小时" },
          { time: "17:30", place: "特色小吃街", activity: "品尝各种地方小吃", duration: "1.5小时" },
        ],
      },
    },
  ]

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">我的路线</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="搜索已保存路线"
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-4">
        {savedRoutes.map((route) => (
          <Card
            key={route.id}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate("route-detail", { route: route.fullRoute })}
          >
            <div className="relative h-32">
              <img src={route.image || "/placeholder.svg"} alt={route.title} className="w-full h-full object-cover" />
              <Badge className="absolute top-2 right-2 bg-blue-500">{route.rating}</Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{route.title}</h3>
                <Button size="icon" variant="ghost" className="text-red-500 h-8 w-8">
                  <Trash2 size={16} />
                </Button>
              </div>

              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar size={14} className="mr-1" />
                <span className="mr-3">创建于: {route.date}</span>
                <MapPin size={14} className="mr-1" />
                <span>{route.stops.length}个景点</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mt-2">
                <span className="mr-3">{route.duration}</span>
                <span>{route.budget}</span>
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {route.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

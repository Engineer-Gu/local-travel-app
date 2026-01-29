"use client"

import { ArrowLeft, Heart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Screen } from "@/lib/navigation-types"

interface FavoritesProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function Favorites({ goBack, navigate }: FavoritesProps) {
  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">我的收藏</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="搜索收藏内容"
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <Tabs defaultValue="routes">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="routes">路线</TabsTrigger>
          <TabsTrigger value="places">景点</TabsTrigger>
          <TabsTrigger value="guides">导游</TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="space-y-4">
          {[
            {
              title: "城市中心一日游",
              image: "/placeholder.svg?height=80&width=160&text=城市中心一日游",
              tags: ["历史", "美食", "购物"],
              date: "2023-05-15",
            },
            {
              title: "文艺小资半日游",
              image: "/placeholder.svg?height=80&width=160&text=文艺小资半日游",
              tags: ["艺术", "咖啡", "摄影"],
              date: "2023-06-22",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() =>
                navigate("route-detail", {
                  route: {
                    id: item.title,
                    title: item.title,
                    image: item.image,
                    duration: "半日游",
                    budget: "¥200-300",
                    tags: item.tags,
                    rating: 4.8,
                    description: "探索精彩路线",
                    stops: [],
                  },
                })
              }
            >
              <CardContent className="p-3">
                <div className="flex">
                  <div className="w-20 h-20 rounded-lg overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="ml-3 flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="text-xs text-gray-500 mt-1">收藏于: {item.date}</div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button size="icon" variant="ghost" className="text-red-500">
                    <Heart size={18} fill="currentColor" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="places" className="space-y-4">
          {[
            {
              title: "西湖景区",
              image: "/placeholder.svg?height=80&width=160&text=西湖景区",
              tags: ["自然", "文化"],
              date: "2023-04-10",
            },
            {
              title: "历史博物馆",
              image: "/placeholder.svg?height=80&width=160&text=历史博物馆",
              tags: ["历史", "室内"],
              date: "2023-07-05",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() =>
                navigate("map", {
                  location: {
                    name: item.title,
                    address: "景区地址",
                    latitude: 30.2741,
                    longitude: 120.1551,
                  },
                })
              }
            >
              <CardContent className="p-3">
                <div className="flex">
                  <div className="w-20 h-20 rounded-lg overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="ml-3 flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="text-xs text-gray-500 mt-1">收藏于: {item.date}</div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button size="icon" variant="ghost" className="text-red-500">
                    <Heart size={18} fill="currentColor" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          {[
            {
              name: "陈导游",
              image: "/placeholder.svg?height=80&width=80&text=陈导游",
              specialty: "历史文化",
              date: "2023-08-12",
            },
            {
              name: "李导游",
              image: "/placeholder.svg?height=80&width=80&text=李导游",
              specialty: "美食探店",
              date: "2023-09-03",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() =>
                navigate("guide-booking", {
                  guide: {
                    id: item.name,
                    name: item.name,
                    avatar: item.image,
                    price: "¥300/小时",
                  },
                })
              }
            >
              <CardContent className="p-3">
                <div className="flex">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="ml-3 flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="text-sm text-gray-600 mt-1">专长: {item.specialty}</div>
                    <div className="text-xs text-gray-500 mt-1">收藏于: {item.date}</div>
                  </div>

                  <Button size="icon" variant="ghost" className="text-red-500">
                    <Heart size={18} fill="currentColor" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

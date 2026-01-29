"use client"

import { ArrowLeft, Calendar, Clock, MapPin, Share2, Star, Wallet, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { RouteProps, RouteStop, RouteReview } from "@/lib/types"
import type { Screen } from "@/components/mobile-app"

export interface RouteDetailProps {
  route?: RouteProps
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function RouteDetail({ route, goBack, navigate }: RouteDetailProps) {
  const { toast } = useToast()
  const [isFavorite, setIsFavorite] = useState(false)

  // 示例评价数据
  const reviewList: RouteReview[] = [
    {
      id: "1",
      userName: "旅行者小王",
      avatar: "/placeholder.svg?height=40&width=40&text=小王",
      rating: 5,
      date: "2023-04-15",
      content: "景点非常美丽，导游讲解很专业，了解了很多历史文化。强烈推荐这条路线！",
      images: ["/placeholder.svg?height=100&width=100&text=照片1", "/placeholder.svg?height=100&width=100&text=照片2"],
    },
    {
      id: "2",
      userName: "杭州本地人",
      avatar: "/placeholder.svg?height=40&width=40&text=本地",
      rating: 4,
      date: "2023-03-20",
      content: "作为本地人都觉得这条路线安排得很合理，时间刚好，不会太赶。建议大家早上去，人少风景好。",
    },
    {
      id: "3",
      userName: "背包客阿明",
      avatar: "/placeholder.svg?height=40&width=40&text=阿明",
      rating: 5,
      date: "2023-02-10",
      content: "这条路线安排得很合理，每个景点都很有特色，拍了很多美照，非常满意！",
      images: ["/placeholder.svg?height=100&width=100&text=照片3"],
    },
  ]

  if (!route) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full">
        <p>路线不存在</p>
        <Button onClick={goBack} className="mt-4">
          返回
        </Button>
      </div>
    )
  }

  // 处理收藏功能
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // 显示收藏成功或取消收藏的提示
    toast({
      title: isFavorite ? "已取消收藏" : "收藏成功",
      description: isFavorite ? "您已将该路线从收藏夹中移除。" : "该路线已成功添加到您的收藏夹。",
    })
  }

  // 处理分享功能
  const handleShare = () => {
    // 模拟分享功能
    toast({
      title: "分享",
      description: `分享 ${route.title} 到微信/朋友圈/微博`,
    })
  }

  // 确保 route.tags 存在，如果不存在则提供空数组
  const tags = route.tags || []

  // 确保 route.stops 存在，如果不存在则提供空数组
  const stops = route.stops || []

  // 修复导航功能
  const handleStartNavigation = () => {
    // 确保有位置信息，如果没有则使用默认值
    const locationData = {
      name: route.title,
      address: route.location?.address || "浙江省杭州市",
      latitude: route.location?.latitude || 30.259924,
      longitude: route.location?.longitude || 120.219375,
    }

    console.log("Navigating to map with location:", locationData)
    navigate("map", { location: locationData })

    // 显示导航开始的提示
    toast({
      title: "导航已开始",
      description: `正在导航至: ${locationData.name}`,
    })
  }

  const handleFindCompanions = () => {
    navigate("social", { searchQuery: "寻找玩伴", activity: route?.title })
  }

  return (
    <div className="pb-16">
      {/* 头部图片 */}
      <div className="relative h-56">
        <img src={route.image || "/placeholder.svg"} alt={route.title} className="w-full h-full object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-white/70 hover:bg-white/90 rounded-full"
          onClick={goBack}
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/70 hover:bg-white/90"
            onClick={handleToggleFavorite}
          >
            <Heart size={18} className={isFavorite ? "fill-red-500 text-red-500" : "text-red-500"} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/70 hover:bg-white/90"
            onClick={handleShare}
          >
            <Share2 size={18} />
          </Button>
        </div>
      </div>

      {/* 路线信息 */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{route.title}</h1>
          <Badge className="flex items-center bg-blue-500">
            <Star className="h-3 w-3 mr-1 fill-current" />
            {route.rating}
          </Badge>
        </div>

        <div className="flex items-center mt-2 text-gray-600">
          <Clock size={16} className="mr-1" />
          <span className="mr-3">{route.duration}</span>
          <Wallet size={16} className="mr-1" />
          <span>{route.budget}</span>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">路线介绍</h2>
          <p className="text-gray-600">{route.description}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">行程安排</h2>
          <div className="space-y-4">
            {stops.map((stop, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-blue-300 pb-4 last:border-0">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                <div className="mb-1 font-medium flex items-center">
                  <Calendar size={14} className="mr-1 text-blue-500" />
                  {stop.time} - {stop.place}
                </div>
                <div className="text-sm text-gray-600">{stop.activity}</div>
                <div className="text-xs text-gray-500 mt-1">预计: {stop.duration}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">游客评价</h2>
          <div className="space-y-4">
            {reviewList.map((review) => (
              <div key={review.id} className="border rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium">{review.userName}</div>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{review.content}</p>
                {review.images && review.images.length > 0 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {review.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image || "/placeholder.svg"}
                        alt={`评价图片 ${idx + 1}`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <Button className="flex-1" onClick={handleStartNavigation}>
            <MapPin size={16} className="mr-2" />
            开始导航
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleFindCompanions}>
            寻找同行玩伴
          </Button>
        </div>
      </div>
    </div>
  )
}

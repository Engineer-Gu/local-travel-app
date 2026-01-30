"use client"

import { useState } from "react"
import { Search, Filter, Star, Calendar, MessageCircle, Award, ArrowLeft, ThumbsUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Screen } from "@/lib/navigation-types"

interface GuidesProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

// 模拟评价数据
const reviewsData = {
  guide1: [
    {
      id: "1",
      user: "张先生",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2023-10-15",
      content:
        "导游非常专业，对历史文化的讲解很有深度，让我们全家都收获颇丰。特别是对古建筑的介绍，生动有趣，孩子们也听得很入迷。",
      likes: 24,
      tags: ["知识丰富", "讲解生动", "服务周到"],
    },
    {
      id: "2",
      user: "李女士",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2023-09-28",
      content: "导游很热情，带我们去了很多当地人才知道的美食地点，推荐的每一道菜都很地道。唯一的小缺点是行程有点赶。",
      likes: 18,
      tags: ["美食推荐", "热情"],
    },
  ],
  guide2: [
    {
      id: "1",
      user: "王先生",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2023-11-02",
      content:
        "作为美食爱好者，我非常满意这次导游服务。导游带我们去了最佳的美食街，还根据我们的口味偏好推荐了很多地道美食。",
      likes: 32,
      tags: ["美食指导", "专业", "耐心"],
    },
  ],
}

export function Guides({ navigate }: GuidesProps) {
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [showReviews, setShowReviews] = useState(false)
  const [selectedGuide, setSelectedGuide] = useState<any>(null)

  const categories = ["全部", "历史文化", "美食", "摄影", "户外探险", "亲子", "艺术"]

  const allGuides = [
    {
      id: "guide1",
      name: "陈导游",
      avatar: "/images/mock/avatar_male_1.png",
      rating: 4.9,
      reviews: 128,
      specialties: ["历史文化", "古建筑"],
      experience: "5年导游经验",
      price: "¥300/小时",
      available: "今日可约",
    },
    {
      id: "guide2",
      name: "李导游",
      avatar: "/images/mock/avatar_female_1.png",
      rating: 4.8,
      reviews: 96,
      specialties: ["美食", "市井文化"],
      experience: "8年导游经验",
      price: "¥350/小时",
      available: "明日可约",
    },
    {
      id: "guide3",
      name: "王导游",
      avatar: "/images/mock/avatar_male_2.png",
      rating: 4.7,
      reviews: 85,
      specialties: ["摄影", "自然风光"],
      experience: "4年导游经验",
      price: "¥280/小时",
      available: "本周末可约",
    },
    {
      id: "guide4",
      name: "张导游",
      avatar: "/images/mock/avatar_female_2.png",
      rating: 4.6,
      reviews: 76,
      specialties: ["古建筑", "历史文化"],
      experience: "6年导游经验",
      price: "¥320/小时",
      available: "明日可约",
    },
    {
      id: "guide5",
      name: "刘导游",
      avatar: "/images/mock/avatar_male_1.png",
      rating: 4.9,
      reviews: 142,
      specialties: ["美食", "夜景"],
      experience: "9年导游经验",
      price: "¥380/小时",
      available: "今日可约",
    },
    {
      id: "guide6",
      name: "赵导游",
      avatar: "/images/mock/avatar_female_1.png",
      rating: 4.7,
      reviews: 93,
      specialties: ["户外探险", "生态旅游"],
      experience: "7年导游经验",
      price: "¥340/小时",
      available: "本周末可约",
    },
    {
      id: "guide7",
      name: "孙导游",
      avatar: "/images/mock/avatar_male_2.png",
      rating: 4.8,
      reviews: 115,
      specialties: ["艺术", "博物馆"],
      experience: "10年导游经验",
      price: "¥400/小时",
      available: "今日可约",
    },
  ]

  // 根据选择的分类筛选导游
  const filteredGuides =
    selectedCategory === "全部"
      ? allGuides
      : allGuides.filter((guide) =>
        guide.specialties.some(
          (specialty) =>
            specialty === selectedCategory || (selectedCategory === "亲子" && specialty.includes("亲子")),
        ),
      )

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  const handleViewReviews = (guide: any) => {
    setSelectedGuide(guide)
    setShowReviews(true)
  }

  // 如果显示评价页面
  if (showReviews && selectedGuide) {
    return (
      <GuideReviews
        guide={selectedGuide}
        onBack={() => {
          setShowReviews(false)
          setSelectedGuide(null)
        }}
      />
    )
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">专业导游</h1>
        <Button variant="outline" size="icon">
          <Filter size={18} />
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="搜索导游或专长"
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex overflow-x-auto pb-2 mb-6 gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={category === selectedCategory ? "default" : "outline"}
            className={`px-3 py-1 whitespace-nowrap cursor-pointer ${category === selectedCategory ? "bg-blue-500" : ""
              }`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      <div className="space-y-4">
        {filteredGuides.map((guide, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={guide.avatar || "/placeholder.svg"} alt={guide.name} />
                    <AvatarFallback>{guide.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <Badge className="absolute -bottom-1 -right-1 bg-amber-500 whitespace-nowrap">
                    <Award size={12} className="mr-1 inline-block" />
                    <span className="inline-block">金牌导游</span>
                  </Badge>
                </div>

                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{guide.name}</h3>
                    <div className="flex items-center cursor-pointer" onClick={() => handleViewReviews(guide)}>
                      <Star size={14} className="text-yellow-500 fill-current mr-1" />
                      <span className="text-sm font-medium">{guide.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({guide.reviews}条评价)</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-1">
                    {guide.specialties.map((specialty, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs cursor-pointer"
                        onClick={() => handleCategorySelect(specialty)}
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <Calendar size={14} className="mr-1" />
                    <span>{guide.experience}</span>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div>
                      <span className="text-blue-600 font-medium">{guide.price}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {guide.available}
                      </Badge>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate("guide-consult", {
                            guide: {
                              id: guide.id,
                              name: guide.name,
                              avatar: guide.avatar,
                              specialties: guide.specialties,
                            },
                          })
                        }
                      >
                        <MessageCircle size={14} className="mr-1" />
                        咨询
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate("guide-booking", {
                            guide: {
                              id: guide.id,
                              name: guide.name,
                              avatar: guide.avatar,
                              price: guide.price,
                            },
                          })
                        }
                      >
                        预约
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// 内嵌的评价组件，不需要单独注册路由
function GuideReviews({ guide, onBack }: { guide: any; onBack: () => void }) {
  const [activeFilter, setActiveFilter] = useState("全部")

  // 评分统计
  const ratingStats = {
    5: 75,
    4: 18,
    3: 5,
    2: 1,
    1: 1,
  }

  // 筛选标签
  const filterTags = ["全部", "最新", "好评", "有图", "知识丰富", "服务周到", "美食推荐"]

  // 模拟评价数据
  const reviews = [
    {
      id: "1",
      user: "张先生",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2023-10-15",
      content:
        "导游非常专业，对历史文化的讲解很有深度，让我们全家都收获颇丰。特别是对古建筑的介绍，生动有趣，孩子们也听得很入迷。",
      likes: 24,
      images: ["/placeholder.svg?height=80&width=80&text=景点1", "/placeholder.svg?height=80&width=80&text=景点2"],
      tags: ["知识丰富", "讲解生动", "服务周到"],
    },
    {
      id: "2",
      user: "李女士",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2023-09-28",
      content: "导游很热情，带我们去了很多当地人才知道的美食地点，推荐的每一道菜都很地道。唯一的小缺点是行程有点赶。",
      likes: 18,
      images: ["/placeholder.svg?height=80&width=80&text=美食1"],
      tags: ["美食推荐", "热情"],
    },
    {
      id: "3",
      user: "王先生",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2023-11-02",
      content:
        "作为摄影爱好者，我非常满意这次导游服务。导游带我们去了最佳的拍摄点，还根据光线条件调整了行程，让我拍到了很多满意的照片。",
      likes: 32,
      images: [
        "/placeholder.svg?height=80&width=80&text=风景1",
        "/placeholder.svg?height=80&width=80&text=风景2",
        "/placeholder.svg?height=80&width=80&text=风景3",
      ],
      tags: ["摄影指导", "专业", "耐心"],
    },
    {
      id: "4",
      user: "刘女士",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2023-10-05",
      content: "导游对当地历史了解很深，讲解很有趣。带我们避开了人流高峰，体验很好。",
      likes: 15,
      images: [],
      tags: ["知识丰富", "避开人流"],
    },
    {
      id: "5",
      user: "赵先生",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 3,
      date: "2023-09-15",
      content: "导游专业度不错，但是有时候语速太快，我们老人家跟不上。希望能更照顾不同年龄段游客的需求。",
      likes: 8,
      images: [],
      tags: ["专业", "语速快"],
    },
  ]

  // 根据筛选条件过滤评价
  const filteredReviews = reviews.filter((review) => {
    if (activeFilter === "全部") return true
    if (activeFilter === "好评") return review.rating >= 4
    if (activeFilter === "有图") return review.images && review.images.length > 0
    return review.tags.includes(activeFilter)
  })

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 头部 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" className="mr-2" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold">用户评价</h1>
        </div>

        {/* 导游信息 */}
        <div className="px-4 pb-4 flex items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage src={guide.avatar || "/placeholder.svg"} alt={guide.name} />
            <AvatarFallback>{guide.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h2 className="font-medium">{guide.name}</h2>
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-current" />
              <span className="ml-1 font-medium">{guide.rating}</span>
              <span className="text-sm text-gray-500 ml-1">({guide.reviews}条评价)</span>
            </div>
          </div>
        </div>

        {/* 评分统计 */}
        <div className="px-4 pb-4 bg-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">评分</h3>
            <span className="text-sm text-gray-500">共{guide.reviews}条评价</span>
          </div>

          <div className="space-y-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <div className="w-8 text-sm text-gray-600">{rating}星</div>
                <Progress value={ratingStats[rating as keyof typeof ratingStats]} className="flex-1 h-2 mx-2" />
                <div className="w-8 text-right text-sm text-gray-600">
                  {ratingStats[rating as keyof typeof ratingStats]}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 筛选标签 */}
        <div className="px-4 pb-3 overflow-x-auto flex gap-2">
          {filterTags.map((tag) => (
            <Badge
              key={tag}
              variant={activeFilter === tag ? "default" : "outline"}
              className={`whitespace-nowrap cursor-pointer ${activeFilter === tag ? "bg-blue-500" : ""}`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* 评价列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                  <AvatarFallback>{review.user.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <div className="font-medium">{review.user}</div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 text-gray-700">{review.content}</div>

            {review.images && review.images.length > 0 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {review.images.map((img, i) => (
                  <img
                    key={i}
                    src={img || "/placeholder.svg"}
                    alt={`评价图片${i + 1}`}
                    className="h-20 w-20 object-cover rounded-md"
                  />
                ))}
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-1">
              {review.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-3 flex justify-between items-center">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <ThumbsUp size={14} className="mr-1" />
                有用 ({review.likes})
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Calendar, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface TravelDiaryProps {
  goBack: () => void
  navigate: (screen: string, params?: Record<string, any>) => void
}

export function TravelDiary({ goBack, navigate }: TravelDiaryProps) {
  const [activeTab, setActiveTab] = useState("my-diary")
  const { toast } = useToast()
  const [myDiaries, setMyDiaries] = useState([
    {
      id: "diary1",
      title: "西湖一日游",
      date: "2023-05-15",
      location: "杭州西湖",
      content:
        "今天游览了西湖，景色真的太美了！断桥残雪、平湖秋月、三潭印月，每个景点都让人流连忘返。中午在楼外楼品尝了正宗的西湖醋鱼和龙井虾仁，味道鲜美。下午去了灵隐寺祈福，感受了一下佛教文化的庄严肃穆。",
      images: [
        "/placeholder.svg?height=200&width=300&text=西湖风景1",
        "/placeholder.svg?height=200&width=300&text=西湖风景2",
        "/placeholder.svg?height=200&width=300&text=西湖风景3",
      ],
      likes: 28,
      comments: 5,
      isPublic: true,
    },
    {
      id: "diary2",
      title: "千岛湖之旅",
      date: "2023-04-20",
      location: "千岛湖",
      content:
        "千岛湖的水真的很清澈，乘船游览了中心湖区，看到了许多小岛。岛上的植被非常茂密，空气清新。在岛上野餐，感觉特别惬意。",
      images: [
        "/placeholder.svg?height=200&width=300&text=千岛湖风景1",
        "/placeholder.svg?height=200&width=300&text=千岛湖风景2",
      ],
      likes: 15,
      comments: 3,
      isPublic: false,
    },
  ])

  // 模拟发现页面的日记
  const [discoverDiaries, setDiscoverDiaries] = useState([
    {
      id: "discover1",
      user: {
        name: "旅行达人",
        avatar: "/placeholder.svg?height=40&width=40&text=旅行达人",
      },
      title: "莫干山度假",
      date: "2023-05-18",
      location: "莫干山",
      content:
        "莫干山的民宿真的太棒了！依山而建，视野开阔，早上推开窗就能看到云海。这里的竹林也很美，漫步其中，听着竹叶沙沙作响，所有的烦恼都抛到九霄云外了。",
      images: [
        "/placeholder.svg?height=200&width=300&text=莫干山风景1",
        "/placeholder.svg?height=200&width=300&text=莫干山风景2",
      ],
      likes: 156,
      comments: 42,
      liked: false,
    },
    {
      id: "discover2",
      user: {
        name: "摄影师小王",
        avatar: "/placeholder.svg?height=40&width=40&text=摄影师小王",
      },
      title: "雁荡山摄影之旅",
      date: "2023-05-10",
      location: "雁荡山",
      content:
        "雁荡山的奇峰异石真是大自然的鬼斧神工！灵岩、大龙湫、三折瀑，每个景点都值得细细品味。尤其是日出时分，云海翻腾，山峰若隐若现，简直如仙境一般。",
      images: [
        "/placeholder.svg?height=200&width=300&text=雁荡山风景1",
        "/placeholder.svg?height=200&width=300&text=雁荡山风景2",
        "/placeholder.svg?height=200&width=300&text=雁荡山风景3",
      ],
      likes: 208,
      comments: 35,
      liked: false,
    },
  ])

  const handleLike = (diaryId: string, isDiscover = false) => {
    if (isDiscover) {
      setDiscoverDiaries(
        discoverDiaries.map((diary) => {
          if (diary.id === diaryId) {
            const newLiked = !diary.liked
            return {
              ...diary,
              likes: newLiked ? diary.likes + 1 : diary.likes - 1,
              liked: newLiked,
            }
          }
          return diary
        }),
      )
    } else {
      setMyDiaries(
        myDiaries.map((diary) => {
          if (diary.id === diaryId) {
            return { ...diary, likes: diary.likes + 1 }
          }
          return diary
        }),
      )
    }

    toast({
      title: "点赞成功",
      description: "您已成功点赞此日记。",
    })
  }

  const handleComment = (diaryId: string) => {
    navigate("diary-detail", { diaryId })
  }

  const handleShare = (diaryId: string) => {
    toast({
      title: "分享成功",
      description: "日记已分享到您的社交媒体。",
    })
  }

  const handleAddImage = () => {
    toast({
      title: "添加图片",
      description: "您可以从相册选择或拍摄新照片。",
    })
  }

  const handleAddLocation = () => {
    toast({
      title: "添加位置",
      description: "请选择您的当前位置或搜索地点。",
    })
  }

  const handleCreateNew = () => {
    navigate("edit-diary")
  }

  return (
    <div className="pb-16">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold ml-2">旅行日记</h1>
        </div>
        <Button size="icon" variant="ghost" onClick={handleCreateNew}>
          <Plus size={20} />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mx-4 mt-2">
          <TabsTrigger value="my-diary">我的日记</TabsTrigger>
          <TabsTrigger value="discover">发现</TabsTrigger>
        </TabsList>

        {/* 我的日记 */}
        <TabsContent value="my-diary" className="p-4 space-y-4">
          <Button variant="outline" className="w-full" onClick={handleCreateNew}>
            <Plus size={16} className="mr-2" />
            创建新日记
          </Button>

          {myDiaries.map((diary) => (
            <Card key={diary.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{diary.title}</h3>
                    <Badge variant={diary.isPublic ? "default" : "outline"}>{diary.isPublic ? "已发布" : "私密"}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={14} className="mr-1" />
                    <span className="mr-3">{diary.date}</span>
                    <MapPin size={14} className="mr-1" />
                    <span>{diary.location}</span>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-3">{diary.content}</p>

                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {diary.images.map((img, index) => (
                      <img
                        key={index}
                        src={img || "/placeholder.svg"}
                        alt={`${diary.title} 图片 ${index + 1}`}
                        className="h-20 w-28 object-cover rounded-md"
                      />
                    ))}
                  </div>

                  <div className="flex justify-between mt-3 pt-3 border-t">
                    <Button variant="ghost" size="sm" onClick={() => handleLike(diary.id)}>
                      👍 {diary.likes}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleComment(diary.id)}>
                      💬 {diary.comments}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleShare(diary.id)}>
                      分享
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => navigate("edit-diary", { diary })}>
                      编辑
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* 发现页面 */}
        <TabsContent value="discover" className="p-4 space-y-4">
          {discoverDiaries.map((diary) => (
            <Card
              key={diary.id}
              className="overflow-hidden"
              onClick={() => navigate("diary-detail", { diaryId: diary.id })}
            >
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={diary.user.avatar || "/placeholder.svg"} alt={diary.user.name} />
                      <AvatarFallback>{diary.user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{diary.user.name}</h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin size={12} className="mr-1" />
                        <span>{diary.location}</span>
                        <span className="mx-1">•</span>
                        <Clock size={12} className="mr-1" />
                        <span>{diary.date}</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-medium mb-2">{diary.title}</h4>
                  <p className="text-gray-600 mb-3 line-clamp-3">{diary.content}</p>

                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {diary.images.map((img, index) => (
                      <img
                        key={index}
                        src={img || "/placeholder.svg"}
                        alt={`${diary.title} 图片 ${index + 1}`}
                        className="h-24 w-32 object-cover rounded-md"
                      />
                    ))}
                  </div>

                  <div className="flex justify-between mt-3 pt-3 border-t" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(diary.id, true)}
                      className={diary.liked ? "text-red-500" : ""}
                    >
                      👍 {diary.likes}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleComment(diary.id)}>
                      💬 {diary.comments}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleShare(diary.id)}>
                      分享
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

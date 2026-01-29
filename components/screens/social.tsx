"use client"

import { Search, MapPin, MessageCircle, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Screen } from "@/lib/navigation-types"

// Add these imports at the top of the file (commented out)
// import { useState, useEffect } from "react"
// import { socialService } from "@/lib/services/social-service"
// import { toast } from "@/hooks/use-toast"
// import type { LocalGroup } from "@/lib/services/social-service"

interface SocialProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function Social({ navigate }: SocialProps) {
  const nearbyPlayers = [
    {
      id: "player1",
      name: "张小明",
      avatar: "/placeholder.svg?height=60&width=60",
      distance: "0.5km",
      interests: ["摄影", "美食", "历史"],
      status: "计划本周末出行",
    },
    {
      id: "player2",
      name: "李华",
      avatar: "/placeholder.svg?height=60&width=60",
      distance: "1.2km",
      interests: ["户外", "徒步", "露营"],
      status: "寻找周日爬山伙伴",
    },
    {
      id: "player3",
      name: "王芳",
      avatar: "/placeholder.svg?height=60&width=60",
      distance: "2.3km",
      interests: ["艺术", "博物馆", "咖啡"],
      status: "周六有人去艺术展吗？",
    },
    {
      id: "player4",
      name: "赵明",
      avatar: "/placeholder.svg?height=60&width=60",
      distance: "3.1km",
      interests: ["摄影", "骑行", "咖啡"],
      status: "想找人一起骑行",
    },
    {
      id: "player5",
      name: "陈静",
      avatar: "/placeholder.svg?height=60&width=60",
      distance: "3.8km",
      interests: ["美食", "电影", "旅行"],
      status: "周末有人去看新电影吗？",
    },
    {
      id: "player6",
      name: "刘洋",
      avatar: "/placeholder.svg?height=60&width=60",
      distance: "4.2km",
      interests: ["健身", "潮流", "音乐"],
      status: "寻找健身伙伴",
    },
  ]

  // Add these functions inside the Social component (commented out)
  /*
    // 获取附近玩家
    const fetchNearbyPlayers = async () => {
      try {
        setIsLoading(true)
        // 获取当前位置
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            const players = await userService.getNearbyPlayers(latitude, longitude, nearbyFilter)
            setNearbyPlayers(players)
            setIsLoading(false)
          },
          (error) => {
            console.error('获取位置失败', error)
            toast({
              title: "获取位置失败",
              description: "请检查位置权限设置",
              variant: "destructive",
            })
            setIsLoading(false)
          }
        )
      } catch (error) {
        console.error('获取附近玩家失败', error)
        toast({
          title: "获取附近玩家失败",
          description: "请检查网络连接后重试",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }
  */

  /* 
    // 获取同城群组
    const fetchLocalGroups = async () => {
      try {
        setIsLoadingGroups(true)
        // 获取当前城市
        const city = await getCurrentCity()
        const groups = await socialService.getLocalGroups(city)
        setLocalGroups(groups)
        setIsLoadingGroups(false)
      } catch (error) {
        console.error('获取同城群组失败', error)
        toast({
          title: "获取同城群组失败",
          description: "请检查网络连接后重试",
          variant: "destructive",
        })
        setIsLoadingGroups(false)
      }
    }

    // 获取当前城市
    const getCurrentCity = async (): Promise<string> => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords
              // 调用地理编码API获取城市
              const response = await fetch(`https://api.map.baidu.com/reverse_geocoding/v3/?ak=${process.env.NEXT_PUBLIC_BAIDU_MAP_AK}&output=json&coordtype=wgs84ll&location=${latitude},${longitude}`)
              const data = await response.json()
              if (data.status === 0) {
                resolve(data.result.addressComponent.city)
              } else {
                reject(new Error('地理编码失败'))
              }
            } catch (error) {
              reject(error)
            }
          },
          (error) => {
            reject(error)
          }
        )
      })
    }

    // 搜索同城群组
    const searchLocalGroups = async (keyword: string) => {
      try {
        setIsLoadingGroups(true)
        const city = await getCurrentCity()
        const groups = await socialService.searchLocalGroups(keyword, city)
        setLocalGroups(groups)
        setIsLoadingGroups(false)
      } catch (error) {
        console.error('搜索同城群组失败', error)
        setIsLoadingGroups(false)
      }
    }

    // 加入群组
    const handleJoinGroup = async (groupId: string) => {
      try {
        await socialService.joinGroup(groupId)
        toast({
          title: "已申请加入群组",
          description: "等待管理员审核",
        })
      } catch (error) {
        console.error('加入群组失败', error)
        toast({
          title: "加入群组失败",
          description: "请稍后重试",
          variant: "destructive",
        })
      }
    }

    // 获取热门同城群组
    const fetchPopularLocalGroups = async () => {
      try {
        const city = await getCurrentCity()
        const groups = await socialService.getPopularLocalGroups(city)
        setPopularGroups(groups)
      } catch (error) {
        console.error('获取热门同城群组失败', error)
      }
    }

    // 创建同城群组
    const handleCreateGroup = async (groupData: {
      name: string
      description: string
      tags?: string[]
      image?: File
    }) => {
      try {
        setIsCreating(true)
        const city = await getCurrentCity()
        const newGroup = await socialService.createLocalGroup({
          ...groupData,
          city
        })
        toast({
          title: "群组创建成功",
          description: `"${newGroup.name}"已创建`,
        })
        setIsCreating(false)
        navigate("group-detail", { group: newGroup })
      } catch (error) {
        console.error('创建群组失败', error)
        toast({
          title: "创建群组失败",
          description: "请稍后重试",
          variant: "destructive",
        })
        setIsCreating(false)
      }
    }

    // 获取附近的同城群组
    const fetchNearbyGroups = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            const groups = await socialService.getNearbyGroups(latitude, longitude)
            setNearbyGroups(groups)
          },
          (error) => {
            console.error('获取位置失败', error)
          }
        )
      } catch (error) {
        console.error('获取附近群组失败', error)
      }
    }

    // 获取群组分类
    const fetchGroupCategories = async () => {
      try {
        const categories = await socialService.getGroupCategories()
        setGroupCategories(categories)
      } catch (error) {
        console.error('获取群组分类失败', error)
      }
    }

    // 按分类获取群组
    const fetchGroupsByCategory = async (categoryId: string) => {
      try {
        setIsLoadingGroups(true)
        const groups = await socialService.getGroupsByCategory(categoryId)
        setLocalGroups(groups)
        setIsLoadingGroups(false)
      } catch (error) {
        console.error('获取分类群组失败', error)
        setIsLoadingGroups(false)
      }
    }
  */

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">同城玩家</h1>
        <Button variant="outline" size="icon" onClick={() => navigate("friend-request")}>
          <UserPlus size={18} />
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="搜索玩家或兴趣标签"
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <Tabs defaultValue="nearby">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="nearby">附近玩家</TabsTrigger>
          <TabsTrigger value="matching">兴趣匹配</TabsTrigger>
          <TabsTrigger value="groups">同城群组</TabsTrigger>
        </TabsList>

        <TabsContent value="nearby" className="space-y-4">
          {nearbyPlayers.map((player, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                    <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>

                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{player.name}</h3>
                      <Badge variant="outline" className="flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {player.distance}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1">
                      {player.interests.map((interest, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 mt-2">{player.status}</p>

                    <div className="flex space-x-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          navigate("chat", { friend: { id: player.id, name: player.name, avatar: player.avatar } })
                        }
                      >
                        <MessageCircle size={14} className="mr-1" />
                        聊天
                      </Button>
                      <Button size="sm" className="flex-1" onClick={() => navigate("friend-request")}>
                        <UserPlus size={14} className="mr-1" />
                        加好友
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="matching">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <UserPlus size={32} className="text-blue-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">完善您的兴趣标签</h3>
            <p className="text-center text-gray-500 mb-4">添加您的兴趣爱好，我们将为您匹配志同道合的玩伴</p>
            <Button onClick={() => navigate("interest-settings")}>设置兴趣标签</Button>
          </div>
        </TabsContent>

        <TabsContent value="groups">
          <div className="space-y-4">
            {[
              {
                id: "group1",
                name: "西湖摄影爱好者",
                members: 128,
                activity: "每周日早晨西湖拍摄活动",
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                id: "group2",
                name: "美食探店小分队",
                members: 256,
                activity: "本周六探店新开日料店",
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                id: "group3",
                name: "周末户外徒步",
                members: 95,
                activity: "计划下周登山活动",
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                id: "group4",
                name: "城市探索小分队",
                members: 156,
                activity: "每周探索城市秘境",
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                id: "group5",
                name: "单车骑行俱乐部",
                members: 208,
                activity: "本周末环湖骑行活动",
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                id: "group6",
                name: "摄影爱好者联盟",
                members: 175,
                activity: "城市夜景拍摄活动",
                image: "/placeholder.svg?height=80&width=80",
              },
            ].map((group, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex">
                    <div className="w-20 h-20 rounded-lg overflow-hidden">
                      <img
                        src={group.image || "/placeholder.svg"}
                        alt={group.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="ml-3 flex-1">
                      <h3 className="font-semibold">{group.name}</h3>
                      <div className="text-sm text-gray-500 mt-1">{group.members} 位成员</div>
                      <p className="text-sm mt-2">{group.activity}</p>

                      <Button size="sm" className="mt-2" onClick={() => navigate("group-detail", { group })}>
                        加入群组
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

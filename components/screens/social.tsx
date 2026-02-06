"use client"

import { useState } from "react"
import { Search, MapPin, MessageCircle, UserPlus, Users, Calendar, ChevronRight, Sparkles, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Screen } from "@/lib/navigation-types"

interface SocialProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function Social({ navigate }: SocialProps) {
  const [searchQuery, setSearchQuery] = useState("")

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

  // 智能匹配玩家数据
  const matchedPlayers = [
    {
      id: "match1",
      name: "小李",
      avatar: "/images/mock/avatar_male_1.png",
      matchScore: 92,
      commonInterests: ["摄影", "美食", "历史"],
      plan: "周六去西湖",
      distance: "1.5km",
    },
    {
      id: "match2",
      name: "小王",
      avatar: "/images/mock/avatar_female_1.png",
      matchScore: 85,
      commonInterests: ["徒步", "摄影"],
      plan: "周日爬山",
      distance: "2.3km",
    },
    {
      id: "match3",
      name: "阿杰",
      avatar: "/images/mock/avatar_male_2.png",
      matchScore: 78,
      commonInterests: ["美食", "探店"],
      plan: "本周末美食探店",
      distance: "3.1km",
    },
  ]

  // 热门组队数据
  const hotTeams = [
    {
      id: "team1",
      title: "周末千岛湖自驾",
      destination: "千岛湖",
      date: "本周六",
      currentMembers: 3,
      maxMembers: 5,
      creator: { name: "旅行达人", avatar: "/images/mock/avatar_male_1.png" },
    },
    {
      id: "team2",
      title: "西湖徒步摄影",
      destination: "西湖",
      date: "本周日",
      currentMembers: 2,
      maxMembers: 4,
      creator: { name: "摄影爱好者", avatar: "/images/mock/avatar_female_2.png" },
    },
  ]

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">和谁玩</h1>
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
          {nearbyPlayers.map((player, index) => {
            // Assign random avatar based on index
            const avatarIndex = (index % 4);
            const avatars = [
              "/images/mock/avatar_male_1.png",
              "/images/mock/avatar_female_1.png",
              "/images/mock/avatar_male_2.png",
              "/images/mock/avatar_female_2.png"
            ];

            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={avatars[avatarIndex]} alt={player.name} />
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
                            navigate("chat", { friend: { id: player.id, name: player.name, avatar: avatars[avatarIndex] } })
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
            )
          })}
        </TabsContent>

        <TabsContent value="matching" className="space-y-4">
          {/* AI智能匹配说明 */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">AI智能匹配</h3>
                  <p className="text-xs text-gray-600">根据兴趣、出行计划、历史轨迹为您推荐</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigate("interest-settings")}>
                  设置偏好
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 匹配玩家列表 */}
          {matchedPlayers.map((player) => (
            <Card key={player.id}>
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="relative">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={player.avatar} alt={player.name} />
                      <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    {/* 匹配度标签 */}
                    <div className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                      {player.matchScore}%
                    </div>
                  </div>

                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{player.name}</h3>
                      <Badge variant="outline" className="flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {player.distance}
                      </Badge>
                    </div>

                    {/* 共同兴趣 */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {player.commonInterests.map((interest, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          {interest}
                        </Badge>
                      ))}
                    </div>

                    {/* 出行计划 */}
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <Target size={14} className="mr-1 text-orange-500" />
                      <span>{player.plan}</span>
                    </div>

                    {/* 匹配度进度条 */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>匹配度</span>
                        <span>{player.matchScore}%</span>
                      </div>
                      <Progress value={player.matchScore} className="h-1.5" />
                    </div>

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
                        打招呼
                      </Button>
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500">
                        <UserPlus size={14} className="mr-1" />
                        邀请同行
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          {/* 组队大厅入口 */}
          <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-none cursor-pointer" onClick={() => navigate("team-hall")}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                    <Users size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">组队大厅</h3>
                    <p className="text-xs text-gray-600">找到志同道合的旅伴一起出发</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* 热门组队预览 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">热门组队</h3>
              <Button variant="ghost" size="sm" className="text-blue-500 h-auto p-0" onClick={() => navigate("team-hall")}>
                查看更多 <ChevronRight size={16} />
              </Button>
            </div>
            {hotTeams.map((team) => (
              <Card key={team.id} className="cursor-pointer" onClick={() => navigate("team-hall")}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={team.creator.avatar} alt={team.creator.name} />
                        <AvatarFallback>{team.creator.name.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-sm">{team.title}</h4>
                        <div className="flex items-center text-xs text-gray-500 mt-0.5">
                          <Calendar size={12} className="mr-1" />
                          <span>{team.date}</span>
                          <span className="mx-2">·</span>
                          <Users size={12} className="mr-1" />
                          <span>{team.currentMembers}/{team.maxMembers}人</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      招募中
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 同城群组列表 */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">同城群组</h3>
            {[
              {
                id: "group1",
                name: "西湖摄影爱好者",
                members: 128,
                activity: "每周日早晨西湖拍摄活动",
                image: "/images/mock/group_photography.png",
              },
              {
                id: "group2",
                name: "美食探店小分队",
                members: 256,
                activity: "本周六探店新开日料店",
                image: "/images/mock/group_food.png",
              },
              {
                id: "group3",
                name: "周末户外徒步",
                members: 95,
                activity: "计划下周登山活动",
                image: "/images/mock/group_hiking.png",
              },
              {
                id: "group4",
                name: "城市探索小分队",
                members: 156,
                activity: "每周探索城市秘境",
                image: "/images/mock/group_cycling.png",
              },
              {
                id: "group5",
                name: "单车骑行俱乐部",
                members: 208,
                activity: "本周末环湖骑行活动",
                image: "/images/mock/group_cycling.png",
              },
              {
                id: "group6",
                name: "摄影爱好者联盟",
                members: 175,
                activity: "城市夜景拍摄活动",
                image: "/images/mock/group_photography.png",
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

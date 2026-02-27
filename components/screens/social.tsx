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
    <div className="p-4 pb-16 bg-white dark:bg-gray-950">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">和谁玩</h1>
        <Button variant="ghost" size="icon" className="text-gray-500" onClick={() => navigate("friend-request")}>
          <UserPlus size={18} />
        </Button>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="搜索玩家或兴趣"
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:border-gray-300 dark:focus:border-gray-600"
        />
      </div>

      <Tabs defaultValue="nearby">
        <TabsList className="grid w-full grid-cols-3 mb-5 h-9">
          <TabsTrigger value="nearby" className="text-sm">附近</TabsTrigger>
          <TabsTrigger value="matching" className="text-sm">匹配</TabsTrigger>
          <TabsTrigger value="groups" className="text-sm">群组</TabsTrigger>
        </TabsList>

        <TabsContent value="nearby" className="space-y-3">
          {nearbyPlayers.map((player, index) => {
            const avatarIndex = (index % 4);
            const avatars = [
              "/images/mock/avatar_male_1.png",
              "/images/mock/avatar_female_1.png",
              "/images/mock/avatar_male_2.png",
              "/images/mock/avatar_female_2.png"
            ];

            return (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <div className="flex items-start">
                  <Avatar className="h-11 w-11">
                    <AvatarImage src={avatars[avatarIndex]} alt={player.name} />
                    <AvatarFallback className="text-sm">{player.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>

                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200">{player.name}</h3>
                      <span className="text-xs text-gray-400">{player.distance}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {player.interests.slice(0, 3).map((interest, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                          {interest}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-gray-500 mt-2 truncate">{player.status}</p>

                    <div className="flex space-x-2 mt-2.5">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1 h-8 text-xs text-gray-600 dark:text-gray-400"
                        onClick={() =>
                          navigate("chat", { friend: { id: player.id, name: player.name, avatar: avatars[avatarIndex] } })
                        }
                      >
                        <MessageCircle size={14} className="mr-1" />
                        聊天
                      </Button>
                      <Button size="sm" className="flex-1 h-8 text-xs" onClick={() => navigate("friend-request")}>
                        <UserPlus size={14} className="mr-1" />
                        加好友
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </TabsContent>

        <TabsContent value="matching" className="space-y-3">
          {/* AI智能匹配说明 */}
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
                <Sparkles size={18} className="text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200">智能匹配</h3>
                <p className="text-xs text-gray-500">根据兴趣和出行计划推荐</p>
              </div>
              <Button size="sm" variant="ghost" className="text-xs text-gray-500" onClick={() => navigate("interest-settings")}>
                设置
              </Button>
            </div>
          </div>

          {/* 匹配玩家列表 */}
          {matchedPlayers.map((player) => (
            <div key={player.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-start">
                <div className="relative">
                  <Avatar className="h-11 w-11">
                    <AvatarImage src={player.avatar} alt={player.name} />
                    <AvatarFallback className="text-sm">{player.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  {/* 匹配度标签 */}
                  <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                    {player.matchScore}%
                  </div>
                </div>

                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200">{player.name}</h3>
                    <span className="text-xs text-gray-400">{player.distance}</span>
                  </div>

                  {/* 共同兴趣 */}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {player.commonInterests.map((interest, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded">
                        {interest}
                      </span>
                    ))}
                  </div>

                  {/* 出行计划 */}
                  <p className="text-xs text-gray-500 mt-2">{player.plan}</p>

                  <div className="flex space-x-2 mt-2.5">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex-1 h-8 text-xs text-gray-600 dark:text-gray-400"
                      onClick={() =>
                        navigate("chat", { friend: { id: player.id, name: player.name, avatar: player.avatar } })
                      }
                    >
                      <MessageCircle size={14} className="mr-1" />
                      打招呼
                    </Button>
                    <Button size="sm" className="flex-1 h-8 text-xs">
                      <UserPlus size={14} className="mr-1" />
                      邀请同行
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="groups" className="space-y-3">
          {/* 组队大厅入口 */}
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl cursor-pointer" onClick={() => navigate("team-hall")}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
                  <Users size={20} className="text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200">组队大厅</h3>
                  <p className="text-xs text-gray-500">找旅伴一起出发</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </div>

          {/* 热门组队预览 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">热门组队</span>
              <Button variant="ghost" size="sm" className="text-xs text-gray-500 h-auto p-0" onClick={() => navigate("team-hall")}>
                更多 <ChevronRight size={14} />
              </Button>
            </div>
            {hotTeams.map((team) => (
              <div key={team.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl cursor-pointer" onClick={() => navigate("team-hall")}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={team.creator.avatar} alt={team.creator.name} />
                      <AvatarFallback className="text-sm">{team.creator.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200">{team.title}</h4>
                      <div className="flex items-center text-xs text-gray-500 mt-0.5">
                        <span>{team.date}</span>
                        <span className="mx-1.5">·</span>
                        <span>{team.currentMembers}/{team.maxMembers}人</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">
                    招募中
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 同城群组列表 */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">同城群组</span>
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
            ].map((group, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <div className="flex">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
                    <img
                      src={group.image || "/placeholder.svg"}
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="ml-3 flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200">{group.name}</h3>
                    <div className="text-xs text-gray-500 mt-0.5">{group.members} 位成员</div>
                    <p className="text-xs text-gray-500 mt-1 truncate">{group.activity}</p>
                  </div>

                  <Button size="sm" variant="ghost" className="text-xs h-8 shrink-0" onClick={() => navigate("group-detail", { group })}>
                    加入
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

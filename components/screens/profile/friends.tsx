"use client"

import { ArrowLeft, Search, UserPlus, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Screen } from "@/components/mobile-app"

interface FriendsProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function Friends({ goBack, navigate }: FriendsProps) {
  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">我的好友</h1>
        <Button size="icon" variant="ghost" className="ml-auto">
          <UserPlus size={18} />
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="搜索好友"
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <Tabs defaultValue="friends">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="friends">好友列表</TabsTrigger>
          <TabsTrigger value="requests">好友请求</TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="space-y-4">
          {[
            {
              name: "张小明",
              avatar: "/placeholder.svg?height=60&width=60&text=张小明",
              status: "在线",
              lastActive: "刚刚",
              interests: ["摄影", "美食", "历史"],
            },
            {
              name: "李华",
              avatar: "/placeholder.svg?height=60&width=60&text=李华",
              status: "离线",
              lastActive: "2小时前",
              interests: ["户外", "徒步", "露营"],
            },
            {
              name: "王芳",
              avatar: "/placeholder.svg?height=60&width=60&text=王芳",
              status: "在线",
              lastActive: "刚刚",
              interests: ["艺术", "博物馆", "咖啡"],
            },
          ].map((friend, index) => (
            <Card key={index}>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                    <AvatarFallback>{friend.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>

                  <div className="ml-3 flex-1">
                    <div className="flex items-center">
                      <h3 className="font-semibold">{friend.name}</h3>
                      <Badge
                        variant="outline"
                        className={`ml-2 text-xs ${friend.status === "在线" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        {friend.status}
                      </Badge>
                    </div>

                    <div className="text-xs text-gray-500 mt-1">最近活跃: {friend.lastActive}</div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {friend.interests.map((interest, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      navigate("chat", { friend: { id: index.toString(), name: friend.name, avatar: friend.avatar } })
                    }
                  >
                    <MessageCircle size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          {[
            {
              name: "赵明",
              avatar: "/placeholder.svg?height=60&width=60&text=赵明",
              mutualFriends: 3,
              time: "2小时前",
            },
            {
              name: "刘洋",
              avatar: "/placeholder.svg?height=60&width=60&text=刘洋",
              mutualFriends: 1,
              time: "1天前",
            },
          ].map((request, index) => (
            <Card key={index}>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                    <AvatarFallback>{request.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>

                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{request.name}</h3>
                      <span className="text-xs text-gray-500">{request.time}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{request.mutualFriends}个共同好友</div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => alert(`已拒绝${request.name}的好友请求`)}
                    >
                      <X size={16} />
                    </Button>
                    <Button size="sm" onClick={() => alert(`已接受${request.name}的好友请求`)}>
                      接受
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

"use client"

import { useState } from "react"
import { ArrowLeft, UserPlus, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Add these imports at the top of the file (commented out)
// import { userService } from "@/lib/services/user-service"

interface FriendRequestProps {
  goBack: () => void
}

export function FriendRequest({ goBack }: FriendRequestProps) {
  const [message, setMessage] = useState("")
  const [requestSent, setRequestSent] = useState(false)
  const [receivedRequests, setReceivedRequests] = useState([
    {
      name: "赵明",
      avatar: "/placeholder.svg?height=48&width=48&text=赵明",
      message: "我是赵明，想加你为好友一起玩",
      time: "2小时前",
    },
    {
      name: "刘洋",
      avatar: "/placeholder.svg?height=48&width=48&text=刘洋",
      message: "你好，我在西湖景区看到你了",
      time: "1天前",
    },
  ])

  // Add these functions inside the FriendRequest component (commented out)
  /*
    // 获取好友请求详情
    const fetchRequestDetails = async () => {
      try {
        setIsLoading(true)
        const requestDetails = await api.get(`/social/friend-requests/${requestId}`)
        setRequest(requestDetails)
        setIsLoading(false)
      } catch (error) {
        console.error('获取请求详情失败', error)
        toast({
          title: "获取请求详情失败",
          description: "请稍后重试",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    // 获取用户兴趣匹配度
    const fetchCompatibility = async () => {
      try {
        const compatibility = await userService.getCompatibilityScore(request.sender.id)
        setCompatibilityData(compatibility)
      } catch (error) {
        console.error('获取兴趣匹配度失败', error)
      }
    }

    // 接受好友请求
    const handleAccept = async () => {
      try {
        await api.post(`/social/friend-requests/${requestId}/accept`)
        toast({
          title: "已接受好友请求",
          description: "你们现在是好友了",
        })
        navigate("friends")
      } catch (error) {
        console.error('接受好友请求失败', error)
        toast({
          title: "操作失败",
          description: "请稍后重试",
          variant: "destructive",
        })
      }
    }

    // 拒绝好友请求
    const handleReject = async () => {
      try {
        await api.post(`/social/friend-requests/${requestId}/reject`)
        toast({
          title: "已拒绝好友请求",
        })
        navigate("friends")
      } catch (error) {
        console.error('拒绝好友请求失败', error)
        toast({
          title: "操作失败",
          description: "请稍后重试",
          variant: "destructive",
        })
      }
    }
  */

  const handleSendRequest = () => {
    setRequestSent(true)
  }

  const handleAcceptRequest = (index: number) => {
    const newRequests = [...receivedRequests]
    alert(`已接受${newRequests[index].name}的好友请求`)
    newRequests.splice(index, 1)
    setReceivedRequests(newRequests)
  }

  const handleRejectRequest = (index: number) => {
    const newRequests = [...receivedRequests]
    alert(`已拒绝${newRequests[index].name}的好友请求`)
    newRequests.splice(index, 1)
    setReceivedRequests(newRequests)
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">好友申请</h1>
      </div>

      {requestSent ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check size={32} className="text-green-500" />
          </div>
          <h3 className="text-lg font-medium mb-2">申请已发送</h3>
          <p className="text-center text-gray-500 mb-4">等待对方通过您的好友申请</p>
          <Button onClick={goBack}>返回</Button>
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64&text=张小明" alt="张小明" />
                  <AvatarFallback>张小</AvatarFallback>
                </Avatar>

                <div className="ml-4">
                  <h3 className="font-semibold text-lg">张小明</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      摄影
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      美食
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      历史
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">验证消息</label>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="请输入验证消息"
              className="mb-2"
            />
            <p className="text-xs text-gray-500">对方通过后，你们就可以开始聊天了</p>
          </div>

          <Button className="w-full" onClick={handleSendRequest}>
            <UserPlus size={16} className="mr-2" />
            发送好友申请
          </Button>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">好友申请</h2>

        <Tabs defaultValue="received">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="received">收到的</TabsTrigger>
            <TabsTrigger value="sent">发出的</TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-4">
            {receivedRequests.map((request, index) => (
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
                      <p className="text-sm text-gray-600 mt-1">{request.message}</p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => handleRejectRequest(index)}
                    >
                      <X size={16} />
                    </Button>
                    <Button size="sm" className="h-8" onClick={() => handleAcceptRequest(index)}>
                      接受
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="sent" className="space-y-4">
            {[
              {
                name: "王丽",
                avatar: "/placeholder.svg?height=48&width=48&text=王丽",
                message: "你好，我想加你为好友",
                time: "3小时前",
                status: "等待通过",
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
                      <p className="text-sm text-gray-600 mt-1">{request.message}</p>
                      <Badge variant="outline" className="mt-2">
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

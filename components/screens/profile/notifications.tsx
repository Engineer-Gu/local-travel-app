"use client"

import { ArrowLeft, Bell, MessageCircle, Gift, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NotificationsProps {
  goBack: () => void
}

export function Notifications({ goBack }: NotificationsProps) {
  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">消息通知</h1>
        <Button variant="ghost" size="sm" className="ml-auto">
          全部已读
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="system">系统</TabsTrigger>
          <TabsTrigger value="social">社交</TabsTrigger>
          <TabsTrigger value="activity">活动</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {[
            {
              type: "system",
              icon: Bell,
              title: "系统通知",
              content: "您的会员特权将在3天后到期，请及时续费",
              time: "10分钟前",
              read: false,
            },
            {
              type: "social",
              icon: MessageCircle,
              title: "好友消息",
              content: "李华向您发送了一条消息",
              time: "30分钟前",
              read: false,
            },
            {
              type: "activity",
              icon: Calendar,
              title: "行程提醒",
              content: "您明天09:00有一个西湖文化半日游行程",
              time: "1小时前",
              read: true,
            },
            {
              type: "system",
              icon: Gift,
              title: "优惠活动",
              content: "恭喜您获得一张导游服务9折优惠券",
              time: "2小时前",
              read: true,
            },
            {
              type: "social",
              icon: MessageCircle,
              title: "好友申请",
              content: "赵明请求添加您为好友",
              time: "1天前",
              read: true,
            },
          ].map((notification, index) => {
            const Icon = notification.icon
            return (
              <Card key={index} className={`${!notification.read ? "border-l-4 border-blue-500" : ""}`}>
                <CardContent className="p-3">
                  <div className="flex">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.type === "system"
                          ? "bg-blue-100"
                          : notification.type === "social"
                            ? "bg-green-100"
                            : "bg-purple-100"
                      }`}
                    >
                      <Icon
                        size={20}
                        className={`${
                          notification.type === "system"
                            ? "text-blue-600"
                            : notification.type === "social"
                              ? "text-green-600"
                              : "text-purple-600"
                        }`}
                      />
                    </div>

                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <div className="text-xs text-gray-500">{notification.time}</div>
                      </div>

                      <p className="text-sm text-gray-600 mt-1">{notification.content}</p>

                      {!notification.read && <Badge className="mt-2 bg-blue-500">未读</Badge>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          {[
            {
              icon: Bell,
              title: "系统通知",
              content: "您的会员特权将在3天后到期，请及时续费",
              time: "10分钟前",
              read: false,
            },
            {
              icon: Gift,
              title: "优惠活动",
              content: "恭喜您获得一张导游服务9折优惠券",
              time: "2小时前",
              read: true,
            },
          ].map((notification, index) => {
            const Icon = notification.icon
            return (
              <Card key={index} className={`${!notification.read ? "border-l-4 border-blue-500" : ""}`}>
                <CardContent className="p-3">
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon size={20} className="text-blue-600" />
                    </div>

                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <div className="text-xs text-gray-500">{notification.time}</div>
                      </div>

                      <p className="text-sm text-gray-600 mt-1">{notification.content}</p>

                      {!notification.read && <Badge className="mt-2 bg-blue-500">未读</Badge>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          {[
            {
              icon: MessageCircle,
              title: "好友消息",
              content: "李华向您发送了一条消息",
              time: "30分钟前",
              read: false,
            },
            {
              icon: MessageCircle,
              title: "好友申请",
              content: "赵明请求添加您为好友",
              time: "1天前",
              read: true,
            },
          ].map((notification, index) => {
            const Icon = notification.icon
            return (
              <Card key={index} className={`${!notification.read ? "border-l-4 border-blue-500" : ""}`}>
                <CardContent className="p-3">
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Icon size={20} className="text-green-600" />
                    </div>

                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <div className="text-xs text-gray-500">{notification.time}</div>
                      </div>

                      <p className="text-sm text-gray-600 mt-1">{notification.content}</p>

                      {!notification.read && <Badge className="mt-2 bg-blue-500">未读</Badge>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          {[
            {
              icon: Calendar,
              title: "行程提醒",
              content: "您明天09:00有一个西湖文化半日游行程",
              time: "1小时前",
              read: true,
            },
          ].map((notification, index) => {
            const Icon = notification.icon
            return (
              <Card key={index} className={`${!notification.read ? "border-l-4 border-blue-500" : ""}`}>
                <CardContent className="p-3">
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Icon size={20} className="text-purple-600" />
                    </div>

                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <div className="text-xs text-gray-500">{notification.time}</div>
                      </div>

                      <p className="text-sm text-gray-600 mt-1">{notification.content}</p>

                      {!notification.read && <Badge className="mt-2 bg-blue-500">未读</Badge>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}

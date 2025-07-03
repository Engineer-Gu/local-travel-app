"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Gift, Award, TrendingUp, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface CheckinProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function Checkin({ goBack, navigate }: CheckinProps) {
  const [checkedIn, setCheckedIn] = useState(false)
  const [points, setPoints] = useState(520)
  const [streak, setStreak] = useState(3)

  const handleCheckin = () => {
    if (!checkedIn) {
      setCheckedIn(true)
      setPoints(points + 10)
      setStreak(streak + 1)
    }
  }

  // 获取当前日期和一周的日期
  const today = new Date()
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(today.getDate() - today.getDay() + i)
    return {
      day: ["日", "一", "二", "三", "四", "五", "六"][date.getDay()],
      date: date.getDate(),
      isToday: date.getDate() === today.getDate() && date.getMonth() === today.getMonth(),
      isPast: date < today && !(date.getDate() === today.getDate() && date.getMonth() === today.getMonth()),
    }
  })

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">每日签到</h1>
      </div>

      <Card className="mb-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Award size={20} className="mr-2" />
              <h3 className="font-medium">我的积分</h3>
            </div>
            <span className="text-xl font-bold">{points}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span>连续签到 {streak} 天</span>
            <span>再签到 {7 - streak} 天可获得额外奖励</span>
          </div>
          <Progress value={(streak / 7) * 100} className="h-2 mt-2 bg-blue-300" />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-medium mb-4 flex items-center">
            <Calendar size={18} className="mr-2 text-blue-500" />
            签到日历
          </h3>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`flex flex-col items-center ${
                  day.isToday ? "text-blue-600" : day.isPast ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <span className="text-xs mb-1">周{day.day}</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    day.isToday
                      ? checkedIn
                        ? "bg-blue-500 text-white"
                        : "border-2 border-blue-500 text-blue-600"
                      : day.isPast
                        ? "bg-gray-100"
                        : "bg-gray-50"
                  }`}
                >
                  {day.isPast ? <Check size={14} /> : day.date}
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full" disabled={checkedIn} onClick={handleCheckin}>
            {checkedIn ? "今日已签到" : "立即签到 +10积分"}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-medium flex items-center">
          <Gift size={18} className="mr-2 text-blue-500" />
          积分兑换
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {[
            {
              title: "景区门票8折券",
              points: 100,
              image: "/placeholder.svg?height=80&width=160&text=门票折扣券",
            },
            {
              title: "导游服务9折券",
              points: 200,
              image: "/placeholder.svg?height=80&width=160&text=导游折扣券",
            },
            {
              title: "精美旅行纪念品",
              points: 500,
              image: "/placeholder.svg?height=80&width=160&text=旅行纪念品",
            },
            {
              title: "高级会员月卡",
              points: 1000,
              image: "/placeholder.svg?height=80&width=160&text=会员月卡",
            },
          ].map((reward, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                if (points >= reward.points) {
                  navigate("payment", {
                    items: [
                      {
                        id: `reward-${index}`,
                        name: reward.title,
                        price: 0,
                        quantity: 1,
                        image: reward.image,
                      },
                    ],
                    totalAmount: 0,
                    orderType: "other",
                    pointsUsed: reward.points,
                  })
                }
              }}
            >
              <div className="h-24">
                <img
                  src={reward.image || "/placeholder.svg"}
                  alt={reward.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-3">
                <h4 className="font-medium text-sm">{reward.title}</h4>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="outline" className="flex items-center">
                    <Award size={12} className="mr-1" />
                    {reward.points}积分
                  </Badge>
                  <Button
                    size="sm"
                    disabled={points < reward.points}
                    onClick={(e) => {
                      e.stopPropagation() // 防止触发卡片的点击事件
                      if (points >= reward.points) {
                        navigate("payment", {
                          items: [
                            {
                              id: `reward-${index}`,
                              name: reward.title,
                              price: 0,
                              quantity: 1,
                              image: reward.image,
                            },
                          ],
                          totalAmount: 0,
                          orderType: "other",
                          pointsUsed: reward.points,
                        })
                      }
                    }}
                  >
                    兑换
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium flex items-center mb-4">
          <TrendingUp size={18} className="mr-2 text-blue-500" />
          积分获取途径
        </h3>

        <div className="space-y-2">
          {[
            { title: "每日签到", points: "+10积分/天" },
            { title: "连续签到7天", points: "+30积分" },
            { title: "完成行程", points: "+50积分/次" },
            { title: "邀请好友", points: "+100积分/人" },
            { title: "评价导游", points: "+20积分/次" },
            { title: "分享路线", points: "+30积分/次" },
          ].map((item, index) => (
            <Card key={index}>
              <CardContent className="p-3 flex justify-between items-center">
                <span>{item.title}</span>
                <Badge className="bg-blue-500">{item.points}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

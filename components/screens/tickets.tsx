"use client"

import { ArrowLeft, Search, Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Screen } from "@/components/mobile-app"

interface TicketsProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function Tickets({ goBack, navigate }: TicketsProps) {
  const tickets = [
    {
      id: "ticket1",
      name: "西湖景区联票",
      image: "/placeholder.svg?height=120&width=320&text=西湖景区联票",
      originalPrice: 120,
      discountPrice: 98,
      discount: "8.2折",
      validPeriod: "30天有效",
      description: "包含西湖十景中的6个景点，可任选游览",
      tags: ["热门", "自然风光"],
    },
    {
      id: "ticket2",
      name: "城市博物馆",
      image: "/placeholder.svg?height=120&width=320&text=城市博物馆",
      originalPrice: 60,
      discountPrice: 45,
      discount: "7.5折",
      validPeriod: "当日有效",
      description: "了解城市历史文化，参观珍贵文物展览",
      tags: ["文化", "室内"],
    },
    {
      id: "ticket3",
      name: "欢乐水世界",
      image: "/placeholder.svg?height=120&width=320&text=欢乐水世界",
      originalPrice: 180,
      discountPrice: 138,
      discount: "7.7折",
      validPeriod: "指定日期",
      description: "城市最大水上乐园，适合亲子游玩",
      tags: ["亲子", "娱乐"],
    },
    {
      id: "ticket4",
      name: "古镇一日游",
      image: "/placeholder.svg?height=120&width=320&text=古镇一日游",
      originalPrice: 150,
      discountPrice: 128,
      discount: "8.5折",
      validPeriod: "预约日期",
      description: "体验传统水乡风情，品尝地道小吃",
      tags: ["文化", "美食"],
    },
  ]

  // 修改handleBuyTicket函数，确保支付页面正确嵌入
  const handleBuyTicket = (ticket: any) => {
    navigate("payment", {
      items: [
        {
          id: ticket.id,
          name: ticket.name,
          price: ticket.discountPrice,
          quantity: 1,
          image: ticket.image,
        },
      ],
      totalAmount: ticket.discountPrice,
      orderType: "ticket",
    })
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">特惠门票</h1>
        <Button variant="outline" size="icon" className="ml-auto">
          <Filter size={18} />
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="搜索景点门票"
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="overflow-hidden">
            <div className="relative h-32">
              <img src={ticket.image || "/placeholder.svg"} alt={ticket.name} className="w-full h-full object-cover" />
              <Badge className="absolute top-2 right-2 bg-red-500">{ticket.discount}</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{ticket.name}</h3>

              <div className="flex items-center mt-1">
                <span className="text-red-500 font-bold text-lg">¥{ticket.discountPrice}</span>
                <span className="text-gray-400 line-through text-sm ml-2">¥{ticket.originalPrice}</span>
              </div>

              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Calendar size={14} className="mr-1" />
                <span className="mr-3">{ticket.validPeriod}</span>
              </div>

              <p className="text-sm text-gray-600 mt-2">{ticket.description}</p>

              <div className="flex flex-wrap gap-1 mt-3">
                {ticket.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button className="w-full mt-3" onClick={() => handleBuyTicket(ticket)}>
                立即购买
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

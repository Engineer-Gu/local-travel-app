"use client"

import { ArrowLeft, Search, Calendar, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ItinerariesProps {
  goBack: () => void
}

export function Itineraries({ goBack }: ItinerariesProps) {
  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">我的行程</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="搜索行程"
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <Calendar className="mr-2 text-blue-500" size={18} />
            即将开始
          </h2>

          <div className="space-y-4">
            {[
              {
                title: "西湖文化半日游",
                date: "2023-12-15",
                time: "09:00-13:00",
                location: "西湖景区",
                companions: 2,
                status: "已确认",
              },
            ].map((item, index) => (
              <Card key={index} className="border-l-4 border-blue-500">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{item.title}</h3>

                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <Calendar size={14} className="mr-1" />
                    <span className="mr-3">{item.date}</span>
                    <Clock size={14} className="mr-1" />
                    <span>{item.time}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <MapPin size={14} className="mr-1" />
                    <span>{item.location}</span>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <Badge variant="outline">{item.companions}人同行</Badge>
                    <Badge className="bg-green-500">{item.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <Calendar className="mr-2 text-gray-500" size={18} />
            历史行程
          </h2>

          <div className="space-y-4">
            {[
              {
                title: "城市中心一日游",
                date: "2023-11-20",
                time: "09:00-17:00",
                location: "市中心",
                companions: 3,
                status: "已完成",
              },
              {
                title: "文艺小资半日游",
                date: "2023-10-05",
                time: "13:00-17:00",
                location: "艺术区",
                companions: 1,
                status: "已完成",
              },
            ].map((item, index) => (
              <Card key={index} className="border-l-4 border-gray-300">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{item.title}</h3>

                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <Calendar size={14} className="mr-1" />
                    <span className="mr-3">{item.date}</span>
                    <Clock size={14} className="mr-1" />
                    <span>{item.time}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <MapPin size={14} className="mr-1" />
                    <span>{item.location}</span>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <Badge variant="outline">{item.companions}人同行</Badge>
                    <Badge variant="outline">{item.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

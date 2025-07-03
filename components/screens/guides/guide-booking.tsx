"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Guide {
  id: string
  name: string
  avatar: string
  price: string
}

interface GuideBookingProps {
  guide: Guide
  goBack: () => void
}

export function GuideBooking({ guide, goBack }: GuideBookingProps) {
  const [step, setStep] = useState(1)
  const [bookingComplete, setBookingComplete] = useState(false)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setBookingComplete(true)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      goBack()
    }
  }

  if (!guide) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full">
        <p>导游不存在</p>
        <Button onClick={goBack} className="mt-4">
          返回
        </Button>
      </div>
    )
  }

  if (bookingComplete) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check size={32} className="text-green-500" />
        </div>
        <h2 className="text-xl font-bold mb-2">预约成功</h2>
        <p className="text-center text-gray-600 mb-6">
          您已成功预约{guide.name}的导游服务，导游将会在出行前与您联系确认详情。
        </p>
        <Button onClick={goBack}>返回</Button>
      </div>
    )
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={handleBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">预约导游</h1>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage src={guide.avatar || "/placeholder.svg"} alt={guide.name} />
            <AvatarFallback>{guide.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h3 className="font-semibold">{guide.name}</h3>
            <div className="text-sm text-gray-600">{guide.price}</div>
          </div>
        </div>
        <Badge>金牌导游</Badge>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex flex-col items-center ${
                i < step ? "text-blue-500" : i === step ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  i < step
                    ? "bg-blue-500 text-white"
                    : i === step
                      ? "bg-blue-100 text-blue-600 border-2 border-blue-500"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {i < step ? <Check size={16} /> : i}
              </div>
              <span className="text-xs">{i === 1 ? "选择时间" : i === 2 ? "填写信息" : "支付确认"}</span>
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">选择日期</h3>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 14 }, (_, i) => {
                  const date = new Date()
                  date.setDate(date.getDate() + i)
                  return (
                    <Button
                      key={i}
                      variant={i === 2 ? "default" : "outline"}
                      className={`h-16 flex flex-col p-1 ${i === 2 ? "bg-blue-500" : ""}`}
                    >
                      <span className="text-xs">{date.getDate()}</span>
                      <span className="text-xs">{["日", "一", "二", "三", "四", "五", "六"][date.getDay()]}</span>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">选择时间段</h3>
              <div className="grid grid-cols-2 gap-2">
                {["上午 9:00-12:00", "下午 13:00-16:00", "全天 9:00-17:00", "自定义"].map((time, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    className={index === 0 ? "bg-blue-500" : ""}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" onClick={handleNext}>
            下一步
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">联系人姓名</label>
                <Input placeholder="请输入姓名" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
                <Input placeholder="请输入手机号码" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">游玩人数</label>
                <Input type="number" placeholder="请输入人数" defaultValue="2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">集合地点</label>
                <div className="flex">
                  <Input placeholder="请输入集合地点" className="flex-1" />
                  <Button variant="outline" className="ml-2">
                    <MapPin size={16} className="mr-1" />
                    定位
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">特殊需求</label>
                <Textarea placeholder="请输入特殊需求或备注信息" />
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1" onClick={handleBack}>
              上一步
            </Button>
            <Button className="flex-1" onClick={handleNext}>
              下一步
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">订单信息</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">导游</span>
                  <span>{guide.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">日期</span>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1 text-blue-500" />
                    <span>2023-12-15</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">时间</span>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1 text-blue-500" />
                    <span>上午 9:00-12:00</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">人数</span>
                  <span>2人</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">集合地点</span>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1 text-blue-500" />
                    <span>西湖景区入口</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">费用明细</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">导游服务费</span>
                  <span>¥300</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">服务时长</span>
                  <span>3小时</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">会员折扣</span>
                  <span className="text-red-500">-¥30</span>
                </div>
                <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between font-medium">
                  <span>总计</span>
                  <span className="text-lg text-blue-600">¥270</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">支付方式</h3>
              <RadioGroup defaultValue="wallet">
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet" className="flex items-center">
                    <CreditCard size={16} className="mr-2 text-blue-500" />
                    钱包余额 (¥358.50)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="wechat" id="wechat" />
                  <Label htmlFor="wechat">微信支付</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="alipay" id="alipay" />
                  <Label htmlFor="alipay">支付宝</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1" onClick={handleBack}>
              上一步
            </Button>
            <Button className="flex-1" onClick={handleNext}>
              确认支付
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

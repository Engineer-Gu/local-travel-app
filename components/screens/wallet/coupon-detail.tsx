"use client"

import { ArrowLeft, Calendar, Info, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { QRCodeSVG } from "qrcode.react"

interface CouponDetailProps {
  goBack: () => void
  params?: {
    coupon: {
      id: string
      title: string
      discount: string
      expiry: string
      status: string
      color: string
    }
  }
}

export function CouponDetail({ goBack, params }: CouponDetailProps) {
  const coupon = params?.coupon || {
    id: "c1",
    title: "景点门票优惠券",
    discount: "满200减30",
    expiry: "2023-12-31",
    status: "未使用",
    color: "bg-blue-500",
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">优惠券详情</h1>
      </div>

      <Card className="mb-6 overflow-hidden">
        <div className={coupon.color.replace("bg-", "bg-opacity-20 ") + " " + coupon.color.replace("bg-", "text-")}>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-1">{coupon.title}</h2>
            <p className="text-3xl font-bold mb-4">{coupon.discount}</p>

            <div className="flex items-center text-sm mb-1">
              <Calendar size={16} className="mr-2" />
              <span>有效期至: {coupon.expiry}</span>
            </div>

            <div className="flex items-center text-sm">
              <Info size={16} className="mr-2" />
              <span>状态: {coupon.status}</span>
            </div>
          </CardContent>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white rounded-lg">
              <QRCodeSVG value={`COUPON:${coupon.id}`} size={180} />
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mb-4">向商家出示此二维码以使用优惠券</p>

          <Button className="w-full">立即使用</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">使用规则</h3>
          <Separator className="mb-3" />
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <CheckCircle2 size={16} className="mr-2 text-green-500 mt-0.5" />
              <span>仅适用于指定景点门票购买</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 size={16} className="mr-2 text-green-500 mt-0.5" />
              <span>单笔订单满200元可使用</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 size={16} className="mr-2 text-green-500 mt-0.5" />
              <span>每个订单限用一张优惠券</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 size={16} className="mr-2 text-green-500 mt-0.5" />
              <span>不可与其他优惠活动同时使用</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 size={16} className="mr-2 text-green-500 mt-0.5" />
              <span>过期后自动失效，请在有效期内使用</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

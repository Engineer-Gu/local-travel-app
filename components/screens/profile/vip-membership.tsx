"use client"

import { useState } from "react"
import { ArrowLeft, Check, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface VipMembershipProps {
  goBack: () => void
}

export function VipMembership({ goBack }: VipMembershipProps) {
  const [selectedPlan, setSelectedPlan] = useState("monthly")
  const [paymentMethod, setPaymentMethod] = useState("wallet")

  const plans = [
    {
      id: "monthly",
      name: "月卡",
      price: 28,
      originalPrice: 38,
      benefits: ["每月5次免费路线规划", "8折景点门票", "9折导游服务", "优先匹配玩伴"],
    },
    {
      id: "quarterly",
      name: "季卡",
      price: 68,
      originalPrice: 98,
      benefits: ["每月10次免费路线规划", "7折景点门票", "8折导游服务", "优先匹配玩伴", "专属客服"],
    },
    {
      id: "yearly",
      name: "年卡",
      price: 198,
      originalPrice: 298,
      benefits: [
        "无限次免费路线规划",
        "6折景点门票",
        "7折导游服务",
        "优先匹配玩伴",
        "专属客服",
        "生日特权",
        "专属头像框",
      ],
    },
  ]

  const handlePurchase = () => {
    // 处理购买逻辑
    goBack()
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">会员特权</h1>
      </div>

      <Card className="mb-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-3">会员特权</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <Check size={16} className="mr-2" />
              <span>专属折扣优惠</span>
            </div>
            <div className="flex items-center">
              <Check size={16} className="mr-2" />
              <span>无限次路线规划</span>
            </div>
            <div className="flex items-center">
              <Check size={16} className="mr-2" />
              <span>优先匹配玩伴</span>
            </div>
            <div className="flex items-center">
              <Check size={16} className="mr-2" />
              <span>专属客服服务</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">选择会员套餐</h2>
        <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
          <div className="space-y-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`cursor-pointer ${
                  selectedPlan === plan.id ? "border-2 border-blue-500" : "border border-gray-200"
                }`}
              >
                <CardContent className="p-4">
                  <RadioGroupItem value={plan.id} id={plan.id} className="hidden" />
                  <Label htmlFor={plan.id} className="cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{plan.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-xl font-bold text-blue-600">¥{plan.price}</span>
                          <span className="text-gray-400 line-through text-sm ml-2">¥{plan.originalPrice}</span>
                          <Badge className="ml-2 bg-red-500">
                            {Math.round((plan.price / plan.originalPrice) * 10)}折
                          </Badge>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border ${
                          selectedPlan === plan.id
                            ? "border-blue-500 bg-blue-500 flex items-center justify-center"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedPlan === plan.id && <Check size={12} className="text-white" />}
                      </div>
                    </div>

                    <div className="mt-3 space-y-1">
                      {plan.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <Check size={14} className="mr-2 text-green-500" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </Label>
                </CardContent>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">支付方式</h2>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <div className="space-y-3">
            <Card className={paymentMethod === "wallet" ? "border-2 border-blue-500" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <RadioGroupItem value="wallet" id="wallet" className="mr-3" />
                    <Label htmlFor="wallet" className="flex items-center cursor-pointer">
                      <CreditCard size={18} className="mr-2 text-blue-500" />
                      钱包余额 (¥358.50)
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={paymentMethod === "wechat" ? "border-2 border-blue-500" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <RadioGroupItem value="wechat" id="wechat" className="mr-3" />
                    <Label htmlFor="wechat" className="flex items-center cursor-pointer">
                      <img
                        src="/placeholder.svg?height=18&width=18&text=微信"
                        alt="微信支付"
                        className="w-[18px] h-[18px] mr-2"
                      />
                      微信支付
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={paymentMethod === "alipay" ? "border-2 border-blue-500" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <RadioGroupItem value="alipay" id="alipay" className="mr-3" />
                    <Label htmlFor="alipay" className="flex items-center cursor-pointer">
                      <img
                        src="/placeholder.svg?height=18&width=18&text=支付宝"
                        alt="支付宝"
                        className="w-[18px] h-[18px] mr-2"
                      />
                      支付宝
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-gray-500">应付金额</div>
          <div className="text-xl font-bold text-blue-600">
            ¥{plans.find((plan) => plan.id === selectedPlan)?.price || 0}
          </div>
        </div>
        <Button onClick={handlePurchase}>立即开通</Button>
      </div>

      <div className="text-xs text-gray-500">开通即视为同意《会员服务协议》，会员到期后将自动续费，可随时取消。</div>
    </div>
  )
}

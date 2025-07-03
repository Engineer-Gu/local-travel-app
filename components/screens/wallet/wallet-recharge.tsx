"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Check, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface WalletRechargeProps {
  goBack: () => void
}

export function WalletRecharge({ goBack }: WalletRechargeProps) {
  const [amount, setAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("wechat")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const presetAmounts = ["50", "100", "200", "500", "1000"]

  const handleAmountSelect = (value: string) => {
    setAmount(value)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setCustomAmount(value)
      setAmount(value)
    }
  }

  const handleRecharge = () => {
    if (!amount) return

    setIsProcessing(true)
    // 模拟充值过程
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      // 模拟充值成功后返回
      setTimeout(() => {
        goBack()
      }, 1500)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="p-4 h-full flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check size={40} className="text-green-500" />
        </div>
        <h2 className="text-xl font-bold mb-2">充值成功</h2>
        <p className="text-center text-gray-600 mb-8">您已成功充值 ¥{amount}</p>
        <Button onClick={goBack}>返回钱包</Button>
      </div>
    )
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">钱包充值</h1>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">选择充值金额</h2>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {presetAmounts.map((preset) => (
            <Button
              key={preset}
              variant={amount === preset ? "default" : "outline"}
              className={amount === preset ? "bg-blue-500" : ""}
              onClick={() => handleAmountSelect(preset)}
            >
              ¥{preset}
            </Button>
          ))}
          <Button
            variant={amount && !presetAmounts.includes(amount) ? "default" : "outline"}
            className={amount && !presetAmounts.includes(amount) ? "bg-blue-500" : ""}
            onClick={() => setCustomAmount(amount || "0")}
          >
            自定义
          </Button>
        </div>

        {(customAmount || !presetAmounts.includes(amount)) && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">自定义金额</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
              <Input
                type="text"
                className="pl-8"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="请输入充值金额"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">支付方式</h2>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <div className="space-y-3">
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

            <Card className={paymentMethod === "card" ? "border-2 border-blue-500" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <RadioGroupItem value="card" id="card" className="mr-3" />
                    <Label htmlFor="card" className="flex items-center cursor-pointer">
                      <CreditCard size={18} className="mr-2 text-blue-500" />
                      银行卡支付
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
          <div className="text-sm text-gray-500">充值金额</div>
          <div className="text-xl font-bold text-blue-600">¥{amount || 0}</div>
        </div>
        <Button onClick={handleRecharge} disabled={!amount || isProcessing}>
          {isProcessing ? "处理中..." : "确认充值"}
        </Button>
      </div>

      <div className="text-xs text-gray-500">
        充值金额将实时到账，可用于支付导游服务、门票预订等。如有问题，请联系客服。
      </div>
    </div>
  )
}

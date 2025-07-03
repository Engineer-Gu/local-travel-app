"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Check, CreditCard, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WalletWithdrawProps {
  goBack: () => void
}

export function WalletWithdraw({ goBack }: WalletWithdrawProps) {
  const [amount, setAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("bank")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const walletBalance = 358.5

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d{0,2}$/.test(value) && Number.parseFloat(value || "0") <= walletBalance) {
      setAmount(value)
    }
  }

  const handleWithdraw = () => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    setIsProcessing(true)
    // 模拟提现过程
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      // 模拟提现成功后返回
      setTimeout(() => {
        goBack()
      }, 1500)
    }, 2000)
  }

  const handleAllAmount = () => {
    setAmount(walletBalance.toString())
  }

  if (isSuccess) {
    return (
      <div className="p-4 h-full flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check size={40} className="text-green-500" />
        </div>
        <h2 className="text-xl font-bold mb-2">提现申请已提交</h2>
        <p className="text-center text-gray-600 mb-8">您已成功申请提现 ¥{amount}，预计1-3个工作日到账，请注意查收</p>
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
        <h1 className="text-xl font-bold">钱包提现</h1>
      </div>

      <Alert className="mb-4 bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-sm text-blue-700">
          当前可提现余额: ¥{walletBalance.toFixed(2)}
        </AlertDescription>
      </Alert>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">提现金额</h2>
        <div className="relative mb-2">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
          <Input
            type="text"
            className="pl-8 text-lg"
            value={amount}
            onChange={handleAmountChange}
            placeholder="请输入提现金额"
          />
          <Button
            variant="link"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0 h-auto"
            onClick={handleAllAmount}
          >
            全部提现
          </Button>
        </div>
        <p className="text-xs text-gray-500">单笔提现金额不得低于¥10.00</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">提现方式</h2>
        <RadioGroup value={withdrawMethod} onValueChange={setWithdrawMethod}>
          <div className="space-y-3">
            <Card className={withdrawMethod === "bank" ? "border-2 border-blue-500" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <RadioGroupItem value="bank" id="bank" className="mr-3" />
                    <Label htmlFor="bank" className="flex items-center cursor-pointer">
                      <CreditCard size={18} className="mr-2 text-blue-500" />
                      <div>
                        <div>银行卡</div>
                        <div className="text-xs text-gray-500">工商银行(1234)</div>
                      </div>
                    </Label>
                  </div>
                  <Button variant="outline" size="sm">
                    更换
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className={withdrawMethod === "wechat" ? "border-2 border-blue-500" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <RadioGroupItem value="wechat" id="wechat" className="mr-3" />
                    <Label htmlFor="wechat" className="flex items-center cursor-pointer">
                      <img
                        src="/placeholder.svg?height=18&width=18&text=微信"
                        alt="微信"
                        className="w-[18px] h-[18px] mr-2"
                      />
                      <div>
                        <div>微信</div>
                        <div className="text-xs text-gray-500">微信账号已绑定</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={withdrawMethod === "alipay" ? "border-2 border-blue-500" : ""}>
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
                      <div>
                        <div>支付宝</div>
                        <div className="text-xs text-gray-500">支付宝账号已绑定</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </RadioGroup>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>提现金额</span>
          <span>¥{amount || "0.00"}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>手续费</span>
          <span>¥0.00</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>实际到账</span>
          <span className="text-blue-600">¥{amount || "0.00"}</span>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={handleWithdraw}
        disabled={!amount || Number.parseFloat(amount) < 10 || isProcessing}
      >
        {isProcessing ? "处理中..." : "确认提现"}
      </Button>

      <div className="mt-4 text-xs text-gray-500">
        提现申请提交后，将在1-3个工作日内处理完成。如有问题，请联系客服。
      </div>
    </div>
  )
}

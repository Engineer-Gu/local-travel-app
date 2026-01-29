"use client"

import { useState } from "react"
import { ArrowLeft, CreditCard, Check, Shield, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
// import { ShopService, Coupon, Address } from "@/lib/services/shop-service"

interface PaymentItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface PaymentProps {
  goBack: () => void
  items: PaymentItem[]
  totalAmount: number
  orderType: "product" | "ticket" | "guide" | "other"
  orderId?: string
}

function formatCountdown(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const formattedMinutes = String(minutes).padStart(2, "0")
  const formattedSeconds = String(remainingSeconds).padStart(2, "0")
  return `${formattedMinutes}:${formattedSeconds}`
}

export function PaymentPage({ goBack, items, totalAmount, orderType, orderId }: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState("wallet")
  const [couponSelected, setCouponSelected] = useState(false)
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "success" | "failed">("pending")
  const [countdown, setCountdown] = useState(900) // 15分钟支付倒计时
  // const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([])
  // const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)
  // const [addresses, setAddresses] = useState<Address[]>([])
  // const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  // const [paymentMethods, setPaymentMethods] = useState<{id: string, name: string, icon: string}[]>([])
  // const [loading, setLoading] = useState(false)

  // 倒计时
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCountdown((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(timer)
  //         // 订单超时处理
  //         return 0
  //       }
  //       return prev - 1
  //     })
  //   }, 1000)
  //
  //   return () => clearInterval(timer)
  // }, [])

  // 获取可用优惠券
  // useEffect(() => {
  //   const fetchCoupons = async () => {
  //     try {
  //       setLoading(true)
  //       const response = await ShopService.getAvailableCoupons({
  //         totalAmount,
  //         productIds: items.map(item => item.id)
  //       })
  //       setAvailableCoupons(response)
  //     } catch (error) {
  //       console.error("Failed to fetch coupons:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //
  //   fetchCoupons()
  // }, [totalAmount, items])

  // 获取地址列表
  // useEffect(() => {
  //   const fetchAddresses = async () => {
  //     try {
  //       setLoading(true)
  //       const response = await ShopService.getAddresses()
  //       setAddresses(response)
  //
  //       // 设置默认地址
  //       const defaultAddress = response.find(addr => addr.isDefault)
  //       if (defaultAddress) {
  //         setSelectedAddress(defaultAddress)
  //       } else if (response.length > 0) {
  //         setSelectedAddress(response[0])
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch addresses:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //
  //   fetchAddresses()
  // }, [])

  // 获取支付方式
  // useEffect(() => {
  //   const fetchPaymentMethods = async () => {
  //     try {
  //       setLoading(true)
  //       const response = await ShopService.getPaymentMethods()
  //       setPaymentMethods(response)
  //
  //       // 设置默认支付方式
  //       if (response.length > 0) {
  //         setPaymentMethod(response[0].id)
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch payment methods:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //
  //   fetchPaymentMethods()
  // }, [])

  // 应用优惠券
  // const applyCoupon = (coupon: Coupon) => {
  //   setSelectedCoupon(coupon)
  //   setCouponSelected(true)
  // }

  // 使用优惠码
  // const handleApplyCouponCode = async () => {
  //   if (!couponCode) return
  //
  //   try {
  //     setLoading(true)
  //     await ShopService.claimCouponByCode(couponCode)
  //
  //     // 重新获取可用优惠券
  //     const response = await ShopService.getAvailableCoupons({
  //       totalAmount,
  //       productIds: items.map(item => item.id)
  //     })
  //     setAvailableCoupons(response)
  //
  //     // 清空输入框
  //     setCouponCode("")
  //     setShowCouponInput(false)
  //   } catch (error) {
  //     console.error("Failed to apply coupon code:", error)
  //     alert("优惠码无效")
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // 修改支付页面的返回逻辑，确保正确嵌入
  const handlePay = () => {
    setPaymentStatus("processing")

    // 调用支付API
    // try {
    //   await ShopService.payOrder(orderId!, paymentMethod)
    //
    //   // 轮询支付状态
    //   const checkPaymentStatus = async () => {
    //     try {
    //       const response = await ShopService.getPaymentStatus(orderId!)
    //       if (response.status === "paid") {
    //         setPaymentStatus("success")
    //       } else if (response.status === "failed") {
    //         setPaymentStatus("failed")
    //       } else {
    //         // 继续轮询
    //         setTimeout(checkPaymentStatus, 1000)
    //       }
    //     } catch (error) {
    //       console.error("Failed to check payment status:", error)
    //       setPaymentStatus("failed")
    //     }
    //   }
    //
    //   checkPaymentStatus()
    // } catch (error) {
    //   console.error("Failed to process payment:", error)
    //   setPaymentStatus("failed")
    // }

    // 模拟支付过程
    setTimeout(() => {
      setPaymentStatus("success")
    }, 2000)
  }

  if (paymentStatus === "success") {
    return (
      <div className="p-4 h-full flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check size={40} className="text-green-500" />
        </div>
        <h2 className="text-xl font-bold mb-2">支付成功</h2>
        <p className="text-center text-gray-600 mb-8">
          您已成功支付 ¥{totalAmount.toFixed(2)}
          {orderType === "product" && "，商家将尽快为您发货"}
          {orderType === "ticket" && "，请在订单中查看电子票"}
          {orderType === "guide" && "，导游将与您联系确认行程"}
        </p>
        <div className="space-y-3 w-full">
          <Button className="w-full" onClick={goBack}>
            完成
          </Button>
          <Button variant="outline" className="w-full">
            查看订单
          </Button>
        </div>
      </div>
    )
  }

  if (paymentStatus === "processing") {
    return (
      <div className="p-4 h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-bold mb-2">处理中</h2>
        <p className="text-center text-gray-600">正在处理您的支付请求，请稍候...</p>
      </div>
    )
  }

  if (paymentStatus === "failed") {
    return (
      <div className="p-4 h-full flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <AlertCircle size={40} className="text-red-500" />
        </div>
        <h2 className="text-xl font-bold mb-2">支付失败</h2>
        <p className="text-center text-gray-600 mb-8">支付过程中出现错误，请稍后重试或选择其他支付方式</p>
        <div className="space-y-3 w-full">
          <Button className="w-full" onClick={() => setPaymentStatus("pending")}>
            重新支付
          </Button>
          <Button variant="outline" className="w-full" onClick={goBack}>
            返回
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">确认支付</h1>
      </div>

      <Alert className="mb-4 bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-sm text-blue-700">
          请在 {formatCountdown(countdown)} 内完成支付，超时订单将自动取消
        </AlertDescription>
      </Alert>

      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="font-medium mb-3">订单信息</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center">
                {item.image && (
                  <div className="w-12 h-12 rounded overflow-hidden mr-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.name}</h4>
                    <span>
                      ¥{item.price.toFixed(2)} × {item.quantity}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {orderType === "product" && "商品"}
                    {orderType === "ticket" && "门票"}
                    {orderType === "guide" && "导游服务"}
                    {orderType === "other" && "服务"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="font-medium mb-3">优惠信息</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Badge className="bg-red-500 mr-2">优惠券</Badge>
                <span>{couponSelected ? "满100减10" : "暂无可用"}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-500"
                onClick={() => setShowCouponInput(!showCouponInput)}
              >
                {showCouponInput ? "收起" : "使用优惠券"}
              </Button>
            </div>

            {showCouponInput && (
              <div className="flex space-x-2 mt-2">
                <Input
                  placeholder="请输入优惠码"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">使用</Button>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span>会员折扣</span>
              <span className="text-red-500">-¥{(totalAmount * 0.05).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="font-medium mb-3">支付方式</h3>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="wallet" id="wallet" />
              <Label htmlFor="wallet" className="flex items-center">
                <CreditCard size={16} className="mr-2 text-blue-500" />
                钱包余额 (¥358.50)
              </Label>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="wechat" id="wechat" />
              <Label htmlFor="wechat" className="flex items-center">
                <img src="/images/icon_wechat.svg" alt="微信支付" className="w-4 h-4 mr-2" />
                微信支付
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="alipay" id="alipay" />
              <Label htmlFor="alipay" className="flex items-center">
                <img src="/images/icon_alipay.svg" alt="支付宝" className="w-4 h-4 mr-2" />
                支付宝
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <Shield size={16} className="text-green-500 mr-1" />
              <span className="text-xs text-gray-500">支付安全保障</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">实付款</div>
              <div className="text-xl font-bold text-red-500">
                ¥{(totalAmount - (couponSelected ? 10 : 0) - totalAmount * 0.05).toFixed(2)}
              </div>
            </div>
          </div>
          <Button className="w-full" onClick={handlePay}>
            确认支付
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

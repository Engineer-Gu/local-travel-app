"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Truck, Star, RotateCcw, Search, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { Screen } from "@/components/mobile-app"

interface OrdersProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

// 模拟订单数据
const initialOrders = {
  pending: [
    {
      id: "ORD20231201001",
      date: "2023-12-01 14:30",
      items: [
        {
          name: "西湖龙井茶叶礼盒",
          price: 128,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80&text=西湖龙井茶叶礼盒",
        },
      ],
      total: 128,
      status: "待付款",
      countdown: "23:45:30", // 倒计时
      countdownSeconds: 85530, // 23小时45分30秒的秒数
    },
  ],
  processing: [
    {
      id: "ORD20231130002",
      date: "2023-11-30 10:15",
      items: [
        {
          name: "手工丝绸扇子",
          price: 68,
          quantity: 2,
          image: "/placeholder.svg?height=80&width=80&text=手工丝绸扇子",
        },
      ],
      total: 136,
      status: "待发货",
    },
  ],
  shipping: [
    {
      id: "ORD20231125003",
      date: "2023-11-25 16:20",
      items: [
        {
          name: "景区特色纪念T恤",
          price: 99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80&text=景区特色纪念T恤",
        },
        {
          name: "手工编织草帽",
          price: 45,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80&text=手工编织草帽",
        },
      ],
      total: 144,
      status: "待收货",
      trackingNumber: "SF1234567890",
      estimatedDelivery: "预计12月3日送达",
    },
  ],
  completed: [
    {
      id: "ORD20231115004",
      date: "2023-11-15 09:45",
      items: [
        {
          name: "当地特色茶具套装",
          price: 198,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80&text=当地特色茶具套装",
        },
      ],
      total: 198,
      status: "待评价",
    },
  ],
  refund: [
    {
      id: "ORD20231110005",
      date: "2023-11-10 11:30",
      items: [
        {
          name: "景区特色香囊",
          price: 35,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80&text=景区特色香囊",
        },
      ],
      total: 35,
      status: "退款处理中",
      refundReason: "商品质量问题",
    },
  ],
}

// 格式化倒计时
function formatCountdown(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
}

export function Orders({ goBack, navigate }: OrdersProps) {
  const [orders, setOrders] = useState(initialOrders)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // 对话框状态
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [refundDialogOpen, setRefundDialogOpen] = useState(false)
  const [logisticsDialogOpen, setLogisticsDialogOpen] = useState(false)
  const [confirmReceiptDialogOpen, setConfirmReceiptDialogOpen] = useState(false)
  const [afterSaleDialogOpen, setAfterSaleDialogOpen] = useState(false)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [customerServiceDialogOpen, setCustomerServiceDialogOpen] = useState(false)
  const [cancelRefundDialogOpen, setCancelRefundDialogOpen] = useState(false)

  // 当前操作的订单
  const [currentOrder, setCurrentOrder] = useState<any>(null)

  // 退款表单数据
  const [refundReason, setRefundReason] = useState("quality")
  const [refundDescription, setRefundDescription] = useState("")

  // 评价表单数据
  const [rating, setRating] = useState(5)
  const [reviewContent, setReviewContent] = useState("")

  // 更新倒计时
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((prevOrders) => {
        const newOrders = { ...prevOrders }

        // 更新待付款订单的倒计时
        newOrders.pending = prevOrders.pending.map((order) => {
          if (order.countdownSeconds > 0) {
            const newCountdownSeconds = order.countdownSeconds - 1
            return {
              ...order,
              countdownSeconds: newCountdownSeconds,
              countdown: formatCountdown(newCountdownSeconds),
            }
          }
          return order
        })

        return newOrders
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 处理取消订单
  const handleCancelOrder = () => {
    if (!currentOrder) return

    setOrders((prevOrders) => {
      const newOrders = { ...prevOrders }
      newOrders.pending = prevOrders.pending.filter((order) => order.id !== currentOrder.id)
      return newOrders
    })

    setCancelDialogOpen(false)
    setCurrentOrder(null)
  }

  // 处理申请退款
  const handleRefundSubmit = () => {
    if (!currentOrder) return

    setOrders((prevOrders) => {
      const newOrders = { ...prevOrders }

      // 从待发货移除
      newOrders.processing = prevOrders.processing.filter((order) => order.id !== currentOrder.id)

      // 添加到退款/售后
      newOrders.refund = [
        ...prevOrders.refund,
        {
          ...currentOrder,
          status: "退款处理中",
          refundReason:
            refundReason === "other"
              ? refundDescription
              : refundReason === "quality"
                ? "商品质量问题"
                : refundReason === "wrong"
                  ? "收到错误商品"
                  : "不想要了",
        },
      ]

      return newOrders
    })

    setRefundDialogOpen(false)
    setCurrentOrder(null)
    setRefundReason("quality")
    setRefundDescription("")
  }

  // 处理确认收货
  const handleConfirmReceipt = () => {
    if (!currentOrder) return

    setOrders((prevOrders) => {
      const newOrders = { ...prevOrders }

      // 从待收货移除
      newOrders.shipping = prevOrders.shipping.filter((order) => order.id !== currentOrder.id)

      // 添加到待评价
      newOrders.completed = [
        ...prevOrders.completed,
        {
          ...currentOrder,
          status: "待评价",
        },
      ]

      return newOrders
    })

    setConfirmReceiptDialogOpen(false)
    setCurrentOrder(null)
  }

  // 处理提交评价
  const handleSubmitReview = () => {
    if (!currentOrder) return

    setOrders((prevOrders) => {
      const newOrders = { ...prevOrders }

      // 从待评价移除
      newOrders.completed = prevOrders.completed.filter((order) => order.id !== currentOrder.id)

      return newOrders
    })

    setReviewDialogOpen(false)
    setCurrentOrder(null)
    setRating(5)
    setReviewContent("")
  }

  // 处理取消退款申请
  const handleCancelRefund = () => {
    if (!currentOrder) return

    setOrders((prevOrders) => {
      const newOrders = { ...prevOrders }

      // 从退款/售后移除
      newOrders.refund = prevOrders.refund.filter((order) => order.id !== currentOrder.id)

      // 添加回待发货
      newOrders.processing = [
        ...prevOrders.processing,
        {
          ...currentOrder,
          status: "待发货",
          refundReason: undefined,
        },
      ]

      return newOrders
    })

    setCancelRefundDialogOpen(false)
    setCurrentOrder(null)
  }

  // 过滤订单
  const filteredOrders = () => {
    const allOrders = [
      ...orders.pending,
      ...orders.processing,
      ...orders.shipping,
      ...orders.completed,
      ...orders.refund,
    ]

    if (!searchQuery) return allOrders

    return allOrders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((item: any) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">我的订单</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="搜索订单"
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="pending">待付款</TabsTrigger>
          <TabsTrigger value="processing">待发货</TabsTrigger>
          <TabsTrigger value="shipping">待收货</TabsTrigger>
          <TabsTrigger value="completed">待评价</TabsTrigger>
          <TabsTrigger value="refund">退款/售后</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredOrders().map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              navigate={navigate}
              onCancelOrder={() => {
                setCurrentOrder(order)
                setCancelDialogOpen(true)
              }}
              onContactService={() => {
                setCurrentOrder(order)
                setCustomerServiceDialogOpen(true)
              }}
              onApplyRefund={() => {
                setCurrentOrder(order)
                setRefundDialogOpen(true)
              }}
              onViewLogistics={() => {
                setCurrentOrder(order)
                setLogisticsDialogOpen(true)
              }}
              onConfirmReceipt={() => {
                setCurrentOrder(order)
                setConfirmReceiptDialogOpen(true)
              }}
              onApplyAfterSale={() => {
                setCurrentOrder(order)
                setAfterSaleDialogOpen(true)
              }}
              onReview={() => {
                setCurrentOrder(order)
                setReviewDialogOpen(true)
              }}
              onCancelRefund={() => {
                setCurrentOrder(order)
                setCancelRefundDialogOpen(true)
              }}
            />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {orders.pending.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              navigate={navigate}
              onCancelOrder={() => {
                setCurrentOrder(order)
                setCancelDialogOpen(true)
              }}
              onContactService={() => {
                setCurrentOrder(order)
                setCustomerServiceDialogOpen(true)
              }}
            />
          ))}
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          {orders.processing.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              navigate={navigate}
              onContactService={() => {
                setCurrentOrder(order)
                setCustomerServiceDialogOpen(true)
              }}
              onApplyRefund={() => {
                setCurrentOrder(order)
                setRefundDialogOpen(true)
              }}
            />
          ))}
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          {orders.shipping.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              navigate={navigate}
              onViewLogistics={() => {
                setCurrentOrder(order)
                setLogisticsDialogOpen(true)
              }}
              onConfirmReceipt={() => {
                setCurrentOrder(order)
                setConfirmReceiptDialogOpen(true)
              }}
            />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {orders.completed.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              navigate={navigate}
              onApplyAfterSale={() => {
                setCurrentOrder(order)
                setAfterSaleDialogOpen(true)
              }}
              onReview={() => {
                setCurrentOrder(order)
                setReviewDialogOpen(true)
              }}
            />
          ))}
        </TabsContent>

        <TabsContent value="refund" className="space-y-4">
          {orders.refund.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              navigate={navigate}
              onCancelRefund={() => {
                setCurrentOrder(order)
                setCancelRefundDialogOpen(true)
              }}
              onContactService={() => {
                setCurrentOrder(order)
                setCustomerServiceDialogOpen(true)
              }}
            />
          ))}
        </TabsContent>
      </Tabs>

      {/* 取消订单对话框 */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>取消订单</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">您确定要取消订单 {currentOrder?.id} 吗？</p>
            <p className="text-sm text-gray-500">取消后，订单将无法恢复，已支付的款项将在1-7个工作日内原路退回。</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              再想想
            </Button>
            <Button variant="destructive" onClick={handleCancelOrder}>
              确认取消
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 申请退款对话框 */}
      <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>申请退款</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <Label className="mb-2 block">退款原因</Label>
              <RadioGroup value={refundReason} onValueChange={setRefundReason}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="quality" id="quality" />
                  <Label htmlFor="quality">商品质量问题</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="wrong" id="wrong" />
                  <Label htmlFor="wrong">收到错误商品</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="mind" id="mind" />
                  <Label htmlFor="mind">不想要了</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">其他原因</Label>
                </div>
              </RadioGroup>
            </div>

            {refundReason === "other" && (
              <div className="mb-4">
                <Label htmlFor="refund-description" className="mb-2 block">
                  详细说明
                </Label>
                <Textarea
                  id="refund-description"
                  placeholder="请详细描述您的退款原因"
                  value={refundDescription}
                  onChange={(e) => setRefundDescription(e.target.value)}
                />
              </div>
            )}

            <p className="text-sm text-gray-500">提交申请后，客服将在24小时内审核您的退款申请，请保持手机畅通。</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleRefundSubmit}>提交申请</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 查看物流对话框 */}
      <Dialog open={logisticsDialogOpen} onOpenChange={setLogisticsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>物流信息</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">物流单号</span>
              <span className="font-medium">{currentOrder?.trackingNumber}</span>
            </div>

            <div className="space-y-4">
              <div className="relative pl-6 border-l-2 border-green-500 pb-4">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                <div className="mb-1 font-medium">包裹已签收</div>
                <div className="text-sm text-gray-600">您的包裹已由前台代签收</div>
                <div className="text-xs text-gray-500 mt-1">2023-12-02 14:30</div>
              </div>

              <div className="relative pl-6 border-l-2 border-gray-300 pb-4">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                <div className="mb-1 font-medium">派送中</div>
                <div className="text-sm text-gray-600">快递员正在派送，请保持电话畅通</div>
                <div className="text-xs text-gray-500 mt-1">2023-12-02 09:15</div>
              </div>

              <div className="relative pl-6 border-l-2 border-gray-300 pb-4">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                <div className="mb-1 font-medium">运输中</div>
                <div className="text-sm text-gray-600">包裹已到达【杭州转运中心】</div>
                <div className="text-xs text-gray-500 mt-1">2023-12-01 20:45</div>
              </div>

              <div className="relative pl-6 border-l-2 border-gray-300 pb-4">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                <div className="mb-1 font-medium">已发货</div>
                <div className="text-sm text-gray-600">包裹已由【苏州仓库】发出</div>
                <div className="text-xs text-gray-500 mt-1">2023-11-30 15:20</div>
              </div>

              <div className="relative pl-6 pb-0">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                <div className="mb-1 font-medium">已下单</div>
                <div className="text-sm text-gray-600">商家已接单</div>
                <div className="text-xs text-gray-500 mt-1">2023-11-30 10:15</div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setLogisticsDialogOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 确认收货对话框 */}
      <Dialog open={confirmReceiptDialogOpen} onOpenChange={setConfirmReceiptDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>确认收货</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">您确定已收到订单 {currentOrder?.id} 的商品吗？</p>
            <p className="text-sm text-gray-500">确认收货后，订单将完成交易，如有问题请在收货前联系客服。</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmReceiptDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleConfirmReceipt}>确认收货</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 申请售后对话框 */}
      <Dialog open={afterSaleDialogOpen} onOpenChange={setAfterSaleDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>申请售后</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <Label className="mb-2 block">售后类型</Label>
              <RadioGroup defaultValue="repair">
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="repair" id="repair" />
                  <Label htmlFor="repair">维修</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="exchange" id="exchange" />
                  <Label htmlFor="exchange">换货</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="refund" id="refund-after" />
                  <Label htmlFor="refund-after">退款</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-4">
              <Label htmlFor="after-sale-description" className="mb-2 block">
                问题描述
              </Label>
              <Textarea id="after-sale-description" placeholder="请详细描述您遇到的问题" />
            </div>

            <p className="text-sm text-gray-500">提交申请后，客服将在24小时内与您联系，请保持手机畅通。</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAfterSaleDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setAfterSaleDialogOpen(false)}>提交申请</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 评价对话框 */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>评价商品</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <Label className="mb-2 block">商品评分</Label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button key={star} variant="ghost" size="sm" className="p-1" onClick={() => setRating(star)}>
                    <Star size={24} className={star <= rating ? "text-yellow-500 fill-current" : "text-gray-300"} />
                  </Button>
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  {rating === 5
                    ? "非常满意"
                    : rating === 4
                      ? "满意"
                      : rating === 3
                        ? "一般"
                        : rating === 2
                          ? "不满意"
                          : "非常不满意"}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="review-content" className="mb-2 block">
                评价内容
              </Label>
              <Textarea
                id="review-content"
                placeholder="请分享您对商品的使用体验"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSubmitReview}>提交评价</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 联系客服对话框 */}
      <Dialog open={customerServiceDialogOpen} onOpenChange={setCustomerServiceDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>联系客服</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <MessageCircle size={32} className="text-blue-500" />
              </div>
              <h3 className="font-medium">在线客服</h3>
              <p className="text-sm text-gray-500 mt-1">工作时间: 9:00-22:00</p>
            </div>

            <div className="space-y-3">
              <Button className="w-full">
                <MessageCircle size={16} className="mr-2" />
                开始聊天
              </Button>

              <Button variant="outline" className="w-full">
                <Phone size={16} className="mr-2" />
                电话咨询
              </Button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                订单号: {currentOrder?.id}
                <br />
                如需帮助，请提供订单号以便客服更快地解决您的问题。
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setCustomerServiceDialogOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 取消退款申请对话框 */}
      <Dialog open={cancelRefundDialogOpen} onOpenChange={setCancelRefundDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>取消退款申请</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">您确定要取消订单 {currentOrder?.id} 的退款申请吗？</p>
            <p className="text-sm text-gray-500">取消后，退款申请将立即终止，订单将恢复到正常状态。</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelRefundDialogOpen(false)}>
              再想想
            </Button>
            <Button onClick={handleCancelRefund}>确认取消申请</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface OrderCardProps {
  order: any
  navigate: (screen: Screen, params?: Record<string, any>) => void
  onCancelOrder?: () => void
  onContactService?: () => void
  onApplyRefund?: () => void
  onViewLogistics?: () => void
  onConfirmReceipt?: () => void
  onApplyAfterSale?: () => void
  onReview?: () => void
  onCancelRefund?: () => void
}

function OrderCard({
  order,
  navigate,
  onCancelOrder,
  onContactService,
  onApplyRefund,
  onViewLogistics,
  onConfirmReceipt,
  onApplyAfterSale,
  onReview,
  onCancelRefund,
}: OrderCardProps) {
  const getStatusBadge = () => {
    switch (order.status) {
      case "待付款":
        return <Badge className="bg-red-500">待付款</Badge>
      case "待发货":
        return <Badge className="bg-blue-500">待发货</Badge>
      case "待收货":
        return <Badge className="bg-amber-500">待收货</Badge>
      case "待评价":
        return <Badge className="bg-green-500">待评价</Badge>
      case "退款处理中":
        return <Badge className="bg-purple-500">退款处理中</Badge>
      default:
        return <Badge>{order.status}</Badge>
    }
  }

  const getActionButtons = () => {
    switch (order.status) {
      case "待付款":
        return (
          <div className="flex justify-end space-x-2 mt-3">
            <Button variant="outline" size="sm" onClick={onCancelOrder}>
              取消订单
            </Button>
            <Button
              size="sm"
              onClick={() =>
                navigate("payment", {
                  items: order.items,
                  totalAmount: order.total,
                  orderType: "product",
                })
              }
            >
              立即付款
            </Button>
          </div>
        )
      case "待发货":
        return (
          <div className="flex justify-end space-x-2 mt-3">
            <Button variant="outline" size="sm" onClick={onContactService}>
              联系客服
            </Button>
            <Button variant="outline" size="sm" onClick={onApplyRefund}>
              申请退款
            </Button>
          </div>
        )
      case "待收货":
        return (
          <div className="flex justify-end space-x-2 mt-3">
            <Button variant="outline" size="sm" onClick={onViewLogistics}>
              查看物流
            </Button>
            <Button size="sm" onClick={onConfirmReceipt}>
              确认收货
            </Button>
          </div>
        )
      case "待评价":
        return (
          <div className="flex justify-end space-x-2 mt-3">
            <Button variant="outline" size="sm" onClick={onApplyAfterSale}>
              申请售后
            </Button>
            <Button size="sm" onClick={onReview}>
              <Star size={14} className="mr-1" />
              评价
            </Button>
          </div>
        )
      case "退款处理中":
        return (
          <div className="flex justify-end space-x-2 mt-3">
            <Button variant="outline" size="sm" onClick={onCancelRefund}>
              取消申请
            </Button>
            <Button size="sm" onClick={onContactService}>
              联系客服
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm text-gray-500">订单号: {order.id}</div>
          {getStatusBadge()}
        </div>

        {order.countdown && (
          <div className="bg-red-50 text-red-600 text-sm p-2 rounded mb-3">支付剩余时间: {order.countdown}</div>
        )}

        {order.items.map((item: any, index: number) => (
          <div key={index} className="flex py-2 border-t border-gray-100 first:border-0">
            <div className="w-16 h-16 rounded overflow-hidden">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="ml-3 flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="flex justify-between mt-1">
                <div className="text-sm text-gray-500">x{item.quantity}</div>
                <div>¥{item.price.toFixed(2)}</div>
              </div>
            </div>
          </div>
        ))}

        {order.trackingNumber && (
          <div className="flex items-center text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">
            <Truck size={14} className="mr-1 text-blue-500" />
            <span>物流单号: {order.trackingNumber}</span>
            <span className="ml-auto">{order.estimatedDelivery}</span>
          </div>
        )}

        {order.refundReason && (
          <div className="flex items-center text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">
            <RotateCcw size={14} className="mr-1 text-purple-500" />
            <span>退款原因: {order.refundReason}</span>
          </div>
        )}

        <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
          <div className="text-sm text-gray-500">下单时间: {order.date}</div>
          <div className="font-medium">
            共{order.items.reduce((sum: number, item: any) => sum + item.quantity, 0)}件商品 合计:
            <span className="text-red-500 ml-1">¥{order.total.toFixed(2)}</span>
          </div>
        </div>

        {getActionButtons()}
      </CardContent>
    </Card>
  )
}

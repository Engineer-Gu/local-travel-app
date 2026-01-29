"use client"

import { ArrowLeft, CreditCard, Plus, ArrowDownRight, ArrowUpRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Screen } from "@/lib/navigation-types"

interface WalletProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function Wallet({ goBack, navigate }: WalletProps) {
  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">我的钱包</h1>
      </div>

      <Card className="mb-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <CreditCard size={20} className="mr-2" />
              <span className="font-medium">账户余额</span>
            </div>
            <Button size="sm" variant="secondary" className="text-blue-700" onClick={() => navigate("wallet-recharge")}>
              <Plus size={16} className="mr-1" />
              充值
            </Button>
          </div>

          <div className="text-3xl font-bold mb-1">¥358.50</div>
          <div className="text-sm text-blue-100">可用于支付导游服务、门票预订等</div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button variant="secondary" className="text-blue-700" onClick={() => navigate("wallet-withdraw")}>
              提现
            </Button>
            <Button variant="secondary" className="text-blue-700" onClick={() => navigate("wallet-transfer")}>
              转账
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="transactions">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="transactions">交易记录</TabsTrigger>
            <TabsTrigger value="coupons">优惠券</TabsTrigger>
          </TabsList>

          <Button variant="outline" size="icon">
            <Filter size={16} />
          </Button>
        </div>

        <TabsContent value="transactions" className="space-y-4">
          {[
            {
              title: "导游服务预订",
              amount: -150,
              date: "2023-12-01",
              time: "14:30",
            },
            {
              title: "账户充值",
              amount: 500,
              date: "2023-11-28",
              time: "10:15",
            },
            {
              title: "西湖景区门票",
              amount: -60,
              date: "2023-11-20",
              time: "09:45",
            },
            {
              title: "会员续费",
              amount: -88,
              date: "2023-11-15",
              time: "16:20",
            },
          ].map((transaction, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate("transaction-detail", { transaction })}
            >
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                      }`}
                  >
                    {transaction.amount > 0 ? (
                      <ArrowDownRight size={20} className="text-green-600" />
                    ) : (
                      <ArrowUpRight size={20} className="text-red-600" />
                    )}
                  </div>

                  <div className="ml-3">
                    <div className="font-medium">{transaction.title}</div>
                    <div className="text-sm text-gray-500">
                      {transaction.date} {transaction.time}
                    </div>
                  </div>
                </div>
                <div className={`font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                  {transaction.amount > 0 ? "+" : "-"}¥{Math.abs(transaction.amount)}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="coupons" className="space-y-4">
          {[
            {
              id: "c1",
              title: "景点门票优惠券",
              discount: "满200减30",
              expiry: "2023-12-31",
              status: "未使用",
              color: "bg-blue-500",
            },
            {
              id: "c2",
              title: "酒店预订优惠券",
              discount: "8.5折",
              expiry: "2023-12-15",
              status: "未使用",
              color: "bg-green-500",
            },
            {
              id: "c3",
              title: "餐饮优惠券",
              discount: "满100减20",
              expiry: "2023-12-10",
              status: "未使用",
              color: "bg-yellow-500",
            },
            {
              id: "c4",
              title: "导游服务优惠券",
              discount: "9折",
              expiry: "2023-12-20",
              status: "未使用",
              color: "bg-purple-500",
            },
          ].map((coupon, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate("coupon-detail", { coupon })}
            >
              <CardContent className="p-0">
                <div className="flex">
                  <div className={`w-2 ${coupon.color}`}></div>
                  <div className="p-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{coupon.title}</div>
                        <div className="text-sm text-gray-500">有效期至: {coupon.expiry}</div>
                      </div>
                      <div className="text-lg font-bold text-red-600">{coupon.discount}</div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{coupon.status}</span>
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        立即使用
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

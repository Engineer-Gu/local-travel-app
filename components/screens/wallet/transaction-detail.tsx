"use client"

import { ArrowLeft, ArrowDownRight, ArrowUpRight, FileText, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface TransactionDetailProps {
  goBack: () => void
  params?: {
    transaction: {
      title: string
      amount: number
      date: string
      time: string
    }
  }
}

export function TransactionDetail({ goBack, params }: TransactionDetailProps) {
  const transaction = params?.transaction || {
    title: "导游服务预订",
    amount: -150,
    date: "2023-12-01",
    time: "14:30",
  }

  // 根据交易类型生成额外信息
  const getTransactionDetails = () => {
    if (transaction.title.includes("导游")) {
      return {
        location: "西湖景区",
        guide: "李导游",
        duration: "3小时",
        people: "2人",
        orderNumber:
          "GD" +
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0"),
      }
    } else if (transaction.title.includes("门票")) {
      return {
        location: "西湖景区",
        ticketType: "成人票",
        quantity: "2张",
        visitDate: "2023-11-20",
        orderNumber:
          "TK" +
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0"),
      }
    } else if (transaction.title.includes("充值")) {
      return {
        method: "微信支付",
        orderNumber:
          "RC" +
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0"),
      }
    } else {
      return {
        orderNumber:
          "OR" +
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0"),
      }
    }
  }

  const details = getTransactionDetails()

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">交易详情</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6 flex flex-col items-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {transaction.amount > 0 ? (
              <ArrowDownRight size={32} className="text-green-600" />
            ) : (
              <ArrowUpRight size={32} className="text-red-600" />
            )}
          </div>

          <div className={`text-3xl font-bold mb-2 ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
            {transaction.amount > 0 ? "+" : "-"}¥{Math.abs(transaction.amount)}
          </div>

          <div className="text-lg font-medium mb-1">{transaction.title}</div>
          <div className="text-sm text-gray-500">
            {transaction.date} {transaction.time}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">交易信息</h3>
          <Separator className="mb-3" />

          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="text-gray-500">交易状态</div>
              <div className="font-medium text-green-600">已完成</div>
            </div>

            <div className="flex justify-between">
              <div className="text-gray-500">交易单号</div>
              <div className="font-medium">{details.orderNumber}</div>
            </div>

            <div className="flex justify-between">
              <div className="text-gray-500">交易时间</div>
              <div className="font-medium">
                {transaction.date} {transaction.time}
              </div>
            </div>

            {details.location && (
              <div className="flex justify-between">
                <div className="text-gray-500">交易地点</div>
                <div className="font-medium">{details.location}</div>
              </div>
            )}

            {details.method && (
              <div className="flex justify-between">
                <div className="text-gray-500">支付方式</div>
                <div className="font-medium">{details.method}</div>
              </div>
            )}

            {details.guide && (
              <div className="flex justify-between">
                <div className="text-gray-500">导游信息</div>
                <div className="font-medium">{details.guide}</div>
              </div>
            )}

            {details.ticketType && (
              <div className="flex justify-between">
                <div className="text-gray-500">票种</div>
                <div className="font-medium">{details.ticketType}</div>
              </div>
            )}

            {details.quantity && (
              <div className="flex justify-between">
                <div className="text-gray-500">数量</div>
                <div className="font-medium">{details.quantity}</div>
              </div>
            )}

            {details.visitDate && (
              <div className="flex justify-between">
                <div className="text-gray-500">游览日期</div>
                <div className="font-medium">{details.visitDate}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-center">
        <Button variant="outline" className="mr-3">
          <FileText size={16} className="mr-2" />
          查看发票
        </Button>
        <Button variant="outline">
          <MapPin size={16} className="mr-2" />
          查看位置
        </Button>
      </div>
    </div>
  )
}

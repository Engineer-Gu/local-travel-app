"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Check, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface WalletTransferProps {
  goBack: () => void
}

export function WalletTransfer({ goBack }: WalletTransferProps) {
  const [step, setStep] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const walletBalance = 358.5

  const recentUsers = [
    { id: "user1", name: "张小明", avatar: "/placeholder.svg?height=40&width=40&text=张小明" },
    { id: "user2", name: "李华", avatar: "/placeholder.svg?height=40&width=40&text=李华" },
    { id: "user3", name: "王芳", avatar: "/placeholder.svg?height=40&width=40&text=王芳" },
  ]

  const searchResults = searchQuery
    ? [
        { id: "user1", name: "张小明", avatar: "/placeholder.svg?height=40&width=40&text=张小明" },
        { id: "user4", name: "张三", avatar: "/placeholder.svg?height=40&width=40&text=张三" },
      ]
    : []

  const handleUserSelect = (user: any) => {
    setSelectedUser(user)
    setStep(2)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d{0,2}$/.test(value) && Number.parseFloat(value || "0") <= walletBalance) {
      setAmount(value)
    }
  }

  const handleTransfer = () => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    setIsProcessing(true)
    // 模拟转账过程
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      // 模拟转账成功后返回
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
        <h2 className="text-xl font-bold mb-2">转账成功</h2>
        <p className="text-center text-gray-600 mb-8">
          您已成功向{selectedUser?.name}转账 ¥{amount}
        </p>
        <Button onClick={goBack}>返回钱包</Button>
      </div>
    )
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-2 p-0"
          onClick={() => {
            if (step > 1) {
              setStep(step - 1)
            } else {
              goBack()
            }
          }}
        >
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">钱包转账</h1>
      </div>

      {step === 1 && (
        <>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">选择转账对象</h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索用户名或ID"
              />
            </div>

            {searchQuery && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">搜索结果</h3>
                <div className="space-y-2">
                  {searchResults.map((user) => (
                    <Card
                      key={user.id}
                      className="cursor-pointer hover:border-blue-300 transition-colors"
                      onClick={() => handleUserSelect(user)}
                    >
                      <CardContent className="p-3 flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">最近联系人</h3>
              <div className="space-y-2">
                {recentUsers.map((user) => (
                  <Card
                    key={user.id}
                    className="cursor-pointer hover:border-blue-300 transition-colors"
                    onClick={() => handleUserSelect(user)}
                  >
                    <CardContent className="p-3 flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {step === 2 && selectedUser && (
        <>
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
              <AvatarFallback>{selectedUser.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold">向 {selectedUser.name} 转账</h2>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">转账金额</label>
            <div className="relative mb-2">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
              <Input
                type="text"
                className="pl-8 text-lg"
                value={amount}
                onChange={handleAmountChange}
                placeholder="请输入转账金额"
              />
            </div>
            <p className="text-xs text-gray-500">当前余额: ¥{walletBalance.toFixed(2)}</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">转账留言 (选填)</label>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="请输入转账留言"
            />
          </div>

          <Button
            className="w-full"
            onClick={handleTransfer}
            disabled={!amount || Number.parseFloat(amount) <= 0 || isProcessing}
          >
            {isProcessing ? "处理中..." : "确认转账"}
          </Button>
        </>
      )}
    </div>
  )
}

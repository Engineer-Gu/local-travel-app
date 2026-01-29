"use client"

import { ArrowLeft, Lock, Smartphone, Mail, Shield, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

interface AccountSecurityProps {
  goBack: () => void
}

export function AccountSecurity({ goBack }: AccountSecurityProps) {
  const { toast } = useToast()

  const handleOptimization = (feature: string) => {
    toast({
      title: "功能开发中",
      description: `[${feature}] 功能将在后续版本开放`,
    })
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">账号安全</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:bg-gray-100"
                onClick={() => handleOptimization("登录密码")}
              >
                <div className="flex items-center">
                  <Lock size={18} className="mr-3 text-blue-500" />
                  <div>
                    <div className="font-medium">登录密码</div>
                    <div className="text-sm text-gray-500">定期修改密码可以保护账号安全</div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>

              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:bg-gray-100"
                onClick={() => handleOptimization("手机绑定")}
              >
                <div className="flex items-center">
                  <Smartphone size={18} className="mr-3 text-green-500" />
                  <div>
                    <div className="font-medium">手机绑定</div>
                    <div className="text-sm text-gray-500">已绑定：138****8000</div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>

              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:bg-gray-100"
                onClick={() => handleOptimization("邮箱绑定")}
              >
                <div className="flex items-center">
                  <Mail size={18} className="mr-3 text-amber-500" />
                  <div>
                    <div className="font-medium">邮箱绑定</div>
                    <div className="text-sm text-gray-500">已绑定：u***@example.com</div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:bg-gray-100"
                onClick={() => handleOptimization("实名认证")}
              >
                <div className="flex items-center">
                  <Shield size={18} className="mr-3 text-purple-500" />
                  <div>
                    <div className="font-medium">实名认证</div>
                    <div className="text-sm text-gray-500">未认证</div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-8">去认证</Button>
              </div>

              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:bg-gray-100"
                onClick={() => handleOptimization("登录设备管理")}
              >
                <div className="flex items-center">
                  <Shield size={18} className="mr-3 text-red-500" />
                  <div>
                    <div className="font-medium">登录设备管理</div>
                    <div className="text-sm text-gray-500">查看并管理已登录设备</div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-sm text-gray-500 p-2 text-center">如果您发现账号存在异常情况，请立即修改密码或联系客服。</div>
      </div>
    </div>
  )
}

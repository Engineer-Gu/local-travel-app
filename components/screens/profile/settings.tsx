"use client"

import { ArrowLeft, ChevronRight, Moon, Bell, Shield, Info, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import type { Screen } from "@/components/mobile-app"

interface SettingsProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function Settings({ goBack, navigate }: SettingsProps) {
  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">设置</h1>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-2">账号设置</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => navigate("account-security")}
                >
                  <div className="flex items-center">
                    <Shield size={18} className="mr-3 text-blue-500" />
                    <span>账号安全</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => navigate("notification-settings")}
                >
                  <div className="flex items-center">
                    <Bell size={18} className="mr-3 text-amber-500" />
                    <span>通知设置</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => navigate("theme-settings")}
                >
                  <div className="flex items-center">
                    <Moon size={18} className="mr-3 text-purple-500" />
                    <span>外观设置</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-2">隐私设置</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-medium">位置信息</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">允许应用获取您的位置信息</div>
                  </div>
                  <Switch id="location" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-medium">个人资料可见性</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">允许其他用户查看您的个人资料</div>
                  </div>
                  <Switch id="profile-visibility" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-medium">个性化推荐</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">根据您的兴趣和行为推荐内容</div>
                  </div>
                  <Switch id="personalized-recommendations" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-2">关于</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Info size={18} className="mr-3 text-blue-500" />
                    <span>版本信息</span>
                  </div>
                  <span className="text-sm text-gray-500">v1.0.0</span>
                </div>
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => navigate("user-agreement")}
                >
                  <span>用户协议</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => navigate("privacy-policy")}
                >
                  <span>隐私政策</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button variant="destructive" className="w-full" onClick={() => navigate("login")}>
          <LogOut size={16} className="mr-2" />
          退出登录
        </Button>
      </div>
    </div>
  )
}

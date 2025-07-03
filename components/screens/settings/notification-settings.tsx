"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface NotificationSettingsProps {
  goBack: () => void
}

export function NotificationSettings({ goBack }: NotificationSettingsProps) {
  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">通知设置</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="font-medium mb-4">系统通知</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="system-updates" className="cursor-pointer">
                  系统更新
                </Label>
                <Switch id="system-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="security-alerts" className="cursor-pointer">
                  安全提醒
                </Label>
                <Switch id="security-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="account-notifications" className="cursor-pointer">
                  账号通知
                </Label>
                <Switch id="account-notifications" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="font-medium mb-4">社交通知</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="friend-requests" className="cursor-pointer">
                  好友请求
                </Label>
                <Switch id="friend-requests" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="messages" className="cursor-pointer">
                  消息提醒
                </Label>
                <Switch id="messages" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="group-activities" className="cursor-pointer">
                  群组活动
                </Label>
                <Switch id="group-activities" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="font-medium mb-4">活动通知</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="itinerary-reminders" className="cursor-pointer">
                  行程提醒
                </Label>
                <Switch id="itinerary-reminders" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="guide-updates" className="cursor-pointer">
                  导游更新
                </Label>
                <Switch id="guide-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="promotions" className="cursor-pointer">
                  优惠活动
                </Label>
                <Switch id="promotions" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="font-medium mb-4">通知方式</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications" className="cursor-pointer">
                  应用内推送
                </Label>
                <Switch id="push-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications" className="cursor-pointer">
                  短信通知
                </Label>
                <Switch id="sms-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="cursor-pointer">
                  邮件通知
                </Label>
                <Switch id="email-notifications" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full">保存设置</Button>
      </div>
    </div>
  )
}

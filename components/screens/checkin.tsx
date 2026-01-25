"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, Gift, Award, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import type { Screen } from "@/components/mobile-app"
import { userService } from "@/lib/services/user-service"

interface CheckinProps {
  goBack?: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function Checkin({ goBack, navigate }: CheckinProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [checkedDays, setCheckedDays] = useState<number[]>([])
  const [currentStreak, setCurrentStreak] = useState(0)
  const [totalDays, setTotalDays] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // 加载签到历史数据
  useEffect(() => {
    console.log("签到页面 useEffect 触发，月份:", currentMonth.getMonth() + 1)
    loadCheckinHistory()
  }, [currentMonth])

  const loadCheckinHistory = async () => {
    console.log("开始加载签到历史...")
    try {
      setIsLoading(true)
      const year = currentMonth.getFullYear()
      const month = currentMonth.getMonth() + 1 // 月份从0开始，需要+1

      console.log("请求签到历史:", { year, month })
      const history = await userService.getCheckinHistory(year, month)

      console.log("签到历史数据:", history)

      setCheckedDays(history.checkedDaysInMonth || [])
      setCurrentStreak(history.continuousDays || 0)
      setTotalDays(history.totalDays || 0)
      setTotalPoints(history.totalPoints || 0)
      setHasCheckedInToday(history.hasCheckedInToday || false)

      console.log("签到状态更新完成:", {
        checkedDays: history.checkedDaysInMonth,
        continuousDays: history.continuousDays,
        totalDays: history.totalDays,
        totalPoints: history.totalPoints,
        hasCheckedInToday: history.hasCheckedInToday,
      })
    } catch (error) {
      console.error("加载签到历史失败", error)
      toast({
        title: "加载失败",
        description: "无法加载签到记录，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 获取当前月份的天数
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // 获取当前月份的第一天是星期几
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // 生成日历数据
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const days = []

    // 添加上个月的占位天数
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: 0, isCurrentMonth: false })
    }

    // 添加当前月的天数
    for (let i = 1; i <= daysInMonth; i++) {
      const isChecked = checkedDays.includes(i)
      const isToday = new Date().getDate() === i && new Date().getMonth() === month && new Date().getFullYear() === year

      days.push({
        day: i,
        isCurrentMonth: true,
        isChecked,
        isToday,
      })
    }

    return days
  }

  // 处理签到
  const handleCheckIn = async () => {
    console.log("签到页面签到按钮被点击，当前状态 hasCheckedInToday:", hasCheckedInToday)

    if (hasCheckedInToday) {
      toast({
        title: "今日已签到",
        description: "明天再来签到获取更多积分吧！",
      })
      return
    }

    try {
      console.log("开始调用签到接口...")
      const response = await userService.checkin()
      console.log("签到接口返回:", response)

      toast({
        title: "签到成功",
        description: response.message || `恭喜获得${response.pointsEarned}积分！已连续签到${response.continuousDays}天`,
      })

      // 签到成功后，重新加载数据以确保所有状态都是最新的
      console.log("签到成功，重新加载签到历史...")
      await loadCheckinHistory()
    } catch (error: any) {
      console.error("签到失败", error)
      toast({
        title: "签到失败",
        description: error.message || "请稍后重试",
        variant: "destructive",
      })
    }
  }

  // 月份名称
  const monthNames = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ]

  // 周几名称
  const weekDays = ["日", "一", "二", "三", "四", "五", "六"]

  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-2" size={32} />
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => goBack ? goBack() : navigate("home")}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-bold ml-2">每日签到</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Calendar className="mr-2 text-blue-500" />
              <h2 className="text-lg font-medium">连续签到</h2>
            </div>
            <Badge className="bg-blue-500">{currentStreak}天</Badge>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span>连续签到进度</span>
            <span>{currentStreak}/7天</span>
          </div>

          <Progress value={(currentStreak / 7) * 100} className="h-2 mb-4" />

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">累计签到</span>
            <Badge variant="outline">{totalDays}天</Badge>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">当前积分</span>
            <Badge className="bg-green-500">{totalPoints}分</Badge>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {[5, 10, 15, 20, 30, 40, 50].map((points, index) => (
              <div
                key={index}
                className={`flex flex-col items-center ${
                  index + 1 <= currentStreak ? "text-blue-500" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs mb-1 ${
                    index + 1 <= currentStreak
                      ? "bg-blue-100 text-blue-500 border-2 border-blue-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs">{points}分</span>
              </div>
            ))}
          </div>

          <Button
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={handleCheckIn}
            disabled={hasCheckedInToday}
          >
            {hasCheckedInToday ? "今日已签到" : "立即签到"}
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Calendar className="mr-2 text-blue-500" />
              <h2 className="text-lg font-medium">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newMonth = new Date(currentMonth)
                  newMonth.setMonth(newMonth.getMonth() - 1)
                  setCurrentMonth(newMonth)
                }}
              >
                &lt;
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newMonth = new Date(currentMonth)
                  newMonth.setMonth(newMonth.getMonth() + 1)
                  setCurrentMonth(newMonth)
                }}
              >
                &gt;
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((day, index) => (
              <div
                key={index}
                className={`
                  aspect-square flex items-center justify-center rounded-full text-sm
                  ${!day.isCurrentMonth ? "invisible" : ""}
                  ${day.isChecked ? "bg-blue-500 text-white" : ""}
                  ${day.isToday && !day.isChecked ? "border-2 border-blue-500" : ""}
                `}
              >
                {day.day > 0 ? day.day : ""}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Gift className="mr-2 text-blue-500" />
              <h2 className="text-lg font-medium">我的积分</h2>
            </div>
            <Badge className="bg-blue-500">{totalPoints}分</Badge>
          </div>

          <Button
            variant="outline"
            className="w-full flex justify-between items-center"
            onClick={() => navigate("profile")}
          >
            <div className="flex items-center">
              <Award className="mr-2 text-blue-500" />
              <span>积分商城</span>
            </div>
            <ChevronRight size={16} />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

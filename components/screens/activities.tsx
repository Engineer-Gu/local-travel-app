"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Clock,
  Users,
  Gift,
  Camera,
  MapPin,
  Trophy,
  Calendar,
  ChevronRight,
  Star,
  Flame,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import type { Screen } from "@/lib/navigation-types"

/**
 * 限时活动页面Props接口
 */
interface ActivitiesProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

/**
 * 活动项接口定义
 */
interface ActivityItem {
  id: string
  title: string
  description: string
  image: string
  type: "festival" | "photo" | "checkin" | "social"
  startTime: string
  endTime: string
  participants: number
  maxParticipants?: number
  rewards: string[]
  progress?: number
  maxProgress?: number
  joined: boolean
  status: "ongoing" | "upcoming" | "ended"
}

/**
 * 限时活动页面组件
 * 展示节日主题、摄影大赛、打卡挑战、社交活动等
 */
export function Activities({ goBack, navigate }: ActivitiesProps) {
  const { toast } = useToast()
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  // 活动数据
  const [activities] = useState<ActivityItem[]>([
    {
      id: "spring_festival",
      title: "春季踏青季",
      description: "春暖花开，一起去踏青吧！完成指定景点打卡，赢取丰厚奖励",
      image: "/images/activities/spring.jpg",
      type: "festival",
      startTime: "2026-03-01",
      endTime: "2026-03-31",
      participants: 1256,
      rewards: ["100积分", "春季限定徽章", "优惠券"],
      progress: 2,
      maxProgress: 5,
      joined: true,
      status: "ongoing",
    },
    {
      id: "photo_contest",
      title: "最美风景摄影大赛",
      description: "用镜头记录旅途中的美景，优秀作品将获得官方推荐",
      image: "/images/activities/photo.jpg",
      type: "photo",
      startTime: "2026-02-01",
      endTime: "2026-02-28",
      participants: 856,
      rewards: ["500积分", "摄影达人徽章", "相机优惠券"],
      joined: false,
      status: "ongoing",
    },
    {
      id: "7day_checkin",
      title: "7天连续打卡挑战",
      description: "连续7天完成签到，解锁专属奖励",
      image: "/images/activities/checkin.jpg",
      type: "checkin",
      startTime: "2026-02-01",
      endTime: "2026-02-28",
      participants: 2345,
      rewards: ["70积分", "坚持达人徽章"],
      progress: 3,
      maxProgress: 7,
      joined: true,
      status: "ongoing",
    },
    {
      id: "team_travel",
      title: "组队旅行大作战",
      description: "邀请好友组队旅行，队伍人数越多奖励越丰厚",
      image: "/images/activities/team.jpg",
      type: "social",
      startTime: "2026-02-15",
      endTime: "2026-03-15",
      participants: 456,
      maxParticipants: 1000,
      rewards: ["200积分", "社交达人徽章", "团队优惠券"],
      joined: false,
      status: "ongoing",
    },
    {
      id: "food_map",
      title: "美食地图挑战",
      description: "探索城市美食，完成美食地图打卡",
      image: "/images/activities/food.jpg",
      type: "checkin",
      startTime: "2026-03-01",
      endTime: "2026-03-31",
      participants: 0,
      rewards: ["150积分", "美食家徽章"],
      joined: false,
      status: "upcoming",
    },
    {
      id: "invite_friends",
      title: "好友邀请赛",
      description: "邀请好友注册，双方都能获得奖励",
      image: "/images/activities/invite.jpg",
      type: "social",
      startTime: "2026-01-01",
      endTime: "2026-01-31",
      participants: 3456,
      rewards: ["50积分/人", "邀请达人徽章"],
      progress: 5,
      maxProgress: 10,
      joined: true,
      status: "ended",
    },
  ])

  /**
   * 计算剩余时间
   */
  const calculateTimeLeft = (endTime: string) => {
    const end = new Date(endTime).getTime()
    const now = new Date().getTime()
    const diff = end - now

    if (diff <= 0) return "已结束"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `还剩${days}天`
    return `还剩${hours}小时`
  }

  /**
   * 获取活动类型标签
   */
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "festival":
        return { label: "节日活动", color: "bg-red-500" }
      case "photo":
        return { label: "摄影大赛", color: "bg-purple-500" }
      case "checkin":
        return { label: "打卡挑战", color: "bg-green-500" }
      case "social":
        return { label: "社交活动", color: "bg-blue-500" }
      default:
        return { label: "活动", color: "bg-gray-500" }
    }
  }

  /**
   * 处理参与活动
   */
  const handleJoinActivity = (activity: ActivityItem) => {
    if (activity.joined) {
      toast({
        title: "已参与",
        description: "您已经参与了该活动",
      })
      return
    }

    toast({
      title: "参与成功",
      description: `已成功参与「${activity.title}」活动`,
    })
    setShowDetail(false)
  }

  /**
   * 打开活动详情
   */
  const openActivityDetail = (activity: ActivityItem) => {
    setSelectedActivity(activity)
    setShowDetail(true)
  }

  /**
   * 根据状态筛选活动
   */
  const filterActivities = (status: string) => {
    if (status === "all") return activities
    return activities.filter((a) => a.status === status)
  }

  /**
   * 渲染活动卡片
   */
  const renderActivityCard = (activity: ActivityItem) => {
    const typeInfo = getTypeLabel(activity.type)
    const timeLeft = calculateTimeLeft(activity.endTime)

    return (
      <Card
        key={activity.id}
        className="overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
        onClick={() => openActivityDetail(activity)}
      >
        {/* 活动封面 */}
        <div className="relative h-36">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${activity.image})`,
              backgroundColor: "#e5e7eb",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* 类型标签 */}
          <Badge
            className={`absolute top-2 left-2 ${typeInfo.color} text-white border-0`}
          >
            {typeInfo.label}
          </Badge>

          {/* 状态标签 */}
          {activity.status === "upcoming" && (
            <Badge className="absolute top-2 right-2 bg-amber-500 text-white border-0">
              即将开始
            </Badge>
          )}
          {activity.status === "ended" && (
            <Badge className="absolute top-2 right-2 bg-gray-500 text-white border-0">
              已结束
            </Badge>
          )}

          {/* 底部信息 */}
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h3 className="font-bold text-lg">{activity.title}</h3>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center text-xs">
                <Users size={12} className="mr-1" />
                <span>{activity.participants}人参与</span>
              </div>
              <div className="flex items-center text-xs">
                <Clock size={12} className="mr-1" />
                <span>{timeLeft}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 活动信息 */}
        <CardContent className="p-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {activity.description}
          </p>

          {/* 进度条（如果已参与） */}
          {activity.joined && activity.maxProgress && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>完成进度</span>
                <span>
                  {activity.progress}/{activity.maxProgress}
                </span>
              </div>
              <Progress
                value={((activity.progress || 0) / activity.maxProgress) * 100}
                className="h-1.5"
              />
            </div>
          )}

          {/* 奖励预览 */}
          <div className="flex items-center mt-3">
            <Gift size={14} className="text-amber-500 mr-1" />
            <span className="text-xs text-gray-500">
              奖励: {activity.rewards.slice(0, 2).join("、")}
              {activity.rewards.length > 2 && "..."}
            </span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="pb-16">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-bold ml-2">限时活动</h1>
        </div>
      </div>

      {/* 活动统计 */}
      <div className="p-4">
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold flex items-center">
                  <Flame size={20} className="mr-2" />
                  热门活动进行中
                </h2>
                <p className="text-sm opacity-90 mt-1">
                  参与活动赢取丰厚奖励
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {activities.filter((a) => a.status === "ongoing").length}
                </div>
                <p className="text-xs opacity-90">进行中</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 活动分类Tab */}
      <div className="px-4">
        <Tabs defaultValue="ongoing">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="ongoing">进行中</TabsTrigger>
            <TabsTrigger value="upcoming">即将开始</TabsTrigger>
            <TabsTrigger value="ended">已结束</TabsTrigger>
            <TabsTrigger value="all">全部</TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing" className="space-y-4">
            {filterActivities("ongoing").map(renderActivityCard)}
            {filterActivities("ongoing").length === 0 && (
              <div className="text-center py-8 text-gray-500">
                暂无进行中的活动
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {filterActivities("upcoming").map(renderActivityCard)}
            {filterActivities("upcoming").length === 0 && (
              <div className="text-center py-8 text-gray-500">
                暂无即将开始的活动
              </div>
            )}
          </TabsContent>

          <TabsContent value="ended" className="space-y-4">
            {filterActivities("ended").map(renderActivityCard)}
            {filterActivities("ended").length === 0 && (
              <div className="text-center py-8 text-gray-500">
                暂无已结束的活动
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {activities.map(renderActivityCard)}
          </TabsContent>
        </Tabs>
      </div>

      {/* 活动详情弹窗 */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-md">
          {selectedActivity && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedActivity.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* 活动图片 */}
                <div
                  className="h-40 rounded-lg bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${selectedActivity.image})`,
                    backgroundColor: "#e5e7eb",
                  }}
                />

                {/* 活动信息 */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedActivity.description}
                  </p>

                  <div className="flex items-center text-sm">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <span>
                      {selectedActivity.startTime} ~ {selectedActivity.endTime}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Users size={16} className="mr-2 text-gray-500" />
                    <span>{selectedActivity.participants} 人已参与</span>
                  </div>

                  {/* 奖励列表 */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <Gift size={16} className="mr-2 text-amber-500" />
                      活动奖励
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedActivity.rewards.map((reward, index) => (
                        <Badge key={index} variant="secondary">
                          {reward}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 进度（如果已参与） */}
                  {selectedActivity.joined && selectedActivity.maxProgress && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">完成进度</h4>
                      <Progress
                        value={
                          ((selectedActivity.progress || 0) /
                            selectedActivity.maxProgress) *
                          100
                        }
                        className="h-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedActivity.progress}/{selectedActivity.maxProgress}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter>
                {selectedActivity.status === "ended" ? (
                  <Button disabled className="w-full">
                    活动已结束
                  </Button>
                ) : selectedActivity.joined ? (
                  <Button className="w-full" onClick={() => navigate("checkin")}>
                    查看进度
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleJoinActivity(selectedActivity)}
                  >
                    立即参与
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

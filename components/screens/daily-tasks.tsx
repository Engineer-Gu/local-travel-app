"use client"

import { useState } from "react"
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Gift,
  Target,
  Users,
  Trophy,
  MapPin,
  Camera,
  MessageCircle,
  Share2,
  Heart,
  Star,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { Screen } from "@/lib/navigation-types"

/**
 * 每日任务页面Props接口
 */
interface DailyTasksProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

/**
 * 任务项接口定义
 */
interface TaskItem {
  id: string
  title: string
  description: string
  points: number
  icon: React.ReactNode
  completed: boolean
  progress?: number
  maxProgress?: number
}

/**
 * 任务分类接口定义
 */
interface TaskCategory {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  tasks: TaskItem[]
}

/**
 * 每日任务页面组件
 * 提供日常任务、探索任务、社交任务、成就任务四大类
 */
export function DailyTasks({ goBack, navigate }: DailyTasksProps) {
  const { toast } = useToast()

  // 任务数据状态
  const [taskCategories, setTaskCategories] = useState<TaskCategory[]>([
    {
      id: "daily",
      title: "日常任务",
      icon: <Target size={20} />,
      color: "text-blue-500",
      tasks: [
        {
          id: "checkin",
          title: "每日签到",
          description: "完成今日签到",
          points: 10,
          icon: <CheckCircle2 size={18} className="text-green-500" />,
          completed: false,
        },
        {
          id: "post",
          title: "发布动态",
          description: "发布一条旅行动态",
          points: 20,
          icon: <Camera size={18} className="text-purple-500" />,
          completed: false,
        },
        {
          id: "like",
          title: "点赞内容",
          description: "为3条内容点赞",
          points: 5,
          icon: <Heart size={18} className="text-red-500" />,
          completed: false,
          progress: 1,
          maxProgress: 3,
        },
        {
          id: "comment",
          title: "评论互动",
          description: "评论1条内容",
          points: 10,
          icon: <MessageCircle size={18} className="text-blue-500" />,
          completed: false,
          progress: 0,
          maxProgress: 1,
        },
        {
          id: "share",
          title: "分享好友",
          description: "分享内容给好友",
          points: 15,
          icon: <Share2 size={18} className="text-green-500" />,
          completed: false,
        },
      ],
    },
    {
      id: "explore",
      title: "探索任务",
      icon: <MapPin size={20} />,
      color: "text-green-500",
      tasks: [
        {
          id: "new_spot",
          title: "探索新景点",
          description: "到达一个新的景点",
          points: 50,
          icon: <MapPin size={18} className="text-green-500" />,
          completed: false,
        },
        {
          id: "checkin_spot",
          title: "景点打卡",
          description: "在景点完成打卡",
          points: 30,
          icon: <CheckCircle2 size={18} className="text-amber-500" />,
          completed: true,
        },
        {
          id: "upload_photo",
          title: "上传现场照片",
          description: "在景点上传照片",
          points: 20,
          icon: <Camera size={18} className="text-indigo-500" />,
          completed: false,
        },
      ],
    },
    {
      id: "social",
      title: "社交任务",
      icon: <Users size={20} />,
      color: "text-purple-500",
      tasks: [
        {
          id: "add_friend",
          title: "添加新好友",
          description: "添加一位新好友",
          points: 30,
          icon: <Users size={18} className="text-purple-500" />,
          completed: false,
        },
        {
          id: "join_group",
          title: "参与群组活动",
          description: "参与一次群组活动",
          points: 40,
          icon: <Star size={18} className="text-yellow-500" />,
          completed: false,
        },
        {
          id: "help_newbie",
          title: "帮助新用户",
          description: "回答新用户的问题",
          points: 50,
          icon: <Gift size={18} className="text-pink-500" />,
          completed: false,
        },
      ],
    },
    {
      id: "achievement",
      title: "成就任务",
      icon: <Trophy size={20} />,
      color: "text-amber-500",
      tasks: [
        {
          id: "first_trip",
          title: "首次旅行",
          description: "完成你的第一次旅行",
          points: 100,
          icon: <Trophy size={18} className="text-amber-500" />,
          completed: true,
        },
        {
          id: "city_10",
          title: "城市探索者",
          description: "解锁10个城市",
          points: 500,
          icon: <MapPin size={18} className="text-blue-500" />,
          completed: false,
          progress: 3,
          maxProgress: 10,
        },
        {
          id: "likes_100",
          title: "人气达人",
          description: "获得100个赞",
          points: 200,
          icon: <Heart size={18} className="text-red-500" />,
          completed: false,
          progress: 45,
          maxProgress: 100,
        },
      ],
    },
  ])

  /**
   * 计算总积分
   */
  const calculateTotalPoints = () => {
    let total = 0
    taskCategories.forEach((category) => {
      category.tasks.forEach((task) => {
        if (task.completed) {
          total += task.points
        }
      })
    })
    return total
  }

  /**
   * 计算完成任务数
   */
  const calculateCompletedTasks = () => {
    let completed = 0
    let total = 0
    taskCategories.forEach((category) => {
      category.tasks.forEach((task) => {
        total++
        if (task.completed) {
          completed++
        }
      })
    })
    return { completed, total }
  }

  /**
   * 处理任务完成
   */
  const handleCompleteTask = (categoryId: string, taskId: string) => {
    setTaskCategories((prev) =>
      prev.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks.map((task) => {
              if (task.id === taskId && !task.completed) {
                toast({
                  title: "任务完成",
                  description: `恭喜获得 ${task.points} 积分`,
                })
                return { ...task, completed: true }
              }
              return task
            }),
          }
        }
        return category
      })
    )
  }

  /**
   * 处理任务跳转
   */
  const handleTaskAction = (taskId: string) => {
    switch (taskId) {
      case "checkin":
        navigate("checkin")
        break
      case "post":
        navigate("ai-photo-diary")
        break
      case "add_friend":
        navigate("social")
        break
      case "join_group":
        navigate("social")
        break
      case "new_spot":
        navigate("planning")
        break
      default:
        handleCompleteTask("daily", taskId)
    }
  }

  const { completed, total } = calculateCompletedTasks()
  const totalPoints = calculateTotalPoints()
  const progressPercent = (completed / total) * 100

  return (
    <div className="pb-16 bg-white dark:bg-gray-950">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-base font-semibold ml-2 text-gray-800 dark:text-gray-200">每日任务</h1>
        </div>
      </div>

      {/* 任务进度卡片 */}
      <div className="p-4">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-medium text-gray-800 dark:text-gray-200">今日进度</h2>
              <p className="text-sm text-gray-500">
                {completed}/{total} 个任务
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-orange-500">
                <Zap size={16} className="mr-1" />
                <span className="text-xl font-semibold">{totalPoints}</span>
              </div>
              <p className="text-xs text-gray-500">积分</p>
            </div>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
          <p className="text-xs mt-2 text-gray-500">
            完成所有任务可额外获得 50 积分
          </p>
        </div>
      </div>

      {/* 任务列表 */}
      <div className="px-4 space-y-5">
        {taskCategories.map((category) => (
          <div key={category.id}>
            {/* 分类标题 */}
            <div className="flex items-center mb-2.5">
              <span className="text-gray-500">{category.icon}</span>
              <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200 ml-2">{category.title}</h3>
              <span className="ml-2 text-xs text-gray-400">
                {category.tasks.filter((t) => t.completed).length}/{category.tasks.length}
              </span>
            </div>

            {/* 任务卡片列表 */}
            <div className="space-y-2">
              {category.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-xl ${
                    task.completed
                      ? "bg-gray-100 dark:bg-gray-800/50"
                      : "bg-gray-50 dark:bg-gray-900"
                  }`}
                >
                  <div className="flex items-center">
                    {/* 任务图标 */}
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        task.completed
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      {task.completed ? (
                        <CheckCircle2 size={18} className="text-green-500" />
                      ) : (
                        <span className="text-gray-500">{task.icon}</span>
                      )}
                    </div>

                    {/* 任务信息 */}
                    <div className="flex-1 ml-3 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`font-medium text-sm ${
                            task.completed
                              ? "text-gray-400 line-through"
                              : "text-gray-800 dark:text-gray-200"
                          }`}
                        >
                          {task.title}
                        </h4>
                        <span className={`text-xs ${task.completed ? "text-gray-400" : "text-orange-500"}`}>
                          +{task.points}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {task.description}
                      </p>

                      {/* 进度条（如果有） */}
                      {task.maxProgress && !task.completed && (
                        <div className="mt-1.5">
                          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                            <span>{task.progress}/{task.maxProgress}</span>
                          </div>
                          <Progress
                            value={((task.progress || 0) / task.maxProgress) * 100}
                            className="h-1"
                          />
                        </div>
                      )}
                    </div>

                    {/* 操作按钮 */}
                    {!task.completed && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="ml-2 text-xs h-7 text-gray-500"
                        onClick={() => handleTaskAction(task.id)}
                      >
                        去完成
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 底部提示 */}
      <div className="p-4 mt-4">
        <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <CardContent className="p-3 flex items-center">
            <Gift size={20} className="text-amber-500 mr-2" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                每日任务每天0点重置
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400">
                成就任务完成后永久有效
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

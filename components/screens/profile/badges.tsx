"use client"

import { useState } from "react"
import { ArrowLeft, Search, Lock, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { userService } from "@/lib/services/user-service"
// import type { Badge as BadgeType } from "@/lib/services/user-service"

interface BadgesProps {
  goBack: () => void
}

export function Badges({ goBack }: BadgesProps) {
  const [activeTab, setActiveTab] = useState("earned")
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<string | null>(null)
  // const [badgeStats, setBadgeStats] = useState<any>(null)

  // 模拟徽章数据
  const earnedBadges = [
    {
      id: "badge1",
      name: "旅行达人",
      icon: "🏆",
      description: "完成10条不同的旅行路线",
      earnedDate: "2023-10-15",
      level: 2,
      maxLevel: 3,
      progress: 100,
      category: "旅行",
      color: "bg-amber-500",
    },
    {
      id: "badge2",
      name: "摄影爱好者",
      icon: "📸",
      description: "在旅行中拍摄并上传100张照片",
      earnedDate: "2023-09-20",
      level: 1,
      maxLevel: 3,
      progress: 100,
      category: "摄影",
      color: "bg-blue-500",
    },
    {
      id: "badge3",
      name: "美食家",
      icon: "🍜",
      description: "品尝并评价20种不同的当地美食",
      earnedDate: "2023-08-05",
      level: 1,
      maxLevel: 3,
      progress: 100,
      category: "美食",
      color: "bg-red-500",
    },
    {
      id: "badge4",
      name: "社交蝴蝶",
      icon: "🦋",
      description: "与10位不同的旅行伙伴一起出行",
      earnedDate: "2023-07-10",
      level: 1,
      maxLevel: 3,
      progress: 100,
      category: "社交",
      color: "bg-purple-500",
    },
    {
      id: "badge5",
      name: "探险家",
      icon: "🧭",
      description: "完成5条探险类路线",
      earnedDate: "2023-06-18",
      level: 1,
      maxLevel: 3,
      progress: 100,
      category: "探险",
      color: "bg-green-500",
    },
  ]

  const inProgressBadges = [
    {
      id: "badge6",
      name: "城市漫游者",
      icon: "🏙️",
      description: "在10个不同的城市完成旅行",
      progress: 80,
      currentValue: 8,
      targetValue: 10,
      category: "旅行",
      color: "bg-cyan-500",
    },
    {
      id: "badge7",
      name: "文化探索者",
      icon: "🏛️",
      description: "参观15个文化或历史景点",
      progress: 60,
      currentValue: 9,
      targetValue: 15,
      category: "文化",
      color: "bg-yellow-500",
    },
    {
      id: "badge8",
      name: "自然爱好者",
      icon: "🌳",
      description: "完成8条自然风光类路线",
      progress: 75,
      currentValue: 6,
      targetValue: 8,
      category: "自然",
      color: "bg-emerald-500",
    },
    {
      id: "badge9",
      name: "长途跋涉",
      icon: "👣",
      description: "累计旅行距离达到100公里",
      progress: 85,
      currentValue: 85,
      targetValue: 100,
      category: "旅行",
      color: "bg-orange-500",
    },
  ]

  const lockedBadges = [
    {
      id: "badge10",
      name: "环球旅行家",
      icon: "🌍",
      description: "在3个不同的国家完成旅行",
      requirement: "需要在3个不同的国家完成旅行",
      category: "旅行",
      color: "bg-indigo-500",
    },
    {
      id: "badge11",
      name: "美食评论家",
      icon: "🍽️",
      description: "发表50条美食评论",
      requirement: "需要发表50条美食评论",
      category: "美食",
      color: "bg-pink-500",
    },
    {
      id: "badge12",
      name: "旅行作家",
      icon: "✍️",
      description: "发布20篇旅行日记",
      requirement: "需要发布20篇旅行日记",
      category: "创作",
      color: "bg-violet-500",
    },
    {
      id: "badge13",
      name: "徒步达人",
      icon: "🥾",
      description: "完成总长度超过50公里的徒步路线",
      requirement: "需要完成总长度超过50公里的徒步路线",
      category: "运动",
      color: "bg-lime-500",
    },
    {
      id: "badge14",
      name: "摄影大师",
      icon: "📷",
      description: "获得500个照片点赞",
      requirement: "需要获得500个照片点赞",
      category: "摄影",
      color: "bg-sky-500",
    },
    {
      id: "badge15",
      name: "夜游专家",
      icon: "🌃",
      description: "完成10条夜间旅行路线",
      requirement: "需要完成10条夜间旅行路线",
      category: "旅行",
      color: "bg-slate-500",
    },
  ]

  type BadgeType = (typeof earnedBadges)[0] | (typeof inProgressBadges)[0] | (typeof lockedBadges)[0]

  // 后端API调用 - 获取徽章列表
  /* 
  const fetchBadges = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // 获取不同状态的徽章
      const earned = await userService.getBadges({ status: 'earned' })
      const inProgress = await userService.getBadges({ status: 'progress' })
      const locked = await userService.getBadges({ status: 'locked' })
      
      // 更新状态
      setEarnedBadges(earned)
      setInProgressBadges(inProgress)
      setLockedBadges(locked)
    } catch (error) {
      console.error("获取徽章失败", error)
      setError("获取徽章失败，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }
  */

  // 后端API调用 - 获取徽章统计数据
  /* 
  const fetchBadgeStats = async () => {
    try {
      const stats = await userService.getBadgeStats()
      setBadgeStats(stats)
    } catch (error) {
      console.error("获取徽章统计数据失败", error)
    }
  }
  */

  // 后端API调用 - 获取徽章详情
  /* 
  const fetchBadgeDetail = async (badgeId: string) => {
    try {
      const badgeDetail = await userService.getBadgeDetail(badgeId)
      setSelectedBadge(badgeDetail)
      setIsDialogOpen(true)
    } catch (error) {
      console.error("获取徽章详情失败", error)
      setError("获取徽章详情失败，请稍后重试")
    }
  }
  */

  // 后端API调用 - 分享徽章
  /* 
  const shareBadge = async (badgeId: string, platform: string) => {
    try {
      await userService.shareBadge(badgeId, platform)
      // 显示分享成功提示
    } catch (error) {
      console.error("分享徽章失败", error)
    }
  }
  */

  // 组件挂载时加载数据
  /* 
  useEffect(() => {
    fetchBadges()
    fetchBadgeStats()
  }, [])
  */

  // 搜索徽章
  /* 
  const handleSearch = async (searchText: string) => {
    try {
      setIsLoading(true)
      
      // 根据当前选中的标签页决定搜索哪种状态的徽章
      const status = activeTab === 'earned' ? 'earned' : 
                    activeTab === 'progress' ? 'progress' : 'locked'
      
      const results = await userService.getBadges({ 
        status, 
        searchText 
      })
      
      // 更新对应标签页的徽章列表
      if (activeTab === 'earned') {
        setEarnedBadges(results)
      } else if (activeTab === 'progress') {
        setInProgressBadges(results)
      } else {
        setLockedBadges(results)
      }
    } catch (error) {
      console.error("搜索徽章失败", error)
    } finally {
      setIsLoading(false)
    }
  }
  */

  const handleBadgeClick = (badge: BadgeType) => {
    // 如果使用后端API，则调用fetchBadgeDetail(badge.id)
    // fetchBadgeDetail(badge.id)

    // 使用模拟数据，直接设置选中的徽章
    setSelectedBadge(badge)
    setIsDialogOpen(true)
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">我的徽章</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="搜索徽章"
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          // onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* 错误提示 */}
      {/* {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">
          {error}
        </div>
      )} */}

      {/* 加载状态 */}
      {/* {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )} */}

      <Tabs defaultValue="earned" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="earned">已获得 ({earnedBadges.length})</TabsTrigger>
          <TabsTrigger value="progress">进行中 ({inProgressBadges.length})</TabsTrigger>
          <TabsTrigger value="locked">未解锁 ({lockedBadges.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="earned" className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {earnedBadges.map((badge) => (
              <Card
                key={badge.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleBadgeClick(badge)}
              >
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <div
                    className={`w-12 h-12 rounded-full ${badge.color} text-white flex items-center justify-center text-2xl mb-2`}
                  >
                    {badge.icon}
                  </div>
                  <h3 className="font-medium text-sm">{badge.name}</h3>
                  <div className="mt-1 text-xs text-gray-500">
                    Lv.{badge.level}/{badge.maxLevel}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {inProgressBadges.map((badge) => (
              <Card
                key={badge.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleBadgeClick(badge)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full ${badge.color} text-white flex items-center justify-center text-xl mr-3`}
                    >
                      {badge.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-sm">{badge.name}</h3>
                        <span className="text-xs text-gray-500">
                          {badge.currentValue}/{badge.targetValue}
                        </span>
                      </div>
                      <Progress value={badge.progress} className="h-1.5 mt-1" />
                      <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="locked" className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {lockedBadges.map((badge) => (
              <Card
                key={badge.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow bg-gray-50"
                onClick={() => handleBadgeClick(badge)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center text-xl mr-3 relative`}
                    >
                      {badge.icon}
                      <Lock size={12} className="absolute bottom-0 right-0 bg-gray-500 rounded-full p-1" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-sm">{badge.name}</h3>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{badge.requirement}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-700 mb-2">徽章统计</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{earnedBadges.length}</div>
            <div className="text-xs text-gray-500">已获得</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{inProgressBadges.length}</div>
            <div className="text-xs text-gray-500">进行中</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {earnedBadges.length + inProgressBadges.length + lockedBadges.length}
            </div>
            <div className="text-xs text-gray-500">总徽章</div>
          </div>
        </div>
      </div>

      {/* 徽章详情对话框 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>徽章详情</DialogTitle>
          </DialogHeader>
          {selectedBadge && (
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-20 h-20 rounded-full ${
                  "color" in selectedBadge ? selectedBadge.color : "bg-gray-300"
                } text-white flex items-center justify-center text-4xl mb-4`}
              >
                {selectedBadge.icon}
                {"progress" in selectedBadge && selectedBadge.progress < 100 && (
                  <div className="absolute w-20 h-20">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="8" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="white"
                        strokeWidth="8"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * selectedBadge.progress) / 100}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                )}
                {"requirement" in selectedBadge && (
                  <Lock size={16} className="absolute bottom-0 right-0 bg-gray-500 rounded-full p-1" />
                )}
              </div>
              <h2 className="text-xl font-bold mb-1">{selectedBadge.name}</h2>
              {"level" in selectedBadge && (
                <Badge className="mb-2">
                  等级 {selectedBadge.level}/{selectedBadge.maxLevel}
                </Badge>
              )}
              <p className="text-gray-600 mb-4">{selectedBadge.description}</p>

              {"earnedDate" in selectedBadge && (
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <CheckCircle size={16} className="mr-2 text-green-500" />
                  获得于 {selectedBadge.earnedDate}
                </div>
              )}

              {"progress" in selectedBadge && selectedBadge.progress < 100 && (
                <div className="w-full mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>进度</span>
                    <span>
                      {selectedBadge.currentValue}/{selectedBadge.targetValue}
                    </span>
                  </div>
                  <Progress value={selectedBadge.progress} className="h-2" />
                </div>
              )}

              {"requirement" in selectedBadge && (
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Info size={16} className="mr-2 text-blue-500" />
                  {selectedBadge.requirement}
                </div>
              )}

              <div className="mt-2">
                <Badge variant="outline">{selectedBadge.category}</Badge>
              </div>

              {/* 分享按钮 */}
              {/* {"id" in selectedBadge && "earnedDate" in selectedBadge && (
                <div className="mt-4 flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => shareBadge(selectedBadge.id, 'wechat')}
                  >
                    分享到微信
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => shareBadge(selectedBadge.id, 'weibo')}
                  >
                    分享到微博
                  </Button>
                </div>
              )} */}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

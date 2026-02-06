"use client"

import { useState } from "react"
import { ArrowLeft, Search, Lock, CheckCircle, Info, Trophy, Star, Share2, Crown, Flame, Target, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import type { Screen } from "@/lib/navigation-types"

interface BadgesProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function Badges({ goBack, navigate }: BadgesProps) {
  const [activeTab, setActiveTab] = useState("earned")
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)

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

  // 成就排行榜数据
  const leaderboard = [
    { rank: 1, name: "旅行大神", avatar: "/images/mock/avatar_male_1.png", badges: 45, level: 28 },
    { rank: 2, name: "探索达人", avatar: "/images/mock/avatar_female_1.png", badges: 42, level: 26 },
    { rank: 3, name: "摄影高手", avatar: "/images/mock/avatar_male_2.png", badges: 38, level: 24 },
    { rank: 4, name: "美食猎人", avatar: "/images/mock/avatar_female_2.png", badges: 35, level: 22 },
    { rank: 5, name: "我", avatar: "/images/mock/avatar_male_1.png", badges: 5, level: 8, isMe: true },
  ]

  // 稀有成就数据
  const rareBadges = [
    { id: "rare1", name: "传奇旅行家", icon: "👑", rarity: "传说", holders: 12, description: "完成100条不同路线", color: "bg-gradient-to-r from-yellow-400 to-orange-500" },
    { id: "rare2", name: "环球探险家", icon: "🌍", rarity: "史诗", holders: 58, description: "在10个国家完成旅行", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { id: "rare3", name: "摄影大师", icon: "📷", rarity: "稀有", holders: 156, description: "获得10000个照片点赞", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  ]

  // 成就挑战数据
  const challenges = [
    { id: "ch1", name: "周末探索者", description: "本周末完成3个景点打卡", reward: "探索徽章", progress: 1, target: 3, deadline: "2天后截止", icon: "🎯" },
    { id: "ch2", name: "美食品鉴家", description: "本月品尝10种当地美食", reward: "美食徽章升级", progress: 6, target: 10, deadline: "15天后截止", icon: "🍜" },
    { id: "ch3", name: "社交达人", description: "邀请3位好友一起旅行", reward: "社交蝴蝶徽章", progress: 2, target: 3, deadline: "7天后截止", icon: "🦋" },
  ]

  const handleBadgeClick = (badge: BadgeType) => {
    setSelectedBadge(badge)
    setIsDialogOpen(true)
  }

  // 分享徽章
  const handleShareBadge = () => {
    setShowShareDialog(true)
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-xl font-bold">成就中心</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={handleShareBadge}>
          <Share2 size={18} />
        </Button>
      </div>

      {/* 成就挑战区域 */}
      <Card className="mb-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-none">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Flame size={20} className="text-orange-500 mr-2" />
              <h3 className="font-semibold">限时挑战</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-orange-500 h-auto p-0">
              全部 <ChevronRight size={16} />
            </Button>
          </div>
          <div className="space-y-3">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{challenge.icon}</span>
                    <div>
                      <h4 className="font-medium text-sm">{challenge.name}</h4>
                      <p className="text-xs text-gray-500">{challenge.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50 text-xs">
                    {challenge.deadline}
                  </Badge>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>进度 {challenge.progress}/{challenge.target}</span>
                    <span className="text-orange-500">奖励: {challenge.reward}</span>
                  </div>
                  <Progress value={(challenge.progress / challenge.target) * 100} className="h-1.5" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 稀有成就展示 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Crown size={20} className="text-yellow-500 mr-2" />
            <h3 className="font-semibold">稀有成就</h3>
          </div>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {rareBadges.map((badge) => (
            <Card key={badge.id} className="min-w-[140px] overflow-hidden">
              <CardContent className="p-3 text-center">
                <div className={`w-14 h-14 rounded-full ${badge.color} text-white flex items-center justify-center text-3xl mx-auto mb-2`}>
                  {badge.icon}
                </div>
                <h4 className="font-medium text-sm">{badge.name}</h4>
                <Badge variant="outline" className="mt-1 text-xs">
                  {badge.rarity}
                </Badge>
                <p className="text-xs text-gray-500 mt-1">{badge.holders}人拥有</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 成就排行榜 */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Trophy size={20} className="text-yellow-500 mr-2" />
              <h3 className="font-semibold">成就排行榜</h3>
            </div>
            <Badge variant="secondary">本周</Badge>
          </div>
          <div className="space-y-3">
            {leaderboard.map((user, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded-lg ${user.isMe ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                    user.rank === 1 ? 'bg-yellow-400 text-white' :
                    user.rank === 2 ? 'bg-gray-300 text-white' :
                    user.rank === 3 ? 'bg-orange-400 text-white' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {user.rank}
                  </div>
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className={`text-sm font-medium ${user.isMe ? 'text-blue-600' : ''}`}>
                      {user.name} {user.isMe && '(我)'}
                    </span>
                    <div className="text-xs text-gray-500">Lv.{user.level}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{user.badges}</div>
                  <div className="text-xs text-gray-500">徽章</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="搜索徽章"
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

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
              {"earnedDate" in selectedBadge && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={handleShareBadge}
                >
                  <Share2 size={14} className="mr-1" />
                  分享徽章
                </Button>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 分享对话框 */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>分享成就</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4 py-4">
            <Button variant="ghost" className="flex flex-col items-center h-auto py-3" onClick={() => setShowShareDialog(false)}>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl mb-1">
                微
              </div>
              <span className="text-xs">微信</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center h-auto py-3" onClick={() => setShowShareDialog(false)}>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl mb-1">
                Q
              </div>
              <span className="text-xs">QQ</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center h-auto py-3" onClick={() => setShowShareDialog(false)}>
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-xl mb-1">
                微
              </div>
              <span className="text-xs">微博</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center h-auto py-3" onClick={() => setShowShareDialog(false)}>
              <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center text-white text-xl mb-1">
                链
              </div>
              <span className="text-xs">复制链接</span>
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>取消</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

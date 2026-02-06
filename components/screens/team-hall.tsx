"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Users,
  MapPin,
  Calendar,
  Clock,
  Plus,
  MessageCircle,
  UserPlus,
  Search,
  Filter,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { Screen } from "@/lib/navigation-types"

/**
 * 组队大厅页面Props接口
 */
interface TeamHallProps {
  goBack: () => void
  navigate: (screen: Screen, params?: Record<string, any>) => void
}

/**
 * 组队信息接口定义
 */
interface TeamItem {
  id: string
  title: string
  destination: string
  date: string
  time: string
  currentMembers: number
  maxMembers: number
  creator: {
    id: string
    name: string
    avatar: string
    level: number
  }
  members: Array<{
    id: string
    name: string
    avatar: string
  }>
  description: string
  tags: string[]
  status: "recruiting" | "full" | "departed"
  createdAt: string
}

/**
 * 组队大厅页面组件
 * 提供发起组队、加入队伍、组队聊天等功能
 */
export function TeamHall({ goBack, navigate }: TeamHallProps) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<TeamItem | null>(null)

  // 创建组队表单状态
  const [newTeam, setNewTeam] = useState({
    title: "",
    destination: "",
    date: "",
    time: "",
    maxMembers: "4",
    description: "",
  })

  // 组队列表数据
  const [teams] = useState<TeamItem[]>([
    {
      id: "team1",
      title: "周末千岛湖自驾游",
      destination: "千岛湖",
      date: "2026-02-08",
      time: "08:00",
      currentMembers: 3,
      maxMembers: 5,
      creator: {
        id: "user1",
        name: "旅行达人",
        avatar: "/images/mock/avatar_male_1.png",
        level: 5,
      },
      members: [
        { id: "user1", name: "旅行达人", avatar: "/images/mock/avatar_male_1.png" },
        { id: "user2", name: "小红", avatar: "/images/mock/avatar_female_1.png" },
        { id: "user3", name: "阿明", avatar: "/images/mock/avatar_male_2.png" },
      ],
      description: "计划周末自驾去千岛湖，预计两天一夜，住湖边民宿，一起看日出",
      tags: ["自驾", "周末", "摄影"],
      status: "recruiting",
      createdAt: "2026-02-05 10:30",
    },
    {
      id: "team2",
      title: "西湖徒步摄影",
      destination: "西湖",
      date: "2026-02-09",
      time: "06:30",
      currentMembers: 4,
      maxMembers: 4,
      creator: {
        id: "user4",
        name: "摄影爱好者",
        avatar: "/images/mock/avatar_female_2.png",
        level: 4,
      },
      members: [
        { id: "user4", name: "摄影爱好者", avatar: "/images/mock/avatar_female_2.png" },
        { id: "user5", name: "小李", avatar: "/images/mock/avatar_male_1.png" },
        { id: "user6", name: "小王", avatar: "/images/mock/avatar_female_1.png" },
        { id: "user7", name: "小张", avatar: "/images/mock/avatar_male_2.png" },
      ],
      description: "早起拍西湖日出，沿苏堤徒步，带上相机一起记录美景",
      tags: ["徒步", "摄影", "早起"],
      status: "full",
      createdAt: "2026-02-04 15:20",
    },
    {
      id: "team3",
      title: "灵隐寺祈福之旅",
      destination: "灵隐寺",
      date: "2026-02-10",
      time: "09:00",
      currentMembers: 2,
      maxMembers: 6,
      creator: {
        id: "user8",
        name: "文化探索者",
        avatar: "/images/mock/avatar_male_2.png",
        level: 3,
      },
      members: [
        { id: "user8", name: "文化探索者", avatar: "/images/mock/avatar_male_2.png" },
        { id: "user9", name: "小美", avatar: "/images/mock/avatar_female_2.png" },
      ],
      description: "一起去灵隐寺祈福，感受千年古刹的宁静，中午品尝素斋",
      tags: ["文化", "祈福", "素食"],
      status: "recruiting",
      createdAt: "2026-02-05 08:00",
    },
    {
      id: "team4",
      title: "美食探店小分队",
      destination: "杭州市区",
      date: "2026-02-07",
      time: "11:30",
      currentMembers: 5,
      maxMembers: 5,
      creator: {
        id: "user10",
        name: "美食猎人",
        avatar: "/images/mock/avatar_female_1.png",
        level: 6,
      },
      members: [
        { id: "user10", name: "美食猎人", avatar: "/images/mock/avatar_female_1.png" },
        { id: "user11", name: "吃货A", avatar: "/images/mock/avatar_male_1.png" },
        { id: "user12", name: "吃货B", avatar: "/images/mock/avatar_female_2.png" },
        { id: "user13", name: "吃货C", avatar: "/images/mock/avatar_male_2.png" },
        { id: "user14", name: "吃货D", avatar: "/images/mock/avatar_female_1.png" },
      ],
      description: "探索杭州隐藏美食，计划去3家网红店打卡",
      tags: ["美食", "探店", "网红"],
      status: "departed",
      createdAt: "2026-02-03 20:00",
    },
  ])

  /**
   * 获取状态标签样式
   */
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "recruiting":
        return { label: "招募中", color: "bg-green-500" }
      case "full":
        return { label: "已满员", color: "bg-amber-500" }
      case "departed":
        return { label: "已出发", color: "bg-gray-500" }
      default:
        return { label: "未知", color: "bg-gray-500" }
    }
  }

  /**
   * 筛选组队列表
   */
  const filteredTeams = teams.filter(
    (team) =>
      team.title.includes(searchQuery) ||
      team.destination.includes(searchQuery) ||
      team.tags.some((tag) => tag.includes(searchQuery))
  )

  /**
   * 处理申请加入
   */
  const handleJoinTeam = (team: TeamItem) => {
    if (team.status === "full") {
      toast({
        title: "队伍已满",
        description: "该队伍已满员，请选择其他队伍",
        variant: "destructive",
      })
      return
    }

    if (team.status === "departed") {
      toast({
        title: "队伍已出发",
        description: "该队伍已经出发，无法加入",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "申请已发送",
      description: "已向队长发送加入申请，请等待审核",
    })
    setShowDetailDialog(false)
  }

  /**
   * 处理创建组队
   */
  const handleCreateTeam = () => {
    if (!newTeam.title || !newTeam.destination || !newTeam.date) {
      toast({
        title: "信息不完整",
        description: "请填写完整的组队信息",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "创建成功",
      description: "组队已创建，等待其他玩家加入",
    })
    setShowCreateDialog(false)
    setNewTeam({
      title: "",
      destination: "",
      date: "",
      time: "",
      maxMembers: "4",
      description: "",
    })
  }

  /**
   * 打开组队详情
   */
  const openTeamDetail = (team: TeamItem) => {
    setSelectedTeam(team)
    setShowDetailDialog(true)
  }

  /**
   * 渲染组队卡片
   */
  const renderTeamCard = (team: TeamItem) => {
    const statusInfo = getStatusBadge(team.status)

    return (
      <Card
        key={team.id}
        className="cursor-pointer active:scale-[0.99] transition-transform"
        onClick={() => openTeamDetail(team)}
      >
        <CardContent className="p-4">
          {/* 标题和状态 */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-bold text-base">{team.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin size={14} className="mr-1" />
                <span>{team.destination}</span>
              </div>
            </div>
            <Badge className={`${statusInfo.color} text-white border-0`}>
              {statusInfo.label}
            </Badge>
          </div>

          {/* 时间信息 */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Calendar size={14} className="mr-1" />
            <span>{team.date}</span>
            <Clock size={14} className="ml-3 mr-1" />
            <span>{team.time}</span>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-1 mb-3">
            {team.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* 成员信息 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {team.members.slice(0, 4).map((member, index) => (
                  <Avatar key={member.id} className="h-8 w-8 border-2 border-white">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                ))}
                {team.members.length > 4 && (
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs border-2 border-white">
                    +{team.members.length - 4}
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-500 ml-2">
                {team.currentMembers}/{team.maxMembers}人
              </span>
            </div>

            <Button size="sm" variant="outline">
              查看详情
              <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="pb-16">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={goBack}>
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-bold ml-2">组队大厅</h1>
          </div>
          <Button size="sm" onClick={() => setShowCreateDialog(true)}>
            <Plus size={16} className="mr-1" />
            发起组队
          </Button>
        </div>
      </div>

      {/* 搜索栏 */}
      <div className="p-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="搜索目的地、标签..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 组队列表 */}
      <div className="px-4">
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="recruiting">招募中</TabsTrigger>
            <TabsTrigger value="my">我的组队</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredTeams.map(renderTeamCard)}
            {filteredTeams.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                暂无符合条件的组队
              </div>
            )}
          </TabsContent>

          <TabsContent value="recruiting" className="space-y-4">
            {filteredTeams
              .filter((t) => t.status === "recruiting")
              .map(renderTeamCard)}
          </TabsContent>

          <TabsContent value="my" className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              <Users size={48} className="mx-auto mb-4 text-gray-300" />
              <p>您还没有参与任何组队</p>
              <Button
                className="mt-4"
                onClick={() => setShowCreateDialog(true)}
              >
                发起组队
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 创建组队弹窗 */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>发起组队</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">组队标题</label>
              <Input
                placeholder="例如：周末西湖徒步"
                value={newTeam.title}
                onChange={(e) =>
                  setNewTeam({ ...newTeam, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">目的地</label>
              <Input
                placeholder="例如：西湖、千岛湖"
                value={newTeam.destination}
                onChange={(e) =>
                  setNewTeam({ ...newTeam, destination: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">出发日期</label>
                <Input
                  type="date"
                  value={newTeam.date}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">出发时间</label>
                <Input
                  type="time"
                  value={newTeam.time}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, time: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">人数上限</label>
              <Select
                value={newTeam.maxMembers}
                onValueChange={(value) =>
                  setNewTeam({ ...newTeam, maxMembers: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2人</SelectItem>
                  <SelectItem value="3">3人</SelectItem>
                  <SelectItem value="4">4人</SelectItem>
                  <SelectItem value="5">5人</SelectItem>
                  <SelectItem value="6">6人</SelectItem>
                  <SelectItem value="8">8人</SelectItem>
                  <SelectItem value="10">10人</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">组队描述</label>
              <Textarea
                placeholder="描述一下你的旅行计划..."
                value={newTeam.description}
                onChange={(e) =>
                  setNewTeam({ ...newTeam, description: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              取消
            </Button>
            <Button onClick={handleCreateTeam}>创建组队</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 组队详情弹窗 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-md">
          {selectedTeam && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTeam.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* 基本信息 */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <MapPin size={16} className="mr-2 text-gray-500" />
                    <span>{selectedTeam.destination}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <span>{selectedTeam.date} {selectedTeam.time}</span>
                  </div>
                </div>

                {/* 描述 */}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedTeam.description}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-1">
                  {selectedTeam.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* 队长信息 */}
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedTeam.creator.avatar}
                      alt={selectedTeam.creator.name}
                    />
                    <AvatarFallback>
                      {selectedTeam.creator.name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center">
                      <span className="font-medium">
                        {selectedTeam.creator.name}
                      </span>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Lv.{selectedTeam.creator.level}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">队长</span>
                  </div>
                  <Button size="sm" variant="outline">
                    <MessageCircle size={14} className="mr-1" />
                    私信
                  </Button>
                </div>

                {/* 成员列表 */}
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    队员 ({selectedTeam.currentMembers}/{selectedTeam.maxMembers})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeam.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-full pr-3"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm ml-2">{member.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDetailDialog(false)}
                >
                  取消
                </Button>
                <Button
                  className="flex-1"
                  disabled={selectedTeam.status !== "recruiting"}
                  onClick={() => handleJoinTeam(selectedTeam)}
                >
                  <UserPlus size={16} className="mr-1" />
                  {selectedTeam.status === "recruiting"
                    ? "申请加入"
                    : selectedTeam.status === "full"
                    ? "已满员"
                    : "已出发"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

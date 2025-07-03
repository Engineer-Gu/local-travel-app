"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Users,
  Calendar,
  MessageCircle,
  Share2,
  Bell,
  BellOff,
  Send,
  Smile,
  ImageIcon,
  Paperclip,
  ChevronRight,
  MapPin,
  Info,
  Search,
  X,
  Phone,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

// Add these imports at the top of the file (commented out)
// import { userService } from "@/lib/services/user-service"

interface GroupDetailProps {
  goBack: () => void
  group?: {
    id: string
    name: string
    image: string
    members: number
    description: string
    createdAt: string
    owner: {
      id: string
      name: string
      avatar: string
    }
    activities: {
      title: string
      date: string
      location: string
      participants: number
      maxParticipants?: number
      image?: string
      description?: string
    }[]
  }
}

interface Message {
  id: string
  sender: {
    id: string
    name: string
    avatar: string
  }
  content: string
  time: string
  type: "text" | "image" | "emoji"
  replyTo?: {
    id: string
    name: string
    content: string
  }
}

interface GroupMember {
  id: string
  name: string
  avatar: string
  role: "owner" | "admin" | "member"
  joinTime: string
  active: boolean
  tags?: string[]
}

interface Action {
  name: string
  description: string
}

export function GroupDetail({ goBack, group }: GroupDetailProps) {
  const [joined, setJoined] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [activeTab, setActiveTab] = useState("activities")
  const [pendingApproval, setPendingApproval] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [showActivityDetail, setShowActivityDetail] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [showGroupInfo, setShowGroupInfo] = useState(false)
  const [searchMember, setSearchMember] = useState("")
  const [replyTo, setReplyTo] = useState<{ id: string; name: string; content: string } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLInputElement>(null)

  // 如果没有传入群组数据，使用默认数据
  const groupData = group || {
    id: "group1",
    name: "西湖摄影爱好者",
    image: "/placeholder.svg?height=200&width=200&text=西湖摄影爱好者",
    members: 128,
    description:
      "这是一个专注于西湖风景摄影的爱好者群组。我们定期组织摄影活动，分享摄影技巧和作品，欢迎所有热爱摄影的朋友加入！",
    createdAt: "2023-01-15",
    owner: {
      id: "user1",
      name: "张摄影",
      avatar: "/placeholder.svg?height=40&width=40&text=张",
    },
    activities: [
      {
        title: "西湖日出摄影",
        date: "2023-12-15 05:30",
        location: "断桥残雪",
        participants: 15,
        maxParticipants: 20,
        image: "/placeholder.svg?height=200&width=400&text=西湖日出",
        description:
          "一起来捕捉西湖日出的绝美瞬间，请携带三脚架和长焦镜头，我们将在断桥残雪集合，然后一起前往最佳拍摄点。活动结束后将组织作品点评和交流。",
      },
      {
        title: "雷峰塔夕阳拍摄",
        date: "2023-12-20 16:00",
        location: "雷峰塔",
        participants: 12,
        maxParticipants: 15,
        image: "/placeholder.svg?height=200&width=400&text=雷峰塔夕阳",
        description:
          "雷峰塔在夕阳下的剪影是西湖十景之一，我们将在最佳时间和角度捕捉这一美景。活动包括构图指导和后期修图技巧分享。",
      },
      {
        title: "冬季西湖全景",
        date: "2023-12-25 09:00",
        location: "宝石山",
        participants: 20,
        maxParticipants: 30,
        image: "/placeholder.svg?height=200&width=400&text=西湖全景",
        description:
          "登上宝石山俯瞰整个西湖，拍摄冬季西湖全景。活动包括全景拼接技术讲解和实践，请携带广角镜头和足够的存储卡。",
      },
    ],
  }

  const emojis = [
    "😊",
    "😂",
    "❤️",
    "👍",
    "🎉",
    "🌟",
    "🔥",
    "👋",
    "🙏",
    "🤔",
    "😍",
    "🥰",
    "😎",
    "🤩",
    "😢",
    "😭",
    "😡",
    "🥳",
    "🎁",
    "🌈",
  ]

  // 模拟群组成员
  const groupMembers: GroupMember[] = [
    {
      id: "user1",
      name: "张摄影",
      avatar: "/placeholder.svg?height=40&width=40&text=张",
      role: "owner",
      joinTime: "2023-01-15",
      active: true,
      tags: ["群主", "摄影达人", "风景摄影"],
    },
    {
      id: "user2",
      name: "李光影",
      avatar: "/placeholder.svg?height=40&width=40&text=李",
      role: "admin",
      joinTime: "2023-01-20",
      active: true,
      tags: ["管理员", "人像摄影"],
    },
    {
      id: "user3",
      name: "王构图",
      avatar: "/placeholder.svg?height=40&width=40&text=王",
      role: "member",
      joinTime: "2023-02-05",
      active: true,
      tags: ["构图专家"],
    },
    {
      id: "user4",
      name: "赵镜头",
      avatar: "/placeholder.svg?height=40&width=40&text=赵",
      role: "member",
      joinTime: "2023-02-10",
      active: false,
      tags: ["器材控"],
    },
    ...Array.from({ length: 20 }).map((_, i) => ({
      id: `user${i + 5}`,
      name: `成员${i + 1}`,
      avatar: `/placeholder.svg?height=40&width=40&text=${i + 1}`,
      role: "member" as const,
      joinTime: "2023-03-01",
      active: Math.random() > 0.5,
    })),
  ]

  // 模拟群组消息
  const defaultMessages: Message[] = [
    {
      id: "1",
      sender: {
        id: "user1",
        name: "张摄影",
        avatar: "/placeholder.svg?height=40&width=40&text=张",
      },
      content: "大家好，我是群主张摄影，欢迎加入西湖摄影爱好者群组！",
      time: "昨天 14:30",
      type: "text",
    },
    {
      id: "2",
      sender: {
        id: "user2",
        name: "李光影",
        avatar: "/placeholder.svg?height=40&width=40&text=李",
      },
      content: "很高兴认识大家，我是专注风景摄影的爱好者，期待一起交流学习！",
      time: "昨天 15:45",
      type: "text",
    },
    {
      id: "3",
      sender: {
        id: "user3",
        name: "王构图",
        avatar: "/placeholder.svg?height=40&width=40&text=王",
      },
      content: "我带了一些之前在西湖拍摄的照片分享给大家",
      time: "昨天 16:20",
      type: "text",
    },
    {
      id: "4",
      sender: {
        id: "user3",
        name: "王构图",
        avatar: "/placeholder.svg?height=40&width=40&text=王",
      },
      content: "/placeholder.svg?height=300&width=400&text=西湖照片",
      time: "昨天 16:21",
      type: "image",
    },
    {
      id: "5",
      sender: {
        id: "user4",
        name: "赵镜头",
        avatar: "/placeholder.svg?height=40&width=40&text=赵",
      },
      content: "这张照片构图很不错，请问用的什么镜头？😍",
      time: "昨天 16:25",
      type: "text",
    },
    {
      id: "6",
      sender: {
        id: "user3",
        name: "王构图",
        avatar: "/placeholder.svg?height=40&width=40&text=王",
      },
      content: "谢谢，用的是24-70mm F2.8，光圈F8，快门1/125",
      time: "昨天 16:30",
      type: "text",
      replyTo: {
        id: "user4",
        name: "赵镜头",
        content: "这张照片构图很不错，请问用的什么镜头？😍",
      },
    },
    {
      id: "7",
      sender: {
        id: "user1",
        name: "张摄影",
        avatar: "/placeholder.svg?height=40&width=40&text=张",
      },
      content: "我们下周的西湖日出活动还有5个名额，有兴趣的朋友可以报名参加！",
      time: "昨天 17:10",
      type: "text",
    },
  ]

  useEffect(() => {
    if (showChat && messages.length === 0) {
      setMessages(defaultMessages)
    }
  }, [showChat])

  useEffect(() => {
    if (showChat) {
      scrollToBottom()
    }
  }, [messages, showChat])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Add these functions inside the GroupDetail component (commented out)
  /*
    // 获取群组详情
    const fetchGroupDetails = async () => {
      try {
        setIsLoading(true)
        const groupData = await api.get(`/social/groups/${groupId}`)
        setGroup(groupData)
        setIsLoading(false)
      } catch (error) {
        console.error('获取群组详情失败', error)
        toast({
          title: "获取群组详情失败",
          description: "请稍后重试",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    // 加入群组
    const handleJoinGroup = async () => {
      try {
        await api.post(`/social/groups/${groupId}/join`)
        toast({
          title: "已加入群组",
        })
        fetchGroupDetails() // 刷新群组详情
      } catch (error) {
        console.error('加入群组失败', error)
        toast({
          title: "加入失败",
          description: "请稍后重试",
          variant: "destructive",
        })
      }
    }

    // 退出群组
    const handleLeaveGroup = async () => {
      try {
        await api.post(`/social/groups/${groupId}/leave`)
        toast({
          title: "已退出群组",
        })
        navigate("social")
      } catch (error) {
        console.error('退出群组失败', error)
        toast({
          title: "退出失败",
          description: "请稍后重试",
          variant: "destructive",
        })
      }
    }

    // 邀请好友加入群组
    const handleInviteFriend = async (friendId: string) => {
      try {
        await api.post(`/social/groups/${groupId}/invite`, { userId: friendId })
        toast({
          title: "邀请已发送",
        })
      } catch (error) {
        console.error('邀请好友失败', error)
        toast({
          title: "邀请失败",
          description: "请稍后重试",
          variant: "destructive",
        })
      }
    }

    // 获取群组成员
    const fetchGroupMembers = async () => {
      try {
        const members = await api.get(`/social/groups/${groupId}/members`)
        setMembers(members)
      } catch (error) {
        console.error('获取群组成员失败', error)
      }
    }

    // 获取群组活动
    const fetchGroupEvents = async () => {
      try {
        const events = await api.get(`/social/groups/${groupId}/events`)
        setEvents(events)
      } catch (error) {
        console.error('获取群组活动失败', error)
      }
    }
  */

  const handleJoinGroup = () => {
    if (joined) {
      setJoined(false)
      setPendingApproval(false)
      toast({
        title: "已退出群组",
        description: `您已成功退出"${groupData.name}"群组`,
      })
    } else {
      setPendingApproval(true)
      toast({
        title: "申请已提交",
        description: "您的加入申请已提交，等待管理员审核",
      })

      // 模拟3秒后审核通过
      setTimeout(() => {
        setPendingApproval(false)
        setJoined(true)
        toast({
          title: "申请已通过",
          description: `您已成功加入"${groupData.name}"群组`,
        })
      }, 3000)
    }
  }

  const toggleNotifications = () => {
    setNotifications(!notifications)
    toast({
      title: notifications ? "已关闭通知" : "已开启通知",
      description: notifications ? "您将不再收到此群组的通知" : "您将收到此群组的新消息和活动通知",
    })
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const now = new Date()
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`

    const message: Message = {
      id: Date.now().toString(),
      sender: {
        id: "me",
        name: "我",
        avatar: "/placeholder.svg?height=40&width=40&text=我",
      },
      content: newMessage,
      time: "刚刚",
      type: "text",
      replyTo: replyTo || undefined,
    }

    setMessages([...messages, message])
    setNewMessage("")
    setReplyTo(null)
  }

  const handleEmojiClick = (emoji: string) => {
    // 将表情插入到输入框中的当前光标位置
    const input = messageInputRef.current
    if (input) {
      const start = input.selectionStart || 0
      const end = input.selectionEnd || 0
      const newValue = newMessage.substring(0, start) + emoji + newMessage.substring(end)
      setNewMessage(newValue)

      // 聚焦回输入框并设置光标位置
      setTimeout(() => {
        input.focus()
        input.setSelectionRange(start + emoji.length, start + emoji.length)
      }, 10)
    } else {
      // 如果没有获取到输入框引用，就直接添加到末尾
      setNewMessage(newMessage + emoji)
    }
    setShowEmojiPicker(false)
  }

  const handleImageUpload = () => {
    imageInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const message: Message = {
        id: Date.now().toString(),
        sender: {
          id: "me",
          name: "我",
          avatar: "/placeholder.svg?height=40&width=40&text=我",
        },
        content: URL.createObjectURL(e.target.files[0]),
        time: "刚刚",
        type: "image",
        replyTo: replyTo || undefined,
      }

      setMessages([...messages, message])
      setReplyTo(null)

      // 重置input以便再次选择同一文件
      if (imageInputRef.current) {
        imageInputRef.current.value = ""
      }
    }
  }

  const handleActivityClick = (activity: any) => {
    setSelectedActivity(activity)
    setShowActivityDetail(true)
  }

  const handleJoinActivity = () => {
    if (!selectedActivity) return

    toast({
      title: "报名成功",
      description: `您已成功报名参加"${selectedActivity.title}"活动`,
    })

    setShowActivityDetail(false)
  }

  const handleAvatarClick = (message: Message) => {
    // 设置回复对象
    setReplyTo({
      id: message.sender.id,
      name: message.sender.name,
      content:
        message.content.length > 20
          ? message.type === "text"
            ? message.content.substring(0, 20) + "..."
            : "[图片]"
          : message.content,
    })

    // 聚焦到输入框
    messageInputRef.current?.focus()
  }

  const cancelReply = () => {
    setReplyTo(null)
  }

  const filteredMembers = groupMembers.filter((member) =>
    member.name.toLowerCase().includes(searchMember.toLowerCase()),
  )

  // 渲染群组聊天
  const renderGroupChat = () => {
    return (
      <div className="flex flex-col h-full">
        {/* 聊天头部 */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => setShowChat(false)}>
              <ArrowLeft size={20} />
            </Button>
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={groupData.image || "/placeholder.svg"} alt={groupData.name} />
                <AvatarFallback>{groupData.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <h3 className="font-medium">{groupData.name}</h3>
                <p className="text-xs text-gray-500">{groupData.members}人</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => toast({ title: "语音通话" })}>
              <Phone size={18} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => toast({ title: "视频通话" })}>
              <Video size={18} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowGroupInfo(true)}>
              <Info size={18} />
            </Button>
          </div>
        </div>

        {/* 聊天内容 */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex flex-col">
                <div className="flex items-start">
                  <Avatar className="h-8 w-8 mr-2 cursor-pointer" onClick={() => handleAvatarClick(message)}>
                    <AvatarImage src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.name} />
                    <AvatarFallback>{message.sender.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{message.sender.name}</span>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>

                    {/* 回复消息 */}
                    {message.replyTo && (
                      <div className="bg-gray-100 rounded p-2 mb-2 text-xs text-gray-600 border-l-2 border-blue-400">
                        <div className="font-medium">{message.replyTo.name}</div>
                        <div className="truncate">{message.replyTo.content}</div>
                      </div>
                    )}

                    <div className="bg-white rounded-lg p-3 inline-block max-w-[85%]">
                      {message.type === "text" && <p>{message.content}</p>}
                      {message.type === "emoji" && <p className="text-2xl">{message.content}</p>}
                      {message.type === "image" && (
                        <img
                          src={message.content || "/placeholder.svg"}
                          alt="Shared image"
                          className="rounded-md max-w-full max-h-60 object-contain cursor-pointer"
                          onClick={() => toast({ title: "查看大图" })}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* 输入框 */}
        <div className="p-3 border-t border-gray-200 bg-white">
          {/* 回复提示 */}
          {replyTo && (
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2">
              <div className="flex items-center text-sm">
                <span className="text-gray-500 mr-1">回复</span>
                <span className="font-medium">{replyTo.name}:</span>
                <span className="ml-1 text-gray-600 truncate max-w-[200px]">{replyTo.content}</span>
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={cancelReply}>
                <X size={14} />
              </Button>
            </div>
          )}

          <div className="flex items-center">
            <div className="flex space-x-1 mr-2">
              <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Smile size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2">
                  <div className="grid grid-cols-5 gap-2">
                    {emojis.map((emoji, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="h-10 w-10 p-0 text-xl"
                        onClick={() => handleEmojiClick(emoji)}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <Button variant="ghost" size="icon" onClick={handleImageUpload}>
                <ImageIcon size={20} />
                <input
                  type="file"
                  ref={imageInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>

              <Button variant="ghost" size="icon">
                <Paperclip size={20} />
              </Button>
            </div>
            <Input
              ref={messageInputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="输入消息..."
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ""}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // 渲染群组详情
  const renderGroupInfo = () => {
    return (
      <Dialog open={showGroupInfo} onOpenChange={setShowGroupInfo}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>群组详情</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* 群组基本信息 */}
            <div className="flex flex-col items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={groupData.image || "/placeholder.svg"} alt={groupData.name} />
                <AvatarFallback>{groupData.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold mt-2">{groupData.name}</h2>
              <p className="text-sm text-gray-500">群号: {groupData.id}</p>
              <p className="text-sm text-gray-500">创建于 {groupData.createdAt}</p>
            </div>

            <div className="border-t pt-3">
              <h3 className="font-medium mb-2">群组介绍</h3>
              <p className="text-sm text-gray-600">{groupData.description}</p>
            </div>

            {/* 群组成员搜索 */}
            <div className="border-t pt-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">群组成员 ({groupMembers.length})</h3>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜索成员"
                    className="pl-8 h-8 w-40"
                    value={searchMember}
                    onChange={(e) => setSearchMember(e.target.value)}
                  />
                </div>
              </div>

              {/* 群主和管理员 */}
              <div className="mb-2">
                <h4 className="text-xs text-gray-500 mb-1">群主和管理员</h4>
                <div className="space-y-2">
                  {filteredMembers
                    .filter((member) => member.role === "owner" || member.role === "admin")
                    .map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium text-sm">{member.name}</span>
                              {member.role === "owner" && (
                                <Badge className="ml-1 text-xs" variant="secondary">
                                  群主
                                </Badge>
                              )}
                              {member.role === "admin" && (
                                <Badge className="ml-1 text-xs" variant="outline">
                                  管理员
                                </Badge>
                              )}
                            </div>
                            {member.tags && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {member.tags.map((tag, i) => (
                                  <span key={i} className="text-xs bg-gray-100 px-1 rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <span
                          className={`w-2 h-2 rounded-full ${member.active ? "bg-green-500" : "bg-gray-300"}`}
                        ></span>
                      </div>
                    ))}
                </div>
              </div>

              {/* 普通成员 */}
              <div>
                <h4 className="text-xs text-gray-500 mb-1">成员</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredMembers
                    .filter((member) => member.role === "member")
                    .map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-medium text-sm">{member.name}</span>
                            {member.tags && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {member.tags.map((tag, i) => (
                                  <span key={i} className="text-xs bg-gray-100 px-1 rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <span
                          className={`w-2 h-2 rounded-full ${member.active ? "bg-green-500" : "bg-gray-300"}`}
                        ></span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* 群组管理选项 */}
            <div className="border-t pt-3">
              <h3 className="font-medium mb-2">群组管理</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "群组公告" })}>
                  查看群公告
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "群组文件" })}>
                  群文件 (24)
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "群组相册" })}>
                  群相册 (156)
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-500" onClick={handleJoinGroup}>
                  {joined ? "退出群组" : "加入群组"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // 渲染活动详情
  const renderActivityDetail = () => {
    if (!selectedActivity) return null

    const participationRate = (selectedActivity.participants / (selectedActivity.maxParticipants || 1)) * 100

    return (
      <Dialog open={showActivityDetail} onOpenChange={setShowActivityDetail}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedActivity.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img
              src={selectedActivity.image || "/placeholder.svg"}
              alt={selectedActivity.title}
              className="w-full h-48 object-cover rounded-md"
            />

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Calendar size={16} className="mr-2 text-gray-500" />
                <span>{selectedActivity.date}</span>
              </div>

              <div className="flex items-center text-sm">
                <MapPin size={16} className="mr-2 text-gray-500" />
                <span>{selectedActivity.location}</span>
              </div>

              <div className="flex items-center text-sm">
                <Users size={16} className="mr-2 text-gray-500" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span>参与人数</span>
                    <span>
                      {selectedActivity.participants}/{selectedActivity.maxParticipants}
                    </span>
                  </div>
                  <Progress value={participationRate} className="h-2" />
                </div>
              </div>

              <div className="pt-2">
                <h4 className="font-medium mb-1">活动详情</h4>
                <p className="text-sm text-gray-600">{selectedActivity.description}</p>
              </div>

              <div className="pt-2">
                <h4 className="font-medium mb-1">参与者</h4>
                <div className="flex -space-x-2 overflow-hidden">
                  {Array.from({ length: Math.min(5, selectedActivity.participants) }).map((_, i) => (
                    <Avatar key={i} className="h-8 w-8 border-2 border-white">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${i + 1}`} />
                      <AvatarFallback>用户</AvatarFallback>
                    </Avatar>
                  ))}
                  {selectedActivity.participants > 5 && (
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 border-2 border-white text-xs">
                      +{selectedActivity.participants - 5}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleJoinActivity} className="w-full">
              报名参加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // 如果显示聊天界面
  if (showChat) {
    return (
      <>
        {renderGroupChat()}
        {renderGroupInfo()}
      </>
    )
  }

  return (
    <div className="pb-16">
      {/* 头部图片 */}
      <div className="relative h-48">
        <img src={groupData.image || "/placeholder.svg"} alt={groupData.name} className="w-full h-full object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-white/70 hover:bg-white/90 rounded-full"
          onClick={goBack}
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/70 hover:bg-white/90"
            onClick={toggleNotifications}
          >
            {notifications ? <Bell size={18} /> : <BellOff size={18} />}
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full bg-white/70 hover:bg-white/90">
            <Share2 size={18} />
          </Button>
        </div>
      </div>

      {/* 群组信息 */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{groupData.name}</h1>
          <Badge className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            {groupData.members}人
          </Badge>
        </div>

        <p className="text-gray-600 mt-2">{groupData.description}</p>

        <div className="mt-4">
          {pendingApproval ? (
            <Button variant="outline" className="w-full" disabled>
              审核中...
            </Button>
          ) : joined ? (
            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1" onClick={handleJoinGroup}>
                退出群组
              </Button>
              <Button className="flex-1" onClick={() => setShowChat(true)}>
                <MessageCircle size={16} className="mr-2" />
                发消息
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowGroupInfo(true)}>
                <Info size={16} className="mr-2" />
                详情
              </Button>
            </div>
          ) : (
            <Button className="w-full" onClick={handleJoinGroup}>
              加入群组
            </Button>
          )}
        </div>
      </div>

      <div className="px-4">
        <Tabs defaultValue="activities" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activities">活动</TabsTrigger>
            <TabsTrigger value="members">成员</TabsTrigger>
            <TabsTrigger value="photos">照片</TabsTrigger>
          </TabsList>

          <TabsContent value="activities" className="mt-4 space-y-4">
            {(groupData.activities || []).map((activity, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-32 overflow-hidden">
                  <img
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{activity.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Calendar size={14} className="mr-1" />
                    <span>{activity.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin size={14} className="mr-1" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <Badge variant="outline" className="flex items-center">
                      <Users size={12} className="mr-1" />
                      {activity.participants}/{activity.maxParticipants || "不限"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-500 p-0 h-auto"
                      onClick={() => handleActivityClick(activity)}
                    >
                      查看详情 <ChevronRight size={16} />
                    </Button>
                  </div>
                  <Button
                    className="w-full mt-3"
                    onClick={() => {
                      toast({
                        title: "报名成功",
                        description: `您已成功报名参加"${activity.title}"活动`,
                      })
                    }}
                  >
                    报名参加
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="members" className="mt-4 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">群组成员</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowGroupInfo(true)}>
                查看全部
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {groupMembers.slice(0, 8).map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Avatar className="h-14 w-14 relative">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                    {member.role === "owner" && (
                      <span className="absolute -bottom-1 -right-1 bg-yellow-500 text-white text-[10px] rounded-full px-1">
                        主
                      </span>
                    )}
                    {member.role === "admin" && (
                      <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-[10px] rounded-full px-1">
                        管
                      </span>
                    )}
                  </Avatar>
                  <span className="text-xs mt-1 text-center">{member.name}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full" onClick={() => setShowGroupInfo(true)}>
              查看全部 {groupData.members} 位成员
            </Button>
          </TabsContent>

          <TabsContent value="photos" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="aspect-square">
                  <img
                    src={`/placeholder.svg?height=120&width=120&text=照片${index + 1}`}
                    alt={`照片${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              查看全部照片
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      {/* 活动详情对话框 */}
      {renderActivityDetail()}

      {/* 群组详情对话框 */}
      {renderGroupInfo()}
    </div>
  )
}

const Actions = () => {
  return (
    <>
      <Action name="添加群组搜索功能" description="实现搜索群组的功能" />
      <Action name="添加群组创建功能" description="允许用户创建新的群组" />
      <Action name="优化群组活动管理" description="添加活动创建和编辑功能" />
      <Action name="实现群组消息通知" description="添加群组消息推送和提醒功能" />
      <Action name="添加群组权限管理" description="实现群组管理员权限设置功能" />
    </>
  )
}

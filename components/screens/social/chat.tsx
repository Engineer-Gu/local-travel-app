"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Send, ImageIcon, Smile, Paperclip, MoreVertical, Phone, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/hooks/use-toast"

// Add these imports at the top of the file (commented out)
// import { userService } from "@/lib/services/user-service"

interface Friend {
  id: string
  name: string
  avatar: string
}

interface ChatProps {
  friend: Friend
  goBack: () => void
}

interface Message {
  id: string
  sender: "user" | "friend"
  content: string
  time: string
  type?: "text" | "image" | "file"
  fileUrl?: string
  fileName?: string
}

export function Chat({ friend, goBack }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "friend",
      content: "你好，最近有什么旅行计划吗？",
      time: "10:30",
      type: "text",
    },
    {
      id: "2",
      sender: "user",
      content: "我正在计划周末去西湖玩，你有兴趣一起吗？",
      time: "10:32",
      type: "text",
    },
    {
      id: "3",
      sender: "friend",
      content: "听起来不错！我周末有空，可以详细说说你的计划吗？",
      time: "10:35",
      type: "text",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showCallDialog, setShowCallDialog] = useState(false)
  const [showVideoDialog, setShowVideoDialog] = useState(false)
  const [callType, setCallType] = useState<"audio" | "video">("audio")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const now = new Date()
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`

    const message: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      time,
      type: "text",
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const handleAudioCall = () => {
    setCallType("audio")
    setShowCallDialog(true)
  }

  const handleVideoCall = () => {
    setCallType("video")
    setShowVideoDialog(true)
  }

  const handleEndCall = () => {
    setShowCallDialog(false)
    setShowVideoDialog(false)
    toast({
      title: "通话已结束",
      description: `与${friend.name}的${callType === "audio" ? "语音" : "视频"}通话已结束`,
    })
  }

  const handleEmojiClick = (emoji: string) => {
    setNewMessage((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  const handleImageUpload = () => {
    imageInputRef.current?.click()
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const now = new Date()
      const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`

      const message: Message = {
        id: Date.now().toString(),
        sender: "user",
        content: "发送了一张图片",
        time,
        type: "image",
        fileUrl: URL.createObjectURL(e.target.files[0]),
        fileName: e.target.files[0].name,
      }

      setMessages([...messages, message])
      setShowImageUpload(false)

      // 重置input以便再次选择同一文件
      if (imageInputRef.current) {
        imageInputRef.current.value = ""
      }

      toast({
        title: "图片已发送",
        description: "图片已成功发送",
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const now = new Date()
      const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`

      const message: Message = {
        id: Date.now().toString(),
        sender: "user",
        content: "发送了一个文件",
        time,
        type: "file",
        fileUrl: "#",
        fileName: e.target.files[0].name,
      }

      setMessages([...messages, message])
      setShowFileUpload(false)

      // 重置input以便再次选择同一文件
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      toast({
        title: "文件已发送",
        description: `文件 "${e.target.files[0].name}" 已成功发送`,
      })
    }
  }

  // Add these functions inside the Chat component (commented out)
  /*
    // 获取聊天历史
    const fetchChatHistory = async () => {
      try {
        setIsLoading(true)
        const history = await api.get(`/social/chats/${chatId}/messages`)
        setMessages(history)
        setIsLoading(false)
      } catch (error) {
        console.error('获取聊天历史失败', error)
        setIsLoading(false)
      }
    }

    // 发送消息
    const sendMessage = async (content: string) => {
      try {
        const newMessage = await api.post(`/social/chats/${chatId}/messages`, { content })
        setMessages(prev => [...prev, newMessage])
        
        // 清空输入框
        setInputValue('')
      } catch (error) {
        console.error('发送消息失败', error)
        toast({
          title: "发送失败",
          description: "请稍后重试",
          variant: "destructive",
        })
      }
    }

    // 发送位置共享
    const shareLocation = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            await api.post(`/social/chats/${chatId}/share-location`, { latitude, longitude })
            toast({
              title: "位置已分享",
            })
          },
          (error) => {
            console.error('获取位置失败', error)
            toast({
              title: "获取位置失败",
              description: "请检查位置权限设置",
              variant: "destructive",
            })
          }
        )
      } catch (error) {
        console.error('分享位置失败', error)
      }
    }

    // 发送行程邀请
    const shareItinerary = async (itineraryId: string) => {
      try {
        await api.post(`/social/chats/${chatId}/share-itinerary`, { itineraryId })
        toast({
          title: "行程已分享",
        })
      } catch (error) {
        console.error('分享行程失败', error)
        toast({
          title: "分享失败",
          description: "请稍后重试",
          variant: "destructive",
        })
      }
    }

    // 标记消息为已读
    const markAsRead = async () => {
      try {
        await api.post(`/social/chats/${chatId}/read`)
      } catch (error) {
        console.error('标记已读失败', error)
      }
    }
  */

  if (!friend) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full">
        <p>聊天不存在</p>
        <Button onClick={goBack} className="mt-4">
          返回
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* 聊天头部 */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2" onClick={goBack}>
            <ArrowLeft size={20} />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
            <AvatarFallback>{friend.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <h3 className="font-medium">{friend.name}</h3>
            <p className="text-xs text-gray-500">在线</p>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" onClick={handleAudioCall}>
            <Phone size={18} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleVideoCall}>
            <Video size={18} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast({ title: "查看聊天记录" })}>查看聊天记录</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "清空聊天记录" })}>清空聊天记录</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "举报" })}>举报</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "加入黑名单" })}>加入黑名单</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 聊天内容 */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              {message.sender === "friend" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                  <AvatarFallback>{friend.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {message.type === "text" && <p>{message.content}</p>}

                {message.type === "image" && (
                  <div className="mb-2">
                    <img
                      src={message.fileUrl || "/placeholder.svg"}
                      alt="Shared image"
                      className="rounded-md max-w-full max-h-60 object-contain cursor-pointer"
                      onClick={() => toast({ title: "查看大图" })}
                    />
                  </div>
                )}

                {message.type === "file" && (
                  <div className="flex items-center bg-opacity-20 bg-black rounded p-2 mb-2">
                    <Paperclip size={16} className={message.sender === "user" ? "text-white" : "text-gray-600"} />
                    <span className="ml-2 text-sm truncate max-w-[200px]">{message.fileName}</span>
                  </div>
                )}

                <div className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                  {message.time}
                </div>
              </div>
              {message.sender === "user" && (
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarImage src="/placeholder.svg?height=32&width=32&text=我" alt="我" />
                  <AvatarFallback>我</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入框 */}
      <div className="p-3 border-t border-gray-200 bg-white">
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
              <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            </Button>

            <Button variant="ghost" size="icon" onClick={handleFileUpload}>
              <Paperclip size={20} />
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
            </Button>
          </div>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
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

      {/* 语音通话对话框 */}
      <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>语音通话</DialogTitle>
            <DialogDescription>正在与 {friend.name} 进行语音通话...</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
              <AvatarFallback>{friend.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <p className="text-lg font-medium mb-2">{friend.name}</p>
            <p className="text-sm text-gray-500 mb-6">通话中...</p>
            <div className="flex space-x-4">
              <Button variant="destructive" onClick={handleEndCall}>
                结束通话
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 视频通话对话框 */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>视频通话</DialogTitle>
            <DialogDescription>正在与 {friend.name} 进行视频通话...</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-full aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                <AvatarFallback>{friend.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="w-24 h-24 bg-gray-800 rounded-lg self-end absolute bottom-20 right-6 flex items-center justify-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64&text=我" alt="我" />
                <AvatarFallback>我</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex space-x-4 mt-8">
              <Button variant="destructive" onClick={handleEndCall}>
                结束通话
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

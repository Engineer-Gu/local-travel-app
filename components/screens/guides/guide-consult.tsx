"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Send, ImageIcon, Smile, Paperclip, Phone, Video, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/hooks/use-toast"

interface Guide {
  id: string
  name: string
  avatar: string
  specialties: string[]
}

interface GuideConsultProps {
  guide: Guide
  goBack: () => void
}

interface Message {
  id: string
  sender: "user" | "guide"
  content: string
  time: string
  type?: "text" | "image" | "file"
  fileUrl?: string
  fileName?: string
}

export function GuideConsult({ guide, goBack }: GuideConsultProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "guide",
      content: "您好，我是您的专业导游，有什么可以帮助您的吗？",
      time: "10:30",
      type: "text",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [showCallDialog, setShowCallDialog] = useState(false)
  const [showVideoDialog, setShowVideoDialog] = useState(false)
  const [callType, setCallType] = useState<"audio" | "video">("audio")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
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

    // 模拟导游回复
    setTimeout(() => {
      const guideReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "guide",
        content: "感谢您的咨询！我会尽快为您提供专业的建议和服务方案。",
        time: `${now.getHours()}:${(now.getMinutes() + 1).toString().padStart(2, "0")}`,
        type: "text",
      }
      setMessages((prev) => [...prev, guideReply])
    }, 1000)
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
      description: `与导游${guide.name}的${callType === "audio" ? "语音" : "视频"}通话已结束`,
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

      // 重置input以便再次选择同一文件
      if (imageInputRef.current) {
        imageInputRef.current.value = ""
      }

      toast({
        title: "图片已发送",
        description: "图片已成功发送给导游",
      })

      // 模拟导游回复
      setTimeout(() => {
        const guideReply: Message = {
          id: (Date.now() + 1).toString(),
          sender: "guide",
          content: "收到您的图片，这是一个很好的参考。",
          time: `${now.getHours()}:${(now.getMinutes() + 1).toString().padStart(2, "0")}`,
          type: "text",
        }
        setMessages((prev) => [...prev, guideReply])
      }, 1500)
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

      // 重置input以便再次选择同一文件
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      toast({
        title: "文件已发送",
        description: `文件 "${e.target.files[0].name}" 已成功发送给导游`,
      })

      // 模拟导游回复
      setTimeout(() => {
        const guideReply: Message = {
          id: (Date.now() + 1).toString(),
          sender: "guide",
          content: "已收到您的文件，我会尽快查看并给您回复。",
          time: `${now.getHours()}:${(now.getMinutes() + 1).toString().padStart(2, "0")}`,
          type: "text",
        }
        setMessages((prev) => [...prev, guideReply])
      }, 1500)
    }
  }

  if (!guide) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full">
        <p>导游不存在</p>
        <Button onClick={goBack} className="mt-4">
          返回
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* 导游咨询头部 */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2" onClick={goBack}>
            <ArrowLeft size={20} />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src={guide.avatar || "/placeholder.svg"} alt={guide.name} />
            <AvatarFallback>{guide.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <h3 className="font-medium">{guide.name}</h3>
            <div className="flex">
              {guide.specialties.slice(0, 1).map((specialty, i) => (
                <Badge key={i} variant="secondary" className="text-xs mr-1">
                  {specialty}
                </Badge>
              ))}
              {guide.specialties.length > 1 && (
                <span className="text-xs text-gray-500">等{guide.specialties.length}项专长</span>
              )}
            </div>
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
              <DropdownMenuItem onClick={() => toast({ title: "查看导游详情" })}>查看导游详情</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "查看聊天记录" })}>查看聊天记录</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "投诉导游" })}>投诉导游</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "收藏导游" })}>收藏导游</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 咨询内容 */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              {message.sender === "guide" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={guide.avatar || "/placeholder.svg"} alt={guide.name} />
                  <AvatarFallback>{guide.name.slice(0, 2)}</AvatarFallback>
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
            placeholder="输入咨询内容..."
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
            <DialogTitle>与专业导游通话</DialogTitle>
            <DialogDescription>正在与导游 {guide.name} 进行语音通话...</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={guide.avatar || "/placeholder.svg"} alt={guide.name} />
              <AvatarFallback>{guide.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <p className="text-lg font-medium mb-2">{guide.name}</p>
            <div className="flex flex-wrap justify-center gap-1 mb-4">
              {guide.specialties.map((specialty, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-6">专业导游通话中...</p>
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
            <DialogTitle>与专业导游视频</DialogTitle>
            <DialogDescription>正在与导游 {guide.name} 进行视频通话...</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-full aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={guide.avatar || "/placeholder.svg"} alt={guide.name} />
                <AvatarFallback>{guide.name.slice(0, 2)}</AvatarFallback>
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

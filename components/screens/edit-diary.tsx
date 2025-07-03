"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Calendar, ImageIcon, Send, Smile, Trash2, X, Globe, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface EditDiaryProps {
  goBack: () => void
  navigate: (screen: string, params?: Record<string, any>) => void
  diary?: any
}

export function EditDiary({ goBack, navigate, diary }: EditDiaryProps) {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [images, setImages] = useState<string[]>([])

  // 初始化表单数据
  useEffect(() => {
    if (diary) {
      setTitle(diary.title || "")
      setContent(diary.content || "")
      setLocation(diary.location || "")
      setDate(diary.date || new Date().toISOString().split("T")[0])
      setIsPublic(diary.isPublic !== undefined ? diary.isPublic : true)
      setImages(diary.images || [])
    } else {
      // 新建日记时设置默认日期为今天
      setDate(new Date().toISOString().split("T")[0])
    }
  }, [diary])

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "标题不能为空",
        description: "请输入日记标题",
      })
      return
    }

    if (!content.trim()) {
      toast({
        title: "内容不能为空",
        description: "请输入日记内容",
      })
      return
    }

    toast({
      title: diary ? "日记已更新" : "日记已保存",
      description: diary ? "您的旅行日记已成功更新" : "您的旅行日记已成功保存",
    })

    // 保存后返回日记详情页
    if (diary) {
      navigate("diary-detail", { diaryId: diary.id })
    } else {
      navigate("travel-diary")
    }
  }

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "无法发布",
        description: "请确保标题和内容不为空",
      })
      return
    }

    toast({
      title: "发布成功",
      description: "您的旅行日记已成功发布",
    })
    navigate("travel-diary")
  }

  const handleAddImage = () => {
    // 模拟添加图片
    const newImage = `/placeholder.svg?height=400&width=600&text=新图片${images.length + 1}`
    setImages([...images, newImage])
    toast({
      title: "图片已添加",
      description: "您可以继续添加更多图片",
    })
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
    toast({
      title: "图片已删除",
      description: "图片已从日记中移除",
    })
  }

  const handleAddLocation = () => {
    // 模拟选择位置
    setLocation("杭州西湖")
    toast({
      title: "位置已添加",
      description: "已选择杭州西湖作为位置",
    })
  }

  return (
    <div className="pb-16">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold ml-2">{diary ? "编辑日记" : "创建日记"}</h1>
        </div>
        <Button variant="default" onClick={handleSave}>
          保存
        </Button>
      </div>

      <div className="p-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* 标题输入 */}
            <div>
              <input
                type="text"
                placeholder="日记标题"
                className="w-full p-2 text-lg font-bold border-b focus:outline-none focus:border-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* 日期和位置 */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-gray-500" />
                <input
                  type="date"
                  className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-gray-500" />
                <div className="flex">
                  <input
                    type="text"
                    placeholder="添加位置"
                    className="p-1 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <Button variant="outline" size="sm" className="rounded-l-none" onClick={handleAddLocation}>
                    选择
                  </Button>
                </div>
              </div>
            </div>

            {/* 内容输入 */}
            <div>
              <textarea
                placeholder="写下您的旅行体验..."
                className="w-full p-3 border rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* 图片展示 */}
            {images.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">图片</h3>
                <div className="grid grid-cols-2 gap-2">
                  {images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`日记图片 ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 功能按钮 */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleAddImage}>
                <ImageIcon size={16} className="mr-2" />
                添加图片
              </Button>
              <Button variant="outline" size="sm" onClick={handleAddLocation}>
                <MapPin size={16} className="mr-2" />
                添加位置
              </Button>
              <Button variant="outline" size="sm">
                <Smile size={16} className="mr-2" />
                添加心情
              </Button>
            </div>

            {/* 隐私设置 */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center">
                {isPublic ? (
                  <Globe size={16} className="mr-2 text-blue-500" />
                ) : (
                  <Lock size={16} className="mr-2 text-gray-500" />
                )}
                <Label htmlFor="public-toggle" className="cursor-pointer">
                  {isPublic ? "公开" : "私密"}
                </Label>
              </div>
              <Switch id="public-toggle" checked={isPublic} onCheckedChange={setIsPublic} />
            </div>

            {/* 底部按钮 */}
            <div className="flex justify-between pt-4">
              {diary && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    toast({
                      title: "日记已删除",
                      description: "您的旅行日记已成功删除",
                    })
                    navigate("travel-diary")
                  }}
                >
                  <Trash2 size={16} className="mr-2" />
                  删除
                </Button>
              )}
              <div className={`${diary ? "" : "w-full"} flex justify-end gap-2`}>
                <Button variant="outline" onClick={goBack}>
                  取消
                </Button>
                <Button onClick={handlePublish}>
                  <Send size={16} className="mr-2" />
                  发布
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

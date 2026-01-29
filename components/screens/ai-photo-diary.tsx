"use client"

import { useState, useRef } from "react"
import { ArrowLeft, Camera, ImageIcon, Sparkles, MapPin, Calendar, Tag, Save, Trash, Edit, Check } from "lucide-react"
import { cameraService, hapticService } from "@/lib/mobile-services"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import type { Screen } from "@/components/mobile-app"

interface AIPhotoDiaryProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
  goBack: () => void
}

// 确保正确导出组件
export function AIPhotoDiary({ navigate, goBack }: AIPhotoDiaryProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState<"upload" | "generate" | "edit">("upload")
  const [photos, setPhotos] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [editingContent, setEditingContent] = useState("")

  // 处理文件选择 fallback for Web
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const photoData = event.target?.result as string
        if (photoData) {
          if (photos.length < 5) {
            setPhotos([...photos, photoData])
            toast({
              title: "照片已添加",
              description: `已添加第${photos.length + 1}张照片`,
            })
          } else {
            toast({
              title: "照片数量已达上限",
              description: "最多只能添加5张照片",
              variant: "destructive",
            })
          }
        }
      }
      reader.readAsDataURL(file)
    }
    // 重置 input value 以便下次还可以选择同一个文件
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // 拍照功能
  const handleTakePhoto = async () => {
    try {
      if (typeof window !== "undefined" && !window?.Capacitor?.isNative) {
        // Web 环境下直接调用文件选择器 (模拟拍照)
        if (fileInputRef.current) {
          fileInputRef.current.click()
        }
        return
      }

      await hapticService.impact("light")
      const photoData = await cameraService.takePhoto()

      if (photoData) {
        if (photos.length < 5) {
          setPhotos([...photos, photoData])
          toast({
            title: "照片已添加",
            description: `已添加第${photos.length + 1}张照片`,
          })
        } else {
          toast({
            title: "照片数量已达上限",
            description: "最多只能添加5张照片",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Camera error:", error)
      // Fallback
      if (fileInputRef.current) {
        fileInputRef.current.click()
      }
    }
  }

  // 选择相册照片
  const handlePickImage = async () => {
    try {
      if (typeof window !== "undefined" && !window?.Capacitor?.isNative) {
        // Web 环境下直接调用文件选择器
        if (fileInputRef.current) {
          fileInputRef.current.click()
        }
        return
      }

      await hapticService.impact("light")
      const photoData = await cameraService.pickImage()

      if (photoData) {
        if (photos.length < 5) {
          setPhotos([...photos, photoData])
          toast({
            title: "照片已添加",
            description: `已添加第${photos.length + 1}张照片`,
          })
        } else {
          toast({
            title: "照片数量已达上限",
            description: "最多只能添加5张照片",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Pick image error:", error)
      // Fallback
      if (fileInputRef.current) {
        fileInputRef.current.click()
      }
    }
  }

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos]
    newPhotos.splice(index, 1)
    setPhotos(newPhotos)

    toast({
      title: "照片已删除",
      description: "已删除选中的照片",
    })
  }

  const handleGenerate = () => {
    if (photos.length === 0) {
      toast({
        title: "请先添加照片",
        description: "至少需要添加一张照片才能生成日记",
      })
      return
    }

    setIsGenerating(true)

    // 模拟AI生成过程
    setTimeout(() => {
      // 模拟识别位置和日期
      setLocation("杭州西湖")
      setDate(new Date().toISOString().split("T")[0])

      // 模拟生成标签
      setTags(["西湖", "旅行", "风景", "春游"])

      // 模拟生成标题
      setTitle("西湖春日游记")

      // 模拟生成内容
      const mockContent =
        "今天是个阳光明媚的日子，我来到了杭州西湖。西湖的春天真是美不胜收，湖水清澈，柳树泛绿，花朵绽放。\n\n" +
        "漫步在苏堤上，感受微风拂面，看着远处的雷峰塔倒映在湖面上，仿佛时光静止。途经断桥，想起了白娘子与许仙的美丽传说。\n\n" +
        "中午在知味观品尝了正宗的西湖醋鱼和龙井虾仁，味道鲜美，回味无穷。下午去了灵隐寺，在这座千年古刹中感受佛教文化的庄严与神秘。\n\n" +
        "这次西湖之行，不仅欣赏了美景，也了解了丰富的历史文化，是一次难忘的旅行体验。"

      setGeneratedContent(mockContent)
      setEditingContent(mockContent)
      setIsGenerating(false)
      setStep("generate")

      toast({
        title: "日记生成成功",
        description: "AI已根据您的照片生成了旅行日记",
      })
    }, 3000)
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleStartEditing = () => {
    setStep("edit")
  }

  const handleSaveEditing = () => {
    setGeneratedContent(editingContent)
    setStep("generate")

    toast({
      title: "编辑已保存",
      description: "您的修改已成功保存",
    })
  }

  const handleSaveDiary = () => {
    toast({
      title: "日记已保存",
      description: "您的旅行日记已成功保存",
    })

    navigate("travel-diary")
  }

  const renderUploadStep = () => (
    <div>
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-medium mb-3">上传照片</h3>
          <p className="text-sm text-gray-500 mb-4">上传您的旅行照片，AI将自动识别景点并生成精美的旅行日记</p>

          {/* 照片预览区 */}
          {photos.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`上传的照片${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <Trash size={12} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* 上传按钮 */}
          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1" onClick={handleTakePhoto}>
              <Camera size={16} className="mr-2" />
              拍照
            </Button>
            <Button variant="outline" className="flex-1" onClick={handlePickImage}>
              <ImageIcon size={16} className="mr-2" />
              从相册选择
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" disabled={photos.length === 0 || isGenerating} onClick={handleGenerate}>
        {isGenerating ? (
          <>
            <Sparkles size={16} className="mr-2 animate-spin" />
            正在生成...
          </>
        ) : (
          <>
            <Sparkles size={16} className="mr-2" />
            AI生成日记
          </>
        )}
      </Button>
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
    </div>
  )

  const renderGenerateStep = () => (
    <div>
      {/* 生成的日记内容 */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <Button variant="ghost" size="sm" onClick={handleStartEditing}>
              <Edit size={16} className="mr-1" />
              编辑
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={14} className="mr-1" />
              <span>{date}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={14} className="mr-1" />
              <span>{location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
          {/* 照片展示 */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo || "/placeholder.svg"}
                alt={`旅行照片${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>

          {/* 日记内容 */}
          <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">{generatedContent}</div>
        </CardContent>
      </Card>

      {/* 底部按钮 */}
      <div className="flex space-x-2">
        <Button variant="outline" className="flex-1" onClick={() => setStep("upload")}>
          返回编辑
        </Button>
        <Button className="flex-1" onClick={handleSaveDiary}>
          <Save size={16} className="mr-2" />
          保存日记
        </Button>
      </div>
    </div>
  )

  const renderEditStep = () => (
    <div>
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-medium mb-3">编辑日记</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">标题</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="输入日记标题" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">位置</label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="输入位置" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">日期</label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">标签</label>
              <div className="flex flex-wrap gap-1 mb-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs flex items-center">
                    #{tag}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 p-0"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <Trash size={10} />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="添加标签"
                  className="rounded-r-none"
                />
                <Button className="rounded-l-none" onClick={handleAddTag}>
                  <Tag size={16} />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">日记内容</label>
              <Textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                placeholder="编辑日记内容"
                rows={10}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" onClick={handleSaveEditing}>
        <Check size={16} className="mr-2" />
        保存修改
      </Button>
    </div>
  )

  return (
    <div className="pb-16">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={goBack}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold ml-2">AI照片日记</h1>
      </div>

      {/* 主要内容 */}
      <div className="p-4">
        {step === "upload" && renderUploadStep()}
        {step === "generate" && renderGenerateStep()}
        {step === "edit" && renderEditStep()}
      </div>
    </div>
  )
}

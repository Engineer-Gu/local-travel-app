"use client"

import { useState } from "react"
import { ArrowLeft, Heart, MessageSquare, Share, MoreHorizontal, Send, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DiaryDetailProps {
  goBack: () => void
  navigate: (screen: string, params?: Record<string, any>) => void
  diaryId?: string
}

export function DiaryDetail({ goBack, navigate, diaryId }: DiaryDetailProps) {
  const { toast } = useToast()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(28)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState([
    {
      id: "1",
      user: {
        name: "旅行达人",
        avatar: "/placeholder.svg?height=40&width=40&text=旅行达人",
      },
      content: "西湖真的很美，我也去过几次，每次都有不同的感受。",
      time: "2023-05-15 14:30",
      likes: 5,
    },
    {
      id: "2",
      user: {
        name: "摄影师小王",
        avatar: "/placeholder.svg?height=40&width=40&text=摄影师小王",
      },
      content: "你拍的照片构图很好，请问用的什么相机？",
      time: "2023-05-15 15:45",
      likes: 3,
    },
    {
      id: "3",
      user: {
        name: "美食家",
        avatar: "/placeholder.svg?height=40&width=40&text=美食家",
      },
      content: "楼外楼的西湖醋鱼确实很赞，下次去一定要尝尝龙井虾仁。",
      time: "2023-05-16 09:20",
      likes: 2,
    },
  ])

  // 模拟日记数据
  const diary = {
    id: diaryId || "diary1",
    title: "西湖一日游",
    date: "2023-05-15",
    location: "杭州西湖",
    content:
      "今天游览了西湖，景色真的太美了！断桥残雪、平湖秋月、三潭印月，每个景点都让人流连忘返。中午在楼外楼品尝了正宗的西湖醋鱼和龙井虾仁，味道鲜美。下午去了灵隐寺祈福，感受了一下佛教文化的庄严肃穆。\n\n西湖十景中，我最喜欢的是三潭印月。站在小岛上，远眺湖面，波光粼粼，三座石塔倒映在水中，美不胜收。\n\n傍晚时分，在苏堤漫步，看夕阳西下，晚霞映照在湖面上，给人一种宁静致远的感觉。这次旅行真的很值得，下次有机会还要再来！",
    images: [
      "/placeholder.svg?height=400&width=600&text=西湖风景1",
      "/placeholder.svg?height=400&width=600&text=西湖风景2",
      "/placeholder.svg?height=400&width=600&text=西湖风景3",
      "/placeholder.svg?height=400&width=600&text=西湖风景4",
    ],
    user: {
      name: "旅行爱好者",
      avatar: "/placeholder.svg?height=40&width=40&text=旅行爱好者",
    },
    likes: likeCount,
    comments: comments.length,
    isPublic: true,
    isOwner: true,
  }

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
    toast({
      title: liked ? "已取消点赞" : "点赞成功",
      description: liked ? "您已取消对此日记的点赞" : "您已成功点赞此日记",
    })
  }

  const handleShare = () => {
    toast({
      title: "分享成功",
      description: "日记已分享到您的社交媒体",
    })
  }

  const handleEdit = () => {
    navigate("edit-diary", { diary })
  }

  const handleDelete = () => {
    toast({
      title: "删除成功",
      description: "您的日记已成功删除",
    })
    goBack()
  }

  const handleReport = () => {
    toast({
      title: "举报成功",
      description: "您的举报已提交，我们会尽快处理",
    })
  }

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: `${comments.length + 1}`,
        user: {
          name: "我",
          avatar: "/placeholder.svg?height=40&width=40&text=我",
        },
        content: commentText,
        time: new Date().toLocaleString(),
        likes: 0,
      }
      setComments([...comments, newComment])
      setCommentText("")
      toast({
        title: "评论成功",
        description: "您的评论已发布",
      })
    }
  }

  const handleLikeComment = (commentId: string) => {
    toast({
      title: "点赞成功",
      description: "您已成功点赞此评论",
    })
  }

  return (
    <div className="pb-16">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold ml-2">日记详情</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {diary.isOwner ? (
              <>
                <DropdownMenuItem onClick={handleEdit}>编辑日记</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-500">
                  删除日记
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={handleReport}>举报</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("profile", { userId: "user123" })}>
                  查看作者主页
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="p-4">
        {/* 日记头部 */}
        <div className="mb-4">
          <div className="flex items-center mb-3">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={diary.user.avatar || "/placeholder.svg"} alt={diary.user.name} />
              <AvatarFallback>{diary.user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{diary.user.name}</h3>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar size={12} className="mr-1" />
                <span className="mr-2">{diary.date}</span>
                <MapPin size={12} className="mr-1" />
                <span>{diary.location}</span>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2">{diary.title}</h2>
          {diary.isPublic && (
            <Badge variant="default" className="mb-3">
              公开
            </Badge>
          )}
        </div>

        {/* 日记内容 */}
        <div className="mb-6">
          {diary.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
              {paragraph}
            </p>
          ))}
        </div>

        {/* 图片展示 */}
        <div className="mb-6">
          {diary.images.map((img, index) => (
            <img
              key={index}
              src={img || "/placeholder.svg"}
              alt={`${diary.title} 图片 ${index + 1}`}
              className="w-full rounded-lg mb-3 object-cover"
            />
          ))}
        </div>

        {/* 互动按钮 */}
        <div className="flex justify-between py-3 border-t border-b mb-6">
          <Button variant="ghost" size="sm" onClick={handleLike} className={liked ? "text-red-500" : ""}>
            <Heart size={20} className={`mr-2 ${liked ? "fill-red-500" : ""}`} />
            {likeCount}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare size={20} className="mr-2" />
            {comments.length}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share size={20} className="mr-2" />
            分享
          </Button>
        </div>

        {/* 评论区 */}
        <div>
          <h3 className="font-semibold mb-4">评论 ({comments.length})</h3>

          {/* 评论输入框 */}
          <div className="flex mb-6">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder.svg?height=40&width=40&text=我" alt="我" />
              <AvatarFallback>我</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex">
              <input
                type="text"
                placeholder="写下你的评论..."
                className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitComment()
                  }
                }}
              />
              <Button className="rounded-l-none" onClick={handleSubmitComment}>
                <Send size={16} />
              </Button>
            </div>
          </div>

          {/* 评论列表 */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-semibold text-sm">{comment.user.name}</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-sm my-1">{comment.content}</p>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2"
                          onClick={() => handleLikeComment(comment.id)}
                        >
                          <Heart size={14} className="mr-1" />
                          <span className="text-xs">{comment.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <MessageSquare size={14} className="mr-1" />
                          <span className="text-xs">回复</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

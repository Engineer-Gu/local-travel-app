"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Heart, MessageCircle, Share, ChevronUp, ChevronDown, Music, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { Screen } from "@/components/mobile-app"

interface ShortVideosProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
  goBack: () => void
}

export function ShortVideos({ navigate, goBack }: ShortVideosProps) {
  const { toast } = useToast()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedVideos, setLikedVideos] = useState<string[]>([])
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState("")
  const [showShareOptions, setShowShareOptions] = useState(false)
  const videoRefs = useRef<(HTMLDivElement | null)[]>([])

  // 模拟视频数据
  const videos = [
    {
      id: "video1",
      user: {
        id: "user1",
        name: "旅行达人",
        avatar: "/placeholder.svg?height=40&width=40&text=旅行达人",
        isVerified: true,
      },
      description:
        "西湖十景之一：断桥残雪。每到冬季，这里的景色美不胜收，仿佛进入了童话世界。#西湖 #断桥残雪 #杭州旅行",
      location: "杭州·西湖",
      likes: 1256,
      comments: 89,
      shares: 45,
      music: "《梁祝》- 小提琴协奏曲",
      coverImage: "/placeholder.svg?height=600&width=400&text=西湖断桥视频",
    },
    {
      id: "video2",
      user: {
        id: "user2",
        name: "美食猎人",
        avatar: "/placeholder.svg?height=40&width=40&text=美食猎人",
        isVerified: false,
      },
      description:
        "杭州必吃！知味观的西湖醋鱼，酸甜可口，鱼肉鲜嫩。百年老店的味道，值得专程来品尝。#杭州美食 #西湖醋鱼 #知味观",
      location: "杭州·知味观",
      likes: 876,
      comments: 56,
      shares: 23,
      music: "《舌尖上的中国》- 主题曲",
      coverImage: "/placeholder.svg?height=600&width=400&text=杭州美食视频",
    },
    {
      id: "video3",
      user: {
        id: "user3",
        name: "背包客",
        avatar: "/placeholder.svg?height=40&width=40&text=背包客",
        isVerified: true,
      },
      description:
        "千岛湖的日出太震撼了！清晨的湖面平静如镜，阳光洒在水面上，金光闪闪。这里的空气真的超级好！#千岛湖 #日出 #自然风光",
      location: "千岛湖",
      likes: 2345,
      comments: 120,
      shares: 78,
      music: "《春江花月夜》- 古筝版",
      coverImage: "/placeholder.svg?height=600&width=400&text=千岛湖视频",
    },
  ]

  // 模拟评论数据
  const commentsData = [
    {
      id: "c1",
      user: "旅游爱好者",
      avatar: "/placeholder.svg?height=30&width=30",
      content: "太美了！我也想去这里",
      time: "2小时前",
      likes: 24,
    },
    {
      id: "c2",
      user: "摄影师小王",
      avatar: "/placeholder.svg?height=30&width=30",
      content: "构图很棒，光线处理得也很好",
      time: "3小时前",
      likes: 18,
    },
    {
      id: "c3",
      user: "背包客",
      avatar: "/placeholder.svg?height=30&width=30",
      content: "请问这个季节去合适吗？",
      time: "5小时前",
      likes: 7,
    },
    {
      id: "c4",
      user: "美食家",
      avatar: "/placeholder.svg?height=30&width=30",
      content: "附近有什么好吃的推荐吗？",
      time: "6小时前",
      likes: 12,
    },
    {
      id: "c5",
      user: "旅行规划师",
      avatar: "/placeholder.svg?height=30&width=30",
      content: "建议早上去，人少景美",
      time: "8小时前",
      likes: 32,
    },
  ]

  // 分享选项
  const shareOptions = [
    { id: "wechat", name: "微信", icon: "微信" },
    { id: "weibo", name: "微博", icon: "微博" },
    { id: "qq", name: "QQ", icon: "QQ" },
    { id: "link", name: "复制链接", icon: "链接" },
    { id: "download", name: "保存视频", icon: "下载" },
  ]

  // 模拟视频滚动
  const handleScroll = (direction: "up" | "down") => {
    if (direction === "up" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (direction === "down" && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  // 滚动到当前视频
  useEffect(() => {
    if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [currentIndex])

  const handleLike = (videoId: string) => {
    if (likedVideos.includes(videoId)) {
      setLikedVideos(likedVideos.filter((id) => id !== videoId))
      toast({
        title: "已取消点赞",
        description: "您已取消对该视频的点赞",
      })
    } else {
      setLikedVideos([...likedVideos, videoId])
      toast({
        title: "点赞成功",
        description: "感谢您的喜欢！",
      })
    }
  }

  const handleComment = (videoId: string) => {
    setShowComments(true)
  }

  const handleSubmitComment = () => {
    if (!comment.trim()) {
      toast({
        title: "评论不能为空",
        description: "请输入评论内容",
      })
      return
    }

    toast({
      title: "评论成功",
      description: "您的评论已发布",
    })
    setComment("")
    // 在实际应用中，这里会将评论添加到评论列表
  }

  const handleShare = (videoId: string) => {
    setShowShareOptions(true)
  }

  const handleShareOption = (option: string) => {
    toast({
      title: "分享成功",
      description: `已分享到${option}`,
    })
    setShowShareOptions(false)
  }

  const handleFollow = (userId: string) => {
    toast({
      title: "关注成功",
      description: "您已成功关注该用户",
    })
  }

  const handleCreateVideo = () => {
    toast({
      title: "创建视频",
      description: "视频创建功能即将上线",
    })
  }

  const closeComments = () => {
    setShowComments(false)
  }

  const closeShareOptions = () => {
    setShowShareOptions(false)
  }

  return (
    <div className="h-full relative bg-black">
      {/* 顶部导航 */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <Button variant="ghost" size="icon" className="text-white" onClick={goBack}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold text-white">旅行短视频</h1>
        <Button variant="ghost" size="icon" className="text-white" onClick={handleCreateVideo}>
          <Plus size={20} />
        </Button>
      </div>

      {/* 视频滚动区域 */}
      <div className="h-full overflow-hidden">
        {videos.map((video, index) => (
          <div
            key={video.id}
            ref={(el) => (videoRefs.current[index] = el)}
            className={`h-full w-full relative ${index === currentIndex ? "z-10" : "z-0"}`}
          >
            {/* 视频封面（在真实应用中这里会是视频播放器） */}
            <img
              src={video.coverImage || "/placeholder.svg"}
              alt={`${video.user.name}的视频`}
              className="h-full w-full object-cover"
            />

            {/* 视频信息叠加层 */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              {/* 用户信息 */}
              <div className="flex items-center mb-3">
                <Avatar className="h-10 w-10 mr-3 border-2 border-white">
                  <AvatarImage src={video.user.avatar || "/placeholder.svg"} alt={video.user.name} />
                  <AvatarFallback>{video.user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-semibold text-white">{video.user.name}</h3>
                    {video.user.isVerified && (
                      <Badge className="ml-1 h-4 w-4 p-0 bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-300">{video.location}</p>
                </div>
                <Button
                  size="sm"
                  className="h-8 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/50"
                  onClick={() => handleFollow(video.user.id)}
                >
                  关注
                </Button>
              </div>

              {/* 视频描述 */}
              <p className="text-white mb-3">{video.description}</p>

              {/* 音乐信息 */}
              <div className="flex items-center text-white/80 text-sm mb-4">
                <Music size={14} className="mr-1" />
                <div className="flex-1 truncate">{video.music}</div>
              </div>
            </div>

            {/* 右侧互动按钮 */}
            <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-black/30 text-white"
                  onClick={() => handleLike(video.id)}
                >
                  <Heart size={24} className={likedVideos.includes(video.id) ? "fill-red-500 text-red-500" : ""} />
                </Button>
                <span className="text-white text-xs mt-1">
                  {video.likes + (likedVideos.includes(video.id) ? 1 : 0)}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-black/30 text-white"
                  onClick={() => handleComment(video.id)}
                >
                  <MessageCircle size={24} />
                </Button>
                <span className="text-white text-xs mt-1">{video.comments}</span>
              </div>

              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-black/30 text-white"
                  onClick={() => handleShare(video.id)}
                >
                  <Share size={24} />
                </Button>
                <span className="text-white text-xs mt-1">{video.shares}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 滚动指示器 */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 rounded-full bg-black/30 text-white ${currentIndex === 0 ? "opacity-50" : ""}`}
          onClick={() => handleScroll("up")}
          disabled={currentIndex === 0}
        >
          <ChevronUp size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 rounded-full bg-black/30 text-white ${currentIndex === videos.length - 1 ? "opacity-50" : ""}`}
          onClick={() => handleScroll("down")}
          disabled={currentIndex === videos.length - 1}
        >
          <ChevronDown size={20} />
        </Button>
      </div>

      {/* 评论面板 */}
      {showComments && (
        <div className="absolute inset-0 bg-black/80 z-20 flex flex-col">
          <div className="p-4 flex items-center justify-between border-b border-gray-700">
            <h2 className="text-white font-semibold">评论 ({videos[currentIndex].comments})</h2>
            <Button variant="ghost" size="icon" className="text-white" onClick={closeComments}>
              <X size={20} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {commentsData.map((comment) => (
              <div key={comment.id} className="flex mb-4">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.user} />
                  <AvatarFallback>{comment.user.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h4 className="text-white text-sm font-medium">{comment.user}</h4>
                    <span className="text-gray-400 text-xs ml-2">{comment.time}</span>
                  </div>
                  <p className="text-white text-sm mt-1">{comment.content}</p>
                  <div className="flex items-center mt-1">
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-gray-400 hover:text-white">
                      <Heart size={14} className="mr-1" /> {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-gray-400 hover:text-white">
                      回复
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-700 bg-black">
            <div className="flex">
              <input
                type="text"
                placeholder="添加评论..."
                className="flex-1 bg-gray-800 border-none rounded-l-md p-2 text-white focus:outline-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button className="rounded-l-none" onClick={handleSubmitComment}>
                发送
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 分享选项 */}
      {showShareOptions && (
        <div className="absolute inset-0 bg-black/80 z-20 flex flex-col">
          <div className="flex-1" onClick={closeShareOptions}></div>
          <div className="bg-gray-900 rounded-t-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-semibold">分享到</h2>
              <Button variant="ghost" size="icon" className="text-white" onClick={closeShareOptions}>
                <X size={20} />
              </Button>
            </div>
            <div className="grid grid-cols-5 gap-4 mb-4">
              {shareOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex flex-col items-center"
                  onClick={() => handleShareOption(option.name)}
                >
                  <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center text-white mb-1">
                    {option.icon}
                  </div>
                  <span className="text-white text-xs">{option.name}</span>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full text-white border-white/20 hover:bg-gray-800"
              onClick={closeShareOptions}
            >
              取消
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { ArrowLeft, Search, Plus, Heart, MessageCircle, Share, Bookmark, MoreHorizontal, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import type { Screen } from "@/components/mobile-app"
// import { userService } from "@/lib/services/user-service"

interface TravelStoriesProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
  goBack: () => void
}

export function TravelStories({ navigate, goBack }: TravelStoriesProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("following")
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [savedPosts, setSavedPosts] = useState<string[]>([])

  // 模拟故事数据
  const stories = [
    {
      id: "story1",
      user: {
        id: "user1",
        name: "旅行达人",
        avatar: "/placeholder.svg?height=40&width=40&text=旅行达人",
        isVerified: true,
      },
      location: "杭州·西湖",
      content:
        "西湖的春天真是美不胜收！断桥边的柳树已经泛绿，湖面上荡起了微波。今天天气特别好，拍了很多照片，分享给大家～",
      images: [
        "/placeholder.svg?height=400&width=600&text=西湖春景1",
        "/placeholder.svg?height=400&width=600&text=西湖春景2",
      ],
      likes: 256,
      comments: 42,
      time: "2小时前",
      tags: ["春游", "西湖", "摄影"],
    },
    {
      id: "story2",
      user: {
        id: "user2",
        name: "美食猎人",
        avatar: "/placeholder.svg?height=40&width=40&text=美食猎人",
        isVerified: false,
      },
      location: "杭州·知味观",
      content:
        "杭州必吃美食推荐！知味观的西湖醋鱼和东坡肉真的太好吃了，一定要来尝尝。这家店开了上百年，还是老味道，强烈推荐！",
      images: [
        "/placeholder.svg?height=400&width=600&text=杭州美食1",
        "/placeholder.svg?height=400&width=600&text=杭州美食2",
        "/placeholder.svg?height=400&width=600&text=杭州美食3",
      ],
      likes: 189,
      comments: 36,
      time: "5小时前",
      tags: ["美食", "杭帮菜", "推荐"],
    },
    {
      id: "story3",
      user: {
        id: "user3",
        name: "背包客",
        avatar: "/placeholder.svg?height=40&width=40&text=背包客",
        isVerified: true,
      },
      location: "千岛湖",
      content:
        "千岛湖三日游结束啦！这里的空气真的超级好，湖水清澈见底。岛上的民宿也很棒，推荐大家来体验！下次想尝试一下这里的皮划艇和钓鱼。",
      images: [
        "/placeholder.svg?height=400&width=600&text=千岛湖1",
        "/placeholder.svg?height=400&width=600&text=千岛湖2",
      ],
      likes: 145,
      comments: 28,
      time: "昨天",
      tags: ["千岛湖", "自然", "度假"],
    },
  ]

  const handleLike = (storyId: string) => {
    if (likedPosts.includes(storyId)) {
      setLikedPosts(likedPosts.filter((id) => id !== storyId))
      toast({
        title: "已取消点赞",
        description: "您已取消对此故事的点赞",
      })
    } else {
      setLikedPosts([...likedPosts, storyId])
      toast({
        title: "点赞成功",
        description: "您已成功点赞此故事",
      })
    }
  }

  const handleSave = (storyId: string) => {
    if (savedPosts.includes(storyId)) {
      setSavedPosts(savedPosts.filter((id) => id !== storyId))
      toast({
        title: "已取消收藏",
        description: "您已取消对此故事的收藏",
      })
    } else {
      setSavedPosts([...savedPosts, storyId])
      toast({
        title: "收藏成功",
        description: "您已成功收藏此故事",
      })
    }
  }

  const handleShare = (storyId: string) => {
    toast({
      title: "分享成功",
      description: "故事已分享到您的社交媒体",
    })
  }

  const handleCreateStory = () => {
    navigate("edit-diary")
  }

  // 获取旅行故事列表
  /*
  const fetchTravelStories = async () => {
    try {
      setIsLoading(true)
      const stories = await api.get('/social/travel-stories', {
        params: {
          page,
          limit: 10,
          ...filter
        }
      })
      setStories(prev => page > 1 ? [...prev, ...stories.items] : stories.items)
      setHasMore(stories.hasMore)
      setIsLoading(false)
    } catch (error) {
      console.error('获取旅行故事失败', error)
      setIsLoading(false)
    }
  }

  // 点赞故事
  const likeStory = async (storyId: string) => {
    try {
      await api.post(`/social/travel-stories/${storyId}/like`)
      // 更新本地状态
      setStories(prev => 
        prev.map(story => 
          story.id === storyId 
            ? { ...story, likes: story.likes + 1, isLiked: true } 
            : story
        )
      )
    } catch (error) {
      console.error('点赞失败', error)
    }
  }

  // 取消点赞
  const unlikeStory = async (storyId: string) => {
    try {
      await api.post(`/social/travel-stories/${storyId}/unlike`)
      // 更新本地状态
      setStories(prev => 
        prev.map(story => 
          story.id === storyId 
            ? { ...story, likes: story.likes - 1, isLiked: false } 
            : story
        )
      )
    } catch (error) {
      console.error('取消点赞失败', error)
    }
  }

  // 收藏故事
  const favoriteStory = async (storyId: string) => {
    try {
      await api.post(`/social/travel-stories/${storyId}/favorite`)
      // 更新本地状态
      setStories(prev => 
        prev.map(story => 
          story.id === storyId 
            ? { ...story, isFavorited: true } 
            : story
        )
      )
      toast({
        title: "已收藏",
      })
    } catch (error) {
      console.error('收藏失败', error)
    }
  }

  // 分享故事
  const shareStory = async (storyId: string) => {
    try {
      const shareUrl = await api.get(`/social/travel-stories/${storyId}/share-link`)
      // 复制链接到剪贴板
      navigator.clipboard.writeText(shareUrl.link)
      toast({
        title: "链接已复制到剪贴板",
        description: "可以分享给好友了",
      })
    } catch (error) {
      console.error('获取分享链接失败', error)
    }
  }

  // 获取故事评论
  const fetchStoryComments = async (storyId: string) => {
    try {
      const comments = await api.get(`/social/travel-stories/${storyId}/comments`)
      return comments
    } catch (error) {
      console.error('获取评论失败', error)
      return []
    }
  }

  // 发表评论
  const postComment = async (storyId: string, content: string) => {
    try {
      await api.post(`/social/travel-stories/${storyId}/comments`, { content })
      toast({
        title: "评论已发布",
      })
      return true
    } catch (error) {
      console.error('发表评论失败', error)
      toast({
        title: "评论发布失败",
        description: "请稍后重试",
        variant: "destructive",
      })
      return false
    }
  }
  */

  return (
    <div className="pb-16">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold ml-2">旅行故事圈</h1>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate("social")}>
            <Search size={20} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleCreateStory}>
            <Plus size={20} />
          </Button>
        </div>
      </div>

      {/* 标签页 */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="following">关注</TabsTrigger>
            <TabsTrigger value="recommend">推荐</TabsTrigger>
            <TabsTrigger value="nearby">附近</TabsTrigger>
          </TabsList>
        </div>

        {/* 故事内容 */}
        <TabsContent value="following" className="mt-0">
          <div className="divide-y">
            {stories.map((story) => (
              <div key={story.id} className="p-4">
                {/* 用户信息 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={story.user.avatar || "/placeholder.svg"} alt={story.user.name} />
                      <AvatarFallback>{story.user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold">{story.user.name}</h3>
                        {story.user.isVerified && (
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
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin size={12} className="mr-1" />
                        <span>{story.location}</span>
                        <span className="mx-1">•</span>
                        <span>{story.time}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal size={16} />
                  </Button>
                </div>

                {/* 故事内容 */}
                <p className="mb-3 text-gray-700 dark:text-gray-300">{story.content}</p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {story.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* 图片 */}
                <div className={`grid gap-2 mb-3 ${story.images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                  {story.images.map((img, index) => (
                    <img
                      key={index}
                      src={img || "/placeholder.svg"}
                      alt={`${story.user.name}的照片${index + 1}`}
                      className="w-full rounded-lg object-cover"
                      style={{ height: story.images.length === 1 ? "300px" : "150px" }}
                    />
                  ))}
                </div>

                {/* 互动按钮 */}
                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={likedPosts.includes(story.id) ? "text-red-500" : ""}
                    onClick={() => handleLike(story.id)}
                  >
                    <Heart size={18} className={`mr-1 ${likedPosts.includes(story.id) ? "fill-red-500" : ""}`} />
                    {story.likes + (likedPosts.includes(story.id) ? 1 : 0)}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => navigate("diary-detail", { diaryId: story.id })}>
                    <MessageCircle size={18} className="mr-1" />
                    {story.comments}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleShare(story.id)}>
                    <Share size={18} className="mr-1" />
                    分享
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={savedPosts.includes(story.id) ? "text-blue-500" : ""}
                    onClick={() => handleSave(story.id)}
                  >
                    <Bookmark size={18} className={savedPosts.includes(story.id) ? "fill-blue-500" : ""} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommend" className="mt-0">
          <div className="flex flex-col items-center justify-center py-12">
            <img src="/placeholder.svg?height=120&width=120&text=推荐" alt="推荐内容" className="mb-4" />
            <h3 className="text-lg font-medium mb-2">探索更多精彩内容</h3>
            <p className="text-center text-gray-500 mb-4 px-8">根据您的兴趣和旅行偏好，我们将为您推荐精彩的旅行故事</p>
            <Button onClick={() => navigate("interest-settings")}>设置兴趣偏好</Button>
          </div>
        </TabsContent>

        <TabsContent value="nearby" className="mt-0">
          <div className="flex flex-col items-center justify-center py-12">
            <img src="/placeholder.svg?height=120&width=120&text=附近" alt="附近内容" className="mb-4" />
            <h3 className="text-lg font-medium mb-2">查看附近的旅行故事</h3>
            <p className="text-center text-gray-500 mb-4 px-8">开启位置权限，发现身边的精彩旅行故事和当地玩家</p>
            <Button>开启位置权限</Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* 悬浮创建按钮 */}
      <Button className="fixed bottom-20 right-4 rounded-full h-14 w-14 shadow-lg" onClick={handleCreateStory}>
        <Plus size={24} />
      </Button>
    </div>
  )
}

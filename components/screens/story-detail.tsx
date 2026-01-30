"use client"

import { ArrowLeft, MessageCircle, Heart, Share2, MapPin, MoreHorizontal, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import type { Screen } from "@/lib/navigation-types"
import { SimpleCommentsSheet } from "./social/simple-comments-sheet"

interface StoryDetailProps {
    story: any
    goBack: () => void
    navigate: (screen: Screen, params?: Record<string, any>) => void
}

export function StoryDetail({ story, goBack, navigate }: StoryDetailProps) {
    const { toast } = useToast()
    const [isLiked, setIsLiked] = useState(story?.isLiked || false)
    const [likes, setLikes] = useState(story?.likes || 0)
    const [isCommentsOpen, setIsCommentsOpen] = useState(false)

    // Mock initial comments
    const [commentsList, setCommentsList] = useState([
        { id: 1, user: "Alice", avatar: "A", content: "照片拍得真好！我也想去西湖了。", time: "1小时前" },
        { id: 2, user: "Bob", avatar: "B", content: "求攻略！", time: "30分钟前" }
    ])

    if (!story) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p>内容不存在</p>
                <Button onClick={goBack}>返回</Button>
            </div>
        )
    }

    const handleLike = () => {
        setIsLiked(!isLiked)
        setLikes(isLiked ? likes - 1 : likes + 1)
    }

    const handleSendComment = (text: string) => {
        const newComment = {
            id: Date.now(),
            user: "我", // Mock current user
            avatar: "M",
            content: text,
            time: "刚刚"
        }

        setCommentsList([newComment, ...commentsList])

        toast({
            title: "评论成功",
            description: "您的评论已发布",
        })
    }

    const handleMenu = () => {
        toast({
            title: "功能开发中",
            description: "更多功能敬请期待...",
        })
    }

    // Import dynamically to avoid circular dependencies if any, or just standard import at top
    // For this tool, I need to ensure imports are present. 
    // I will add the import at the top of the file in a separate step or assume I can rewrite the whole file.
    // The replace_file_content tool replaces a chunk. 
    // I need to add the import statement too. 
    // So I should probably use multi_replace_file_content or replace the whole file if I can't easily do both.
    // I will replace the component function body mostly. but I need the import.
    // Let's use multi_replace.
    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900 pb-16">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b">
                <Button variant="ghost" size="icon" onClick={goBack}>
                    <ArrowLeft size={20} />
                </Button>
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={story.user.avatar} />
                        <AvatarFallback>{story.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{story.user.name}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleMenu}>
                    <MoreHorizontal size={20} />
                </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Images Carousel or Grid */}
                <div className="space-y-1">
                    {story.images && story.images.map((img: string, i: number) => (
                        <img key={i} src={img} alt={`Story ${i}`} className="w-full object-cover" />
                    ))}
                </div>

                <div className="p-4 space-y-4">
                    <h1 className="text-lg font-medium leading-relaxed">{story.content}</h1>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{story.time}</span>
                        {story.location && (
                            <span className="flex items-center text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full text-xs">
                                <MapPin size={12} className="mr-1" />
                                {story.location}
                            </span>
                        )}
                    </div>
                </div>

                <div className="h-px bg-gray-100 my-2" />

                {/* Comments Preview (Optional, native apps often show a few or just the button) */}
                <div className="p-4 pb-20">
                    <div
                        className="flex items-center justify-between mb-4 cursor-pointer"
                        onClick={() => setIsCommentsOpen(true)}
                    >
                        <h3 className="font-bold">评论 ({commentsList.length})</h3>
                        <span className="text-xs text-gray-400">点击查看全部 &gt;</span>
                    </div>
                    {/* Show top 2 comments as preview */}
                    <div className="space-y-4 opacity-70">
                        {commentsList.slice(0, 2).map((item) => (
                            <div key={item.id} className="flex gap-3" onClick={() => setIsCommentsOpen(true)}>
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>{item.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.user}</span>
                                        <span className="text-xs text-gray-400">{item.time}</span>
                                    </div>
                                    <p className="text-sm mt-1 text-gray-800 dark:text-gray-200 line-clamp-2">{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t p-3 flex items-center gap-3 safe-area-bottom z-20">
                <div
                    className="flex-1 relative cursor-pointer"
                    onClick={() => setIsCommentsOpen(true)}
                >
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-10 flex items-center px-4 text-gray-400 text-sm">
                        说点什么...
                    </div>
                </div>

                <Button size="icon" variant="ghost" onClick={handleLike} className={isLiked ? "text-red-500 hover:text-red-600" : "text-gray-500"}>
                    <Heart size={24} className={isLiked ? "fill-current" : ""} />
                </Button>
                <div className="text-xs text-center min-w-[20px] text-gray-500">{likes}</div>
                <Button size="icon" variant="ghost" className="text-gray-500">
                    <Share2 size={24} />
                </Button>
            </div>

            <SimpleCommentsSheet
                open={isCommentsOpen}
                onClose={() => setIsCommentsOpen(false)}
                comments={commentsList}
                onAddComment={handleSendComment}
            />
        </div>
    )
}

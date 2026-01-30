"use client"

import { useState } from "react"
import { Send, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerFooter,
} from "@/components/ui/drawer"

interface Comment {
    id: number | string
    user: string
    avatar: string
    content: string
    time: string
}

interface CommentsSheetProps {
    comments: Comment[]
    onAddComment: (text: string) => void
    children?: React.ReactNode
    trigger?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function CommentsSheet({
    comments,
    onAddComment,
    children,
    trigger,
    open,
    onOpenChange
}: CommentsSheetProps) {
    const [newComment, setNewComment] = useState("")

    const handleSend = () => {
        if (!newComment.trim()) return
        onAddComment(newComment)
        setNewComment("")
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
            <DrawerContent className="h-[80vh] flex flex-col">
                <DrawerHeader className="border-b pb-4">
                    <DrawerTitle className="text-center">评论 ({comments.length})</DrawerTitle>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {comments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                            <MessageCircle size={40} className="mb-2 opacity-20" />
                            <p>暂无评论，快来抢沙发吧~</p>
                        </div>
                    ) : (
                        comments.map((item) => (
                            <div key={item.id} className="flex gap-3">
                                <Avatar className="h-8 w-8 shrink-0">
                                    <AvatarFallback>{item.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            {item.user}
                                        </span>
                                        <span className="text-xs text-gray-400">{item.time}</span>
                                    </div>
                                    <p className="text-sm mt-1 text-gray-800 dark:text-gray-200">{item.content}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 border-t bg-background safe-area-bottom">
                    <div className="flex gap-2 items-center">
                        <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback>Me</AvatarFallback>
                        </Avatar>
                        <div className="relative flex-1">
                            <Input
                                placeholder="说点什么..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSend()
                                }}
                                className="pr-10 rounded-full bg-gray-100 dark:bg-gray-800 border-none"
                            />
                            {newComment.trim().length > 0 && (
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-blue-500 hover:text-blue-600"
                                    onClick={handleSend}
                                >
                                    <Send size={16} />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

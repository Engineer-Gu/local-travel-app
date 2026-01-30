"use client"

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

interface Comment {
    id: number | string
    user: string
    avatar: string
    content: string
    time: string
}

interface SimpleCommentsSheetProps {
    comments: Comment[]
    onAddComment: (text: string) => void
    open: boolean
    onClose: () => void
}

export function SimpleCommentsSheet({
    comments,
    onAddComment,
    open,
    onClose
}: SimpleCommentsSheetProps) {
    const [newComment, setNewComment] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    // Auto-focus input when opened (optional, might be annoying on mobile if it pops keyboard)
    useEffect(() => {
        if (open) {
            // setTimeout(() => inputRef.current?.focus(), 300)
        }
    }, [open])

    if (!open) return null;

    const handleSend = () => {
        if (!newComment.trim()) return
        onAddComment(newComment)
        setNewComment("")
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity animate-in fade-in"
                onClick={onClose}
            />

            {/* Sheet */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-2xl z-50 h-[80vh] flex flex-col shadow-xl animate-in slide-in-from-bottom duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="w-8" /> {/* Spacer */}
                    <h3 className="font-semibold text-lg">评论 ({comments.length})</h3>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
                        <X size={20} />
                    </Button>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-5">
                    {comments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <MessageCircle size={48} className="mb-4 opacity-20" />
                            <p>暂无评论，快来抢沙发吧~</p>
                        </div>
                    ) : (
                        comments.map((item) => (
                            <div key={item.id} className="flex gap-3">
                                <Avatar className="h-9 w-9 shrink-0 mt-1">
                                    <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                                        {item.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                            {item.user}
                                        </span>
                                        <span className="text-xs text-gray-400">{item.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Input Area */}
                <div className="p-3 border-t bg-white dark:bg-gray-900 safe-area-bottom">
                    <div className="flex gap-2 items-end">
                        <div className="relative flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center p-1">
                            <Input
                                ref={inputRef}
                                placeholder="说点什么..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 min-h-[40px] px-3"
                            />
                            {newComment.trim().length > 0 && (
                                <Button
                                    size="icon"
                                    className="h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600 mr-1 shrink-0 transition-all animate-in zoom-in"
                                    onClick={handleSend}
                                >
                                    <Send size={14} className="text-white ml-0.5" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

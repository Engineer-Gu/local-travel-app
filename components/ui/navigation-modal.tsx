"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "lucide-react"

interface NavigationModalProps {
    isOpen: boolean
    onClose: () => void
    destination?: string
}

export function NavigationModal({ isOpen, onClose, destination = "目的地" }: NavigationModalProps) {
    const handleNavigate = (appName: string) => {
        // In a real app, this would use deep linking schemes
        // e.g., iosamap://, baidumap://
        console.log(`Navigating to ${destination} using ${appName}`)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xs">
                <DialogHeader>
                    <DialogTitle className="text-center">选择导航地图</DialogTitle>
                </DialogHeader>
                <div className="grid gap-3 py-4">
                    <Button variant="outline" className="justify-between" onClick={() => handleNavigate("高德地图")}>
                        <span className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-blue-500" /> 高德地图
                        </span>
                        <ArrowRight className="h-4 w-4 opacity-50" />
                    </Button>
                    <Button variant="outline" className="justify-between" onClick={() => handleNavigate("百度地图")}>
                        <span className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-red-500" /> 百度地图
                        </span>
                        <ArrowRight className="h-4 w-4 opacity-50" />
                    </Button>
                    <Button variant="outline" className="justify-between" onClick={() => handleNavigate("腾讯地图")}>
                        <span className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-yellow-500" /> 腾讯地图
                        </span>
                        <ArrowRight className="h-4 w-4 opacity-50" />
                    </Button>
                    <Button variant="outline" className="justify-between" onClick={() => handleNavigate("Apple 地图")}>
                        <span className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-gray-500" /> Apple 地图
                        </span>
                        <ArrowRight className="h-4 w-4 opacity-50" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

"use client"

import { Home, User, Camera } from "lucide-react"
import type { Screen } from "@/lib/navigation-types"

interface BottomNavigationProps {
  currentScreen: Screen
  onChangeScreen: (screen: Screen) => void
}

export function BottomNavigation({ currentScreen, onChangeScreen }: BottomNavigationProps) {
  return (
    <div className="flex items-center justify-around py-2 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300 relative">
      {/* Home Button */}
      <button
        className={`flex flex-col items-center justify-center w-12 py-1 transition-colors ${currentScreen === "home" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
          }`}
        onClick={() => onChangeScreen("home")}
      >
        <Home size={20} className={currentScreen === "home" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"} />
        <span className="text-xs mt-1">首页</span>
      </button>

      {/* Central AI Photo Diary Button */}
      <div className="relative -top-5">
        <button
          className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg active:scale-95 transition-transform border-4 border-white dark:border-gray-900"
          onClick={() => onChangeScreen("ai-photo-diary")}
        >
          <Camera size={24} />
        </button>
      </div>

      {/* Profile Button */}
      <button
        className={`flex flex-col items-center justify-center w-12 py-1 transition-colors ${currentScreen === "profile" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
          }`}
        onClick={() => onChangeScreen("profile")}
      >
        <User size={20} className={currentScreen === "profile" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"} />
        <span className="text-xs mt-1">我</span>
      </button>
    </div>
  )
}

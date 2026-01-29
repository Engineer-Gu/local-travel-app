"use client"

import { Home, MapPin, Users, Compass, User, ShoppingBag } from "lucide-react"

type Screen = "home" | "planning" | "social" | "guides" | "shop" | "profile"

interface BottomNavigationProps {
  currentScreen: Screen
  onChangeScreen: (screen: Screen) => void
}

export function BottomNavigation({ currentScreen, onChangeScreen }: BottomNavigationProps) {
  const navItems = [
    { id: "home", icon: Home, label: "首页" },
    { id: "profile", icon: User, label: "我" },
  ]

  return (
    <div className="flex items-center justify-around py-2 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = currentScreen === item.id

        return (
          <button
            key={item.id}
            className={`flex flex-col items-center justify-center w-12 py-1 transition-colors ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
              }`}
            onClick={() => onChangeScreen(item.id as Screen)}
          >
            <Icon size={20} className={isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

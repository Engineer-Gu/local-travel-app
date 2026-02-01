"use client"

import { useState } from "react"
import { Search, Navigation, Dices } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MOCK_LIFE_SERVICES, LifeService } from "@/data/mock_life_list"
import { NavigationModal } from "@/components/ui/navigation-modal"

export function PlayScreen() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedActivity, setSelectedActivity] = useState<LifeService | null>(null)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [currentNavDest, setCurrentNavDest] = useState("")

  // Budget States
  const [showBudgetDialog, setShowBudgetDialog] = useState(false)
  const [budgetLimit, setBudgetLimit] = useState<number | null>(null)

  // Randomizer States
  const [isSpinning, setIsSpinning] = useState(false)
  const [showRandomDialog, setShowRandomDialog] = useState(false)
  const [randomResult, setRandomResult] = useState<LifeService | null>(null)

  const categories = [
    { id: "all", name: "全部" },
    { id: "entertainment", name: "娱乐" },
    { id: "wellness", name: "养生" },
    { id: "sports", name: "运动" },
    { id: "outdoor", name: "户外" },
    { id: "culture", name: "文化" },
    { id: "lifestyle", name: "生活" },
  ]

  const filteredServices = MOCK_LIFE_SERVICES.filter(s => {
    const matchesSearch = s.name.includes(search)
    const matchesCategory = selectedCategory === "all" || s.category === selectedCategory
    const matchesBudget = budgetLimit === null || s.price <= budgetLimit
    return matchesSearch && matchesCategory && matchesBudget
  })

  const openNavigation = (destination: string) => {
    setCurrentNavDest(destination)
    setIsNavOpen(true)
  }

  const handleRandomPick = () => {
    setIsSpinning(true)
    setShowRandomDialog(true)
    setRandomResult(null)

    // Only pick from filtered items if feasible
    const candidates = filteredServices.length > 0 ? filteredServices : MOCK_LIFE_SERVICES

    let count = 0
    const maxCount = 20
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * candidates.length)
      setRandomResult(candidates[randomIndex])
      count++
      if (count >= maxCount) {
        clearInterval(interval)
        setIsSpinning(false)
      }
    }, 80)
  }

  return (
    <div className="w-full h-[85vh] bg-gray-50 dark:bg-black flex flex-col">
      {/* 1. Header (Clean White) */}
      <div className="shrink-0 pt-4 px-4 pb-4 bg-white dark:bg-black sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              去哪玩
            </h1>
            <p className="text-xs text-gray-500 mt-1">发现城市里的宝藏活动</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`rounded-full border-blue-100 text-blue-600 ${budgetLimit ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
              onClick={() => setShowBudgetDialog(true)}
            >
              <span className="mr-1">💰</span>
              {budgetLimit ? `¥${budgetLimit}以内` : "预算"}
            </Button>
            <Button
              onClick={handleRandomPick}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all"
              size="sm"
            >
              <Dices className="w-4 h-4 mr-1" />
              帮我选
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索活动、景点..."
            className="pl-9 h-10 bg-gray-100 dark:bg-gray-800 border-none rounded-xl text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${selectedCategory === cat.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Dialog */}
      <Dialog open={showBudgetDialog} onOpenChange={setShowBudgetDialog}>
        <DialogContent className="sm:max-w-xs rounded-2xl">
          <DialogTitle>设置预算</DialogTitle>
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[50, 100, 200, 500].map(price => (
                <Button
                  key={price}
                  variant="outline"
                  onClick={() => setBudgetLimit(price)}
                  className={budgetLimit === price ? "border-blue-500 bg-blue-50 text-blue-600" : ""}
                >
                  ¥{price}以内
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm shrink-0">自定义</span>
              <Input
                type="number"
                placeholder="输入金额"
                className="h-9"
                onChange={(e) => setBudgetLimit(Number(e.target.value) || null)}
              />
            </div>
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700" onClick={() => setShowBudgetDialog(false)}>
              确定
            </Button>
            {budgetLimit && (
              <Button variant="ghost" className="w-full text-gray-500 h-8" onClick={() => { setBudgetLimit(null); setShowBudgetDialog(false) }}>
                清除预算限制
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* 2. Main Content - Masonry/Card List */}
      <ScrollArea className="flex-1 px-4 pb-20 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedActivity(service)}
              className="group relative bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:shadow-md transition-all active:scale-95"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-2xl mb-1 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <div className="w-full">
                <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100">{service.name}</h3>
                <div className="text-xs font-bold text-blue-600 mt-1 flex items-center justify-center">
                  <span className="text-[10px] mr-1">¥</span>
                  {service.price}/人
                </div>
              </div>
              <div className="flex gap-1 flex-wrap justify-center">
                {service.tags?.slice(0, 1).map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-gray-50 dark:bg-gray-800 text-gray-500 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p>没有找到相关活动</p>
            <Button variant="link" className="text-blue-600" onClick={() => { setSearch(""); setSelectedCategory("all") }}>清除筛选</Button>
          </div>
        )}
      </ScrollArea>

      {/* 3. Activity Detail Modal */}
      <Dialog open={!!selectedActivity} onOpenChange={(open) => !open && setSelectedActivity(null)}>
        <DialogContent className="sm:max-w-sm p-0 gap-0 overflow-hidden rounded-2xl border-none">
          <DialogTitle className="sr-only">活动详情</DialogTitle>
          {selectedActivity && (
            <div className="flex flex-col h-full bg-white dark:bg-gray-900">
              {/* Hero Header (Solid Blue) */}
              <div className="bg-blue-600 p-8 text-white flex flex-col items-center justify-center relative">
                <div className="text-6xl mb-4 drop-shadow-sm transform hover:scale-110 transition-transform duration-300">
                  {selectedActivity.icon}
                </div>
                <h2 className="text-2xl font-bold mb-2">{selectedActivity.name}</h2>
                <div className="flex gap-2">
                  {selectedActivity.tags?.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">简介</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {selectedActivity.description || "暂无介绍，去现场探索一下吧！"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 shadow-sm"
                    onClick={() => {
                      setSelectedActivity(null)
                      openNavigation(selectedActivity.name)
                    }}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    立即前往
                  </Button>
                  <Button
                    className="flex-1 rounded-xl text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 h-11 hover:bg-gray-50"
                    variant="outline"
                    onClick={() => alert("已收藏到心愿单")}
                  >
                    加入清单
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Random Result Dialog - Fixed Accessibility */}
      <Dialog open={showRandomDialog} onOpenChange={setShowRandomDialog}>
        <DialogContent className="sm:max-w-xs text-center rounded-2xl">
          <DialogTitle className="sr-only">帮我选结果</DialogTitle>
          <div className="py-8">
            {isSpinning ? (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm font-medium text-gray-600">正在为您挑选...</p>
              </div>
            ) : randomResult && (
              <div className="flex flex-col items-center animate-in zoom-in duration-300">
                <div className="text-6xl mb-4">{randomResult.icon}</div>
                <h3 className="text-lg font-bold mb-1">去玩这个吧！</h3>
                <div className="text-xl font-bold text-blue-600 mb-6">{randomResult.name}</div>
                <Button
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                  onClick={() => {
                    setShowRandomDialog(false)
                    setSelectedActivity(randomResult)
                  }}
                >
                  查看详情
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <NavigationModal
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        destination={currentNavDest}
      />
    </div>
  )
}

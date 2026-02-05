"use client"

import { useState } from "react"
import { Search, Utensils, Dices, Navigation, Heart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MOCK_DINING_LIST, DiningItem, DINING_CATEGORIES } from "@/data/mock_dining_list"

interface DiningScreenProps {
    onBack?: () => void
}

export function DiningScreen({ onBack }: DiningScreenProps) {
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [selectedItem, setSelectedItem] = useState<DiningItem | null>(null)

    // Budget States
    const [showBudgetDialog, setShowBudgetDialog] = useState(false)
    const [budgetLimit, setBudgetLimit] = useState<number | null>(null)

    // Randomizer States
    const [isSpinning, setIsSpinning] = useState(false)
    const [showRandomDialog, setShowRandomDialog] = useState(false)
    const [randomResult, setRandomResult] = useState<DiningItem | null>(null)

    const filteredItems = MOCK_DINING_LIST.filter(item => {
        const matchesSearch = item.name.includes(search) || item.subCategory.includes(search)
        const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
        const matchesBudget = budgetLimit === null || item.price <= budgetLimit
        return matchesSearch && matchesCategory && matchesBudget
    })

    // Group by SubCategory for nicer display if searching or viewing all
    const groupedItems = filteredItems.reduce((acc, item) => {
        if (!acc[item.subCategory]) acc[item.subCategory] = []
        acc[item.subCategory].push(item)
        return acc
    }, {} as Record<string, DiningItem[]>)

    const handleRandomPick = () => {
        setIsSpinning(true)
        setShowRandomDialog(true)
        setRandomResult(null)

        // Only pick from filtered items if feasible, otherwise from all
        const candidates = filteredItems.length > 0 ? filteredItems : MOCK_DINING_LIST

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
            {/* 1. Header (Blue Theme) */}
            <div className="shrink-0 pt-4 px-4 pb-4 bg-white dark:bg-black sticky top-0 z-10 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        {onBack && (
                            <Button variant="ghost" size="icon" className="-ml-2" onClick={onBack}>
                                <ArrowLeft className="w-6 h-6" />
                            </Button>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                吃什么
                            </h1>
                            <p className="text-xs text-gray-500 mt-1">探索美食</p>
                        </div>
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
                        placeholder="搜索美食、菜系..."
                        className="pl-9 h-10 bg-gray-100 dark:bg-gray-800 border-none rounded-xl text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {DINING_CATEGORIES.map(cat => (
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
                            {[20, 50, 100, 200].map(price => (
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

            {/* 2. Main Content - List */}
            <ScrollArea className="flex-1 px-4 pb-20 pt-4">
                {Object.entries(groupedItems).map(([subCat, items]) => (
                    <div key={subCat} className="mb-6">
                        <h3 className="text-sm font-bold text-gray-500 mb-3 flex items-center">
                            <span className="w-1 h-4 bg-blue-500 rounded-full mr-2"></span>
                            {subCat}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedItem(item)}
                                    className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 cursor-pointer hover:shadow-md transition-all active:scale-95 flex flex-col"
                                >
                                    <div className="relative h-24 w-full bg-gray-100 overflow-hidden">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-50">
                                                {item.icon}
                                            </div>
                                        )}
                                        <div className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md text-[10px] font-bold text-gray-600 shadow-sm">
                                            {item.category === 'drink' ? '饮品' : '美食'}
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="font-bold text-sm text-gray-800 dark:text-gray-100 truncate flex-1 mr-1">{item.name}</div>
                                            <div className="text-xs font-bold text-blue-600 shrink-0">¥{item.price}</div>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] text-gray-400">
                                            <span>{item.subCategory}</span>
                                            <span className="bg-gray-50 dark:bg-gray-800 px-1 rounded text-gray-400">评分 4.8</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {filteredItems.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p>没有找到相关美食</p>
                        <Button variant="link" className="text-blue-600" onClick={() => { setSearch(""); setSelectedCategory("all") }}>清除筛选</Button>
                    </div>
                )}
            </ScrollArea>

            {/* 3. Detail Modal */}
            <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
                <DialogContent className="sm:max-w-xs p-0 gap-0 overflow-hidden rounded-2xl border-none">
                    <DialogTitle className="sr-only">美食详情</DialogTitle>
                    {selectedItem && (
                        <div className="flex flex-col bg-white dark:bg-gray-900">
                            {/* Header */}
                            {/* Header */}
                            <div className="relative h-48 w-full bg-gray-100">
                                {selectedItem.image ? (
                                    <img
                                        src={selectedItem.image}
                                        alt={selectedItem.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-6xl bg-blue-50">
                                        {selectedItem.icon}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h2 className="text-2xl font-bold mb-1">{selectedItem.name}</h2>
                                            <div className="text-xs opacity-90">{selectedItem.subCategory} · {selectedItem.category === 'drink' ? '饮品' : '美食'}</div>
                                        </div>
                                        <div className="text-xl font-bold text-yellow-400">¥{selectedItem.price}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-5 pt-4 pb-0">
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {selectedItem.description}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="p-5 flex flex-col gap-3">
                                <Button
                                    className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold h-11"
                                    onClick={() => {
                                        alert(`已为您搜索附近好吃的：${selectedItem.name}`)
                                        setSelectedItem(null)
                                    }}
                                >
                                    <Search className="w-4 h-4 mr-2" />
                                    搜索附近
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full rounded-xl text-gray-700 dark:text-gray-300 border-gray-200 h-11"
                                    onClick={() => alert("已加入愿望清单")}
                                >
                                    <Heart className="w-4 h-4 mr-2" />
                                    想吃
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Random Result Dialog */}
            <Dialog open={showRandomDialog} onOpenChange={setShowRandomDialog}>
                <DialogContent className="sm:max-w-xs text-center rounded-2xl">
                    <DialogTitle className="sr-only">随机结果</DialogTitle>
                    <div className="py-8">
                        {isSpinning ? (
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                                <p className="text-sm font-medium text-gray-600">正在为您挑选...</p>
                            </div>
                        ) : randomResult && (
                            <div className="flex flex-col items-center animate-in zoom-in duration-300">
                                <div className="w-32 h-32 rounded-xl overflow-hidden mb-4 shadow-lg border-4 border-white">
                                    {randomResult.image ? (
                                        <img src={randomResult.image} alt={randomResult.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-6xl bg-blue-50">
                                            {randomResult.icon}
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold mb-1">今天就吃它！</h3>
                                <div className="text-xl font-bold text-blue-600 mb-6">{randomResult.name}</div>
                                <Button
                                    className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                                    onClick={() => {
                                        setShowRandomDialog(false)
                                        setSelectedItem(randomResult)
                                    }}
                                >
                                    查看详情
                                </Button>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

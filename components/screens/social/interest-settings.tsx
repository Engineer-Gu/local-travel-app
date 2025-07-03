"use client"

import { useState } from "react"
import { ArrowLeft, Plus, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
// import { userService } from "@/lib/services/user-service"

interface InterestSettingsProps {
  goBack: () => void
}

export function InterestSettings({ goBack }: InterestSettingsProps) {
  const [newInterest, setNewInterest] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["摄影", "美食", "历史", "户外"])
  const [recommendedInterests, setRecommendedInterests] = useState<string[]>([
    "旅行",
    "徒步",
    "博物馆",
    "古建筑",
    "自然风光",
    "城市探索",
    "购物",
    "音乐",
    "艺术",
    "咖啡",
    "露营",
    "骑行",
    "文学",
  ])
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<string | null>(null)

  // 后端API调用 - 获取用户兴趣标签
  /* 
  const fetchUserInterests = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const interests = await userService.getInterests()
      setSelectedInterests(interests)
    } catch (error) {
      console.error("获取兴趣标签失败", error)
      setError("获取兴趣标签失败，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }
  */

  // 后端API调用 - 更新用户兴趣标签
  /* 
  const saveUserInterests = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await userService.updateInterests(selectedInterests)
      // 保存成功后返回
      goBack()
    } catch (error) {
      console.error("保存兴趣标签失败", error)
      setError("保存兴趣标签失败，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }
  */

  // 后端API调用 - 获取推荐兴趣
  /* 
  const fetchRecommendedInterests = async () => {
    try {
      setIsLoading(true)
      // 可以基于用户当前的兴趣获取推荐
      const recommendations = await userService.getInterestRecommendations(selectedInterests)
      // 提取推荐的兴趣名称
      const recommendedNames = recommendations.map(rec => rec.interest)
      // 更新推荐兴趣列表
      setRecommendedInterests(recommendedNames)
    } catch (error) {
      console.error("获取推荐兴趣失败", error)
      // 不显示错误，使用默认推荐
    } finally {
      setIsLoading(false)
    }
  }
  */

  // 后端API调用 - 获取兴趣分类
  /* 
  const fetchInterestCategories = async () => {
    try {
      const categories = await userService.getInterestCategories()
      // 处理分类数据
      // 可以用于显示分类选项卡等
    } catch (error) {
      console.error("获取兴趣分类失败", error)
    }
  }
  */

  // 后端API调用 - 获取热门兴趣
  /* 
  const fetchPopularInterests = async () => {
    try {
      const popularInterests = await userService.getPopularInterests()
      // 更新推荐兴趣列表
      setRecommendedInterests(popularInterests)
    } catch (error) {
      console.error("获取热门兴趣失败", error)
      // 使用默认推荐
    }
  }
  */

  // 组件挂载时加载数据
  /* 
  useEffect(() => {
    fetchUserInterests()
    fetchRecommendedInterests()
    // 或者获取热门兴趣
    // fetchPopularInterests()
  }, [])
  */

  const handleAddInterest = () => {
    if (newInterest.trim() && !selectedInterests.includes(newInterest.trim())) {
      setSelectedInterests([...selectedInterests, newInterest.trim()])
      setNewInterest("")
    }
  }

  const handleRemoveInterest = (interest: string) => {
    setSelectedInterests(selectedInterests.filter((item) => item !== interest))
  }

  const handleAddRecommended = (interest: string) => {
    if (!selectedInterests.includes(interest)) {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const handleSave = () => {
    // 如果使用后端API，则调用saveUserInterests()
    // saveUserInterests()

    // 使用模拟数据，直接返回
    goBack()
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">兴趣标签设置</h1>
      </div>

      <div className="space-y-6">
        {/* 错误提示 */}
        {/* {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )} */}

        <div>
          <h2 className="text-lg font-semibold mb-3">我的兴趣标签</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedInterests.map((interest, index) => (
              <Badge key={index} className="px-3 py-1.5 text-sm flex items-center gap-1">
                {interest}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 ml-1"
                  onClick={() => handleRemoveInterest(interest)}
                >
                  <X size={12} />
                </Button>
              </Badge>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder="添加新兴趣"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddInterest}>
              <Plus size={16} className="mr-1" />
              添加
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">推荐兴趣</h2>
          <div className="flex flex-wrap gap-2">
            {recommendedInterests
              .filter((interest) => !selectedInterests.includes(interest))
              .map((interest, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-3 py-1.5 text-sm cursor-pointer hover:bg-blue-50"
                  onClick={() => handleAddRecommended(interest)}
                >
                  <Plus size={12} className="mr-1" />
                  {interest}
                </Badge>
              ))}
          </div>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-medium text-blue-700 mb-2">为什么设置兴趣标签？</h3>
            <p className="text-sm text-blue-600">
              设置兴趣标签可以帮助我们为您推荐更符合您喜好的路线和玩伴。您的兴趣标签越准确，推荐内容就越贴合您的需求。
            </p>
          </CardContent>
        </Card>

        <Button className="w-full" onClick={handleSave} /* disabled={isLoading} */>
          <Check size={16} className="mr-2" />
          保存设置
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Plus, X, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { userService } from "@/lib/services/user-service"

interface InterestSettingsProps {
  goBack: () => void
}

/**
 * 兴趣标签设置页面
 *
 * 功能说明：
 * 1. 展示用户已选择的兴趣标签
 * 2. 支持手动添加自定义兴趣标签
 * 3. 从推荐列表中选择兴趣标签
 * 4. 保存兴趣标签到后端
 */
export function InterestSettings({ goBack }: InterestSettingsProps) {
  const [newInterest, setNewInterest] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedInterestIds, setSelectedInterestIds] = useState<Map<string, number>>(new Map())
  const [recommendedInterests] = useState<string[]>([
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
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * 获取用户兴趣标签列表
   */
  const fetchUserInterests = async () => {
    try {
      console.log("开始获取用户兴趣标签...")
      setIsInitialLoading(true)
      setError(null)
      const interests = await userService.getInterests()
      console.log("获取到的兴趣标签数据:", interests)

      // 提取兴趣标签名称
      const interestNames = interests.map((interest) => interest.tagName)
      console.log("提取的兴趣标签名称:", interestNames)
      setSelectedInterests(interestNames)

      // 建立兴趣标签名称到ID的映射
      const idMap = new Map<string, number>()
      interests.forEach((interest) => {
        idMap.set(interest.tagName, interest.id)
      })
      setSelectedInterestIds(idMap)
      console.log("兴趣标签ID映射:", Object.fromEntries(idMap))
    } catch (error) {
      console.error("获取兴趣标签失败", error)
      setError("获取兴趣标签失败，请稍后重试")
    } finally {
      setIsInitialLoading(false)
    }
  }

  /**
   * 保存用户兴趣标签到后端
   * 将所有选中的兴趣标签批量更新到后端
   */
  const saveUserInterests = async () => {
    try {
      setIsSaving(true)
      setError(null)

      // 将兴趣标签转换为后端需要的格式，默认分类为"旅行偏好"
      const interests = selectedInterests.map((tagName) => ({
        tagName,
        tagCategory: "旅行偏好",
      }))

      console.log("保存兴趣标签到后端:", interests)
      await userService.updateInterests(interests)

      console.log("保存成功")
      // 保存成功后返回
      goBack()
    } catch (error) {
      console.error("保存兴趣标签失败", error)
      setError("保存兴趣标签失败，请稍后重试")
    } finally {
      setIsSaving(false)
    }
  }

  /**
   * 组件挂载时加载数据
   */
  useEffect(() => {
    fetchUserInterests()
  }, [])

  /**
   * 添加新的兴趣标签
   */
  const handleAddInterest = async () => {
    const trimmedInterest = newInterest.trim()
    if (!trimmedInterest) {
      return
    }

    if (selectedInterests.includes(trimmedInterest)) {
      setError("该兴趣标签已存在")
      setTimeout(() => setError(null), 2000)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      console.log("添加兴趣标签:", trimmedInterest)
      // 调用后端API添加兴趣标签
      const addedInterest = await userService.addInterest(trimmedInterest, "旅行偏好")
      console.log("添加成功:", addedInterest)

      // 更新本地状态
      setSelectedInterests([...selectedInterests, trimmedInterest])

      // 更新ID映射
      const newMap = new Map(selectedInterestIds)
      newMap.set(trimmedInterest, addedInterest.id)
      setSelectedInterestIds(newMap)

      setNewInterest("")
    } catch (error: any) {
      console.error("添加兴趣标签失败", error)
      setError(error.message || "添加兴趣标签失败，请稍后重试")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * 删除兴趣标签
   */
  const handleRemoveInterest = async (interest: string) => {
    const interestId = selectedInterestIds.get(interest)

    try {
      setIsLoading(true)
      setError(null)

      // 如果有ID，调用后端API删除
      if (interestId) {
        console.log("删除兴趣标签:", interest, "ID:", interestId)
        await userService.deleteInterest(interestId)
        console.log("删除成功")
      }

      // 更新本地状态
      setSelectedInterests(selectedInterests.filter((item) => item !== interest))

      // 从映射中移除
      if (interestId) {
        const newMap = new Map(selectedInterestIds)
        newMap.delete(interest)
        setSelectedInterestIds(newMap)
      }
    } catch (error: any) {
      console.error("删除兴趣标签失败", error)
      setError(error.message || "删除兴趣标签失败，请稍后重试")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * 从推荐列表中添加兴趣标签
   */
  const handleAddRecommended = async (interest: string) => {
    if (selectedInterests.includes(interest)) {
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      console.log("从推荐列表添加兴趣标签:", interest)
      // 调用后端API添加兴趣标签
      const addedInterest = await userService.addInterest(interest, "旅行偏好")
      console.log("添加成功:", addedInterest)

      // 更新本地状态
      setSelectedInterests([...selectedInterests, interest])

      // 更新ID映射
      const newMap = new Map(selectedInterestIds)
      newMap.set(interest, addedInterest.id)
      setSelectedInterestIds(newMap)
    } catch (error: any) {
      console.error("添加兴趣标签失败", error)
      setError(error.message || "添加兴趣标签失败，请稍后重试")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * 保存按钮点击事件
   */
  const handleSave = () => {
    saveUserInterests()
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
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* 我的兴趣标签 */}
        <div>
          <h2 className="text-lg font-semibold mb-3">我的兴趣标签</h2>
          {isInitialLoading ? (
            <div className="text-center text-gray-500 py-8 flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              加载中...
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedInterests.length === 0 ? (
                  <div className="text-gray-400 text-sm">还没有添加兴趣标签，快来添加吧！</div>
                ) : (
                  selectedInterests.map((interest, index) => (
                    <Badge key={index} className="px-3 py-1.5 text-sm flex items-center gap-1">
                      {interest}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0 ml-1"
                        onClick={() => handleRemoveInterest(interest)}
                        disabled={isLoading}
                      >
                        <X size={12} />
                      </Button>
                    </Badge>
                  ))
                )}
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="添加新兴趣"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  className="flex-1"
                  disabled={isLoading}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddInterest()
                    }
                  }}
                />
                <Button onClick={handleAddInterest} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      添加中
                    </>
                  ) : (
                    <>
                      <Plus size={16} className="mr-1" />
                      添加
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* 推荐兴趣 */}
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

        {/* 说明卡片 */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-medium text-blue-700 mb-2">为什么设置兴趣标签？</h3>
            <p className="text-sm text-blue-600">
              设置兴趣标签可以帮助我们为您推荐更符合您喜好的路线和玩伴。您的兴趣标签越准确，推荐内容就越贴合您的需求。
            </p>
          </CardContent>
        </Card>

        {/* 保存按钮 */}
        <Button className="w-full" onClick={handleSave} disabled={isSaving || isLoading || isInitialLoading}>
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              保存中...
            </>
          ) : (
            <>
              <Check size={16} className="mr-2" />
              保存设置
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

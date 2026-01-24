"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Camera, Calendar, MapPin, User, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { userService, authService } from "@/lib/services/user-service"
import type { User } from "@/lib/services/user-service"

interface EditProfileProps {
  goBack: () => void
}

export function EditProfile({ goBack }: EditProfileProps) {
  const [user, setUser] = useState<User | null>(null)
  const [nickname, setNickname] = useState("")
  const [gender, setGender] = useState("other")
  const [birthday, setBirthday] = useState("")
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")
  const [bio, setBio] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  /**
   * 加载用户信息
   */
  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = () => {
    setIsLoadingUser(true)
    userService
      .getProfile()
      .then((userInfo) => {
        setUser(userInfo)
        setNickname(userInfo.nickname || "")
        setGender(userInfo.gender || "other")
        setBirthday(userInfo.birthday || "")
        setCity(userInfo.city || "")
        setPhone(userInfo.phone || "")
        setBio(userInfo.bio || "")
        setIsLoadingUser(false)
      })
      .catch((error) => {
        console.error("获取用户信息失败", error)
        setErrorMessage(error.message || "获取用户信息失败")
        setIsLoadingUser(false)
      })
  }

  /**
   * 保存用户资料
   */
  const handleSave = () => {
    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")

    // 调用更新用户信息API
    const updateData = {
      nickname,
      gender,
      birthday,
      city,
      bio,
    }

    userService
      .updateProfile(updateData)
      .then((updatedUser) => {
        setUser(updatedUser)
        setIsLoading(false)
        setSuccessMessage("保存成功")

        // 更新本地存储的用户信息
        const auth = authService.getAuth()
        if (auth.user) {
          authService.saveAuth(auth.token, auth.refreshToken || "", updatedUser)
        }

        // 2秒后返回
        setTimeout(() => {
          goBack()
        }, 2000)
      })
      .catch((error) => {
        console.error("保存用户信息失败", error)
        setErrorMessage(error.message || "保存失败，请稍后重试")
        setIsLoading(false)
      })
  }

  /**
   * 处理性别值转换
   */
  const handleGenderChange = (value: string) => {
    // 前端使用中文，后端使用 male/female/other
    let backendValue = "other"
    if (value === "男") {
      backendValue = "male"
    } else if (value === "女") {
      backendValue = "female"
    } else if (value === "保密") {
      backendValue = "other"
    } else {
      backendValue = value
    }
    setGender(backendValue)
  }

  /**
   * 获取性别显示值
   */
  const getGenderDisplayValue = () => {
    if (gender === "male") return "男"
    if (gender === "female") return "女"
    return "保密"
  }

  if (isLoadingUser) {
    return (
      <div className="p-4 h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-2" size={32} />
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack} disabled={isLoading}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">编辑资料</h1>
      </div>

      {/* 错误提示 */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
          <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={16} />
          <span className="text-sm text-red-600">{errorMessage}</span>
        </div>
      )}

      {/* 成功提示 */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
          <span className="text-sm text-green-600">{successMessage}</span>
        </div>
      )}

      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt="用户头像" />
            <AvatarFallback>{user?.nickname?.substring(0, 1) || "用"}</AvatarFallback>
          </Avatar>
          {/* TODO: 实现头像上传功能 */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-0 right-0 rounded-full h-8 w-8"
            disabled={isLoading}
          >
            <Camera size={16} />
          </Button>
        </div>
        <Button variant="link" className="mt-2" disabled={isLoading}>
          更换头像
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nickname">昵称</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="pl-10"
              disabled={isLoading}
              placeholder="请输入昵称"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>性别</Label>
          <RadioGroup value={getGenderDisplayValue()} onValueChange={handleGenderChange} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="男" id="male" disabled={isLoading} />
              <Label htmlFor="male">男</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="女" id="female" disabled={isLoading} />
              <Label htmlFor="female">女</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="保密" id="secret" disabled={isLoading} />
              <Label htmlFor="secret">保密</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthday">生日</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="birthday"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">所在城市</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Select value={city} onValueChange={setCity} disabled={isLoading}>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="选择城市" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="北京">北京</SelectItem>
                <SelectItem value="上海">上海</SelectItem>
                <SelectItem value="广州">广州</SelectItem>
                <SelectItem value="深圳">深圳</SelectItem>
                <SelectItem value="杭州">杭州</SelectItem>
                <SelectItem value="成都">成都</SelectItem>
                <SelectItem value="重庆">重庆</SelectItem>
                <SelectItem value="西安">西安</SelectItem>
                <SelectItem value="南京">南京</SelectItem>
                <SelectItem value="武汉">武汉</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">手机号</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-10"
              disabled={true}
            />
          </div>
          <p className="text-xs text-gray-500">手机号不可修改</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">个人简介</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="介绍一下自己吧..."
            rows={4}
            disabled={isLoading}
          />
        </div>

        <Button className="w-full" onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={16} />
              保存中...
            </>
          ) : (
            "保存资料"
          )}
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Screen } from "@/lib/navigation-types"
import { userService, authService } from "@/lib/services/user-service"

interface LoginProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
  goBack: () => void
}

export function Login({ navigate, goBack }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  /**
   * 密码登录处理
   */
  const handleLogin = () => {
    // 验证输入
    if (!phone) {
      setErrorMessage("请输入手机号")
      return
    }
    if (!password) {
      setErrorMessage("请输入密码")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    // 调用真实API
    userService
      .login(phone, password)
      .then((response) => {
        // 保存认证信息
        authService.saveAuth(response.token, response.refreshToken, response.userInfo)
        setIsLoading(false)
        navigate("home")
      })
      .catch((error) => {
        console.error("登录失败", error)
        setErrorMessage(error.message || "登录失败，请检查手机号和密码")
        setIsLoading(false)
      })
  }

  /**
   * 发送验证码处理
   */
  const handleSendVerificationCode = () => {
    if (countdown > 0) return

    // 验证手机号
    if (!phone || phone.length !== 11) {
      setErrorMessage("请输入正确的手机号")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    // 调用发送验证码API
    userService
      .sendCode(phone, "login")
      .then(() => {
        // 开始倒计时
        setCountdown(60)
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("发送验证码失败", error)
        setErrorMessage(error.message || "发送验证码失败，请稍后重试")
        setIsLoading(false)
      })
  }

  /**
   * 验证码登录处理（暂未实现后端接口）
   */
  const handlePhoneLogin = () => {
    setErrorMessage("验证码登录功能暂未开放，请使用密码登录")
  }

  /**
   * 跳转注册页面
   */
  const handleRegister = () => {
    navigate("register")
  }

  /**
   * 忘记密码
   */
  const handleForgotPassword = () => {
    // TODO: 实现忘记密码功能
    setErrorMessage("忘记密码功能开发中")
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">登录</h1>
      </div>

      {/* 错误提示 */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
          <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={16} />
          <span className="text-sm text-red-600">{errorMessage}</span>
        </div>
      )}

      <Tabs defaultValue="password" className="flex-1">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="password">密码登录</TabsTrigger>
          <TabsTrigger value="verification">验证码登录</TabsTrigger>
        </TabsList>

        <TabsContent value="password" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">手机号</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="phone"
                type="tel"
                placeholder="请输入手机号"
                className="pl-10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
                maxLength={11}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="请输入密码"
                className="pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" disabled={isLoading} />
              <Label htmlFor="remember" className="text-sm">
                记住我
              </Label>
            </div>
            <Button variant="link" className="p-0 h-auto text-sm" disabled={isLoading} onClick={handleForgotPassword}>
              忘记密码?
            </Button>
          </div>

          <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "登录中..." : "登录"}
          </Button>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone-code">手机号</Label>
            <Input
              id="phone-code"
              type="tel"
              placeholder="请输入手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
              maxLength={11}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="verification-code">验证码</Label>
            <div className="flex space-x-2">
              <Input
                id="verification-code"
                type="text"
                placeholder="请输入验证码"
                className="flex-1"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                disabled={isLoading}
                maxLength={6}
              />
              <Button
                variant="outline"
                className="whitespace-nowrap"
                disabled={countdown > 0 || isLoading}
                onClick={handleSendVerificationCode}
              >
                {countdown > 0 ? `${countdown}秒后重发` : "获取验证码"}
              </Button>
            </div>
          </div>

          <Button className="w-full" onClick={handlePhoneLogin} disabled={isLoading}>
            {isLoading ? "登录中..." : "登录"}
          </Button>

          <p className="text-xs text-gray-500 text-center">验证码登录功能暂未开放</p>
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-center">
        <span className="text-gray-500">还没有账号？</span>
        <Button variant="link" className="p-0 h-auto" onClick={handleRegister} disabled={isLoading}>
          立即注册
        </Button>
      </div>

      <div className="mt-8">
        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-200 flex-grow"></div>
          <span className="px-4 text-sm text-gray-500">其他登录方式</span>
          <div className="border-t border-gray-200 flex-grow"></div>
        </div>

        <div className="flex justify-center space-x-6 mt-4">
          {[
            { name: "微信", color: "bg-green-500", icon: "/images/icon_wechat.svg" },
            { name: "QQ", color: "bg-blue-500", icon: "/images/icon_qq.svg" },
            { name: "微博", color: "bg-red-500", icon: "/images/icon_weibo.svg" },
          ].map((platform) => (
            <button key={platform.name} className="flex flex-col items-center" disabled={isLoading}>
              <div className={`w-10 h-10 rounded-full ${platform.color} flex items-center justify-center`}>
                <img src={platform.icon || "/placeholder.svg"} alt={platform.name} className="w-6 h-6" />
              </div>
              <span className="text-xs mt-1">{platform.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

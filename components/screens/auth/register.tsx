"use client"

import { useState } from "react"
import { ArrowLeft, Lock, Eye, EyeOff, User, Phone, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { Screen } from "@/components/mobile-app"
import { userService } from "@/lib/services/user-service"

interface RegisterProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
  goBack: () => void
}

export function Register({ navigate, goBack }: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [nickname, setNickname] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

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
      .sendCode(phone, "register")
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
   * 注册处理
   */
  const handleRegister = () => {
    // 验证输入
    if (!phone) {
      setErrorMessage("请输入手机号")
      return
    }
    if (phone.length !== 11) {
      setErrorMessage("请输入正确的手机号")
      return
    }
    if (!verificationCode) {
      setErrorMessage("请输入验证码")
      return
    }
    if (!password) {
      setErrorMessage("请输入密码")
      return
    }
    if (password !== confirmPassword) {
      setErrorMessage("两次输入的密码不一致")
      return
    }
    if (!agreeTerms) {
      setErrorMessage("请阅读并同意用户协议和隐私政策")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    // 调用注册API
    const registerData = {
      phone,
      code: verificationCode,
      password,
      nickname: nickname || phone.substring(7),
    }

    userService
      .register(registerData)
      .then(() => {
        setIsLoading(false)
        // 注册成功，跳转到登录页面
        navigate("login")
      })
      .catch((error) => {
        console.error("注册失败", error)
        setErrorMessage(error.message || "注册失败，请稍后重试")
        setIsLoading(false)
      })
  }

  /**
   * 跳转登录页面
   */
  const handleLogin = () => {
    navigate("login")
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack} disabled={isLoading}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">注册</h1>
      </div>

      {/* 错误提示 */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
          <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={16} />
          <span className="text-sm text-red-600">{errorMessage}</span>
        </div>
      )}

      <div className="space-y-4 flex-1">
        <div className="space-y-2">
          <Label htmlFor="nickname">昵称（可选）</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="nickname"
              type="text"
              placeholder="请输入昵称"
              className="pl-10"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">手机号</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
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

        <div className="space-y-2">
          <Label htmlFor="confirm-password">确认密码</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="请再次输入密码"
              className="pl-10 pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={agreeTerms}
            onCheckedChange={(checked) => setAgreeTerms(!!checked)}
            disabled={isLoading}
          />
          <Label htmlFor="terms" className="text-sm leading-tight">
            我已阅读并同意
            <Button
              variant="link"
              className="p-0 h-auto text-sm"
              onClick={() => navigate("user-agreement")}
              disabled={isLoading}
            >
              《用户协议》
            </Button>
            和
            <Button
              variant="link"
              className="p-0 h-auto text-sm"
              onClick={() => navigate("privacy-policy")}
              disabled={isLoading}
            >
              《隐私政策》
            </Button>
          </Label>
        </div>

        <Button className="w-full" onClick={handleRegister} disabled={!agreeTerms || isLoading}>
          {isLoading ? "注册中..." : "注册"}
        </Button>
      </div>

      <div className="mt-6 text-center">
        <span className="text-gray-500">已有账号？</span>
        <Button variant="link" className="p-0 h-auto" onClick={handleLogin} disabled={isLoading}>
          立即登录
        </Button>
      </div>
    </div>
  )
}

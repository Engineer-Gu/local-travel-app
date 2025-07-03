"use client"

import { useState } from "react"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { Screen } from "@/components/mobile-app"

// 在文件顶部添加导入语句（注释掉）
// import { userService } from "@/lib/services/user-service"

interface RegisterProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
  goBack: () => void
}

export function Register({ navigate, goBack }: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 在handleSendVerificationCode函数中添加真实API调用（注释掉）
  const handleSendVerificationCode = () => {
    if (countdown > 0 || !phone || phone.length !== 11) return

    // 真实API调用（注释掉）
    /* try {
      userService.sendRegisterCode(phone)
        .then(response => {
          if (response.success) {
            // 开始倒计时
            setCountdown(60);
            const timer = setInterval(() => {
              setCountdown((prev) => {
                if (prev <= 1) {
                  clearInterval(timer);
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
          } else {
            // 处理发送失败
            console.error("发送验证码失败:", response.message);
          }
        })
        .catch(error => {
          console.error("发送验证码请求失败", error);
        });
    } catch (error) {
      console.error("发送验证码异常", error);
    } */

    // 模拟发送验证码
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
  }

  // 在handleRegister函数中添加真实API调用（注释掉）
  const handleRegister = () => {
    setIsLoading(true)

    // 真实API调用（注释掉）
    /* try {
      const userData = {
        username,
        email,
        phone,
        password,
        verificationCode
      };

      userService.register(userData)
        .then(response => {
          if (response.success) {
            setIsLoading(false);
            navigate("login");
          } else {
            console.error("注册失败:", response.message);
            setIsLoading(false);
            // 这里可以添加错误处理，如显示错误消息
          }
        })
        .catch(error => {
          console.error("注册请求失败", error);
          setIsLoading(false);
        });
    } catch (error) {
      console.error("注册异常", error);
      setIsLoading(false);
    } */

    // 模拟注册过程
    setTimeout(() => {
      setIsLoading(false)
      navigate("login")
    }, 1500)
  }

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

      <div className="space-y-4 flex-1">
        <div className="space-y-2">
          <Label htmlFor="username">用户名</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="username"
              type="text"
              placeholder="请输入用户名"
              className="pl-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <Label htmlFor="email">邮箱</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="email"
              type="email"
              placeholder="请输入邮箱"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
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

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={agreeTerms}
            onCheckedChange={(checked) => setAgreeTerms(!!checked)}
            disabled={isLoading}
          />
          <Label htmlFor="terms" className="text-sm">
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

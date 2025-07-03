"use client"

import { useState } from "react"
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Screen } from "@/components/mobile-app"
// 在文件顶部添加导入语句（注释掉）
// import { userService } from "@/lib/services/user-service"

interface LoginProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
  goBack: () => void
}

export function Login({ navigate, goBack }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // 在handleLogin函数中添加真实API调用（注释掉）
  const handleLogin = () => {
    setIsLoading(true)

    // 真实API调用（注释掉）
    /* try {
      userService.login(email, password)
        .then(response => {
          // 保存token和用户信息
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));
          
          setIsLoading(false);
          navigate("home");
        })
        .catch(error => {
          console.error("登录失败", error);
          setIsLoading(false);
          // 这里可以添加错误处理，如显示错误消息
        });
    } catch (error) {
      console.error("登录请求失败", error);
      setIsLoading(false);
    } */

    // 模拟登录过程
    setTimeout(() => {
      // 模拟登录成功
      try {
        // 仅在浏览器环境中执行
        if (typeof window !== "undefined") {
          // 模拟数据
          const mockUser = {
            id: "user123",
            username: "小顾",
            avatar: "/placeholder.svg?height=100&width=100",
          }
          const mockToken = "mock-jwt-token-" + Math.random().toString(36).substring(2)

          // 保存模拟数据到localStorage
          window.localStorage.setItem("token", mockToken)
          window.localStorage.setItem("user", JSON.stringify(mockUser))
        }
      } catch (error) {
        console.error("存储用户数据失败", error)
      }

      setIsLoading(false)
      navigate("home")
    }, 1000)
  }

  // 在handlePhoneLogin函数中添加真实API调用（注释掉）
  const handlePhoneLogin = () => {
    setIsLoading(true)

    // 真实API调用（注释掉）
    /* try {
      userService.loginWithPhone(phone, verificationCode)
        .then(response => {
          // 保存token和用户信息
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));
          
          setIsLoading(false);
          navigate("home");
        })
        .catch(error => {
          console.error("手机登录失败", error);
          setIsLoading(false);
          // 这里可以添加错误处理，如显示错误消息
        });
    } catch (error) {
      console.error("手机登录请求失败", error);
      setIsLoading(false);
    } */

    // 模拟登录过程
    setTimeout(() => {
      // 模拟登录成功
      try {
        // 仅在浏览器环境中执行
        if (typeof window !== "undefined") {
          // 模拟数据
          const mockUser = {
            id: "user123",
            username: "小顾",
            avatar: "/placeholder.svg?height=100&width=100",
          }
          const mockToken = "mock-jwt-token-" + Math.random().toString(36).substring(2)

          // 保存模拟数据到localStorage
          window.localStorage.setItem("token", mockToken)
          window.localStorage.setItem("user", JSON.stringify(mockUser))
        }
      } catch (error) {
        console.error("存储用户数据失败", error)
      }

      setIsLoading(false)
      navigate("home")
    }, 1000)
  }

  // 在handleSendVerificationCode函数中添加真实API调用（注释掉）
  const handleSendVerificationCode = () => {
    if (countdown > 0 || !phone || phone.length !== 11) return

    // 真实API调用（注释掉）
    /* try {
      userService.sendLoginCode(phone)
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

  const handleRegister = () => {
    navigate("register")
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">登录</h1>
      </div>

      <Tabs defaultValue="password" className="flex-1">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="password">密码登录</TabsTrigger>
          <TabsTrigger value="verification">验证码登录</TabsTrigger>
        </TabsList>

        <TabsContent value="password" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">邮箱/手机号</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="email"
                type="text"
                placeholder="请输入邮箱或手机号"
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

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" disabled={isLoading} />
              <Label htmlFor="remember" className="text-sm">
                记住我
              </Label>
            </div>
            <Button variant="link" className="p-0 h-auto text-sm" disabled={isLoading}>
              忘记密码?
            </Button>
          </div>

          <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "登录中..." : "登录"}
          </Button>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">手机号</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="请输入手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
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
            { name: "微信", color: "bg-green-500", icon: "/placeholder.svg?height=40&width=40&text=微信" },
            { name: "QQ", color: "bg-blue-500", icon: "/placeholder.svg?height=40&width=40&text=QQ" },
            { name: "微博", color: "bg-red-500", icon: "/placeholder.svg?height=40&width=40&text=微博" },
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

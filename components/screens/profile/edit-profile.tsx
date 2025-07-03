"use client"

import { useState } from "react"
import { ArrowLeft, Camera, Calendar, MapPin, Mail, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditProfileProps {
  goBack: () => void
}

export function EditProfile({ goBack }: EditProfileProps) {
  const [avatar, setAvatar] = useState("/placeholder.svg?height=100&width=100")
  const [username, setUsername] = useState("用户名")
  const [gender, setGender] = useState("保密")
  const [birthday, setBirthday] = useState("1990-01-01")
  const [location, setLocation] = useState("杭州")
  const [email, setEmail] = useState("user@example.com")
  const [phone, setPhone] = useState("13800138000")
  const [bio, setBio] = useState("这个人很懒，什么都没有留下...")

  const handleSave = () => {
    // 保存用户资料
    goBack()
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">编辑资料</h1>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatar || "/placeholder.svg"} alt="用户头像" />
            <AvatarFallback>用户</AvatarFallback>
          </Avatar>
          <Button variant="secondary" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
            <Camera size={16} />
          </Button>
        </div>
        <Button variant="link" className="mt-2">
          更换头像
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">用户名</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="pl-10" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>性别</Label>
          <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="男" id="male" />
              <Label htmlFor="male">男</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="女" id="female" />
              <Label htmlFor="female">女</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="保密" id="secret" />
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
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">所在地</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="选择城市" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="北京">北京</SelectItem>
                <SelectItem value="上海">上海</SelectItem>
                <SelectItem value="广州">广州</SelectItem>
                <SelectItem value="深圳">深圳</SelectItem>
                <SelectItem value="杭州">杭州</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">手机号</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">个人简介</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="介绍一下自己吧..."
            rows={4}
          />
        </div>

        <Button className="w-full" onClick={handleSave}>
          保存资料
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Phone,
  AlertTriangle,
  MapPin,
  Shield,
  Ambulance,
  BadgeIcon as Police,
  Info,
  Send,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { Screen } from "@/lib/navigation-types"

interface EmergencyHelpProps {
  navigate: (screen: Screen, params?: Record<string, any>) => void
  goBack: () => void
}

export function EmergencyHelp({ navigate, goBack }: EmergencyHelpProps) {
  const { toast } = useToast()
  const [isEmergency, setIsEmergency] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false)
  const [isCallingSupport, setIsCallingSupport] = useState(false)
  const [showFAQ, setShowFAQ] = useState(false)

  // 模拟当前位置
  const [currentLocation, setCurrentLocation] = useState({
    name: "杭州西湖风景区",
    address: "浙江省杭州市西湖区龙井路1号",
    coordinates: "30.2418° N, 120.1716° E",
  })

  // 紧急服务列表
  const emergencyServices = [
    {
      id: "police",
      name: "警察",
      icon: <Police size={24} className="text-blue-500" />,
      phone: "110",
      description: "报警服务，处理治安问题、犯罪行为等",
    },
    {
      id: "ambulance",
      name: "急救",
      icon: <Ambulance size={24} className="text-red-500" />,
      phone: "120",
      description: "医疗急救服务，处理突发疾病、意外伤害等",
    },
    {
      id: "fire",
      name: "消防",
      icon: <AlertTriangle size={24} className="text-orange-500" />,
      phone: "119",
      description: "消防救援服务，处理火灾、救援等",
    },
    {
      id: "tourist",
      name: "旅游救助",
      icon: <Info size={24} className="text-green-500" />,
      phone: "12301",
      description: "旅游救助热线，处理旅游纠纷、投诉等",
    },
  ]

  // 安全提示
  const safetyTips = [
    "保持通讯畅通，手机电量充足",
    "随身携带身份证件和必要的药品",
    "注意天气变化，及时增减衣物",
    "结伴而行，避免单独前往偏远地区",
    "尊重当地风俗习惯和宗教信仰",
    "不要轻信陌生人，防止上当受骗",
    "保管好随身财物，特别是在人多的地方",
  ]

  // 常见问题
  const faqs = [
    {
      question: "如何在旅行中保障个人安全？",
      answer:
        "旅行前做好充分准备，了解目的地情况；随身携带必要证件和药品；与亲友保持联系；不要随身携带大量现金；注意天气变化等。",
    },
    {
      question: "遇到医疗紧急情况怎么办？",
      answer: "立即拨打120急救电话；告知准确位置和症状；如有慢性病，随身携带药物和病历；建议购买旅游保险覆盖医疗费用。",
    },
    {
      question: "如何应对财物丢失？",
      answer: "立即向当地警方报案并索取报案证明；挂失银行卡和证件；联系使领馆补办护照等证件；向保险公司报案理赔。",
    },
    {
      question: "遇到自然灾害怎么办？",
      answer: "保持冷静；听从当地政府和救援人员指挥；避开危险区域；与家人保持联系；准备必要的食物和饮用水。",
    },
    {
      question: "如何处理旅游纠纷？",
      answer:
        "保留相关证据如合同、收据等；与旅行社或服务商协商解决；投诉至旅游局或消费者协会；必要时拨打12301旅游服务热线。",
    },
  ]

  const handleEmergencyCall = () => {
    if (!selectedService) {
      toast({
        title: "请选择服务",
        description: "请先选择需要的紧急服务类型",
      })
      return
    }

    const service = emergencyServices.find((s) => s.id === selectedService)

    toast({
      title: `正在拨打${service?.name}电话`,
      description: `拨打电话: ${service?.phone}`,
    })

    // 模拟通话
    setTimeout(() => {
      setIsEmergency(false)
      setSelectedService(null)
      toast({
        title: "通话已结束",
        description: "希望您的问题已得到解决",
      })
    }, 3000)
  }

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "消息不能为空",
        description: "请输入您需要帮助的内容",
      })
      return
    }

    toast({
      title: "消息已发送",
      description: "客服将尽快回复您的求助",
    })

    setMessage("")
  }

  const handleStartEmergency = () => {
    setIsEmergency(true)
  }

  const handleCancelEmergency = () => {
    setIsEmergency(false)
    setSelectedService(null)
  }

  const handleUpdateLocation = () => {
    setIsUpdatingLocation(true)

    // 模拟位置更新
    setTimeout(() => {
      setCurrentLocation({
        name: "杭州西湖·雷峰塔景区",
        address: "浙江省杭州市西湖区南山路15号",
        coordinates: "30.2358° N, 120.1486° E",
      })

      setIsUpdatingLocation(false)

      toast({
        title: "位置已更新",
        description: "您的当前位置已成功更新",
      })
    }, 1500)
  }

  const handleCallSupport = () => {
    setIsCallingSupport(true)

    toast({
      title: "正在连接客服",
      description: "请稍候，正在为您接通人工客服...",
    })

    // 模拟通话
    setTimeout(() => {
      setIsCallingSupport(false)

      toast({
        title: "客服已接通",
        description: "您已成功接通人工客服",
      })
    }, 2000)
  }

  const toggleFAQ = () => {
    setShowFAQ(!showFAQ)
  }

  return (
    <div className="pb-16">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 border-b flex items-center">
        <Button variant="ghost" size="icon" onClick={goBack}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold ml-2">紧急求助</h1>
      </div>

      {/* 主要内容 */}
      <div className="p-4">
        {isEmergency ? (
          // 紧急求助模式
          <div>
            <Card className="mb-6 border-red-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <AlertTriangle size={24} className="text-red-500 mr-2" />
                    <h2 className="text-lg font-bold text-red-500">紧急求助模式</h2>
                  </div>
                  <Badge className="bg-red-500 animate-pulse">紧急</Badge>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium mb-2">您的当前位置</h3>
                  <div className="flex items-start mb-1">
                    <MapPin size={16} className="text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">{currentLocation.name}</p>
                      <p className="text-sm text-gray-500">{currentLocation.address}</p>
                      <p className="text-xs text-gray-400">{currentLocation.coordinates}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium mb-2">选择紧急服务</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {emergencyServices.map((service) => (
                      <Button
                        key={service.id}
                        variant={selectedService === service.id ? "default" : "outline"}
                        className={`flex items-center justify-start h-auto py-3 ${selectedService === service.id ? "bg-red-500 hover:bg-red-600" : ""
                          }`}
                        onClick={() => setSelectedService(service.id)}
                      >
                        <div className="mr-2">{service.icon}</div>
                        <div className="text-left">
                          <div className="font-medium">{service.name}</div>
                          <div className="text-xs">{service.phone}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" onClick={handleCancelEmergency}>
                    取消
                  </Button>
                  <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={handleEmergencyCall}>
                    <Phone size={16} className="mr-2" />
                    立即拨打
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // 常规模式
          <div>
            {/* 紧急求助按钮 */}
            <Card className="mb-6 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-red-700 p-4 text-white">
                <h2 className="text-lg font-bold mb-2">遇到紧急情况？</h2>
                <p className="text-sm mb-4">一键求助，我们将立即为您提供帮助</p>
                <Button className="w-full bg-white text-red-500 hover:bg-gray-100" onClick={handleStartEmergency}>
                  <AlertTriangle size={16} className="mr-2" />
                  紧急求助
                </Button>
              </div>
            </Card>

            {/* 当前位置 */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2 flex items-center">
                  <MapPin size={16} className="text-blue-500 mr-2" />
                  您的当前位置
                </h3>
                <div className="mb-2">
                  <p className="font-medium">{currentLocation.name}</p>
                  <p className="text-sm text-gray-500">{currentLocation.address}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleUpdateLocation}
                  disabled={isUpdatingLocation}
                >
                  {isUpdatingLocation ? "更新中..." : "更新位置"}
                </Button>
              </CardContent>
            </Card>

            {/* 安全提示 */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3 flex items-center">
                  <Shield size={16} className="text-green-500 mr-2" />
                  旅行安全提示
                </h3>
                <ul className="space-y-2">
                  {safetyTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block h-5 w-5 rounded-full bg-green-100 text-green-600 text-xs flex items-center justify-center mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 常见问题 */}
            {showFAQ && (
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium flex items-center">
                      <HelpCircle size={16} className="text-blue-500 mr-2" />
                      常见问题
                    </h3>
                    <Button variant="ghost" size="sm" onClick={toggleFAQ}>
                      关闭
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                        <h4 className="font-medium mb-1">{faq.question}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 客服咨询 */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">联系客服</h3>
                <p className="text-sm text-gray-500 mb-3">如有任何问题或需要帮助，请留言给我们的客服</p>
                <div className="flex mb-3">
                  <input
                    type="text"
                    placeholder="请输入您需要帮助的内容..."
                    className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button className="rounded-l-none" onClick={handleSendMessage}>
                    <Send size={16} />
                  </Button>
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 mr-2"
                    onClick={handleCallSupport}
                    disabled={isCallingSupport}
                  >
                    <Phone size={16} className="mr-2" />
                    {isCallingSupport ? "连接中..." : "电话咨询"}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={toggleFAQ}>
                    常见问题
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

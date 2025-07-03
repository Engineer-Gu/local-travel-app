"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface PrivacyPolicyProps {
  goBack: () => void
}

export function PrivacyPolicy({ goBack }: PrivacyPolicyProps) {
  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">隐私政策</h1>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-lg font-semibold">随行伴隐私政策</h2>
            <p className="text-sm text-gray-600">最后更新日期：2023年12月1日</p>

            <p className="mt-4">
              随行伴（以下简称"我们"）非常重视用户的隐私和个人信息保护。本隐私政策旨在向您说明我们如何收集、使用、存储和共享您的个人信息，以及您享有的相关权利。请您在使用我们的服务前，仔细阅读并了解本隐私政策。
            </p>

            <h3 className="text-base font-medium mt-4">1. 我们收集的信息</h3>
            <p>
              1.1 您提供的信息：
              <br />- 注册信息：当您注册账号时，我们会收集您的手机号码、电子邮箱地址、用户名和密码。
              <br />- 个人资料：您可以选择提供您的性别、生日、头像、兴趣爱好等信息。
              <br />- 支付信息：当您使用支付功能时，我们会收集必要的支付信息。
              <br />
              <br />
              1.2 我们自动收集的信息：
              <br />- 设备信息：如设备型号、操作系统版本、设备设置、应用程序版本号等。
              <br />- 日志信息：如IP地址、浏览器类型、访问日期和时间、访问的页面等。
              <br />- 位置信息：在您授权的情况下，我们会收集您的位置信息，以便为您提供基于位置的服务。
            </p>

            <h3 className="text-base font-medium mt-4">2. 我们如何使用收集的信息</h3>
            <p>
              2.1 提供服务：使用您的信息来提供、维护和改进我们的服务，如路线规划、玩伴匹配、导游预约等。
              <br />
              2.2 安全保障：使用您的信息来验证身份、防止欺诈和提高安全性。
              <br />
              2.3 个性化体验：根据您的偏好和行为，为您提供个性化的内容和推荐。
              <br />
              2.4 沟通联系：使用您的联系方式与您沟通，回应您的问题和请求。
              <br />
              2.5 改进服务：分析用户行为，了解用户需求，改进我们的产品和服务。
            </p>

            <h3 className="text-base font-medium mt-4">3. 信息的共享与披露</h3>
            <p>
              3.1 在以下情况下，我们可能会共享您的个人信息：
              <br />- 经您同意或授权的情况下。
              <br />- 与我们的合作伙伴共享，以便他们为您提供服务或改进服务。
              <br />- 遵循法律法规的要求、法律程序或政府部门的强制性要求。
              <br />- 在涉及合并、收购、资产转让或类似的交易时，我们可能会转让您的个人信息。
              <br />
              <br />
              3.2 我们不会将您的个人信息出售给第三方。
            </p>

            <h3 className="text-base font-medium mt-4">4. 信息的存储与保护</h3>
            <p>
              4.1 信息存储：我们会在必要的时间内保留您的个人信息，以实现本政策所述目的。
              <br />
              4.2 信息安全：我们采取各种安全措施来保护您的个人信息，防止数据遭到未经授权的访问、披露、使用、修改或丢失。
            </p>

            <h3 className="text-base font-medium mt-4">5. 您的权利</h3>
            <p>
              5.1 访问和更正：您有权访问和更正您的个人信息。
              <br />
              5.2 删除：在某些情况下，您有权要求删除您的个人信息。
              <br />
              5.3 撤回同意：您有权随时撤回您的同意，但这不会影响我们在您撤回同意前基于您的同意所进行的处理。
              <br />
              5.4 账号注销：您可以通过应用内的设置注销您的账号。
            </p>

            <h3 className="text-base font-medium mt-4">6. Cookie和类似技术</h3>
            <p>
              我们使用Cookie和类似技术来收集和存储您的信息，以便为您提供更个性化的服务和改进用户体验。您可以通过浏览器设置管理Cookie。
            </p>

            <h3 className="text-base font-medium mt-4">7. 未成年人保护</h3>
            <p>
              我们非常重视对未成年人个人信息的保护。如果您是未满18周岁的未成年人，在使用我们的服务前，应当事先取得您的父母或法定监护人的同意。
            </p>

            <h3 className="text-base font-medium mt-4">8. 隐私政策的更新</h3>
            <p>
              我们可能会不时更新本隐私政策。当我们更新隐私政策时，我们会在应用内发布更新后的版本，并在必要时通过其他方式通知您。
            </p>

            <h3 className="text-base font-medium mt-4">9. 联系我们</h3>
            <p>
              如果您对本隐私政策有任何疑问、意见或建议，请通过以下方式与我们联系：
              <br />
              电子邮件：privacy@suixingban.com
              <br />
              客服电话：400-123-4567
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

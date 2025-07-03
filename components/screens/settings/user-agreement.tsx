"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface UserAgreementProps {
  goBack: () => void
}

export function UserAgreement({ goBack }: UserAgreementProps) {
  return (
    <div className="p-4 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2 p-0" onClick={goBack}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-bold">用户协议</h1>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-lg font-semibold">随行伴用户协议</h2>
            <p className="text-sm text-gray-600">最后更新日期：2023年12月1日</p>

            <h3 className="text-base font-medium mt-4">1. 协议的接受与修改</h3>
            <p>
              欢迎使用随行伴平台（以下简称"本平台"）。本协议是您与本平台之间关于您使用本平台服务所订立的协议。在您注册成为本平台用户之前，请您仔细阅读本协议，您点击"注册"按钮后，本协议即构成对双方有约束力的法律文件。
            </p>

            <h3 className="text-base font-medium mt-4">2. 服务内容</h3>
            <p>
              本平台是一个提供同城游玩规划与社交互动的平台，用户可以通过本平台获取旅游路线规划、寻找志同道合的玩伴、预约专业导游等服务。本平台保留随时变更、中断或终止部分或全部服务的权利。
            </p>

            <h3 className="text-base font-medium mt-4">3. 用户账号与安全</h3>
            <p>
              3.1 用户在注册时应提供真实、准确、完整的个人资料，并保证资料的真实性和有效性。
              <br />
              3.2 用户应妥善保管账号和密码，因用户保管不善造成的损失由用户自行承担。
              <br />
              3.3 用户不得将账号出借、转让或售卖给他人使用。
            </p>

            <h3 className="text-base font-medium mt-4">4. 用户行为规范</h3>
            <p>
              4.1 用户在使用本平台服务时，必须遵守中华人民共和国相关法律法规。
              <br />
              4.2 用户不得利用本平台从事任何违法或不当的活动，包括但不限于：
              <br />- 发布、传播违法信息
              <br />- 侵犯他人知识产权或其他合法权益
              <br />- 从事任何可能对互联网正常运转造成不利影响的行为
              <br />- 从事其他违反法律法规、社会公德或损害他人合法权益的行为
            </p>

            <h3 className="text-base font-medium mt-4">5. 知识产权</h3>
            <p>
              5.1
              本平台所包含的全部内容，包括但不限于文字、图片、音频、视频、图表、标识、版面设计、专栏目录与名称、内容分类标准等，均受中华人民共和国著作权法、商标法、专利法及其他相关法律法规的保护。
              <br />
              5.2
              未经本平台或相关权利人书面许可，任何人不得以任何方式擅自使用（包括但不限于复制、传播、展示、镜像、上传、下载、修改、出租）本网站的局部或全部内容。
            </p>

            <h3 className="text-base font-medium mt-4">6. 免责声明</h3>
            <p>
              6.1 本平台不对用户发布的内容的真实性、准确性、合法性负责。
              <br />
              6.2
              因网络状况、通讯线路、第三方网站或管理部门的要求等任何原因而导致您不能正常使用本平台，本平台不承担任何法律责任。
              <br />
              6.3 本平台不保证服务一定能满足用户的要求，也不保证服务不会中断，对服务的及时性、安全性、准确性也不作保证。
            </p>

            <h3 className="text-base font-medium mt-4">7. 协议的变更</h3>
            <p>
              本平台有权在必要时修改本协议条款，协议条款一旦发生变动，将会在本平台相关页面上公布修改后的协议条款。如果不同意本平台对协议所做的修改，用户有权停止使用本平台的服务。如果用户继续使用本平台的服务，则视为用户接受本平台对协议所做的修改。
            </p>

            <h3 className="text-base font-medium mt-4">8. 适用法律与争议解决</h3>
            <p>
              本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。如发生本协议相关的任何争议或纠纷，双方应友好协商解决；协商不成的，任何一方均有权将争议提交至本平台所在地有管辖权的人民法院解决。
            </p>

            <h3 className="text-base font-medium mt-4">9. 其他条款</h3>
            <p>
              9.1 本协议中的标题仅为方便阅读而设，不应影响本协议的解释。
              <br />
              9.2 本协议的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 会员等级
export type MembershipLevel = "none" | "monthly" | "quarterly" | "yearly" | "lifetime"

// 会员状态
export type MembershipStatus = "active" | "expired" | "cancelled" | "pending"

// 会员信息接口
export interface Membership {
  id: string
  userId: string
  level: MembershipLevel
  status: MembershipStatus
  startDate: string
  endDate?: string
  autoRenew: boolean
  paymentMethod?: string
  lastPaymentDate?: string
  nextPaymentDate?: string
  price: number
  discountRate?: number
}

// 会员权益接口
export interface MembershipBenefit {
  id: string
  name: string
  description: string
  icon?: string
  forLevel: MembershipLevel[]
  highlight?: boolean
  category?: string
  details?: string
}

// 会员计划接口
export interface MembershipPlan {
  id: string
  level: MembershipLevel
  name: string
  price: number
  originalPrice: number
  duration: number // 天数
  benefits: string[] // 权益ID列表
  popular?: boolean
  discount?: number
  description?: string
}

// 会员历史记录接口
export interface MembershipHistory {
  id: string
  userId: string
  action: "subscribe" | "renew" | "upgrade" | "downgrade" | "cancel" | "expire"
  level: MembershipLevel
  date: string
  amount?: number
  paymentMethod?: string
  transactionId?: string
}

// 会员服务类
export class MembershipService {
  /**
   * 获取会员信息
   */
  /* static async getMembership(): Promise<Membership> {
    return api.get("/membership")
  } */
  /**
   * 获取会员计划列表
   */
  /* static async getMembershipPlans(): Promise<MembershipPlan[]> {
    return api.get("/membership/plans")
  } */
  /**
   * 获取会员权益列表
   */
  /* static async getMembershipBenefits(): Promise<MembershipBenefit[]> {
    return api.get("/membership/benefits")
  } */
  /**
   * 订阅会员
   * @param planId 计划ID
   * @param paymentMethod 支付方式
   */
  /* static async subscribeMembership(planId: string, paymentMethod: string) {
    return api.post("/membership/subscribe", { planId, paymentMethod })
  } */
  /**
   * 取消会员自动续费
   */
  /* static async cancelAutoRenew() {
    return api.post("/membership/cancel-auto-renew")
  } */
  /**
   * 开启会员自动续费
   */
  /* static async enableAutoRenew() {
    return api.post("/membership/enable-auto-renew")
  } */
  /**
   * 升级会员
   * @param planId 新计划ID
   */
  /* static async upgradeMembership(planId: string) {
    return api.post("/membership/upgrade", { planId })
  } */
  /**
   * 降级会员
   * @param planId 新计划ID
   */
  /* static async downgradeMembership(planId: string) {
    return api.post("/membership/downgrade", { planId })
  } */
  /**
   * 取消会员
   * @param reason 取消原因
   */
  /* static async cancelMembership(reason?: string) {
    return api.post("/membership/cancel", { reason })
  } */
  /**
   * 获取会员历史记录
   */
  /* static async getMembershipHistory(): Promise<MembershipHistory[]> {
    return api.get("/membership/history")
  } */
  /**
   * 获取会员专属优惠券
   */
  /* static async getMembershipCoupons() {
    return api.get("/membership/coupons")
  } */
  /**
   * 获取会员专属活动
   */
  /* static async getMembershipActivities() {
    return api.get("/membership/activities")
  } */
  /**
   * 获取会员专属礼品
   */
  /* static async getMembershipGifts() {
    return api.get("/membership/gifts")
  } */
  /**
   * 领取会员礼品
   * @param giftId 礼品ID
   */
  /* static async claimMembershipGift(giftId: string) {
    return api.post(`/membership/gifts/${giftId}/claim`)
  } */
  /**
   * 获取会员特权使用记录
   * @param privilegeType 特权类型
   */
  /* static async getPrivilegeUsageHistory(privilegeType?: string) {
    return api.get("/membership/privilege-usage", { params: { type: privilegeType } })
  } */
  /**
   * 获取会员折扣信息
   * @param productId 商品ID
   */
  /* static async getMembershipDiscount(productId: string) {
    return api.get(`/membership/discount`, { params: { productId } })
  } */
  /**
   * 获取会员推荐码
   */
  /* static async getMembershipReferralCode() {
    return api.get("/membership/referral-code")
  } */
  /**
   * 使用推荐码
   * @param code 推荐码
   */
  /* static async useReferralCode(code: string) {
    return api.post("/membership/use-referral-code", { code })
  } */
  /**
   * 获取会员推荐奖励记录
   */
  /* static async getReferralRewards() {
    return api.get("/membership/referral-rewards")
  } */
  /**
   * 获取会员等级特权对比
   */
  /* static async getMembershipLevelComparison() {
    return api.get("/membership/level-comparison")
  } */
}

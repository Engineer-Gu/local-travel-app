// 钱包交易类型
export type TransactionType =
  | "recharge" // 充值
  | "withdraw" // 提现
  | "transfer" // 转账
  | "payment" // 支付
  | "refund" // 退款
  | "reward" // 奖励
  | "commission" // 佣金
  | "membership" // 会员费用
  | "other" // 其他

// 钱包交易状态
export type TransactionStatus =
  | "pending" // 处理中
  | "success" // 成功
  | "failed" // 失败
  | "cancelled" // 已取消

// 钱包交易记录接口
export interface WalletTransaction {
  id: string
  type: TransactionType
  amount: number
  balance: number
  status: TransactionStatus
  title: string
  description?: string
  createdAt: string
  completedAt?: string
  relatedId?: string // 关联的订单ID、转账ID等
  paymentMethod?: string
  transactionNo?: string // 交易流水号
}

// 钱包账户接口
export interface WalletAccount {
  id: string
  userId: string
  balance: number
  frozenAmount: number
  totalIncome: number
  totalExpense: number
  lastRechargeTime?: string
  lastWithdrawTime?: string
  status: "normal" | "frozen" | "limited"
  payPassword?: boolean // 是否已设置支付密码
}

// 钱包统计接口
export interface WalletStats {
  todayExpense: number
  todayIncome: number
  monthExpense: number
  monthIncome: number
  totalBalance: number
  availableBalance: number
  frozenAmount: number
  pendingWithdraw?: number
}

// 钱包交易筛选接口
export interface TransactionFilter {
  type?: TransactionType | "all"
  status?: TransactionStatus | "all"
  startDate?: string
  endDate?: string
  minAmount?: number
  maxAmount?: number
  keyword?: string
  page?: number
  pageSize?: number
  sortBy?: "date" | "amount"
  sortOrder?: "asc" | "desc"
}

// 充值请求接口
export interface RechargeRequest {
  amount: number
  paymentMethod: string
  channel?: string // 充值渠道
  couponId?: string // 优惠券ID
}

// 提现请求接口
export interface WithdrawRequest {
  amount: number
  bankId?: string // 银行卡ID
  accountName?: string
  accountNumber?: string
  bankName?: string
  payPassword: string
}

// 转账请求接口
export interface TransferRequest {
  amount: number
  receiverId: string
  message?: string
  payPassword: string
}

// 银行卡接口
export interface BankCard {
  id: string
  userId: string
  bankName: string
  accountName: string
  accountNumber: string
  cardType: "debit" | "credit"
  isDefault: boolean
  lastUsed?: string
}

// 钱包服务类
export class WalletService {
  /**
   * 获取钱包账户信息
   */
  /* static async getWalletAccount(): Promise<WalletAccount> {
    return api.get("/wallet/account")
  } */
  /**
   * 获取钱包统计信息
   */
  /* static async getWalletStats(): Promise<WalletStats> {
    return api.get("/wallet/stats")
  } */
  /**
   * 获取交易记录
   * @param filter 筛选条件
   */
  /* static async getTransactions(filter?: TransactionFilter): Promise<WalletTransaction[]> {
    return api.get("/wallet/transactions", { params: filter })
  } */
  /**
   * 获取交易详情
   * @param transactionId 交易ID
   */
  /* static async getTransactionDetail(transactionId: string): Promise<WalletTransaction> {
    return api.get(`/wallet/transactions/${transactionId}`)
  } */
  /**
   * 充值
   * @param data 充值数据
   */
  /* static async recharge(data: RechargeRequest) {
    return api.post("/wallet/recharge", data)
  } */
  /**
   * 提现
   * @param data 提现数据
   */
  /* static async withdraw(data: WithdrawRequest) {
    return api.post("/wallet/withdraw", data)
  } */
  /**
   * 转账
   * @param data 转账数据
   */
  /* static async transfer(data: TransferRequest) {
    return api.post("/wallet/transfer", data)
  } */
  /**
   * 设置支付密码
   * @param password 支付密码
   */
  /* static async setPayPassword(password: string) {
    return api.post("/wallet/pay-password", { password })
  } */
  /**
   * 修改支付密码
   * @param oldPassword 旧密码
   * @param newPassword 新密码
   */
  /* static async changePayPassword(oldPassword: string, newPassword: string) {
    return api.put("/wallet/pay-password", { oldPassword, newPassword })
  } */
  /**
   * 重置支付密码
   * @param verificationCode 验证码
   * @param newPassword 新密码
   */
  /* static async resetPayPassword(verificationCode: string, newPassword: string) {
    return api.post("/wallet/reset-pay-password", { verificationCode, newPassword })
  } */
  /**
   * 验证支付密码
   * @param password 支付密码
   */
  /* static async verifyPayPassword(password: string) {
    return api.post("/wallet/verify-pay-password", { password })
  } */
  /**
   * 获取银行卡列表
   */
  /* static async getBankCards(): Promise<BankCard[]> {
    return api.get("/wallet/bank-cards")
  } */
  /**
   * 添加银行卡
   * @param data 银行卡数据
   */
  /* static async addBankCard(data: {
    bankName: string
    accountName: string
    accountNumber: string
    cardType: "debit" | "credit"
    isDefault?: boolean
  }): Promise<BankCard> {
    return api.post("/wallet/bank-cards", data)
  } */
  /**
   * 删除银行卡
   * @param cardId 银行卡ID
   */
  /* static async deleteBankCard(cardId: string) {
    return api.delete(`/wallet/bank-cards/${cardId}`)
  } */
  /**
   * 设置默认银行卡
   * @param cardId 银行卡ID
   */
  /* static async setDefaultBankCard(cardId: string) {
    return api.put(`/wallet/bank-cards/${cardId}/default`)
  } */
  /**
   * 获取充值渠道
   */
  /* static async getRechargeChannels() {
    return api.get("/wallet/recharge-channels")
  } */
  /**
   * 获取提现渠道
   */
  /* static async getWithdrawChannels() {
    return api.get("/wallet/withdraw-channels")
  } */
  /**
   * 获取钱包活动
   */
  /* static async getWalletActivities() {
    return api.get("/wallet/activities")
  } */
  /**
   * 获取钱包优惠券
   */
  /* static async getWalletCoupons() {
    return api.get("/wallet/coupons")
  } */
  /**
   * 冻结钱包
   */
  /* static async freezeWallet() {
    return api.post("/wallet/freeze")
  } */
  /**
   * 解冻钱包
   */
  /* static async unfreezeWallet() {
    return api.post("/wallet/unfreeze")
  } */
  /**
   * 获取钱包安全设置
   */
  /* static async getWalletSecuritySettings() {
    return api.get("/wallet/security-settings")
  } */
  /**
   * 更新钱包安全设置
   * @param settings 安全设置
   */
  /* static async updateWalletSecuritySettings(settings: {
    payPasswordRequired?: boolean
    smsNotification?: boolean
    transactionLimit?: number
  }) {
    return api.put("/wallet/security-settings", settings)
  } */
  /**
   * 获取钱包限额信息
   */
  /* static async getWalletLimits() {
    return api.get("/wallet/limits")
  } */
  /**
   * 申请提升限额
   * @param data 申请数据
   */
  /* static async applyLimitIncrease(data: {
    newLimit: number
    reason: string
    attachments?: string[]
  }) {
    return api.post("/wallet/apply-limit-increase", data)
  } */
}

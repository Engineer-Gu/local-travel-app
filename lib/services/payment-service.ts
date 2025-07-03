// 支付服务
export const paymentService = {
  // 创建支付订单
  createPaymentOrder: async (orderData: {
    userId: string
    orderType: "ticket" | "product" | "membership" | "guide" | "recharge"
    orderId: string
    amount: number
    currency?: string
    description?: string
  }) => {
    /* 
    // 真实API调用
    try {
      const response = await api.post('/payments/create', orderData);
      return response.data;
    } catch (error) {
      console.error('创建支付订单失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      paymentId: "PAY" + Date.now(),
      orderId: orderData.orderId,
      amount: orderData.amount,
      currency: orderData.currency || "CNY",
      status: "pending",
      createdAt: new Date().toISOString(),
      expireAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30分钟后过期
      paymentUrl: "https://example.com/pay/" + "PAY" + Date.now(),
      qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAAA",
    }
  },

  // 获取支付方式
  getPaymentMethods: async (userId: string, amount: number, currency = "CNY") => {
    /* 
    // 真实API调用
    try {
      const response = await api.get('/payments/methods', {
        params: { userId, amount, currency }
      });
      return response.data;
    } catch (error) {
      console.error('获取支付方式失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      defaultMethod: "wechat_pay",
      methods: [
        {
          id: "wechat_pay",
          name: "微信支付",
          icon: "/images/payment/wechat.png",
          available: true,
          discount: 0,
          description: "使用微信扫码支付",
        },
        {
          id: "alipay",
          name: "支付宝",
          icon: "/images/payment/alipay.png",
          available: true,
          discount: 0,
          description: "使用支付宝扫码支付",
        },
        {
          id: "union_pay",
          name: "银联支付",
          icon: "/images/payment/unionpay.png",
          available: true,
          discount: 0,
          description: "使用银联卡支付",
        },
        {
          id: "wallet",
          name: "钱包余额",
          icon: "/images/payment/wallet.png",
          available: true,
          balance: 500,
          description: "使用钱包余额支付",
        },
      ],
    }
  },

  // 验证支付结果
  verifyPayment: async (paymentId: string) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get(`/payments/${paymentId}/verify`);
      return response.data;
    } catch (error) {
      console.error('验证支付结果失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      paymentId: paymentId,
      status: "success", // success, failed, pending
      paidAt: new Date().toISOString(),
      transactionId: "TRX" + Date.now(),
      paymentMethod: "wechat_pay",
      orderId: "ORD1652680000000",
      amount: 120,
      currency: "CNY",
    }
  },

  // 获取支付历史
  getPaymentHistory: async (
    userId: string,
    params: {
      page?: number
      pageSize?: number
      startDate?: string
      endDate?: string
      status?: "all" | "success" | "failed" | "pending" | "refunded"
    },
  ) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get(`/users/${userId}/payments`, { params });
      return response.data;
    } catch (error) {
      console.error('获取支付历史失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      total: 15,
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      payments: [
        {
          paymentId: "PAY1652680000000",
          orderId: "ORD1652680000000",
          orderType: "ticket",
          description: "故宫博物院门票 x2",
          amount: 120,
          currency: "CNY",
          status: "success",
          paymentMethod: "wechat_pay",
          createdAt: "2023-05-16T10:00:00Z",
          paidAt: "2023-05-16T10:02:30Z",
        },
        {
          paymentId: "PAY1652670000000",
          orderId: "ORD1652670000000",
          orderType: "membership",
          description: "VIP会员月卡",
          amount: 30,
          currency: "CNY",
          status: "success",
          paymentMethod: "alipay",
          createdAt: "2023-05-16T07:30:00Z",
          paidAt: "2023-05-16T07:31:45Z",
        },
        {
          paymentId: "PAY1652660000000",
          orderId: "ORD1652660000000",
          orderType: "recharge",
          description: "钱包充值",
          amount: 100,
          currency: "CNY",
          status: "pending",
          paymentMethod: "union_pay",
          createdAt: "2023-05-16T05:00:00Z",
          paidAt: null,
        },
      ],
    }
  },

  // 申请退款
  requestRefund: async (paymentId: string, userId: string, reason: string) => {
    /* 
    // 真实API调用
    try {
      const response = await api.post(`/payments/${paymentId}/refund`, {
        userId,
        reason
      });
      return response.data;
    } catch (error) {
      console.error('申请退款失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      success: true,
      refundId: "REF" + Date.now(),
      paymentId: paymentId,
      refundAmount: 120,
      refundStatus: "processing",
      requestTime: new Date().toISOString(),
      estimatedCompletionTime: "3-5个工作日",
      message: "退款申请已提交，将在3-5个工作日内处理",
    }
  },

  // 获取退款状态
  getRefundStatus: async (refundId: string) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get(`/refunds/${refundId}`);
      return response.data;
    } catch (error) {
      console.error('获取退款状态失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      refundId: refundId,
      paymentId: "PAY1652680000000",
      orderId: "ORD1652680000000",
      refundAmount: 120,
      currency: "CNY",
      status: "completed", // processing, completed, rejected
      requestTime: "2023-05-17T09:00:00Z",
      completionTime: "2023-05-19T14:30:00Z",
      refundMethod: "original_payment",
      reason: "行程变更",
      remarks: "退款已完成，已退回原支付账户",
    }
  },
}

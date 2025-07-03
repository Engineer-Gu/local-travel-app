// 优惠券服务
export const couponService = {
  // 获取优惠券列表
  getCouponList: async (
    userId: string,
    params: {
      status?: "all" | "valid" | "used" | "expired"
      page?: number
      pageSize?: number
      sortBy?: "expiry" | "value"
    },
  ) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get(`/users/${userId}/coupons`, { params });
      return response.data;
    } catch (error) {
      console.error('获取优惠券列表失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      total: 8,
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      coupons: [
        {
          id: "c1",
          name: "新用户专享券",
          type: "discount",
          value: 10, // 折扣金额或折扣率
          minSpend: 100,
          isPercentage: false,
          startDate: "2023-05-01T00:00:00Z",
          endDate: "2023-06-01T23:59:59Z",
          status: "valid",
          usageScope: "all", // all, ticket, product, membership
          description: "新用户首单满100元减10元",
          backgroundColor: "#FF6B6B",
          textColor: "#FFFFFF",
          icon: "/images/coupons/new-user.png",
        },
        {
          id: "c2",
          name: "门票9折券",
          type: "discount",
          value: 0.9, // 90%折扣
          minSpend: 0,
          isPercentage: true,
          startDate: "2023-05-10T00:00:00Z",
          endDate: "2023-05-20T23:59:59Z",
          status: "valid",
          usageScope: "ticket",
          description: "门票9折优惠",
          backgroundColor: "#4ECDC4",
          textColor: "#FFFFFF",
          icon: "/images/coupons/ticket-discount.png",
        },
        {
          id: "c3",
          name: "生日特惠券",
          type: "discount",
          value: 20,
          minSpend: 200,
          isPercentage: false,
          startDate: "2023-04-15T00:00:00Z",
          endDate: "2023-04-30T23:59:59Z",
          status: "expired",
          usageScope: "all",
          description: "生日月专享优惠",
          backgroundColor: "#C7B8EA",
          textColor: "#FFFFFF",
          icon: "/images/coupons/birthday.png",
        },
      ],
    }
  },

  // 领取优惠券
  claimCoupon: async (userId: string, couponCode: string) => {
    /* 
    // 真实API调用
    try {
      const response = await api.post('/coupons/claim', {
        userId,
        couponCode
      });
      return response.data;
    } catch (error) {
      console.error('领取优惠券失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      success: true,
      coupon: {
        id: "c4",
        name: "618活动券",
        type: "discount",
        value: 30,
        minSpend: 300,
        isPercentage: false,
        startDate: "2023-06-01T00:00:00Z",
        endDate: "2023-06-30T23:59:59Z",
        status: "valid",
        usageScope: "all",
        description: "618活动满300减30",
        backgroundColor: "#FF9F1C",
        textColor: "#FFFFFF",
        icon: "/images/coupons/618.png",
      },
      message: "优惠券领取成功",
    }
  },

  // 使用优惠券
  useCoupon: async (userId: string, couponId: string, orderId: string, orderAmount: number) => {
    /* 
    // 真实API调用
    try {
      const response = await api.post('/coupons/use', {
        userId,
        couponId,
        orderId,
        orderAmount
      });
      return response.data;
    } catch (error) {
      console.error('使用优惠券失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      success: true,
      couponId: couponId,
      orderId: orderId,
      originalAmount: orderAmount,
      discountAmount: 10,
      finalAmount: orderAmount - 10,
      message: "优惠券使用成功",
    }
  },

  // 获取优惠券详情
  getCouponDetail: async (couponId: string, userId: string) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get(`/coupons/${couponId}`, {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      console.error('获取优惠券详情失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      id: couponId,
      name: "新用户专享券",
      type: "discount",
      value: 10,
      minSpend: 100,
      isPercentage: false,
      startDate: "2023-05-01T00:00:00Z",
      endDate: "2023-06-01T23:59:59Z",
      status: "valid",
      usageScope: "all",
      description: "新用户首单满100元减10元",
      termsAndConditions: [
        "1. 仅限新注册用户使用",
        "2. 单笔订单满100元可用",
        "3. 不可与其他优惠同时使用",
        "4. 有效期至2023年6月1日",
      ],
      applicableProducts: [
        {
          id: "p1",
          name: "故宫博物院门票",
          category: "景点门票",
          imageUrl: "/images/tickets/forbidden-city.jpg",
        },
        {
          id: "p2",
          name: "颐和园门票",
          category: "景点门票",
          imageUrl: "/images/tickets/summer-palace.jpg",
        },
      ],
      backgroundColor: "#FF6B6B",
      textColor: "#FFFFFF",
      icon: "/images/coupons/new-user.png",
      qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAAA",
      source: "新用户注册奖励",
      receivedAt: "2023-05-10T08:30:00Z",
    }
  },

  // 获取可用优惠券
  getAvailableCoupons: async (
    userId: string,
    params: {
      orderType: "ticket" | "product" | "membership" | "guide"
      productId?: string
      amount: number
    },
  ) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get(`/users/${userId}/available-coupons`, { params });
      return response.data;
    } catch (error) {
      console.error('获取可用优惠券失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      orderAmount: params.amount,
      availableCoupons: [
        {
          id: "c1",
          name: "新用户专享券",
          type: "discount",
          value: 10,
          minSpend: 100,
          isPercentage: false,
          endDate: "2023-06-01T23:59:59Z",
          discountAmount: 10,
          finalAmount: params.amount - 10,
          backgroundColor: "#FF6B6B",
          textColor: "#FFFFFF",
        },
        {
          id: "c2",
          name: "门票9折券",
          type: "discount",
          value: 0.9,
          minSpend: 0,
          isPercentage: true,
          endDate: "2023-05-20T23:59:59Z",
          discountAmount: Math.round(params.amount * 0.1 * 100) / 100,
          finalAmount: Math.round(params.amount * 0.9 * 100) / 100,
          backgroundColor: "#4ECDC4",
          textColor: "#FFFFFF",
        },
      ],
      unavailableCoupons: [
        {
          id: "c5",
          name: "满500减50",
          type: "discount",
          value: 50,
          minSpend: 500,
          isPercentage: false,
          endDate: "2023-06-30T23:59:59Z",
          reason: "未满足最低消费金额",
          backgroundColor: "#FF9F1C",
          textColor: "#FFFFFF",
        },
      ],
      bestOption: {
        couponId: "c2",
        discountAmount: Math.round(params.amount * 0.1 * 100) / 100,
        finalAmount: Math.round(params.amount * 0.9 * 100) / 100,
      },
    }
  },

  // 获取优惠券活动
  getCouponCampaigns: async () => {
    /* 
    // 真实API调用
    try {
      const response = await api.get('/coupon-campaigns');
      return response.data;
    } catch (error) {
      console.error('获取优惠券活动失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      campaigns: [
        {
          id: "camp1",
          name: "618年中大促",
          startDate: "2023-06-01T00:00:00Z",
          endDate: "2023-06-30T23:59:59Z",
          description: "年中大促，多重优惠等你来",
          bannerImage: "/images/campaigns/618-banner.jpg",
          coupons: [
            {
              id: "cc1",
              name: "满300减30",
              value: 30,
              minSpend: 300,
              isPercentage: false,
              backgroundColor: "#FF9F1C",
              textColor: "#FFFFFF",
            },
            {
              id: "cc2",
              name: "满500减60",
              value: 60,
              minSpend: 500,
              isPercentage: false,
              backgroundColor: "#FF9F1C",
              textColor: "#FFFFFF",
            },
          ],
          rules: "每个用户限领一次，有效期至2023年6月30日",
        },
        {
          id: "camp2",
          name: "端午节特惠",
          startDate: "2023-06-20T00:00:00Z",
          endDate: "2023-06-25T23:59:59Z",
          description: "端午佳节，出游好时光",
          bannerImage: "/images/campaigns/dragon-boat-banner.jpg",
          coupons: [
            {
              id: "cc3",
              name: "景点门票8折",
              value: 0.8,
              minSpend: 0,
              isPercentage: true,
              backgroundColor: "#4ECDC4",
              textColor: "#FFFFFF",
            },
          ],
          rules: "仅限景点门票使用，有效期至2023年7月10日",
        },
      ],
    }
  },
}

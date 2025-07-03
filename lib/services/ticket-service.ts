// 票务服务
export const ticketService = {
  // 获取票务列表
  getTicketList: async (params: {
    cityId?: string
    categoryId?: string
    keyword?: string
    page?: number
    pageSize?: number
    sortBy?: "price" | "popularity" | "rating"
  }) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get('/tickets', { params });
      return response.data;
    } catch (error) {
      console.error('获取票务列表失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      total: 120,
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      tickets: [
        {
          id: "t1",
          name: "故宫博物院门票",
          category: "景点门票",
          price: 60,
          discountPrice: 60,
          rating: 4.8,
          salesCount: 15000,
          imageUrl: "/images/tickets/forbidden-city.jpg",
          tags: ["热门", "必游"],
          openTime: "8:30-17:00",
          address: "北京市东城区景山前街4号",
          latitude: 39.916345,
          longitude: 116.39066,
        },
        {
          id: "t2",
          name: "颐和园门票",
          category: "景点门票",
          price: 30,
          discountPrice: 25,
          rating: 4.7,
          salesCount: 12000,
          imageUrl: "/images/tickets/summer-palace.jpg",
          tags: ["优惠", "公园"],
          openTime: "6:30-18:00",
          address: "北京市海淀区新建宫门路19号",
          latitude: 39.991632,
          longitude: 116.273543,
        },
      ],
    }
  },

  // 获取票务详情
  getTicketDetail: async (ticketId: string) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get(`/tickets/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error('获取票务详情失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      id: ticketId,
      name: "故宫博物院门票",
      description:
        "故宫博物院，旧称为紫禁城，是中国明清两代的皇家宫殿，位于北京中轴线的中心，是中国古代宫廷建筑之精华。",
      category: "景点门票",
      price: 60,
      discountPrice: 60,
      rating: 4.8,
      reviewCount: 3500,
      salesCount: 15000,
      images: [
        "/images/tickets/forbidden-city-1.jpg",
        "/images/tickets/forbidden-city-2.jpg",
        "/images/tickets/forbidden-city-3.jpg",
      ],
      tags: ["热门", "必游", "文化遗产"],
      openTime: "8:30-17:00",
      address: "北京市东城区景山前街4号",
      latitude: 39.916345,
      longitude: 116.39066,
      notice: "1. 需提前一天预约\n2. 每日限流8万人次\n3. 周一闭馆（国家法定节假日除外）",
      ticketTypes: [
        {
          id: "tt1",
          name: "成人票",
          price: 60,
          description: "18-59周岁游客",
        },
        {
          id: "tt2",
          name: "学生票",
          price: 30,
          description: "全日制大学本科及以下学历学生",
        },
        {
          id: "tt3",
          name: "老人票",
          price: 30,
          description: "60周岁及以上老人",
        },
      ],
      availableDates: [
        {
          date: "2023-05-16",
          remaining: 5000,
          status: "available",
        },
        {
          date: "2023-05-17",
          remaining: 3000,
          status: "available",
        },
        {
          date: "2023-05-18",
          remaining: 0,
          status: "sold_out",
        },
      ],
      refundPolicy: "订单支付成功后，游玩日期前一天12:00前可申请退款，扣除5%手续费；游玩日期前一天12:00后不可退款。",
      faqs: [
        {
          question: "门票可以现场购买吗？",
          answer: "故宫博物院门票需要提前在网上预约购买，不接受现场购票。",
        },
        {
          question: "门票包含语音讲解吗？",
          answer: "门票不包含语音讲解，语音讲解需另行租赁，价格为40元/台。",
        },
      ],
    }
  },

  // 预订门票
  bookTicket: async (bookingData: {
    userId: string
    ticketId: string
    ticketTypeId: string
    visitDate: string
    quantity: number
    visitorInfo: Array<{
      name: string
      idType: "id_card" | "passport"
      idNumber: string
      phone?: string
    }>
    contactPerson: {
      name: string
      phone: string
      email?: string
    }
    couponId?: string
  }) => {
    /* 
    // 真实API调用
    try {
      const response = await api.post('/tickets/booking', bookingData);
      return response.data;
    } catch (error) {
      console.error('预订门票失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      success: true,
      orderId: "ORD" + Date.now(),
      orderTime: new Date().toISOString(),
      ticketName: "故宫博物院门票",
      ticketType: "成人票",
      visitDate: bookingData.visitDate,
      quantity: bookingData.quantity,
      unitPrice: 60,
      totalAmount: 60 * bookingData.quantity,
      discountAmount: 0,
      paymentAmount: 60 * bookingData.quantity,
      orderStatus: "pending_payment",
      paymentDeadline: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30分钟后
      qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAAA",
    }
  },

  // 获取用户票务订单
  getUserTicketOrders: async (
    userId: string,
    params: {
      status?: "all" | "pending_payment" | "paid" | "used" | "expired" | "refunded"
      page?: number
      pageSize?: number
    },
  ) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get(`/users/${userId}/ticket-orders`, { params });
      return response.data;
    } catch (error) {
      console.error('获取用户票务订单失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      total: 8,
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      orders: [
        {
          orderId: "ORD1652680000000",
          ticketName: "故宫博物院门票",
          ticketType: "成人票",
          visitDate: "2023-05-20",
          quantity: 2,
          totalAmount: 120,
          orderStatus: "paid",
          orderTime: "2023-05-16T10:00:00Z",
          imageUrl: "/images/tickets/forbidden-city.jpg",
          qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAAA",
        },
        {
          orderId: "ORD1652590000000",
          ticketName: "颐和园门票",
          ticketType: "成人票",
          visitDate: "2023-05-18",
          quantity: 1,
          totalAmount: 30,
          orderStatus: "pending_payment",
          orderTime: "2023-05-15T10:00:00Z",
          imageUrl: "/images/tickets/summer-palace.jpg",
          paymentDeadline: "2023-05-15T10:30:00Z",
        },
      ],
    }
  },

  // 取消票务订单
  cancelTicketOrder: async (orderId: string, userId: string, reason?: string) => {
    /* 
    // 真实API调用
    try {
      const response = await api.post(`/ticket-orders/${orderId}/cancel`, {
        userId,
        reason
      });
      return response.data;
    } catch (error) {
      console.error('取消票务订单失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      success: true,
      orderId: orderId,
      refundAmount: 120,
      refundStatus: "processing",
      estimatedRefundTime: "3-5个工作日",
      message: "订单取消成功，退款将在3-5个工作日内退回原支付账户",
    }
  },

  // 获取票务评价
  getTicketReviews: async (
    ticketId: string,
    params: {
      page?: number
      pageSize?: number
      sortBy?: "time" | "rating"
    },
  ) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get(`/tickets/${ticketId}/reviews`, { params });
      return response.data;
    } catch (error) {
      console.error('获取票务评价失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      total: 350,
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      averageRating: 4.8,
      ratingDistribution: {
        5: 280,
        4: 50,
        3: 15,
        2: 3,
        1: 2,
      },
      reviews: [
        {
          id: "r1",
          userId: "u1",
          userName: "旅行者123",
          userAvatar: "/images/avatars/user1.jpg",
          rating: 5,
          content: "非常棒的体验，故宫的建筑太壮观了，历史感很强，值得一去！",
          images: ["/images/reviews/review1-1.jpg", "/images/reviews/review1-2.jpg"],
          visitDate: "2023-05-10",
          reviewTime: "2023-05-12T14:30:00Z",
          likes: 25,
        },
        {
          id: "r2",
          userId: "u2",
          userName: "小明",
          userAvatar: "/images/avatars/user2.jpg",
          rating: 4,
          content: "景点很好，就是人太多了，建议早点去避开人流高峰。",
          images: [],
          visitDate: "2023-05-08",
          reviewTime: "2023-05-09T09:15:00Z",
          likes: 10,
        },
      ],
    }
  },
}

// 签到服务接口
export const checkinService = {
  // 获取用户签到信息
  getUserCheckinInfo: async () => {
    // 模拟数据
    return {
      totalPoints: 520,
      currentStreak: 3,
      checkedDays: [1, 2, 3], // 本月已签到的日期
      rewards: [
        { day: 1, points: 5 },
        { day: 2, points: 10 },
        { day: 3, points: 15 },
        { day: 4, points: 20 },
        { day: 5, points: 30 },
        { day: 6, points: 40 },
        { day: 7, points: 50 },
      ],
    }

    /* 真实API调用
    try {
      const response = await api.get('/user/checkin/info')
      return response.data
    } catch (error) {
      console.error('获取签到信息失败:', error)
      throw error
    }
    */
  },

  // 执行每日签到
  doCheckin: async () => {
    // 模拟数据
    return {
      success: true,
      points: 10,
      currentStreak: 4,
      message: "签到成功，获得10积分！",
    }

    /* 真实API调用
    try {
      const response = await api.post('/user/checkin')
      return response.data
    } catch (error) {
      console.error('签到失败:', error)
      throw error
    }
    */
  },

  // 获取签到日历数据
  getCheckinCalendar: async (year: number, month: number) => {
    // 模拟数据
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const checkedDays = Array.from({ length: 3 }, () => Math.floor(Math.random() * daysInMonth) + 1)

    return {
      year,
      month,
      checkedDays,
    }

    /* 真实API调用
    try {
      const response = await api.get(`/user/checkin/calendar?year=${year}&month=${month}`)
      return response.data
    } catch (error) {
      console.error('获取签到日历失败:', error)
      throw error
    }
    */
  },

  // 获取积分奖励列表
  getPointsRewards: async () => {
    // 模拟数据
    return [
      {
        id: 1,
        title: "景区门票8折券",
        points: 100,
        image: "/placeholder.svg?height=80&width=160&text=门票折扣券",
      },
      {
        id: 2,
        title: "导游服务9折券",
        points: 200,
        image: "/placeholder.svg?height=80&width=160&text=导游折扣券",
      },
      {
        id: 3,
        title: "精美旅行纪念品",
        points: 500,
        image: "/placeholder.svg?height=80&width=160&text=旅行纪念品",
      },
      {
        id: 4,
        title: "高级会员月卡",
        points: 1000,
        image: "/placeholder.svg?height=80&width=160&text=会员月卡",
      },
    ]

    /* 真实API调用
    try {
      const response = await api.get('/points/rewards')
      return response.data
    } catch (error) {
      console.error('获取积分奖励列表失败:', error)
      throw error
    }
    */
  },

  // 兑换积分奖励
  redeemPointsReward: async (rewardId: number) => {
    // 模拟数据
    return {
      success: true,
      message: "兑换成功！",
      remainingPoints: 420,
      reward: {
        id: rewardId,
        title: "景区门票8折券",
        points: 100,
        image: "/placeholder.svg?height=80&width=160&text=门票折扣券",
        code: "DISC8" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        expireDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
    }

    /* 真实API调用
    try {
      const response = await api.post('/points/redeem', { rewardId })
      return response.data
    } catch (error) {
      console.error('兑换积分奖励失败:', error)
      throw error
    }
    */
  },

  // 获取积分获取途径
  getPointsEarningMethods: async () => {
    // 模拟数据
    return [
      { title: "每日签到", points: "+10积分/天" },
      { title: "连续签到7天", points: "+30积分" },
      { title: "完成行程", points: "+50积分/次" },
      { title: "邀请好友", points: "+100积分/人" },
      { title: "评价导游", points: "+20积分/次" },
      { title: "分享路线", points: "+30积分/次" },
    ]

    /* 真实API调用
    try {
      const response = await api.get('/points/earning-methods')
      return response.data
    } catch (error) {
      console.error('获取积分获取途径失败:', error)
      throw error
    }
    */
  },

  // 获取用户积分历史
  getPointsHistory: async (page = 1, pageSize = 10) => {
    // 模拟数据
    return {
      total: 24,
      page,
      pageSize,
      data: Array.from({ length: pageSize }, (_, i) => ({
        id: i + 1 + (page - 1) * pageSize,
        type: ["签到", "连续签到奖励", "完成行程", "邀请好友", "评价导游"][Math.floor(Math.random() * 5)],
        points: [10, 30, 50, 100, 20][Math.floor(Math.random() * 5)],
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        description: "积分变动",
      })),
    }

    /* 真实API调用
    try {
      const response = await api.get(`/points/history?page=${page}&pageSize=${pageSize}`)
      return response.data
    } catch (error) {
      console.error('获取积分历史失败:', error)
      throw error
    }
    */
  },
}

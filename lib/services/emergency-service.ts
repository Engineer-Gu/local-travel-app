// 紧急求助服务
export const emergencyService = {
  // 获取紧急服务列表
  getEmergencyServices: async () => {
    // 模拟数据
    return [
      {
        id: "police",
        name: "警察",
        icon: "police",
        phone: "110",
        description: "报警服务，处理治安问题、犯罪行为等",
      },
      {
        id: "ambulance",
        name: "急救",
        icon: "ambulance",
        phone: "120",
        description: "医疗急救服务，处理突发疾病、意外伤害等",
      },
      {
        id: "fire",
        name: "消防",
        icon: "fire",
        phone: "119",
        description: "消防救援服务，处理火灾、救援等",
      },
      {
        id: "tourist",
        name: "旅游救助",
        icon: "info",
        phone: "12301",
        description: "旅游救助热线，处理旅游纠纷、投诉等",
      },
    ]

    /*
    // 真实API调用
    try {
      const response = await api.get('/emergency/services');
      return response.data;
    } catch (error) {
      console.error('获取紧急服务列表失败:', error);
      throw error;
    }
    */
  },

  // 更新用户位置
  updateUserLocation: async (location: {
    latitude: number
    longitude: number
    accuracy?: number
  }) => {
    // 模拟数据
    return {
      success: true,
      location: {
        name: "杭州西湖·雷峰塔景区",
        address: "浙江省杭州市西湖区南山路15号",
        coordinates: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
    }

    /*
    // 真实API调用
    try {
      const response = await api.post('/emergency/location', location);
      return response.data;
    } catch (error) {
      console.error('更新用户位置失败:', error);
      throw error;
    }
    */
  },

  // 获取用户当前位置
  getUserLocation: async () => {
    // 模拟数据
    return {
      name: "杭州西湖风景区",
      address: "浙江省杭州市西湖区龙井路1号",
      coordinates: {
        latitude: 30.2418,
        longitude: 120.1716,
      },
    }

    /*
    // 真实API调用
    try {
      const response = await api.get('/emergency/location');
      return response.data;
    } catch (error) {
      console.error('获取用户位置失败:', error);
      throw error;
    }
    */
  },

  // 发起紧急呼叫
  makeEmergencyCall: async (serviceId: string) => {
    // 模拟数据
    return {
      success: true,
      callId: "call-" + Date.now(),
      service: {
        id: serviceId,
        name:
          serviceId === "police"
            ? "警察"
            : serviceId === "ambulance"
              ? "急救"
              : serviceId === "fire"
                ? "消防"
                : "旅游救助",
        phone:
          serviceId === "police" ? "110" : serviceId === "ambulance" ? "120" : serviceId === "fire" ? "119" : "12301",
      },
      timestamp: new Date().toISOString(),
    }

    /*
    // 真实API调用
    try {
      const response = await api.post('/emergency/call', { serviceId });
      return response.data;
    } catch (error) {
      console.error('发起紧急呼叫失败:', error);
      throw error;
    }
    */
  },

  // 获取安全提示
  getSafetyTips: async (location?: string, category?: string) => {
    // 模拟数据
    return [
      "保持通讯畅通，手机电量充足",
      "随身携带身份证件和必要的药品",
      "注意天气变化，及时增减衣物",
      "结伴而行，避免单独前往偏远地区",
      "尊重当地风俗习惯和宗教信仰",
      "不要轻信陌生人，防止上当受骗",
      "保管好随身财物，特别是在人多的地方",
    ]

    /*
    // 真实API调用
    try {
      const response = await api.get('/emergency/safety-tips', {
        params: { location, category }
      });
      return response.data;
    } catch (error) {
      console.error('获取安全提示失败:', error);
      throw error;
    }
    */
  },

  // 获取常见问题
  getFAQs: async () => {
    // 模拟数据
    return [
      {
        question: "如何在旅行中保障个人安全？",
        answer:
          "旅行前做好充分准备，了解目的地情况；随身携带必要证件和药品；与亲友保持联系；不要随身携带大量现金；注意天气变化等。",
      },
      {
        question: "遇到医疗紧急情况怎么办？",
        answer:
          "立即拨打120急救电话；告知准确位置和症状；如有慢性病，随身携带药物和病历；建议购买旅游保险覆盖医疗费用。",
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

    /*
    // 真实API调用
    try {
      const response = await api.get('/emergency/faqs');
      return response.data;
    } catch (error) {
      console.error('获取常见问题失败:', error);
      throw error;
    }
    */
  },

  // 发送求助消息
  sendHelpMessage: async (message: string) => {
    // 模拟数据
    return {
      success: true,
      messageId: "msg-" + Date.now(),
      timestamp: new Date().toISOString(),
      estimatedResponseTime: "5分钟内",
    }

    /*
    // 真实API调用
    try {
      const response = await api.post('/emergency/message', { message });
      return response.data;
    } catch (error) {
      console.error('发送求助消息失败:', error);
      throw error;
    }
    */
  },

  // 获取紧急联系人
  getEmergencyContacts: async () => {
    // 模拟数据
    return [
      {
        id: "contact1",
        name: "张三",
        relationship: "家人",
        phone: "13800138000",
      },
      {
        id: "contact2",
        name: "李四",
        relationship: "朋友",
        phone: "13900139000",
      },
    ]

    /*
    // 真实API调用
    try {
      const response = await api.get('/emergency/contacts');
      return response.data;
    } catch (error) {
      console.error('获取紧急联系人失败:', error);
      throw error;
    }
    */
  },

  // 添加紧急联系人
  addEmergencyContact: async (contact: {
    name: string
    relationship: string
    phone: string
  }) => {
    // 模拟数据
    return {
      id: "contact-" + Date.now(),
      ...contact,
      createdAt: new Date().toISOString(),
    }

    /*
    // 真实API调用
    try {
      const response = await api.post('/emergency/contacts', contact);
      return response.data;
    } catch (error) {
      console.error('添加紧急联系人失败:', error);
      throw error;
    }
    */
  },

  // 删除紧急联系人
  deleteEmergencyContact: async (contactId: string) => {
    // 模拟数据
    return { success: true, message: "联系人已删除" }

    /*
    // 真实API调用
    try {
      const response = await api.delete(`/emergency/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      console.error('删除紧急联系人失败:', error);
      throw error;
    }
    */
  },

  // 获取附近的医疗机构
  getNearbyMedicalFacilities: async (
    location: {
      latitude: number
      longitude: number
    },
    radius = 5,
  ) => {
    // 模拟数据
    return [
      {
        id: "hospital1",
        name: "浙江省人民医院",
        address: "浙江省杭州市上城区庆春路158号",
        phone: "0571-87666666",
        distance: 1.2, // 公里
        coordinates: {
          latitude: 30.2532,
          longitude: 120.1686,
        },
        type: "综合医院",
        level: "三级甲等",
        open24Hours: true,
      },
      {
        id: "hospital2",
        name: "杭州市第一人民医院",
        address: "浙江省杭州市上城区浣纱路261号",
        phone: "0571-56006000",
        distance: 2.5,
        coordinates: {
          latitude: 30.2418,
          longitude: 120.1716,
        },
        type: "综合医院",
        level: "三级甲等",
        open24Hours: true,
      },
    ]

    /*
    // 真实API调用
    try {
      const response = await api.get('/emergency/medical-facilities/nearby', {
        params: { ...location, radius }
      });
      return response.data;
    } catch (error) {
      console.error('获取附近医疗机构失败:', error);
      throw error;
    }
    */
  },

  // 获取附近的警察局
  getNearbyPoliceStations: async (
    location: {
      latitude: number
      longitude: number
    },
    radius = 5,
  ) => {
    // 模拟数据
    return [
      {
        id: "police1",
        name: "西湖区公安局",
        address: "浙江省杭州市西湖区文三路199号",
        phone: "0571-87285110",
        distance: 1.8,
        coordinates: {
          latitude: 30.2532,
          longitude: 120.1686,
        },
      },
      {
        id: "police2",
        name: "上城区公安局",
        address: "浙江省杭州市上城区解放路83号",
        phone: "0571-87292110",
        distance: 3.2,
        coordinates: {
          latitude: 30.2418,
          longitude: 120.1716,
        },
      },
    ]

    /*
    // 真实API调用
    try {
      const response = await api.get('/emergency/police-stations/nearby', {
        params: { ...location, radius }
      });
      return response.data;
    } catch (error) {
      console.error('获取附近警察局失败:', error);
      throw error;
    }
    */
  },

  // 获取紧急求助历史记录
  getEmergencyHistory: async () => {
    // 模拟数据
    return [
      {
        id: "emergency1",
        type: "call",
        service: {
          id: "ambulance",
          name: "急救",
          phone: "120",
        },
        timestamp: "2023-04-10T14:30:00Z",
        location: "杭州西湖风景区",
        status: "completed",
      },
      {
        id: "emergency2",
        type: "message",
        content: "我在西湖附近迷路了，需要帮助",
        timestamp: "2023-03-25T16:45:00Z",
        location: "杭州西湖风景区",
        status: "resolved",
        responseTime: "3分钟",
      },
    ]

    /*
    // 真实API调用
    try {
      const response = await api.get('/emergency/history');
      return response.data;
    } catch (error) {
      console.error('获取紧急求助历史记录失败:', error);
      throw error;
    }
    */
  },

  // 获取紧急情况处理指南
  getEmergencyGuides: async (type?: string) => {
    // 模拟数据
    return [
      {
        id: "guide1",
        title: "旅行中突发疾病处理指南",
        type: "medical",
        steps: [
          "保持冷静，评估症状严重程度",
          "如有随行医生或医疗人员，请立即寻求帮助",
          "拨打当地急救电话（中国为120）",
          "准确描述症状、位置和个人基本信息",
          "如有慢性病史，告知急救人员并出示相关药物",
          "等待救援期间，保持患者舒适，监控生命体征",
        ],
      },
      {
        id: "guide2",
        title: "旅行财物丢失处理指南",
        type: "theft",
        steps: [
          "立即前往当地警察局报案",
          "索取报案证明（对后续保险理赔很重要）",
          "挂失信用卡和银行卡",
          "联系使领馆补办证件（如护照丢失）",
          "联系保险公司了解理赔流程",
          "联系家人或朋友寻求帮助",
        ],
      },
    ]

    /*
    // 真实API调用
    try {
      const response = await api.get('/emergency/guides', {
        params: { type }
      });
      return response.data;
    } catch (error) {
      console.error('获取紧急情况处理指南失败:', error);
      throw error;
    }
    */
  },

  // 获取当地紧急电话
  getLocalEmergencyNumbers: async (countryCode?: string, city?: string) => {
    // 模拟数据
    return {
      country: "中国",
      countryCode: countryCode || "CN",
      city: city || "杭州",
      numbers: [
        { name: "通用紧急电话", number: "112" },
        { name: "警察", number: "110" },
        { name: "急救", number: "120" },
        { name: "消防", number: "119" },
        { name: "交通事故", number: "122" },
      ],
    }

    /*
    // 真实API调用
    try {
      const response = await api.get('/emergency/local-numbers', {
        params: { countryCode, city }
      });
      return response.data;
    } catch (error) {
      console.error('获取当地紧急电话失败:', error);
      throw error;
    }
    */
  },
}

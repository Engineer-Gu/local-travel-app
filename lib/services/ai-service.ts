// AI语音导游服务
export const aiVoiceGuideService = {
  // 获取景点的AI语音导览
  getVoiceGuide: async (spotId: string, language = "zh-CN") => {
    // 模拟数据
    return {
      id: `voice-${spotId}`,
      title: "故宫博物院导览",
      audioUrl: "https://example.com/audio/guide.mp3",
      duration: 180, // 秒
      transcript: "故宫，又名紫禁城，是中国明清两代的皇家宫殿...",
      language: language,
      createdAt: new Date().toISOString(),
    }

    /* 
    // 真实API调用
    try {
      const response = await api.get(`/ai/voice-guide/${spotId}`, {
        params: { language }
      });
      return response.data;
    } catch (error) {
      console.error('获取AI语音导览失败:', error);
      throw error;
    }
    */
  },

  // 生成个性化语音导览
  generateCustomVoiceGuide: async (params: {
    spotId: string
    preferences: string[]
    duration: number
    language: string
  }) => {
    // 模拟数据
    return {
      id: `custom-voice-${params.spotId}`,
      title: `个性化${params.duration}分钟导览`,
      audioUrl: "https://example.com/audio/custom-guide.mp3",
      duration: params.duration * 60, // 转换为秒
      transcript: "根据您的兴趣为您定制的导览内容...",
      language: params.language,
      preferences: params.preferences,
      createdAt: new Date().toISOString(),
    }

    /*
    // 真实API调用
    try {
      const response = await api.post('/ai/voice-guide/generate', params);
      return response.data;
    } catch (error) {
      console.error('生成个性化语音导览失败:', error);
      throw error;
    }
    */
  },

  // 获取用户的语音导览历史
  getUserVoiceGuideHistory: async () => {
    // 模拟数据
    return [
      {
        id: "history-1",
        spotName: "故宫博物院",
        spotId: "spot-001",
        title: "故宫博物院导览",
        duration: 180,
        listenedAt: new Date(Date.now() - 86400000).toISOString(), // 昨天
      },
      {
        id: "history-2",
        spotName: "颐和园",
        spotId: "spot-002",
        title: "颐和园导览",
        duration: 240,
        listenedAt: new Date(Date.now() - 172800000).toISOString(), // 前天
      },
    ]

    /*
    // 真实API调用
    try {
      const response = await api.get('/ai/voice-guide/history');
      return response.data;
    } catch (error) {
      console.error('获取语音导览历史失败:', error);
      throw error;
    }
    */
  },

  // 获取语音导览的反馈
  submitVoiceGuideFeedback: async (
    guideId: string,
    feedback: {
      rating: number
      comment?: string
      tags?: string[]
    },
  ) => {
    // 模拟数据
    return {
      success: true,
      message: "感谢您的反馈！",
    }

    /*
    // 真实API调用
    try {
      const response = await api.post(`/ai/voice-guide/${guideId}/feedback`, feedback);
      return response.data;
    } catch (error) {
      console.error('提交语音导览反馈失败:', error);
      throw error;
    }
    */
  },

  // 获取推荐的语音导览
  getRecommendedVoiceGuides: async (location: { lat: number; lng: number }) => {
    // 模拟数据
    return [
      {
        id: "rec-1",
        spotName: "天安门广场",
        spotId: "spot-003",
        title: "天安门广场导览",
        distance: 1.2, // 公里
        duration: 150,
        popularity: 98,
      },
      {
        id: "rec-2",
        spotName: "北海公园",
        spotId: "spot-004",
        title: "北海公园导览",
        distance: 2.5,
        duration: 200,
        popularity: 92,
      },
    ]

    /*
    // 真实API调用
    try {
      const response = await api.get('/ai/voice-guide/recommended', {
        params: location
      });
      return response.data;
    } catch (error) {
      console.error('获取推荐语音导览失败:', error);
      throw error;
    }
    */
  },

  // 下载语音导览供离线使用
  downloadVoiceGuideForOffline: async (guideId: string) => {
    // 模拟数据
    return {
      success: true,
      message: "语音导览已成功下载",
      offlineId: `offline-${guideId}`,
      expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(), // 7天后过期
    }

    /*
    // 真实API调用
    try {
      const response = await api.post(`/ai/voice-guide/${guideId}/download`);
      return response.data;
    } catch (error) {
      console.error('下载语音导览失败:', error);
      throw error;
    }
    */
  },

  // 获取语音导览的多语言版本
  getVoiceGuideLanguages: async (guideId: string) => {
    // 模拟数据
    return [
      { code: "zh-CN", name: "中文" },
      { code: "en-US", name: "英语" },
      { code: "ja-JP", name: "日语" },
      { code: "ko-KR", name: "韩语" },
      { code: "fr-FR", name: "法语" },
    ]

    /*
    // 真实API调用
    try {
      const response = await api.get(`/ai/voice-guide/${guideId}/languages`);
      return response.data;
    } catch (error) {
      console.error('获取语音导览语言版本失败:', error);
      throw error;
    }
    */
  },
}

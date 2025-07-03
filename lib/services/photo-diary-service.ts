// AI照片日记服务
export const photoDiaryService = {
  // 上传照片并生成日记
  generateDiaryFromPhotos: async (
    photos: File[],
    options?: {
      preferredStyle?: string
      focusOn?: string[]
      maxLength?: number
    },
  ) => {
    // 模拟数据
    return {
      id: "diary-" + Date.now(),
      title: "西湖春日游记",
      content:
        "今天是个阳光明媚的日子，我来到了杭州西湖。西湖的春天真是美不胜收，湖水清澈，柳树泛绿，花朵绽放。\n\n" +
        "漫步在苏堤上，感受微风拂面，看着远处的雷峰塔倒映在湖面上，仿佛时光静止。途经断桥，想起了白娘子与许仙的美丽传说。\n\n" +
        "中午在知味观品尝了正宗的西湖醋鱼和龙井虾仁，味道鲜美，回味无穷。下午去了灵隐寺，在这座千年古刹中感受佛教文化的庄严与神秘。\n\n" +
        "这次西湖之行，不仅欣赏了美景，也了解了丰富的历史文化，是一次难忘的旅行体验。",
      location: "杭州西湖",
      date: new Date().toISOString().split("T")[0],
      tags: ["西湖", "旅行", "风景", "春游"],
      photoUrls: Array(photos.length)
        .fill(0)
        .map((_, i) => `/placeholder.svg?height=300&width=400&text=照片${i + 1}`),
      createdAt: new Date().toISOString(),
    }

    /*
    // 真实API调用
    try {
      const formData = new FormData();
      photos.forEach((photo, index) => {
        formData.append(`photos[${index}]`, photo);
      });
      
      if (options) {
        Object.entries(options).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item, i) => {
              formData.append(`${key}[${i}]`, item);
            });
          } else if (value !== undefined) {
            formData.append(key, String(value));
          }
        });
      }
      
      const response = await api.post('/ai/photo-diary/generate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('生成AI照片日记失败:', error);
      throw error;
    }
    */
  },

  // 获取用户的照片日记列表
  getUserDiaries: async (page = 1, limit = 10) => {
    // 模拟数据
    return {
      diaries: [
        {
          id: "diary-1",
          title: "西湖春日游记",
          summary: "杭州西湖的春天美不胜收，湖水清澈，柳树泛绿...",
          location: "杭州西湖",
          date: "2023-04-15",
          coverPhoto: "/placeholder.svg?height=300&width=400&text=西湖",
          tags: ["西湖", "旅行", "风景", "春游"],
          createdAt: "2023-04-15T14:30:00Z",
        },
        {
          id: "diary-2",
          title: "黄山之行",
          summary: "黄山云海壮观，松树奇特，日出美丽...",
          location: "安徽黄山",
          date: "2023-03-20",
          coverPhoto: "/placeholder.svg?height=300&width=400&text=黄山",
          tags: ["黄山", "爬山", "云海", "日出"],
          createdAt: "2023-03-20T18:45:00Z",
        },
      ],
      total: 12,
      page: page,
      limit: limit,
      hasMore: page * limit < 12,
    }

    /*
    // 真实API调用
    try {
      const response = await api.get('/ai/photo-diary/user', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('获取用户照片日记失败:', error);
      throw error;
    }
    */
  },

  // 获取照片日记详情
  getDiaryDetail: async (diaryId: string) => {
    // 模拟数据
    return {
      id: diaryId,
      title: "西湖春日游记",
      content:
        "今天是个阳光明媚的日子，我来到了杭州西湖。西湖的春天真是美不胜收，湖水清澈，柳树泛绿，花朵绽放。\n\n" +
        "漫步在苏堤上，感受微风拂面，看着远处的雷峰塔倒映在湖面上，仿佛时光静止。途经断桥，想起了白娘子与许仙的美丽传说。\n\n" +
        "中午在知味观品尝了正宗的西湖醋鱼和龙井虾仁，味道鲜美，回味无穷。下午去了灵隐寺，在这座千年古刹中感受佛教文化的庄严与神秘。\n\n" +
        "这次西湖之行，不仅欣赏了美景，也了解了丰富的历史文化，是一次难忘的旅行体验。",
      location: "杭州西湖",
      date: "2023-04-15",
      tags: ["西湖", "旅行", "风景", "春游"],
      photoUrls: [
        "/placeholder.svg?height=600&width=800&text=西湖照片1",
        "/placeholder.svg?height=600&width=800&text=西湖照片2",
        "/placeholder.svg?height=600&width=800&text=西湖照片3",
      ],
      createdAt: "2023-04-15T14:30:00Z",
      updatedAt: "2023-04-15T15:20:00Z",
    }

    /*
    // 真实API调用
    try {
      const response = await api.get(`/ai/photo-diary/${diaryId}`);
      return response.data;
    } catch (error) {
      console.error('获取照片日记详情失败:', error);
      throw error;
    }
    */
  },

  // 更新照片日记
  updateDiary: async (
    diaryId: string,
    updateData: {
      title?: string
      content?: string
      location?: string
      date?: string
      tags?: string[]
    },
  ) => {
    // 模拟数据
    return {
      id: diaryId,
      ...updateData,
      updatedAt: new Date().toISOString(),
    }

    /*
    // 真实API调用
    try {
      const response = await api.put(`/ai/photo-diary/${diaryId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('更新照片日记失败:', error);
      throw error;
    }
    */
  },

  // 删除照片日记
  deleteDiary: async (diaryId: string) => {
    // 模拟数据
    return { success: true, message: "日记已成功删除" }

    /*
    // 真实API调用
    try {
      const response = await api.delete(`/ai/photo-diary/${diaryId}`);
      return response.data;
    } catch (error) {
      console.error('删除照片日记失败:', error);
      throw error;
    }
    */
  },

  // 分享照片日记
  shareDiary: async (diaryId: string, platform: "wechat" | "weibo" | "friends" | "link") => {
    // 模拟数据
    return {
      success: true,
      shareUrl: `https://example.com/share/diary/${diaryId}`,
      platform: platform,
    }

    /*
    // 真实API调用
    try {
      const response = await api.post(`/ai/photo-diary/${diaryId}/share`, { platform });
      return response.data;
    } catch (error) {
      console.error('分享照片日记失败:', error);
      throw error;
    }
    */
  },

  // 获取AI生成的日记风格列表
  getDiaryStyles: async () => {
    // 模拟数据
    return [
      { id: "poetic", name: "诗意文艺", description: "充满诗意和文艺气息的风格" },
      { id: "humorous", name: "幽默风趣", description: "轻松幽默，充满趣味的风格" },
      { id: "detailed", name: "详尽记录", description: "详细记录旅行的每个细节" },
      { id: "concise", name: "简洁明了", description: "简短精炼，重点突出" },
      { id: "emotional", name: "情感抒发", description: "侧重于表达旅行中的情感体验" },
    ]

    /*
    // 真实API调用
    try {
      const response = await api.get('/ai/photo-diary/styles');
      return response.data;
    } catch (error) {
      console.error('获取日记风格列表失败:', error);
      throw error;
    }
    */
  },
}

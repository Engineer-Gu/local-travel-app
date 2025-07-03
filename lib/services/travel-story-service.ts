// 旅行故事圈服务
export const travelStoryService = {
  // 获取旅行故事列表
  getStories: async (params: {
    type?: "following" | "recommend" | "nearby"
    page?: number
    limit?: number
    location?: { latitude: number; longitude: number }
    tags?: string[]
  }) => {
    // 模拟数据
    const stories = [
      {
        id: "story1",
        user: {
          id: "user1",
          name: "旅行达人",
          avatar: "/placeholder.svg?height=40&width=40&text=旅行达人",
          isVerified: true,
        },
        location: "杭州·西湖",
        content:
          "西湖的春天真是美不胜收！断桥边的柳树已经泛绿，湖面上荡起了微波。今天天气特别好，拍了很多照片，分享给大家～",
        images: [
          "/placeholder.svg?height=400&width=600&text=西湖春景1",
          "/placeholder.svg?height=400&width=600&text=西湖春景2",
        ],
        likes: 256,
        comments: 42,
        time: "2小时前",
        tags: ["春游", "西湖", "摄影"],
        isLiked: false,
        isSaved: false,
      },
      {
        id: "story2",
        user: {
          id: "user2",
          name: "美食猎人",
          avatar: "/placeholder.svg?height=40&width=40&text=美食猎人",
          isVerified: false,
        },
        location: "杭州·知味观",
        content:
          "杭州必吃美食推荐！知味观的西湖醋鱼和东坡肉真的太好吃了，一定要来尝尝。这家店开了上百年，还是老味道，强烈推荐！",
        images: [
          "/placeholder.svg?height=400&width=600&text=杭州美食1",
          "/placeholder.svg?height=400&width=600&text=杭州美食2",
          "/placeholder.svg?height=400&width=600&text=杭州美食3",
        ],
        likes: 189,
        comments: 36,
        time: "5小时前",
        tags: ["美食", "杭帮菜", "推荐"],
        isLiked: false,
        isSaved: false,
      },
    ]

    return {
      stories,
      total: 42,
      page: params.page || 1,
      limit: params.limit || 10,
      hasMore: (params.page || 1) * (params.limit || 10) < 42,
    }

    /*
    // 真实API调用
    try {
      const response = await api.get('/social/travel-stories', { params });
      return response.data;
    } catch (error) {
      console.error('获取旅行故事失败:', error);
      throw error;
    }
    */
  },

  // 获取故事详情
  getStoryDetail: async (storyId: string) => {
    // 模拟数据
    return {
      id: storyId,
      user: {
        id: "user1",
        name: "旅行达人",
        avatar: "/placeholder.svg?height=40&width=40&text=旅行达人",
        isVerified: true,
        bio: "专业旅行家，走过30个国家，100座城市",
        followersCount: 5280,
      },
      location: "杭州·西湖",
      coordinates: {
        latitude: 30.2418,
        longitude: 120.1716,
      },
      content:
        "西湖的春天真是美不胜收！断桥边的柳树已经泛绿，湖面上荡起了微波。今天天气特别好，拍了很多照片，分享给大家～\n\n" +
        "最喜欢的是苏堤的景色，春风拂过，柳枝轻摇，湖水微波粼粼，远处的雷峰塔倒映在湖面上，美不胜收。\n\n" +
        "如果你们来杭州，一定要在春天来，这个季节的西湖是最美的！",
      images: [
        "/placeholder.svg?height=800&width=1200&text=西湖春景1",
        "/placeholder.svg?height=800&width=1200&text=西湖春景2",
        "/placeholder.svg?height=800&width=1200&text=西湖春景3",
        "/placeholder.svg?height=800&width=1200&text=西湖春景4",
      ],
      likes: 256,
      comments: 42,
      shares: 18,
      createdAt: "2023-04-15T10:30:00Z",
      tags: ["春游", "西湖", "摄影", "杭州", "旅行"],
      isLiked: false,
      isSaved: false,
      isFollowing: false,
    }

    /*
    // 真实API调用
    try {
      const response = await api.get(`/social/travel-stories/${storyId}`);
      return response.data;
    } catch (error) {
      console.error('获取故事详情失败:', error);
      throw error;
    }
    */
  },

  // 发布旅行故事
  createStory: async (storyData: {
    content: string
    location?: string
    coordinates?: { latitude: number; longitude: number }
    images: File[]
    tags?: string[]
  }) => {
    // 模拟数据
    return {
      id: "new-story-" + Date.now(),
      content: storyData.content,
      location: storyData.location || "未知位置",
      images: Array(storyData.images.length)
        .fill(0)
        .map((_, i) => `/placeholder.svg?height=400&width=600&text=新故事图片${i + 1}`),
      tags: storyData.tags || [],
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
    }

    /*
    // 真实API调用
    try {
      const formData = new FormData();
      formData.append('content', storyData.content);
      
      if (storyData.location) {
        formData.append('location', storyData.location);
      }
      
      if (storyData.coordinates) {
        formData.append('latitude', storyData.coordinates.latitude.toString());
        formData.append('longitude', storyData.coordinates.longitude.toString());
      }
      
      storyData.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
      
      if (storyData.tags && storyData.tags.length > 0) {
        storyData.tags.forEach((tag, index) => {
          formData.append(`tags[${index}]`, tag);
        });
      }
      
      const response = await api.post('/social/travel-stories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('发布旅行故事失败:', error);
      throw error;
    }
    */
  },

  // 点赞故事
  likeStory: async (storyId: string) => {
    // 模拟数据
    return { success: true, message: "点赞成功" }

    /*
    // 真实API调用
    try {
      const response = await api.post(`/social/travel-stories/${storyId}/like`);
      return response.data;
    } catch (error) {
      console.error('点赞故事失败:', error);
      throw error;
    }
    */
  },

  // 取消点赞
  unlikeStory: async (storyId: string) => {
    // 模拟数据
    return { success: true, message: "已取消点赞" }

    /*
    // 真实API调用
    try {
      const response = await api.post(`/social/travel-stories/${storyId}/unlike`);
      return response.data;
    } catch (error) {
      console.error('取消点赞失败:', error);
      throw error;
    }
    */
  },

  // 收藏故事
  saveStory: async (storyId: string) => {
    // 模拟数据
    return { success: true, message: "收藏成功" }

    /*
    // 真实API调用
    try {
      const response = await api.post(`/social/travel-stories/${storyId}/save`);
      return response.data;
    } catch (error) {
      console.error('收藏故事失败:', error);
      throw error;
    }
    */
  },

  // 取消收藏
  unsaveStory: async (storyId: string) => {
    // 模拟数据
    return { success: true, message: "已取消收藏" }

    /*
    // 真实API调用
    try {
      const response = await api.post(`/social/travel-stories/${storyId}/unsave`);
      return response.data;
    } catch (error) {
      console.error('取消收藏失败:', error);
      throw error;
    }
    */
  },

  // 分享故事
  shareStory: async (storyId: string, platform: "wechat" | "weibo" | "friends" | "link") => {
    // 模拟数据
    return {
      success: true,
      shareUrl: `https://example.com/share/story/${storyId}`,
      platform: platform,
    }

    /*
    // 真实API调用
    try {
      const response = await api.post(`/social/travel-stories/${storyId}/share`, { platform });
      return response.data;
    } catch (error) {
      console.error('分享故事失败:', error);
      throw error;
    }
    */
  },

  // 获取故事评论
  getStoryComments: async (storyId: string, page = 1, limit = 20) => {
    // 模拟数据
    return {
      comments: [
        {
          id: "comment1",
          user: {
            id: "user3",
            name: "背包客",
            avatar: "/placeholder.svg?height=40&width=40&text=背包客",
          },
          content: "照片拍得真美！请问是用什么相机拍的？",
          createdAt: "2023-04-15T11:20:00Z",
          likes: 12,
        },
        {
          id: "comment2",
          user: {
            id: "user4",
            name: "摄影爱好者",
            avatar: "/placeholder.svg?height=40&width=40&text=摄影爱好者",
          },
          content: "西湖真的很美，我也去过好几次，每次都有不同的感受。",
          createdAt: "2023-04-15T12:05:00Z",
          likes: 8,
        },
      ],
      total: 42,
      page: page,
      limit: limit,
      hasMore: page * limit < 42,
    }

    /*
    // 真实API调用
    try {
      const response = await api.get(`/social/travel-stories/${storyId}/comments`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('获取故事评论失败:', error);
      throw error;
    }
    */
  },

  // 发表评论
  addComment: async (storyId: string, content: string, replyTo?: string) => {
    // 模拟数据
    return {
      id: "new-comment-" + Date.now(),
      user: {
        id: "current-user",
        name: "当前用户",
        avatar: "/placeholder.svg?height=40&width=40&text=我",
      },
      content: content,
      createdAt: new Date().toISOString(),
      likes: 0,
      replyTo: replyTo,
    }

    /*
    // 真实API调用
    try {
      const response = await api.post(`/social/travel-stories/${storyId}/comments`, {
        content,
        replyTo
      });
      return response.data;
    } catch (error) {
      console.error('发表评论失败:', error);
      throw error;
    }
    */
  },

  // 删除评论
  deleteComment: async (storyId: string, commentId: string) => {
    // 模拟数据
    return { success: true, message: "评论已删除" }

    /*
    // 真实API调用
    try {
      const response = await api.delete(`/social/travel-stories/${storyId}/comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.error('删除评论失败:', error);
      throw error;
    }
    */
  },

  // 获取用户发布的故事
  getUserStories: async (userId: string, page = 1, limit = 10) => {
    // 模拟数据
    return {
      stories: [
        {
          id: "user-story1",
          location: "杭州·西湖",
          content: "西湖的春天真是美不胜收！",
          coverImage: "/placeholder.svg?height=400&width=600&text=西湖春景",
          likes: 256,
          comments: 42,
          createdAt: "2023-04-15T10:30:00Z",
        },
        {
          id: "user-story2",
          location: "苏州·拙政园",
          content: "拙政园的园林设计真是精妙绝伦！",
          coverImage: "/placeholder.svg?height=400&width=600&text=拙政园",
          likes: 189,
          comments: 36,
          createdAt: "2023-03-20T14:15:00Z",
        },
      ],
      total: 15,
      page: page,
      limit: limit,
      hasMore: page * limit < 15,
    }

    /*
    // 真实API调用
    try {
      const response = await api.get(`/social/users/${userId}/travel-stories`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('获取用户故事失败:', error);
      throw error;
    }
    */
  },

  // 获取用户收藏的故事
  getUserSavedStories: async (page = 1, limit = 10) => {
    // 模拟数据
    return {
      stories: [
        {
          id: "saved-story1",
          user: {
            id: "user5",
            name: "风景摄影师",
            avatar: "/placeholder.svg?height=40&width=40&text=摄影师",
          },
          location: "张家界",
          content: "张家界的奇峰异石真是大自然的鬼斧神工！",
          coverImage: "/placeholder.svg?height=400&width=600&text=张家界",
          likes: 320,
          comments: 58,
          createdAt: "2023-02-10T09:45:00Z",
        },
        {
          id: "saved-story2",
          user: {
            id: "user6",
            name: "美食博主",
            avatar: "/placeholder.svg?height=40&width=40&text=美食博主",
          },
          location: "成都",
          content: "成都的火锅和小吃，让人欲罢不能！",
          coverImage: "/placeholder.svg?height=400&width=600&text=成都美食",
          likes: 275,
          comments: 49,
          createdAt: "2023-01-25T18:30:00Z",
        },
      ],
      total: 28,
      page: page,
      limit: limit,
      hasMore: page * limit < 28,
    }

    /*
    // 真实API调用
    try {
      const response = await api.get('/social/travel-stories/saved', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('获取收藏故事失败:', error);
      throw error;
    }
    */
  },

  // 获取热门标签
  getPopularTags: async (limit = 10) => {
    // 模拟数据
    return [
      { name: "旅行", count: 1245 },
      { name: "美食", count: 986 },
      { name: "摄影", count: 875 },
      { name: "自然", count: 743 },
      { name: "城市", count: 692 },
      { name: "文化", count: 587 },
      { name: "历史", count: 521 },
      { name: "建筑", count: 468 },
      { name: "海滩", count: 412 },
      { name: "山脉", count: 389 },
    ]

    /*
    // 真实API调用
    try {
      const response = await api.get('/social/travel-stories/tags/popular', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('获取热门标签失败:', error);
      throw error;
    }
    */
  },

  // 根据标签搜索故事
  searchStoriesByTag: async (tag: string, page = 1, limit = 10) => {
    // 模拟数据
    return {
      stories: [
        {
          id: "tag-story1",
          user: {
            id: "user7",
            name: "旅行博主",
            avatar: "/placeholder.svg?height=40&width=40&text=旅行博主",
          },
          location: "云南·大理",
          content: "大理的风花雪月，让人流连忘返！",
          coverImage: "/placeholder.svg?height=400&width=600&text=大理",
          likes: 298,
          comments: 47,
          createdAt: "2023-03-05T11:20:00Z",
          tags: [tag, "云南", "旅行"],
        },
        {
          id: "tag-story2",
          user: {
            id: "user8",
            name: "探险家",
            avatar: "/placeholder.svg?height=40&width=40&text=探险家",
          },
          location: "西藏·拉萨",
          content: "拉萨的蓝天白云，让人心旷神怡！",
          coverImage: "/placeholder.svg?height=400&width=600&text=拉萨",
          likes: 312,
          comments: 53,
          createdAt: "2023-02-18T16:40:00Z",
          tags: [tag, "西藏", "高原"],
        },
      ],
      total: 156,
      page: page,
      limit: limit,
      hasMore: page * limit < 156,
      tag: tag,
    }

    /*
    // 真实API调用
    try {
      const response = await api.get('/social/travel-stories/search', {
        params: { tag, page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('根据标签搜索故事失败:', error);
      throw error;
    }
    */
  },

  // 举报故事
  reportStory: async (storyId: string, reason: string, description?: string) => {
    // 模拟数据
    return { success: true, message: "举报已提交，我们会尽快处理" }

    /*
    // 真实API调用
    try {
      const response = await api.post(`/social/travel-stories/${storyId}/report`, {
        reason,
        description
      });
      return response.data;
    } catch (error) {
      console.error('举报故事失败:', error);
      throw error;
    }
    */
  },
}

// AR导航服务
export const arNavigationService = {
  // 获取AR导航数据
  getARNavigationData: async (locationId: string) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get(`/ar-navigation/data/${locationId}`);
      return response.data;
    } catch (error) {
      console.error('获取AR导航数据失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      id: locationId,
      name: "故宫博物院",
      arPoints: [
        {
          id: "p1",
          name: "午门",
          description: "午门是紫禁城的正门，建于明永乐十八年（1420年）",
          coordinates: { latitude: 39.916345, longitude: 116.39066 },
          arModel: "/models/wumen.glb",
          audioGuide: "/audio/wumen-guide.mp3",
        },
        {
          id: "p2",
          name: "太和殿",
          description: "太和殿是紫禁城内的正殿，是明清两代举行大典的地方",
          coordinates: { latitude: 39.918697, longitude: 116.390375 },
          arModel: "/models/taihedian.glb",
          audioGuide: "/audio/taihedian-guide.mp3",
        },
        // 更多AR点位
      ],
      routes: [
        {
          id: "r1",
          name: "经典游览路线",
          points: ["p1", "p2", "p3", "p4"],
          estimatedTime: 120, // 分钟
        },
      ],
    }
  },

  // 校准AR位置
  calibrateARPosition: async (userData: {
    userId: string
    currentLocation: { latitude: number; longitude: number }
    deviceOrientation: { alpha: number; beta: number; gamma: number }
  }) => {
    /* 
    // 真实API调用
    try {
      const response = await api.post('/ar-navigation/calibrate', userData);
      return response.data;
    } catch (error) {
      console.error('校准AR位置失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      success: true,
      calibratedLocation: {
        latitude: userData.currentLocation.latitude + 0.0001,
        longitude: userData.currentLocation.longitude - 0.0002,
      },
      accuracy: "high",
    }
  },

  // 获取附近AR景点
  getNearbyARPoints: async (location: { latitude: number; longitude: number }, radius = 500) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get('/ar-navigation/nearby-points', {
        params: { latitude: location.latitude, longitude: location.longitude, radius }
      });
      return response.data;
    } catch (error) {
      console.error('获取附近AR景点失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      points: [
        {
          id: "np1",
          name: "天安门",
          description: "天安门是中华人民共和国的象征",
          distance: 320, // 米
          coordinates: { latitude: 39.913818, longitude: 116.391603 },
          arModel: "/models/tiananmen.glb",
        },
        {
          id: "np2",
          name: "国家博物馆",
          description: "中国国家博物馆是中国最大的博物馆",
          distance: 450, // 米
          coordinates: { latitude: 39.90562, longitude: 116.401901 },
          arModel: "/models/museum.glb",
        },
      ],
    }
  },

  // 更新AR导航进度
  updateNavigationProgress: async (userId: string, routeId: string, completedPoints: string[]) => {
    /* 
    // 真实API调用
    try {
      const response = await api.post('/ar-navigation/update-progress', {
        userId,
        routeId,
        completedPoints
      });
      return response.data;
    } catch (error) {
      console.error('更新AR导航进度失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      success: true,
      progress: (completedPoints.length / 10) * 100, // 假设总共有10个点
      remainingPoints: 10 - completedPoints.length,
      earnedPoints: completedPoints.length * 5, // 每个点5积分
    }
  },

  // 获取AR导航历史记录
  getARNavigationHistory: async (userId: string) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get(`/ar-navigation/history/${userId}`);
      return response.data;
    } catch (error) {
      console.error('获取AR导航历史记录失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      history: [
        {
          id: "h1",
          date: "2023-05-15",
          locationName: "故宫博物院",
          routeName: "经典游览路线",
          completionRate: 100,
          earnedPoints: 50,
        },
        {
          id: "h2",
          date: "2023-05-10",
          locationName: "颐和园",
          routeName: "湖畔漫步",
          completionRate: 80,
          earnedPoints: 40,
        },
      ],
    }
  },
}

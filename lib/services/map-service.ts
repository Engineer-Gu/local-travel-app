// 地图服务
export const mapService = {
  // 获取地图数据
  getMapData: async (center: { latitude: number; longitude: number }, zoom: number) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get('/map/data', {
        params: { 
          latitude: center.latitude, 
          longitude: center.longitude,
          zoom
        }
      });
      return response.data;
    } catch (error) {
      console.error('获取地图数据失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      center: center,
      zoom: zoom,
      mapStyle: "standard",
      pois: [
        {
          id: "poi1",
          name: "故宫博物院",
          type: "attraction",
          coordinates: { latitude: 39.916345, longitude: 116.39066 },
          rating: 4.8,
          visitCount: 15000,
        },
        {
          id: "poi2",
          name: "天安门广场",
          type: "attraction",
          coordinates: { latitude: 39.90374, longitude: 116.397827 },
          rating: 4.7,
          visitCount: 20000,
        },
      ],
    }
  },

  // 获取路线规划
  getRouteDirections: async (
    origin: { latitude: number; longitude: number },
    destination: { latitude: number; longitude: number },
    mode: "walking" | "driving" | "transit" = "walking",
    waypoints: Array<{ latitude: number; longitude: number }> = [],
  ) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get('/map/directions', {
        params: { 
          originLat: origin.latitude, 
          originLng: origin.longitude,
          destLat: destination.latitude,
          destLng: destination.longitude,
          mode,
          waypoints: waypoints.map(wp => `${wp.latitude},${wp.longitude}`).join('|')
        }
      });
      return response.data;
    } catch (error) {
      console.error('获取路线规划失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      distance: 2500, // 米
      duration: 1800, // 秒
      startAddress: "北京市东城区景山前街4号",
      endAddress: "北京市东城区天安门广场",
      steps: [
        {
          instruction: "向南步行500米",
          distance: 500,
          duration: 360,
          startLocation: { latitude: 39.916345, longitude: 116.39066 },
          endLocation: { latitude: 39.911845, longitude: 116.39066 },
        },
        {
          instruction: "向东步行2000米",
          distance: 2000,
          duration: 1440,
          startLocation: { latitude: 39.911845, longitude: 116.39066 },
          endLocation: { latitude: 39.911845, longitude: 116.41066 },
        },
      ],
      polyline: "encoded_polyline_data_here",
    }
  },

  // 获取实时交通信息
  getTrafficInfo: async (bounds: {
    northeast: { latitude: number; longitude: number }
    southwest: { latitude: number; longitude: number }
  }) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get('/map/traffic', {
        params: { 
          neLat: bounds.northeast.latitude, 
          neLng: bounds.northeast.longitude,
          swLat: bounds.southwest.latitude,
          swLng: bounds.southwest.longitude
        }
      });
      return response.data;
    } catch (error) {
      console.error('获取实时交通信息失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      updateTime: new Date().toISOString(),
      trafficLevel: "moderate", // light, moderate, heavy, severe
      incidents: [
        {
          id: "i1",
          type: "accident",
          location: { latitude: 39.91, longitude: 116.395 },
          description: "交通事故，请绕行",
          startTime: "2023-05-15T10:30:00Z",
          endTime: "2023-05-15T12:30:00Z",
        },
      ],
      roadConditions: [
        {
          id: "rc1",
          roadName: "长安街",
          congestionLevel: "heavy",
          averageSpeed: 15, // km/h
        },
        {
          id: "rc2",
          roadName: "东单北大街",
          congestionLevel: "light",
          averageSpeed: 40, // km/h
        },
      ],
    }
  },

  // 获取周边设施
  getNearbyFacilities: async (
    location: { latitude: number; longitude: number },
    types: Array<"restaurant" | "hotel" | "attraction" | "shopping" | "toilet" | "parking">,
    radius = 1000,
  ) => {
    /* 
    // 真实API调用
    try {
      const response = await api.get('/map/nearby', {
        params: { 
          latitude: location.latitude, 
          longitude: location.longitude,
          types: types.join(','),
          radius
        }
      });
      return response.data;
    } catch (error) {
      console.error('获取周边设施失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      facilities: [
        {
          id: "f1",
          name: "故宫角楼咖啡",
          type: "restaurant",
          coordinates: { latitude: 39.917345, longitude: 116.39166 },
          distance: 200,
          rating: 4.5,
          priceLevel: 3,
          openNow: true,
        },
        {
          id: "f2",
          name: "北京饭店",
          type: "hotel",
          coordinates: { latitude: 39.90974, longitude: 116.405827 },
          distance: 800,
          rating: 4.8,
          priceLevel: 4,
          openNow: true,
        },
        {
          id: "f3",
          name: "公共厕所",
          type: "toilet",
          coordinates: { latitude: 39.915345, longitude: 116.39266 },
          distance: 150,
          rating: 3.5,
          openNow: true,
        },
      ],
    }
  },

  // 保存用户自定义地点
  saveCustomLocation: async (
    userId: string,
    location: {
      name: string
      coordinates: { latitude: number; longitude: number }
      description?: string
      category?: string
      tags?: string[]
    },
  ) => {
    /* 
    // 真实API调用
    try {
      const response = await api.post('/map/custom-locations', {
        userId,
        ...location
      });
      return response.data;
    } catch (error) {
      console.error('保存用户自定义地点失败:', error);
      throw error;
    }
    */

    // 模拟数据
    return {
      success: true,
      locationId: "cl" + Math.floor(Math.random() * 10000),
      message: "地点保存成功",
    }
  },
}

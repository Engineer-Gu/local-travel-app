// 导游接口定义
export interface Guide {
  id: string
  name: string
  avatar: string
  rating: number
  reviews: number
  specialties: string[]
  experience: string
  price: string
  available: string
  description?: string
  languages?: string[]
  certificates?: string[]
  location?: {
    city: string
    district?: string
  }
  contactInfo?: {
    phone?: string
    email?: string
    wechat?: string
  }
  workingHours?: {
    start: string
    end: string
    daysOff?: string[]
  }
  isVerified?: boolean
  isFeatured?: boolean
  isFavorite?: boolean
}

// 导游评价接口
export interface GuideReview {
  id: string
  user: {
    id: string
    name: string
    avatar: string
  }
  rating: number
  date: string
  content: string
  likes: number
  images?: string[]
  tags: string[]
  reply?: {
    content: string
    date: string
  }
}

// 导游预约接口
export interface GuideBooking {
  id: string
  guide: {
    id: string
    name: string
    avatar: string
    price: string
  }
  date: string
  timeSlot: string
  duration: number
  location: string
  participants: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  totalPrice: number
  createdAt: string
  notes?: string
  contactInfo: {
    name: string
    phone: string
  }
  paymentMethod?: string
  paymentStatus?: "unpaid" | "paid" | "refunded"
}

// 导游咨询消息接口
export interface GuideMessage {
  id: string
  sender: "user" | "guide"
  content: string
  time: string
  type: "text" | "image" | "file" | "location"
  fileUrl?: string
  fileName?: string
  locationInfo?: {
    latitude: number
    longitude: number
    address?: string
  }
  isRead?: boolean
}

// 导游服务类型接口
export interface GuideServiceType {
  id: string
  name: string
  description: string
  basePrice: string
  duration: string
  icon?: string
}

// 导游证书接口
export interface GuideCertificate {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  verificationStatus: "verified" | "pending" | "expired"
  imageUrl?: string
}

// 导游行程接口
export interface GuideItinerary {
  id: string
  title: string
  description: string
  duration: string
  highlights: string[]
  locations: string[]
  price: string
  images: string[]
  maxParticipants: number
  tags?: string[]
  includedServices?: string[]
  excludedServices?: string[]
}

// 导游服务
export const guideService = {
  /**
   * 获取导游列表
   * @param params - 查询参数
   * @returns Promise with guides
   */
  /* async getGuides(params?: {
    city?: string
    specialties?: string[]
    priceMin?: number
    priceMax?: number
    rating?: number
    available?: string
    page?: number
    limit?: number
    sortBy?: "rating" | "price" | "reviews"
    sortOrder?: "asc" | "desc"
  }): Promise<Guide[]> {
    return api.get("/guides", { params })
  }, */
  /**
   * 获取热门导游
   * @param city - 城市名称
   * @param limit - 返回数量
   * @returns Promise with popular guides
   */
  /* async getPopularGuides(city?: string, limit = 5): Promise<Guide[]> {
    return api.get("/guides/popular", { params: { city, limit } })
  }, */
  /**
   * 搜索导游
   * @param keyword - 搜索关键词
   * @param filters - 筛选条件
   * @returns Promise with search results
   */
  /* async searchGuides(keyword: string, filters?: {
    city?: string
    specialties?: string[]
    priceRange?: [number, number]
    rating?: number
    available?: string
  }): Promise<Guide[]> {
    return api.get("/guides/search", { 
      params: { 
        keyword,
        ...filters
      } 
    })
  }, */
  /**
   * 获取导游详情
   * @param guideId - 导游ID
   * @returns Promise with guide details
   */
  /* async getGuideDetails(guideId: string): Promise<Guide> {
    return api.get(`/guides/${guideId}`)
  }, */
  /**
   * 获取导游评价
   * @param guideId - 导游ID
   * @param params - 查询参数
   * @returns Promise with guide reviews
   */
  /* async getGuideReviews(guideId: string, params?: {
    page?: number
    limit?: number
    rating?: number
    hasImages?: boolean
    sortBy?: "date" | "rating" | "likes"
    sortOrder?: "asc" | "desc"
  }): Promise<GuideReview[]> {
    return api.get(`/guides/${guideId}/reviews`, { params })
  }, */
  /**
   * 获取导游评价统计
   * @param guideId - 导游ID
   * @returns Promise with review statistics
   */
  /* async getGuideReviewStats(guideId: string): Promise<{
    averageRating: number
    totalReviews: number
    ratingDistribution: {
      5: number
      4: number
      3: number
      2: number
      1: number
    }
    topTags: {
      tag: string
      count: number
    }[]
  }> {
    return api.get(`/guides/${guideId}/review-stats`)
  }, */
  /**
   * 提交导游评价
   * @param guideId - 导游ID
   * @param reviewData - 评价数据
   * @returns Promise with submitted review
   */
  /* async submitGuideReview(guideId: string, reviewData: {
    rating: number
    content: string
    tags?: string[]
    images?: File[]
    bookingId?: string
  }): Promise<GuideReview> {
    const formData = new FormData()
    formData.append('rating', reviewData.rating.toString())
    formData.append('content', reviewData.content)
    
    if (reviewData.tags && reviewData.tags.length > 0) {
      formData.append('tags', JSON.stringify(reviewData.tags))
    }
    
    if (reviewData.bookingId) {
      formData.append('bookingId', reviewData.bookingId)
    }
    
    if (reviewData.images && reviewData.images.length > 0) {
      reviewData.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image)
      })
    }
    
    return api.post(`/guides/${guideId}/reviews`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }, */
  /**
   * 点赞导游评价
   * @param guideId - 导游ID
   * @param reviewId - 评价ID
   * @returns Promise with like status
   */
  /* async likeGuideReview(guideId: string, reviewId: string): Promise<{ status: string, likes: number }> {
    return api.post(`/guides/${guideId}/reviews/${reviewId}/like`)
  }, */
  /**
   * 获取导游可用时间
   * @param guideId - 导游ID
   * @param startDate - 开始日期
   * @param endDate - 结束日期
   * @returns Promise with available time slots
   */
  /* async getGuideAvailability(guideId: string, startDate: string, endDate: string): Promise<{
    date: string
    slots: {
      id: string
      startTime: string
      endTime: string
      isAvailable: boolean
    }[]
  }[]> {
    return api.get(`/guides/${guideId}/availability`, {
      params: { startDate, endDate }
    })
  }, */
  /**
   * 预约导游
   * @param guideId - 导游ID
   * @param bookingData - 预约数据
   * @returns Promise with booking details
   */
  /* async bookGuide(guideId: string, bookingData: {
    date: string
    timeSlot: string
    duration: number
    location: string
    participants: number
    contactInfo: {
      name: string
      phone: string
    }
    notes?: string
  }): Promise<GuideBooking> {
    return api.post(`/guides/${guideId}/bookings`, bookingData)
  }, */
  /**
   * 获取用户的导游预约历史
   * @param status - 预约状态筛选
   * @returns Promise with booking history
   */
  /* async getGuideBookingHistory(status?: "pending" | "confirmed" | "completed" | "cancelled"): Promise<GuideBooking[]> {
    return api.get("/user/guide-bookings", {
      params: { status }
    })
  }, */
  /**
   * 获取预约详情
   * @param bookingId - 预约ID
   * @returns Promise with booking details
   */
  /* async getBookingDetails(bookingId: string): Promise<GuideBooking> {
    return api.get(`/guide-bookings/${bookingId}`)
  }, */
  /**
   * 取消导游预约
   * @param bookingId - 预约ID
   * @param reason - 取消原因
   * @returns Promise with cancel status
   */
  /* async cancelBooking(bookingId: string, reason?: string): Promise<{ status: string }> {
    return api.post(`/guide-bookings/${bookingId}/cancel`, { reason })
  }, */
  /**
   * 修改导游预约
   * @param bookingId - 预约ID
   * @param updateData - 更新数据
   * @returns Promise with updated booking
   */
  /* async updateBooking(bookingId: string, updateData: {
    date?: string
    timeSlot?: string
    duration?: number
    location?: string
    participants?: number
    notes?: string
  }): Promise<GuideBooking> {
    return api.put(`/guide-bookings/${bookingId}`, updateData)
  }, */
  /**
   * 支付导游预约
   * @param bookingId - 预约ID
   * @param paymentMethod - 支付方式
   * @returns Promise with payment status
   */
  /* async payBooking(bookingId: string, paymentMethod: string): Promise<{
    status: string
    paymentId: string
    paymentUrl?: string
  }> {
    return api.post(`/guide-bookings/${bookingId}/pay`, { paymentMethod })
  }, */
  /**
   * 获取导游咨询历史
   * @param guideId - 导游ID
   * @param before - 获取此消息ID之前的消息
   * @param limit - 消息数量
   * @returns Promise with consultation messages
   */
  /* async getGuideConsultationHistory(guideId: string, before?: string, limit = 20): Promise<GuideMessage[]> {
    return api.get(`/guides/${guideId}/messages`, {
      params: { before, limit }
    })
  }, */
  /**
   * 发送导游咨询消息
   * @param guideId - 导游ID
   * @param content - 消息内容
   * @param type - 消息类型
   * @returns Promise with sent message
   */
  /* async sendGuideMessage(guideId: string, content: string, type: "text" | "emoji" = "text"): Promise<GuideMessage> {
    return api.post(`/guides/${guideId}/messages`, { content, type })
  }, */
  /**
   * 发送导游咨询图片消息
   * @param guideId - 导游ID
   * @param image - 图片文件
   * @returns Promise with sent message
   */
  /* async sendGuideImageMessage(guideId: string, image: File): Promise<GuideMessage> {
    const formData = new FormData()
    formData.append('image', image)
    return api.post(`/guides/${guideId}/messages/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }, */
  /**
   * 发送导游咨询文件消息
   * @param guideId - 导游ID
   * @param file - 文件
   * @returns Promise with sent message
   */
  /* async sendGuideFileMessage(guideId: string, file: File): Promise<GuideMessage> {
    const formData = new FormData()
    formData.append('file', file)
    return api.post(`/guides/${guideId}/messages/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }, */
  /**
   * 发送导游咨询位置消息
   * @param guideId - 导游ID
   * @param latitude - 纬度
   * @param longitude - 经度
   * @param address - 地址
   * @returns Promise with sent message
   */
  /* async sendGuideLocationMessage(guideId: string, latitude: number, longitude: number, address?: string): Promise<GuideMessage> {
    return api.post(`/guides/${guideId}/messages/location`, { 
      latitude, 
      longitude, 
      address
    })
  }, */
  /**
   * 标记导游咨询消息为已读
   * @param guideId - 导游ID
   * @param messageId - 消息ID
   * @returns Promise with read status
   */
  /* async markGuideMessageAsRead(guideId: string, messageId: string): Promise<{ status: string }> {
    return api.put(`/guides/${guideId}/messages/${messageId}/read`)
  }, */
  /**
   * 获取导游咨询未读消息数
   * @returns Promise with unread count
   */
  /* async getGuideUnreadMessageCount(): Promise<{ count: number }> {
    return api.get("/user/guide-messages/unread")
  }, */
  /**
   * 发起导游语音通话
   * @param guideId - 导游ID
   * @returns Promise with call session
   */
  /* async initiateGuideVoiceCall(guideId: string): Promise<{
    callId: string
    token: string
    channelName: string
  }> {
    return api.post(`/guides/${guideId}/call/voice`)
  }, */
  /**
   * 发起导游视频通话
   * @param guideId - 导游ID
   * @returns Promise with call session
   */
  /* async initiateGuideVideoCall(guideId: string): Promise<{
    callId: string
    token: string
    channelName: string
  }> {
    return api.post(`/guides/${guideId}/call/video`)
  }, */
  /**
   * 结束导游通话
   * @param callId - 通话ID
   * @returns Promise with end status
   */
  /* async endGuideCall(callId: string): Promise<{ status: string }> {
    return api.post(`/guide-calls/${callId}/end`)
  }, */
  /**
   * 获取导游通话历史
   * @returns Promise with call history
   */
  /* async getGuideCallHistory(): Promise<{
    id: string
    guide: {
      id: string
      name: string
      avatar: string
    }
    type: "voice" | "video"
    startTime: string
    endTime?: string
    duration?: number
    status: "missed" | "completed" | "ongoing"
  }[]> {
    return api.get("/user/guide-calls")
  }, */
  /**
   * 收藏导游
   * @param guideId - 导游ID
   * @returns Promise with favorite status
   */
  /* async favoriteGuide(guideId: string): Promise<{ status: string }> {
    return api.post(`/guides/${guideId}/favorite`)
  }, */
  /**
   * 取消收藏导游
   * @param guideId - 导游ID
   * @returns Promise with unfavorite status
   */
  /* async unfavoriteGuide(guideId: string): Promise<{ status: string }> {
    return api.delete(`/guides/${guideId}/favorite`)
  }, */
  /**
   * 获取收藏的导游
   * @returns Promise with favorited guides
   */
  /* async getFavoritedGuides(): Promise<Guide[]> {
    return api.get("/user/favorite-guides")
  }, */
  /**
   * 获取导游服务类型
   * @returns Promise with guide service types
   */
  /* async getGuideServiceTypes(): Promise<GuideServiceType[]> {
    return api.get("/guides/service-types")
  }, */
  /**
   * 获取导游证书
   * @param guideId - 导游ID
   * @returns Promise with guide certificates
   */
  /* async getGuideCertificates(guideId: string): Promise<GuideCertificate[]> {
    return api.get(`/guides/${guideId}/certificates`)
  }, */
  /**
   * 获取导游行程
   * @param guideId - 导游ID
   * @returns Promise with guide itineraries
   */
  /* async getGuideItineraries(guideId: string): Promise<GuideItinerary[]> {
    return api.get(`/guides/${guideId}/itineraries`)
  }, */
  /**
   * 获取导游行程详情
   * @param itineraryId - 行程ID
   * @returns Promise with itinerary details
   */
  /* async getItineraryDetails(itineraryId: string): Promise<GuideItinerary> {
    return api.get(`/guide-itineraries/${itineraryId}`)
  }, */
  /**
   * 预约导游行程
   * @param itineraryId - 行程ID
   * @param bookingData - 预约数据
   * @returns Promise with booking details
   */
  /* async bookGuideItinerary(itineraryId: string, bookingData: {
    date: string
    participants: number
    contactInfo: {
      name: string
      phone: string
    }
    notes?: string
  }): Promise<GuideBooking> {
    return api.post(`/guide-itineraries/${itineraryId}/book`, bookingData)
  }, */
  /**
   * 获取导游推荐
   * @param interests - 兴趣标签
   * @param location - 位置
   * @returns Promise with recommended guides
   */
  /* async getRecommendedGuides(interests?: string[], location?: string): Promise<Guide[]> {
    return api.get("/guides/recommendations", {
      params: { interests, location }
    })
  }, */
  /**
   * 获取导游筛选选项
   * @returns Promise with filter options
   */
  /* async getGuideFilterOptions(): Promise<{
    specialties: string[]
    languages: string[]
    priceRanges: {
      min: number
      max: number
      label: string
    }[]
    cities: string[]
  }> {
    return api.get("/guides/filter-options")
  }, */
  /**
   * 举报导游
   * @param guideId - 导游ID
   * @param reason - 举报原因
   * @param description - 详细描述
   * @returns Promise with report status
   */
  /* async reportGuide(guideId: string, reason: string, description?: string): Promise<{ status: string }> {
    return api.post(`/guides/${guideId}/report`, { reason, description })
  }, */
  /**
   * 获取导游评价标签
   * @returns Promise with review tags
   */
  /* async getGuideReviewTags(): Promise<string[]> {
    return api.get("/guides/review-tags")
  }, */
  /**
   * 获取导游工作时间
   * @param guideId - 导游ID
   * @returns Promise with working hours
   */
  /* async getGuideWorkingHours(guideId: string): Promise<{
    weekdays: {
      day: string
      isWorking: boolean
      hours?: {
        start: string
        end: string
      }
    }[]
  }> {
    return api.get(`/guides/${guideId}/working-hours`)
  }, */
  /**
   * 获取导游服务区域
   * @param guideId - 导游ID
   * @returns Promise with service areas
   */
  /* async getGuideServiceAreas(guideId: string): Promise<{
    city: string
    districts: string[]
    landmarks?: {
      name: string
      location: {
        latitude: number
        longitude: number
      }
    }[]
  }[]> {
    return api.get(`/guides/${guideId}/service-areas`)
  }, */
  /**
   * 获取附近的导游
   * @param latitude - 纬度
   * @param longitude - 经度
   * @param radius - 半径（公里）
   * @returns Promise with nearby guides
   */
  /* async getNearbyGuides(latitude: number, longitude: number, radius = 5): Promise<Guide[]> {
    return api.get("/guides/nearby", {
      params: { latitude, longitude, radius }
    })
  }, */
  /**
   * 获取导游统计信息
   * @param guideId - 导游ID
   * @returns Promise with guide statistics
   */
  /* async getGuideStatistics(guideId: string): Promise<{
    totalBookings: number
    completedBookings: number
    totalCustomers: number
    averageRating: number
    responseRate: number
    responseTime: string
  }> {
    return api.get(`/guides/${guideId}/statistics`)
  }, */
  /**
   * 获取导游价格详情
   * @param guideId - 导游ID
   * @returns Promise with price details
   */
  /* async getGuidePriceDetails(guideId: string): Promise<{
    basePrice: string
    hourlyRate: string
    fullDayRate: string
    additionalPersonFee: string
    cancellationPolicy: string
    specialOffers?: {
      title: string
      description: string
      discountPercentage: number
      validUntil?: string
    }[]
  }> {
    return api.get(`/guides/${guideId}/price-details`)
  }, */
  /**
   * 获取导游退款政策
   * @param guideId - 导游ID
   * @returns Promise with refund policy
   */
  /* async getGuideRefundPolicy(guideId: string): Promise<{
    fullRefund: {
      hoursBeforeStart: number
      description: string
    }
    partialRefund: {
      hoursBeforeStart: number
      percentage: number
      description: string
    }
    noRefund: {
      hoursBeforeStart: number
      description: string
    }
  }> {
    return api.get(`/guides/${guideId}/refund-policy`)
  }, */
}

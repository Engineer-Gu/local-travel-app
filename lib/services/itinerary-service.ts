export interface Itinerary {
  id: string
  title: string
  date: string
  time: string
  location: string
  companions: number
  status: string
  routeId?: string
  route?: {
    id: string
    title: string
    image?: string
  }
  notes?: string
  weather?: string
  transportation?: string
  cost?: string
  reminder?: boolean
  reminderTime?: string
  isPublic?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ItineraryFilter {
  status?: "upcoming" | "completed" | "cancelled" | "all"
  searchText?: string
  dateRange?: [string, string]
  sortBy?: "date" | "title" | "location"
  sortOrder?: "asc" | "desc"
}

export interface ItineraryCompanion {
  id: string
  name: string
  avatar?: string
  status: "confirmed" | "pending" | "declined"
  invitedAt: string
  respondedAt?: string
}

export interface ItineraryInvitation {
  id: string
  itineraryId: string
  itinerary: {
    title: string
    date: string
    time: string
    location: string
  }
  senderId: string
  sender: {
    name: string
    avatar?: string
  }
  message?: string
  status: "pending" | "accepted" | "declined"
  createdAt: string
  expiresAt?: string
}

export const itineraryService = {
  /**
   * 获取行程列表
   * @param filter - 筛选条件
   * @returns Promise with itineraries
   */
  /* async getItineraries(filter?: ItineraryFilter): Promise<Itinerary[]> {
    return api.get("/itineraries", { params: filter })
  }, */
  /**
   * 获取行程详情
   * @param itineraryId - 行程ID
   * @returns Promise with itinerary details
   */
  /* async getItineraryDetail(itineraryId: string): Promise<Itinerary> {
    return api.get(`/itineraries/${itineraryId}`)
  }, */
  /**
   * 创建新行程
   * @param itinerary - 行程信息
   * @returns Promise with created itinerary
   */
  /* async createItinerary(itinerary: Partial<Itinerary>): Promise<Itinerary> {
    return api.post("/itineraries", itinerary)
  }, */
  /**
   * 更新行程
   * @param itineraryId - 行程ID
   * @param itinerary - 更新的行程信息
   * @returns Promise with updated itinerary
   */
  /* async updateItinerary(itineraryId: string, itinerary: Partial<Itinerary>): Promise<Itinerary> {
    return api.put(`/itineraries/${itineraryId}`, itinerary)
  }, */
  /**
   * 删除行程
   * @param itineraryId - 行程ID
   * @returns Promise with deletion status
   */
  /* async deleteItinerary(itineraryId: string) {
    return api.delete(`/itineraries/${itineraryId}`)
  }, */
  /**
   * 取消行程
   * @param itineraryId - 行程ID
   * @param reason - 取消原因
   * @returns Promise with cancellation status
   */
  /* async cancelItinerary(itineraryId: string, reason?: string) {
    return api.post(`/itineraries/${itineraryId}/cancel`, { reason })
  }, */
  /**
   * 完成行程
   * @param itineraryId - 行程ID
   * @returns Promise with completion status
   */
  /* async completeItinerary(itineraryId: string) {
    return api.post(`/itineraries/${itineraryId}/complete`)
  }, */
  /**
   * 获取行程同伴
   * @param itineraryId - 行程ID
   * @returns Promise with companions
   */
  /* async getItineraryCompanions(itineraryId: string): Promise<ItineraryCompanion[]> {
    return api.get(`/itineraries/${itineraryId}/companions`)
  }, */
  /**
   * 邀请同伴加入行程
   * @param itineraryId - 行程ID
   * @param userId - 用户ID
   * @param message - 邀请消息
   * @returns Promise with invitation status
   */
  /* async inviteCompanion(itineraryId: string, userId: string, message?: string) {
    return api.post(`/itineraries/${itineraryId}/companions`, { userId, message })
  }, */
  /**
   * 移除行程同伴
   * @param itineraryId - 行程ID
   * @param userId - 用户ID
   * @returns Promise with removal status
   */
  /* async removeCompanion(itineraryId: string, userId: string) {
    return api.delete(`/itineraries/${itineraryId}/companions/${userId}`)
  }, */
  /**
   * 获取行程邀请
   * @returns Promise with invitations
   */
  /* async getInvitations(): Promise<ItineraryInvitation[]> {
    return api.get("/itineraries/invitations")
  }, */
  /**
   * 回应行程邀请
   * @param invitationId - 邀请ID
   * @param accept - 是否接受
   * @returns Promise with response status
   */
  /* async respondToInvitation(invitationId: string, accept: boolean) {
    return api.post(`/itineraries/invitations/${invitationId}/respond`, { accept })
  }, */
  /**
   * 分享行程
   * @param itineraryId - 行程ID
   * @param platform - 分享平台
   * @returns Promise with share status
   */
  /* async shareItinerary(itineraryId: string, platform: string) {
    return api.post(`/itineraries/${itineraryId}/share`, { platform })
  }, */
  /**
   * 设置行程提醒
   * @param itineraryId - 行程ID
   * @param reminder - 是否开启提醒
   * @param reminderTime - 提醒时间
   * @returns Promise with reminder status
   */
  /* async setItineraryReminder(itineraryId: string, reminder: boolean, reminderTime?: string) {
    return api.post(`/itineraries/${itineraryId}/reminder`, { reminder, reminderTime })
  }, */
  /**
   * 获取即将开始的行程
   * @param days - 天数
   * @returns Promise with upcoming itineraries
   */
  /* async getUpcomingItineraries(days = 7): Promise<Itinerary[]> {
    return api.get("/itineraries/upcoming", { params: { days } })
  }, */
  /**
   * 获取历史行程
   * @param limit - 返回结果数量限制
   * @returns Promise with historical itineraries
   */
  /* async getHistoricalItineraries(limit = 10): Promise<Itinerary[]> {
    return api.get("/itineraries/historical", { params: { limit } })
  }, */
  /**
   * 从路线创建行程
   * @param routeId - 路线ID
   * @param date - 行程日期
   * @param time - 行程时间
   * @returns Promise with created itinerary
   */
  /* async createItineraryFromRoute(routeId: string, date: string, time: string): Promise<Itinerary> {
    return api.post("/itineraries/from-route", { routeId, date, time })
  }, */
  /**
   * 导出行程为日历格式
   * @param itineraryId - 行程ID
   * @returns Promise with calendar data
   */
  /* async exportItineraryToCalendar(itineraryId: string) {
    return api.get(`/itineraries/${itineraryId}/export/calendar`)
  }, */
}

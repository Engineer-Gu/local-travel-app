export interface Notification {
  id: string
  type: "system" | "social" | "activity" | "promotion"
  title: string
  content: string
  time: string
  read: boolean
  sender?: {
    id: string
    name: string
    avatar?: string
  }
  actionType?: string
  actionData?: Record<string, any>
  priority?: "high" | "medium" | "low"
}

export interface NotificationFilter {
  type?: "system" | "social" | "activity" | "promotion" | "all"
  read?: boolean
  startTime?: string
  endTime?: string
  limit?: number
  offset?: number
}

export interface NotificationStats {
  total: number
  unread: number
  byType: Record<string, number>
}

export interface NotificationSettings {
  enablePush: boolean
  enableEmail: boolean
  enableSMS: boolean
  muteAll: boolean
  muteStartTime?: string
  muteEndTime?: string
  typeSettings: {
    system: boolean
    social: boolean
    activity: boolean
    promotion: boolean
  }
}

export const notificationService = {
  /**
   * 获取通知列表
   * @param filter - 筛选条件
   * @returns Promise with notifications
   */
  /* async getNotifications(filter?: NotificationFilter): Promise<Notification[]> {
    return api.get("/notifications", { params: filter })
  }, */
  /**
   * 获取通知详情
   * @param notificationId - 通知ID
   * @returns Promise with notification details
   */
  /* async getNotificationById(notificationId: string): Promise<Notification> {
    return api.get(`/notifications/${notificationId}`)
  }, */
  /**
   * 标记通知为已读
   * @param notificationId - 通知ID
   * @returns Promise with updated notification
   */
  /* async markAsRead(notificationId: string): Promise<Notification> {
    return api.put(`/notifications/${notificationId}/read`)
  }, */
  /**
   * 标记所有通知为已读
   * @param type - 可选的通知类型筛选
   * @returns Promise with operation result
   */
  /* async markAllAsRead(type?: string): Promise<{ success: boolean; count: number }> {
    return api.put("/notifications/read-all", { type })
  }, */
  /**
   * 删除通知
   * @param notificationId - 通知ID
   * @returns Promise with deletion status
   */
  /* async deleteNotification(notificationId: string): Promise<{ success: boolean }> {
    return api.delete(`/notifications/${notificationId}`)
  }, */
  /**
   * 清空所有通知
   * @param type - 可选的通知类型筛选
   * @returns Promise with operation result
   */
  /* async clearAllNotifications(type?: string): Promise<{ success: boolean; count: number }> {
    return api.delete("/notifications/clear-all", { params: { type } })
  }, */
  /**
   * 获取通知统计信息
   * @returns Promise with notification statistics
   */
  /* async getNotificationStats(): Promise<NotificationStats> {
    return api.get("/notifications/stats")
  }, */
  /**
   * 获取通知设置
   * @returns Promise with notification settings
   */
  /* async getNotificationSettings(): Promise<NotificationSettings> {
    return api.get("/notifications/settings")
  }, */
  /**
   * 更新通知设置
   * @param settings - 更新的设置
   * @returns Promise with updated settings
   */
  /* async updateNotificationSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    return api.put("/notifications/settings", settings)
  }, */
  /**
   * 测试通知设置
   * @param type - 通知类型
   * @returns Promise with test result
   */
  /* async testNotification(type: string): Promise<{ success: boolean; message: string }> {
    return api.post("/notifications/test", { type })
  }, */
  /**
   * 获取未读通知数量
   * @returns Promise with unread count
   */
  /* async getUnreadCount(): Promise<{ count: number; byType: Record<string, number> }> {
    return api.get("/notifications/unread-count")
  }, */
  /**
   * 订阅推送通知
   * @param deviceToken - 设备推送令牌
   * @param platform - 平台（ios/android/web）
   * @returns Promise with subscription status
   */
  /* async subscribePushNotifications(deviceToken: string, platform: string): Promise<{ success: boolean }> {
    return api.post("/notifications/subscribe", { deviceToken, platform })
  }, */
  /**
   * 取消订阅推送通知
   * @param deviceToken - 设备推送令牌
   * @returns Promise with unsubscription status
   */
  /* async unsubscribePushNotifications(deviceToken: string): Promise<{ success: boolean }> {
    return api.post("/notifications/unsubscribe", { deviceToken })
  }, */
  /**
   * 执行通知相关操作
   * @param notificationId - 通知ID
   * @param action - 操作类型
   * @returns Promise with action result
   */
  /* async performNotificationAction(notificationId: string, action: string): Promise<any> {
    return api.post(`/notifications/${notificationId}/action`, { action })
  }, */
}

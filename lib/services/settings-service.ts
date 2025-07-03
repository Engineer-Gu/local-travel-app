export interface AppSettings {
  theme: "light" | "dark" | "system"
  language: string
  fontScale: number
  enableLocationServices: boolean
  enableBackgroundSync: boolean
  enableDataSaver: boolean
  enableAutoplay: boolean
  cacheSize: number
}

export interface PrivacySettings {
  profileVisibility: "public" | "friends" | "private"
  locationSharing: "always" | "never" | "when_using"
  activitySharing: boolean
  searchableByPhone: boolean
  searchableByEmail: boolean
  allowFriendRequests: boolean
  showOnlineStatus: boolean
  allowTagging: boolean
}

export interface SecuritySettings {
  enableTwoFactor: boolean
  loginNotifications: boolean
  trustedDevices: {
    id: string
    name: string
    lastLogin: string
    isCurrent: boolean
  }[]
  recentLogins: {
    time: string
    location: string
    device: string
    ip: string
    status: "success" | "failed"
  }[]
  passwordLastChanged: string
}

export interface NotificationPreferences {
  pushEnabled: boolean
  emailEnabled: boolean
  smsEnabled: boolean
  categories: {
    [key: string]: {
      push: boolean
      email: boolean
      sms: boolean
    }
  }
}

export const settingsService = {
  /**
   * 获取应用设置
   * @returns Promise with app settings
   */
  /* async getAppSettings(): Promise<AppSettings> {
    return api.get("/settings/app")
  }, */
  /**
   * 更新应用设置
   * @param settings - 更新的设置
   * @returns Promise with updated settings
   */
  /* async updateAppSettings(settings: Partial<AppSettings>): Promise<AppSettings> {
    return api.put("/settings/app", settings)
  }, */
  /**
   * 获取隐私设置
   * @returns Promise with privacy settings
   */
  /* async getPrivacySettings(): Promise<PrivacySettings> {
    return api.get("/settings/privacy")
  }, */
  /**
   * 更新隐私设置
   * @param settings - 更新的设置
   * @returns Promise with updated settings
   */
  /* async updatePrivacySettings(settings: Partial<PrivacySettings>): Promise<PrivacySettings> {
    return api.put("/settings/privacy", settings)
  }, */
  /**
   * 获取安全设置
   * @returns Promise with security settings
   */
  /* async getSecuritySettings(): Promise<SecuritySettings> {
    return api.get("/settings/security")
  }, */
  /**
   * 更新安全设置
   * @param settings - 更新的设置
   * @returns Promise with updated settings
   */
  /* async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
    return api.put("/settings/security", settings)
  }, */
  /**
   * 获取通知偏好设置
   * @returns Promise with notification preferences
   */
  /* async getNotificationPreferences(): Promise<NotificationPreferences> {
    return api.get("/settings/notifications")
  }, */
  /**
   * 更新通知偏好设置
   * @param preferences - 更新的偏好设置
   * @returns Promise with updated preferences
   */
  /* async updateNotificationPreferences(preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    return api.put("/settings/notifications", preferences)
  }, */
  /**
   * 重置所有设置为默认值
   * @returns Promise with reset status
   */
  /* async resetAllSettings(): Promise<{ success: boolean }> {
    return api.post("/settings/reset")
  }, */
  /**
   * 导出设置
   * @returns Promise with settings data
   */
  /* async exportSettings(): Promise<any> {
    return api.get("/settings/export")
  }, */
  /**
   * 导入设置
   * @param settingsData - 导入的设置数据
   * @returns Promise with import status
   */
  /* async importSettings(settingsData: any): Promise<{ success: boolean; errors?: string[] }> {
    return api.post("/settings/import", settingsData)
  }, */
  /**
   * 获取设备信息
   * @returns Promise with device info
   */
  /* async getDeviceInfo(): Promise<any> {
    return api.get("/settings/device-info")
  }, */
  /**
   * 移除受信任设备
   * @param deviceId - 设备ID
   * @returns Promise with removal status
   */
  /* async removeTrustedDevice(deviceId: string): Promise<{ success: boolean }> {
    return api.delete(`/settings/trusted-devices/${deviceId}`)
  }, */
  /**
   * 清除缓存
   * @returns Promise with operation result
   */
  /* async clearCache(): Promise<{ success: boolean; clearedSize: number }> {
    return api.post("/settings/clear-cache")
  }, */
  /**
   * 获取语言选项
   * @returns Promise with available languages
   */
  /* async getLanguageOptions(): Promise<{ code: string; name: string }[]> {
    return api.get("/settings/languages")
  }, */
  /**
   * 获取主题选项
   * @returns Promise with available themes
   */
  /* async getThemeOptions(): Promise<{ id: string; name: string; preview: string }[]> {
    return api.get("/settings/themes")
  }, */
}

export interface SocialGroup {
  id: string
  name: string
  avatar?: string
  memberCount: number
  description?: string
  tags?: string[]
  isJoined?: boolean
}

export interface SocialEvent {
  id: string
  title: string
  description?: string
  location?: string
  startTime: string
  endTime?: string
  coverImage?: string
  attendeeCount: number
  isAttending?: boolean
  tags?: string[]
  organizer?: {
    id: string
    name: string
    avatar?: string
  }
}

export interface InterestBasedRecommendation {
  type: "user" | "group" | "event" | "route"
  id: string
  title: string
  description?: string
  image?: string
  matchedInterests: string[]
  compatibilityScore: number
}

// 同城群组相关接口
export interface LocalGroup {
  id: string
  name: string
  image: string
  members: number
  activity: string
  description?: string
  createdAt: string
  location?: {
    city: string
    district?: string
    address?: string
    coordinates?: {
      latitude: number
      longitude: number
    }
  }
  tags?: string[]
  owner?: {
    id: string
    name: string
    avatar: string
  }
  activities?: {
    id: string
    title: string
    date: string
    location: string
    participants: number
    maxParticipants?: number
    image?: string
    description?: string
  }[]
  isJoined?: boolean
  pendingApproval?: boolean
}

export interface GroupMember {
  id: string
  name: string
  avatar: string
  role: "owner" | "admin" | "member"
  joinTime: string
  active: boolean
  tags?: string[]
}

export interface GroupMessage {
  id: string
  sender: {
    id: string
    name: string
    avatar: string
  }
  content: string
  time: string
  type: "text" | "image" | "emoji" | "location" | "file"
  replyTo?: {
    id: string
    name: string
    content: string
  }
  fileInfo?: {
    name: string
    size: number
    type: string
    url: string
  }
  locationInfo?: {
    latitude: number
    longitude: number
    address?: string
  }
}

export interface GroupActivity {
  id: string
  title: string
  date: string
  location: string
  participants: number
  maxParticipants?: number
  image?: string
  description?: string
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  organizer: {
    id: string
    name: string
    avatar: string
  }
  attendees: {
    id: string
    name: string
    avatar: string
  }[]
}

// 好友相关接口
export interface Friend {
  id: string
  name: string
  avatar?: string
  status: "online" | "offline" | "away"
  lastActive?: string
  bio?: string
  location?: string
  interests?: string[]
  mutualFriends?: number
  isFavorite?: boolean
  relationship?: "friend" | "close" | "acquaintance"
  notes?: string
  contactInfo?: {
    phone?: string
    email?: string
    wechat?: string
  }
}

export interface FriendRequest {
  id: string
  sender: {
    id: string
    name: string
    avatar?: string
  }
  receiver?: {
    id: string
    name: string
    avatar?: string
  }
  message?: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
  updatedAt?: string
  mutualFriends?: number
}

export interface FriendGroup {
  id: string
  name: string
  friends: string[] // 好友ID列表
  createdAt: string
  updatedAt?: string
}

export interface ChatMessage {
  id: string
  senderId: string
  receiverId: string
  content: string
  type: "text" | "image" | "voice" | "video" | "location" | "file"
  status: "sending" | "sent" | "delivered" | "read" | "failed"
  createdAt: string
  updatedAt?: string
  isDeleted?: boolean
  replyTo?: string // 回复的消息ID
  fileInfo?: {
    name?: string
    size?: number
    duration?: number
    url: string
    thumbnail?: string
  }
  locationInfo?: {
    latitude: number
    longitude: number
    address?: string
  }
}

export interface ChatSession {
  id: string
  participants: string[] // 参与者ID列表
  lastMessage?: ChatMessage
  unreadCount: number
  isPinned?: boolean
  isMuted?: boolean
  createdAt: string
  updatedAt?: string
}

// 社交服务
export const socialService = {
  /**
   * 获取基于兴趣的社交推荐（用户、群组、活动等）
   * @param interests - 兴趣标签数组
   * @returns Promise with recommendations
   */
  /* async getInterestBasedRecommendations(interests: string[]): Promise<InterestBasedRecommendation[]> {
    return api.post("/social/recommendations", { interests })
  }, */
  /**
   * 获取兴趣相似的用户
   * @param limit - 返回结果数量限制
   * @returns Promise with similar users
   */
  /* async getSimilarUsers(limit = 10): Promise<InterestMatch[]> {
    return api.get("/social/similar-users", { params: { limit } })
  }, */
  /**
   * 获取基于兴趣的群组推荐
   * @param interests - 兴趣标签数组
   * @returns Promise with recommended groups
   */
  /* async getInterestBasedGroups(interests: string[]): Promise<SocialGroup[]> {
    return api.post("/social/groups/recommendations", { interests })
  }, */
  /**
   * 获取基于兴趣的活动推荐
   * @param interests - 兴趣标签数组
   * @returns Promise with recommended events
   */
  /* async getInterestBasedEvents(interests: string[]): Promise<SocialEvent[]> {
    return api.post("/social/events/recommendations", { interests })
  }, */
  /**
   * 创建基于兴趣的社交群组
   * @param name - 群组名称
   * @param description - 群组描述
   * @param interests - 群组兴趣标签
   * @returns Promise with created group
   */
  /* async createInterestGroup(name: string, description: string, interests: string[]): Promise<SocialGroup> {
    return api.post("/social/groups", { name, description, interests })
  }, */
  /**
   * 创建基于兴趣的社交活动
   * @param title - 活动标题
   * @param description - 活动描述
   * @param location - 活动地点
   * @param startTime - 开始时间
   * @param endTime - 结束时间
   * @param interests - 活动兴趣标签
   * @returns Promise with created event
   */
  /* async createInterestEvent(
    title: string, 
    description: string, 
    location: string, 
    startTime: string, 
    endTime: string, 
    interests: string[]
  ): Promise<SocialEvent> {
    return api.post("/social/events", { 
      title, 
      description, 
      location, 
      startTime, 
      endTime, 
      interests 
    })
  }, */
  /**
   * 搜索基于兴趣的内容
   * @param interests - 兴趣标签数组
   * @param type - 搜索类型（用户、群组、活动等）
   * @returns Promise with search results
   */
  /* async searchByInterests(interests: string[], type?: 'user' | 'group' | 'event' | 'all') {
    return api.post("/social/search", { interests, type })
  }, */
  /**
   * 获取兴趣趋势
   * @returns Promise with trending interests
   */
  /* async getTrendingInterests() {
    return api.get("/social/trending-interests")
  }, */
  /**
   * 关注特定兴趣
   * @param interest - 兴趣名称
   * @returns Promise with follow status
   */
  /* async followInterest(interest: string) {
    return api.post("/social/interests/follow", { interest })
  }, */
  /**
   * 取消关注特定兴趣
   * @param interest - 兴趣名称
   * @returns Promise with unfollow status
   */
  /* async unfollowInterest(interest: string) {
    return api.delete(`/social/interests/follow/${encodeURIComponent(interest)}`)
  }, */
  /**
   * 获取用户关注的兴趣
   * @returns Promise with followed interests
   */
  /* async getFollowedInterests() {
    return api.get("/social/interests/followed")
  }, */
  // 同城群组相关接口
  /**
   * 获取同城群组列表
   * @param city - 城市名称
   * @param page - 页码
   * @param limit - 每页数量
   * @returns Promise with local groups
   */
  /* async getLocalGroups(city: string, page = 1, limit = 10): Promise<LocalGroup[]> {
    return api.get("/social/local-groups", { params: { city, page, limit } })
  }, */
  /**
   * 获取热门同城群组
   * @param city - 城市名称
   * @param limit - 返回数量
   * @returns Promise with popular local groups
   */
  /* async getPopularLocalGroups(city: string, limit = 6): Promise<LocalGroup[]> {
    return api.get("/social/local-groups/popular", { params: { city, limit } })
  }, */
  /**
   * 搜索同城群组
   * @param keyword - 搜索关键词
   * @param city - 城市名称
   * @param tags - 标签筛选
   * @returns Promise with search results
   */
  /* async searchLocalGroups(keyword: string, city?: string, tags?: string[]): Promise<LocalGroup[]> {
    return api.get("/social/local-groups/search", { params: { keyword, city, tags } })
  }, */
  /**
   * 创建同城群组
   * @param groupData - 群组数据
   * @returns Promise with created group
   */
  /* async createLocalGroup(groupData: {
    name: string
    description: string
    city: string
    tags?: string[]
    image?: File
  }): Promise<LocalGroup> {
    const formData = new FormData()
    Object.entries(groupData).forEach(([key, value]) => {
      if (key === 'tags' && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value))
      } else if (value !== undefined) {
        formData.append(key, value)
      }
    })
    return api.post("/social/local-groups", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }, */
  /**
   * 获取群组详情
   * @param groupId - 群组ID
   * @returns Promise with group details
   */
  /* async getGroupDetails(groupId: string): Promise<LocalGroup> {
    return api.get(`/social/local-groups/${groupId}`)
  }, */
  /**
   * 加入群组
   * @param groupId - 群组ID
   * @param message - 申请消息
   * @returns Promise with join status
   */
  /* async joinGroup(groupId: string, message?: string): Promise<{ status: string, pendingApproval: boolean }> {
    return api.post(`/social/local-groups/${groupId}/join`, { message })
  }, */
  /**
   * 退出群组
   * @param groupId - 群组ID
   * @returns Promise with leave status
   */
  /* async leaveGroup(groupId: string): Promise<{ status: string }> {
    return api.post(`/social/local-groups/${groupId}/leave`)
  }, */
  /**
   * 获取群组成员
   * @param groupId - 群组ID
   * @param role - 成员角色筛选
   * @returns Promise with group members
   */
  /* async getGroupMembers(groupId: string, role?: "owner" | "admin" | "member"): Promise<GroupMember[]> {
    return api.get(`/social/local-groups/${groupId}/members`, { params: { role } })
  }, */
  /**
   * 更新群组成员角色
   * @param groupId - 群组ID
   * @param memberId - 成员ID
   * @param role - 新角色
   * @returns Promise with update status
   */
  /* async updateMemberRole(groupId: string, memberId: string, role: "admin" | "member"): Promise<{ status: string }> {
    return api.put(`/social/local-groups/${groupId}/members/${memberId}`, { role })
  }, */
  /**
   * 移除群组成员
   * @param groupId - 群组ID
   * @param memberId - 成员ID
   * @returns Promise with remove status
   */
  /* async removeMember(groupId: string, memberId: string): Promise<{ status: string }> {
    return api.delete(`/social/local-groups/${groupId}/members/${memberId}`)
  }, */
  /**
   * 获取群组消息
   * @param groupId - 群组ID
   * @param before - 获取此消息ID之前的消息
   * @param limit - 消息数量
   * @returns Promise with group messages
   */
  /* async getGroupMessages(groupId: string, before?: string, limit = 20): Promise<GroupMessage[]> {
    return api.get(`/social/local-groups/${groupId}/messages`, { params: { before, limit } })
  }, */
  /**
   * 发送群组消息
   * @param groupId - 群组ID
   * @param content - 消息内容
   * @param type - 消息类型
   * @param replyTo - 回复消息ID
   * @returns Promise with sent message
   */
  /* async sendGroupMessage(
    groupId: string, 
    content: string, 
    type: "text" | "emoji" = "text", 
    replyTo?: string
  ): Promise<GroupMessage> {
    return api.post(`/social/local-groups/${groupId}/messages`, { content, type, replyTo })
  }, */
  /**
   * 发送群组图片消息
   * @param groupId - 群组ID
   * @param image - 图片文件
   * @param replyTo - 回复消息ID
   * @returns Promise with sent message
   */
  /* async sendGroupImageMessage(groupId: string, image: File, replyTo?: string): Promise<GroupMessage> {
    const formData = new FormData()
    formData.append('image', image)
    if (replyTo) {
      formData.append('replyTo', replyTo)
    }
    return api.post(`/social/local-groups/${groupId}/messages/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }, */
  /**
   * 发送群组文件消息
   * @param groupId - 群组ID
   * @param file - 文件
   * @param replyTo - 回复消息ID
   * @returns Promise with sent message
   */
  /* async sendGroupFileMessage(groupId: string, file: File, replyTo?: string): Promise<GroupMessage> {
    const formData = new FormData()
    formData.append('file', file)
    if (replyTo) {
      formData.append('replyTo', replyTo)
    }
    return api.post(`/social/local-groups/${groupId}/messages/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }, */
  /**
   * 发送群组位置消息
   * @param groupId - 群组ID
   * @param latitude - 纬度
   * @param longitude - 经度
   * @param address - 地址
   * @param replyTo - 回复消息ID
   * @returns Promise with sent message
   */
  /* async sendGroupLocationMessage(
    groupId: string, 
    latitude: number, 
    longitude: number, 
    address?: string, 
    replyTo?: string
  ): Promise<GroupMessage> {
    return api.post(`/social/local-groups/${groupId}/messages/location`, { 
      latitude, 
      longitude, 
      address, 
      replyTo 
    })
  }, */
  /**
   * 获取群组活动
   * @param groupId - 群组ID
   * @param status - 活动状态筛选
   * @returns Promise with group activities
   */
  /* async getGroupActivities(
    groupId: string, 
    status?: "upcoming" | "ongoing" | "completed" | "cancelled"
  ): Promise<GroupActivity[]> {
    return api.get(`/social/local-groups/${groupId}/activities`, { params: { status } })
  }, */
  /**
   * 创建群组活动
   * @param groupId - 群组ID
   * @param activityData - 活动数据
   * @returns Promise with created activity
   */
  /* async createGroupActivity(groupId: string, activityData: {
    title: string
    date: string
    location: string
    maxParticipants?: number
    description?: string
    image?: File
  }): Promise<GroupActivity> {
    const formData = new FormData()
    Object.entries(activityData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value)
      }
    })
    return api.post(`/social/local-groups/${groupId}/activities`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }, */
  /**
   * 参加群组活动
   * @param groupId - 群组ID
   * @param activityId - 活动ID
   * @returns Promise with join status
   */
  /* async joinGroupActivity(groupId: string, activityId: string): Promise<{ status: string }> {
    return api.post(`/social/local-groups/${groupId}/activities/${activityId}/join`)
  }, */
  /**
   * 取消参加群组活动
   * @param groupId - 群组ID
   * @param activityId - 活动ID
   * @returns Promise with cancel status
   */
  /* async cancelGroupActivity(groupId: string, activityId: string): Promise<{ status: string }> {
    return api.post(`/social/local-groups/${groupId}/activities/${activityId}/cancel`)
  }, */
  /**
   * 获取群组活动参与者
   * @param groupId - 群组ID
   * @param activityId - 活动ID
   * @returns Promise with activity attendees
   */
  /* async getActivityAttendees(groupId: string, activityId: string): Promise<GroupMember[]> {
    return api.get(`/social/local-groups/${groupId}/activities/${activityId}/attendees`)
  }, */
  /**
   * 更新群组信息
   * @param groupId - 群组ID
   * @param updateData - 更新数据
   * @returns Promise with updated group
   */
  /* async updateGroupInfo(groupId: string, updateData: {
    name?: string
    description?: string
    tags?: string[]
    image?: File
  }): Promise<LocalGroup> {
    const formData = new FormData()
    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'tags' && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value))
      } else if (value !== undefined) {
        formData.append(key, value)
      }
    })
    return api.put(`/social/local-groups/${groupId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }, */
  /**
   * 获取群组公告
   * @param groupId - 群组ID
   * @returns Promise with group announcements
   */
  /* async getGroupAnnouncements(groupId: string): Promise<{
    id: string
    content: string
    createdAt: string
    createdBy: {
      id: string
      name: string
      avatar: string
    }
  }[]> {
    return api.get(`/social/local-groups/${groupId}/announcements`)
  }, */
  /**
   * 发布群组公告
   * @param groupId - 群组ID
   * @param content - 公告内容
   * @returns Promise with created announcement
   */
  /* async createGroupAnnouncement(groupId: string, content: string): Promise<{
    id: string
    content: string
    createdAt: string
    createdBy: {
      id: string
      name: string
      avatar: string
    }
  }> {
    return api.post(`/social/local-groups/${groupId}/announcements`, { content })
  }, */
  /**
   * 获取群组文件
   * @param groupId - 群组ID
   * @param fileType - 文件类型筛选
   * @returns Promise with group files
   */
  /* async getGroupFiles(groupId: string, fileType?: string): Promise<{
    id: string
    name: string
    size: number
    type: string
    url: string
    uploadedAt: string
    uploadedBy: {
      id: string
      name: string
      avatar: string
    }
  }[]> {
    return api.get(`/social/local-groups/${groupId}/files`, { params: { fileType } })
  }, */
  /**
   * 上传群组文件
   * @param groupId - 群组ID
   * @param file - 文件
   * @returns Promise with uploaded file
   */
  /* async uploadGroupFile(groupId: string, file: File): Promise<{
    id: string
    name: string
    size: number
    type: string
    url: string
    uploadedAt: string
    uploadedBy: {
      id: string
      name: string
      avatar: string
    }
  }> {
    const formData = new FormData()
    formData.append('file', file)
    return api.post(`/social/local-groups/${groupId}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }, */
  /**
   * 获取群组相册
   * @param groupId - 群组ID
   * @returns Promise with group photos
   */
  /* async getGroupPhotos(groupId: string): Promise<{
    id: string
    url: string
    thumbnail: string
    uploadedAt: string
    uploadedBy: {
      id: string
      name: string
      avatar: string
    }
  }[]> {
    return api.get(`/social/local-groups/${groupId}/photos`)
  }, */
  /**
   * 上传群组照片
   * @param groupId - 群组ID
   * @param photo - 照片文件
   * @returns Promise with uploaded photo
   */
  /* async uploadGroupPhoto(groupId: string, photo: File): Promise<{
    id: string
    url: string
    thumbnail: string
    uploadedAt: string
    uploadedBy: {
      id: string
      name: string
      avatar: string
    }
  }> {
    const formData = new FormData()
    formData.append('photo', photo)
    return api.post(`/social/local-groups/${groupId}/photos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }, */
  /**
   * 获取附近的同城群组
   * @param latitude - 纬度
   * @param longitude - 经度
   * @param radius - 半径（公里）
   * @returns Promise with nearby groups
   */
  /* async getNearbyGroups(latitude: number, longitude: number, radius = 5): Promise<LocalGroup[]> {
    return api.get("/social/local-groups/nearby", { params: { latitude, longitude, radius } })
  }, */
  /**
   * 获取用户加入的群组
   * @returns Promise with joined groups
   */
  /* async getJoinedGroups(): Promise<LocalGroup[]> {
    return api.get("/social/local-groups/joined")
  }, */
  /**
   * 获取用户创建的群组
   * @returns Promise with created groups
   */
  /* async getCreatedGroups(): Promise<LocalGroup[]> {
    return api.get("/social/local-groups/created")
  }, */
  /**
   * 获取群组邀请
   * @returns Promise with group invitations
   */
  /* async getGroupInvitations(): Promise<{
    id: string
    group: LocalGroup
    inviter: {
      id: string
      name: string
      avatar: string
    }
    message?: string
    createdAt: string
  }[]> {
    return api.get("/social/local-groups/invitations")
  }, */
  /**
   * 邀请用户加入群组
   * @param groupId - 群组ID
   * @param userId - 用户ID
   * @param message - 邀请消息
   * @returns Promise with invitation status
   */
  /* async inviteToGroup(groupId: string, userId: string, message?: string): Promise<{ status: string }> {
    return api.post(`/social/local-groups/${groupId}/invite`, { userId, message })
  }, */
  /**
   * 接受群组邀请
   * @param invitationId - 邀请ID
   * @returns Promise with accept status
   */
  /* async acceptGroupInvitation(invitationId: string): Promise<{ status: string }> {
    return api.post(`/social/local-groups/invitations/${invitationId}/accept`)
  }, */
  /**
   * 拒绝群组邀请
   * @param invitationId - 邀请ID
   * @returns Promise with reject status
   */
  /* async rejectGroupInvitation(invitationId: string): Promise<{ status: string }> {
    return api.post(`/social/local-groups/invitations/${invitationId}/reject`)
  }, */
  /**
   * 获取群组加入请求
   * @param groupId - 群组ID
   * @returns Promise with join requests
   */
  /* async getGroupJoinRequests(groupId: string): Promise<{
    id: string
    user: {
      id: string
      name: string
      avatar: string
    }
    message?: string
    createdAt: string
  }[]> {
    return api.get(`/social/local-groups/${groupId}/join-requests`)
  }, */
  /**
   * 处理群组加入请求
   * @param groupId - 群组ID
   * @param requestId - 请求ID
   * @param action - 操作（接受/拒绝）
   * @returns Promise with process status
   */
  /* async processJoinRequest(
    groupId: string, 
    requestId: string, 
    action: "accept" | "reject"
  ): Promise<{ status: string }> {
    return api.post(`/social/local-groups/${groupId}/join-requests/${requestId}/${action}`)
  }, */
  /**
   * 获取群组统计信息
   * @param groupId - 群组ID
   * @returns Promise with group statistics
   */
  /* async getGroupStatistics(groupId: string): Promise<{
    memberCount: number
    activeMembers: number
    messageCount: number
    activityCount: number
    photoCount: number
    fileCount: number
  }> {
    return api.get(`/social/local-groups/${groupId}/statistics`)
  }, */
  /**
   * 获取群组推荐
   * @param groupId - 群组ID
   * @returns Promise with recommended groups
   */
  /* async getGroupRecommendations(groupId: string): Promise<LocalGroup[]> {
    return api.get(`/social/local-groups/${groupId}/recommendations`)
  }, */
  /**
   * 举报群组
   * @param groupId - 群组ID
   * @param reason - 举报原因
   * @param description - 详细描述
   * @returns Promise with report status
   */
  /* async reportGroup(groupId: string, reason: string, description?: string): Promise<{ status: string }> {
    return api.post(`/social/local-groups/${groupId}/report`, { reason, description })
  }, */
  /**
   * 举报群组成员
   * @param groupId - 群组ID
   * @param memberId - 成员ID
   * @param reason - 举报原因
   * @param description - 详细描述
   * @returns Promise with report status
   */
  /* async reportGroupMember(
    groupId: string, 
    memberId: string, 
    reason: string, 
    description?: string
  ): Promise<{ status: string }> {
    return api.post(`/social/local-groups/${groupId}/members/${memberId}/report`, { reason, description })
  }, */
  /**
   * 举报群组消息
   * @param groupId - 群组ID
   * @param messageId - 消息ID
   * @param reason - 举报原因
   * @param description - 详细描述
   * @returns Promise with report status
   */
  /* async reportGroupMessage(
    groupId: string, 
    messageId: string, 
    reason: string, 
    description?: string
  ): Promise<{ status: string }> {
    return api.post(`/social/local-groups/${groupId}/messages/${messageId}/report`, { reason, description })
  }, */
  /**
   * 获取群组分类
   * @returns Promise with group categories
   */
  /* async getGroupCategories(): Promise<{
    id: string
    name: string
    icon?: string
    count: number
  }[]> {
    return api.get("/social/local-groups/categories")
  }, */
  /**
   * 按分类获取群组
   * @param categoryId - 分类ID
   * @param page - 页码
   * @param limit - 每页数量
   * @returns Promise with groups by category
   */
  /* async getGroupsByCategory(categoryId: string, page = 1, limit = 10): Promise<LocalGroup[]> {
    return api.get(`/social/local-groups/categories/${categoryId}`, { params: { page, limit } })
  }, */
  // 好友相关接口
  /**
   * 获取好友列表
   * @returns Promise with friends list
   */
  /* async getFriends(): Promise<Friend[]> {
    return api.get("/social/friends")
  }, */
  /**
   * 获取好友详情
   * @param friendId - 好友ID
   * @returns Promise with friend details
   */
  /* async getFriendDetail(friendId: string): Promise<Friend> {
    return api.get(`/social/friends/${friendId}`)
  }, */
  /**
   * 添加好友
   * @param userId - 用户ID
   * @param message - 附加消息
   * @returns Promise with request status
   */
  /* async addFriend(userId: string, message?: string): Promise<{ status: string, requestId: string }> {
    return api.post("/social/friends/add", { userId, message })
  }, */
  /**
   * 删除好友
   * @param friendId - 好友ID
   * @returns Promise with deletion status
   */
  /* async deleteFriend(friendId: string): Promise<{ status: string }> {
    return api.delete(`/social/friends/${friendId}`)
  }, */
  /**
   * 获取好友请求列表
   * @param type - 请求类型（发送/接收）
   * @returns Promise with friend requests
   */
  /* async getFriendRequests(type: "sent" | "received" = "received"): Promise<FriendRequest[]> {
    return api.get("/social/friend-requests", { params: { type } })
  }, */
  /**
   * 处理好友请求
   * @param requestId - 请求ID
   * @param action - 操作（接受/拒绝）
   * @returns Promise with process status
   */
  /* async processFriendRequest(requestId: string, action: "accept" | "reject"): Promise<{ status: string }> {
    return api.post(`/social/friend-requests/${requestId}/${action}`)
  }, */
  /**
   * 取消好友请求
   * @param requestId - 请求ID
   * @returns Promise with cancel status
   */
  /* async cancelFriendRequest(requestId: string): Promise<{ status: string }> {
    return api.post(`/social/friend-requests/${requestId}/cancel`)
  }, */
  /**
   * 搜索用户
   * @param keyword - 搜索关键词
   * @returns Promise with search results
   */
  /* async searchUsers(keyword: string): Promise<{
    id: string
    name: string
    avatar?: string
    bio?: string
    isFriend: boolean
  }[]> {
    return api.get("/social/users/search", { params: { keyword } })
  }, */
  /**
   * 获取好友分组列表
   * @returns Promise with friend groups
   */
  /* async getFriendGroups(): Promise<FriendGroup[]> {
    return api.get("/social/friend-groups")
  }, */
  /**
   * 创建好友分组
   * @param name - 分组名称
   * @returns Promise with created group
   */
  /* async createFriendGroup(name: string): Promise<FriendGroup> {
    return api.post("/social/friend-groups", { name })
  }, */
  /**
   * 更新好友分组
   * @param groupId - 分组ID
   * @param name - 新名称
   * @returns Promise with updated group
   */
  /* async updateFriendGroup(groupId: string, name: string): Promise<FriendGroup> {
    return api.put(`/social/friend-groups/${groupId}`, { name })
  }, */
  /**
   * 删除好友分组
   * @param groupId - 分组ID
   * @returns Promise with deletion status
   */
  /* async deleteFriendGroup(groupId: string): Promise<{ status: string }> {
    return api.delete(`/social/friend-groups/${groupId}`)
  }, */
  /**
   * 将好友添加到分组
   * @param groupId - 分组ID
   * @param friendIds - 好友ID数组
   * @returns Promise with addition status
   */
  /* async addFriendsToGroup(groupId: string, friendIds: string[]): Promise<{ status: string }> {
    return api.post(`/social/friend-groups/${groupId}/add-friends`, { friendIds })
  }, */
  /**
   * 从分组中移除好友
   * @param groupId - 分组ID
   * @param friendIds - 好友ID数组
   * @returns Promise with removal status
   */
  /* async removeFriendsFromGroup(groupId: string, friendIds: string[]): Promise<{ status: string }> {
    return api.post(`/social/friend-groups/${groupId}/remove-friends`, { friendIds })
  }, */
  /**
   * 获取聊天会话列表
   * @returns Promise with chat sessions
   */
  /* async getChatSessions(): Promise<ChatSession[]> {
    return api.get("/social/chats")
  }, */
  /**
   * 获取聊天消息
   * @param sessionId - 会话ID
   * @param before - 获取此消息ID之前的消息
   * @param limit - 消息数量
   * @returns Promise with chat messages
   */
  /* async getChatMessages(sessionId: string, before?: string, limit = 20): Promise<ChatMessage[]> {
    return api.get(`/social/chats/${sessionId}/messages`, { params: { before, limit } })
  }, */
  /**
   * 发送聊天消息
   * @param sessionId - 会话ID
   * @param content - 消息内容
   * @param type - 消息类型
   * @param replyTo - 回复消息ID
   * @returns Promise with sent message
   */
  /* async sendChatMessage(
    sessionId: string,
    content: string,
    type: "text" | "emoji" = "text",
    replyTo?: string
  ): Promise<ChatMessage> {
    return api.post(`/social/chats/${sessionId}/messages`, { content, type, replyTo })
  }, */
  /**
   * 发送图片消息
   * @param sessionId - 会话ID
   * @param image - 图片文件
   * @param replyTo - 回复消息ID
   * @returns Promise with sent message
   */
  /* async sendImageMessage(sessionId: string, image: File, replyTo?: string): Promise<ChatMessage> {
    const formData = new FormData()
    formData.append('image', image)
    if (replyTo) {
      formData.append('replyTo', replyTo)
    }
    return api.post(`/social/chats/${sessionId}/messages/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }, */
  /**
   * 发送语音消息
   * @param sessionId - 会话ID
   * @param voice - 语音文件
   * @param duration - 语音时长（秒）
   * @param replyTo - 回复消息ID
   * @returns Promise with sent message
   */
  /* async sendVoiceMessage(sessionId: string, voice: File, duration: number, replyTo?: string): Promise<ChatMessage> {
    const formData = new FormData()
    formData.append('voice', voice)
    formData.append('duration', duration.toString())
    if (replyTo) {
      formData.append('replyTo', replyTo)
    }
    return api.post(`/social/chats/${sessionId}/messages/voice`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }, */
  /**
   * 发送位置消息
   * @param sessionId - 会话ID
   * @param latitude - 纬度
   * @param longitude - 经度
   * @param address - 地址
   * @param replyTo - 回复消息ID
   * @returns Promise with sent message
   */
  /* async sendLocationMessage(
    sessionId: string,
    latitude: number,
    longitude: number,
    address?: string,
    replyTo?: string
  ): Promise<ChatMessage> {
    return api.post(`/social/chats/${sessionId}/messages/location`, {
      latitude,
      longitude,
      address,
      replyTo
    })
  }, */
  /**
   * 标记消息为已读
   * @param sessionId - 会话ID
   * @param messageId - 消息ID
   * @returns Promise with read status
   */
  /* async markMessageAsRead(sessionId: string, messageId: string): Promise<{ status: string }> {
    return api.post(`/social/chats/${sessionId}/messages/${messageId}/read`)
  }, */
  /**
   * 标记会话所有消息为已读
   * @param sessionId - 会话ID
   * @returns Promise with read status
   */
  /* async markSessionAsRead(sessionId: string): Promise<{ status: string }> {
    return api.post(`/social/chats/${sessionId}/read`)
  }, */
  /**
   * 创建聊天会话
   * @param userIds - 用户ID数组
   * @returns Promise with created session
   */
  /* async createChatSession(userIds: string[]): Promise<ChatSession> {
    return api.post("/social/chats", { userIds })
  }, */
  /**
   * 置顶/取消置顶聊天会话
   * @param sessionId - 会话ID
   * @param isPinned - 是否置顶
   * @returns Promise with pin status
   */
  /* async pinChatSession(sessionId: string, isPinned: boolean): Promise<{ status: string }> {
    return api.put(`/social/chats/${sessionId}/pin`, { isPinned })
  }, */
  /**
   * 静音/取消静音聊天会话
   * @param sessionId - 会话ID
   * @param isMuted - 是否静音
   * @returns Promise with mute status
   */
  /* async muteChatSession(sessionId: string, isMuted: boolean): Promise<{ status: string }> {
    return api.put(`/social/chats/${sessionId}/mute`, { isMuted })
  }, */
  /**
   * 删除聊天会话
   * @param sessionId - 会话ID
   * @returns Promise with deletion status
   */
  /* async deleteChatSession(sessionId: string): Promise<{ status: string }> {
    return api.delete(`/social/chats/${sessionId}`)
  }, */
  /**
   * 删除聊天消息
   * @param sessionId - 会话ID
   * @param messageId - 消息ID
   * @returns Promise with deletion status
   */
  /* async deleteChatMessage(sessionId: string, messageId: string): Promise<{ status: string }> {
    return api.delete(`/social/chats/${sessionId}/messages/${messageId}`)
  }, */
  /**
   * 获取好友在线状态
   * @param friendIds - 好友ID数组
   * @returns Promise with online status
   */
  /* async getFriendsOnlineStatus(friendIds: string[]): Promise<Record<string, "online" | "offline" | "away">> {
    return api.post("/social/friends/online-status", { friendIds })
  }, */
  /**
   * 设置好友备注
   * @param friendId - 好友ID
   * @param notes - 备注内容
   * @returns Promise with update status
   */
  /* async setFriendNotes(friendId: string, notes: string): Promise<{ status: string }> {
    return api.put(`/social/friends/${friendId}/notes`, { notes })
  }, */
  /**
   * 设置好友关系类型
   * @param friendId - 好友ID
   * @param relationship - 关系类型
   * @returns Promise with update status
   */
  /* async setFriendRelationship(
    friendId: string,
    relationship: "friend" | "close" | "acquaintance"
  ): Promise<{ status: string }> {
    return api.put(`/social/friends/${friendId}/relationship`, { relationship })
  }, */
  /**
   * 设置好友为星标/取消星标
   * @param friendId - 好友ID
   * @param isFavorite - 是否星标
   * @returns Promise with update status
   */
  /* async setFriendFavorite(friendId: string, isFavorite: boolean): Promise<{ status: string }> {
    return api.put(`/social/friends/${friendId}/favorite`, { isFavorite })
  }, */
  /**
   * 获取共同好友
   * @param userId - 用户ID
   * @returns Promise with common friends
   */
  /* async getCommonFriends(userId: string): Promise<Friend[]> {
    return api.get(`/social/common-friends/${userId}`)
  }, */
  /**
   * 获取好友推荐
   * @returns Promise with recommended friends
   */
  /* async getFriendRecommendations(): Promise<{
    id: string
    name: string
    avatar?: string
    bio?: string
    mutualFriends: number
    mutualInterests?: string[]
    reason?: string
  }[]> {
    return api.get("/social/friend-recommendations")
  }, */
  /**
   * 举报用户
   * @param userId - 用户ID
   * @param reason - 举报原因
   * @param description - 详细描述
   * @returns Promise with report status
   */
  /* async reportUser(userId: string, reason: string, description?: string): Promise<{ status: string }> {
    return api.post(`/social/users/${userId}/report`, { reason, description })
  }, */
  /**
   * 屏蔽用户
   * @param userId - 用户ID
   * @returns Promise with block status
   */
  /* async blockUser(userId: string): Promise<{ status: string }> {
    return api.post(`/social/users/${userId}/block`)
  }, */
  /**
   * 取消屏蔽用户
   * @param userId - 用户ID
   * @returns Promise with unblock status
   */
  /* async unblockUser(userId: string): Promise<{ status: string }> {
    return api.post(`/social/users/${userId}/unblock`)
  }, */
  /**
   * 获取屏蔽用户列表
   * @returns Promise with blocked users
   */
  /* async getBlockedUsers(): Promise<{
    id: string
    name: string
    avatar?: string
    blockedAt: string
  }[]> {
    return api.get("/social/blocked-users")
  }, */
}

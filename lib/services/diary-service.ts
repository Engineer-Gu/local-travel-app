export interface DiaryEntry {
  id: string
  title: string
  date: string
  location: string
  content: string
  images: string[]
  likes: number
  comments: number
  isPublic: boolean
  author?: {
    id: string
    name: string
    avatar?: string
  }
  tags?: string[]
  weather?: string
  mood?: string
  companions?: number
  routeId?: string
  itineraryId?: string
  createdAt?: string
  updatedAt?: string
  liked?: boolean
}

export interface DiaryComment {
  id: string
  diaryId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  createdAt: string
  likes: number
  replies?: DiaryComment[]
}

export interface DiaryFilter {
  isPublic?: boolean
  searchText?: string
  dateRange?: [string, string]
  location?: string
  tags?: string[]
  sortBy?: "date" | "likes" | "comments"
  sortOrder?: "asc" | "desc"
  authorId?: string
}

export const diaryService = {
  /**
   * 获取日记列表
   * @param filter - 筛选条件
   * @returns Promise with diary entries
   */
  /* async getDiaries(filter?: DiaryFilter): Promise<DiaryEntry[]> {
    return api.get("/diaries", { params: filter })
  }, */
  /**
   * 获取日记详情
   * @param diaryId - 日记ID
   * @returns Promise with diary details
   */
  /* async getDiaryDetail(diaryId: string): Promise<DiaryEntry> {
    return api.get(`/diaries/${diaryId}`)
  }, */
  /**
   * 创建新日记
   * @param diary - 日记信息
   * @returns Promise with created diary
   */
  /* async createDiary(diary: Partial<DiaryEntry>): Promise<DiaryEntry> {
    return api.post("/diaries", diary)
  }, */
  /**
   * 更新日记
   * @param diaryId - 日记ID
   * @param diary - 更新的日记信息
   * @returns Promise with updated diary
   */
  /* async updateDiary(diaryId: string, diary: Partial<DiaryEntry>): Promise<DiaryEntry> {
    return api.put(`/diaries/${diaryId}`, diary)
  }, */
  /**
   * 删除日记
   * @param diaryId - 日记ID
   * @returns Promise with deletion status
   */
  /* async deleteDiary(diaryId: string) {
    return api.delete(`/diaries/${diaryId}`)
  }, */
  /**
   * 点赞日记
   * @param diaryId - 日记ID
   * @returns Promise with like status
   */
  /* async likeDiary(diaryId: string) {
    return api.post(`/diaries/${diaryId}/like`)
  }, */
  /**
   * 取消点赞日记
   * @param diaryId - 日记ID
   * @returns Promise with unlike status
   */
  /* async unlikeDiary(diaryId: string) {
    return api.delete(`/diaries/${diaryId}/like`)
  }, */
  /**
   * 检查日记是否已点赞
   * @param diaryId - 日记ID
   * @returns Promise with like status
   */
  /* async checkLikeStatus(diaryId: string): Promise<boolean> {
    return api.get(`/diaries/${diaryId}/like/check`)
  }, */
  /**
   * 获取日记评论
   * @param diaryId - 日记ID
   * @returns Promise with diary comments
   */
  /* async getDiaryComments(diaryId: string): Promise<DiaryComment[]> {
    return api.get(`/diaries/${diaryId}/comments`)
  }, */
  /**
   * 添加日记评论
   * @param diaryId - 日记ID
   * @param content - 评论内容
   * @returns Promise with added comment
   */
  /* async addDiaryComment(diaryId: string, content: string): Promise<DiaryComment> {
    return api.post(`/diaries/${diaryId}/comments`, { content })
  }, */
  /**
   * 删除日记评论
   * @param diaryId - 日记ID
   * @param commentId - 评论ID
   * @returns Promise with deletion status
   */
  /* async deleteDiaryComment(diaryId: string, commentId: string) {
    return api.delete(`/diaries/${diaryId}/comments/${commentId}`)
  }, */
  /**
   * 上传日记图片
   * @param diaryId - 日记ID
   * @param formData - 包含图片文件的FormData
   * @returns Promise with image URL
   */
  /* async uploadDiaryImage(diaryId: string, formData: FormData) {
    return api.upload(`/diaries/${diaryId}/images`, formData)
  }, */
  /**
   * 删除日记图片
   * @param diaryId - 日记ID
   * @param imageUrl - 图片URL
   * @returns Promise with deletion status
   */
  /* async deleteDiaryImage(diaryId: string, imageUrl: string) {
    return api.delete(`/diaries/${diaryId}/images`, { params: { url: imageUrl } })
  }, */
  /**
   * 分享日记
   * @param diaryId - 日记ID
   * @param platform - 分享平台
   * @returns Promise with share status
   */
  /* async shareDiary(diaryId: string, platform: string) {
    return api.post(`/diaries/${diaryId}/share`, { platform })
  }, */
  /**
   * 获取我的日记
   * @param filter - 筛选条件
   * @returns Promise with my diaries
   */
  /* async getMyDiaries(filter?: DiaryFilter): Promise<DiaryEntry[]> {
    return api.get("/diaries/my", { params: filter })
  }, */
  /**
   * 获取发现页面的日记
   * @param limit - 返回结果数量限制
   * @returns Promise with discover diaries
   */
  /* async getDiscoverDiaries(limit = 10): Promise<DiaryEntry[]> {
    return api.get("/diaries/discover", { params: { limit } })
  }, */
  /**
   * 获取关注用户的日记
   * @param limit - 返回结果数量限制
   * @returns Promise with following diaries
   */
  /* async getFollowingDiaries(limit = 10): Promise<DiaryEntry[]> {
    return api.get("/diaries/following", { params: { limit } })
  }, */
  /**
   * 获取热门日记
   * @param limit - 返回结果数量限制
   * @returns Promise with popular diaries
   */
  /* async getPopularDiaries(limit = 10): Promise<DiaryEntry[]> {
    return api.get("/diaries/popular", { params: { limit } })
  }, */
  /**
   * 获取附近的日记
   * @param lat - 纬度
   * @param lng - 经度
   * @param radius - 半径（公里）
   * @param limit - 返回结果数量限制
   * @returns Promise with nearby diaries
   */
  /* async getNearbyDiaries(lat: number, lng: number, radius = 5, limit = 10): Promise<DiaryEntry[]> {
    return api.get("/diaries/nearby", { params: { lat, lng, radius, limit } })
  }, */
  /**
   * 从行程创建日记
   * @param itineraryId - 行程ID
   * @returns Promise with created diary
   */
  /* async createDiaryFromItinerary(itineraryId: string): Promise<DiaryEntry> {
    return api.post("/diaries/from-itinerary", { itineraryId })
  }, */
  /**
   * AI生成日记内容
   * @param prompt - 提示信息
   * @param images - 图片URL数组
   * @returns Promise with generated content
   */
  /* async generateDiaryContent(prompt: string, images?: string[]) {
    return api.post("/diaries/generate-content", { prompt, images })
  }, */
}

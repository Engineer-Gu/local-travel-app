// 商品接口
export interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  sold: number
  category: string
  description: string
  specifications: ProductSpecification[]
  images: string[]
  stock: number
  isNew?: boolean
  isHot?: boolean
  discount?: number
  tags?: string[]
  brandId?: string
  brandName?: string
}

// 商品规格接口
export interface ProductSpecification {
  name: string
  value: string
}

// 商品评价接口
export interface ProductReview {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  content: string
  images?: string[]
  createdAt: string
  likes: number
  reply?: string
  replyAt?: string
  tags?: string[]
}

// 购物车项接口
export interface CartItem {
  id: string
  productId: string
  name: string
  image: string
  price: number
  originalPrice: number
  quantity: number
  selected: boolean
  specifications?: string[]
  stock: number
}

// 优惠券接口
export interface Coupon {
  id: string
  code: string
  name: string
  type: "amount" | "percentage"
  value: number
  minSpend: number
  maxDiscount?: number
  startDate: string
  endDate: string
  isUsed: boolean
  isExpired: boolean
  categoryIds?: string[]
  productIds?: string[]
}

// 订单接口
export interface Order {
  id: string
  orderNumber: string
  userId: string
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled" | "refunded"
  items: OrderItem[]
  totalAmount: number
  discountAmount: number
  paymentAmount: number
  paymentMethod: string
  address?: Address
  couponId?: string
  createdAt: string
  paidAt?: string
  shippedAt?: string
  deliveredAt?: string
  cancelledAt?: string
  refundedAt?: string
  note?: string
  trackingNumber?: string
  logisticsCompany?: string
}

// 订单项接口
export interface OrderItem {
  id: string
  productId: string
  name: string
  image: string
  price: number
  originalPrice: number
  quantity: number
  specifications?: string[]
  subtotal: number
}

// 地址接口
export interface Address {
  id: string
  userId: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
  postalCode?: string
}

// 商品分类接口
export interface ProductCategory {
  id: string
  name: string
  icon?: string
  parentId?: string
  level: number
  sort: number
  children?: ProductCategory[]
}

// 品牌接口
export interface Brand {
  id: string
  name: string
  logo: string
  description?: string
}

// 订单筛选接口
export interface OrderFilter {
  status?: "pending" | "paid" | "shipped" | "delivered" | "cancelled" | "refunded" | "all"
  startDate?: string
  endDate?: string
  keyword?: string
  page?: number
  pageSize?: number
  sortBy?: "date" | "amount"
  sortOrder?: "asc" | "desc"
}

// 订单退款申请接口
export interface RefundRequest {
  orderId: string
  reason: string
  description?: string
  images?: string[]
  refundAmount: number
  contactPhone?: string
  refundMethod?: string
}

// 订单物流信息接口
export interface LogisticsInfo {
  trackingNumber: string
  logisticsCompany: string
  status: string
  details: {
    time: string
    description: string
    location?: string
  }[]
  estimatedDelivery?: string
  senderInfo?: {
    name: string
    phone: string
    address: string
  }
  receiverInfo?: {
    name: string
    phone: string
    address: string
  }
}

// 商城服务类
export class ShopService {
  // ==================== 商品相关接口 ====================
  /**
   * 获取商品列表
   * @param params 查询参数
   */
  // static async getProducts(params?: {
  //   page?: number
  //   pageSize?: number
  //   category?: string
  //   keyword?: string
  //   sort?: "price_asc" | "price_desc" | "rating" | "sales"
  //   minPrice?: number
  //   maxPrice?: number
  //   brandIds?: string[]
  //   tags?: string[]
  // }) {
  //   return api.get("/products", { params })
  // }
  /**
   * 获取商品详情
   * @param id 商品ID
   */
  // static async getProductById(id: string) {
  //   return api.get(`/products/${id}`)
  // }
  /**
   * 获取商品评价
   * @param productId 商品ID
   * @param params 查询参数
   */
  // static async getProductReviews(
  //   productId: string,
  //   params?: {
  //     page?: number
  //     pageSize?: number
  //     rating?: number
  //     hasImage?: boolean
  //     sort?: "time_desc" | "time_asc" | "rating_desc" | "rating_asc"
  //   }
  // ) {
  //   return api.get(`/products/${productId}/reviews`, { params })
  // }
  /**
   * 提交商品评价
   * @param productId 商品ID
   * @param data 评价数据
   */
  // static async submitProductReview(
  //   productId: string,
  //   data: {
  //     orderId: string
  //     rating: number
  //     content: string
  //     images?: string[]
  //     tags?: string[]
  //   }
  // ) {
  //   return api.post(`/products/${productId}/reviews`, data)
  // }
  /**
   * 获取热门商品
   * @param limit 数量限制
   */
  // static async getHotProducts(limit: number = 10) {
  //   return api.get("/products/hot", { params: { limit } })
  // }
  /**
   * 获取新品
   * @param limit 数量限制
   */
  // static async getNewProducts(limit: number = 10) {
  //   return api.get("/products/new", { params: { limit } })
  // }
  /**
   * 获取推荐商品
   * @param limit 数量限制
   */
  // static async getRecommendedProducts(limit: number = 10) {
  //   return api.get("/products/recommended", { params: { limit } })
  // }
  /**
   * 获取相关商品
   * @param productId 商品ID
   * @param limit 数量限制
   */
  // static async getRelatedProducts(productId: string, limit: number = 10) {
  //   return api.get(`/products/${productId}/related`, { params: { limit } })
  // }
  /**
   * 搜索商品
   * @param keyword 关键词
   * @param params 查询参数
   */
  // static async searchProducts(
  //   keyword: string,
  //   params?: {
  //     page?: number
  //     pageSize?: number
  //     category?: string
  //     sort?: "price_asc" | "price_desc" | "rating" | "sales"
  //     minPrice?: number
  //     maxPrice?: number
  //     brandIds?: string[]
  //     tags?: string[]
  //   }
  // ) {
  //   return api.get("/products/search", { params: { keyword, ...params } })
  // }
  /**
   * 获取商品分类
   */
  // static async getProductCategories() {
  //   return api.get("/product-categories")
  // }
  /**
   * 获取品牌列表
   */
  // static async getBrands() {
  //   return api.get("/brands")
  // }
  /**
   * 收藏商品
   * @param productId 商品ID
   */
  // static async favoriteProduct(productId: string) {
  //   return api.post(`/products/${productId}/favorite`)
  // }
  /**
   * 取消收藏商品
   * @param productId 商品ID
   */
  // static async unfavoriteProduct(productId: string) {
  //   return api.delete(`/products/${productId}/favorite`)
  // }
  /**
   * 检查商品是否已收藏
   * @param productId 商品ID
   */
  // static async checkProductFavorite(productId: string) {
  //   return api.get(`/products/${productId}/favorite`)
  // }
  /**
   * 获取收藏的商品列表
   */
  // static async getFavoriteProducts() {
  //   return api.get("/user/favorite-products")
  // }
  // ==================== 购物车相关接口 ====================
  /**
   * 获取购物车列表
   */
  // static async getCartItems() {
  //   return api.get("/cart")
  // }
  /**
   * 添加商品到购物车
   * @param data 购物车数据
   */
  // static async addToCart(data: {
  //   productId: string
  //   quantity: number
  //   specifications?: string[]
  // }) {
  //   return api.post("/cart", data)
  // }
  /**
   * 更新购物车商品数量
   * @param itemId 购物车项ID
   * @param quantity 数量
   */
  // static async updateCartItemQuantity(itemId: string, quantity: number) {
  //   return api.put(`/cart/${itemId}`, { quantity })
  // }
  /**
   * 更新购物车商品选中状态
   * @param itemId 购物车项ID
   * @param selected 是否选中
   */
  // static async updateCartItemSelection(itemId: string, selected: boolean) {
  //   return api.put(`/cart/${itemId}/selection`, { selected })
  // }
  /**
   * 删除购物车商品
   * @param itemId 购物车项ID
   */
  // static async removeCartItem(itemId: string) {
  //   return api.delete(`/cart/${itemId}`)
  // }
  /**
   * 清空购物车
   */
  // static async clearCart() {
  //   return api.delete("/cart")
  // }
  /**
   * 选择/取消选择所有购物车商品
   * @param selected 是否选中
   */
  // static async selectAllCartItems(selected: boolean) {
  //   return api.put("/cart/selection", { selected })
  // }
  // ==================== 优惠券相关接口 ====================
  /**
   * 获取用户优惠券列表
   * @param status 优惠券状态
   */
  // static async getCoupons(status?: "unused" | "used" | "expired") {
  //   return api.get("/coupons", { params: { status } })
  // }
  /**
   * 领取优惠券
   * @param couponId 优惠券ID
   */
  // static async claimCoupon(couponId: string) {
  //   return api.post(`/coupons/${couponId}/claim`)
  // }
  /**
   * 使用优惠码领取优惠券
   * @param code 优惠码
   */
  // static async claimCouponByCode(code: string) {
  //   return api.post("/coupons/claim-by-code", { code })
  // }
  /**
   * 获取可用优惠券
   * @param params 查询参数
   */
  // static async getAvailableCoupons(params: {
  //   totalAmount: number
  //   productIds?: string[]
  //   categoryIds?: string[]
  // }) {
  //   return api.get("/coupons/available", { params })
  // }
  // ==================== 订单相关接口 ====================
  /**
   * 创建订单
   * @param data 订单数据
   */
  // static async createOrder(data: {
  //   cartItemIds?: string[]
  //   products?: { productId: string; quantity: number; specifications?: string[] }[]
  //   addressId: string
  //   couponId?: string
  //   note?: string
  //   paymentMethod: string
  // }) {
  //   return api.post("/orders", data)
  // }
  /**
   * 获取订单列表
   * @param params 查询参数
   */
  // static async getOrders(params?: OrderFilter) {
  //   return api.get("/orders", { params })
  // }
  /**
   * 获取订单详情
   * @param orderId 订单ID
   */
  // static async getOrderById(orderId: string) {
  //   return api.get(`/orders/${orderId}`)
  // }
  /**
   * 取消订单
   * @param orderId 订单ID
   * @param reason 取消原因
   */
  // static async cancelOrder(orderId: string, reason: string) {
  //   return api.post(`/orders/${orderId}/cancel`, { reason })
  // }
  /**
   * 确认收货
   * @param orderId 订单ID
   */
  // static async confirmReceipt(orderId: string) {
  //   return api.post(`/orders/${orderId}/confirm-receipt`)
  // }
  /**
   * 申请退款
   * @param orderId 订单ID
   * @param data 退款数据
   */
  // static async applyRefund(orderId: string, data: RefundRequest) {
  //   return api.post(`/orders/${orderId}/refund`, data)
  // }
  /**
   * 获取物流信息
   * @param orderId 订单ID
   */
  // static async getOrderTracking(orderId: string): Promise<LogisticsInfo> {
  //   return api.get(`/orders/${orderId}/tracking`)
  // }
  /**
   * 删除订单（仅针对已完成或已取消的订单）
   * @param orderId 订单ID
   */
  // static async deleteOrder(orderId: string) {
  //   return api.delete(`/orders/${orderId}`)
  // }
  /**
   * 获取订单统计信息
   */
  // static async getOrderStats() {
  //   return api.get("/orders/stats")
  // }
  /**
   * 获取待评价订单列表
   */
  // static async getPendingReviewOrders() {
  //   return api.get("/orders/pending-review")
  // }
  /**
   * 获取退款订单列表
   */
  // static async getRefundOrders() {
  //   return api.get("/orders/refund")
  // }
  /**
   * 取消退款申请
   * @param orderId 订单ID
   */
  // static async cancelRefund(orderId: string) {
  //   return api.post(`/orders/${orderId}/cancel-refund`)
  // }
  /**
   * 获取退款详情
   * @param orderId 订单ID
   */
  // static async getRefundDetail(orderId: string) {
  //   return api.get(`/orders/${orderId}/refund`)
  // }
  /**
   * 提醒发货
   * @param orderId 订单ID
   */
  // static async remindShipment(orderId: string) {
  //   return api.post(`/orders/${orderId}/remind-shipment`)
  // }
  /**
   * 延长收货时间
   * @param orderId 订单ID
   * @param days 延长天数
   */
  // static async extendReceiptTime(orderId: string, days: number) {
  //   return api.post(`/orders/${orderId}/extend-receipt`, { days })
  // }
  // ==================== 支付相关接口 ====================
  /**
   * 获取支付方式
   */
  // static async getPaymentMethods() {
  //   return api.get("/payment-methods")
  // }
  /**
   * 支付订单
   * @param orderId 订单ID
   * @param paymentMethod 支付方式
   */
  // static async payOrder(orderId: string, paymentMethod: string) {
  //   return api.post(`/orders/${orderId}/pay`, { paymentMethod })
  // }
  /**
   * 获取支付状态
   * @param orderId 订单ID
   */
  // static async getPaymentStatus(orderId: string) {
  //   return api.get(`/orders/${orderId}/payment-status`)
  // }
  // ==================== 地址相关接口 ====================
  /**
   * 获取用户地址列表
   */
  // static async getAddresses() {
  //   return api.get("/addresses")
  // }
  /**
   * 添加地址
   * @param data 地址数据
   */
  // static async addAddress(data: {
  //   name: string
  //   phone: string
  //   province: string
  //   city: string
  //   district: string
  //   detail: string
  //   isDefault?: boolean
  //   postalCode?: string
  // }) {
  //   return api.post("/addresses", data)
  // }
  /**
   * 更新地址
   * @param addressId 地址ID
   * @param data 地址数据
   */
  // static async updateAddress(
  //   addressId: string,
  //   data: {
  //     name?: string
  //     phone?: string
  //     province?: string
  //     city?: string
  //     district?: string
  //     detail?: string
  //     isDefault?: boolean
  //     postalCode?: string
  //   }
  // ) {
  //   return api.put(`/addresses/${addressId}`, data)
  // }
  /**
   * 删除地址
   * @param addressId 地址ID
   */
  // static async deleteAddress(addressId: string) {
  //   return api.delete(`/addresses/${addressId}`)
  // }
  /**
   * 设置默认地址
   * @param addressId 地址ID
   */
  // static async setDefaultAddress(addressId: string) {
  //   return api.put(`/addresses/${addressId}/default`)
  // }
  // ==================== 其他接口 ====================
  /**
   * 获取商城首页数据
   */
  // static async getShopHomeData() {
  //   return api.get("/shop/home")
  // }
  /**
   * 获取商城活动列表
   */
  // static async getShopActivities() {
  //   return api.get("/shop/activities")
  // }
  /**
   * 获取商城活动详情
   * @param activityId 活动ID
   */
  // static async getShopActivityById(activityId: string) {
  //   return api.get(`/shop/activities/${activityId}`)
  // }
  /**
   * 获取商城公告列表
   */
  // static async getShopAnnouncements() {
  //   return api.get("/shop/announcements")
  // }
  /**
   * 获取商城公告详情
   * @param announcementId 公告ID
   */
  // static async getShopAnnouncementById(announcementId: string) {
  //   return api.get(`/shop/announcements/${announcementId}`)
  // }
  /**
   * 获取商城统计数据
   */
  // static async getShopStats() {
  //   return api.get("/shop/stats")
  // }
  /**
   * 获取商城设置
   */
  // static async getShopSettings() {
  //   return api.get("/shop/settings")
  // }
  /**
   * 提交商城反馈
   * @param data 反馈数据
   */
  // static async submitShopFeedback(data: {
  //   type: "suggestion" | "complaint" | "other"
  //   content: string
  //   images?: string[]
  //   contactInfo?: string
  // }) {
  //   return api.post("/shop/feedback", data)
  // }
}

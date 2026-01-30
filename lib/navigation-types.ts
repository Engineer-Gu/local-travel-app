import { RouteProps, ProductProps } from "./types"

export type ScreenParams = {
    home: undefined
    planning: { initialStep?: number; returnFromAIGuide?: boolean; step?: number }
    social: { searchQuery?: string; activity?: string }
    guides: undefined
    shop: undefined
    profile: { userId?: string }
    "route-detail": { route?: RouteProps }
    tickets: undefined
    favorites: undefined
    routes: undefined
    friends: undefined
    itineraries: undefined
    wallet: undefined
    notifications: undefined
    settings: undefined
    checkin: undefined
    chat: { friend?: any }
    "friend-request": undefined
    "guide-consult": { guide?: any }
    "guide-booking": { guide?: any }
    "product-detail": { product?: ProductProps }
    login: undefined
    register: undefined
    map: { location?: any }
    payment: { items: any[]; totalAmount: number; orderType?: string }
    "theme-settings": undefined
    "interest-settings": undefined
    "group-detail": { group?: any }
    "edit-profile": undefined
    "account-security": undefined
    "notification-settings": undefined
    "vip-membership": undefined
    "wallet-recharge": undefined
    "wallet-withdraw": undefined
    "wallet-transfer": undefined
    "user-agreement": undefined
    "privacy-policy": undefined
    "shopping-cart": undefined
    orders: undefined
    "travel-diary": undefined
    "diary-detail": { diaryId?: string }
    "edit-diary": { diary?: any }
    "visited-cities": undefined
    "completed-routes": undefined
    badges: undefined
    // 新增的智能化功能
    "ai-voice-guide": { location?: any }
    "ar-navigation": { destination?: any }
    "travel-stories": undefined
    "short-videos": undefined
    "emergency-help": undefined
    "ai-photo-diary": undefined
    "transaction-detail": any
    "coupon-detail": any
    "story-detail": { story?: any }
}

export type Screen = keyof ScreenParams

export type NavigationProps = {
    screen: Screen
    params?: any
}

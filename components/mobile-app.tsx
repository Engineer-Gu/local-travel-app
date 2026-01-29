"use client"

import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { isNative, getSafeAreaInsets } from "@/lib/platform"
import { statusBarService, splashScreenService, appService } from "@/lib/mobile-services"
import { Home } from "@/components/screens/home"
import { Planning } from "@/components/screens/planning"
import { Social } from "@/components/screens/social"
import { Guides } from "@/components/screens/guides"
import { Profile } from "@/components/screens/profile"
import { Shop } from "@/components/screens/shop"
import { BottomNavigation } from "@/components/bottom-navigation"
import { RouteDetail } from "@/components/screens/route-detail"
import { Tickets } from "@/components/screens/tickets"
import { Favorites } from "@/components/screens/profile/favorites"
import { Routes } from "@/components/screens/profile/routes"
import { Friends } from "@/components/screens/profile/friends"
import { Itineraries } from "@/components/screens/profile/itineraries"
import { Wallet } from "@/components/screens/profile/wallet"
import { Notifications } from "@/components/screens/profile/notifications"
import { Settings } from "@/components/screens/profile/settings"
import { Checkin } from "@/components/screens/checkin"
import { Chat } from "@/components/screens/social/chat"
import { FriendRequest } from "@/components/screens/social/friend-request"
import { GuideConsult } from "@/components/screens/guides/guide-consult"
import { GuideBooking } from "@/components/screens/guides/guide-booking"
import { ProductDetail } from "@/components/screens/shop/product-detail"
import { Login } from "@/components/screens/auth/login"
import { Register } from "@/components/screens/auth/register"
import { MapView } from "@/components/screens/map/map-view"
import { PaymentPage } from "@/components/screens/payment/payment-page"
import { ThemeSettings } from "@/components/screens/settings/theme-settings"
import { InterestSettings } from "@/components/screens/social/interest-settings"
import { GroupDetail } from "@/components/screens/social/group-detail"
import { EditProfile } from "@/components/screens/profile/edit-profile"
import { AccountSecurity } from "@/components/screens/settings/account-security"
import { NotificationSettings } from "@/components/screens/settings/notification-settings"
import { VipMembership } from "@/components/screens/profile/vip-membership"
import { WalletRecharge } from "@/components/screens/wallet/wallet-recharge"
import { WalletWithdraw } from "@/components/screens/wallet/wallet-withdraw"
import { WalletTransfer } from "@/components/screens/wallet/wallet-transfer"
import { UserAgreement } from "@/components/screens/settings/user-agreement"
import { PrivacyPolicy } from "@/components/screens/settings/privacy-policy"
import { ShoppingCart } from "@/components/screens/shopping-cart"
import { Orders } from "@/components/screens/profile/orders"
import { TravelDiary } from "@/components/screens/travel-diary"
import { DiaryDetail } from "@/components/screens/diary-detail"
import { EditDiary } from "@/components/screens/edit-diary"
import { VisitedCities } from "@/components/screens/profile/visited-cities"
import { CompletedRoutes } from "@/components/screens/profile/completed-routes"
import { Badges } from "@/components/screens/profile/badges"
// 新增的智能化功能
import { AIVoiceGuide } from "@/components/screens/ai-voice-guide"
import { ARNavigation } from "@/components/screens/ar-navigation"
import { TravelStories } from "@/components/screens/social/travel-stories"
import { ShortVideos } from "@/components/screens/social/short-videos"
import { EmergencyHelp } from "@/components/screens/emergency-help"
import { AIPhotoDiary } from "@/components/screens/ai-photo-diary"
import { TransactionDetail } from "@/components/screens/wallet/transaction-detail"
import { CouponDetail } from "@/components/screens/wallet/coupon-detail"

import { Screen, ScreenParams, NavigationProps } from "@/lib/navigation-types"
export type { Screen, NavigationProps }

export function MobileApp() {
  const [navigationStack, setNavigationStack] = useState<NavigationProps[]>([{ screen: "home" }])
  const [screenParams, setScreenParams] = useState<Record<string, any> | undefined>({})
  const [safeAreaInsets, setSafeAreaInsets] = useState({ top: 0, bottom: 0 })
  const isMobile = useIsMobile()
  const currentNavigation = navigationStack[navigationStack.length - 1]

  // 初始化移动端适配
  useEffect(() => {
    const initMobile = async () => {
      if (isNative()) {
        // 设置状态栏样式
        await statusBarService.setStyle('dark');

        // 隐藏启动屏
        setTimeout(async () => {
          await splashScreenService.hide();
        }, 1000);

        // 设置安全区域
        setSafeAreaInsets(getSafeAreaInsets());

        // 监听返回按钮 (Android)
        appService.onBackButton(() => {
          if (navigationStack.length > 1) {
            goBack();
          }
        });
      }
    };

    initMobile();
  }, []);

  // 监听应用状态变化
  useEffect(() => {
    if (isNative()) {
      appService.onAppStateChange((isActive) => {
        console.log('App state changed:', isActive);
      });
    }
  }, []);

  // 监听认证失效事件
  useEffect(() => {
    const handleAuthUnauthorized = () => {
      console.log("收到认证失效事件，跳转登录页")
      navigate("login")
    }

    if (typeof window !== "undefined") {
      window.addEventListener("auth:unauthorized", handleAuthUnauthorized)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("auth:unauthorized", handleAuthUnauthorized)
      }
    }
  }, [navigationStack]) // 依赖项包含navigationStack以确保navigate函数是最新的

  const navigateTyped = <T extends Screen>(screen: T, params?: ScreenParams[T]) => {
    // 如果是从AI导游返回到规划页面，并且有step参数
    if (screen === "planning" && params && "returnFromAIGuide" in params && "step" in params) {
      setNavigationStack([...navigationStack, { screen, params: { ...params, initialStep: params.step } } as NavigationProps])
    } else {
      // 正常导航逻辑
      setNavigationStack([...navigationStack, { screen, params } as NavigationProps])
    }
  }

  const navigate = navigateTyped as any

  const goBack = () => {
    if (navigationStack.length > 1) {
      setNavigationStack(navigationStack.slice(0, -1))
    }
  }

  const navigateToTab = (screen: Screen) => {
    setNavigationStack([{ screen }])
  }

  const renderScreen = () => {
    const { screen, params } = currentNavigation

    switch (screen) {
      case "home":
        return <Home navigate={navigate} />
      case "planning":
        return <Planning navigate={navigate} goBack={goBack} initialStep={params?.initialStep} />
      case "social":
        return <Social navigate={navigate} />
      case "guides":
        return <Guides navigate={navigate} />
      case "shop":
        return <Shop navigate={navigate} />
      case "profile":
        return <Profile navigate={navigate} />
      case "route-detail":
        return <RouteDetail route={params?.route} goBack={goBack} navigate={navigate} />
      case "tickets":
        return <Tickets goBack={goBack} navigate={navigate} />
      case "favorites":
        return <Favorites goBack={goBack} navigate={navigate} />
      case "routes":
        return <Routes goBack={goBack} navigate={navigate} />
      case "friends":
        return <Friends goBack={goBack} navigate={navigate} />
      case "itineraries":
        return <Itineraries goBack={goBack} />
      case "wallet":
        return <Wallet goBack={goBack} navigate={navigate} />
      case "notifications":
        return <Notifications goBack={goBack} />
      case "settings":
        return <Settings goBack={goBack} navigate={navigate} />
      case "checkin":
        return <Checkin goBack={goBack} navigate={navigate} />
      case "chat":
        return <Chat friend={params?.friend} goBack={goBack} />
      case "friend-request":
        return <FriendRequest goBack={goBack} />
      case "guide-consult":
        return <GuideConsult guide={params?.guide} goBack={goBack} />
      case "guide-booking":
        return <GuideBooking guide={params?.guide} goBack={goBack} />
      case "product-detail":
        return <ProductDetail product={params?.product} goBack={goBack} navigate={navigate} />
      case "login":
        return <Login navigate={navigate} goBack={goBack} />
      case "register":
        return <Register navigate={navigate} goBack={goBack} />
      case "map":
        return <MapView goBack={goBack} location={params?.location} />
      case "payment":
        return (
          <PaymentPage
            goBack={goBack}
            items={params?.items || []}
            totalAmount={params?.totalAmount || 0}
            orderType={params?.orderType || "product"}
          />
        )
      case "theme-settings":
        return <ThemeSettings goBack={goBack} />
      case "interest-settings":
        return <InterestSettings goBack={goBack} />
      case "group-detail":
        return <GroupDetail goBack={goBack} group={params?.group} />
      case "edit-profile":
        return <EditProfile goBack={goBack} />
      case "account-security":
        return <AccountSecurity goBack={goBack} />
      case "notification-settings":
        return <NotificationSettings goBack={goBack} />
      case "vip-membership":
        return <VipMembership goBack={goBack} />
      case "wallet-recharge":
        return <WalletRecharge goBack={goBack} />
      case "wallet-withdraw":
        return <WalletWithdraw goBack={goBack} />
      case "wallet-transfer":
        return <WalletTransfer goBack={goBack} />
      case "user-agreement":
        return <UserAgreement goBack={goBack} />
      case "privacy-policy":
        return <PrivacyPolicy goBack={goBack} />
      case "shopping-cart":
        return <ShoppingCart goBack={goBack} navigate={navigate} />
      case "orders":
        return <Orders goBack={goBack} navigate={navigate} />
      case "travel-diary":
        return <TravelDiary goBack={goBack} navigate={navigate} />
      case "diary-detail":
        return <DiaryDetail goBack={goBack} navigate={navigate} diaryId={params?.diaryId} />
      case "edit-diary":
        return <EditDiary goBack={goBack} navigate={navigate} diary={params?.diary} />
      case "visited-cities":
        return <VisitedCities goBack={goBack} navigate={navigate} />
      case "completed-routes":
        return <CompletedRoutes goBack={goBack} navigate={navigate} />
      case "badges":
        return <Badges goBack={goBack} />
      // 新增的智能化功能
      case "ai-voice-guide":
        return <AIVoiceGuide goBack={goBack} navigate={navigate} location={params?.location} />
      case "ar-navigation":
        return <ARNavigation goBack={goBack} navigate={navigate} destination={params?.destination} />
      case "travel-stories":
        return <TravelStories goBack={goBack} navigate={navigate} />
      case "short-videos":
        return <ShortVideos goBack={goBack} navigate={navigate} />
      case "emergency-help":
        return <EmergencyHelp goBack={goBack} navigate={navigate} />
      case "ai-photo-diary":
        return <AIPhotoDiary goBack={goBack} navigate={navigate} />
      case "transaction-detail":
        return <TransactionDetail goBack={goBack} params={params} />
      case "coupon-detail":
        return <CouponDetail goBack={goBack} params={params} />
      default:
        return <Home navigate={navigate} />
    }
  }

  // Only show bottom navigation on main tabs
  const isMainTab = ["home", "planning", "social", "guides", "shop", "profile"].includes(currentNavigation.screen)

  // 基于移动端检测决定容器样式
  const containerClass = isNative()
    ? "fixed inset-0 w-screen h-screen bg-white dark:bg-gray-900 flex flex-col overflow-hidden"
    : isMobile
      ? "w-full h-screen bg-white dark:bg-gray-900 flex flex-col overflow-hidden"
      : "relative w-full max-w-sm mx-auto h-[700px] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col overflow-hidden"

  return (
    <div className={containerClass}>
      <div className="flex-1 overflow-y-auto dark:text-gray-100">
        {renderScreen()}
      </div>
      {isMainTab && (
        <BottomNavigation
          currentScreen={currentNavigation.screen as "home" | "planning" | "social" | "guides" | "shop" | "profile"}
          onChangeScreen={navigateToTab}
        />
      )}
    </div>
  )
}

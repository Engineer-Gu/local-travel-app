import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.travel.app',
  appName: '随行伴',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      backgroundColor: "#3b82f6",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#3b82f6",
      androidOverlaysWebView: true
    },
    Keyboard: {
      resize: "none",
      style: "dark",
      resizeOnFullScreen: false
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    App: {
      windowSoftInputMode: "adjustNothing"
    }
  }
};

export default config;
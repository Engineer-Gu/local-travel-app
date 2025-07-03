import { isNative } from './platform';

// 状态栏管理
export const statusBarService = {
  async setStyle(style: 'light' | 'dark') {
    if (isNative()) {
      const { StatusBar, Style } = await import('@capacitor/status-bar');
      await StatusBar.setStyle({
        style: style === 'dark' ? Style.Dark : Style.Light
      });
    }
  },
  
  async hide() {
    if (isNative()) {
      const { StatusBar } = await import('@capacitor/status-bar');
      await StatusBar.hide();
    }
  },
  
  async show() {
    if (isNative()) {
      const { StatusBar } = await import('@capacitor/status-bar');
      await StatusBar.show();
    }
  }
};

// 闪屏管理
export const splashScreenService = {
  async hide() {
    if (isNative()) {
      const { SplashScreen } = await import('@capacitor/splash-screen');
      await SplashScreen.hide();
    }
  }
};

// 相机服务
export const cameraService = {
  async takePhoto() {
    if (isNative()) {
      const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera');
      try {
        const photo = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera
        });
        return photo.dataUrl;
      } catch (error) {
        console.error('Camera error:', error);
        return null;
      }
    }
    // Web fallback
    return null;
  },
  
  async pickImage() {
    if (isNative()) {
      const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera');
      try {
        const photo = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Photos
        });
        return photo.dataUrl;
      } catch (error) {
        console.error('Camera error:', error);
        return null;
      }
    }
    // Web fallback
    return null;
  }
};

// 地理位置服务
export const geolocationService = {
  async getCurrentPosition() {
    if (isNative()) {
      const { Geolocation } = await import('@capacitor/geolocation');
      try {
        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000
        });
        return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
      } catch (error) {
        console.error('Geolocation error:', error);
        return null;
      }
    }
    // Web fallback
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          }),
          reject,
          { enableHighAccuracy: true, timeout: 10000 }
        );
      });
    }
    return null;
  },
  
  async requestPermissions() {
    if (isNative()) {
      const { Geolocation } = await import('@capacitor/geolocation');
      try {
        const permission = await Geolocation.requestPermissions();
        return permission.location === 'granted';
      } catch (error) {
        console.error('Permission error:', error);
        return false;
      }
    }
    return true; // Web 通常在调用时请求权限
  }
};

// 振动服务
export const hapticService = {
  async impact(style: 'light' | 'medium' | 'heavy' = 'medium') {
    if (isNative()) {
      const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
      const impactStyle = style === 'light' ? ImpactStyle.Light : 
                         style === 'heavy' ? ImpactStyle.Heavy : ImpactStyle.Medium;
      await Haptics.impact({ style: impactStyle });
    }
  },
  
  async vibrate(duration: number = 100) {
    if (isNative()) {
      const { Haptics } = await import('@capacitor/haptics');
      await Haptics.vibrate({ duration });
    } else if (navigator.vibrate) {
      navigator.vibrate(duration);
    }
  }
};

// 应用状态服务
export const appService = {
  async minimize() {
    if (isNative()) {
      const { App } = await import('@capacitor/app');
      await App.minimizeApp();
    }
  },
  
  onAppStateChange(callback: (isActive: boolean) => void) {
    if (isNative()) {
      import('@capacitor/app').then(({ App }) => {
        App.addListener('appStateChange', ({ isActive }) => {
          callback(isActive);
        });
      });
    }
  },
  
  onBackButton(callback: () => void) {
    if (isNative()) {
      import('@capacitor/app').then(({ App }) => {
        App.addListener('backButton', callback);
      });
    }
  }
};
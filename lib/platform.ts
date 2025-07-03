import { Capacitor } from '@capacitor/core';

export const isNative = () => Capacitor.isNativePlatform();
export const isWeb = () => !Capacitor.isNativePlatform();
export const platform = () => Capacitor.getPlatform();
export const isIOS = () => Capacitor.getPlatform() === 'ios';
export const isAndroid = () => Capacitor.getPlatform() === 'android';

// 设备信息
export const getDeviceInfo = async () => {
  if (isNative()) {
    const { Device } = await import('@capacitor/device');
    return await Device.getInfo();
  }
  return null;
};

// 安全区域处理
export const getSafeAreaInsets = () => {
  if (isNative()) {
    // 尝试从CSS环境变量获取安全区域
    if (typeof window !== 'undefined') {
      const computedStyle = window.getComputedStyle(document.documentElement);
      const safeAreaTop = computedStyle.getPropertyValue('env(safe-area-inset-top)') || 
                         computedStyle.getPropertyValue('constant(safe-area-inset-top)');
      const safeAreaBottom = computedStyle.getPropertyValue('env(safe-area-inset-bottom)') || 
                             computedStyle.getPropertyValue('constant(safe-area-inset-bottom)');
      
      if (safeAreaTop && safeAreaBottom) {
        return {
          top: parseInt(safeAreaTop.replace('px', '')) || 0,
          bottom: parseInt(safeAreaBottom.replace('px', '')) || 0,
        };
      }
    }
    
    // 回退到默认值
    if (isIOS()) {
      return {
        top: 44, // iOS 状态栏
        bottom: 34, // iPhone X 系列底部安全区
      };
    } else {
      return {
        top: 24, // Android 状态栏
        bottom: 0, // Android 通常没有底部安全区
      };
    }
  }
  
  return {
    top: 0,
    bottom: 0,
  };
};
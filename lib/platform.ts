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
  if (isIOS()) {
    return {
      top: 44, // 通常的状态栏高度
      bottom: 34, // iPhone X 系列的底部安全区
    };
  }
  return {
    top: 24, // Android 状态栏
    bottom: 0,
  };
};
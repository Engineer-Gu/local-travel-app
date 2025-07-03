# 移动应用构建指南

## 概述

本项目已配置为使用 Capacitor 将 Next.js Web 应用转换为原生 iOS 和 Android 应用。

## 快速开始

### 1. 构建 Web 应用
```bash
npm run build
```

### 2. 初始化 Capacitor（首次运行）
```bash
npx cap init "Local Travel App" "com.travel.app" --web-dir=out
```

### 3. 添加平台
```bash
# 添加 iOS 平台
npx cap add ios

# 添加 Android 平台  
npx cap add android
```

### 4. 同步代码到原生平台
```bash
npx cap sync
```

### 5. 运行应用

#### 在模拟器/设备上运行
```bash
# iOS (需要 macOS 和 Xcode)
npm run cap:ios

# Android (需要 Android Studio)
npm run cap:android

# Web 预览
npm run cap:serve
```

#### 在 IDE 中打开
```bash
# 在 Xcode 中打开 iOS 项目
npx cap open ios

# 在 Android Studio 中打开 Android 项目
npx cap open android
```

## 项目结构

```
local-travel-app/
├── capacitor.config.ts          # Capacitor 配置
├── next.config.mjs              # Next.js 配置（静态导出）
├── lib/
│   ├── platform.ts              # 平台检测工具
│   └── mobile-services.ts       # 移动端服务封装
├── ios/                         # iOS 原生项目（生成后）
├── android/                     # Android 原生项目（生成后）
├── out/                         # 构建输出目录
└── scripts/
    └── build-mobile.sh          # 一键构建脚本
```

## 移动端功能

### 已集成的原生功能

1. **相机和相册**
   - 拍照功能
   - 相册选择
   - 用于 AI 照片日记功能

2. **地理位置**
   - GPS 定位
   - 位置权限管理
   - 用于 AR 导航功能

3. **设备特性**
   - 状态栏样式控制
   - 启动屏管理
   - 振动反馈
   - 应用状态监听

4. **平台适配**
   - 安全区域处理
   - 原生返回按钮支持
   - 响应式布局

### 权限配置

应用需要的权限在构建时会自动配置：

#### iOS (Info.plist)
- NSCameraUsageDescription - 相机权限
- NSPhotoLibraryUsageDescription - 相册权限  
- NSLocationWhenInUseUsageDescription - 定位权限

#### Android (AndroidManifest.xml)
- CAMERA - 相机权限
- READ_EXTERNAL_STORAGE - 读取存储权限
- ACCESS_FINE_LOCATION - 精确定位权限
- ACCESS_COARSE_LOCATION - 粗略定位权限

## 构建产品版本

### iOS App Store
```bash
# 1. 构建并同步
npm run cap:build

# 2. 在 Xcode 中配置签名和证书
npx cap open ios

# 3. 在 Xcode 中选择 Product -> Archive
# 4. 上传到 App Store Connect
```

### Android Play Store
```bash
# 1. 构建并同步
npm run cap:build

# 2. 在 Android Studio 中构建 AAB
npx cap open android

# 3. Build -> Generate Signed Bundle/APK
# 4. 上传到 Google Play Console
```

## 开发提示

### 调试
- 使用 Safari 开发者工具调试 iOS 应用
- 使用 Chrome DevTools 调试 Android 应用
- 原生日志在各自的 IDE 中查看

### 热重载
开发时可以使用 live reload：
```bash
# 启动开发服务器并同步到设备
npx cap run ios --livereload
npx cap run android --livereload
```

### 自定义原生代码
- iOS 原生代码在 `ios/` 目录
- Android 原生代码在 `android/` 目录
- 修改后需要重新同步：`npx cap sync`

## 常见问题

### 构建失败
1. 确保已安装所有依赖：`npm install`
2. 清理并重新构建：`rm -rf out && npm run build`
3. 重新同步：`npx cap sync`

### 权限问题
1. 检查 `capacitor.config.ts` 中的权限配置
2. 在设备设置中手动授权
3. 重新安装应用

### 性能优化
1. 启用代码分割和懒加载
2. 优化图片资源
3. 使用 Capacitor 的原生存储
4. 避免过度的动画和渲染

## 版本更新

更新应用时的步骤：
1. 更新代码
2. `npm run build`
3. `npx cap sync`
4. 在原生 IDE 中重新构建
5. 发布到应用商店
# 构建说明

## 立即构建移动应用

现在你可以按照以下步骤构建 iOS 和 Android 应用：

### 第一步：构建 Web 应用
```bash
cd /mnt/d/project/local-travel-app-master/local-travel-app
npm run build
```

### 第二步：初始化 Capacitor（仅首次需要）
```bash
npx cap init "Local Travel App" "com.travel.app" --web-dir=out
```

### 第三步：添加移动平台
```bash
# 添加 iOS 平台（需要 macOS）
npx cap add ios

# 添加 Android 平台
npx cap add android
```

### 第四步：同步代码到原生平台
```bash
npx cap sync
```

### 第五步：生成应用

#### 生成 iOS 应用（需要 macOS + Xcode）
```bash
# 方式1：直接运行到模拟器
npm run cap:ios

# 方式2：在 Xcode 中打开进行更多配置
npx cap open ios
```

#### 生成 Android 应用（需要 Android Studio）
```bash
# 方式1：直接运行到模拟器/设备
npm run cap:android

# 方式2：在 Android Studio 中打开进行更多配置
npx cap open android
```

## 一键构建脚本

我已经为你创建了一个自动化构建脚本：

```bash
# 运行自动化构建脚本
chmod +x scripts/build-mobile.sh
./scripts/build-mobile.sh
```

## 已经完成的改造

✅ **配置修改**
- `next.config.mjs`: 配置静态导出
- `package.json`: 添加 Capacitor 依赖和构建脚本
- `capacitor.config.ts`: Capacitor 配置文件

✅ **移动端服务集成**
- `lib/platform.ts`: 平台检测工具
- `lib/mobile-services.ts`: 原生功能封装（相机、定位、振动等）

✅ **UI 适配**
- `components/mobile-app.tsx`: 移动端 UI 适配和安全区域处理
- `components/screens/ai-photo-diary.tsx`: 原生相机功能集成
- `components/screens/ar-navigation.tsx`: 地理位置服务集成

✅ **功能特性**
- 相机拍照和相册选择
- GPS 定位和导航
- 状态栏控制和启动屏
- 振动反馈
- 原生返回按钮支持
- 响应式安全区域适配

## 生产部署

### iOS App Store 发布
1. 在 Xcode 中配置开发者账号和证书
2. 设置 App ID 和描述文件
3. Archive 并上传到 App Store Connect
4. 提交审核

### Android Play Store 发布
1. 在 Android Studio 中生成签名的 APK/AAB
2. 在 Google Play Console 中创建应用
3. 上传 APK/AAB 文件
4. 提交审核

你现在可以开始构建移动应用了！
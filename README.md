# 🌟 Local Travel App - 本地旅游应用

<div align="center">

![旅游应用](https://img.shields.io/badge/Travel-App-blue?style=for-the-badge&logo=map&logoColor=white)
![Android](https://img.shields.io/badge/Android-Ready-green?style=for-the-badge&logo=android&logoColor=white)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)

**智能规划您的旅行路线，匹配志同道合的玩伴，享受专业导游服务**

[📱 下载 APK](#-下载安装) • [🚀 功能特性](#-功能特性) • [🛠️ 技术栈](#️-技术栈) • [📖 文档](#-文档)

</div>

## 🚀 功能特性

### 🧠 智能化功能
- **🗣️ AI 语音导游** - 智能语音讲解景点历史文化
- **📸 AI 照片日记** - 上传照片，AI 自动生成旅行日记
- **🧭 AR 导航** - 增强现实导航，实时路线指引
- **🆘 紧急求助** - 旅行中的紧急情况快速求助

### 🗺️ 规划与导航
- **智能路线规划** - AI 推荐最优旅行路线
- **实时导航** - GPS 定位 + AR 增强现实
- **热门景点推荐** - 基于位置的个性化推荐
- **路线优化** - 考虑交通、时间、成本的最优规划

### 👥 社交互动
- **玩伴匹配** - 寻找志同道合的旅行伙伴
- **旅行故事圈** - 分享您的旅行体验和照片
- **短视频分享** - 记录和分享旅行精彩瞬间
- **实时聊天** - 与朋友和导游实时沟通

### 🎯 专业服务
- **专业导游预约** - 本地专业导游服务
- **导游咨询** - 实时咨询旅行问题
- **导游评价** - 真实用户评价系统

### 🛒 便民服务
- **门票预订** - 景点门票特惠预订
- **旅游商城** - 旅行用品一站式购买
- **优惠券** - 各种旅游优惠和折扣
- **会员服务** - VIP 专享服务和特权

## 📱 下载安装

### 🤖 Android 应用

#### 方式一：GitHub Actions 自动构建（推荐）
1. 访问 [Actions 页面](https://github.com/Engineer-Gu/local-travel-app/actions)
2. 选择最新的成功构建
3. 下载 `local-travel-app-debug` Artifact
4. 解压得到 `app-debug.apk` 文件

#### 方式二：手动构建
```bash
# 克隆仓库
git clone https://github.com/Engineer-Gu/local-travel-app.git
cd local-travel-app

# 安装依赖
npm install --legacy-peer-deps

# 构建应用
npm run build
npx cap sync android

# 构建 APK（需要 Android Studio）
npx cap open android
```

### 📲 安装步骤
1. **启用未知来源安装**
   - Android: 设置 → 安全 → 允许未知来源
   - 或: 设置 → 应用 → 特殊访问权限 → 安装未知应用

2. **安装应用**
   - 将 APK 文件传输到手机
   - 点击 APK 文件进行安装
   - 按照提示完成安装

3. **权限设置**
   - 允许相机权限（AI 照片功能）
   - 允许位置权限（导航功能）
   - 允许存储权限（文件操作）

## 🛠️ 技术栈

### 前端技术
- **框架**: Next.js 15 + React 19
- **语言**: TypeScript 5
- **样式**: Tailwind CSS + Radix UI
- **状态管理**: React Hooks
- **路由**: 自定义导航栈

### 移动端技术
- **跨平台**: Capacitor 6
- **原生功能**: 相机、GPS、振动、推送
- **构建工具**: Android Gradle Plugin
- **目标平台**: Android 5.1+ (API 22)

### 后端集成
- **API 调用**: Axios
- **数据处理**: JSON
- **图片处理**: 原生相机 API
- **地图服务**: 原生地理位置 API

### 开发工具
- **构建**: GitHub Actions
- **容器化**: Docker
- **包管理**: npm
- **代码规范**: ESLint + TypeScript

## 📁 项目结构

```
local-travel-app/
├── 📱 android/                 # Android 原生项目
├── 🌐 components/             # React 组件
│   ├── screens/              # 页面组件
│   └── ui/                   # UI 组件库
├── 🔧 lib/                   # 工具库
│   ├── mobile-services.ts    # 移动端服务
│   ├── platform.ts          # 平台检测
│   └── services/            # 业务服务
├── 🎨 styles/               # 样式文件
├── 📋 .github/              # GitHub Actions
└── 📖 docs/                 # 文档
```

## 🎯 核心功能演示

### 🗺️ 智能规划
```typescript
// 智能路线规划
const planRoute = async (preferences: UserPreferences) => {
  const optimizedRoute = await aiPlanningService.optimize({
    interests: preferences.interests,
    budget: preferences.budget,
    timeConstraints: preferences.time,
    location: await getCurrentLocation()
  });
  return optimizedRoute;
};
```

### 📷 AI 照片日记
```typescript
// AI 照片分析和日记生成
const generateDiary = async (photos: Photo[]) => {
  const analysis = await aiPhotoService.analyze(photos);
  const diary = await aiTextService.generateDiary({
    photos: analysis,
    location: getCurrentLocation(),
    time: new Date()
  });
  return diary;
};
```

### 🧭 AR 导航
```typescript
// AR 导航功能
const startARNavigation = async (destination: Location) => {
  const userLocation = await geolocationService.getCurrentPosition();
  const navigationData = await arNavigationService.start({
    from: userLocation,
    to: destination,
    mode: 'walking'
  });
  return navigationData;
};
```

## 📖 文档

- [📋 构建指南](APK-BUILD-GUIDE.md) - 详细的 APK 构建说明
- [🚀 部署文档](BUILD-INSTRUCTIONS.md) - 快速部署指南
- [📱 移动端开发](MOBILE-BUILD-GUIDE.md) - 移动端开发指南
- [🔧 GitHub 推送](GITHUB-PUSH.md) - Git 操作说明

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 这个仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Capacitor](https://capacitorjs.com/) - 跨平台移动开发
- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Radix UI](https://www.radix-ui.com/) - 高质量 React 组件

---

<div align="center">

**🌟 如果这个项目对你有帮助，请给一个 Star！**

Made with ❤️ by [Engineer-Gu](https://github.com/Engineer-Gu)

</div>
# Android APK 构建指南

由于当前环境没有 Android SDK，以下是几种构建 APK 的方法：

## 🚀 方案一：GitHub Actions 自动构建（推荐）

### 步骤：
1. **推送到 GitHub**：
   ```bash
   git init
   git add .
   git commit -m "Initial commit with Android support"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **自动构建**：
   - GitHub Actions 会自动触发构建
   - 约 10-15 分钟后完成
   - 在仓库的 Actions 页面下载 APK

3. **手动触发**：
   - 进入 GitHub 仓库的 Actions 页面
   - 选择 "Build Android APK" workflow
   - 点击 "Run workflow"

## 🐳 方案二：Docker 构建

### 前提条件：
- 安装 Docker

### 构建命令：
```bash
# 构建 Docker 镜像
docker build -f Dockerfile.android -t travel-app-android .

# 运行容器并提取 APK
docker run --name travel-build travel-app-android
docker cp travel-build:/app/output/local-travel-app.apk ./
docker rm travel-build
```

## 💻 方案三：本地 Android Studio

### 安装 Android Studio：
1. 下载：https://developer.android.com/studio
2. 安装 Android SDK (API 34)
3. 配置环境变量

### 构建步骤：
```bash
# 在项目根目录
npm run build
npx cap sync android
npx cap open android

# 在 Android Studio 中
# Build -> Build Bundle(s) / APK(s) -> Build APK(s)
```

## ☁️ 方案四：在线构建服务

### AppCenter (Microsoft) - 免费
1. 访问：https://appcenter.ms
2. 创建账号并新建应用
3. 连接 GitHub 仓库
4. 配置构建脚本：
   ```yaml
   scripts:
     pre-build: npm install --legacy-peer-deps
     build: npm run build && npx cap sync android
   ```

### Bitrise - 免费层
1. 访问：https://bitrise.io
2. 导入 GitHub 项目
3. 使用 Android 工作流模板

### CodeMagic - 免费层
1. 访问：https://codemagic.io
2. 连接仓库并配置构建

## 📱 APK 安装指南

### Android 手机安装：
1. **启用未知来源**：
   - 设置 → 安全 → 未知来源 (开启)
   - 或：设置 → 应用和通知 → 特殊应用访问 → 安装未知应用

2. **安装 APK**：
   - 下载 APK 文件到手机
   - 用文件管理器打开 APK
   - 点击安装

3. **授权权限**：
   - 相机权限（AI 照片功能）
   - 位置权限（导航功能）
   - 存储权限（文件操作）

## 🔧 故障排除

### 构建失败常见问题：

1. **Gradle 下载超时**：
   - 使用国内镜像或 VPN
   - 增加超时时间

2. **内存不足**：
   - 增加 JVM 堆内存：`-Xmx4g`

3. **SDK 版本问题**：
   - 确保使用 Android API 34
   - 更新 Gradle 版本

4. **权限问题**：
   - 检查 AndroidManifest.xml
   - 添加必要的权限声明

## 📋 项目配置摘要

- **应用 ID**: com.travel.app
- **应用名称**: Local Travel App
- **最小 SDK**: API 22 (Android 5.1)
- **目标 SDK**: API 34 (Android 14)
- **权限**: 相机、位置、网络、存储

## 🎯 推荐流程

1. **首选**：使用 GitHub Actions（完全免费，自动化）
2. **备选**：本地 Android Studio（需要下载 SDK）
3. **应急**：在线构建服务（有免费额度限制）

构建成功后，你将得到一个约 20-30MB 的 APK 文件，可以在任何 Android 设备上安装运行！
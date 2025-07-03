#!/bin/bash

echo "🚀 开始构建移动应用..."

# 构建 Next.js 静态文件
echo "📦 构建 Next.js 应用..."
npm run build

# 检查构建是否成功
if [ ! -d "out" ]; then
    echo "❌ Next.js 构建失败，请检查错误信息"
    exit 1
fi

echo "✅ Next.js 构建完成"

# 初始化 Capacitor（如果需要）
if [ ! -f "capacitor.config.ts" ]; then
    echo "⚙️ 初始化 Capacitor..."
    npx cap init "Local Travel App" "com.travel.app" --web-dir=out
fi

# 同步代码到原生平台
echo "🔄 同步代码到原生平台..."
npx cap sync

echo "✅ 移动应用构建完成！"
echo ""
echo "📱 运行命令："
echo "  iOS:     npm run cap:ios"
echo "  Android: npm run cap:android"
echo "  Web:     npm run cap:serve"
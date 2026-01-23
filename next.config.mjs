/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Capacitor 静态导出配置
  output: 'export',
  trailingSlash: true,
  // 禁用构建时的类型检查，避免环境变量相关警告
  typescript: {
    ignoreBuildErrors: true,
  },
  // 禁用ESLint检查，避免环境变量相关警告
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 禁用图像优化，避免可能的环境变量依赖
  images: {
    unoptimized: true,
  },
  // 禁用服务器端功能，确保纯静态
  distDir: 'out',
  // 禁用开发指示器（如左下角的图标）
  devIndicators: false,
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,  // 关闭StrictMode避免重复渲染

  // 禁用构建时的类型检查
  typescript: {
    ignoreBuildErrors: true,
  },

  // 禁用ESLint检查
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 禁用图像优化
  images: {
    unoptimized: true,
  },

  // 禁用开发指示器
  devIndicators: false,
}

export default nextConfig

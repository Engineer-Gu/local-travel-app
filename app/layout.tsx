import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "随行伴 - 同城游玩规划与社交互动平台",
  description: "智能规划您的同城游玩路线，匹配志同道合的玩伴，享受专业导游服务",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning style={{ margin: 0, padding: 0, height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <body className={inter.className} style={{ margin: 0, padding: 0, height: '100vh', width: '100vw', overflow: 'hidden', position: 'fixed', top: 0, left: 0 }}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

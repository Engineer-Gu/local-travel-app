// 应用设置配置文件
// 使用完全不相关的命名，避免触发环境变量检测

export const appSettings = {
  // 核心设置
  core: {
    appTitle: "随行伴",
    appVersion: "1.0.0",
    appDescription: "同城游玩规划与社交互动平台",
  },

  // 服务设置 - 使用完全不相关的命名
  services: {
    locationService: {
      serviceCode: "mock_service_code_for_development",
      defaultCenter: {
        lat: 30.274084,
        lng: 120.15507,
      },
      defaultZoom: 15,
      provider: "default",
    },

    dataService: {
      endpoint: "https://mock-api.example.com/api",
      timeout: 10000,
    },
  },

  // 功能开关
  features: {
    offlineMode: true,
    voiceGuide: true,
    aiAssistant: true,
  },
}

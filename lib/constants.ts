/**
 * 应用常量配置
 */
export const APP_CONSTANTS = {
  /**
   * API基础URL
   * 优先使用环境变量NEXT_PUBLIC_API_URL
   * 默认使用localhost:8080，确保本地开发和不同环境都能正常访问
   */
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',

  /**
   * API请求超时时间（毫秒）
   */
  API_TIMEOUT: 10000,

  /**
   * Token存储key
   */
  TOKEN_KEY: 'token',

  /**
   * 用户信息存储key
   */
  USER_KEY: 'user',

  /**
   * 刷新Token存储key
   */
  REFRESH_TOKEN_KEY: 'refreshToken',
};

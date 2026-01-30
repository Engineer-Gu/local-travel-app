/**
 * 应用常量配置
 */
export const APP_CONSTANTS = {
  /**
   * API基础URL
   */
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://192.168.90.227:8080',

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

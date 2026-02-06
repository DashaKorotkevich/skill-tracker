export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://apiskilltracker.tw1.ru/api' 
  : '/api'

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
} as const;
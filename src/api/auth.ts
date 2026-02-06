// api/auth.ts
import { apiClient } from './';
import type { LoginBase, TokenResponse, User } from '@shared/types';

export const authApi = {

  async login(data: LoginBase): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>('/auth/login', data);
    return response.data;
  },

  /**
   * Проверка текущей авторизации
   * ЗАГЛУШКА - всегда возвращает ошибку
   */
  async checkAuth(): Promise<{ user: User }> {
    // Заглушка: всегда возвращаем ошибку 401
    // Позже заменить на реальный endpoint /auth/me
    throw new Error('Endpoint /auth/me not implemented yet');
    
    // Будет работать так:
    // const response = await apiClient.get<{ user: User }>('/auth/me');
    // return response.data;
  },

  /**
   * Выход из системы
   */
  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },
};
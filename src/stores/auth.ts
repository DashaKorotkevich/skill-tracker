// stores/auth.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginBase } from '@shared/types/auth';
import { authApi } from '@/api/auth';
import { getErrorMessage } from '@/api/clients';
import { STORAGE_KEYS } from '@/shared/config/constants';

interface AuthStore {
  // Состояния
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Здесь были геттеры, но в зустанде они ЗАЛУПА (если использовать с persist(middleware)) и больше их здесь нет 

  // Методы
  login: (credentials: LoginBase) => Promise<User>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Состояния
      user: null,
      isLoading: false,
      error: null,
      
      // Методы
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authApi.login(credentials);     
          
          localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.access_token);

          set({ 
            user: response.user, 
            isLoading: false,
            error: null
          });

          return response.user;
          
        } catch (error) {
          const errorMessage = getErrorMessage(error);
          set({ 
            error: errorMessage, 
            isLoading: false 
          });
          throw new Error(errorMessage);
        }
      },
      
      logout: async () => {
        try {
          await authApi.logout();
        } catch (error) {
          console.error('Ошибка выхода:', error);
        } finally {
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          set({ 
            user: null,
            error: null
          });
        }
      },
      
      checkAuth: async () => {
        set({ isLoading: true });
        
        try {
          const response = await authApi.checkAuth();
          
          set({ 
            user: response.user,
            isLoading: false,
            error: null
          });
          
        } catch (error) {
          console.error('Ошибка проверки авторизации:', error);
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          set({ 
            user: null,
            isLoading: false,
            error: null
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user // Сохраняем только пользователя
      }),
      onRehydrateStorage: () => (state) => {
        console.log('✅ Zustand restored:', state?.user?.username || 'no user');
      }
    }
  )
);
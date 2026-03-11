// stores/auth.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LoginBase, User } from '@shared/types';
import { authApi } from '@/api/auth';
import { getErrorMessage } from '@/api/clients';
import { STORAGE_KEYS } from '@/shared/config/constants';
import { useUserStore } from './user';

interface AuthStore {
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  // Здесь были геттеры, но в зустанде  если использовать с persist(middleware) с ними все плохо. Теперь геттеры это методы 

  login: (credentials: LoginBase) => Promise<User>;
  logout: () => Promise<void>;

  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist( /* Восстанавливает при обновлении */
    (set) => ({
      isAuth: false,
      isLoading: false,
      error: null,
      token: null,
      
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authApi.login(credentials);     
          console.log('auth store login', response )
          set({ 
            isAuth: true, 
            isLoading: false,
            token: response.access_token,
            error: null
          });

          useUserStore.getState().setUser(response.user);
          localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.access_token);

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
          useUserStore.getState().clearUser();
          set({ 
            isAuth: false, 
            token: null,
            error: null
          });
        }
      },
      
      checkAuth: async () => {
        set({ isLoading: true });
        
        try {
          const response = await authApi.checkAuth();
          
          set({ 
            isAuth: true,
            isLoading: false,
            error: null
          });
          
        } catch (error) {
          console.error('Ошибка проверки авторизации:', error);
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          set({ 
            isAuth: false,
            token: null,  
            isLoading: false,
            error: null
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuth: state.isAuth,
        token: state.token
      }),
      onRehydrateStorage: () => (state) => { //срабатывает, когда Zustand восстанавливает состояние из localStorage после перезагрузки страницы
        console.log('Auth восстановлен:', {
          isAuth: state?.isAuth,
          hasToken: !!state?.token
        });
      }
    }
  )
);
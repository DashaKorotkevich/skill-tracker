// stores/auth.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginCredentials } from '@shared/types/auth';

interface AuthStore {
  // Состояние
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Геттеры (computed)
  isAuthenticated: boolean;
  isAdmin: boolean;
  
  // Действия
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // === Начальное состояние ===
      user: null,
      token: null,
      isLoading: false,
      error: null,
      
      // === Геттеры ===
      get isAuthenticated() {
        return !!get().token;
      },
      
      get isAdmin() {
        const user = get().user;
        return user?.role === 'admin';
      },
      
      // === Действия ===
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          // TODO: Заменить на реальный API
          // const response = await authAPI.login(credentials);
          
          // Моковые данные
          const mockUser: User = {
            id: '1',
            email: credentials.email,
            name: credentials.email.includes('admin') ? 'Админ' : 'Сотрудник',
            role: credentials.email.includes('admin') ? 'admin' : 'employee',
          };
          
          const mockToken = 'mock-jwt-token-123';
          
          set({
            user: mockUser,
            token: mockToken,
            isLoading: false,
          });
          
          console.log('Успешный вход:', mockUser);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Ошибка входа';
          set({ error: message, isLoading: false });
          console.error('Ошибка входа:', error);
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isLoading: false,
          error: null,
        });
        console.log('Выход из системы');
      },
      
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage', // Ключ в localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        // isLoading и error не сохраняем
      }),
    }
  )
);
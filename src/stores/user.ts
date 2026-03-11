import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@shared/types'; // Импортируем тип User

interface UserStore {
  user: User | null;
  
  setUser: (user: User | null) => void;
  clearUser: () => void;
  
  // гетеры (как методы, чтобы избежать проблем с persist)
  isAdmin: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      
      isAdmin: () => get().user?.role === 'manager',
    }),
    {
      name: 'user-storage', // ключ в localStorage
      partialize: (state) => ({
        user: state.user, 
      }),
      onRehydrateStorage: () => (state) => {
        console.log('👤 User восстановлен:', state?.user?.username || 'нет юзера');
      }
    }
  )
);
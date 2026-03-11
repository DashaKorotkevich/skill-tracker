import { create } from 'zustand';
import { notificationsApi } from '@/api/notifications';
import type { 
  AppNotification, 
  NotificationDTO 
} from '@/shared/types';

const mapNotification = (dto: NotificationDTO): AppNotification => ({
  id: dto.id.toString(),
  userId: dto.user_id.toString(),
  type: dto.type as AppNotification['type'],
  title: dto.title,
  message: dto.body,
  isRead: dto.is_read,
  createdAt: dto.created_at,
  readAt: dto.read_at,
  data: dto.payload
});

interface NotificationStore {
  notifications: AppNotification[];
  unreadCount: number;  // 👋 ОБЫЧНОЕ ПОЛЕ
  isLoading: boolean;
  error: string | null;
  
  fetchNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,      // 👋 НАЧАЛЬНОЕ ЗНАЧЕНИЕ
  isLoading: false,
  error: null,
  
  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Получаем данные
      const response = await notificationsApi.getNotifications();
      
      // Маппим
      const notifications = response.map(mapNotification);
      
      // 👋 СЧИТАЕМ непрочитанные
      const unreadCount = notifications.filter(n => !n.isRead).length;
      
      // 👋 СОХРАНЯЕМ И notifications И unreadCount
      set({ 
        notifications,
        unreadCount,
        isLoading: false 
      });
      
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));
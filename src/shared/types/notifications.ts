// shared/types/notification.ts

// ============  БИЗНЕС-СУЩНОСТЬ ============
// ЧИСТАЯ МОДЕЛЬ - для стора, компонентов, логики
export interface AppNotification {
 id: string;        
  userId: string;         
  type: NotificationType;
  title: string;
  message: string;       
  isRead: boolean;       
  createdAt: string;      
  readAt?: string;        
  data?: Record<string, any>; 
}

// ============  ТИПЫ УВЕДОМЛЕНИЙ ============
export type NotificationType = 
  | 'task_progress_updated'
  | 'task_assigned'
  | 'task_completed'
  | 'test_assigned'
  | 'test_passed'
  | 'comment_added'
  | 'system';


// ============  API ЗАПРОСЫ ============
// ТОЛЬКО ДЛЯ API - параметры запросов

export interface GetNotificationsRequest {
  unread_only?: boolean;
  limit?: number;
  offset?: number;
}

// DTO с бека
export interface NotificationDTO {
  id: number;           
  user_id: number;      
  type: string;
  title: string;
  body: string;        
  is_read: boolean;     
  created_at: string;   
  read_at?: string;
  payload?: Record<string, any>;
}

// DTO массив с бека
export type GetNotificationsResponse = NotificationDTO[];
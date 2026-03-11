// api/notifications.ts
  import { apiClient } from './';
  import type { GetNotificationsRequest, GetNotificationsResponse } from '@shared/types';

// тип Notification берется из DOM, если прописывать - давать другое имя 
  export const notificationsApi = {
    async getNotifications(params?: GetNotificationsRequest): Promise<GetNotificationsResponse> {
        const response = await apiClient.get<GetNotificationsResponse>('/notifications', { params });
        return response.data;
    },
  }


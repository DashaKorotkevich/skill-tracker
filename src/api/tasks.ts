import { apiClient } from './';
import type { Task, TasksQueryParams } from '@shared/types'

export const tasksApi = {
  async getTasks(params?: TasksQueryParams): Promise<Task[]> {
    const response = await apiClient.get<Task[]>('/tasks', { params });
    return response.data;
  },
}
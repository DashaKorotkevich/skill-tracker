import type {User} from './user'

export type TaskStatus = 'pending' | 'in_progress' | 'done';

export interface Task {
  id: number;
  employee_id: number;
  title: string;
  description?: string;
  deadline?: string;
  status: TaskStatus;
  progress: number;
  created_at: string;
  updated_at: string;
  employee?: User;
}

export interface TasksQueryParams {
  status?: string;
  employee_id?: number;
  search?: string;
  page?: number;
  per_page?: number;
}

export interface TaskCreate {
  employee_id: number;
  title: string;
  description?: string;
  deadline?: string;
  status?: TaskStatus;
  progress?: number;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  deadline?: string;
  status?: TaskStatus;
  progress?: number;
}

export interface ProgressUpdate {
  progress: number;
  status?: TaskStatus;
}

export interface Comment {
  id: number;
  task_id: number;
  user_id?: number;
  text: string;
  created_at: string;
  author?: User;
}

export interface Attachment {
  id: number;
  task_id: number;
  uploaded_by_id?: number;
  stored_path: string;
  original_filename: string;
  content_type?: string;
  created_at: string;
}
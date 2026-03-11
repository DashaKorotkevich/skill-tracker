// shared/types/user.ts
import type {UserRole} from './'

export interface User {
  id: string;
  username: string; // логин для входа
  name: string;
  role: UserRole;
  avatar?: string;
  unreadNotificationsCount: number;
}
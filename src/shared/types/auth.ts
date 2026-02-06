// shared/types/auth.ts
// shared/types/auth.ts
export type UserRole = 'admin' | 'employee';

export interface User {
  id: string;
  username: string; // логин для входа
  name: string;
  role: UserRole;
}

export interface LoginBase {
  username: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: User;
}
// shared/types/auth.ts
import type { User } from "./user";

export interface LoginBase {
  username: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: User;
}
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  user: User;
}
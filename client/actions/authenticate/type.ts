export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  birthday: Date;
}
export interface AuthResponse {
  accessToken: string;
}

export interface UserProfile {
  email: string;
  name: string;
  avatar: string;
  birthday: string;
}

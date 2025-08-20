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
  refreshToken: string;
}

export interface UserProfile {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  birthday: string;
  role: string;
}

export interface UpdateUserProfile {
  name: string;
  avatar: string | null;
  birthday: string;
}

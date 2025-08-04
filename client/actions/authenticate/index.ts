'use server';

import { NEXT_PUBLIC_API_BASE_URL, setAccessToken } from '@/lib/axios';
import axios from 'axios';
import { AuthResponse, LoginRequest, RegisterRequest } from './type';

export const registerService = async (
  url: string,
  { arg }: { arg: RegisterRequest }
): Promise<AuthResponse> => {
  const res = await axios.post(url, arg, {
    withCredentials: true,
  });

  setAccessToken(res.data.accessToken);
  return res.data;
};

export const loginService = async (
  url: string,
  { arg }: { arg: LoginRequest }
): Promise<AuthResponse> => {
  const res = await axios.post(url, arg, {
    withCredentials: true,
  });

  setAccessToken(res.data.accessToken);
  return res.data;
};

export const refreshTokenService = async (): Promise<{
  accessToken: string;
}> => {
  const res = await axios.post<{ accessToken: string }>(
    `${NEXT_PUBLIC_API_BASE_URL}auth/refresh-token`,
    {},
    { withCredentials: true }
  );
  setAccessToken(res.data.accessToken);
  return res.data;
};

export const logoutService = async (url: string): Promise<void> => {
  await axios.post(url, undefined, { withCredentials: true });
};

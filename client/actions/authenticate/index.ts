'use server';

import axiosInstance, {
  NEXT_PUBLIC_API_BASE_URL,
  setAccessToken,
} from '@/lib/axios';
import { AuthResponse, RegisterRequest } from './type';
import axios from 'axios';

export const registerService = async (
  url: string,
  { arg }: { arg: RegisterRequest }
): Promise<AuthResponse> => {
  const res = await axiosInstance.post(url, arg, {
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

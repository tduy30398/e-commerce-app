'use server';

import { setAccessToken } from '@/lib/axios';
import axios from 'axios';
import { LoginRequest, LoginResponse } from './type';

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const loginService = async (
  param: LoginRequest
): Promise<LoginResponse> => {
  const res = await axios.post(`${NEXT_PUBLIC_API_BASE_URL}auth/login`, param, {
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

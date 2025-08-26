import { AuthResponse, LoginRequest } from '@/actions/authenticate/type';
import axiosInstance from '@/lib/axios';
import { AxiosResponse } from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: LoginRequest = await req.json();

    const backendRes: AxiosResponse<AuthResponse> = await axiosInstance.post(
      'auth/login',
      data,
      {
        validateStatus: () => true,
      }
    );

    if (backendRes.status !== 200) {
      return NextResponse.json(backendRes.data, { status: backendRes.status });
    }

    const { refreshToken, accessToken } = backendRes.data;

    const res = NextResponse.json({ accessToken });

    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 8 * 60 * 60, // 8 hours
    });

    return res;
  } catch (err: unknown) {
    let message = 'An unexpected error occurred';
    if (err instanceof Error) {
      message = err.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

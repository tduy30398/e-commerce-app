import axiosInstance from '@/lib/axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    const backendRes = await axiosInstance.post(
      'auth/firebase-login',
      { idToken },
      { validateStatus: () => true }
    );

    if (backendRes.status !== 200) {
      return NextResponse.json(backendRes.data, { status: backendRes.status });
    }

    const { accessToken, refreshToken } = backendRes.data;

    const res = NextResponse.json({ accessToken });

    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 8 * 60 * 60,
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

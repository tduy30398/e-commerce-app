import axiosInstance from '@/lib/axios';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const backendRes = await axiosInstance.post(
      'auth/logout',
      {},
      {
        withCredentials: true,
      }
    );

    if (backendRes.status !== 200) {
      return NextResponse.json(backendRes.data, { status: backendRes.status });
    }

    const res = NextResponse.json({ message: 'Logged out successfully' });
    res.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });

    return res;
  } catch (err: unknown) {
    let message = 'An unexpected error occurred';
    if (err instanceof Error) {
      message = err.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

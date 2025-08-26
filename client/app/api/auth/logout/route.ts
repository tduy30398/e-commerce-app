import { cookies } from 'next/headers';
import axiosInstance from '@/lib/axios';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    const backendRes = await axiosInstance.post(
      'auth/logout',
      {},
      {
        headers: {
          Cookie: `refreshToken=${refreshToken || ''}`,
        },
        validateStatus: () => true,
      }
    );

    if (backendRes.status !== 200) {
      return NextResponse.json(backendRes.data, { status: backendRes.status });
    }

    const res = NextResponse.json({ message: 'Logged out successfully' });

    res.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
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

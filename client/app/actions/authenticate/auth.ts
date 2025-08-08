'use server';

import axiosInstance from "@/lib/axios";

export async function logoutAction() {
  try {
    const res = await axiosInstance.post('/auth/logout');
    return res.status === 200;
  } catch {
    return false;
  }
}

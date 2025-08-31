import axiosInstance from '@/lib/axios';
import { UserProfile } from '../authenticate/type';

export const getAllUsers = async (
  params?: BaseFilterParams & { role?: string }
): Promise<APIPaginationResponse<UserProfile[]>> => {
  const res = await axiosInstance.get('user', { params });
  return res.data;
};

import axiosInstance from '@/lib/axios';
import { ReviewRequest, ReviewType } from './type';

export const createReview = async (
  url: string,
  { arg }: { arg: { id: string; data: ReviewRequest } }
): Promise<void> => {
  const { id, data } = arg;
  await axiosInstance.post(`${url}/${id}`, data);
};

export const getReviews = async (productId: string): Promise<ReviewType[]> => {
  const res = await axiosInstance.get(`review/${productId}`);
  return res.data;
};

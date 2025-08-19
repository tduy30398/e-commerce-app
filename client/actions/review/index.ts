import axiosInstance from '@/lib/axios';
import { ReviewRequest, ReviewType } from './type';
import { unstable_cache } from 'next/cache';

export const createReview = async (
  url: string,
  { arg }: { arg: { id: string; data: ReviewRequest } }
): Promise<void> => {
  const { id, data } = arg;
  await axiosInstance.post(`${url}/${id}`, data);
};

export function getReviews(productId: string) {
  return unstable_cache(
    async (): Promise<ReviewType[]> => {
      const res = await axiosInstance.get(`review/${productId}`);
      return res.data;
    },
    [`reviews-${productId}`],
    { tags: [`reviews-${productId}`] }
  )();
}

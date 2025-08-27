import axiosInstance from '@/lib/axios';
import { ReviewRequest, ReviewType } from './type';
import { unstable_cache } from 'next/cache';

export function getReviews(productId: string, params?: BaseFilterParams) {
  const cacheKey = [`reviews-${productId}-${params?.page || 1}-${params?.limit || 5}`];

  return unstable_cache(
    async (): Promise<APIPaginationResponse<ReviewType[]>> => {
      const res = await axiosInstance.get(`review/${productId}`, { params });
      return res.data;
    },
    cacheKey,
    { tags: [`reviews-${productId}`] }
  )();
}

export const createReview = async (
  url: string,
  { arg }: { arg: { id: string; data: ReviewRequest } }
): Promise<void> => {
  const { id, data } = arg;
  await axiosInstance.post(`${url}/${id}`, data);
};

export const deleteReview = async (
  url: string,
  { arg }: { arg: { id: string } }
): Promise<void> => {
  await axiosInstance.delete(`${url}/${arg.id}`);
};

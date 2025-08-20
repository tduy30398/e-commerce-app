'use server';

import axiosInstance from '@/lib/axios';
import { ProductRequest, ProductTypes } from './type';
import { revalidateTag } from 'next/cache';
// import { ReviewType } from '../review/type';
// import { unstable_cacheTag as cacheTag } from 'next/cache';

export const getAllProducts = async (
  params?: BaseFilterParams
): Promise<APIPaginationResponse<ProductTypes[]>> => {
  const res = await axiosInstance.get('product', { params });
  return res.data;
};

export const getProductDetail = async (id: string): Promise<ProductTypes> => {
  const res = await axiosInstance.get(`product/${id}`);
  return res.data;
};

export const createProduct = async (
  url: string,
  { arg }: { arg: ProductRequest }
): Promise<{ id: string }> => {
  const res = await axiosInstance.post(url, arg);
  return res.data.id;
};

export const updateProduct = async (
  url: string,
  { arg }: { arg: { id: string; data: ProductRequest } }
): Promise<{ id: string }> => {
  const { id, data } = arg;
  const res = await axiosInstance.put(`${url}/${id}`, data);
  return res.data.id;
};

export const deleteProduct = async (
  url: string,
  { arg }: { arg: { id: string } }
): Promise<void> => {
  await axiosInstance.delete(`${url}/${arg.id}`);
};

// export const getReviews = async (productId: string): Promise<ReviewType[]> => {
//   'use cache';
//   cacheTag(`reviews-${productId}`);
//   const res = await axiosInstance.get(`review/${productId}`);
//   return res.data;
// };

export const revalidateReviews = async (productId: string) => {
  revalidateTag(`reviews-${productId}`);
};

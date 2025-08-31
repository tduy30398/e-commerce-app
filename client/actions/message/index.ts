import axiosInstance from '@/lib/axios';
import { ChatMessage } from '@/lib/useChatSocket';

export const getChatHistory = async (id: string, params?: BaseFilterParams): Promise<APIPaginationResponse<ChatMessage[]>> => {
  const res = await axiosInstance.get(`chat/${id}`, { params });
  return res.data;
};

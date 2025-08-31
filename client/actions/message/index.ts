import axiosInstance from '@/lib/axios';
import { ChatMessage } from '@/lib/useChatSocket';

export const getChatHistory = async (id: string): Promise<ChatMessage[]> => {
  const res = await axiosInstance.get(`chat/${id}`);
  return res.data;
};

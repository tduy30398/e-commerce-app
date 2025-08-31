'use client';

import { initChatSocket, getChatSocket, disconnectSockets } from '@/lib/socket';
import useProfileStore from '@/store/useProfileStore';
import React from 'react';

export interface ChatMessage {
  _id: string;
  from: { _id: string; name: string; avatar: string; role: string };
  to: { _id: string; name: string; avatar: string; role: string };
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const useChatSocket = (targetUserId: string | null) => {
  const { accessToken } = useProfileStore();
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);

  React.useEffect(() => {
    if (!accessToken) {
      disconnectSockets();
      return;
    }

    if (!targetUserId) return;

    const chatSocket = initChatSocket(accessToken);

    chatSocket.on('message', (msg: ChatMessage) => {
      // Only add messages related to this conversation
      if (msg.from._id === targetUserId || msg.to._id === targetUserId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      chatSocket.off('message');
    };
  }, [accessToken, targetUserId]);

  const sendMessage = (content: string) => {
    const chatSocket = getChatSocket();
    if (!chatSocket) return;

    chatSocket.emit('message', { to: targetUserId || '', content });
  };

  return { messages, sendMessage };
};

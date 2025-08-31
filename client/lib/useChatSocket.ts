'use client';

import { initChatSocket, getChatSocket, disconnectSockets } from '@/lib/socket';
import { useChatStore } from '@/store/useChatStore';
import useProfileStore from '@/store/useProfileStore';
import React from 'react';

export interface ChatMessage {
  _id: string;
  from: string;
  to: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const useChatSocket = () => {
  const { accessToken, profileData } = useProfileStore();
  const { addMessage } = useChatStore();

  React.useEffect(() => {
    if (!accessToken) {
      disconnectSockets();
      return;
    }

    const chatSocket = initChatSocket(accessToken);

    chatSocket.on('message', (msg: ChatMessage) => {
      if (profileData?._id) {
        addMessage(msg, profileData._id);
      }
    });

    return () => {
      chatSocket.off('message');
    };
  }, [accessToken, addMessage, profileData]);

  const sendMessage = (to: string, content: string) => {
    const chatSocket = getChatSocket();
    if (!chatSocket) return;
    chatSocket.emit('message', { to, content });
  };

  return { sendMessage };
};

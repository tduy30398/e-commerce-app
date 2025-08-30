'use client';

import { Cart } from '@/components/organisms/RightHeader';
import { io, Socket } from 'socket.io-client';

// -------- Cart Types --------
export interface ClientToServerCartEvents {
  'cart:add': (payload: {
    productId: string;
    quantity: number;
    color: number;
    size: number;
  }) => void;
  'cart:remove': (payload: { productIds: string[] }) => void;
}

export interface ServerToClientCartEvents {
  'cart:updated': (cart: Cart) => void;
}

// -------- Chat Types --------
export interface ClientToServerChatEvents {
  'message': (payload: { to: string; content: string }) => void;
}

export interface ServerToClientChatEvents {
  'message': (payload: {
    from: { _id: string; name: string; avatar: string; role: string };
    to: { _id: string; name: string; avatar: string; role: string };
    content: string;
    createdAt: string;
  }) => void;
}

// -------- Socket Instances --------
let mainSocket: Socket<
  ServerToClientCartEvents,
  ClientToServerCartEvents
> | null = null;
let chatSocket: Socket<
  ServerToClientChatEvents,
  ClientToServerChatEvents
> | null = null;

export const initMainSocket = (token: string) => {
  if (!mainSocket) {
    mainSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      auth: { token },
      autoConnect: true,
    });
  }
  return mainSocket;
};

export const initChatSocket = (token: string) => {
  if (!chatSocket) {
    chatSocket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/chat`, {
      auth: { token },
      autoConnect: true,
    });
  }
  return chatSocket;
};

export const disconnectSockets = () => {
  if (mainSocket) {
    mainSocket.disconnect();
    mainSocket = null;
  }
  if (chatSocket) {
    chatSocket.disconnect();
    chatSocket = null;
  }
};

export const getMainSocket = () => mainSocket;
export const getChatSocket = () => chatSocket;

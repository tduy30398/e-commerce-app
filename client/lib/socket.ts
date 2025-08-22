"use client";

import { io, Socket } from "socket.io-client";

// Events client can emit to server
export interface ClientToServerEvents {
  "cart:add": (payload: { productId: string; quantity: number }) => void;
  "cart:remove": (payload: { productId: string }) => void;
}

// Events server emits to client
export interface ServerToClientEvents {
  "cart:updated": (cart: {
    userId: string;
    items: { productId: string; quantity: number }[];
  }) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const initSocket = (token: string) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: { token },
      autoConnect: true, // connect immediately
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;



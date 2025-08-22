'use client';

import { getSocket } from '@/lib/socket';
import React from 'react';

const AddToCartButton = ({ productId }: { productId: string }) => {
  const handleAdd = () => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit('cart:add', { productId, quantity: 1 });
  };
  return (
    <button
      onClick={handleAdd}
      className="w-fit h-10 cursor-pointer rounded-[20px] bg-primary text-white px-4 flex-center"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;

'use client';

import { getSocket } from '@/lib/socket';
import React from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useProfileStore from '@/store/useProfileStore';
import { ROUTES } from '@/lib/constants';
import QuantityButton from '../molecules/QuantityButton';

interface AddToCartButtonProps {
  productId: string;
  color: number;
  size: number;
}

const AddToCartButton = ({ productId, color, size }: AddToCartButtonProps) => {
  const [quantity, setQuantity] = React.useState(1);
  const { accessToken } = useProfileStore();
  const router = useRouter();

  const handleAdd = () => {
    if (!accessToken) {
      router.push(ROUTES.LOGIN);
      return;
    }

    const socket = getSocket();
    if (!socket) return;

    socket.emit('cart:add', {
      productId,
      quantity,
      color,
      size,
    });

    toast.success('Added to cart');
  };

  return (
    <div className="flex items-center gap-4 w-full md:w-3/4">
      <QuantityButton
        quantity={quantity}
        handleMinus={() => setQuantity((prev) => Math.max(1, prev - 1))}
        handlePlus={() => setQuantity((prev) => Math.min(99, prev + 1))}
      />
      <button
        onClick={handleAdd}
        className="h-12 cursor-pointer rounded-3xl bg-primary text-white px-4 flex-center hover:opacity-80 w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartButton;

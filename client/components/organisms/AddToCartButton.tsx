'use client';

import { getSocket } from '@/lib/socket';
import React from 'react';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useProfileStore from '@/store/useProfileStore';
import { ROUTES } from '@/lib/constants';

const AddToCartButton = ({ productId }: { productId: string }) => {
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

    socket.emit('cart:add', { productId, quantity });
    toast.success('Added to cart');
  };
  return (
    <div className="flex items-center gap-4 w-full md:w-3/4">
      <div className="flex items-center gap-2 bg-[#f0f0f0] rounded-3xl h-12">
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent border-none shadow-none cursor-pointer"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
        >
          <Minus className="size-5" />
        </Button>
        <span className="w-6 text-center font-medium">{quantity}</span>
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent border-none shadow-none cursor-pointer"
          onClick={() => setQuantity((prev) => Math.min(99, prev + 1))}
        >
          <Plus className="size-5" />
        </Button>
      </div>
      <button
        onClick={handleAdd}
        className="w-fit h-12 cursor-pointer rounded-3xl bg-primary text-white px-4 flex-center hover:opacity-80 w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartButton;

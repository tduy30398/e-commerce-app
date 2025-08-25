import React from 'react';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantityButtonProps {
  isCard?: boolean;
  quantity: number;
  handleMinus: () => void;
  handlePlus: () => void;
}

const QuantityButton = ({
  quantity,
  handleMinus,
  handlePlus,
  isCard = false,
}: QuantityButtonProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 bg-[#f0f0f0] rounded-3xl h-12',
        isCard && 'h-8 md:h-12'
      )}
    >
      <Button
        variant="outline"
        size="sm"
        className={cn(
          'bg-transparent border-none shadow-none cursor-pointer hover:bg-transparent',
          isCard && 'max-md:px-1!'
        )}
        onClick={handleMinus}
      >
        <Minus className="size-5" />
      </Button>
      <span className="w-6 text-center font-medium">{quantity}</span>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          'bg-transparent border-none shadow-none cursor-pointer hover:bg-transparent',
          isCard && 'max-md:px-1!'
        )}
        onClick={handlePlus}
      >
        <Plus className="size-5" />
      </Button>
    </div>
  );
};

export default QuantityButton;

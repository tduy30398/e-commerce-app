import React from 'react';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';

interface QuantityButtonProps {
  quantity: number;
  handleMinus: () => void;
  handlePlus: () => void;
}

const QuantityButton = ({
  quantity,
  handleMinus,
  handlePlus,
}: QuantityButtonProps) => {
  return (
    <div className="flex items-center gap-2 bg-[#f0f0f0] rounded-3xl h-12">
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent border-none shadow-none cursor-pointer"
        onClick={handleMinus}
      >
        <Minus className="size-5" />
      </Button>
      <span className="w-6 text-center font-medium">{quantity}</span>
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent border-none shadow-none cursor-pointer"
        onClick={handlePlus}
      >
        <Plus className="size-5" />
      </Button>
    </div>
  );
};

export default QuantityButton;

'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface SizeSelectorProps {
  data: {
    label: string;
    value: number;
  }[];
  selectedSize: number;
  handleSizeChange: (value: number) => void;
}

const SizeSelector = ({
  data,
  selectedSize,
  handleSizeChange,
}: SizeSelectorProps) => {
  return (
    <div className="flex items-center gap-4 mt-3">
      {data.map((item) => (
        <button
          onClick={() => handleSizeChange(item.value)}
          key={item.value}
          className={cn(
            'w-fit h-12 cursor-pointer rounded-3xl bg-[#f0f0f0] px-4 flex-center',
            selectedSize === item.value &&
              'bg-primary text-white hover:opacity-80'
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;

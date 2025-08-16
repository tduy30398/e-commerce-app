'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface SizeSelectorProps {
  data: {
    label: string;
    value: number;
  }[];
}

const SizeSelector = ({ data }: SizeSelectorProps) => {
  const [selectedSize, setSelectedSize] = React.useState(data[0].value);

  return (
    <div className="flex items-center gap-4 mt-3">
      {data.map((item) => (
        <div
          onClick={() => setSelectedSize(item.value)}
          key={item.value}
          className={cn(
            'w-fit h-10 cursor-pointer rounded-[20px] bg-[#f0f0f0] px-4 flex-center',
            selectedSize === item.value && 'bg-primary text-white'
          )}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default SizeSelector;

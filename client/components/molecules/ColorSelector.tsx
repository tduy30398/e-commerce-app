'use client';

import { Check } from 'lucide-react';
import React from 'react';

interface ColorSelectorProps {
  data: {
    color: string;
    value: number;
  }[];
}

const ColorSelector = ({ data }: ColorSelectorProps) => {
  const [selectedColor, setSelectedColor] = React.useState(data[0].value);

  return (
    <div className="flex items-center gap-4 mt-3">
      {data.map((item) => (
        <div
          onClick={() => setSelectedColor(item.value)}
          key={item.value}
          className="size-10 cursor-pointer rounded-full flex-center"
          style={{ backgroundColor: `#${item.color}` }}
        >
          {selectedColor === item.value && (
            <Check className="w-5 h-5 text-white" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ColorSelector;

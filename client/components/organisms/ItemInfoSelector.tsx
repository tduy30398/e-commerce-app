'use client';

import React from 'react';
import ColorSelector from '../molecules/ColorSelector';
import { Separator } from '../ui/separator';
import SizeSelector from '../molecules/SizeSelector';
import AddToCartButton from './AddToCartButton';
import { colorSelectorData, selectorData } from '@/public/dummy/general';

interface ItemInfoSelectorProps {
  id: string;
}

const ItemInfoSelector = ({ id }: ItemInfoSelectorProps) => {
  const [selectedColor, setSelectedColor] = React.useState(
    colorSelectorData[0].value
  );

  const [selectedSize, setSelectedSize] = React.useState(selectorData[0].value);

  return (
    <>
      <p className="mt-5 text-xl font-semibold">Select colors</p>
      <ColorSelector
        data={colorSelectorData}
        selectedColor={selectedColor}
        handleColorChange={setSelectedColor}
      />
      <Separator className="my-4 md:my-6" />
      <p className="mt-5 text-xl font-semibold">Choose Size</p>
      <SizeSelector
        data={selectorData}
        selectedSize={selectedSize}
        handleSizeChange={setSelectedSize}
      />
      <Separator className="my-4 md:my-6" />
      <AddToCartButton
        productId={id}
        color={selectedColor}
        size={selectedSize}
      />
    </>
  );
};

export default ItemInfoSelector;

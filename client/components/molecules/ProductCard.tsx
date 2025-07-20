import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { formattedCapitalize } from '@/lib/utils';
import { ProductTypes } from '@/actions/product/type';

const ProductCard: React.FC<ProductTypes> = ({
  name,
  image,
  rating,
  price,
}) => {
  return (
    <div>
      <div className="relative bg-[#F0EEED] rounded-2xl h-40 sm:h-60 mb-4 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <h4 className="mt-4 text-xs md:text-xl font-semibold line-clamp-1">
        {formattedCapitalize(name)}
      </h4>
      <div className="flex items-center mt-2">
        <Star className="size-4 md:size-5 text-[#FFC633] fill-[#FFC633] mr-2" />
        <span className="text-xs md:text-base">{`${rating || 0}/5`}</span>
      </div>
      <p className="tex-base md:text-2xl font-semibold mt-2">{`$${
        price || 0
      }`}</p>
    </div>
  );
};

export default ProductCard;

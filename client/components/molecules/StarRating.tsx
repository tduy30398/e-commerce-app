import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import React from 'react';

interface StarRatingProps {
  rating: number;
  className?: string;
  isHideText?: boolean;
}

const StarRating = ({ rating, className, isHideText }: StarRatingProps) => {
  return (
    <div className={cn('flex items-center', className)}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;

        if (starValue <= Math.floor(rating)) {
          return (
            <Star
              key={index}
              className="w-4 h-4 md:w-5 md:h-5 mr-1 text-[#FFC633] fill-[#FFC633]"
            />
          );
        } else if (starValue === Math.ceil(rating) && rating % 1 !== 0) {
          return (
            <div key={index} className="relative w-4 h-4 md:w-5 md:h-5 mr-1">
              <Star className="absolute inset-0 w-full h-full text-gray-300" />
              <Star
                className="absolute inset-0 w-full h-full text-[#FFC633] fill-[#FFC633]"
                style={{ clipPath: 'inset(0 50% 0 0)' }}
              />
            </div>
          );
        } else {
          return (
            <Star
              key={index}
              className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-300"
            />
          );
        }
      })}
      {!isHideText && (
        <span className="ml-2 text-base">{rating.toFixed(1)}/5</span>
      )}
    </div>
  );
};

export default StarRating;

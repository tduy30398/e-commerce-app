'use client';

import { ReviewType } from '@/actions/review/type';
import { format } from 'date-fns';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import StarRating from './StarRating';
import { useIsMobile } from '@/hooks/use-mobile';

interface ReviewItemProps {
  review: ReviewType;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const isMobile = useIsMobile();

  const MAX_LENGTH = isMobile ? 143 : 512;
  const isLong = review?.comment?.length > MAX_LENGTH;
  const displayedText =
    !expanded && isLong
      ? review.comment.slice(0, MAX_LENGTH) + '...'
      : review.comment;

  return (
    <div
      key={review._id}
      className="border-[1px] border-black/10 p-4 md:p-6 rounded-2xl"
    >
      <StarRating isHideText rating={review.rating} />
      <div className="flex items-center gap-4 mt-6">
        <Avatar className="size-10 border border-gray-300">
          <AvatarImage
            className="object-cover"
            src={review?.user?.avatar || ''}
            alt="avatar"
          />
          <AvatarFallback className="bg-cyan-400 text-white font-semibold">
            {review?.user?.name?.charAt(0) || ''}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-lg md:text-xl font-bold">
          {review?.user?.name || ''}
        </h3>
      </div>
      <Separator className="my-4" />
      <p className="text-sm md:text-base font-medium text-black/80 leading-relaxed">
        {displayedText}
      </p>

      {isLong && (
        <div className="w-full flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 px-2 text-cyan-600 hover:text-cyan-800 cursor-pointer"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? 'Show less' : 'Show more'}
          </Button>
        </div>
      )}

      <p className="text-sm md:text-base text-black/70 mt-4 font-medium">
        {format(new Date(review?.createdAt), 'MMMM d, yyyy')}
      </p>
    </div>
  );
};

export default ReviewItem;

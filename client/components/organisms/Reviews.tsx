import { getReviews } from '@/actions/review';
import React from 'react';
import ReviewItem from '../molecules/ReviewItem';

interface ReviewsProps {
  productId: string;
}

const Reviews = async ({ productId }: ReviewsProps) => {
  const reviews = await getReviews(productId);

  return (
    <div className="mt-8 flex flex-col gap-4">
      {reviews.length > 0 ? (
        reviews.map((review) => <ReviewItem key={review._id} review={review} />)
      ) : (
        <p className="text-center text-xl font-semibold">No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;

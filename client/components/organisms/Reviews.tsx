import { getReviews } from '@/actions/review';
import React from 'react';

interface ReviewsProps {
  productId: string;
}

const Reviews = async ({ productId }: ReviewsProps) => {
  const reviews = await getReviews(productId);

  return <div>Reviews: {reviews[0].comment}</div>;
};

export default Reviews;

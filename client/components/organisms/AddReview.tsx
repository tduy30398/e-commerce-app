'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import useProfileStore from '@/store/useProfileStore';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { createReview } from '@/actions/review';
import { toast } from 'sonner';
import { revalidateReviews } from '@/actions/product';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import StarRatingInput from './StarRatingInput';

interface FormReviewProps {
  review: string;
  rating: number;
}

const AddReview = () => {
  const { profileData, accessToken } = useProfileStore();
  const params = useParams<{ id: string }>();

  const method = useForm<FormReviewProps>({
    mode: 'onChange',
    defaultValues: {
      review: '',
      rating: 0,
    },
  });

  const { trigger: createReviewTrigger, isMutating: createReviewLoading } =
    useSWRMutation('review', createReview, {
      onSuccess: async () => {
        await revalidateReviews(params.id!);
        method.reset();
        toast.success('Review added');
      },
      onError: () => {
        toast.error('Create review failed');
      },
    });

  const onSubmit = async (data: FormReviewProps) => {
    createReviewTrigger({
      id: params.id!,
      data: {
        comment: data.review,
        rating: data.rating,
      },
    });
  };

  return (
    <Form {...method}>
      <form
        onSubmit={method.handleSubmit(onSubmit)}
        className={cn(
          'w-full border rounded-2xl p-2 md:p-4 shadow-sm mt-6 md:mt-9',
          accessToken ? '' : 'hidden'
        )}
      >
        <div className="flex items-center gap-4">
          <Avatar className="size-10 border border-gray-300">
            {profileData?.avatar && (
              <AvatarImage
                className="object-cover"
                src={profileData?.avatar}
                alt="avatar"
              />
            )}
            <AvatarFallback className="bg-cyan-400 text-white font-semibold">
              {profileData?.name?.charAt(0) || ''}
            </AvatarFallback>
          </Avatar>
          <FormField
            name="rating"
            control={method.control}
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <FormControl>
                  <StarRatingInput value={value} onChange={onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="review"
          control={method.control}
          render={({ field: { onChange, value } }) => (
            <FormItem className="mt-2 md:mt-4">
              <FormControl>
                <Textarea
                  onChange={onChange}
                  value={value}
                  placeholder="Write your review..."
                  className="w-full rounded-xl px-4 py-2 text-sm border border-gray-200 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  rows={4}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end mt-2">
          <Button
            type="submit"
            className="rounded-xl bg-black hover:bg-black/80 px-6 py-1 text-white cursor-pointer"
            size="sm"
            disabled={!method.watch('review') || createReviewLoading}
          >
            Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddReview;

'use client';

import React from 'react';
import { ReviewType } from '@/actions/review/type';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import StarRating from './StarRating';
import { useIsMobile } from '@/hooks/use-mobile';
import { Ellipsis, SquarePen, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import useProfileStore from '@/store/useProfileStore';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { toast } from 'sonner';
import useSWRMutation from 'swr/mutation';
import { deleteReview } from '@/actions/review';
import { revalidateReviews } from '@/actions/product';

interface ReviewItemProps {
  review: ReviewType;
  productId: string;
}

const ReviewItem = ({ review, productId }: ReviewItemProps) => {
  const { profileData } = useProfileStore();

  const [expanded, setExpanded] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const isMobile = useIsMobile();

  const { trigger: deleteReviewTrigger, isMutating: deleteLoading } =
    useSWRMutation('review', deleteReview, {
      onSuccess: async () => {
        await revalidateReviews(productId);
        toast.success('Delete review success');
      },
      onError: () => {
        toast.error('Delete review failed');
      },
    });

  const MAX_LENGTH = isMobile ? 143 : 512;
  const isLong = review?.comment?.length > MAX_LENGTH;
  const displayedText =
    !expanded && isLong
      ? review.comment.slice(0, MAX_LENGTH) + '...'
      : review.comment;

  return (
    <div className="border border-black/10 p-4 md:p-6 rounded-2xl group">
      <div className="flex items-center justify-between">
        <StarRating isHideText rating={review.rating} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                'opacity-100 md:opacity-0 md:group-hover:opacity-100 outline-none data-[state=open]:opacity-100 transition-opacity',
                profileData?._id === review?.user?._id ? '' : 'hidden'
              )}
            >
              <Ellipsis className="size-5 cursor-pointer" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <SquarePen className="mr-1 size-4" />
                <p className="font-medium">Edit</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpenDialog(true)}
                className="hover:bg-[#e02e2a23] focus:bg-[#e02e2a23] cursor-pointer"
              >
                <Trash2 className="mr-1 size-4 text-[#ff8583]" />
                <p className="font-medium text-[#ff8583]">Delete</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to delete this review?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-black">
              This action cannot be undone. This will permanently delete your
              record from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteLoading}
              onClick={() => deleteReviewTrigger({ id: review?._id })}
              className="cursor-pointer bg-[#f5232f] hover:bg-[#f28d92]"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex items-center gap-4 mt-4 md:mt-6">
        <Avatar className="size-10 border border-gray-300">
          {review?.user?.avatar && (
            <AvatarImage
              className="object-cover"
              src={review?.user?.avatar}
              alt="avatar"
            />
          )}
          <AvatarFallback className="bg-cyan-400 text-white font-semibold">
            {review?.user?.name?.charAt(0) || ''}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-lg md:text-xl font-bold">
          {review?.user?.name || ''}
        </h3>
      </div>
      <Separator className="my-2 md:my-4" />
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

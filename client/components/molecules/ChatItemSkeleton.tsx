import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';

const ChatItemSkeleton = ({ isOwn }: { isOwn?: boolean }) => {
  return (
    <div className={cn('mb-4 flex', isOwn ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'rounded-lg w-4/5 px-3 py-2 shadow-md',
          isOwn ? 'bg-blue-500/60' : 'bg-gray-200/60'
        )}
      >
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export default ChatItemSkeleton;

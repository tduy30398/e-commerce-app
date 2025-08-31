import { Skeleton } from '@/components/ui/skeleton';

export function ChatUserSkeleton() {
  return (
    <div className="flex items-center gap-2 w-full p-3">
      <Skeleton className="h-9 w-9 rounded-full" />

      <div className="flex flex-col w-0 flex-1">
        <Skeleton className="h-4 w-3/5 mb-2" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}

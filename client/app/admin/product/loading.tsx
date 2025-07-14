import TableSkeleton from '@/components/molecules/TableSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
    return (
        <div>
            <Skeleton className="h-16 w-full" />
            <TableSkeleton />
        </div>
    )
}

export default Loading
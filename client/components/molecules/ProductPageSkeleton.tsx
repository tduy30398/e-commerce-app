import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ProductPageSkeleton = () => {
    return (
        <div className='section-container mb-36'>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8 md:mt-14 mb-9 w-full'>
                <aside className='lg:col-span-1 bg-white p-4 rounded-xl shadow space-y-4'>
                    <Skeleton className='h-6 w-32' />
                    <Skeleton className='h-10 w-full' />
                    <Skeleton className='h-10 w-full' />
                    <Skeleton className='h-6 w-24' />
                </aside>
                <div className='lg:col-span-3'>
                    <Skeleton className='h-8 w-1/2 mb-6' />
                    <div className='grid grid-cols-2 xl:grid-cols-3 gap-4'>
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className='space-y-3'>
                                <Skeleton className='h-48 w-full rounded-xl' />
                                <Skeleton className='h-4 w-3/4' />
                                <Skeleton className='h-4 w-1/2' />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPageSkeleton
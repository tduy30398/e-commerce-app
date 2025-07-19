import React from 'react'
import ProductCard from '../molecules/ProductCard';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { getAllProducts } from '@/service/product';

const NewArrivals = async () => {
    const products = await getAllProducts({ limit: 4 });

    if (!products) {
        return 'Get product failed! Please try again later.';
    };

    return (
        <section className='flex flex-col items-center mt-12 md:mt-[72px] mb-36'>
            <h2 className='text-3xl md:text-5xl font-extrabold'>NEW ARRIVALS</h2>
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 md:mt-14 mb-9'>
                {products.data.length > 0 && products.data.map((product) => (
                    <ProductCard
                        key={product._id}
                        {...product}
                    />
                ))}
            </div>
            <Link
                href={ROUTES.PRODUCT}
                className='text-base text-black px-8 md:px-16 py-2 md:py-4 border border-gray-300 rounded-full hover:bg-gray-100 max-sm:text-center'
            >
                View All
            </Link>
        </section>
    )
}

export default NewArrivals
import React from 'react'
import ProductCard from '../molecules/ProductCard';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { getAllProducts } from '@/actions/product';

const PAGE_SIZE = 4;

const NewArrivals = async () => {
    const products = await getAllProducts({ limit: PAGE_SIZE });

    return (
        <section className='section-container flex flex-col items-center mt-12 md:mt-[72px] mb-36'>
            <h2 className='text-3xl md:text-5xl font-extrabold'>NEW ARRIVALS</h2>
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 md:mt-14 mb-9 w-full'>
                {products?.data?.length > 0 ? (
                    products.data.map((product) => (
                        <ProductCard
                            key={product._id}
                            {...product}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No products available.</p>
                )}
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
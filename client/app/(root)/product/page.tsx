import { getAllProducts } from '@/actions/product';
import ProductCard from '@/components/molecules/ProductCard';
import FilterColumn from '@/components/organisms/FilterColumn';
import React from 'react'

const PAGE_SIZE = 9;

const Product = async ({ searchParams }: { searchParams: Promise<{ query: string }> }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const query = await searchParams;
    const products = await getAllProducts({ limit: PAGE_SIZE });

    return (
        <div className='section-container mb-36'>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8 md:mt-14 mb-9 w-full'>
                <FilterColumn />
                <div className='lg:col-span-3'>
                    <h2 className='text-3xl font-bold mb-6'>Our Trending Products</h2>

                    <div className='grid grid-cols-2 xl:grid-cols-3 gap-4'>
                        {products?.data?.length > 0 ? (
                            products.data.map((product) => (
                                <ProductCard key={product._id} {...product} />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">No products available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
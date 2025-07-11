import axiosInstance from '@/lib/axios';
import React from 'react'
import ProductCard from '../molecules/ProductCard';

export interface ProductTypes {
    _id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

const NewArrivals = async () => {
    const res = await axiosInstance.get('/api/product');
    const products: ProductTypes[] = res.data;

    return (
        <section className='section-container flex gap-8 mt-[72px] pb-16'>
            {products.length > 0 && products.map((product) => (
                <ProductCard
                    key={product._id}
                    {...product}
                />
            ))}
        </section>
    )
}

export default NewArrivals
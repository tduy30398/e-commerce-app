import axiosInstance from '@/lib/axios';
import Image from 'next/image';
import React from 'react'

interface ProductTypes {
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
    const products: ProductTypes[] = (await axiosInstance.get('/api/product'))?.data;
    console.log(products);
    
    return (
        <section>
            {products.map((product) => (
                <div key={product._id}>
                    <Image src={product.image} alt={product.name} width={300} height={300} />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <p>{product.rating}</p>
                </div>
            ))}
        </section>
    )
}

export default NewArrivals
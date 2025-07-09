import React from 'react'
import { ProductTypes } from '../templates/NewArrivals'
import Image from 'next/image'
import { Star } from 'lucide-react'

const ProductCard: React.FC<ProductTypes> = ({ name, image, rating, price }) => {
    return (
        <div className='w-1/4'>
            <div className='relative w-full h-[300px]'>
                <Image
                    src={image}
                    alt={name}
                    fill
                    className='rounded-2xl'
                />
            </div>
            <h4 className='mt-4 text-xl font-semibold line-clamp-1'>{name || ''}</h4>
            <div className="flex items-center mt-2">
                <Star className='size-5 text-[#FFC633] fill-[#FFC633] mr-2' />
                <span>{`${rating || 0}/5`}</span>
            </div>
            <p className='text-2xl font-semibold mt-2'>{`$${price || 0}`}</p>
        </div>
    )
}

export default ProductCard
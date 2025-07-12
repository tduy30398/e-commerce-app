import React from 'react'
import { ProductTypes } from '../templates/NewArrivals'
import Image from 'next/image'
import { Star } from 'lucide-react'

const ProductCard: React.FC<ProductTypes> = ({ name, image, rating, price }) => {
    return (
        <div>
            <div className='relative w-[160px] h-[160px] sm:w-[240px] sm:h-[240px]'>
                <Image
                    src={image}
                    alt={name}
                    fill
                    className='rounded-2xl'
                />
            </div>
            <h4 className='mt-4 text-xs md:text-xl font-semibold line-clamp-1'>{name || ''}</h4>
            <div className="flex items-center mt-2">
                <Star className='size-4 md:size-5 text-[#FFC633] fill-[#FFC633] mr-2' />
                <span className='text-xs md:text-base'>{`${rating || 0}/5`}</span>
            </div>
            <p className='tex-base md:text-2xl font-semibold mt-2'>{`$${price || 0}`}</p>
        </div>
    )
}

export default ProductCard
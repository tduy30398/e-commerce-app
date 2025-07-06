import { ROUTES } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'
import StatisticCounter from '../organisms/StatisticCounter'
import Image from 'next/image';

const HomeBanner = () => {
    return (
        <section className='px-4 lg:px-24 pt-10 bg-flash-white flex items-center flex-col lg:flex-row'>
            <div className="sm:pb-14 lg:w-[calc((596/1240)*100%)]">
                <h1 className="text-4xl lg:text-5xl min-[1370px]:text-6xl font-black">
                    FIND EVERYTHING <br /> THAT MATCHES <br /> YOUR STYLE
                </h1>
                <p className='mt-5 lg:mt-8 text-base'>
                    Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                </p>
                <Link href={ROUTES.TRENDING} className='main-button block w-full sm:w-fit mt-6 sm:mt-8 text-center'>
                    Shop Now
                </Link>
                < StatisticCounter />
            </div>
            <div className="lg:w-[calc((644/1240)*100%)] flex-center relative">
                <Image
                    src={'/images/home-banner.png'}
                    alt='banner'
                    width={780 * 0.8}
                    height={896 * 0.8}
                />
            </div>
        </section>
    )
}

export default HomeBanner
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface NavigateListProps {
    title: string;
    link: string
}

const Header = () => {
    const navigateList: NavigateListProps[] = [
        {
            title: 'Trending',
            link: '/trending'
        },
        {
            title: 'Start Selling',
            link: '/selling'
        },
        {
            title: 'Download',
            link: '/app'
        }
    ];

    return (
        <div className='h-[96px] px-[100px] py-6 flex items-center'>
            <Link href={'/'}>
                <Image
                    src='/icons/mainLogo.svg'
                    alt='logo'
                    width={160}
                    height={22}
                />
            </Link>
            <div className="ml-10 flex items-center">
                {navigateList.map((item, index) => (
                    <Link key={index} href={item.link} className='ml-6 text-black font-medium text-base'>
                        {item.title}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Header
'use client';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Input } from '../ui/input';
import { Search, ShoppingCart, X } from 'lucide-react';
import HamburgerMenu from '../molecules/HamburgerMenu';

interface NavigateListProps {
    title: string;
    link: string
}

export const navigateList: NavigateListProps[] = [
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

const Header = () => {
    const [showSearch, setShowSearch] = React.useState<boolean>(false);

    return (
        <header className='relative h-[72px] xl:h-[96px] px-4 xl:px-[100px] py-6 flex items-center justify-between sm:justify-start'>
            <div className="shrink-0 flex items-center">
                <div className="mr-4 h-6 sm:hidden">
                    <HamburgerMenu />
                </div>
                <Link href={'/'} className='w-[126px] h-[18px] sm:w-[160px] sm:h-[22px]'>
                    <Image
                        src='/icons/mainLogo.svg'
                        alt='logo'
                        width={160}
                        height={22}
                    />
                </Link>
                <div className="ml-10 hidden lg:flex items-center">
                    {navigateList.map((item, index) => (
                        <Link key={index} href={item.link} className='ml-6 text-black font-medium text-base hover:underline'>
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="relative hidden sm:block w-full ml-10">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                    type="search"
                    placeholder="Search for products..."
                    className="pl-10 bg-[#f0f0f0] rounded-3xl h-[48px]"
                />
            </div>
            <div className="flex items-center sm:ml-10 gap-4 shrink-0">
                <div onClick={() => setShowSearch(true)} className='sm:hidden'>
                    <Search className='size-6 cursor-pointer' />
                </div>
                <Link href={'/cart'}>
                    <ShoppingCart className='size-6 cursor-pointer' />
                </Link>
                <Link href={'/profile'}>
                    <Image
                        src='/icons/profile.svg'
                        alt='profile'
                        width={24}
                        height={24}
                    />
                </Link>
            </div>
            {showSearch && <div className="absolute left-0 top-0 right-0 bottom-0 p-4 flex items-center bg-white">
                <Input
                    type="search"
                    placeholder="Search for products..."
                    className="bg-[#f0f0f0] rounded-3xl h-[36px]"
                />
                <X className="size-5 ml-3" onClick={() => setShowSearch(false)} />
            </div>}
        </header>
    )
}

export default Header
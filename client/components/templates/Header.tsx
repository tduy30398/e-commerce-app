import { navigateList } from '@/public/dummy/general';
import { Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import HamburgerMenu from '../molecules/HamburgerMenu';
import MobileHeaderInput from '../molecules/MobileHeaderInput';
import { Input } from '../ui/input';
import { ROUTES } from '@/lib/constants';

const Header = () => {
    return (
        <header className='relative h-[72px] xl:h-24 px-4 xl:px-24 py-6 flex items-center justify-between sm:justify-start'>
            <div className="shrink-0 flex items-center">
                <div className="mr-4 h-6 sm:hidden">
                    <HamburgerMenu />
                </div>
                <Link href={ROUTES.HOME} className='w-[126px] h-[18px] sm:w-[160px] sm:h-[22px]'>
                    <Image
                        src='/icons/main-logo.svg'
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
                    className="pl-10 bg-flash-white rounded-3xl h-[48px]"
                />
            </div>
            <div className="flex items-center sm:ml-10 gap-4 shrink-0">
                <div className='sm:hidden size-6'>
                    <MobileHeaderInput />
                </div>
                <Link href={ROUTES.CART}>
                    <ShoppingCart className='size-6 cursor-pointer' />
                </Link>
                <Link href={ROUTES.PROFILE}>
                    <Image
                        src='/icons/profile.svg'
                        alt='profile'
                        width={24}
                        height={24}
                    />
                </Link>
            </div>
        </header>
    )
}

export default Header
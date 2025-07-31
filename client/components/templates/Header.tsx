import { ROUTES } from '@/lib/constants';
import { navigateList } from '@/public/dummy/general';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SearchForm from '../molecules/SearchForm';
import HamburgerMenu from '../organisms/HamburgerMenu';
import MobileSearchHeader from '../organisms/MobileSearchHeader';

const Header = () => {
  return (
    <header className="relative section-container h-[72px] xl:h-24 py-6 flex items-center justify-between sm:justify-start">
      <div className="shrink-0 flex items-center">
        <div className="mr-4 h-6 lg:hidden">
          <HamburgerMenu />
        </div>
        <Link
          href={ROUTES.HOME}
          className="relative w-[126px] h-[18px] sm:w-[160px] sm:h-[22px]"
        >
          <Image
            src="/icons/main-logo.svg"
            alt="logo"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </Link>
        <nav className="ml-10 hidden lg:flex items-center">
          {navigateList.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="ml-6 text-black font-medium text-base hover:underline"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <SearchForm />
      <div className="flex items-center sm:ml-10 gap-4 shrink-0">
        <div className="sm:hidden size-6">
          <MobileSearchHeader />
        </div>
        <Link href={ROUTES.CART}>
          <ShoppingCart className="size-6 cursor-pointer" />
        </Link>
        {/* <Link href={ROUTES.PROFILE}>
          <Image
            src="/icons/profile.svg"
            alt="profile"
            width={24}
            height={24}
          />
        </Link> */}
        <Link
          href={ROUTES.LOGIN}
          className="text-black font-medium text-base hover:underline max-md:hidden"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;

import { ROUTES } from '@/lib/constants';
import { navigateList } from '@/public/dummy/general';
import Image from 'next/image';
import Link from 'next/link';
import SearchForm from '../molecules/SearchForm';
import HamburgerMenu from '../organisms/HamburgerMenu';
import React from 'react';
import RightHeader from '../organisms/RightHeader';

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
      <RightHeader />
    </header>
  );
};

export default Header;

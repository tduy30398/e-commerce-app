'use client';

import { ROUTES } from '@/lib/constants';
import { navigateList } from '@/public/dummy/general';
import Image from 'next/image';
import Link from 'next/link';
import SearchForm from '../molecules/SearchForm';
import HamburgerMenu from '../organisms/HamburgerMenu';
import React from 'react';
import RightHeader from '../organisms/RightHeader';
import { useLocale, useTranslations } from 'next-intl';
import { getRoute } from '@/lib/utils';

const Header = () => {
  const [showHeader, setShowHeader] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const t = useTranslations();
  const locale = useLocale();

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // scrolling down
        setShowHeader(false);
      } else {
        // scrolling up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 bg-white shadow-md ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="relative section-container h-18 xl:h-24 py-6 flex items-center justify-between sm:justify-start">
        <div className="shrink-0 flex items-center">
          <div className="mr-4 h-6 lg:hidden">
            <HamburgerMenu />
          </div>
          <Link
            href={getRoute(ROUTES.HOME, locale)}
            className="relative w-[126px] h-[20px] md:w-[160px] md:h-[26px]"
          >
            <Image
              src="/images/main-logo.png"
              alt="logo"
              fill
              sizes="(max-width: 768px) 126px, 160px"
              priority
            />
          </Link>
          <nav className="ml-10 hidden lg:flex items-center">
            {navigateList.map((item) => (
              <Link
                key={item.title}
                href={getRoute(item.link, locale)}
                className="ml-6 text-black text-base hover:underline"
              >
                {t(`header.${item.title}`)}
              </Link>
            ))}
          </nav>
        </div>
        <SearchForm />
        <RightHeader />
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { navigateList } from '@/public/dummy/general';

const HamburgerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="size-6 cursor-pointer" />
      </SheetTrigger>
      <SheetContent side={'left'} className="w-auto max-w-fit px-8 py-6 -ml-4">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <nav>
          {navigateList.map((item, index) => (
            <Link key={index} href={item.link} className="ml-6 hover:underline">
              <SheetDescription className="text-black font-medium text-base">
                {item.title}
              </SheetDescription>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;

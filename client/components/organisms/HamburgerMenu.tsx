'use client';

import { logoutUserService } from '@/actions/authenticate';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ROUTES } from '@/lib/constants';
import { navigateList } from '@/public/dummy/general';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import useProfileStore from '@/store/useProfileStore';
import { useRouter } from 'next/navigation';

const HamburgerMenu = () => {
  const { accessToken } = useProfileStore();
  const router = useRouter();

  const logoutService = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (res.status === 200) {
        logoutUserService();
        toast.success('Logout successfully');
        router.push(ROUTES.HOME);
      }
    } catch {
      toast.error('Logout failed');
    }
  };

  return (
    <Sheet>
      <SheetTrigger aria-label="Open menu">
        <Menu className="size-6 cursor-pointer" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full p-6 flex flex-col justify-between"
        hideCloseIcon
      >
        <div>
          <div className="flex justify-between items-center">
            <SheetHeader className="p-0">
              <SheetTitle className="text-left">
                <div className="relative w-[126px] h-[18px]">
                  <Image
                    src="/icons/main-logo.svg"
                    alt="logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </SheetTitle>
            </SheetHeader>
            <SheetClose asChild aria-label="Close menu">
              <X className="size-6 cursor-pointer" />
            </SheetClose>
          </div>
          <nav className="mt-8">
            {navigateList.map((item, index) => (
              <SheetClose asChild key={index}>
                <Link href={item.link} className="hover:underline block">
                  <SheetDescription className="text-black font-bold text-xl">
                    {item.title}
                  </SheetDescription>
                  {navigateList.length - 1 !== index && (
                    <Separator className="my-4" />
                  )}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </div>
        <SheetClose asChild>
          {accessToken ? (
            <Button
              onClick={logoutService}
              className="w-full cursor-pointer text-center bg-black text-white text-base font-medium rounded-4xl py-3 h-12 hover:bg-black/80"
            >
              Log out
            </Button>
          ) : (
            <Link
              href={ROUTES.LOGIN}
              className="w-full cursor-pointer text-center bg-black text-white text-base font-medium rounded-4xl py-3 hover:bg-black/80"
            >
              Login
            </Link>
          )}
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;

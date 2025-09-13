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
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import useProfileStore from '@/store/useProfileStore';
import { signOut, useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { getRoute } from '@/lib/utils';
import { Link, useRouter } from '@/i18n/navigation';

const HamburgerMenu = () => {
  const { accessToken } = useProfileStore();
  const router = useRouter();
  const { data: session } = useSession();
  const t = useTranslations();
  const locale = useLocale();

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

  const logoutServiceSocial = () => {
    signOut({ callbackUrl: getRoute(ROUTES.HOME, locale) });
    toast.success('Logout successfully');
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
                <div className="relative w-[126px] h-[20px] md:w-[160px] md:h-[26px]">
                  <Image
                    src="/images/main-logo.png"
                    alt="logo"
                    fill
                    sizes="(max-width: 768px) 126px, 160px"
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
                    {t(`header.${item.title}`)}
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
          {accessToken || session ? (
            <Button
              onClick={() =>
                session ? logoutServiceSocial() : logoutService()
              }
              className="w-full cursor-pointer text-center bg-black text-white text-base rounded-4xl py-3 h-12 hover:bg-black/80"
            >
              {t('header.logout')}
            </Button>
          ) : (
            <Link
              href={ROUTES.LOGIN}
              className="w-full cursor-pointer text-center bg-black text-white text-base rounded-4xl py-3 hover:bg-black/80"
            >
              {t('header.login')}
            </Link>
          )}
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;

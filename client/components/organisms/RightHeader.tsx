'use client';

import React from 'react';
import { logoutUserService } from '@/actions/authenticate';
import { ROUTES } from '@/lib/constants';
import useProfileStore from '@/store/useProfileStore';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import MobileSearchHeader from './MobileSearchHeader';
import { signOut, useSession } from 'next-auth/react';
import { useIsMobile } from '@/hooks/use-mobile';
import { disconnectSockets, initMainSocket } from '@/lib/socket';
import axiosInstance, { setAccessTokenHeader } from '@/lib/axios';
import { AxiosResponse } from 'axios';
import ShoppingCartHeader from '../molecules/ShoppingCartHeader';
import { ProductTypes } from '@/actions/product/type';
import useCartStore from '@/store/useCartStore';
import { useLocale, useTranslations } from 'next-intl';
import { getRoute } from '@/lib/utils';
import LocaleSwitch from './LocaleSwitch';
import { Link, useRouter } from '@/i18n/navigation';

export interface ProductItemCard {
  productId: ProductTypes;
  quantity: number;
  color: number;
  size: number;
  _id: string;
}

export interface Cart {
  userId: string;
  items: ProductItemCard[];
  _id: string;
}

const RightHeader = () => {
  const { cart, setCart, clearCart } = useCartStore();
  const { profileData, accessToken } = useProfileStore();
  const router = useRouter();
  const { data: session } = useSession();
  const isMobile = useIsMobile();
  const t = useTranslations('header');
  const locale = useLocale();

  const logoutService = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (res.status === 200) {
        logoutUserService();
        toast.success('Logout successfully');
        router.replace(ROUTES.HOME);
      }
    } catch {
      toast.error('Logout failed');
    }
  };

  const logoutServiceSocial = () => {
    signOut({ callbackUrl: getRoute(ROUTES.HOME, locale) });
    toast.success('Logout successfully');
  };

  React.useEffect(() => {
    if (!accessToken) {
      disconnectSockets();
      clearCart();
      return;
    }

    setAccessTokenHeader(accessToken);

    const fetchCart = async () => {
      const cartRes: AxiosResponse<Cart> = await axiosInstance.get('cart');
      setCart(cartRes.data);
    };

    fetchCart();

    const mainSocket = initMainSocket(accessToken || '');

    // Listen for cart updates
    mainSocket.on('cart:updated', (updatedCart: Cart) => {
      setCart(updatedCart);
    });

    return () => {
      mainSocket.off('cart:updated');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <div className="flex items-center sm:ml-10 gap-4 shrink-0">
      <div className="sm:hidden size-6">
        <MobileSearchHeader />
      </div>
      <LocaleSwitch />
      <ShoppingCartHeader cart={cart} />
      {accessToken || session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer border border-gray-300 size-9">
              {(profileData?.avatar || session?.user?.image) && (
                <AvatarImage
                  className="object-cover"
                  src={profileData?.avatar || session?.user?.image || ''}
                  alt="avatar"
                />
              )}
              <AvatarFallback className="bg-[#00ffff]">
                {profileData?.name?.charAt(0) ||
                  session?.user?.name?.charAt(0) ||
                  ''}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={isMobile ? 'mr-2' : 'w-40'}
            align="center"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="text-md cursor-pointer">
                <Link href={session ? ROUTES.PROFILE_OAUTH : ROUTES.PROFILE}>
                  {t('profile')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                variant="outline"
                onClick={() =>
                  session ? logoutServiceSocial() : logoutService()
                }
                className="text-md cursor-pointer bg-transparent border-none shadow-none w-full text-black justify-start outline-none hover:bg-transparent"
              >
                {t('logout')}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href={ROUTES.LOGIN}
          className="text-black text-base hover:underline max-md:hidden"
        >
          {t('login')}
        </Link>
      )}
    </div>
  );
};

export default RightHeader;

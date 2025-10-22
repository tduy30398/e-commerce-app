'use client';

import { logoutUserService } from '@/actions/authenticate';
import { ProductTypes } from '@/actions/product/type';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useRouter } from '@/i18n/navigation';
import axiosInstance, { setAccessTokenHeader } from '@/lib/axios';
import { ROUTES } from '@/lib/constants';
import { disconnectSockets, initMainSocket } from '@/lib/socket';
import useCartStore from '@/store/useCartStore';
import useProfileStore from '@/store/useProfileStore';
import { AxiosResponse } from 'axios';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';
import ShoppingCartHeader from '../molecules/ShoppingCartHeader';
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
import LocaleSwitch from './LocaleSwitch';
import MobileSearchHeader from './MobileSearchHeader';

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
  const isMobile = useIsMobile();
  const t = useTranslations('header');

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
    <div className="flex items-center sm:ml-10 gap-3 md:gap-4 shrink-0">
      <div className="sm:hidden size-6">
        <MobileSearchHeader />
      </div>
      <LocaleSwitch />
      <ShoppingCartHeader cart={cart} />
      {accessToken ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer border border-gray-300 size-9">
              {profileData?.avatar && (
                <AvatarImage
                  className="object-cover"
                  src={profileData?.avatar || ''}
                  alt="avatar"
                />
              )}
              <AvatarFallback className="bg-[#00ffff]">
                {profileData?.name?.charAt(0) || ''}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={isMobile ? 'mr-2' : 'w-40'}
            align="center"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="text-md cursor-pointer">
                <Link href={ROUTES.PROFILE}>{t('profile')}</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                variant="outline"
                onClick={() => logoutService()}
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

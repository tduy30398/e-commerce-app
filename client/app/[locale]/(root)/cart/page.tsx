'use client';

import React from 'react';
import ProductCart from '@/components/molecules/ProductCart';
import SummaryOrder from '@/components/templates/SummaryOrder';
import { ROUTES } from '@/lib/constants';
import useCartStore from '@/store/useCartStore';
import Image from 'next/image';
import { ProductItemCard } from '@/components/organisms/RightHeader';
import CartPageSkeleton from '@/components/organisms/CartPageSkeleton';
import useProfileStore from '@/store/useProfileStore';
// import { useSession } from 'next-auth/react';
import { Link, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const CartPage = () => {
  const { cart } = useCartStore();
  const { accessToken, isLoggingOut, hydrated } = useProfileStore();
  // const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations('cart');

  const [products, setProducts] = React.useState<ProductItemCard[]>(
    cart?.items || []
  );

  const handleQuantityChange = (id: string, quantity: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.productId._id === id ? { ...p, quantity } : p))
    );
  };

  const total = React.useMemo(
    () =>
      products.reduce(
        (sum, p) =>
          sum +
          (p.productId.promotionalPrice || p.productId.price) * p.quantity,
        0
      ),
    [products]
  );

  React.useEffect(() => {
    if (!cart) return;
    setProducts(cart.items);
  }, [cart]);

  React.useEffect(() => {
    if (!hydrated) return;

    if (!accessToken && !isLoggingOut) {
      router.replace(ROUTES.LOGIN);
    }
  }, [accessToken, router, isLoggingOut, hydrated]);

  if (!cart) {
    return <CartPageSkeleton />;
  }

  return (
    <div className="section-container mb-36">
      <div className="mt-5 lg:mt-9">
        <h1 className="text-3xl md:text-4xl font-black uppercase">
          {t('title')}
        </h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 mt-4 md:mt-6">
            <div className="flex flex-col col-span-1 lg:col-span-6 border border-black/10 rounded-2xl p-4 md:p-6 h-fit">
              {products.map((item) => (
                <ProductCart
                  key={item._id}
                  data={item}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
            <SummaryOrder total={total} />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="relative size-40 overflow-hidden">
              <Image
                src="/images/empty.png"
                alt="empty"
                fill
                className="object-contain"
                sizes="160px"
              />
            </div>
            <p className="text-base text-gray-400">{t('emptyCart')}</p>
            <Link
              href={ROUTES.PRODUCT}
              className="main-button rounded-xl! mt-4"
            >
              {t('shopping')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

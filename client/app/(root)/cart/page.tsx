'use client';

import React from 'react';
import ProductCart from '@/components/molecules/ProductCart';
import SummaryOrder from '@/components/templates/SummaryOrder';
import { ROUTES } from '@/lib/constants';
import useCartStore from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { ProductItemCard } from '@/components/organisms/RightHeader';
import CartPageSkeleton from '@/components/organisms/CartPageSkeleton';
import useProfileStore from '@/store/useProfileStore';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const CartPage = () => {
  const { cart } = useCartStore();
  const { accessToken } = useProfileStore();
  const { data: session } = useSession();
  const router = useRouter();

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
    if (!accessToken && !session) {
      router.push(ROUTES.HOME);
    };
  }, [accessToken, session, router]);

  if (!cart) {
    return <CartPageSkeleton />;
  }

  return (
    <div className="section-container mb-36">
      <div className="mt-5 lg:mt-9">
        <h1 className="text-4xl font-black">SHOPPING CART</h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 mt-6">
            <div className="flex flex-col col-span-1 lg:col-span-6 border border-black/10 rounded-2xl p-4 md:p-6 h-fit">
              {products.map((item) => (
                <ProductCart
                  key={item.productId._id}
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
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <p className="text-base font-medium text-gray-400">
              Your shopping cart is empty
            </p>
            <Link href={ROUTES.HOME} className="main-button rounded-xl! mt-4">
              Go Shopping Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

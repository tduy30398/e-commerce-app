import React from 'react';
import { ROUTES } from '@/lib/constants';
import { getAllProducts } from '@/actions/product';
import RelatedProduct from '../organisms/RelatedProduct';
import { Link } from '@/i18n/navigation';

const PAGE_SIZE = 4;

const NewArrivals = async () => {
  const products = await getAllProducts({ limit: PAGE_SIZE });

  return (
    <section className="section-container flex flex-col items-center mt-12 md:mt-18 mb-36">
      <RelatedProduct products={products.data} title="NEW ARRIVALS" />
      <Link
        href={ROUTES.PRODUCT}
        className="max-md:w-full text-center text-base text-black px-8 md:px-16 py-2 md:py-4 border border-gray-300 rounded-full hover:bg-gray-100 max-sm:text-center"
      >
        View All
      </Link>
    </section>
  );
};

export default NewArrivals;

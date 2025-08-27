/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { partnerLogos } from '@/public/dummy/general';
import Autoplay from 'embla-carousel-autoplay';
import useProfileStore from '@/store/useProfileStore';

const PartnerCarousel = () => {
  const { finishLogout } = useProfileStore();

  React.useEffect(() => {
    finishLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-black h-20 sm:h-30 py-6 sm:py-10">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {partnerLogos.map((partner, index) => (
            <CarouselItem key={index} className="basis-1/4">
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 object-contain select-none mx-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default PartnerCarousel;

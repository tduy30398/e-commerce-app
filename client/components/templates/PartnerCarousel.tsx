/* eslint-disable @next/next/no-img-element */
'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import Slider from 'react-slick';
import { partnerLogos } from '@/public/dummy/general';

const PartnerCarousel: React.FC = () => {
  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10,
    speed: 8000,
    cssEase: 'linear',
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
    ],
  };

  return (
    <section className="bg-black h-20 sm:h-[122px] py-6 sm:py-10">
      <Slider {...settings}>
        {partnerLogos.map((partner, index) => (
          <div key={index}>
            <div className="flex justify-center items-center max-sm:mx-4">
              <img src={partner.logo} alt={partner.name} />
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default PartnerCarousel;

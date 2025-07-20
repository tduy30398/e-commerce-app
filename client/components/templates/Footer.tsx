/* eslint-disable @next/next/no-img-element */
import { footerDummy, paymentMethods } from '@/public/dummy/general';
import { Facebook, Github, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="pt-44 lg:pt-36 bg-flash-white">
      <div className="section-container flex flex-col xl:flex-row items-start gap-6 lg:gap-20 pb-[50px] border-b-[1px] border-gray-300">
        <div className="xl:w-[calc((3/12)*100%)] mt-[6px]">
          <Image
            src="/icons/main-logo.svg"
            alt="logo"
            width={142}
            height={22}
            className="w-[126px] h-[18px] sm:w-[142px] sm:h-[22px]"
          />
          <p className="mt-6 text-base">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div className="flex items-center mt-5 md:mt-9 gap-2">
            <Link
              href="https://twitter.com"
              target="_blank"
              className="p-2 rounded-full border bg-flash-white border-gray-500"
            >
              <Twitter className="size-5" />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              className="p-2 rounded-full border bg-flash-white border-gray-500"
            >
              <Facebook className="size-5" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="p-2 rounded-full border bg-flash-white border-gray-500"
            >
              <Instagram className="size-5" />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              className="p-2 rounded-full border bg-flash-white border-gray-500"
            >
              <Github className="size-5" />
            </Link>
          </div>
        </div>
        <div className="flex items-start w-full flex-wrap">
          {footerDummy.map((item, index) => (
            <div
              key={index}
              className={`w-1/2 lg:w-1/4 ${index > 1 && 'max-lg:mt-4'}`}
            >
              <h3 className="text-xl font-semibold uppercase">{item.title}</h3>
              <ul>
                {item.links.map((link, index) => (
                  <li key={index} className="mt-4">
                    <Link
                      href={link.link}
                      className="text-base text-gray-800 hover:underline"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="pb-20 mt-4 section-container flex-col md:flex-row flex items-center justify-between">
        <p>Shop.co © 2000-2023, All Rights Reserved</p>
        <div className="flex items-center gap-2 md:gap-3 max-md:mt-4">
          {paymentMethods.map((item, index) => (
            <div
              key={index}
              className="px-4 bg-white rounded-[10px] h-6 md:h-9 flex items-center"
            >
              <img src={item.logo} alt={item.name} width={34} height={15} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

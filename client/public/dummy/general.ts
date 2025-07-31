import { ROUTES } from '@/lib/constants';

interface NavigateListProps {
  title: string;
  link: string;
}

interface StatisticsProps {
  quantity: number;
  title: string;
}

export const navigateList: NavigateListProps[] = [
  {
    title: 'Products',
    link: ROUTES.PRODUCT,
  },
  {
    title: 'Download',
    link: '/app',
  },
  {
    title: 'Dashboard',
    link: ROUTES.ADMINPRODUCT,
  },
];

export const statistics: StatisticsProps[] = [
  {
    quantity: 200,
    title: 'International Brands',
  },
  {
    quantity: 2000,
    title: 'Quality Products',
  },
  {
    quantity: 30000,
    title: 'Happy Customers',
  },
];

export const partnerLogos = [
  { name: 'Versace', logo: '/images/partners/versace.png' },
  { name: 'Zara', logo: '/images/partners/zara.png' },
  { name: 'Gucci', logo: '/images/partners/gucci.png' },
  { name: 'Prada', logo: '/images/partners/prada.png' },
  { name: 'Calvin', logo: '/images/partners/calvin.png' },
];

export const footerDummy = [
  {
    title: 'Company',
    links: [
      {
        title: 'About',
        link: '/about',
      },
      {
        title: 'Features',
        link: '/features',
      },
      {
        title: 'Works',
        link: '/works',
      },
      {
        title: 'Careers',
        link: '/careers',
      },
    ],
  },
  {
    title: 'Help',
    links: [
      {
        title: 'Customer Support',
        link: '/customer-support',
      },
      {
        title: 'Delivery Details',
        link: '/delivery-details',
      },
      {
        title: 'Terms & Conditions',
        link: '/terms-conditions',
      },
      {
        title: 'Privacy Policy',
        link: '/privacy-policy',
      },
    ],
  },
  {
    title: 'FAQs',
    links: [
      {
        title: 'Account',
        link: '/account',
      },
      {
        title: 'Payment',
        link: '/payment',
      },
      {
        title: 'Order',
        link: '/order',
      },
      {
        title: 'Shipping',
        link: '/shipping',
      },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        title: 'Free eBooks',
        link: '/free-ebooks',
      },
      {
        title: 'Development Tutorial',
        link: '/development-tutorial',
      },
      {
        title: 'How to - Blog',
        link: '/how-to-blog',
      },
      {
        title: 'Youtube Playlist',
        link: '/youtube-playlist',
      },
    ],
  },
];

export const paymentMethods = [
  {
    name: 'Apple',
    logo: '/icons/payment/applePay.svg',
  },
  {
    name: 'Visa',
    logo: '/icons/payment/visa.svg',
  },

  {
    name: 'Mastercard',
    logo: '/icons/payment/mastercard.svg',
  },
  {
    name: 'Paypal',
    logo: '/icons/payment/paypal.svg',
  },
  {
    name: 'Google',
    logo: '/icons/payment/googlePay.svg',
  },
];

export const filterRatings = [
  {
    title: 'All ratings',
    value: 'all',
  },
  {
    title: '5 stars',
    value: '5',
  },
  {
    title: '4 stars and above',
    value: '4',
  },
  {
    title: '3 stars and above',
    value: '3',
  },
  {
    title: '2 stars and above',
    value: '2',
  },
  {
    title: '1 star and above',
    value: '1',
  },
];

export const socialData = [
  {
    name: 'Google',
    icon: '/icons/google.svg',
  },
  {
    name: 'Facebook',
    icon: '/icons/facebook.svg',
  },
  {
    name: 'GitHub',
    icon: '/icons/github.svg',
  },
];

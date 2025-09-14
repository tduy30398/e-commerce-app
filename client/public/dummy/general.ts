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
    title: 'products',
    link: ROUTES.PRODUCT,
  },
  {
    title: 'download',
    link: '/',
  },
  {
    title: 'dashboard',
    link: ROUTES.ADMIN_PRODUCT,
  },
];

export const statistics: StatisticsProps[] = [
  {
    quantity: 200,
    title: 'brands',
  },
  {
    quantity: 2000,
    title: 'products',
  },
  {
    quantity: 30000,
    title: 'customers',
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
        link: '/',
      },
      {
        title: 'Features',
        link: '/',
      },
      {
        title: 'Works',
        link: '/',
      },
      {
        title: 'Careers',
        link: '/',
      },
    ],
  },
  {
    title: 'Help',
    links: [
      {
        title: 'Customer Support',
        link: '/',
      },
      {
        title: 'Delivery Details',
        link: '/',
      },
      {
        title: 'Terms & Conditions',
        link: '/',
      },
      {
        title: 'Privacy Policy',
        link: '/',
      },
    ],
  },
  {
    title: 'FAQs',
    links: [
      {
        title: 'Account',
        link: '/',
      },
      {
        title: 'Payment',
        link: '/',
      },
      {
        title: 'Order',
        link: '/',
      },
      {
        title: 'Shipping',
        link: '/',
      },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        title: 'Free eBooks',
        link: '/',
      },
      {
        title: 'Development Tutorial',
        link: '/',
      },
      {
        title: 'How to - Blog',
        link: '/',
      },
      {
        title: 'Youtube Playlist',
        link: '/',
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

export const selectorData = [
  {
    label: 'small',
    value: 1,
  },
  {
    label: 'medium',
    value: 2,
  },
  {
    label: 'large',
    value: 3,
  },
];

export const colorSelectorData = [
  {
    color: 'fb2c36',
    name: 'Red',
    value: 1,
  },
  {
    color: '86a0dd',
    name: 'Blue',
    value: 2,
  },
  {
    color: 'a6ee39',
    name: 'Green',
    value: 3,
  },
];

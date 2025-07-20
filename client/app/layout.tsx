import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

import localFont from 'next/font/local';
import ProgressBarWraper from '@/components/organisms/ProgressBarWraper';

const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/satoshi/Satoshi-Black.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-BlackItalic.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Light.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-LightItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Regular.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Italic.woff2',
      weight: '300',
      style: 'italic',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shop Commerce',
  description: 'Buy everything here',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.variable}>
        <ProgressBarWraper />
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}

'use client';

import NProgress from 'nprogress';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    NProgress.start();

    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}

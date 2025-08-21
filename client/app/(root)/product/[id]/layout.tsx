import { ReactNode } from 'react';

export const experimental_ppr = true;

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <div className="section-container mb-36">{children}</div>;
}

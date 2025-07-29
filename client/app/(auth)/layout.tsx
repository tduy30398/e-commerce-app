import React from 'react';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex-center bg-[linear-gradient(90deg,_rgba(153,151,84,1)_0%,_rgba(87,199,186,1)_33%,_rgba(140,92,154,1)_66%,_rgba(52,52,146,1)_100%)] min-h-screen">
      {children}
    </div>
  );
};

export default Layout;

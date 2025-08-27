import { DynamicBreadcrumb } from '@/components/templates/DynamicBreadcrumb';
import FooterForm from '@/components/templates/FooterForm';
import Header from '@/components/templates/Header';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="pt-18 xl:pt-24">
      <Header />
      <DynamicBreadcrumb />
      {children}
      <FooterForm />
    </main>
  );
};

export default Layout;

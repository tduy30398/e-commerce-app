import FooterForm from '@/components/templates/FooterForm';
import Header from '@/components/templates/Header';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <Header />
      {children}
      <FooterForm />
    </main>
  );
};

export default Layout;

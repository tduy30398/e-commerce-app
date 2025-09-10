import HomeBanner from '@/components/templates/HomeBanner';
import NewArrivals from '@/components/templates/NewArrivals';
import PartnerCarousel from '@/components/templates/PartnerCarousel';

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const locale = await params;

  return (
    <>
      <HomeBanner />
      <PartnerCarousel />
      <NewArrivals locale={locale?.locale || ''} />
    </>
  );
};

export default Home;

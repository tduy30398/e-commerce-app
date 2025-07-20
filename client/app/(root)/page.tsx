import PartnerCarousel from '@/components/templates/PartnerCarousel';
import HomeBanner from '@/components/templates/HomeBanner';
import NewArrivals from '@/components/templates/NewArrivals';

const Home = () => {
  return (
    <>
      <HomeBanner />
      <PartnerCarousel />
      <NewArrivals />
    </>
  );
};

export default Home;

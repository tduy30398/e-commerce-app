import HomeBanner from '@/components/templates/HomeBanner';
import NewArrivals from '@/components/templates/NewArrivals';
import PartnerCarousel from '@/components/templates/PartnerCarousel';

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

import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CarSection from '@/components/CarSection';
import OutroSection from '@/components/OutroSection';

const Index = () => {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <CarSection />
      <OutroSection />
    </>
  );
};

export default Index;

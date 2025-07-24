import { Slider } from '@/components/DashboardPage/Carousel/Slider';
import { HeroSection } from '@/components/DashboardPage/HeroSection';
import { Container } from '@/components/grid/Container';
import { Spacer } from '@/components/ui/spacer';
import { CAROUSEL_DATA } from '@/lib/consts';

export default async function Home() {
  return (
    <div className='w-full h-full'>
      <Container>
        <HeroSection />
        <Spacer sm={6} md={6} lg={6} />

        <Slider title='App Gallery' carouselData={CAROUSEL_DATA} />
      </Container>
    </div>
  );
}

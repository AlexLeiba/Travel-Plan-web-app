import { Slider } from '@/components/DashboardPage/Carousel/Slider';
import { HeroSection } from '@/components/DashboardPage/HeroSection';
import { Container } from '@/components/grid/Container';
import { Spacer } from '@/components/ui/spacer';
import { CAROUSEL_DATA } from '@/lib/consts';

export default async function Home() {
  return (
    <>
      <Container>
        <HeroSection />
        <Spacer sm={12} md={12} lg={24} />

        <Slider carouselData={CAROUSEL_DATA} />
      </Container>
    </>
  );
}

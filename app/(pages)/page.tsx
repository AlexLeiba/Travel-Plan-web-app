import { Carousel } from '@/components/DashboardPage/Carousel/Carousel';
import { HeroSection } from '@/components/DashboardPage/HeroSection';
import MyTrips from '@/components/DashboardPage/MyTrips';
import { Container } from '@/components/grid/Container';
import { Spacer } from '@/components/ui/spacer';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <>
      <Container>
        <HeroSection />
        <Spacer sm={12} md={12} lg={24} />

        <Suspense>
          <MyTrips />
        </Suspense>

        <Spacer sm={12} md={12} lg={24} />

        <Suspense>
          <Carousel />
        </Suspense>
      </Container>
    </>
  );
}

import { Suspense } from 'react';
import { Carousel } from '@/components/DashboardPage/Carousel/Carousel';
import { MyTripsStats } from '@/components/DashboardPage/MyTripsStats';
import { Container } from '@/components/grid/Container';
import { Spacer } from '@/components/ui/spacer';

export default async function Dashboard() {
  return (
    <>
      <Container>
        <h1>Dashboard</h1>
        <Spacer sm={6} md={6} lg={12} />

        <Suspense>
          <MyTripsStats />
        </Suspense>

        <Spacer sm={12} md={12} lg={24} />

        <Suspense>
          <Carousel />
        </Suspense>
      </Container>
    </>
  );
}

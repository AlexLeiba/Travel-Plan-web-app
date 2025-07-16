import { HeroSection } from '@/components/DashboardPage/HeroSection';
import MyTrips from '@/components/DashboardPage/MyTrips';
import { Container } from '@/components/grid/Container';
import { Spacer } from '@/components/ui/spacer';
import { getTripsAction } from '@/lib/server-actions/get-trips';

export default async function Home() {
  const trips = await getTripsAction();

  return (
    <Container>
      <HeroSection />
      <Spacer sm={12} md={12} lg={24} />
      <MyTrips trips={trips} />
    </Container>
  );
}

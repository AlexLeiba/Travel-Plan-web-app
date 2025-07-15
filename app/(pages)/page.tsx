import { HeroSection } from '@/components/DashboardPage/HeroSection';
import { Container } from '@/components/grid/Container';
import { Spacer } from '@/components/ui/spacer';

export default function Home() {
  return (
    <Container>
      <HeroSection />
      <Spacer sm={12} md={12} lg={24} />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi,
        alias!
      </p>
    </Container>
  );
}

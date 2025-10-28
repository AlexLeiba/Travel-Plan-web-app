import { Suspense } from "react";
import { Carousel } from "@/components/DashboardPage/Carousel/Carousel";
import { MyTripsStats } from "@/components/DashboardPage/MyTripsStats";
import { Container } from "@/components/grid/Container";
import { Spacer } from "@/components/ui/spacer";
import { MyTripsStatsSkeleton } from "@/components/DashboardPage/MyTripsStatsSkeleton";
import { CarouselSkeleton } from "@/components/DashboardPage/Carousel/CarouselSkeleton";

export const metadata = {
  title: "Travel-Plan  / Dashboard",
  description: "Travel ,Plan and Enjoy your trips",
};

export default async function Dashboard() {
  return (
    <>
      <Container>
        <Suspense fallback={<MyTripsStatsSkeleton />}>
          <MyTripsStats />
        </Suspense>

        <Spacer sm={8} md={8} lg={8} />

        <Suspense fallback={<CarouselSkeleton />}>
          <Carousel />
        </Suspense>
      </Container>
    </>
  );
}

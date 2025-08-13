import { Suspense } from "react";
import { Carousel } from "@/components/DashboardPage/Carousel/Carousel";
import { MyTripsStats } from "@/components/DashboardPage/MyTripsStats";
import { Container } from "@/components/grid/Container";
import { Spacer } from "@/components/ui/spacer";
import { MyTripsStatsSkeleton } from "@/components/DashboardPage/MyTripsStatsSkeleton";
import { CarouselSkeleton } from "@/components/DashboardPage/Carousel/CarouselSkeleton";
import axios from "axios";

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

        <Spacer sm={6} md={6} lg={6} />

        <Suspense fallback={<CarouselSkeleton />}>
          <Carousel />
        </Suspense>
      </Container>
    </>
  );
}

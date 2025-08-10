import React, { Suspense } from "react";
import { Container } from "@/components/grid/Container";
import { MyTrips } from "@/components/MyTripsPage/MyTrips";
import { TripCardSkeleton } from "@/components/MyTripsPage/TripCardSkeleton";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { InputSearch } from "@/components/ui/inputSearch";
import { Spacer } from "@/components/ui/spacer";
import { Heart, Plane } from "lucide-react";
import Link from "next/link";
import { FavoriteTrip } from "@/components/MyTripsPage/FavoriteTrip";

export const metadata = {
  title: "Travel-Plan / My trips",
  description: "Travel ,Plan and Enjoy your trips",
};

async function MyTripsPage({
  searchParams,
}: {
  searchParams: Promise<{
    type: "planned" | "completed" | "all";
    search?: string;
    page?: number;
    favorite?: boolean;
    order?: "newest" | "oldest";
  }>;
}) {
  const paramType = await searchParams;

  return (
    <Container>
      <div className="flex items-end gap-4">
        <h1>My trips </h1>
        <div className="flex items-center gap-2">
          <p>
            {paramType.type &&
              (paramType.type === "planned" ||
                paramType.type === "completed") &&
              `(${paramType.type})`}
          </p>
          {paramType.type === "completed" && (
            <div className="size-2 rounded-full bg-green-500"></div>
          )}
          {paramType.type === "planned" && (
            <div className="size-2 rounded-full bg-yellow-500"></div>
          )}
        </div>
      </div>
      <Spacer sm={6} md={6} lg={12} />

      <div className="flex justify-between  md:items-center gap-4 md:flex-row  flex-col">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-4 ">
            <Dropdown title="Type" type="type" />
            <Dropdown title="Order" type="order" />
          </div>
          <div className="flex gap-4">
            <InputSearch title="Search" placeholder="Search trips" />
            <FavoriteTrip />
          </div>
        </div>
        <Link href={"/my-trips/new-trip"}>
          <Button classNameCustome="px-12 flex items-center gap-2 justify-center">
            New trip <Plane size={15} />
          </Button>
        </Link>
      </div>
      <Spacer sm={6} md={6} lg={6} />

      <Suspense fallback={<TripCardSkeleton />}>
        <MyTrips params={paramType} />
      </Suspense>
    </Container>
  );
}

export default MyTripsPage;

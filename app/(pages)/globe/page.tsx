import { GlobeWrapper } from "@/components/GlobePage/GlobeWrapper";
import { Container } from "@/components/grid/Container";
import { Spacer } from "@/components/ui/spacer";
import { getLocationsAction } from "@/lib/server-actions/get-locations";
import React from "react";

export const metadata = {
  title: "Travel-Plan / Globe",
  description: "Travel ,Plan and Enjoy your trips",
};

async function GlobePage() {
  const locationsData = await getLocationsAction();

  return (
    <Container>
      <div className="flex items-end ">
        <h2 className="font-[family-name:var(--font-playwrite)]">
          Your Travel Journey
        </h2>
      </div>
      <Spacer sm={6} md={6} lg={6} />
      <GlobeWrapper locationsData={locationsData} />
    </Container>
  );
}

export default GlobePage;

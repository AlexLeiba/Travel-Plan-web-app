import { getTripsAction } from "@/lib/server-actions/get-trips";
import { TripsCardList } from "./TripsCardList";

type Props = {
  params: {
    type: "planned" | "completed" | "all";
    search?: string;
    page?: number;
    order?: "newest" | "oldest";
    favorite?: boolean;
  };
};

export async function MyTrips({
  params: { type, search, page, order, favorite },
}: Props) {
  console.log("first", favorite, order, search, page);
  const trips = await getTripsAction({ type, search, page, order, favorite });

  if (trips.error) {
    return <p className="text-red-500 text-center">{trips.error}</p>;
  }

  return (
    <div className="">
      <TripsCardList trips={trips || []} />
    </div>
  );
}

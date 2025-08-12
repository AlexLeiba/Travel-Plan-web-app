import React from "react";
import { getTripsStatsAction } from "@/lib/server-actions/get-trips-stats";
import { Plane } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { getServerSession } from "@/auth";
import { NextTripStats } from "./NextTripStats/NextTripStats";

export async function MyTripsStats() {
  const { data, error } = await getTripsStatsAction();
  const session = await getServerSession();

  if (error)
    return (
      <p className="text-red-500">Something went wrong, please try again</p>
    );

  if (!data || (data?.nextTrip.all && data.nextTrip.all === 0)) {
    return <div>No trips stats was found.</div>;
  }

  return (
    <div>
      <div className="flex gap-6 flex-wrap flex-col">
        <h4 className="text-2xl text-gray-300">
          Welcome back {session?.user?.name}
        </h4>

        <NextTripStats data={data} />

        <div className=" lg:items-end justify-between lg:flex-row flex md:flex-col md:items-start flex-col gap-12">
          <div className="flex gap-2 flex-wrap">
            <Link href={"/my-trips?type=all"}>
              <div className="font-normal size-[110px] p-1 hover:bg-gray-700 hover:scale-105 scale-100 transition-all bg-gray-800 flex flex-col justify-between relative">
                <div className=" flex justify-center items-center h-full ">
                  <p className="text-4xl line-clamp-1">{data?.nextTrip.all}</p>
                </div>
                <div className="flex justify-end absolute right-1 bottom-1">
                  <p className="text-xs text-gray-300">All trips</p>
                </div>
              </div>
            </Link>

            <Link href={"/my-trips?type=planned"}>
              <div className="font-normal size-[110px] p-1 bg-yellow-800 hover:bg-yellow-700 flex flex-col justify-between relative hover:scale-105 scale-100 transition-all">
                <div className=" flex justify-center items-center h-full ">
                  <p className="text-4xl line-clamp-1">{data?.planned}</p>
                </div>
                <div className="flex justify-end absolute right-1 bottom-1">
                  <p className="text-xs text-gray-300">Planned</p>
                </div>
              </div>
            </Link>

            <Link href={"/my-trips?type=completed"}>
              <div className="font-normal size-[110px] p-1 bg-green-800 hover:bg-green-700 flex flex-col justify-between relative hover:scale-105 scale-100 transition-all">
                <div className=" flex justify-center items-center h-full ">
                  <p className="text-4xl line-clamp-1"> {data?.completed}</p>
                </div>
                <div className="flex justify-end absolute right-1 bottom-1">
                  <p className="text-xs text-gray-300">Completed</p>
                </div>
              </div>
            </Link>
            <Link href={"/my-trips?favorite=true"}>
              <div className="font-normal size-[110px] p-1 bg-purple-800 hover:bg-purple-700  flex flex-col justify-between relative hover:scale-105 scale-100 transition-all">
                <div className=" flex justify-center items-center h-full ">
                  <p className="text-4xl line-clamp-1">
                    {" "}
                    {data?.nextTrip.favoriteTrips}
                  </p>
                </div>
                <div className="flex justify-end absolute right-1 bottom-1">
                  <p className="text-xs text-gray-300">Favorites</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

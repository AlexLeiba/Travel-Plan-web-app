import React from "react";
import { getTripsStatsAction } from "@/server-actions/get-trips-stats";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { NextTripStats } from "./NextTripStats/NextTripStats";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function MyTripsStats() {
  const { data, error } = await getTripsStatsAction();
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ MyTripsStats ~ session:", session);

  if (error)
    return (
      <p className="text-red-500">Something went wrong, please try again</p>
    );

  if (!data || (data?.nextTrip.all && data.nextTrip.all === 0)) {
    return <p>No trips stats was found.</p>;
  }

  return (
    <div>
      <div className="flex gap-6 flex-wrap flex-col">
        <h4 className="text-3xl dark:text-gray-300 font-[family-name:var(--font-playwrite)]">
          Welcome back {session?.user?.name}
        </h4>

        <NextTripStats data={data} />

        <div className=" lg:items-end justify-between lg:flex-row flex md:flex-col md:items-start flex-col gap-12">
          <div className="flex md:flex-row flex-col gap-2 ">
            <div className="flex gap-2">
              <Link
                href={"/my-trips?type=all"}
                className="font-normal md:size-[110px] h-[110px] w-full p-1 hover:bg-gray-700 hover:scale-105 scale-100 transition-all bg-gray-800 flex flex-col justify-between relative"
              >
                <div className=" flex justify-center items-center h-full ">
                  <p className="text-4xl line-clamp-1 text-white">
                    {data?.nextTrip.all}
                  </p>
                </div>
                <div className="flex justify-end absolute right-1 bottom-1">
                  <p className="text-xs text-gray-300">All trips</p>
                </div>
              </Link>

              <Link
                href={"/my-trips?type=planned"}
                className="font-normal md:size-[110px] h-[110px] w-full p-1 dark:bg-yellow-800 bg-yellow-200 hover:bg-yellow-700 flex flex-col justify-between relative hover:scale-105 scale-100 transition-all"
              >
                <div className=" flex justify-center items-center h-full ">
                  <p className="text-4xl line-clamp-1 dark:text-white">
                    {data?.planned}
                  </p>
                </div>
                <div className="flex justify-end absolute right-1 bottom-1">
                  <p className="text-xs dark:text-gray-300">Planned</p>
                </div>
              </Link>

              <Link
                href={"/my-trips?type=completed"}
                className="font-normal md:size-[110px] h-[110px] w-full p-1  dark:bg-green-800 bg-green-200  hover:bg-green-700 flex flex-col justify-between relative hover:scale-105 scale-100 transition-all"
              >
                <div className=" flex justify-center items-center h-full ">
                  <p className="text-4xl line-clamp-1 dark:text-white">
                    {" "}
                    {data?.completed}
                  </p>
                </div>
                <div className="flex justify-end absolute right-1 bottom-1">
                  <p className="text-xs dark:text-gray-300">Completed</p>
                </div>
              </Link>
            </div>
            <Link href={"/my-trips?favorite=true"}>
              <div className="font-normal md:size-[110px] h-[110px] w-full p-1 dark:bg-purple-800 bg-purple-200 hover:bg-purple-700  flex flex-col justify-between relative hover:scale-105 scale-100 transition-all">
                <div className=" flex justify-center items-center h-full ">
                  <p className="text-4xl line-clamp-1 ">
                    {" "}
                    {data?.nextTrip.favoriteTrips}
                  </p>
                </div>
                <div className="flex justify-end absolute right-1 bottom-1">
                  <p className="text-xs dark:text-gray-300 ">Favorites</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

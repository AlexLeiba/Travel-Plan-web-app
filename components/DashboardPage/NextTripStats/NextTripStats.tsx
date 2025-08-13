import { Spacer } from "@/components/ui/spacer";
import { Trip } from "@prisma/client";
import React, { Suspense } from "react";
import { NextTripWeather } from "./NextTripWeather";
import Link from "next/link";

type Props = {
  data: Trip & {
    nextTrip: {
      favoriteTrips: number;
      all: number;

      nextTripWeeks: number;
      nextTripDays: number;
      nextTripMonths: number;
    };
  };
};
export function NextTripStats({ data }: Props) {
  console.log("🚀 ~ NextTripStats ~ data:", data);
  return (
    <div className="dark:text-white">
      <div className="flex items-end">
        {data.nextTrip.nextTripDays === 0 ? (
          <div className="">
            <h4>You have no future trips yet.</h4>
          </div>
        ) : (
          <div>
            <div className="flex gap-2 items-end">
              <h5 className=" text-2xl">
                <span className="text-gray-300">Next trip: </span>{" "}
                {data?.location?.split(",")[0]} ,{" "}
              </h5>
              <p className="text-gray-300">
                {new Date(data.startDate).toDateString()}
              </p>
            </div>

            <Suspense>
              <NextTripWeather lat={data.lattitude} long={data.lngitude} />
            </Suspense>
          </div>
        )}
      </div>
      <Spacer size={2} />
      <div className=" flex md:flex-row flex-col gap-2  ">
        <div className="flex gap-2">
          <div className="font-normal md:size-[80px] h-[80px] w-full p-1 bg-gray-700 flex flex-col justify-between relative">
            <div className=" flex justify-center items-center h-full ">
              <p className="text-4xl line-clamp-1">
                {data.nextTrip.nextTripMonths.toString().length > 4
                  ? data.nextTrip.nextTripMonths.toString().substring(0, 4) +
                    ".."
                  : data.nextTrip.nextTripMonths}
              </p>
            </div>
            <div className="flex justify-end absolute right-1 bottom-1">
              <p className="text-xs text-gray-300">months</p>
            </div>
          </div>
          <div className="font-normal  h-[80px] w-full md:size-[80px] p-1 bg-gray-600 flex flex-col justify-between relative">
            <div className=" flex justify-center items-center h-full">
              <p className="text-4xl line-clamp-1">
                {data.nextTrip.nextTripWeeks}
              </p>
            </div>
            <div className="flex justify-end absolute right-1 bottom-1">
              <p className="text-xs text-gray-300">weeks</p>
            </div>
          </div>
          <div className="font-normal  h-[80px] w-full md:size-[80px] p-1 bg-gray-500 flex flex-col justify-between relative">
            <div className=" flex justify-center items-center h-full">
              <p className="text-4xl line-clamp-1">
                {data.nextTrip.nextTripDays}
              </p>
            </div>
            <div className="flex justify-end absolute right-1 bottom-1">
              <p className="text-xs text-gray-300">days</p>
            </div>
          </div>
        </div>
        <Link href={"/my-trips/new-trip"}>
          <div className="font-normal h-[80px] md:w-[200px] w-full p-1 scale-100 hover:scale-105 hover:bg-green-600 transition-all bg-green-800 flex flex-col justify-between relative">
            <div className=" flex justify-center items-center h-full">
              <p className="text-xl line-clamp-1">+ Add a new trip</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

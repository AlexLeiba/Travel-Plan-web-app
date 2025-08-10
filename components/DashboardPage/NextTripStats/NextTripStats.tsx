import { Spacer } from "@/components/ui/spacer";
import { Trip } from "@prisma/client";
import React, { Suspense } from "react";
import { NextTripWeather } from "./NextTripWeather";

type Props = {
  data: Trip & {
    nextTripWeeks: number;
    nextTripDays: number;
    nextTripMonths: number;
  };
};
export function NextTripStats({ data }: Props) {
  return (
    <div className="dark:text-white">
      <div className="">
        <div className="flex items-end">
          <h4 className=" text-2xl">
            <span className="text-gray-300">Next trip: </span>{" "}
            {data.location.split(",")[0]} ,{" "}
          </h4>
          <p className="text-gray-300">
            {new Date(data.startDate).toDateString()}
          </p>
        </div>
        <Suspense>
          <NextTripWeather lat={data.lattitude} long={data.lngitude} />
        </Suspense>
      </div>
      <Spacer size={2} />
      <div className=" flex gap-2 ">
        <div className="font-normal size-[110px] p-1 bg-gray-700 flex flex-col justify-between relative">
          <div className=" flex justify-center items-center h-full ">
            <p className="text-4xl line-clamp-1">
              {data.nextTripMonths.toString().length > 4
                ? data.nextTripMonths.toString().substring(0, 4) + ".."
                : data.nextTripMonths}
            </p>
          </div>
          <div className="flex justify-end absolute right-1 bottom-1">
            <p className="text-xs text-gray-300">months</p>
          </div>
        </div>
        <div className="font-normal size-[110px] p-1 bg-gray-600 flex flex-col justify-between relative">
          <div className=" flex justify-center items-center h-full">
            <p className="text-4xl line-clamp-1">{data.nextTripWeeks}</p>
          </div>
          <div className="flex justify-end absolute right-1 bottom-1">
            <p className="text-xs text-gray-300">weeks</p>
          </div>
        </div>
        <div className="font-normal size-[110px] p-1 bg-gray-500 flex flex-col justify-between relative">
          <div className=" flex justify-center items-center h-full">
            <p className="text-4xl line-clamp-1">{data.nextTripDays}</p>
          </div>
          <div className="flex justify-end absolute right-1 bottom-1">
            <p className="text-xs text-gray-300">days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

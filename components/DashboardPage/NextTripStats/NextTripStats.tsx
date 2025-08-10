"use client";
import { Spacer } from "@/components/ui/spacer";
import { Trip } from "@prisma/client";
import { Sun } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  data: Trip & {
    nextTripWeeks: number;
    nextTripDays: number;
    nextTripMonths: number;
  };
  weatherData: any;
};
export function NextTripStats({ data, weatherData }: Props) {
  const weather = weatherData?.weather[0]?.main;
  const icon = weatherData?.weather[0]?.icon;
  const temp = Math.round(weatherData?.main?.temp);

  const weatherIconUrl = getIcon(icon);
  return (
    <div className="dark:text-white">
      <div className="">
        <div className="flex items-end">
          <h4 className=" text-2xl">
            <span className="text-gray-300">Next trip: </span>{" "}
            {weatherData.name} ,{" "}
          </h4>
          <p className="text-gray-300">
            {new Date(data.startDate).toDateString()}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-gray-300">{temp} °C </p>
          <p>{weather}</p>

          {weatherIconUrl && (
            <Image
              src={weatherIconUrl}
              alt="weather-icon"
              width={50}
              height={50}
            />
          )}
        </div>
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
function getIcon(icon: string) {
  const urlIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  return urlIcon;
}

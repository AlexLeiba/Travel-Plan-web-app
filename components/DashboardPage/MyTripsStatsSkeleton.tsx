const TRIP_STATS = new Array(4).fill(null);

export function MyTripsStatsSkeleton() {
  return (
    <div className="flex gap-6 flex-wrap flex-col">
      <div className="h-8 animate-pulse bg-gray-700 w-[200px]"></div>
      <div className="h-10 animate-pulse bg-gray-700 w-[200px]"></div>
      <div className="flex gap-2 ">
        {TRIP_STATS.map((_, index) => {
          return (
            <div
              key={index + "next"}
              className="md:w-[80px] lg:w-[80px] w-full"
            >
              <div className="font-normal animate-pulse lg:size-[80px] md:size-[80px] h-[80px]  p-1 bg-gray-700 flex flex-col justify-between relative"></div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 ">
        {TRIP_STATS.map((_, index) => {
          return (
            <div
              key={index + "trip"}
              className="md:w-[110px] lg:w-[110px] w-full"
            >
              <div className="font-normal animate-pulse lg:size-[110px] md:size-[110px] h-[110px] p-1 bg-gray-800 flex flex-col justify-between relative"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const TRIP_STATS = new Array(4).fill(null);

export function MyTripsStatsSkeleton() {
  return (
    <div className="flex gap-6 flex-wrap flex-col">
      <div className="h-8 animate-pulse bg-gray-700 w-[200px]"></div>
      <div className="h-10 animate-pulse bg-gray-700 w-[200px]"></div>
      <div className="flex gap-2 flex-wrap">
        {TRIP_STATS.map((_, index) => {
          return (
            <div key={index + "next"}>
              <div className="font-normal animate-pulse size-[80px] p-1 bg-gray-700 flex flex-col justify-between relative"></div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 flex-wrap">
        {TRIP_STATS.map((_, index) => {
          return (
            <div key={index + "trip"}>
              <div className="font-normal animate-pulse size-[110px] p-1 bg-gray-800 flex flex-col justify-between relative"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

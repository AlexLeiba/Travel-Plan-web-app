export function TripCardSkeleton() {
  const skeletonData = new Array(3).fill(null);
  return (
    <>
      {skeletonData.map((_, index) => (
        <div
          key={index}
          className='mb-4 animate-pulse bg-gray-200 rounded-lg shadow-md flex  gap-4 lg:h-[250px] max-h-[400px]  overflow-hidden relative lg:flex-row flex-col '
        ></div>
      ))}
    </>
  );
}

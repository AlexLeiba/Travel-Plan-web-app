import { SORT_OPTIONS } from '@/lib/consts';

export function MyTripsStatsSkeleton() {
  return (
    <div>
      <div className='flex gap-6 flex-wrap flex-col'>
        <div className='animate-pulse h-6 bg-gray-200 w-[100px]'></div>

        <div className='flex gap-6 flex-wrap'>
          {SORT_OPTIONS.slice(0, 3).map((option) => {
            return (
              <div key={option}>
                <div className=' w-[150px] h-[64px]  flex items-center gap-2 p-4 cursor-pointer bg-gray-200 rounded-md animate-pulse  '></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

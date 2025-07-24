import React from 'react';
import { getTripsStatsAction } from '@/lib/server-actions/get-trips-stats';
import toast from 'react-hot-toast';
import { getServerUserSession } from '@/lib/getServerUserSession';
import { CheckCircle, Clock, Plane } from 'lucide-react';
import Link from 'next/link';

export async function MyTripsStats() {
  const { data, error } = await getTripsStatsAction();
  const session = await getServerUserSession();

  if (error) {
    toast.error(error);
  }
  if (!data || (data?.all && data.all === 0)) {
    return <div>No trips stats was found.</div>;
  }
  return (
    <div>
      <div className='flex gap-6 flex-wrap flex-col'>
        <h3>Welcome back {session?.user?.name}</h3>

        <div className='flex gap-6 flex-wrap'>
          <Link href={'/my-trips?type=all'}>
            <div className='flex items-center gap-2 p-4 cursor-pointer bg-green-200  rounded-md hover:bg-green-400 hover:scale-105 scale-100 transition-all duration-300 ease-in-out'>
              <Plane size={20} />
              <h5 className='dark:text-black'>Trips : {data?.all}</h5>
            </div>
          </Link>

          <Link href={'/my-trips?type=planned'}>
            <div className='flex items-center gap-2  p-4 cursor-pointer bg-yellow-200 rounded-md hover:bg-yellow-400 hover:scale-105 scale-100 transition-all duration-300 ease-in-out'>
              <Clock size={20} />
              <h5 className='dark:text-black'>Planned : {data?.planned}</h5>
            </div>
          </Link>

          <Link href={'/my-trips?type=completed'}>
            <div className='flex items-center gap-2  p-4 cursor-pointer bg-purple-200 rounded-md hover:bg-purple-400 hover:scale-105 scale-100 transition-all duration-300 ease-in-out'>
              <CheckCircle size={20} />
              <h5 className='dark:text-black'>Completed : {data?.completed}</h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

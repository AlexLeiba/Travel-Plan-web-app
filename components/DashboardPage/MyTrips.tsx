import React from 'react';
import { getTripsStatsAction } from '@/lib/server-actions/get-trips-stats';
import toast from 'react-hot-toast';
import { getServerUserSession } from '@/lib/getServerUserSession';
import { CheckCircle, Clock, Plane } from 'lucide-react';

async function MyTrips() {
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
      {/* <h2>Welcome back {user?.name}</h2> */}
      <div className='flex gap-6 flex-wrap flex-col'>
        <h3>Welcome back {session?.user?.name}</h3>

        <div className='flex gap-6 flex-wrap'>
          <div className='flex items-center gap-2 p-4 cursor-pointer bg-green-200 rounded-md hover:bg-green-400 hover:scale-105 scale-100 transition-all duration-300 ease-in-out'>
            <Plane size={20} />
            <h5>Trips : {data?.all}</h5>
          </div>
          <div className='flex items-center gap-2  p-4 cursor-pointer bg-yellow-200 rounded-md hover:bg-yellow-400 hover:scale-105 scale-100 transition-all duration-300 ease-in-out'>
            <Clock size={20} />
            <h5>Planned : {data?.planned}</h5>
          </div>
          <div className='flex items-center gap-2  p-4 cursor-pointer bg-purple-200 rounded-md hover:bg-purple-400 hover:scale-105 scale-100 transition-all duration-300 ease-in-out'>
            <CheckCircle size={20} />
            <h5>Completed : {data?.completed}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTrips;

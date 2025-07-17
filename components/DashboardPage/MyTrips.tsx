import React from 'react';
import { getTripsStatsAction } from '@/lib/server-actions/get-trips-stats';
import toast from 'react-hot-toast';

async function MyTrips() {
  const { data, error } = await getTripsStatsAction();

  if (error) {
    toast.error(error);
  }
  if (!data || (data?.all && data.all === 0)) {
    return <div>No trips stats was found.</div>;
  }
  return (
    <div>
      {/* <h2>Welcome back {user?.name}</h2> */}
      <div className='flex gap-6 flex-wrap'>
        {/* {trips.data?.map((trip) => (
          <div key={trip.id}>
            <h5>{trip.title}</h5>
            <p>{trip.description}</p>
          </div>
        ))} */}
        <h5>Trips : {data?.all}</h5>
        <h5>Planned : {data?.planned}</h5>
        <h5>Completed : {data?.completed}</h5>
      </div>
    </div>
  );
}

export default MyTrips;

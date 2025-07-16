'use client';
import { Trip } from '@/lib/generated/prisma';
import React from 'react';
import toast from 'react-hot-toast';

function MyTrips({
  trips,
}: {
  trips: {
    data: Trip[] | null;
    error?: string;
  };
}) {
  //   const user = useUserSession();

  if (trips.error) {
    toast.error(trips.error);
  }
  if (!trips || (trips.data && trips.data.length === 0)) {
    return <div>No trips found.</div>;
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
        <h5>Trips : {trips.data?.length}</h5>
        <h5>Planned : 2</h5>
        <h5>Completed : 1</h5>
        <h5>Canceled : 0</h5> {/* how many deleted trips */}
      </div>
    </div>
  );
}

export default MyTrips;

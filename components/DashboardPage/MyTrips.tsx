'use client';
import { Trip } from '@/lib/generated/prisma';
import { useUserSession } from '@/lib/useUserSession';
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
  const user = useUserSession();

  if (trips.error) {
    toast.error(trips.error);
  }
  if (!trips || (trips.data && trips.data.length === 0)) {
    return <div>No trips found.</div>;
  }
  return (
    <div>
      <h2>Welcome back {user?.name}</h2>
      <div>
        {trips.data?.map((trip) => (
          <div key={trip.id}>
            <h3>{trip.title}</h3>
            <p>{trip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTrips;

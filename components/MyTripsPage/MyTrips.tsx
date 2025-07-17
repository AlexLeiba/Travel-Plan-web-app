import { getTripsAction } from '@/lib/server-actions/get-trips';
import { TripCard } from './TripCard';

type Props = {
  params: { type: 'planned' | 'completed' | 'all'; search?: string };
};
export async function MyTrips({ params: { type, search } }: Props) {
  const trips = await getTripsAction({ type, search });
  console.log('🚀 ~ MyTrips ~ trips:', trips);
  return (
    <div className='grid grid-cols-1 gap-4'>
      {trips.data?.map((trip) => {
        return <TripCard key={trip.id} data={trip} />;
      })}
    </div>
  );
}

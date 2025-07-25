import { getTripsAction } from '@/lib/server-actions/get-trips';
import { TripsCardList } from './TripsCardList';

type Props = {
  params: {
    type: 'planned' | 'completed' | 'all';
    search?: string;
    page?: number;
    order?: 'newest' | 'oldest';
  };
};

export async function MyTrips({
  params: { type, search, page, order },
}: Props) {
  const trips = await getTripsAction({ type, search, page, order });

  if (trips.error) {
    return <p className='text-red-500 text-center'>{trips.error}</p>;
  }

  return (
    <div className=''>
      <TripsCardList trips={trips || []} />
    </div>
  );
}

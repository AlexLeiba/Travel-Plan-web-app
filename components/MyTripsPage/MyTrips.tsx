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

// infinite scroll.
// 1. pas to server action prop with searchParams with new index
export async function MyTrips({
  params: { type, search, page, order },
}: Props) {
  const trips = await getTripsAction({ type, search, page, order });

  return (
    <div className=''>
      <TripsCardList trips={trips || []} />
    </div>
  );
}

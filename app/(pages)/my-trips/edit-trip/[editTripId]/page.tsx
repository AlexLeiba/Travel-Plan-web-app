import { Container } from '@/components/grid/Container';
import { CardContent, NewTripCard } from '@/components/NewTripPage/NewTripCard';
import { Spacer } from '@/components/ui/spacer';
import { Loader } from '@/components/ui/loader';
import { EditTripForm } from '@/components/EditTripPage/EditTripForm';
import { Metadata } from 'next';
import { getSingleTripAction } from '@/lib/server-actions/get-single-trip';

export const metadata: Metadata = {
  title: 'Travel-Plan / Edit trip',
  description: 'Travel ,Plan and Enjoy your trips',
};

async function EditTripPage({
  params,
}: {
  params: Promise<{ editTripId: string }>;
}) {
  const tripId = (await params).editTripId;

  const tripData = await getSingleTripAction({ tripId });

  return (
    <>
      <Container>
        <div className='flex  gap-4'>
          <h2>Edit trip</h2>
          {!tripData.data && !tripData.error && <Loader color='black' />}
        </div>
        <Spacer sm={12} md={12} lg={24} />

        <NewTripCard>
          <CardContent>
            <EditTripForm data={tripData} />
          </CardContent>
        </NewTripCard>
      </Container>
    </>
  );
}

export default EditTripPage;

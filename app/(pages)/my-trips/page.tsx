import { Container } from '@/components/grid/Container';
import { MyTrips } from '@/components/MyTripsPage/MyTrips';
import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { InputSearch } from '@/components/ui/inputSearch';
import { Spacer } from '@/components/ui/spacer';
import { Plane } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react';

export async function MyTripsPage({
  searchParams,
}: {
  searchParams: Promise<{
    type: 'planned' | 'completed' | 'all';
    search?: string;
  }>;
}) {
  const paramType = await searchParams;

  return (
    <Container>
      <div className='flex items-end gap-4'>
        <h1>My trips </h1>
        <p>
          {paramType.type && paramType.type !== 'all' && `(${paramType.type})`}
        </p>
      </div>
      <Spacer sm={6} md={6} lg={12} />

      <div className='flex justify-between items-center gap-4'>
        <div className='flex items-center gap-8'>
          <Dropdown title='Sort' />
          <InputSearch title='Search' placeholder='Search trips' />
        </div>

        <Link href={'/my-trips/new-trip'}>
          <Button classNameCustome='px-12 flex items-center gap-2'>
            New trip <Plane size={15} />
          </Button>
        </Link>
      </div>
      <Spacer sm={6} md={6} lg={6} />

      <Suspense>
        <MyTrips params={paramType} />
      </Suspense>
    </Container>
  );
}

export default MyTripsPage;

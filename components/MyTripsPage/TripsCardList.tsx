'use client';

import { Trip } from '@/lib/generated/prisma';
import { TripCard } from './TripCard';
import { useEffect, useRef, useState } from 'react';
import { Loader } from '../ui/loader';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  trips: { data: Trip[] | null; totalTrips: number };
};
export function TripsCardList({ trips: { data, totalTrips } }: Props) {
  const observeRefElement = useRef<HTMLDivElement>(null);
  const [intersepted, setIntersepted] = useState(false);

  //   HANDLE URL
  const searchParams = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    // HANDLE INTERSECTION OBSERVER
    const observer = new IntersectionObserver(
      ([entries]) => {
        const searchParam = searchParams.get('search');
        if (
          entries.isIntersecting &&
          data &&
          data.length < totalTrips &&
          !searchParam
        ) {
          setIntersepted(entries.isIntersecting);
          const searchParamsObj = new URLSearchParams(searchParams);
          const page = searchParamsObj.get('page');
          if (page) {
            const newPage = Number(page) + 1;
            searchParamsObj.set('page', newPage.toString());
          } else {
            searchParamsObj.set('page', '2');
          }
          router.replace(`?${searchParamsObj.toString()}`);
        } else {
          setIntersepted(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // 0.5 = 50% is visible
      }
    );
    const target = observeRefElement.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [intersepted, data]);

  if (!data)
    return (
      <div>
        <p className='dark:text-white'>No trips was found</p>
      </div>
    );

  return (
    <div className='grid grid-cols-1 gap-4'>
      <p>{data.length + ' ' + '/' + ' ' + totalTrips} trips</p>
      {data && data.length > 0 ? (
        data.map((trip) => {
          return <TripCard key={trip.id} data={trip} />;
        })
      ) : (
        <div>
          <p className='dark:text-white'>No trips was found</p>
        </div>
      )}

      <div className='mt-8' ref={observeRefElement}>
        {intersepted && <Loader color='black' />}
      </div>
    </div>
  );
}

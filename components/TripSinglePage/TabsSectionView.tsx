'use client';
import React, { useState } from 'react';
import LocationMap from '@/components/TripSinglePage/LocationMap';
import { PreviewGallery } from '@/components/TripSinglePage/PreviewGallery';
import { Spacer } from '@/components/ui/spacer';
import { Trip } from '@/lib/generated/prisma';
import { Button } from '../ui/button';

type Props = {
  tripData: Trip & { images: Array<{ imageId: string; imageUrl: string }> };
};
export function TabsSectionView({ tripData }: Props) {
  const [selectedTab, setSelectedTab] = useState<'map' | 'gallery'>('map');
  return (
    <div>
      <div className='flex gap-1'>
        <Button
          classNameCustome='w-full px-12'
          handleClick={() => setSelectedTab('map')}
          variant={selectedTab === 'map' ? 'secondary' : 'outline'}
        >
          Map
        </Button>
        <Button
          classNameCustome='w-full px-12'
          handleClick={() => setSelectedTab('gallery')}
          variant={selectedTab === 'gallery' ? 'secondary' : 'outline'}
        >
          Gallery
        </Button>
      </div>
      {tripData &&
        selectedTab === 'map' &&
        (tripData.lattitude ? (
          <>
            <Spacer size={12} />
            <p className='font-bold'>Location on map</p>
            <Spacer size={2} />
            <LocationMap
              locationCoordinates={[
                Number(tripData?.lattitude),
                Number(tripData?.lngitude),
              ]}
              title={tripData?.location}
            />
          </>
        ) : (
          <p className='text-gray-500'>
            The location coordinates are not available, please try again to set
            the location
          </p>
        ))}

      <Spacer size={12} />

      {tripData &&
        tripData.images &&
        selectedTab === 'gallery' &&
        (tripData?.images?.length > 0 ? (
          <>
            <p className='font-bold'>Trip Gallery</p>
            <Spacer size={2} />

            <PreviewGallery tripImages={tripData?.images} />
            <Spacer size={8} />
          </>
        ) : (
          <p className='text-gray-500'>You haven't uploaded any images yet</p>
        ))}
    </div>
  );
}

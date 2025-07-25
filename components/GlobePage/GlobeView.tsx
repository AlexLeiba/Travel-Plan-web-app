'use client';

import React, { useMemo } from 'react';
import { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { Button } from '../ui/button';
import { Loader } from '../ui/loader';

type Props = {
  locationsData: {
    data:
      | {
          location: string;
          lattitude: string;
          lngitude: string;
        }[]
      | null;
  };
};
export default function GlobeView({ locationsData: { data } }: Props) {
  const [selectedTab, setSelectedTab] = useState<'day' | 'night'>('day');
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const locationsData = useMemo(() => {
    const visitedCountries = new Set();
    const visitedCities = new Set();

    const parsedLocations = data?.map((location) => {
      visitedCountries.add(
        location.location.split(',').at(-1)?.trim() as string
      );
      visitedCities.add(location.location);
      return {
        lat: Number(location.lattitude),
        lng: Number(location.lngitude),
        name: location.location,
        country: location.location,
      };
    });
    return {
      visitedCountries: Array.from(visitedCountries),
      visitedCities: Array.from(visitedCities),
      parsedLocations,
    };
  }, [data]);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.2;
      globeRef.current.controls().enableDamping = true;
      globeRef.current.controls().dampingFactor = 0.25;
      globeRef.current.controls().enableZoom = true;
      globeRef.current.controls().minDistance = 200;
      globeRef.current.controls().maxDistance = 1000;
    }
  }, []);

  if (!data) {
    return (
      <div className='mt-12'>
        <Loader color='black' />
      </div>
    );
  }
  return (
    <div className='w-full h-full relative rounded-4xl overflow-hidden'>
      <div className='flex gap-1 absolute top-[20px] z-20 left-4'>
        <Button
          classNameCustome='w-full px-12'
          handleClick={() => setSelectedTab('day')}
          variant={selectedTab === 'day' ? 'secondary' : 'outline'}
        >
          Day view
        </Button>
        <Button
          classNameCustome='w-full px-12'
          handleClick={() => setSelectedTab('night')}
          variant={selectedTab === 'night' ? 'secondary' : 'outline'}
        >
          Night view
        </Button>
      </div>
      <div className='flex flex-col gap-1 absolute top-[20px] z-20 right-5 bg-white rounded-md p-2'>
        <h4 className='font-bold'>You visited</h4>
        <p className='dark:text-black'>
          Countries : {locationsData.visitedCountries.length}
        </p>
        <p className='dark:text-black'>
          Cities: {locationsData.visitedCities.length}
        </p>
      </div>
      <Globe
        ref={globeRef}
        globeImageUrl={
          selectedTab === 'day'
            ? 'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg'
            : 'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg'
        }
        bumpImageUrl='https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png'
        backgroundColor={selectedTab === 'day' ? '#ffffff' : '#000000'}
        backgroundImageUrl={
          'https://cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png'
        }
        pointColor={() => '#9cf9a8'}
        labelColor={() => '#ffffff'}
        labelAltitude={0.5}
        labelSize={1}
        labelsData={locationsData.parsedLocations}
        labelText={(d: any) => d.name}
        pointRadius={0.5}
        pointAltitude={0.3}
        pointsMerge={true}
        width={990}
        height={800}
        pointsData={locationsData.parsedLocations}
      ></Globe>
    </div>
  );
}

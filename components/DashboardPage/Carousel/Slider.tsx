'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Spacer } from '../../ui/spacer';
import { NavButton } from './CarouselNavButton';

type Props = { carouselData: { imageUrl: string; title: string }[] };

export function Slider({ carouselData }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div>
      <h5>Your Trips Gallery</h5>
      <Spacer sm={6} md={6} lg={6} />
      <div className='w-full rounded-md h-[600px] flex overflow-hidden relative'>
        <NavButton
          direction='prev'
          setCurrentIndex={setCurrentIndex}
          length={carouselData.length}
        />
        <NavButton
          direction='next'
          setCurrentIndex={setCurrentIndex}
          length={carouselData.length}
        />

        {carouselData?.map((image, index) => (
          <div
            key={image.imageUrl + index}
            className='transition-transform duration-500 ease-in-out '
            style={{
              minWidth: '100vw',
              transform: `translateX(${
                currentIndex === 0 ? 0 : -currentIndex * 100
              }vw)`,
            }}
          >
            <Image
              quality={100}
              src={image.imageUrl}
              alt='image'
              width={1000}
              height={600}
              className='object-cover object-center  w-[992px] '
              key={index}
            />
            <h5 className='text-shadow-lg text-shadow-white font-medium absolute bottom-12 z-40 left-8'>
              {image.title}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
}

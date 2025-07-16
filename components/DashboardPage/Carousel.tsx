'use client';
import { cn } from '@/lib/utilities';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { Spacer } from '../ui/spacer';

export function Carousel({
  images,
}: {
  images: {
    title: string;
    imageUrl: string;
  }[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div>
      <h5>The Gallery of the your trips</h5>
      <Spacer sm={6} md={6} lg={6} />
      <div className='w-full h-[600px] flex overflow-hidden relative'>
        <NavButton
          direction='prev'
          setCurrentIndex={setCurrentIndex}
          length={images.length}
        />
        <NavButton
          direction='next'
          setCurrentIndex={setCurrentIndex}
          length={images.length}
        />

        {images?.map((image, index) => (
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
              src={image.imageUrl}
              alt='image'
              width={300}
              height={200}
              className='object-cover  w-full h-full '
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

export function NavButton({
  setCurrentIndex,
  length,
  direction,
}: {
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  length: number;
  direction: 'prev' | 'next';
}) {
  function handleMove() {
    setCurrentIndex((prev) => {
      if (direction === 'next') {
        return prev + 1 < length ? prev + 1 : 0;
      } else {
        return prev - 1 >= 0 ? prev - 1 : length - 1;
      }
    });
  }
  return (
    <button
      className={cn(
        direction === 'next' ? 'right-4' : 'left-4',
        'absolute z-50 cursor-pointer p-2 top-1/2 transform -translate-y-1/2 opacity-50 bg-white rounded-full shadow-md'
      )}
      onClick={handleMove}
    >
      {direction === 'next' ? <ArrowRight /> : <ArrowLeft />}
    </button>
  );
}

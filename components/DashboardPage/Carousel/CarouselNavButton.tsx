'use client';

import { cn } from '@/lib/utilities';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

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

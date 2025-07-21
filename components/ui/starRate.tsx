'use client';
import { Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const stars = new Array(5).fill(0);

type Props = {
  defaultValue?: number;
};
export function StarRate({ defaultValue }: Props) {
  const { setValue } = useFormContext();
  const [selectedStar, setSelectedStar] = useState(0);
  const [starState, setStarState] = useState(0);

  function handleStarClick(index: number) {
    setSelectedStar(index);
    setValue('starRate', index);
  }

  useEffect(() => {
    setSelectedStar(defaultValue || 0);
  }, [defaultValue]);
  return (
    <div className='flex items-start gap-2 flex-col'>
      <div className='flex items-center gap-2'>
        <p className='font-medium'>Rate your trip</p>
        {selectedStar > 0 && (
          <X onClick={() => setSelectedStar(0)} className='cursor-pointer' />
        )}
      </div>

      <div className='flex items-center gap-2'>
        {stars.map((_, index) => {
          return (
            <div
              onMouseEnter={() => setStarState(index + 1)}
              onMouseLeave={() => setStarState(0)}
              key={index}
              onClick={() => handleStarClick(index + 1)}
              className='cursor-pointer'
            >
              <Star
                className='stroke-3'
                style={{
                  color:
                    selectedStar >= index + 1 || starState >= index + 1
                      ? '#efce11'
                      : '#D1D5DB',
                }}
              />
            </div>
          );
        })}
        {selectedStar > 0 && <p>{selectedStar}</p>}
      </div>
    </div>
  );
}

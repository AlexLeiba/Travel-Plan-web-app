import { Star } from 'lucide-react';
const stars = new Array(5).fill(0);
export function PreviewStarRate({ rate }: { rate: number }) {
  return (
    <div className='flex items-center gap-2'>
      {stars.map((_, index) => {
        return (
          <div key={index}>
            <Star
              className='stroke-3'
              style={{
                color: rate >= index + 1 ? '#efce11' : '#D1D5DB',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

import { cn } from '@/lib/utilities';
import { Loader2 } from 'lucide-react';

export function Loader({ color = 'white' }: { color?: 'white' | 'black' }) {
  return (
    <div className={cn('grid place-items-center')}>
      <Loader2 color={color} className='animate-spin' />
    </div>
  );
}

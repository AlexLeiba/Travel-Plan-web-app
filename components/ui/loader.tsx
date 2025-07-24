import { cn } from '@/lib/utilities';
import { Loader2 } from 'lucide-react';

export function Loader({ color = 'white' }: { color?: 'white' | 'black' }) {
  return (
    <div className={cn('grid place-items-center')}>
      <Loader2 className='animate-spin dark:text-white text-black' />
    </div>
  );
}

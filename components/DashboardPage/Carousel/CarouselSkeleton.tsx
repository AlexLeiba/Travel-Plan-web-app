import { Spacer } from '@/components/ui/spacer';

export function CarouselSkeleton() {
  return (
    <div>
      <div className='animate-pulse h-6 bg-gray-200 w-[100px]'></div>
      <Spacer sm={6} md={6} lg={6} />
      <div className='animate-pulse bg-gray-200 w-full h-[600px] flex overflow-hidden relative'></div>
    </div>
  );
}

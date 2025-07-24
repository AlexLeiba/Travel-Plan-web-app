import { Slider } from './Slider';
import toast from 'react-hot-toast';
import { getCarouselAction } from '@/lib/server-actions/get-carousel';

type CarouselType = {
  imageUrl: string;
  title: string;
}[];
export async function Carousel() {
  const carouselData: { error?: string; data: CarouselType | null } =
    await getCarouselAction();

  if (carouselData.error) {
    toast.error(carouselData.error);
  }

  if (
    !carouselData.data ||
    (carouselData.data && carouselData.data.length === 0)
  ) {
    return <div className='dark:text-white'>No trips images was found.</div>;
  }

  return <Slider carouselData={carouselData.data} />;
}

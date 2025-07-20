import { X } from 'lucide-react';
import Image from 'next/image';

type Props = {
  imageUrl: string;
  handleDelete: () => void;
};
export function PreviewImagesCard({ imageUrl, handleDelete }: Props) {
  return (
    <div className='relative overflow-hidden rounded-md border-1 border-gray-300 w-full h-32'>
      <div className='rounded-full absolute top-1 right-1 flex justify-center items-center bg-gray-200/50 p-1 cursor-pointer hover:bg-gray-200 transition-colors duration-200 z-10'>
        <X onClick={handleDelete} className=' ' />
      </div>
      <Image
        src={imageUrl}
        alt='image-upload'
        width={800}
        height={600}
        className='object-cover w-full h-full rounded-md '
      />
    </div>
  );
}

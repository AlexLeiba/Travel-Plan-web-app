'use client';
import { Trip } from '@/lib/generated/prisma';
import { Edit, X } from 'lucide-react';
import Image from 'next/image';

export function TripCard({ data }: { data: Trip }) {
  return (
    <div className=' bg-gray-300 rounded-lg shadow-md flex  gap-4 lg:h-[250px] max-h-[400px]  overflow-hidden relative lg:flex-row flex-col '>
      <div className='p-1 transition-all hover:bg-red-500 rounded-full bg-red-200/50 flex items-center justify-center absolute right-2 top-2 cursor-pointer'>
        <X />
      </div>
      <div className='p-1 transition-all hover:bg-green-500 rounded-full bg-green-200/50 flex items-center justify-center absolute right-2 top-12 cursor-pointer'>
        <Edit />
      </div>
      {/* TODd addModal on delete */}
      <div className='flex flex-1'>
        <Image
          className='object-center object-cover lg:h-full h-[250px] w-full'
          src={data.imageUrl || ''}
          alt='image'
          width={300}
          height={200}
        />
      </div>

      <div className='flex flex-1 flex-col justify-between p-4'>
        <div className='mr-6'>
          <h5 className='lg:line-clamp-2 line-clamp-1'>{data.title}</h5>
          <p className='lg:line-clamp-4 line-clamp-1'>{data.description}</p>
        </div>

        <div className='flex justify-between items-center'>
          <p>Start Date: {new Date(data.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(data.endDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

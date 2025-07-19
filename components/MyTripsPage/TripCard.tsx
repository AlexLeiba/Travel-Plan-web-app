'use client';
import { Trip } from '@/lib/generated/prisma';
import { Edit, X } from 'lucide-react';
import Image from 'next/image';
import { ModalContent, ModalProvider, ModalTrigger } from '../ui/modal';
import Link from 'next/link';
import { deleteTripAction } from '@/lib/server-actions/delete-trip';

export function TripCard({ data }: { data: Trip }) {
  return (
    <>
      <div className=' bg-gray-100 rounded-lg shadow-md flex  gap-4 lg:h-[250px] max-h-[400px]  overflow-hidden relative lg:flex-row flex-col '>
        <ModalProvider>
          <ModalTrigger customeClassName='absolute right-0 top-0'>
            <button className='p-1 transition-all hover:bg-red-500 rounded-full bg-red-200/50 flex items-center justify-center absolute right-2 top-2 cursor-pointer'>
              <X />
            </button>
          </ModalTrigger>

          <ModalContent
            handleConfirm={() => deleteTripAction(data.id, data.imageId || '')}
          >
            <h3>Are you sure you want to delete this trip?</h3>
            <p>This action cannot be undone.</p>
          </ModalContent>
        </ModalProvider>

        <Link
          href={`/my-trips/edit-trip/${data.id}`}
          className='absolute right-2 top-12'
        >
          <div className='p-1 transition-all hover:bg-green-500 rounded-full bg-green-200/50 flex items-center justify-center  cursor-pointer'>
            <Edit />
          </div>
        </Link>
        {/* TODd addModal on delete */}
        <div className='flex flex-1'>
          <Image
            className='object-center object-cover lg:h-full h-[250px] w-full'
            src={data.imageUrl || ''}
            alt='image'
            width={800}
            height={600}
          />
        </div>

        <div className='flex flex-1 flex-col justify-between p-4'>
          <div className='mr-8'>
            <h5 className='lg:line-clamp-2 line-clamp-1'>{data.title}</h5>
            <p className='lg:line-clamp-4 line-clamp-1'>{data.description}</p>
          </div>

          <div className='flex justify-between '>
            {data.linkUrl ? (
              <Link
                href={data.linkUrl}
                target='_blank'
                className='text-green-700 hover:underline '
              >
                {data.linkTitle || 'Link'}
              </Link>
            ) : (
              <div></div>
            )}

            <div className='flex justify-between items-center gap-4'>
              <p>
                <span className='font-medium'>From:</span>{' '}
                {new Date(data.startDate).toLocaleDateString()}
              </p>
              <p>
                <span className='font-medium'>To:</span>{' '}
                {new Date(data.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

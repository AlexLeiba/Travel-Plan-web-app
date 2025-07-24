'use client';
import { Trip } from '@/lib/generated/prisma';
import { Edit, Eye, Images, Pin, X } from 'lucide-react';
import Image from 'next/image';
import { ModalContent, ModalProvider, ModalTrigger } from '../ui/modal';
import Link from 'next/link';
import { deleteTripAction } from '@/lib/server-actions/delete-trip';
import { PreviewStarRate } from '../TripSinglePage/PreviewStarRate';

export function TripCard({ data }: { data: Trip & { images?: string[] } }) {
  return (
    <>
      <div className=' bg-gray-100 dark:bg-gray-600 rounded-lg shadow-md flex  gap-4 lg:h-[250px] max-h-[400px]  overflow-hidden relative lg:flex-row flex-col '>
        <ModalProvider>
          <ModalTrigger customeClassName='absolute right-1 top-1'>
            <button
              title='Delete trip'
              className='p-1 text-gray-400 transition-all hover:bg-red-500 rounded-full hover:text-white bg-black/30 flex items-center justify-center absolute right-2 top-2 cursor-pointer'
            >
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
          className='absolute right-3 top-12'
          title='Edit trip'
        >
          <div className='p-1 transition-all text-gray-100 hover:bg-green-500 hover:text-white rounded-full bg-black/30 flex items-center justify-center  cursor-pointer'>
            <Edit />
          </div>
        </Link>
        <Link
          title='View trip'
          href={`/my-trips/trip/${data.id}`}
          className='absolute right-3 top-21'
        >
          <div className='p-1 transition-all text-gray-100 hover:text-white hover:bg-green-500 rounded-full bg-black/30 flex items-center justify-center  cursor-pointer'>
            <Eye />
          </div>
        </Link>

        <div className='flex flex-1 relative'>
          <div className='absolute top-2 left-2 flex items-center gap-2'>
            <PreviewStarRate rate={data?.starRate || 0} />
          </div>
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
            <p className='lg:line-clamp-3 line-clamp-1'>{data.description}</p>
          </div>

          <div className='flex flex-col items-end gap-2'>
            {data.images && data.images?.length > 0 && (
              <Images className='text-yellow-500' />
            )}
            <div className='flex items-center gap-2'>
              <p className='text-gray-500 dark:text-gray-50 body-sm'>
                {data.location.length > 40
                  ? data.location.substring(0, 40) + '...'
                  : data.location}
              </p>
              <Pin className='text-gray-500 dark:text-gray-50' />
            </div>

            <div className='flex justify-between gap-8 '>
              {data.linkUrl ? (
                <Link
                  href={data.linkUrl}
                  target='_blank'
                  className='text-green-700 hover:underline '
                >
                  <div className='px-2 bg-black text-white rounded-full'>
                    {data.linkTitle && data.linkTitle?.length > 25
                      ? data.linkTitle?.substring(0, 22) + '...'
                      : data.linkTitle || 'Link'}
                  </div>
                </Link>
              ) : (
                <div></div>
              )}

              <div className='flex justify-between items-center gap-4'>
                <p className='body-sm'>
                  <span className='font-medium'>From:</span>{' '}
                  {new Date(data.startDate).toLocaleDateString()}
                </p>
                <p className='body-sm'>
                  <span className='font-medium'>To:</span>{' '}
                  {new Date(data.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

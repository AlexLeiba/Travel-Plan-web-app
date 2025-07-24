'use client';
import { useEffect, useRef, useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Image as ImageIcon, ImagesIcon, X } from 'lucide-react';
import { cn } from '@/lib/utilities';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Loader } from './loader';
import { api } from '@/lib/apiFactory/api';
import axios from 'axios';
import { PreviewImagesCard } from '../UploadImage/PreviewImagesCard';
import GridContainer from '../grid/GridContainer';
import React from 'react';

type Props = {
  imageDefault?: { url: string; id: string };
  title: string;
  type?: 'single' | 'multiple';
  fieldName?: string;
};
export function UploadMultipleImage({
  imageDefault,
  title,
  type = 'single',
  fieldName = 'imageUrl',
}: Props) {
  const {
    setValue,
    formState: { errors },
    control,
  } = useFormContext();

  useEffect(() => {
    if (type !== 'multiple') {
      setImageUrl({
        url: imageDefault?.url || '',
        imageId: imageDefault?.id || '',
      });
    }
  }, [imageDefault]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  });

  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<{ url: string; imageId?: string }>({
    url: '',
    imageId: '',
  });

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // UPLOAD IMAGE HANDLER
  async function uploadImage(file: File) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async () => {
      const previewUrl = fileReader.result as string;

      // UPLOAD IMAGE
      const uploadedImage = await axios.post(
        '/api/upload-image',

        {
          imageUrl: previewUrl,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent && progressEvent.total) {
              const progress =
                (progressEvent.loaded / progressEvent.total) * 100;
              setUploadProgress(progress);
            }
          },
        }
      );

      //MULTIPLE IMAGES
      if (type === 'multiple') {
        append({
          imageUrl: uploadedImage.data.imageUrl,
          imageId: uploadedImage.data.imageId,
        });
      } else {
        // SINGLE IMAGE

        //To preview image
        setImageUrl({
          url: uploadedImage.data.imageUrl,
          imageId: uploadedImage.data.imageId,
        });

        // To update form value
        setValue(fieldName || 'imageUrl', uploadedImage.data.imageUrl || ''); // Update the form value with the image URL
        setValue('imageId', uploadedImage.data.imageId); // Update the form value with the image URL
      }
      setLoading(false); // Reset loading state after upload
      setUploadProgress(0); // Reset upload progress after upload
    };
  }

  async function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.includes('image')) {
      try {
        uploadImage(file);
      } catch (error: any) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image. Please try again.');
      }
    } else {
      toast.error('Please upload a valid image file.');
      setLoading(false); // Reset loading state if the file is not an image
    }
  }

  async function handleDropImage(e: React.DragEvent<HTMLDivElement>) {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];

    if (file.type.includes('image')) {
      try {
        uploadImage(file);
      } catch (error: any) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image. Please try again.');
      } finally {
        setDragOver(false); // Reset drag over state after handling drop
      }
    } else {
      toast.error('Please upload a valid image file.');
      setDragOver(false); // Reset drag over state after handling drop
      setLoading(false); // Reset loading state if the file is not an image
    }
  }

  // DELETE SINGLE IMAGE
  async function handleImageDelete() {
    setLoading(true);

    setValue('imageUrl', ''); // Clear the form value

    try {
      await api().deleteImage(imageUrl.imageId || '');
      setImageUrl({ url: '', imageId: '' }); // Reset the image URL state
      toast.success('Image deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // DELETE MULTIPLE IMAGES
  async function handleMultipleImageDelete(
    imageIndex: number,
    imageId: string
  ) {
    setLoading(true);
    if (type === 'multiple') {
      remove(imageIndex);
    }

    try {
      await api().deleteImage(imageId || '');
      toast.success('Image deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <UploadImageLoader uploadProgress={uploadProgress} />
      ) : (
        <>
          <div
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                inputRef.current?.click();
              }
            }}
            className={cn(
              type === 'single' && errors[fieldName] && !imageUrl.url
                ? 'border-red-500'
                : !errors.images && dragOver
                ? 'border-green-300'
                : 'border-gray-300',
              'border-2 h-[250px] border-dotted p-2 cursor-pointer hover:bg-gray-200 transition-colors duration-200 z-10 relative overflow-hidden'
            )}
            onDrop={(e) => handleDropImage(e)}
            onDragOver={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDragEnd={() => setDragOver(false)}
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            {imageUrl.url && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageDelete();
                }}
                className='rounded-full absolute top-2 right-2 flex justify-center items-center bg-gray-200/50 p-1 cursor-pointer hover:bg-gray-200 transition-colors duration-200 z-10'
              >
                <X className=' ' />
              </div>
            )}
            {imageUrl.url && (
              <div>
                <Image
                  src={imageUrl.url}
                  alt='image-upload'
                  width={800}
                  height={600}
                  className='object-cover w-full h-[230px] rounded-md '
                />
              </div>
            )}

            {!imageUrl.url && (
              <label
                htmlFor={'upload'}
                className='flex justify-center items-center flex-col cursor-pointer'
              >
                <p className='text-center text-gray-600 dark:text-gray-400 mb-2 font-medium'>
                  {title}
                </p>
                {type === 'multiple' ? (
                  <ImagesIcon
                    cursor={'pointer'}
                    size={35}
                    className={cn(
                      dragOver ? 'text-green-500' : 'text-gray-500'
                    )}
                  />
                ) : (
                  <ImageIcon
                    cursor={'pointer'}
                    size={35}
                    className={cn(
                      dragOver ? 'text-green-500' : 'text-gray-500'
                    )}
                  />
                )}
              </label>
            )}

            <input
              onDropCapture={(e) => console.log('e:', e)}
              onChange={(e) => handleUploadImage(e)}
              type='file'
              className='hidden'
              ref={inputRef}
              id='upload'
            />
          </div>
        </>
      )}
      {type === 'multiple' && (
        <GridContainer cols={2} gap={4} wrap={true}>
          {fields?.map((field: Record<string, string>, index: number) => {
            return (
              <React.Fragment key={field.imageUrl}>
                {field && (
                  <PreviewImagesCard
                    imageUrl={field.imageUrl}
                    handleDelete={() =>
                      handleMultipleImageDelete(index, field.imageId)
                    }
                  />
                )}
              </React.Fragment>
            );
          })}
        </GridContainer>
      )}
    </>
  );
}

function UploadImageLoader({ uploadProgress }: { uploadProgress: number }) {
  return (
    <div
      className={cn(
        'border-gray-300',
        'border-2 h-[250px] w-full border-dotted p-8  hover:bg-gray-200 transition-colors duration-200 z-10 relative flex justify-center items-center'
      )}
    >
      <div>
        <Loader color='black' />
        {uploadProgress > 0 && <p>{uploadProgress.toFixed(0)}%</p>}
      </div>
    </div>
  );
}

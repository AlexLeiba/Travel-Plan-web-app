'use client';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Image as ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utilities';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Loader } from '../ui/loader';

export function UploadImage() {
  const { setValue } = useFormContext();
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<{ url: string; imageId?: string }>({
    url: '',
    imageId: '',
  });
  const [loading, setLoading] = useState(false);

  async function uploadImage(file: File) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async () => {
      const previewUrl = fileReader.result as string;

      const uploadedImage = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: previewUrl }),
      });
      const imageResponse = await uploadedImage.json();

      setImageUrl({ url: previewUrl, imageId: imageResponse.imageId });

      setValue('imageUrl', imageResponse.imageUrl || ''); // Update the form value with the image URL
      setLoading(false);
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

  async function handleImageDelete() {
    setLoading(true);
    setValue('imageUrl', ''); // Clear the form value

    try {
      await fetch(`/api/upload-image?imageId=${imageUrl.imageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setImageUrl({ url: '', imageId: '' }); // Reset the image URL state
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
        <UploadImageLoader />
      ) : (
        <div
          role='button'
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              inputRef.current?.click();
            }
          }}
          className={cn(
            dragOver ? 'border-green-300' : 'border-gray-300',
            'border-2 border-dotted p-4 cursor-pointer hover:bg-gray-200 transition-colors duration-200 z-10 relative'
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
            <X
              onClick={(e) => {
                e.stopPropagation();
                handleImageDelete();
              }}
              className='absolute right-2 top-2 z-50'
            />
          )}
          {imageUrl.url && (
            <div>
              <Image
                src={imageUrl.url}
                alt='image-upload'
                width={200}
                height={200}
              />
            </div>
          )}

          {!imageUrl.url && (
            <label
              htmlFor={'upload'}
              className='flex justify-center items-center flex-col cursor-pointer'
            >
              <p className='text-center text-gray-600 mb-2 font-medium'>
                Upload image
              </p>
              <ImageIcon
                cursor={'pointer'}
                size={35}
                className={cn(dragOver ? 'text-green-500' : 'text-gray-500')}
              />
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
      )}
    </>
  );
}

function UploadImageLoader() {
  return (
    <div
      className={cn(
        'border-gray-300',
        'border-2 h-[329px] border-dotted p-4  hover:bg-gray-200 transition-colors duration-200 z-10 relative flex justify-center items-center'
      )}
    >
      <Loader color='black' />
    </div>
  );
}

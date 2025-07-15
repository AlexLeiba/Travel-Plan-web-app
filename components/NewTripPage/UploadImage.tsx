'use client';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Image as ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utilities';
import Image from 'next/image';
import toast from 'react-hot-toast';

export function UploadImage() {
  const { setValue } = useFormContext();
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.includes('image')) {
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
      setValue('imageUrl', previewUrl); // Update the form value with the image URL
    } else {
      toast.error('Please upload a valid image file.');
    }
  }

  function handleDropImage(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files[0].type.includes('image')) {
      const base64String = URL.createObjectURL(e.dataTransfer.files[0]);

      setImageUrl(base64String);
      setValue('imageUrl', base64String); // Update the form value with the image URL
    } else {
      toast.error('Please upload a valid image file.');
    }
  }

  function onPreviewDelete() {
    setImageUrl('');
    setValue('imageUrl', ''); // Clear the form value
    setDragOver(false); // Reset drag over state
  }
  return (
    <div
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
      {imageUrl && (
        <X
          onClick={(e) => {
            e.stopPropagation();
            onPreviewDelete();
          }}
          className='absolute right-2 top-2 z-50'
        />
      )}
      {imageUrl && (
        <div>
          <Image src={imageUrl} alt='image-upload' width={200} height={200} />
        </div>
      )}

      {!imageUrl && (
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
      {/* <Button type='button'>Upload</Button> */}
    </div>
  );
}

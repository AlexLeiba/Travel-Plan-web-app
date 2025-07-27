import { getSession } from 'next-auth/react';
import axios from 'axios';
// import { getServerSession } from '@/auth';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const api = () => {
  return {
    uploadImage: uploadImage,
    deleteImage: deleteImage,
  };
};

async function uploadImage(imageUrl: string) {
  const session = getSession();
  if (!session) {
    throw new Error('User not logged in');
  }

  const uploadedImage = await axios.post(
    '/api/upload-image',

    {
      imageUrl,
    },
    {
      headers: {
        'Content-type': 'application/json',
      },
    }
  );

  return uploadedImage;
}

async function deleteImage(imageId: string) {
  const session = getSession();

  if (!session) {
    throw new Error('User not logged in');
  }
  const response = await axios.delete(`/api/upload-image?imageId=${imageId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}

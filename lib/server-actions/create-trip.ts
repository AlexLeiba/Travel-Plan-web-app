'use server';

import { userSession } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '../prisma';
import { Trip } from '../generated/prisma';
import { TripSchemaType } from '../schemas';

export async function createTripAction(formData: TripSchemaType) {
  const session = await userSession();

  if (!session || !session.user || !session.user.email) {
    throw new Error('You must be logged in to create a trip');
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: session.user.email || '',
      },
    });

    if (!foundUser) {
      console.log('🚀 ~ createTripAction ~ foundUser:', foundUser);
      throw new Error('User not found');
    }

    if (!formData.imageUrl) {
      throw new Error('Image URL is required');
    }

    // const uploadedImage = await fetch('/api/upload-image', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ imageUrl: formData.imageUrl }),
    // });
    // const imageResponse = await uploadedImage.json();
    // console.log(
    //   '🚀 ~ createTripAction ~ imageResponse:\n\n\n\n\n',
    //   imageResponse
    // );

    const createdTrip: Trip | null = await prisma.trip.create({
      data: {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        userId: foundUser.id,
        imageUrl: formData.imageUrl || '', // Use the secure URL from Cloudinary
      },
    });

    if (!createdTrip) {
      console.log('createdTrip', createdTrip);
      throw new Error('Failed to create trip');
    }
  } catch (error: any) {
    console.error('Error uploading image:', error);
    // throw new Error(`Image upload failed: ${error.message}`);
  }
}

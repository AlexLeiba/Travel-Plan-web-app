'use server';

import { v2 as cloudinary } from 'cloudinary';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '../prisma';
import { Trip } from '../generated/prisma';
import { TripSchemaType } from '../schemas';
import { ALLOWED_FORMATS } from '../cloudinary';

export async function createTripAction(formData: TripSchemaType) {
  const session: { user: { email: string } } | null = await getServerSession(
    authOptions
  );
  console.log('🚀 ~ createTripAction ~ session:', session);

  if (!session || !session.user || !session.user.email) {
    throw new Error('You must be logged in to create a trip');
  }

  const foundUser = await prisma.user.findUnique({
    where: {
      email: session.user.email || '',
    },
  });

  if (!foundUser) {
    console.log('🚀 ~ createTripAction ~ foundUser:', foundUser);
    throw new Error('User not found');
  }

  const storedImage = await cloudinary.uploader.upload(
    formData.imageUrl || '',
    {
      folder: 'travel-plan',
      allowed_formats: ALLOWED_FORMATS,
      resource_type: 'image',
      transformation: [
        {
          crop: 'limit',
        },
      ],
    }
  );
  if (storedImage.error) {
    console.log('🚀 ~ createTripAction ~ storedImage:', storedImage);
    throw new Error(`Image upload failed: ${storedImage.error.message}`);
  }

  const createdTrip: Trip | null = await prisma.trip.create({
    data: {
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      userId: foundUser.id,
      imageUrl: '', // Use the secure URL from Cloudinary
    },
  });

  if (!createdTrip) {
    console.log('createdTrip', createdTrip);
    throw new Error('Failed to create trip');
  }
}

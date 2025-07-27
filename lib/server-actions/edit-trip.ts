'use server';

import { Trip } from '@prisma/client';
import { prisma } from '../../prisma';
// import { Trip } from '../generated/prisma';
import { TripSchemaType } from '../schemas';
import { getServerSession } from '@/auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { getServerSession } from 'next-auth';

export async function editTripAction(formData: TripSchemaType, tripId: string) {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email) {
    throw new Error('You must be logged in to edit a trip');
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: session.user.email || '',
      },
    });

    if (!foundUser) {
      throw new Error('User not found');
    }

    if (!formData.imageUrl) {
      throw new Error('Image URL is required');
    }

    const { isLinkSelected, ...formDataWithoutLink } = formData;
    console.log('isLinkSelected:', isLinkSelected);

    const imagesData = formData.images?.map((image) => ({
      userId: foundUser.id,
      imageId: image.imageId || '',
      imageUrl: image.imageUrl || '',
    }));

    const updatedTrip: Trip | null = await prisma.trip.update({
      where: {
        userId: foundUser.id,
        id: tripId,
      },
      data: {
        ...formDataWithoutLink,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        userId: foundUser.id,
        images: {
          deleteMany: {},
          create: imagesData || [],
        },
        starRate: formData.starRate || 0,
      },
    });

    console.log('🚀 ~  updatedTrip:\n\n\n', updatedTrip);

    if (!updatedTrip) {
      throw new Error('Failed to update trip');
    }
  } catch (error: any) {
    console.error('Error editting trip:', error);
  }
}

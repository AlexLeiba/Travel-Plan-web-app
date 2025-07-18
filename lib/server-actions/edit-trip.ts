'use server';

import { prisma } from '../prisma';
import { Trip } from '../generated/prisma';
import { TripSchemaType } from '../schemas';
import { getServerUserSession } from '../getServerUserSession';

export async function editTripAction(formData: TripSchemaType, tripId: string) {
  const session = await getServerUserSession();

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

    const updatedTrip: Trip | null = await prisma.trip.update({
      where: {
        userId: foundUser.id,
        id: tripId,
      },
      data: {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        userId: foundUser.id,
      },
    });

    console.log('🚀 ~  updatedTrip:', updatedTrip);

    if (!updatedTrip) {
      throw new Error('Failed to update trip');
    }
  } catch (error: any) {
    console.error('Error editting trip:', error);
  }
}

'use server';

import { prisma } from '../../prisma';
import { Trip } from '../generated/prisma';
import { getServerSession } from '@/auth';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getSingleTripAction({
  tripId,
}: {
  tripId: string;
}): Promise<{
  data:
    | (Trip & { images: Array<{ imageId: string; imageUrl: string }> })
    | null;
  error?: string;
}> {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    throw new Error('You must be logged in to get trip');
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

    const trip = await prisma.trip.findFirst({
      where: {
        userId: foundUser.id,
        id: tripId,
      },
      include: {
        images: true,
      },
    });

    if (!trip) {
      throw new Error('No trip was found');
    }

    return {
      data: trip,
      error: undefined,
    };
  } catch (error: any) {
    return {
      data: null,
      error: `Failed to get trip: ${error.message}`,
    };
  }
}

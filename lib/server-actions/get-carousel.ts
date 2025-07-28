'use server';

import { getServerSession } from '@/auth';
import { prisma } from '../../prisma';

export async function getCarouselAction() {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email) {
    throw new Error('You must be logged in to get trips');
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

    const trips = await prisma.trip.findMany({
      where: {
        userId: foundUser.id,
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    if (!trips) {
      throw new Error('No trips was found');
    }

    const carouselData = trips.map((trip) => ({
      title: trip.title,
      imageUrl: trip.imageUrl || '', // Fallback image if no imageUrl is provided
    }));

    return {
      data: carouselData,
      error: undefined,
    };
  } catch (error: any) {
    return {
      data: null,
      error: `Failed to get trips: ${error.message}`,
    };
  }
}

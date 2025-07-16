'use server';

import { prisma } from '../prisma';
import { Trip } from '../generated/prisma';
import { getServerUserSession } from '../getServerUserSession';

export async function getTripsAction(
  { type }: { type: 'planned' | 'completed' | 'all' } = { type: 'all' }
): Promise<{
  data: Trip[] | null;
  error?: string;
}> {
  const currentDate = new Date();
  const session = await getServerUserSession();
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
        ...(type === 'planned' && { startDate: { gte: currentDate } }),
        ...(type === 'completed' && { endDate: { lte: currentDate } }),
        ...(type === 'all' && {}),
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    if (!trips) {
      throw new Error('No trips was found');
    }

    return {
      data: trips,
      error: undefined,
    };
  } catch (error: any) {
    return {
      data: null,
      error: `Failed to get trips: ${error.message}`,
    };
  }
}

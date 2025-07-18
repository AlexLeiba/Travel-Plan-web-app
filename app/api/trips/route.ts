import { getServerUserSession } from '@/lib/getServerUserSession';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getServerUserSession();

  try {
    if (!session || !session.user || !session.user.email) {
      throw new Error('You must be logged in to get trips');
    }
    const selectedTripId = req.nextUrl.searchParams.get('id');

    if (!selectedTripId) {
      throw new Error('No trip ID was provided');
    }
    const foundUser = await prisma.user.findUnique({
      where: {
        email: session.user.email || '',
      },
    });

    if (!foundUser) {
      throw new Error('User not found');
    }

    const trip = await prisma.trip.findUnique({
      where: {
        userId: foundUser.id,
        id: selectedTripId,
      },
    });

    if (!trip) {
      throw new Error('No trip was found');
    }

    return NextResponse.json(
      {
        data: trip,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `Failed to get trip: ${error.message}`,
      },
      {
        status: 500,
      }
    );
  }
}

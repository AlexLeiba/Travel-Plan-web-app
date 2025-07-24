'use server';

import { prisma } from '../prisma';
import { Trip } from '../generated/prisma';
import { TripSchemaType } from '../schemas';
import { getServerUserSession } from '../getServerUserSession';

export async function createTripAction(formData: TripSchemaType) {
  const session = await getServerUserSession();

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
      throw new Error('User not found');
    }

    if (!formData.imageUrl) {
      throw new Error('Image URL is required');
    }

    const imagesData = formData.images?.map((image) => ({
      userId: foundUser.id,
      imageId: image.imageId || '',
      imageUrl: image.imageUrl || '',
    }));

    const createdTrip: Trip | null = await prisma.trip.create({
      data: {
        // ...formData,
        starRate: formData.starRate || 0,
        location: formData.location.trim(),
        lattitude: formData.lattitude || '0',
        lngitude: formData.lngitude || '0',
        title: formData.title.trim(),
        description: formData.description.trim(),
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        userId: foundUser.id,
        imageUrl: formData.imageUrl || '', // Use the secure URL from Cloudinary
        imageId: formData.imageId || '', // Store the image ID if available
        linkUrl: formData.linkUrl || '',
        linkTitle: formData.linkTitle || '',
        images:
          imagesData && imagesData.length ? { create: imagesData } : undefined,
      },
    });
    console.log('🚀 ~ createTripAction ~ createdTrip:\n\n\n\n\n', createdTrip);

    if (!createdTrip) {
      throw new Error('Failed to create trip');
    }
  } catch (error: any) {
    console.error('Error uploading image:', error);
  }
}

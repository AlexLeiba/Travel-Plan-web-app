"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";

export async function favoriteTripAction(tripId: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    throw new Error("You must be logged in to favorite a trip");
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: session.user.email || "",
      },
    });

    if (!foundUser) {
      throw new Error("User not found");
    }

    const trip = await prisma.trip.findUnique({
      where: {
        userId: foundUser.id,
        id: tripId,
      },
    });

    if (!trip) {
      throw new Error("Trip not found");
    }

    const updatedTrip = await prisma.trip.update({
      where: {
        id: tripId,
      },
      data: {
        favorite: !trip.favorite,
      },
    });

    revalidatePath("/my-trips");
    return {
      data: updatedTrip,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: "Failed to set as a favorite trip",
    };
  }
}

"use server";

import { Trip } from "@prisma/client";
import { prisma } from "../prisma";
import { getServerSession } from "next-auth/next";

type Props = {
  type: "planned" | "completed" | "all";
  search?: string;
  page?: number;
  order?: "newest" | "oldest";
  favorite?: boolean;
};

export async function getTripsAction({
  type = "all",
  search = "",
  page = 1,
  order = "newest",
  favorite = false,
}: Props): Promise<{
  data: Trip[] | null;
  totalTrips: number;
  error?: string;
}> {
  const currentDate = new Date();
  const session = await getServerSession();
  const tripsPerPage = 5;

  if (!session || !session.user || !session.user.email) {
    throw new Error("You must be logged in to get trips");
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

    const totalTrips = await prisma.trip.count({
      where: {
        userId: foundUser.id,
        ...(type === "planned" && { startDate: { gte: currentDate } }),
        ...(type === "completed" && { endDate: { lte: currentDate } }),
        ...(favorite && { favorite: true }),
        ...(type === "all" && {}),
      },
    });

    const trips = await prisma.trip.findMany({
      where: {
        userId: foundUser.id,
        ...(type === "planned" && { startDate: { gte: currentDate } }),
        ...(type === "completed" && { endDate: { lte: currentDate } }),
        ...(favorite && { favorite: true }),
        ...(type === "all" && {}),
      },
      orderBy: {
        createdAt: order === "newest" ? "desc" : "asc",
      },
      // skip:(page - 1) * tripsPerPage,
      take: tripsPerPage * page,
      include: {
        images: true,
      },
    });

    if (!trips) {
      throw new Error("No trips was found");
    }

    const filteredSearchTrips = trips.filter((trip) => {
      if (!search) return true;
      return trip.title.toLowerCase().includes(search.toLowerCase());
    });

    return {
      data: filteredSearchTrips,
      totalTrips,
      error: undefined,
    };
  } catch (error: any) {
    return {
      totalTrips: 0,
      data: null,
      error: `Failed to get trips: ${error.message}`,
    };
  }
}

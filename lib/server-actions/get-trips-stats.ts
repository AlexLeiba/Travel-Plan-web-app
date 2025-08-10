"use server";

import { getServerSession } from "@/auth";
import { prisma } from "../../prisma";
import { Trip } from "@prisma/client";

export async function getTripsStatsAction() {
  const session = await getServerSession();
  const currentDate = new Date().getTime();

  if (!session || !session?.user || !session?.user?.email) {
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

    const trips = await prisma.trip.findMany({
      where: {
        userId: foundUser.id,
      },
    });

    if (!trips) {
      throw new Error("No trips was found");
    }

    const plannedTrips = trips.filter(
      (trip) => trip.startDate.getTime() >= currentDate
    );

    const favoriteTrips = trips.filter((trip) => trip.favorite).length;
    const plannedTripsCopy: Trip[] = JSON.parse(JSON.stringify(plannedTrips));

    const nextTrip: Trip = plannedTripsCopy.sort((a, b) => {
      const startDateToDateTypeA = new Date(a.startDate).getTime();
      const startDateToDateTypeB = new Date(b.startDate).getTime();

      return startDateToDateTypeA - startDateToDateTypeB;
    })[0];

    const nextTripDateInMilliseconds = new Date(nextTrip.startDate).getTime();

    const { months, weeks, days } = preciseTimeUntil(
      nextTripDateInMilliseconds,
      currentDate
    );

    const completedTrips = trips.length - plannedTrips.length;
    const allTrips = trips.length;

    return {
      data: {
        planned: plannedTrips.length,
        completed: completedTrips,
        nextTrip: {
          ...nextTrip,
          favoriteTrips: favoriteTrips,
          all: allTrips,

          nextTripWeeks: weeks,
          nextTripDays: days,
          nextTripMonths: months,
        },
        error: undefined,
      },
    };
  } catch (error: any) {
    return {
      data: null,
      error: `Failed to get trips: ${error.message}`,
    };
  }
}

function preciseTimeUntil(futureMs: number, nowMs: number) {
  let start = new Date(nowMs);
  let end = new Date(futureMs);

  let months = 0;

  //
  while (new Date(start).setMonth(start.getMonth() + 1) <= futureMs) {
    start.setMonth(start.getMonth() + 1); //while current timestamp is lower than future timestamp then we will increase it by 1 month.
    months++; //add 1 to the months to keep count how many month remained
  }

  let diffMs = end.getTime() - start.getTime();
  let weeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7)); //the difference in weeks -> 7 days

  diffMs -= weeks * (1000 * 60 * 60 * 24 * 7); //from (difference milliseconds) substract (the weeks parsedback to timestamp to understand how much milliseconds took for all weeks, and what remains we will parse into days) -> and what reimains means than weren't fit in 7 days which means that the rest  are days

  let days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return { months, weeks, days };
}

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    listingId,
    startDate,
    endDate,
    totalPrice
   } = body;

   if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        }
      }
    }
  });

  return NextResponse.json(listingAndReservation);
}

// region abdel 
/**
 * Function to getAll Reservations
 * return datas
 */
export const GET = async () => {
  try {

      const listing = await prisma.reservation.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });

      return NextResponse.json(listing);

  } catch(err) {
      return NextResponse.json({message: "GET Error", err}, {status: 500})
  }
}


// end region

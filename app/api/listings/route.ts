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
    title,
    description,
    imageSrc,
    category,
    department,
    // roomCount,
    // bathroomCount,
    // guestCount,
    location,
    price,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      // roomCount,
      // bathroomCount,
      // guestCount,
      department,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}

// region abdel 
/**
 * Function to getAll SiteTouristique
 * return datas
 */
export const GET = async () => {
  try {

      const listing = await prisma.listing.findMany({
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

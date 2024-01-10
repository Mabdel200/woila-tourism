import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST( request: Request, ) {
  try {
      const body = await request.json();
      const {title, description, startDate, endDate, listingId} = body;

      // Ajoutez la validation pour listingId ici
      if (!listingId || !/^[a-fA-F0-9]{24}$/.test(listingId)) {
        return NextResponse.json({ message: "ListingId invalide" }, { status: 400 });
      }

    
      const event = await prisma.event.create({
          data: {
              title,
              description,
              startDate,
              endDate,
              listingId,
          }
      })
      
      console.log("Event Object:", event);

      return NextResponse.json(event);

  } catch(err) {
      return NextResponse.json({message: "POST Error", err}, {status: 500})
  }
}

// region abdel 
/**
 * Function to getAll Events
 * return datas
 */
export const GET = async () => {
  try {

      const listing = await prisma.event.findMany({
        orderBy: {
          id: 'desc'
        }
      });

      return NextResponse.json(listing);

  } catch(err) {
      return NextResponse.json({message: "GET Error", err}, {status: 500})
  }
}

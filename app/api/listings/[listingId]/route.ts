import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import getRoleUser from "@/app/actions/getRoleUser";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const adminUser = await getRoleUser();

  if (!adminUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      // userId: adminUser.id
    }
  });

  return NextResponse.json(listing);
}


// UPDATE DATAS.
export const PATCH = async (  request: Request,  { params }: { params: IParams }
)  => {
  try {
      const body = await request.json();
      const {title, description, department} = body;

      const {listingId} = params;

      const updatePost = await prisma.listing.update({
          where: {
            id: listingId,
          },
          data: {
              title,
              description,
              department
          }
      })

      if (!updatePost) {
        // Return an appropriate error response
        return new Response(JSON.stringify({ message: 'Post not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

     // Return the updated post
    return new Response(JSON.stringify(updatePost), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch(err) {
      return NextResponse.json({message: "update Error", err}, {status: 500})
  }
}

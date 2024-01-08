import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    email,
    name,
    password,
   } = body;

   const hashedPassword = await bcrypt.hash(password, 12);

   const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    }
  });

  return NextResponse.json(user);
}

// region abdel 
/**
 * Function to getAll Users
 * return datas
 */
export const GET = async () => {
  try {

      const listing = await prisma.user.findMany({
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

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const DELETE = async (request, { params }) => {
    try {
      const { userId } = params;

      if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid ID');
      }
    
      const user = await prisma.user.deleteMany({
        where: {
          id: userId,
        }
      });
  
      return NextResponse.json(user);
    } catch (err) {
      return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
    }
  };
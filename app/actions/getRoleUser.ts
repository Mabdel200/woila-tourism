import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
import { UserRole } from "@prisma/client";

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getRoleUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email && !session?.user?.role) {
      return null;
    }

    const roleUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
        role :session.user.role as UserRole,
      }
    });

    if (!roleUser) {
      return null;
    }

    return {
      ...roleUser,
      createdAt: roleUser.createdAt.toISOString(),
      updatedAt: roleUser.updatedAt.toISOString(),
      emailVerified: 
         roleUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}


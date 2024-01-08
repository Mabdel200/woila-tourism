import { UserRole } from "@prisma/client";

export interface User {
    name?: string | null | undefined;
    email?: string | null | undefined;
    role?: UserRole;
    accessToken?: string;
  }
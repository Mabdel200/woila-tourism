import { Listing, Reservation, User, Event } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

// Add Event from type to parse data date

export type SafeEvent = Omit<
  Event,
  "createdAt" | "startDate" | "endDate" | "listing"> 
  & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing; 
};





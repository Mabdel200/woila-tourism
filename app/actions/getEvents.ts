import prisma from "@/app/libs/prismadb";
import { parseISO, formatISO } from 'date-fns';

export interface IEventsParams {
  listingId?: string;
  authorId?: string;
  title?: string;
  description?: string;
}

export default async function getEvents(params: IEventsParams) {
  try {
    const { authorId, listingId, title, description } = params;

    let query: any = {};

    // if (authorId) {
    //   query.listingId = authorId;
    // }

    if (listingId) {
      query.listingId = listingId;
    }

    if (title) {
      query.title = title;
    }

    if (description) {
      query.description = description;
    }

    // if (startDate && endDate) {
    //   query.listing = {
    //     events: {
    //       some: {
    //         OR: [
    //           {
    //             endDate: { gte: new Date(startDate) },
    //             startDate: { lte: new Date(startDate) },
    //           },
    //           {
    //             startDate: { lte: new Date(endDate) },
    //             endDate: { gte: new Date(endDate) },
    //           },
    //         ],
    //       },
    //     },
    //   };
    // }

    const events = await prisma.event.findMany({
      where: query,
      orderBy: {
        id: 'desc',
      },
    });

    const safeEvents = events.map((event) => ({
      ...event,
      // startDate: event.startDate.toISOString(),
      // endDate: event.endDate.toISOString(),
      // createdAt: event.createdAt.toISOString(),
    }));

    return safeEvents;
  } catch (error: any) {
    throw new Error(error as string);
  }
}

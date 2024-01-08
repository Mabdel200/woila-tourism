import prisma from "@/app/libs/prismadb";

const getEventById = async (
  options: { listingId: string }
  ) => {
  try {
    const { listingId } = options;
    const events = await prisma.event.findMany({
      where: {
        listingId,
      },
    });
    console.log(events);
    return events;
  } catch (error) {
    throw new Error(error as string);
  }
};


export default getEventById;
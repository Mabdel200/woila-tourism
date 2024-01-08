import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/libs/prismadb';

export default async function  (req: NextApiRequest, res: NextApiResponse) {
  const { listingId } = req.query;

  try {
    const events = await prisma.event.findMany({
      where: {
        listingId: listingId as string,
      },
    });

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

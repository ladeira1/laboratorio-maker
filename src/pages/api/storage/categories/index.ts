import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'services/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);
      const startIndex = (page - 1) * limit;

      const categories = await prisma.category.findMany({
        orderBy: { updatedAt: 'asc' },
        take: limit,
        skip: startIndex,
      });

      const totalPages = Math.ceil((await prisma.category.count()) / limit);
      const nextPage = page + 1 > totalPages ? null : page + 1;

      return res.status(201).json({ categories, nextPage, totalPages });
    }
    return res.status(400).json({ error: 'Invalid request' });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export default handler;

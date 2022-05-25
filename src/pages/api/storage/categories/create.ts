import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'services/prisma';
import { createCategoryValidator } from 'validators/storage/categories/create';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { name, description } = req.body;

      await createCategoryValidator(req);

      const category = await prisma.category.create({
        data: {
          name,
          description,
        },
      });

      return res.status(201).json({ category });
    }
    return res.status(400).json({ error: 'Invalid request' });
  } catch (error) {
    return res.status(400).json({ error: (error as Error)?.message ?? error });
  }
};

export default handler;

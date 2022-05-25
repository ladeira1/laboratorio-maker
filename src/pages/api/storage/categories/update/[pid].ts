import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'services/prisma';
import { updateCategoryValidator } from 'validators/storage/categories/update';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'PUT') {
      const { pid } = req.query;
      const { name, description } = req.body;

      await updateCategoryValidator(req);

      const category = await prisma.category.update({
        where: { id: Number(pid) },
        data: {
          name,
          description,
        },
      });

      return res.status(200).json({ category });
    }
    return res.status(400).json({ error: 'Invalid request' });
  } catch (error) {
    return res.status(400).json({ error: (error as Error)?.message ?? error });
  }
};

export default handler;

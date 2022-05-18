import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'services/prisma';
import { deleteCategoryValidator } from 'validators/storage/categories/delete';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {
      const { pid } = req.query;

      await deleteCategoryValidator(req);

      await prisma.category.delete({
        where: { id: Number(pid) },
      });

      return res.status(204).send(undefined);
    }
    return res.status(400).json({ error: 'Invalid request' });
  } catch (error) {
    return res.status(400).json({ error: (error as Error)?.message ?? error });
  }
};

export default handler;

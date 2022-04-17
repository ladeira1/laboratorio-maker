import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "services/prisma";
import { updateProductValidator } from "validators/storage/products/update";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "PUT") {
      const { pid } = req.query;
      const {
        name,
        amount,
        door,
        floor,
        categoryId,
        lockerId,
        createdBy,
        updatedBy,
      } = req.body;

      await updateProductValidator(req);

      const product = await prisma.product.update({
        where: { id: Number(pid) },
        data: {
          name,
          amount,
          door,
          floor,
          categoryId,
          lockerId,
          createdBy,
          updatedBy,
        },
      });

      return res.status(200).json({ product });
    } else {
      return res.status(400).json({ error: "Invalid request" });
    }
  } catch (error) {
    return res.status(400).json({ error: (error as Error)?.message ?? error });
  }
};

export default handler;

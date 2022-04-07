import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "services/prisma";
import { createProductValidator } from "validators/storage/products/create";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { name, amount, door, floor, categoryId, lockerId, createdBy } =
        req.body;

      await createProductValidator(req);

      const product = await prisma.product.create({
        data: {
          name,
          amount,
          door,
          floor,
          categoryId,
          lockerId,
          createdBy,
        },
      });

      return res.status(201).json({ product });
    } else {
      return res.status(400).json({ error: "Invalid request" });
    }
  } catch (error) {
    return res.status(400).json({ error: (error as Error)?.message ?? error });
  }
};

export default handler;

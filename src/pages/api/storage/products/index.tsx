import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "services/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let a = "";
  try {
    if (req.method === "GET") {
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);
      const startIndex = (page - 1) * limit;

      a += "b";

      const products = await prisma.product
        .findMany({
          orderBy: { updatedAt: "asc" },
          include: { category: true, locker: true },
          take: limit,
          skip: startIndex,
        })
        .catch((err) => (a += JSON.stringify(err)));

      a += "c";
      const totalPages = Math.ceil((await prisma.product.count()) / limit);
      const nextPage = page + 1 > totalPages ? null : page + 1;

      a += "d";

      return res.status(201).json({ products, nextPage, totalPages });
    } else {
      return res.status(400).json({ error: "Invalid request" });
    }
  } catch (error) {
    return res.status(400).json({ error, a });
  }
};

export default handler;

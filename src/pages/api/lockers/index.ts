import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "services/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if(req.method === 'GET') {
      const lockers = await prisma.locker.findMany()
      return res.status(200).json({ lockers })
    } else {
      return res.status(400).json({ error: 'Invalid request' })
    }
  } catch (error) {
    console.log('ai')
    return res.status(400).json({ error })
  }
}

export default handler;
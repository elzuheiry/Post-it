import prisma from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //
    try {
      const data = await prisma.post.findUnique({
        where: {
          id: req.query.details,
        },
        include: {
          author: true,
          comment: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              author: true,
            },
          },
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(403).json({ err: "Error has occured whilst making a post" });
    }
  }
}

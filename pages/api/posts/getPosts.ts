import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Fetch all posts
    try {
      const data = await prisma.post.findMany({
        include: {
          author: true,
          comment: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(403).json({ err: "Error fetching posts" });
    }
  }
}

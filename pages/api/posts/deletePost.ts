import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please sign in" });

    // Create a Post
    try {
      const postId = req.body;
      const result = await prisma.post.delete({
        where: { id: postId },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ err: "Error has occured whilst making a post" });
    }
  }
}

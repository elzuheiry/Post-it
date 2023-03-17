import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please sign in" });

    // Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    // Create a comment
    try {
      const { title, postId } = req.body.data;
      if (!title.length)
        return res
          .status(401)
          .json({ message: "Please do not leave this empty" });

      const result = await prisma.comment.create({
        data: {
          message: title,
          authorId: prismaUser?.id,
          postId,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ err: "Error has occured whilst making a post" });
    }
  }
}

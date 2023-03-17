import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please sign in" });

    // Create a Post
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        include: {
          post: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              comment: true,
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

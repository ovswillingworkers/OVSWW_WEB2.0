import prisma from "../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

interface User {
  id: string;
  name: string;
  email: string;
  images: string;
  role: string;
}

interface ErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const email = req.query.email?.toString();
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
      if (user && user.role === "admin") {
        const users = await prisma.user.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
          },
        });
        res.status(200).json(users);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

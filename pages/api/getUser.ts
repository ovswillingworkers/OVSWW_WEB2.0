import prisma from "../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

interface User {
  id: string;
  name: string;
  email: string;
  role:string;
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
          role:true,
        },
      });
      if (user) {
        console.log(" THIS IS USERRRRR !! RArw ", user)
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

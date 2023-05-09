import prisma from "../../prisma/client";
import { compare } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface LoginRequest {
  email: string;
  password: string;
}

const JWT_SECRET = "your_secret_key_here";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body as LoginRequest;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // const passwordMatch = await compare(password, user.password);

    // if (!passwordMatch) {
    //   return res.status(401).json({ error: "Incorrect password" });
    // }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    res.status(200).json({ token });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

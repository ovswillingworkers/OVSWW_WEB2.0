import prisma from "../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const id = req.body.data.id;

    if (!id) {
      return res.status(400).json({ message: "ID is required for deletion." });
    }

    try {
      // Find the user data before deleting
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Delete the user
      await prisma.user.delete({
        where: { id },
      });

      // Delete the allowUser record with the same email
      const email = user.email;
      await prisma.allowUser.deleteMany({
        where: { email },
      });

      res.status(200).json({ message: "User and allowUser record deleted successfully.", user });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

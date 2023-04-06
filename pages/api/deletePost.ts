import prisma from "../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required for deletion." });
    }

    try {
      await prisma.jobPosting.delete({
        where: { id },
      });

      res.status(200).json({ message: "Job post deleted successfully." });
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

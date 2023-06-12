import prisma from "../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      res.status(405).send("Method not allowed");
      return;
    }

    const jobPosts = await prisma.jobPosting.findMany({
      include: {
        contact: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(jobPosts);
  } catch (err: any) {
    console.error(err); // log the error
    res.status(500).json({
      code: err.code,
      message: err.message,
      stack: err.stack,
    }); // return detailed error information to the client
  }
}

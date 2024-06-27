import prisma from "../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Get count of users and job postings
      const [userCount, jobPostingCount] = await Promise.all([
        prisma.user.count(),
        prisma.jobPosting.count(),
      ]);

      // Check if limits are reached
      const userLimitReached = userCount >= 5;
      const jobPostingLimitReached = jobPostingCount >= 6;

      res.status(200).json({
        userLimitReached,
        jobPostingLimitReached,
      });
    } catch (err: any) {
      console.error(err); // Log the error to the console
      res.status(500).json({
        err: err.message, // Return the error message in the response
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

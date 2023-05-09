import prisma from "../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      id,
      title,
      location,
      salary,
      date,
      description,
      qualifications,
      expirationDate,
      contact,
    } = req.body;

    // Check if required data is present
    if (
      !id ||
      !title ||
      !location ||
      !salary ||
      !date ||
      !description ||
      !qualifications ||
      !expirationDate ||
      !contact
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      const JobPosting = await prisma.jobPosting.update({
        where: { id },
        data: {
          title,
          location,
          salary,
          date,
          description,
          qualifications,
          expirationDate,
          contact: {
            update: {
              id: contact.id,
              name: contact.name,
              email: contact.email,
              phone: contact.phone,
            },
          },
        },
      });

      res.status(200).json(JobPosting);
    } catch (err: any) {
      console.error(err); // log the error to the console
      res.status(500).json({
        error: "Internal server error",
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

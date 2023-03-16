import prisma from "../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, location, salary, date, description, qualifications, contact } =
      req.body;

    // Check if required data is present
    if (!title || !location || !salary || !date || !description || !qualifications || !contact) {
      return res.status(400).json({ message: "All fields are required." });
    }

    //Create JobPosting
    try {  
      const result = await prisma.jobPosting.create({
        data: {
          title,
          location,
          salary,
          date,
          description,
          qualifications,
          contact: {
            create: {
              name: contact.name,
              email: contact.email,
              phone: contact.phone,
            },
          },
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({
        err: "Error has occurred while creating a job posting",
      });
    }
  }
}

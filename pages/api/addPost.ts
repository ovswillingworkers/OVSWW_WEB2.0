import prisma from "../../prisma/client";

import { authOptions } from "../api/auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
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

    //Create JobPosting
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
          expirationDate,
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
    } catch (err: any) {
      console.error(err); // log the error to the console
      res.status(403).json({
        err: err.message, // return the error message in the response
      });
    }
  }
}

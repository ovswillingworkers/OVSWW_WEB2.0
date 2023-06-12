import prisma from "../../prisma/client";
import { hash } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

interface AddAdminRequest {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, role } = req.body as AddAdminRequest;
  const id = uuidv4();
  // Validate the required fields

  if (!email || !name || !role) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  // Check if user already exists with the given email
  const existingAdmin = await prisma.allowUser.findUnique({ where: { email } });
  if (existingAdmin?.role != "admin") {
    return res.status(400).json({ error: "Unauthorize User" });
  }

  // Hash the password before storing it in the database
  // const hashedPassword = await hash(password, 10);

  // updating allowusers and user table
  try {
    await prisma.$transaction([
      prisma.allowUser.update({
        where: { email },
        data: { role },
      }),
      prisma.user.update({
        where: { email },
        data: { role },
      }),
    ]);

    res.status(201).json({
      message: "User updated successfully",
      user: { id, name, email, role },
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

import prisma from "../../prisma/client";
import { hash } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';

interface AddAdminRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {  name, email, password } = req.body as AddAdminRequest;
  const id = uuidv4();
  // Validate the required fields
  console.log(name, "name ||", email ," || ", password,"pass||", )
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  // Check if user already exists with the given email
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash the password before storing it in the database
  const hashedPassword = await hash(password, 10);

  // Create the new user in the database
  const newUser = await prisma.user.create({
    data: {
      id,
      name,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: "Admin user created successfully", user: newUser });
}

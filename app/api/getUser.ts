import axios from "axios";
import { User } from "../components/user";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { useDispatch } from "react-redux";
import { setRedUser } from "../redux/reducer/usersSlice";

export async function getUser(email: string) {
  try {
    console.log("calling getUser");
    const res = await axios.get("/api/getUser", { params: { email } });
    const userResponse = res.data;
    console.log(userResponse, "THIS IS GET USER DATA");

    const user: User = {
      id: userResponse.id,
      name: userResponse.name,
      email: userResponse.email,
      image: userResponse.image,
      role: userResponse.role,
    };

    return user;
  } catch (error) {
    console.error(error);
    return error;
  }
}

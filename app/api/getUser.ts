
import axios from "axios";
import { User } from "../components/user"
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';

import { useDispatch } from "react-redux";



export default async function getUser(email: string) {
  try {

    console.log(" calling get user")
    const res = await axios.get("/api/getUser", { params: { email } });
    const data = res.data;

    return data as User;
  } catch (error) {
    
    return error;
  }
}

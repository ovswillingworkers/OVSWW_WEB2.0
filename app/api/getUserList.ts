import axios from "axios";
import { User } from "../components/user";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { useDispatch } from "react-redux";


export async function getUserList(email: string) {
    try {

      const res = await axios.get("/api/getUserList", { params: { email } });
      const userResponse = res.data;
     
  
      const users: User[] = userResponse.map((userData: any) => {
        const user: User = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          image: userData.image,
          role: userData.role,
        };
        return user;
      });
  
      return users;
    } catch (error) {
      console.error(error);
      return false;
    }


  }
  

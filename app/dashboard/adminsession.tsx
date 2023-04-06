
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import getUser from '../api/getUser';



const USER_FIELDS = {
  select: {
    id: true,
    name: true,
    email: true,
    emailVerified: true,
    image: true,
    role: true,
  },
};

export default async function AdminSession() {

  const session = await getServerSession(authOptions)



  if (!session) {
   return null
    
  }

  return (

   session

  )   
       
      
}

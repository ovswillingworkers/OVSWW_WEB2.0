import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { getUser } from "../api/getUser";
import { getSession } from "next-auth/react";

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

// export async function getServerSideProps(context:any){
//   const session = await getSession(context)

//   if (!session){
//     return {
//       redirect:{
//         destination: ' /unauthenticated',
//         permanent:false,
//       }
//     }
//   }

//   return {
//     props:{session}
//   }

// }

export default async function AdminSession() {
  const session = await getServerSession(authOptions);
console.log(" THIS IS SERVER SIDE SESSION")
  if (!session) {
    return null;
  }

  return session;
}

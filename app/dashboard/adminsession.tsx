import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";


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

  if (!session) {
    return null;
  }

  return session;
}

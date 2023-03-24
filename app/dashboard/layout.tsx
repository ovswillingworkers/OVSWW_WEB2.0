
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Logged from '../auth/Logged';
import QueryWrapper from '../auth/QueryWrapper';
import Image from 'next/image';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';


export default async function layout({ children, }: {
  children: any;
}) {

  const session = await getServerSession(authOptions)
  console.log(session, "  SESSION HERE")
//   if (session) {
//     redirect("/dashboard")
    
//   }



  return (

  
      <QueryWrapper>



 <Image 
    className="w-14 rounded-full"
    width={100} 
    height={100} 
    src={session?.user?.image || ''}
    alt=""
    priority
     />
{/* <Logged image={session?.user?.image || ''}/> */}
        {children}
      
            </QueryWrapper>

  )   
       
      
}

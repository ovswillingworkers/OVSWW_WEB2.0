
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import QueryWrapper from '../auth/QueryWrapper';



export default async function layout({ children, }: {
  children: any;
}) {

  const session = await getServerSession(authOptions)
  if (session) {

    redirect("/dashboard")
    
  }



  return (

  
      <QueryWrapper>


        {children}
      
            </QueryWrapper>

  )   
       
      
}

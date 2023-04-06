
import { redirect } from 'next/navigation';
import QueryWrapper from '../auth/QueryWrapper';
import adminbanner from "../../public/assets/admin.jpg";
import AdminNav from './adminNav';
import React from 'react';
import AdminSession from './adminsession';
import getUser from '../api/getUser';
import Authentication from '../auth/Authentication';
import { Provider } from 'react-redux';
import { store_0001 } from '../redux/store/store';
import ValidAuth from '../auth/validAuth';



export default async function layout({ children, }: {
  children: any;
}) {
//  const store =  store_0001
//  console.log(store, " STORE IN LAYOUT")
  const session = await AdminSession()

  if (!session) {
    redirect("/admin")
    
  }

  // const user = await getUser(session.user?.email || '')
  // console.log("THIS SHOULD BE THE DATA I BE USING NOW ON.", user)


  return (

  <>





  <QueryWrapper >





      {/* <AdminNav image={session?.user?.image || ''} banner={adminbanner.src} email={session?.user?.email || ''} /> */}
      <AdminNav image={ ''} banner={adminbanner.src} email={session.user?.email || ''} />

      {React.cloneElement(children, { session: session })}
    </QueryWrapper>

    

    
    </>

  )   
       
      
}

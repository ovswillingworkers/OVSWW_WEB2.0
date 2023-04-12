
import { redirect } from 'next/navigation';
import QueryWrapper from '../auth/QueryWrapper';
import adminbanner from "../../public/assets/admin.jpg";
import AdminNav from './adminNav';
import React from 'react';
import AdminSession from './adminsession';
import {getUser} from '../api/getUser';

import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import  getAuth from '../auth/getAuth';
import useAuthRedux from '../auth/getAuthRedux';
import { getServerSession } from 'next-auth';





export default async function layout({ children, store }: {
  children: any;
  store:any;
}) {

//  console.log(store, " STORE IN LAYOUT")
  const session = await AdminSession()
console.log(session, " LAYOUT REACH OUT LAYOUT ")
  if (!session) {
    redirect("/admin")
    
  }


  // const user = await getUser(session.user?.email || '')
  // console.log("THIS SHOULD BE THE DATA I BE USING NOW ON.", user)


  return (

  <>





  <QueryWrapper >





 

      <AdminNav image={ session.user?.image as string} banner={adminbanner.src} email={session.user?.email || ''} />

      {children}
    </QueryWrapper>

    

    
    </>

  )   
       
      
}




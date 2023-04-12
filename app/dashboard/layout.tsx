
import { redirect } from 'next/navigation';
import QueryWrapper from '../auth/QueryWrapper';
import adminbanner from "../../public/assets/admin.jpg";
import AdminNav from './adminNav';
import React from 'react';
import AdminSession from './adminsession';
import {getUser} from '../api/getUser';

import { Provider } from 'react-redux';
import { store_0001 } from '../redux/store/store';
import  getAuth from '../auth/getAuth';
import getAuthRedux from '../auth/getAuthRedux';
import { getServerSession } from 'next-auth';





export default async function layout({ children, }: {
  children: any;
}) {
//  const store =  store_0001
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

      {React.cloneElement(children)}
    </QueryWrapper>

    

    
    </>

  )   
       
      
}



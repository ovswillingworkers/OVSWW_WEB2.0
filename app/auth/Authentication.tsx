'use client'

import  { ReactNode, useEffect } from 'react'
import {QueryClient, QueryClientProvider}from '@tanstack/react-query'
import {Toaster} from "react-hot-toast"
import getUser from '../api/getUser'
import { useDispatch } from 'react-redux';


interface Props {
  children?: ReactNode;
  session?: any; // Replace 'any' with the type of your session object
}

const queryClient = new QueryClient()


const Authentication=({children, session}: Props)=> {
 

  useEffect(() => {
    async function fetchData() {
      const result = await getUser(session);
      console.log( result, " THIS IS THE QUERY WRAPPER. THIS SHOULD BE ADMIN CHECK")
      // Do something with the data
     
    }
    fetchData();
  }, []);

  return (
    <div>
      {children}
    </div>
  )
}


export default Authentication
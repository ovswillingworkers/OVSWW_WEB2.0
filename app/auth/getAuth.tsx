'use client'
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Logged from "./Logged";
import ovsww_logo from "../../public/assets/ovs_ww.png"
import {getUser} from "../api/getUser";
import { useSelector } from 'react-redux';
import UsersState from "../redux/reducer/usersSlice"
 
import AdminSession from "../dashboard/adminsession";
import { getSession } from "next-auth/react";
import { User } from "../components/user";
import { RootState } from "../redux/reducer/rootReducer";

async function getLoginSession(): Promise<{ session: any, user: User | null }> {
  const session = await getSession();
  if (session) {
    const email = session.user?.email as string
    const userResponse = await getUser(email) as User;
    console.log(userResponse, " VALID AUTH YOO")
    return { session, user: userResponse };
  } else {
    return { session: null, user: null };
  }
}


// this get SERVERSSION. from the Login.
// The procceeds to check the database. we are able to get login.
// maybe create a checking if it's admin or w.e role it needs to be to be clear.?
export default function getAuth (roles: string[])  {
  const [users, setUsers] = useState<User| null>(null);
  const [validate, setValidate] = useState(false)

  useEffect(() => {
    async function fetchUser() {
      const session = await getSession();
      if (session) {
        const email = session.user?.email as string
        const userResponse = await getUser(email) as User;
        console.log(userResponse, " VALID AUTH YOO")
       
        if (userResponse && userResponse.id) { // check if userResponse is not empty and has an id
        
         
          console.log(userResponse, " USER RESPONSE .. ")
          setUsers(userResponse);
          setValidate(true)
        } else {
          // handle the case where the userResponse is empty or invalid
          setValidate(false)
          console.log('Error: getUser response is empty or invalid');
          // you can also set the `user` state to `null` or an empty object if needed
        }
      }
    }
    
    fetchUser();
  }, []);

  console.log( " VALID AUTH -> validate: ",validate )

  if (!validate){
    console.log("There's no user login. SHOULD LOGOUT FORCE. no not authorize", validate)
    return false;
  }

  if (roles.includes(users?.role as string)) {
    console.log("user is allowed")
    return true;
  } else {
    console.log('Error: user role is not authorized');
    return false;
  }
};








// export default ValidAuth;



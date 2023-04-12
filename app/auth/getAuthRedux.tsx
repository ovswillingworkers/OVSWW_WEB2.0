'use client'
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { User } from "../components/user";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../api/getUser";
import { Session } from "@auth0/nextjs-auth0";

// export default function useAuthRedux () {
//   const user = useSelector((state: any) => { return state.users.users});
//   const [validate, setValidate] = useState(false)
//   const dispatch = useDispatch()
// console.log(" THIS IS REDUX USER:: ", user as User)
 

//  useEffect(() => {
//   async function fetchUser() {
//     console.log((user.length==0), " if length is zero")
//     if (user.length == 0) {
//       const session = await getSession();
//       if (session) {
//         const email = session.user?.email as string;
//         const userResponse = await getUser(email) as User;
//         if (userResponse && userResponse.id) {
//           dispatch(setRedUser(userResponse));
//           setValidate(true);
//         } else {
//           setValidate(false);
//           console.log("Error: getUser response is empty or invalid");
//         }
//       }
//     } else {
//       setValidate(true);
//     }
//   }
//   fetchUser();
// }, [[user.length, dispatch]]);

//   return validate;
// };



export default async function useAuthRedux({user=""}: any) {
 
  let validate = false


  console.log("THIS IS REDUX USER: ", user );

  if (!user ) {
    const session = await getSession();
    if (session) {
      const user_return = session.user as User
      
      return user_return

    }
  } else {
   validate= false
  }

  return  validate;
}


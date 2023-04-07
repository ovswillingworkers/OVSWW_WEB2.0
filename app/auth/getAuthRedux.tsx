import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { User } from "../components/user";
import { useDispatch } from "react-redux";
import { setRedUser } from "../redux/reducer/usersSlice";
import { getUser } from "../api/getUser";

export default function getAuthRedux () {
 
  const [validate, setValidate] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchUser() {
      const session = await getSession();
      if (session) {
        const email = session.user?.email as string
        const userResponse = await getUser(email) as User;
       

        if (userResponse && userResponse.id) {
          
        
          dispatch(setRedUser(userResponse))
          setValidate(true)
          return true; // dispatch was successful
        } else {
          setValidate(false)
          console.log('Error: getUser response is empty or invalid');
          return false; // dispatch was not successful
        }
      }
    }
    
    fetchUser();
  }, []);

  return validate;
};

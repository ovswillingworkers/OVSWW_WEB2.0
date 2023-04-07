'use client'
import { Button } from "antd"
// import "../../styles/global.scss";
import { signIn } from "next-auth/react"
import Googlelogo from "../../public/assets/google.jpg";
import Image from "next/image";
import '../../styles/global.scss';



export default function Login() {
//  const handleSignIn = async () => {
//     const result = await signIn('google');
//     if (result?.error) {
//       // Handle authentication error
//     } else {
//       // Store session data in local storage
//       localStorage.setItem('session', JSON.stringify(result));
//       // Redirect to dashboard page
//       window.location.href = '/dashboard';
//     }
//   };


  return (
    <li className="list-none">
       <Button className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25" onClick={() => signIn('google')} type="primary" ghost>
Sign In
<Image
className='G-logo'
src={Googlelogo}
alt="Google Logo"
width={20}
height={20}

/>

    </Button>
    
    </li>
  )
}



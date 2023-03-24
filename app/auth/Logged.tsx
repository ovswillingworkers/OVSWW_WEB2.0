

import Image from "next/image"


import {signOut} from 'next-auth/react'
import Link from "next/link"
import { Button, Space } from "antd"
import Userimage from "./Userimage"

type User={
    image:string
}


 function Logged({image}: User) {

  
  return (
   <div className="logged flex flex-col gap-8 items-center">

    <Space wrap>
      
    <Image 
    className="w-14 rounded-full"
    width={100} 
    height={100} 
    src={image}
    alt=""
    priority
     />
<Button onClick={()=>signOut()}  type="primary" danger>
  Signout
</Button>


</Space>
   
   </div>
  )
}
export default Logged
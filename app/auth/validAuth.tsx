'use client'
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Logged from "./Logged";
import ovsww_logo from "../../public/assets/ovs_ww.png"
import getUser from "../api/getUser";
import { useDispatch } from "react-redux";
import {setUser}  from "../redux/reducer/usersSlice"
import AdminSession from "../dashboard/adminsession";


type User={
  image:string
 
  email:string;
}


function ValidAuth ({image, email}: User)  {
  const [showMenu, setShowMenu] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null); // create a ref for the nav_menu element
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMenu && navMenuRef.current && !navMenuRef.current.contains(event.target as Node)) { // check if the event target is inside the nav_menu element
        setShowMenu(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);


  useEffect(() => {
    const fetchData = async () => {
      // const user = await getUser(email);
     // console.log(user, " THIS IS getUser functioN inside VALIDAUTH. ");
      // do something with the user data
  
      const user = { name: 'John', age: 30 }; // a User object

      dispatch(setUser(user))
    };
  
    fetchData();
  }, []);
  

  return (
   <>
   <p>you are a vlid login</p>
   </>
  );
};

export default ValidAuth;



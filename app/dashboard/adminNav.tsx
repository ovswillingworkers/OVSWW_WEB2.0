'use client'
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Logged from "../auth/Logged";
import ovsww_logo from "../../public/assets/ovs_ww.png"
import { connect } from "react-redux";


type User={
  image:string
  banner:string;
  email:string;
}


function AdminNav ({image, banner="", email}: User)  {
  const [showMenu, setShowMenu] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null); // create a ref for the nav_menu element




  const handleLinkClick = () => {
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

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




  return (
    <nav className="admin-nav flex justify-between items-center py-8" >
   <div className="admin-nav_home">
        <Image
                  src={ovsww_logo}
                  alt={"image here"}
                  className="w-14 rounded-full"
                  width={50}
                  height={50}
                  priority />

                  <p>OVS Willing Workers</p>
      </div>
      
      


      <div className="admin-nav_menu" ref={navMenuRef}>
      {/* <div className="menu-icon" onClick={toggleMenu}>
          &#9776;
        </div> */}
        <ul className={showMenu ? "menu-admin show-menu" : "menu-admin"}>
            
          {image ? (

            <><li>
              <Logged image={""} />
            </li><li>
                <Image
                  src={image}
                  alt={"image here"}
                  className="w-14 rounded-full"
                  width={50}
                  height={50}
                  priority />
              </li></>
          ) : null}
       
        </ul>
      </div>
      <div className="about-container-banner mt-4 p-5 bg-primary text-white"   >
     
      </div>
    </nav>
  );
};

export default AdminNav;

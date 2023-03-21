'use client'
import Link from "next/link";
import { useEffect, useState, useRef } from "react";



const Nav: React.FC = () => {
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
    <nav className="nav flex justify-between items-center py-8" >
      
      <div className="nav_home">
        <Link href="/">Willing Workers</Link>
      </div>
      
      <div className="nav_menu" ref={navMenuRef}>
      <div className="menu-icon" onClick={toggleMenu}>
          &#9776;
        </div>
        <ul className={showMenu ? "menu show-menu" : "menu"}>

          <li>
            <Link href="/programs"onClick={handleLinkClick}>Programs</Link>
          </li>
          <li>
            <Link href="/about"onClick={handleLinkClick}>About</Link>
          </li>
          <li>
            <Link href="/contact"onClick={handleLinkClick}>Contact</Link>
          </li>

          <li>
            <Link href="/career">Career</Link>
          </li>
        </ul>
      </div>

    </nav>
  );
};

export default Nav;

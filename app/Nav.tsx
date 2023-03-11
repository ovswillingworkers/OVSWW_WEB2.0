'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
type NavProps = {};
type NavState = {
  showMenu: boolean;
};

const Nav: React.FC<NavProps> = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleLinkClick = () => {
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMenu && !event.composedPath().includes(document.querySelector(".nav_menu") as Element)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <nav className="nav flex justify-between items-center py-8">
      
      <div className="nav_home">
        <Link href="/">Willing Workers</Link>
      </div>
      
      <div className="nav_menu">
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

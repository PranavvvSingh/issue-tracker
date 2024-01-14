"use client"
import classNames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { AiFillBug } from "react-icons/ai"

const NavBar = () => {
   const currentPath = usePathname()
   const Links = [
      { name: "Dashboard", href: "/" },
      { name: "Issues", href: "/issues" },
   ]

   return (
      <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
         <Link href="/">
            <AiFillBug />
         </Link>
         <ul className="flex space-x-6">
            {Links.map((link) => (
               <li key={link.href}>
                  <Link
                     href={link.href}
                     className={classNames(
                        {
                           "text-neutral-800": currentPath === link.href,
                           "text-neutral-400 ": currentPath !== link.href,
                        },
                        "hover:text-neutral-600 transition-colors",
                     )}
                  >
                     {link.name}
                  </Link>
               </li>
            ))}
         </ul>
      </nav>
   )
}

export default NavBar

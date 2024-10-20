"use client"
import React, { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

const Header = () => {
  const { data: session } = useSession()
  const [showdropdown, setshowdropdown] = useState(false);
  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-700 text-white h-16 px-4 gap-2 flex justify-between items-center ">
   
        <Link href={"/"} className="logo font-bold flex justify-center items-center" >
          <img src="/tea.gif" width={36} className="mb-4 " alt="image" />
          <span className="ml-5">Get me a chai</span>
        </Link>
      
      <div className=" flex justify-center items-center ">

        {session && <>
          <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white relative mx-4 bg-blue-700 
             hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
              text-center inline-flex 
            items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"
             onBlur={() => (setTimeout(() => {setshowdropdown(false),100}))} onClick={() =>
              (setshowdropdown(!showdropdown))}> welcome  {session.user.email}<svg
                className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <div id="dropdown" className={`z-10 ${!showdropdown ? "" : "hidden"} left-[125px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
            <ul className="py-2 bg-white fixed text-black text-sm dark:text-gray-200 " aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
              </li>             
              <li>
                <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
              </li>
            </ul>
          </div>
        </>}


        {session &&        
          <button type="button" className="text-white bg-gradient-to-r  from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => signOut()}>Logout</button>
        }
        {!session && <Link href={"/login"}>
          <button type="button" className="text-white bg-gradient-to-r  from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
        </Link>}


      </div>
    </nav>
  );
}

export default Header
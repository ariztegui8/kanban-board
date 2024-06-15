import React from 'react'
import logo from '../assets/logo.svg'
import logo2 from '../assets/logo2.svg'
import { MdOutlineEmail } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import More from './More';



const Navbar = () => {
  return (
    <div className='fondo py-1 px-4'>
      <div className='flex justify-between gap-4 items-center'>
        <div className='flex items-center gap-1'>
          <img src={logo.src} alt='logo' />
          <img src={logo2.src} alt='logo' />
          {/* <p className='text-white font-bold text-2xl'>vambe</p> */}
        </div>
        <div className='flex gap-4 items-center'>
          <div className='hidden sm:flex'>
            <MdOutlineEmail
              size={24}
              color='#fff'
              className='cursor-pointer'
            />
          </div>
          <div className='hidden sm:flex'>
            <IoNotificationsOutline 
              size={24}
              color='#fff'
              className='cursor-pointer'
            />
          </div>
          <div className='hidden sm:flex'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div>
           <More />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
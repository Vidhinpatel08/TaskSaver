import React from 'react'
import Logo from '../assets/Logo.svg'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex w-full justify-between px-3 sm:justify-around items-center bg-indigo-900 text-white sm:text-[19px] text-[15px] p-1 sticky top-0 font-[math]'>
      <div className="logo w-9 flex gap-2 items-center font-bold ">
        <img src={Logo} alt="" />
        <span>TaskSaver</span>
      </div>
      <ul className='flex gap-8'>
        <NavLink to="/" className='hover:font-bold'><li>Home</li></NavLink>
        <NavLink to="/your-todo" className='hover:font-bold'><li>Your Todos</li></NavLink>
      </ul>
    </div>
  )
}

export default Navbar

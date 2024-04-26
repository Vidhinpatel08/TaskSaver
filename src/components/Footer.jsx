import React from 'react'

const Footer = () => {
  const Hostname = import.meta.env.VITE_HOSTNAME || 'www.tasksaver.org'
  return (
    <div className='bg-indigo-900 text-white text-lg flex  sm:text-[19px] text-[15px] justify-center items-center p-2 font-[math]'>
      Copyright &copy; {`${Hostname}`} | All rights reserved
    </div>
  )
}

export default Footer
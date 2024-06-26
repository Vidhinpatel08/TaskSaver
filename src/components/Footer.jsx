import React from 'react'

const Footer = () => {
  // const Hostname = import.meta.env.VITE_HOSTNAME || 'mytasksaver.netlify.app'
  const Hostname =  'mytasksaver.netlify.app'
  return (
    <div className='bg-indigo-900 text-white text-lg flex  sm:text-[19px] text-[15px] justify-center items-center p-2 font-[math] text-center'>
      <span className='w-10/12 md:w-full'>Copyright &copy; {`${Hostname}`} | All rights reserved</span>
    </div>
  )
}

export default Footer
import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    let navigate = useNavigate()
  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-3xl sm:text-5xl md:text-6xl gap-5 text-white flex flex-col items-center justify-center text-center px-4'>
        404 Page Not Found
        <button className='bg-white px-[20px] py-[10px] rounded-xl text-[18px] text-[18px] text-[black] cursor-pointer' onClick={()=>navigate('/login')}>Login</button>
    </div>
  )
}

export default NotFound
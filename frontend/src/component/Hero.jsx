import React from 'react'
import { FaCircle } from "react-icons/fa6";


const Hero = ({heroData,heroCount,setHeroCount}) => {
  return (
    <div className='relative z-10 h-full flex flex-col justify-center px-5 sm:px-10 lg:px-16 max-w-3xl'>
        <div className='text-[#88d9ee] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight'>
            <p>{heroData.text1}</p>
            <p className='mt-2 text-white/90 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium'>{heroData.text2}</p>
        </div>
        <div className='mt-8 flex items-center gap-3'>
        <FaCircle className={`w-3.5 h-3.5 cursor-pointer ${heroCount===0? "fill-orange-400": "fill-white"}`} onClick={()=>setHeroCount(0)} />
        <FaCircle className={`w-3.5 h-3.5 cursor-pointer ${heroCount===1? "fill-orange-400": "fill-white"}`} onClick={()=>setHeroCount(1)}/>
        <FaCircle className={`w-3.5 h-3.5 cursor-pointer ${heroCount===2? "fill-orange-400": "fill-white"}`} onClick={()=>setHeroCount(2)}/>
        <FaCircle className={`w-3.5 h-3.5 cursor-pointer ${heroCount===3? "fill-orange-400": "fill-white"}`} onClick={()=>setHeroCount(3)}/>
        </div>
    </div>
  )
}

export default Hero

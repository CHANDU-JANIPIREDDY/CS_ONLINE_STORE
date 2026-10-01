import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

const policies = [
  {
    icon: RiExchangeFundsLine,
    title: "Easy Exchange Policy",
    text: "Exchange Made Easy - Ouick, Simple and Customer Friendly Process.",
  },
  {
    icon: TbRosetteDiscountCheckFilled,
    title: "7 Daays Return Policy",
    text: "Shop With Confidence - 7 Days Easy Return Guarantee.",
  },
  {
    icon: BiSupport,
    title: "Best Customer Support",
    text: "Trusted Customer Support - Your Satisfaction Is Our Priority.",
  },
]

function OurPolicy() {
  return (
    <section className='w-full bg-gradient-to-r from-[#141414] to-[#0c2025] px-4 sm:px-6 lg:px-10 py-12 md:py-16'>
      <div className='mx-auto max-w-3xl text-center'>
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className='text-sm sm:text-base md:text-lg text-blue-100 px-2'>
          Customer-Frienly Policies Commited to Your Satisfaction and Safety
        </p>
      </div>
      <div className='mx-auto mt-8 md:mt-12 grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
        {policies.map(({ icon: Icon, title, text }) => (
          <div key={title} className='group flex flex-col items-center justify-center text-center gap-3 rounded-xl px-4 py-6 sm:px-6 border border-transparent transition duration-300 hover:-translate-y-1 hover:border-[#8ee9f2]/50 hover:bg-[#ffffff08] hover:shadow-[0_16px_36px_rgba(6,20,24,0.35)]'>
            <Icon className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#90b9ff] transition duration-300 group-hover:scale-110 group-hover:text-[#d8fcff]' />
            <p className='font-semibold text-lg sm:text-xl md:text-2xl text-[#a5e8f7] transition duration-300 group-hover:text-white'>{title}</p>
            <p className='font-medium text-sm sm:text-base text-[aliceblue] max-w-sm'>{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurPolicy

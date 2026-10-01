import React from 'react'
import Title from '../component/Title'
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-10 pt-24 pb-28 lg:pb-10 px-4'>
      <Title text1={'CONTACT'} text2={'US'}/>
      <div className='w-full max-w-6xl flex items-center justify-center flex-col lg:flex-row gap-6'>
        <div className='lg:w-1/2 w-full flex items-center justify-center'>
          <img src="https://i.pinimg.com/736x/57/ba/9a/57ba9aab625108731f2e85fd294c4f2d.jpg" alt=""  className='w-[85%] sm:w-[70%] lg:w-[80%] max-w-md shadow-md shadow-black rounded-sm'/>
        </div>
        <div className='lg:w-1/2 w-full flex items-start justify-center gap-5 flex-col mt-2 lg:mt-0 px-2'>
          <p className='w-full text-white font-bold text-base lg:text-lg'>Our Store</p>
          <div className='w-full text-white text-sm md:text-base'>
            <p>CS-STORE</p>
            <p>Bhimavaram, Andhra Pradesh, India</p>
          </div>

          <div className='w-full text-white text-sm md:text-base'>
            <p>Tel: +91-7680914066 </p>
            <p className='break-all'>Email: admin@cs.com</p>
          </div>

          <p className='w-full text-white font-bold text-base lg:text-lg mt-2'>Careers at CS-STAORE</p>
          <p className='w-full text-white text-sm md:text-base'>Learn more about our teams and job openings</p>
          <button className='px-[30px] py-[20px] flex items-center justify-center text-[white] bg-transparent border  active:bg-slate-600 rounded-md'>
            Explore Jobs
          </button>
        </div>
      </div>

      <NewLetterBox/>
    </div>
  )
}

export default Contact
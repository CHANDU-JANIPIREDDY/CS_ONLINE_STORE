import React from 'react'
import Title from '../component/Title'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-10 pt-24 pb-28 lg:pb-10 px-4'>
      <Title text1={"ABOUT"} text2={"US"}/>
      <div className='w-full max-w-6xl flex items-center justify-center flex-col lg:flex-row gap-6'>
        <div className='lg:w-1/2 w-full flex items-center justify-center'>
          <img src="https://i.pinimg.com/736x/0c/e8/c1/0ce8c1da729b950f6369b58ac10377a9.jpg" alt="" className='w-[85%] sm:w-[70%] lg:w-[75%] max-w-md shadow-md shadow-black rounded-[20px]'/>
        </div>
        <div className='lg:w-1/2 w-full flex items-start justify-center gap-5 flex-col mt-2 lg:mt-0 px-2'>
          <p className='w-full text-white text-sm md:text-base'>
            CS-Store was created for smart, seamless shopping — bringing together quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, and great value, CS-Store makes your online shopping experience simple, satisfying, and stress-free.
          </p>
          <p className='w-full text-white text-sm md:text-base'>
            At CS-Store, we believe shopping should be more than just a transaction — it should be an experience you enjoy. That’s why we handpick every product, ensure transparent pricing, and back every order with dedicated customer support. Whether you’re chasing the latest trends or stocking up on daily essentials, we’re here to deliver convenience, quality, and trust at every step.
          </p>
          <p className='w-full text-white text-base lg:text-lg mt-2 font-bold'>Our Mission</p>
          <p className='w-full text-white text-sm md:text-base'>
            Our mission at CS-Store is to make online shopping effortless, enjoyable, and accessible for everyone. We strive to combine quality, affordability, and speed, ensuring every customer gets exactly what they need—when they need it. By embracing innovation and putting our customers first, we aim to create a trusted destination where style, convenience, and value meet.
          </p>
        </div>
      </div>
      <div className='w-full max-w-6xl flex items-center justify-center flex-col gap-3'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
        <div className='w-full grid grid-cols-1 md:grid-cols-3 py-6 md:py-10'>
          <div className='min-h-[200px] border border-gray-100 flex items-center justify-center gap-4 flex-col px-6 py-8 text-center text-white backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className='text-lg sm:text-xl font-semibold text-[#bff1f9]'>Quality Assurance</b>
            <p className='text-sm sm:text-base'>We gaurantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.</p>
          </div>
          <div className='min-h-[200px] border border-gray-100 flex items-center justify-center gap-4 flex-col px-6 py-8 text-center text-white backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className='text-lg sm:text-xl font-semibold text-[#bff1f9]'>Convinience</b>
            <p className='text-sm sm:text-base'>Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.</p>
          </div>
          <div className='min-h-[200px] border border-gray-100 flex items-center justify-center gap-4 flex-col px-6 py-8 text-center text-white backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className='text-lg sm:text-xl font-semibold text-[#bff1f9]'>Exceptional Customer Services</b>
            <p className='text-sm sm:text-base'>Our dedicated Support team ensures quick responces,helpful solutions, and a smooth shopping experience every time.</p>
          </div>
        </div>
      </div>
      <NewLetterBox/>
    </div>
  )
}

export default About
import React from 'react'

function NewLetterBox() {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
  return (
    <div className='w-full px-4 sm:px-6 py-12 md:py-16 flex flex-col items-center text-center bg-gradient-to-l from-[#141414] to-[#0c2025] gap-4'>
        <p className='text-xl sm:text-2xl md:text-3xl text-[#a5faf7] font-semibold'>Subscribe Now & 20% Off</p>
        <p className='max-w-2xl text-sm sm:text-base md:text-lg text-blue-100 font-semibold'>
            Subscribe Now and Enjoy Exclusive Savings,Special Deals and Early Access to New collection.
        </p>
        <form onSubmit={handleSubmit} className='w-full max-w-xl flex flex-col sm:flex-row items-stretch gap-3 mt-2'>
            <input type="email" placeholder='Enter Your Email' className='min-w-0 flex-1 h-11 placeholder:text-black bg-slate-300 px-4 rounded-lg shadow-sm shadow-black' required />
            <button type='submit' className='h-11 shrink-0 px-6 text-sm sm:text-base hover:bg-slate-500 cursor-pointer bg-[#2e3030c9] text-white border border-[#80808049] rounded-lg shadow-sm shadow-black'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewLetterBox

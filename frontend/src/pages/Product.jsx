import React from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'

function Product() {
  return (
   <div className='w-full bg-gradient-to-b from-[#141414] to-[#0c2025] flex flex-col py-6 sm:py-10'>
     <LatestCollection/>
     <BestSeller/>
   </div>
  )
}

export default Product

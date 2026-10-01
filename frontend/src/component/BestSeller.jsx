import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
  let {products} = useContext(shopDataContext)
  let [bestSeller,setBestSeller] = useState([])

 useEffect(() => {
  setBestSeller(products.slice(0, 4));
}, [products]);
  return (
    <section className='w-full px-4 sm:px-6 lg:px-10 py-8 text-center'>
      <Title text1={"BEST"} text2={"SELLER"}/>
      <p className='max-w-3xl mx-auto text-sm sm:text-base md:text-lg px-2 text-blue-100'>
        Tried, Tested, Loved Discover Over All-Time Best Sellers.
      </p>
      <div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto justify-items-center'>
        {
          bestSeller.map((item,index)=>(
            <Card key={index} name={item.name} id={item._id} price={item.price} image={item.image1}/>
          ))
        }
      </div>
    </section>
  )
}

export default BestSeller

import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
  let {products} = useContext(shopDataContext)
  let [latestProduct,setLatestProduct] = useState([])

  useEffect(()=>{
    setLatestProduct(products.slice(0,8))
  },[products])

  return (
    <section className='w-full px-4 sm:px-6 lg:px-10 py-10 text-left'>
        <div className='mx-auto max-w-6xl'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"}/>
        <p className='max-w-2xl text-sm sm:text-base text-blue-100'>Step Into Style-New Collections Droping This Season!</p>
        <div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto justify-items-center'>
          {
            latestProduct.map((item,index)=>(
              <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price}/>
            ))
          }
        </div>
        </div>
    </section>
  )
}

export default LatestCollection

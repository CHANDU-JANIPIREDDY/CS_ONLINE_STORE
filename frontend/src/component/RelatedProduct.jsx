import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

function RelatedProduct({category,subCategory,currentProductId}) {
    let {products} = useContext(shopDataContext)
    let [related,setRelated] = useState([])

    useEffect(()=>{
      if(products.length >0){
        let productsCopy =products.slice()
        productsCopy = productsCopy.filter((item)=> category === item.category)
        productsCopy = productsCopy.filter((item)=> subCategory === item.subCategory)
        productsCopy = productsCopy.filter((item)=>currentProductId !== item._id)
        setRelated(productsCopy.slice(0,4))


      }
    },[products,category,subCategory,currentProductId])
  return (
    <div className='w-full px-4 sm:px-6 lg:px-10 py-10'>
      <div className='text-center'>
        <Title text1={'RELATED'} text2={'PRODUCTS'}/>
      </div>
      <div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto justify-items-center'>
        {
          related.map((item,index)=>(
            <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1}/>
          ))
        }
      </div>
    </div>
  )
}

export default RelatedProduct
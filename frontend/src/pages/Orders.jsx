import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'

import axios from 'axios'
import { authDataContext } from '../context/AuthContext'

function Orders() {
  let [oredrData,setOrderData]= useState([])
  let {currency}=useContext(shopDataContext)
  let {serverUrl}= useContext(authDataContext)


const loadOrderData =async ()=>{
  try {
    const result =await axios.post(serverUrl + '/api/order/userorder',{},{withCredentials:true})
    if (result.data){
      let allOrdersItem =[]
      result.data.map((order)=>{
        order.items.map((item)=>{
          item['status']=order.status
          item['payment'] =order.payment
          item['paymentMethod'] =order.paymentMethod
          item['date']= order.date
          allOrdersItem.push(item)
        })
      })
      setOrderData(allOrdersItem.reverse())
    }
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  loadOrderData()
},[])

  return (
    <div className='w-full min-h-screen px-4 sm:px-6 pb-28 lg:pb-10 overflow-x-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
        <div className='w-full text-center mt-20'>
          <Title text1={"MY"} text2={"ORDERS"}/>
        </div>
        <div className='w-full max-w-5xl mx-auto flex flex-col gap-4'>
        {
          oredrData.map((item, index) => (
            <div key={index} className='w-full border-t border-b border-white/10'>
              <div className='w-full flex flex-col sm:flex-row sm:items-center gap-4 bg-[#51808048] py-3 px-4 rounded-2xl'>
                <img src={item.image1} alt="" className='w-24 h-24 sm:w-32 sm:h-32 rounded-md object-cover shrink-0' />
                <div className='flex-1 min-w-0 flex items-start justify-center flex-col gap-1.5'>
                  <p className='text-base sm:text-xl text-[#f3f9fc] break-words'>{item.name}</p>
                  <div className='flex flex-wrap items-center gap-x-4 gap-y-1'>
                    <p className='text-xs sm:text-base text-[#aaf4e7]'>{currency} {item.price}</p>
                    <p className='text-xs sm:text-base text-[#aaf4e7]'>Quantity: {item.quantity}</p>
                    <p className='text-xs sm:text-base text-[#aaf4e7]'>Size: {item.size}</p>
                  </div>
                  <p className='text-xs sm:text-base text-[#aaf4e7]'>Date: <span className='text-[#e4fbff] pl-2 text-[11px] sm:text-sm'>{new Date(item.date).toDateString()}</span></p>
                  <p className='text-xs sm:text-base text-[#aaf4e7] break-words'>PaymenrMethod: {item.paymentMethod}</p>
                </div>
                <div className='flex items-center justify-between sm:flex-col sm:items-end gap-3 shrink-0'>
                  <div className='flex items-center gap-1.5'>
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-xs sm:text-base text-[#f3f9fc]'>{item.status}</p>
                  </div>
                  <button className='px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-[#101919] text-[#f3f9fc] text-xs sm:text-base cursor-pointer active:bg-slate-500' onClick={loadOrderData}>Track Order</button>
                </div>
              </div>
            </div>
          ))
        }
        </div>
    </div>
  )
}

export default Orders
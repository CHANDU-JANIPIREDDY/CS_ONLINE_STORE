import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal'


function Cart() {
    const {products,currency,cartItem, updateQuantity}=useContext(shopDataContext)
    const[ cartData,setCartData]=useState([])
    const navigate = useNavigate()


useEffect(()=>{
    const tempData=[]
    for(const items in cartItem){
        for (const item in cartItem[items]){
            if(cartItem[items][item] >0){
                tempData.push({
                    _id: items,
                    size: item,
                    quantity: cartItem[items][item],
                });
            }
        }
    }
    setCartData(tempData);
},[cartItem]);

  return (
    <div className='w-full min-h-screen px-4 sm:px-6 py-6 pb-28 lg:pb-10 overflow-x-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
        <div className='w-full text-center mt-20'>
            <Title text1={'YOUR'} text2={'CART'}/>
        </div>
        <div className='w-full max-w-5xl mx-auto flex flex-col gap-4'>
            {
                cartData.map((item,index)=>{
                    const productData = products.find((product)=>product._id === item._id);
                    return(
                        <div key={index} className='w-full border-t border-b border-white/10'>
                            <div className='w-full flex flex-col sm:flex-row sm:items-center gap-4 bg-[#51808048] py-3 px-4 rounded-2xl'>
                                <img src={productData.image1} alt="" className='w-24 h-24 sm:w-28 sm:h-28 rounded-md object-cover shrink-0' />
                                <div className='flex-1 min-w-0 flex items-start justify-center flex-col gap-2'>
                                    <p className='text-base sm:text-lg text-[#f3f9fc] break-words'>{productData.name}</p>
                                    <div className='flex items-center gap-4'>
                                        <p className='text-base sm:text-lg text-[#aaf4e7]'>{currency} {productData.price}</p>
                                        <p className='w-10 h-10 text-sm text-white bg-[#518080b4] rounded-md flex items-center justify-center border border-[#9ff9f9]'>
                                            {item.size}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-4 self-end sm:self-center'>
                                <input type="number" min={1} defaultValue={item.quantity}  className='w-16 px-2 py-2 text-white text-base font-semibold bg-[#518080b4] border border-[#9ff9f9] rounded-md'
                                 onChange={(e)=>e.target.value===' ' || e.target.value ==='0'?null :updateQuantity(item._id,item.size,Number(e.target.value))} />
                                 <RiDeleteBin6Line className='text-[#9ff9f9] w-6 h-6 cursor-pointer shrink-0'
                                 onClick={()=>updateQuantity(item._id,item.size,0)} />
                                </div>
                            </div>
                    
                        </div>
                    )
                })
            }
        </div>
        <div className='flex justify-start items-end my-10'>
            <div className='w-full max-w-md'>
                <CartTotal/>
                <button className='w-full sm:w-auto text-base sm:text-lg hover:bg-slate-500 cursor-pointer bg-[#51808048] py-3 px-8
                rounded-2xl text-white flex items-center justify-center gap-4 border border-[#80808049] mt-5' onClick={()=>{
                    if(cartData.length >0){
                        navigate("/placeorder");
                    }else{
                        console.log("Your cart is empty!")
                    }
                }}>
                    PROCEED TO CHECKOUT
                </button>
            </div>
        </div>
    </div>
  )
}

export default Cart
import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import { shopDataContext } from '../context/ShopContext'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authDataContext } from '../context/AuthContext'



function PlaceOrder() {
  let [method,setMethod]= useState('cod')
  let navigate= useNavigate()
  const {cartItem,setCartItem,getCartAmount,delivery_fee,products}=useContext(shopDataContext)
  let {serverUrl}= useContext(authDataContext)
  let [formData , setFormData] = useState({
    firstName: '',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    pinCode:'',
    country:'',
    phone:''
  })

  const onChangeHandler =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data=>({...data,[name]:value}))
  }
    const onSubmitHandler =  async(e)=>{
      e.preventDefault()
      try {
        let orderItems=[]
        for (const items in cartItem){
          for(const item in cartItem[items]){
            if(cartItem[items][item] >0){
              const itemInfo =structuredClone(products.find(product => product._id === items))
              if(itemInfo){
                itemInfo.size = item
                itemInfo.quantity=cartItem[items][item]
                orderItems.push(itemInfo)
              }
            }
          }
        }
        console.log("formData:", formData);
        console.log("orderItems:", orderItems);
        console.log("cart amount:", getCartAmount());
        console.log("delivery fee:", delivery_fee);
         const address = `${formData.firstName} ${formData.lastName}, ${formData.street}, ${formData.city}, ${formData.state}, ${formData.pinCode}, ${formData.country}, Phone: ${formData.phone}`;


       const cartAmount = getCartAmount();
        const totalAmount = cartAmount + delivery_fee;
          let orderData = {
         address,
      items: orderItems,
      amount: totalAmount
      };
      console.log("Order payload:", orderData);
        switch(method){
        case 'cod':
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            orderData,
            { withCredentials: true }
          );
          console.log(result.data);
          if(result.data){
            toast.success("Order Placed Successfully!");
            setCartItem({})
            navigate("/order")
          }else{
            console.log(result.data.message)
             toast.error("Failed to Place Order");
          }
          break;
        default:
          toast.info("Online payment not implemented yet.");
          break;
      }

      } catch (error) {
        console.log(error)
        toast.error("Something went wrong. Please try again later.");
      }
    }
  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start justify-center flex-col lg:flex-row gap-8 px-4 sm:px-6 pt-24 pb-28 lg:pb-12'>
      <div className='w-full lg:w-1/2 flex items-center justify-center'>
        <form onSubmit={onSubmitHandler} className='w-full max-w-xl'>
          <div className='py-2'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
          </div>
          <div className='w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-3'>
            <input type="text" placeholder='First Name' className='w-full sm:w-[48%] h-12 rounded-md bg-slate-700 placeholder:text-white text-base px-4 text-white shadow-sm shadow-[#343434]' required  onChange={onChangeHandler} name='firstName' value={formData.firstName}/>
            <input type="text" placeholder='Last Name' className='w-full sm:w-[48%] h-12 rounded-md bg-slate-700 placeholder:text-white text-base px-4 text-white shadow-sm shadow-[#343434]' required onChange={onChangeHandler} name='lastName' value={formData.lastName}/>
          </div>
          <div className='w-full mb-3'>
            <input type="email" placeholder='Email Address' className='w-full h-12 rounded-md bg-slate-700 placeholder:text-white text-base px-4 text-white shadow-sm shadow-[#343434]' required onChange={onChangeHandler} name='email' value={formData.email}/>
          </div>
          <div className='w-full mb-3'>
            <input type="text" placeholder='Street' className='w-full h-12 rounded-md bg-slate-700 placeholder:text-white text-base px-4 text-white shadow-sm shadow-[#343434]' required onChange={onChangeHandler} name='street' value={formData.street}/>
          </div>
          <div className='w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-3'>
            <input type="text" placeholder='City' className='w-full sm:w-[48%] h-12 rounded-md bg-slate-700 placeholder:text-white text-base px-4 text-white shadow-sm shadow-[#343434]' required  onChange={onChangeHandler} name='city' value={formData.city}/>
            <input type="text" placeholder='State' className='w-full sm:w-[48%] h-12 rounded-md bg-slate-700 placeholder:text-white text-base px-4 text-white shadow-sm shadow-[#343434]' required  onChange={onChangeHandler} name='state' value={formData.state}/>
          </div>
          <div className='w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-3'>
            <input type="text" placeholder='Pincode' className='w-full sm:w-[48%] h-12 rounded-md bg-slate-700 placeholder:text-white text-base px-4 text-white shadow-sm shadow-[#343434]' required onChange={onChangeHandler} name='pinCode' value={formData.pinCode}/>
            <input type="text" placeholder='Country' className='w-full sm:w-[48%] h-12 rounded-md bg-slate-700 placeholder:text-white text-base px-4 text-white shadow-sm shadow-[#343434]' required onChange={onChangeHandler} name='country' value={formData.country}/>
          </div>
          <div className='w-full mb-4'>
            <input type="tel" placeholder='Phone' className='w-full h-12 rounded-md bg-slate-700 placeholder:text-white text-base px-4 text-white shadow-sm shadow-[#343434]' required onChange={onChangeHandler} name='phone' value={formData.phone}/>
          </div>
          <button type='submit' className='w-full sm:w-auto text-base sm:text-lg active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-3 px-8 rounded-2xl text-white flex items-center justify-center border border-[#80808049]'>PLACE ORDER</button>
        </form>
      </div>
        <div className='w-full lg:w-1/2 flex items-center justify-center'>
          <div className='w-full max-w-xl flex items-center justify-center gap-4 flex-col'>
            <CartTotal/>
             <div className='py-2'>
            <Title text1={'PAYMENT'} text2={'METHOD'}/>
          </div>
          <div className='w-full flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-4'>
            <button onClick={()=>setMethod('razorpay')} className={`w-full sm:w-[160px] h-12 rounded-sm overflow-hidden ${method==='razorpay' ? 'border-[5px] border-blue-900' : ''}`}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPZ40xDtGQlNnEtDL2er6ICR1UMWoLcSiU0AML-DkEH616YObjoDhq-o2U_0ncsGtdOqU&usqp=CAU" alt="" className='w-full h-full object-cover rounded-sm' />
            </button>
            <button onClick={()=>setMethod('cod')} className={`w-full sm:w-auto min-h-12 bg-gradient-to-t from-[#95b3f8] to-white text-sm px-5 rounded-sm text-[#332f6f] font-bold ${method==='cod' ? 'border-[5px] border-blue-900' : ''}`}>CASH ON DELIVERY</button>
          </div>
          </div>
        </div>
    </div>
  )
}

export default PlaceOrder
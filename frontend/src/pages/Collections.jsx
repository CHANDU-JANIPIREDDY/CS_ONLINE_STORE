import React, { useContext, useEffect, useState } from 'react';
import { FaAngleRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';



const Collections = () => {
  let [showFilter, setShowFilter] = useState(false)
  let {products,search,showSearch}=useContext(shopDataContext)
  let [filterProduct,setFilterProduct]=useState([])
  let [category,setCategory] = useState([])
  let [subCategory,setSubCategory] = useState([])
  let [sortType,setSortType]= useState("relavent")

  const toggleCategory =(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev =>prev.filter( item => item !== e.target.value))
    }else{
      setCategory(prev => [...prev, e.target.value])
    }
  }
  const toggleSubCategory =(e)=>{
     if(subCategory.includes(e.target.value)){
      setSubCategory(prev =>prev.filter( item => item !== e.target.value))
    }else{
      setSubCategory(prev => [...prev, e.target.value])
    }
    
  }

const applyFilter = ()=>{
  let productCopy =products.slice();

  if(showSearch && search){
    productCopy = productCopy.filter(item =>item.name.toLowerCase().includes(search))
  }

  if(category.length>0){
    productCopy=productCopy.filter(item =>category.includes(item.category))
  }
   if(subCategory.length>0){
    productCopy=productCopy.filter(item =>subCategory.includes(item.subCategory))
  }
  setFilterProduct(productCopy)
}


const sortProducts = (e)=>{
  let fbCopy =filterProduct.slice()

  switch(sortType){
    case 'low-high':
      setFilterProduct(fbCopy.sort((a,b)=>(a.price - b.price)))
    break;
    case 'high-low':
      setFilterProduct(fbCopy.sort((a,b)=>(b.price - a.price)))
    break;
    default:
      applyFilter()
    break;
  }
}

useEffect(()=>{
  sortProducts()
},[sortType])


useEffect(()=>{
  setFilterProduct(products)
},[products])

useEffect(()=>{
  applyFilter()
},[category,subCategory,search,showSearch])

  return (
    <div className='w-full min-h-screen bg-gradient-to-r from-[#141414] to-[#0c2025] 
      flex flex-col lg:flex-row items-start justify-start pt-[70px] overflow-x-hidden pb-28 lg:pb-10'>
        <div className={`w-full lg:w-64 lg:sticky lg:top-[70px] lg:h-[calc(100vh-70px)] shrink-0 p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-gray-400 text-[#aaf5fa] overflow-y-auto`}>

          <p className='text-xl sm:text-2xl font-semibold flex gap-2 items-center justify-start cursor-pointer lg:cursor-default' onClick={()=>setShowFilter(prev=>!prev)}>FILTERS
            {!showFilter &&<FaAngleRight className='text-[18px] lg:hidden' />}
            {showFilter &&<FaChevronDown  className='text-[18px] lg:hidden' />}

          </p>
          <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-4 rounded-md bg-slate-600 ${showFilter ? "" :" hidden"} lg:block`}>
            <p className='text-base sm:text-lg text-[#f8fafa]'>CATEGORIES</p>
            <div className='w-full flex items-start justify-center gap-2 flex-col py-2'>
              <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'> <input type="checkbox" value={'Men'} className='w-3' onChange={toggleCategory} />Men</p>
              <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'> <input type="checkbox" value={'Women'} className='w-3' onChange={toggleCategory} />Women</p>
              <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'> <input type="checkbox" value={'Kids'} className='w-3' onChange={toggleCategory}  />Kids</p>

            </div>
          </div>

          <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-4 rounded-md bg-slate-600 ${showFilter ? "" : "hidden" } lg:block`}>
            <p className='text-base sm:text-lg text-[#f8fafa]'>SUB-CATEGORIES</p>
            <div className='w-full flex items-start justify-center gap-2 flex-col py-2'>
              <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'> <input type="checkbox" value={'TopWear'} className='w-3'onChange={toggleSubCategory}  />TopWear</p>
              <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'> <input type="checkbox" value={'BottomWear'} className='w-3' onChange={toggleSubCategory}/>BottomWear</p>
              <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'> <input type="checkbox" value={'WinterWear'} className='w-3' onChange={toggleSubCategory}/>WinterWear</p>

            </div>
          </div>

        </div>
          <div className='w-full min-w-0 flex-1 p-4 sm:p-6'>
            <div className='w-full flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4 mb-4'>
              <Title text1={"ALL"} text2={"COLLECTIONS"}/>
              <select name="" id="" className='bg-slate-600 w-full sm:w-[220px] h-12 px-3 text-white rounded-lg hover:border-[#46d1f7] border-2' onChange={(e)=>setSortType(e.target.value)}>
                <option value="relavent"> Sort By: Relavent</option>
                <option value="low-high">Sort By: Low to High </option>
                <option value="high-low">Sort By: High to Low</option>
              </select>
            </div>
            <div className='w-full min-h-[50vh] grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 justify-items-center'>
              {
                  filterProduct.map((item,index)=>(
                    <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1}/>
                  ))
              }
            </div>
          </div>
    </div>
  );
};

export default Collections;

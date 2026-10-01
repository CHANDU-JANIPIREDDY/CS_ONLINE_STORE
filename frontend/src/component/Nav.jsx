import React, { useContext, useState } from 'react';
import { IoSearchCircleOutline, IoSearchCircleSharp, IoCartOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdOutlineContacts } from "react-icons/md";
import { shopDataContext } from '../context/ShopContext';
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import AuthPanel from './AuthPanel';



const Nav = () => {
  let { getCurrentUser, userData,setUserData } = useContext(userDataContext);
  let {serverUrl}= useContext(authDataContext)
  console.log("userData: ", userData);
  let {showSearch, setShowSearch,search,setSearch,getCartCount} = useContext(shopDataContext)
  let [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate();


  const handleLogout = async () => {
    try {
        const result = await axios.get(serverUrl +'/api/auth/logout',{ withCredentials: true});
        console.log(result.data);
        setShowProfile(false)
        setUserData(null);
        navigate('/');
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className='fixed top-0 left-0 z-40 w-full h-[70px] bg-[#ecfafaec] flex items-center justify-between px-3 sm:px-6 lg:px-8 shadow-md shadow-black'>
     
      <div className='flex items-center shrink-0'>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/42/Counter-Strike_CS_logo.svg"
          alt="CS Store"
          className='h-10 sm:h-12 w-auto max-w-[46vw] object-contain cursor-pointer'
          onClick={() => navigate('/')}
        />
      </div>

      
      <div className='hidden lg:flex flex-1 justify-center px-4 min-w-0'>
        <ul className='flex items-center justify-center gap-2 xl:gap-4 text-white'>
          <li className='text-sm xl:text-[15px] whitespace-nowrap hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2 px-3 xl:px-5 rounded-[20px]' onClick={()=>navigate("/collection")}>COLLECTIONS</li>
          <li className='text-sm xl:text-[15px] whitespace-nowrap hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2 px-3 xl:px-5 rounded-[20px]' onClick={()=>navigate("/about")}>ABOUT</li>
          <li className='text-sm xl:text-[15px] whitespace-nowrap hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2 px-3 xl:px-5 rounded-[20px]' onClick={()=>navigate("/contact")}>CONTACT</li>
          <li className='text-sm xl:text-[15px] whitespace-nowrap hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2 px-3 xl:px-5 rounded-[20px]' onClick={()=>navigate("/")}>HOME</li>
        </ul>
      </div>

      
      <div className='flex items-center justify-end gap-2 sm:gap-4 shrink-0'>
        {!showSearch && (
          <IoSearchCircleOutline className='w-8 h-8 sm:w-9 sm:h-9 text-[#000000] cursor-pointer' onClick={() => {setShowSearch(prev => !prev);navigate("/collection")}} />
        )}
        {showSearch && (
          <IoSearchCircleSharp className='w-8 h-8 sm:w-9 sm:h-9 text-[#000000] cursor-pointer' onClick={() => setShowSearch(prev => !prev)} />
        )}

        {!userData && (
          <FaCircleUser className='w-7 h-7 text-[#000000] cursor-pointer'  onClick= {() => setShowProfile(prev => !prev)} />
        )}

        {userData && (
          <div
            className='w-8 h-8 bg-[#080808] text-white rounded-full flex items-center justify-center cursor-pointer text-sm'
            onClick={() => setShowProfile(prev => !prev)}
          >
            {userData?.name?.charAt(0)?.toUpperCase()}
          </div>
        )}

        <button className='relative hidden lg:block' onClick={()=>navigate('/cart')} aria-label='Cart'>
          <IoCartOutline className='w-8 h-8 text-[#000000] cursor-pointer' />
          <span className='absolute -top-1 -right-2 min-w-[18px] h-[18px] flex items-center justify-center bg-black px-1 text-white rounded-full text-[9px]'>{getCartCount()}</span>
        </button>
      </div>

      
      {showSearch && (
        <div className='w-full h-16 sm:h-20 bg-[#d8f6f9dd] absolute top-full left-0 right-0 flex items-center justify-center px-4'>
          <input type="text" placeholder='Search Here' className='w-full max-w-xl h-10 sm:h-12 bg-[#233533] rounded-full px-6 text-base placeholder:text-white text-white' onChange={(e)=>{setSearch(e.target.value)}} value={search} />
        </div>
      )}

      
      {showProfile && !userData && (
        <AuthPanel onClose={() => setShowProfile(false)} />
      )}

      {showProfile && userData && (
        <div className='absolute top-[78px] right-3 sm:right-6 w-[220px] max-w-[calc(100vw-24px)] bg-[#000000d7] border border-[#aaa9a9] rounded-[10px] z-50'>
          <ul className='w-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-white'>
            <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={()=>{
                handleLogout();
                setShowProfile(false);
            }}>LogOut</li>
            <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'  onClick={()=>{navigate('/order');
                setShowProfile(false);
            }}>Orders</li>
            <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'  onClick={()=>{navigate('/about');
                setShowProfile(false);
            }}>About</li>
          </ul>
        </div>
      )}
      <div className='w-full h-[76px] flex items-center justify-around px-2 fixed bottom-0 left-0 bg-[#191818] lg:hidden text-[11px] sm:text-xs z-40' >
        <button className='text-white flex items-center justify-center flex-col gap-0.5' onClick={()=>navigate("/")}><IoMdHome className='w-6 h-6 text-white'/>Home</button>
        <button className='text-white flex items-center justify-center flex-col gap-0.5' onClick={()=>navigate("/contact")}><MdOutlineContacts className='w-6 h-6 text-white'/>Contact</button>
        <button className='text-white flex items-center justify-center flex-col gap-0.5' onClick={()=>navigate("/collection")}><HiOutlineCollection className='w-6 h-6 text-white'/>Collections</button>
        <button className='relative text-white flex items-center justify-center flex-col gap-0.5' onClick={()=>navigate('/cart')}>
          <IoCartOutline className='w-6 h-6 text-white'/>
          Cart
          <span className='absolute -top-1 right-0 min-w-[18px] h-[18px] flex items-center justify-center bg-white px-1 text-black font-semibold rounded-full text-[9px]'>{getCartCount()}</span>
        </button>
      </div>
    </div>
  );
};

export default Nav;

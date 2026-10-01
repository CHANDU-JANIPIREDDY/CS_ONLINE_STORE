import React, { useContext, useState } from 'react';
import { IoSearchCircleOutline, IoSearchCircleSharp, IoCartOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { useLocation, useNavigate } from 'react-router-dom';
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
  let location = useLocation();

  const links = [
    { label: "Home", path: "/" },
    { label: "Collections", path: "/collection" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];


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
    <>
    <div className='fixed top-0 left-0 z-40 flex h-[70px] w-full items-center justify-between border-b border-white/10 bg-[#0c2025]/95 px-3 backdrop-blur-md sm:px-6 lg:px-8'>
     
      <div className='flex shrink-0 items-center'>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/42/Counter-Strike_CS_logo.svg"
          alt="CS Store"
          className='h-10 w-auto max-w-[46vw] cursor-pointer object-contain brightness-0 invert sm:h-12'
          onClick={() => navigate('/')}
        />
      </div>

      
      <div className='hidden min-w-0 flex-1 justify-center px-4 lg:flex'>
        <ul className='flex items-center justify-center gap-1 xl:gap-2'>
          {links.map((link) => {
            const active = location.pathname === link.path
            return (
              <li
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`relative cursor-pointer whitespace-nowrap px-3 py-2 text-[12px] font-medium uppercase tracking-[0.16em] transition xl:px-4 xl:text-[13px] ${active ? "text-[#d8fcff] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:bg-[#8ee9f2] after:content-['']" : "text-white/70 hover:text-white"}`}
              >
                {link.label}
              </li>
            )
          })}
        </ul>
      </div>

      
      <div className='flex shrink-0 items-center justify-end gap-2 sm:gap-4'>
        {!showSearch && (
          <IoSearchCircleOutline className='h-8 w-8 cursor-pointer text-white/90 transition hover:text-[#d8fcff] sm:h-9 sm:w-9' onClick={() => {setShowSearch(prev => !prev);navigate("/collection")}} />
        )}
        {showSearch && (
          <IoSearchCircleSharp className='h-8 w-8 cursor-pointer text-[#d8fcff] sm:h-9 sm:w-9' onClick={() => setShowSearch(prev => !prev)} />
        )}

        {!userData && (
          <FaCircleUser className='h-7 w-7 cursor-pointer text-white/90 transition hover:text-[#d8fcff]'  onClick= {() => setShowProfile(prev => !prev)} />
        )}

        {userData && (
          <div
            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#8ee9f2]/60 bg-[#132226] text-sm text-[#d8fcff]'
            onClick={() => setShowProfile(prev => !prev)}
          >
            {userData?.name?.charAt(0)?.toUpperCase()}
          </div>
        )}

        <button className='relative hidden lg:block' onClick={()=>navigate('/cart')} aria-label='Cart'>
          <IoCartOutline className='h-8 w-8 cursor-pointer text-white/90 transition hover:text-[#d8fcff]' />
          <span className='absolute -right-2 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#8ee9f2] px-1 text-[9px] font-semibold text-[#0c2025]'>{getCartCount()}</span>
        </button>
      </div>

      
      {showSearch && (
        <div className='absolute left-0 right-0 top-full flex h-16 w-full items-center justify-center border-b border-white/10 bg-[#0c2025]/95 px-4 backdrop-blur-md sm:h-20'>
          <input type="text" placeholder='Search Here' className='h-11 w-full max-w-xl border border-white/15 bg-white/5 px-5 text-base text-white outline-none placeholder:text-white/45 focus:border-[#8ee9f2]' onChange={(e)=>{setSearch(e.target.value)}} value={search} />
        </div>
      )}

      
      {showProfile && !userData && (
        <AuthPanel onClose={() => setShowProfile(false)} />
      )}

      {showProfile && userData && (
        <div className='absolute right-3 top-[78px] z-50 w-[220px] max-w-[calc(100vw-24px)] border border-white/10 bg-[#0c2025] shadow-xl sm:right-6'>
          <ul className='flex w-full flex-col items-start py-2 text-[15px] text-white'>
            <li className='w-full cursor-pointer px-4 py-2.5 hover:bg-white/5 hover:text-[#d8fcff]' onClick={()=>{
                handleLogout();
                setShowProfile(false);
            }}>LogOut</li>
            <li className='w-full cursor-pointer px-4 py-2.5 hover:bg-white/5 hover:text-[#d8fcff]'  onClick={()=>{navigate('/order');
                setShowProfile(false);
            }}>Orders</li>
            <li className='w-full cursor-pointer px-4 py-2.5 hover:bg-white/5 hover:text-[#d8fcff]'  onClick={()=>{navigate('/about');
                setShowProfile(false);
            }}>About</li>
          </ul>
        </div>
      )}
    </div>
    <div className='fixed bottom-0 left-0 z-40 flex h-[76px] w-full items-center justify-around border-t border-white/10 bg-[#0c2025] px-2 text-[11px] sm:text-xs lg:hidden'>
        <button className={`flex flex-col items-center justify-center gap-0.5 ${location.pathname === "/" ? "text-[#d8fcff]" : "text-white/70"}`} onClick={()=>navigate("/")}><IoMdHome className='h-6 w-6'/>Home</button>
        <button className={`flex flex-col items-center justify-center gap-0.5 ${location.pathname === "/collection" ? "text-[#d8fcff]" : "text-white/70"}`} onClick={()=>navigate("/collection")}><HiOutlineCollection className='h-6 w-6'/>Collections</button>
        <button className={`flex flex-col items-center justify-center gap-0.5 ${location.pathname === "/contact" ? "text-[#d8fcff]" : "text-white/70"}`} onClick={()=>navigate("/contact")}><MdOutlineContacts className='h-6 w-6'/>Contact</button>
        <button className={`relative flex flex-col items-center justify-center gap-0.5 ${location.pathname === "/cart" ? "text-[#d8fcff]" : "text-white/70"}`} onClick={()=>navigate('/cart')}>
          <IoCartOutline className='h-6 w-6'/>
          Cart
          <span className='absolute -top-1 right-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#8ee9f2] px-1 text-[9px] font-semibold text-[#0c2025]'>{getCartCount()}</span>
        </button>
    </div>
    </>
  );
};

export default Nav;

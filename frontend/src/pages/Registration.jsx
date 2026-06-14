import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { toast } from 'react-toastify';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';



const Registration = () => {
    let [show,setShow]=useState(false);
    const { serverUrl } = useContext(authDataContext);
    const { getCurrentUser } = useContext(userDataContext);
    let[name,setName]=useState("");
    let[email,setEmail]=useState("");
    let[password,setPassword]=useState("");
    let navigate = useNavigate();

    const handleSingUp = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(serverUrl + '/api/auth/signup', {
                name,
                email,
                password
            }, {
                withCredentials: true
            });
            getCurrentUser();
            navigate('/');
            console.log(result.data) 
            toast.success(" User Registration Successfull");
            
        } catch (error) {
            console.log(error)
            toast.error("User Registration Failed");
        }
    }

    const googleSignUp = async () => {
        try {
          const response = await signInWithPopup(auth,provider);
          let user = response.user;
          let name = user.displayName;
          let email = user.email; 

          const result = await axios.post(serverUrl + '/api/auth/googlelogin', {
            name,       
            email
          }, { withCredentials: true});
            console.log(result.data);  
            getCurrentUser();
            navigate('/');   

        } catch (error) {
            console.log(error);
        }
    }





  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start py-6'>
        <div className='w-full h-[70px] flex items-center justify-start px-5 sm:px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate('/')}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Counter-Strike_CS_logo.svg/1024px-Counter-Strike_CS_logo.svg.png" alt="" className='h-[50px] w-[50px] sm:h-[60px] sm:w-[60px]' />
        </div>
        <div className='w-full flex flex-col items-center justify-center gap-2 text-center px-4 mb-6'>
            <span className='text-[20px] sm:text-[24px] lg:text-[28px] font-semibold'>REGISTRATION PAGE</span>
            <span className='text-[13px] sm:text-[16px] lg:text-[18px] font-outfit'>WELCOME TO <span className='text-red-500 font-semibold'>CS STORE</span>, PLACE YOUR ORDER</span>
        </div>
        <div className='max-w-[600px] w-[90%] bg-[#00000025] border border-[#96969635] backdrop-blur-[2px] rounded-lg shadow-lg flex items-center justify-center p-5 sm:p-8'>
            <form action="" onSubmit={handleSingUp} className='w-full flex flex-col items-center justify-start gap-5'>
                <div className='w-full h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] cursor-pointer text-sm sm:text-base' onClick={googleSignUp}>
                    <img src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png" alt="" className='w-[20px]'/>Registration with Google
                </div>
                <div className='w-full flex items-center justify-center gap-[10px]'>
                    <div className='flex-1 h-[1px] bg-[#96969635]'></div> OR
                    <div className='flex-1 h-[1px] bg-[#96969635]'></div>
                </div>
                <div className='w-full flex flex-col items-center justify-center gap-4'>
                    <input type="text" className='w-full h-[50px] border-2 border-[#95969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold focus:outline-none focus:border-[#6060f5]' placeholder='User Name' required onChange={(e)=>setName(e.target.value)} value={name}/>
                    <input type="email" className='w-full h-[50px] border-2 border-[#95969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold focus:outline-none focus:border-[#6060f5]' placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} value={email}/>

                    <div className="relative w-full">
                        <input
                        type={show ? "text" : "password"}
                        className='w-full h-[50px] border-2 border-[#95969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold pr-[40px] focus:outline-none focus:border-[#6060f5]'
                        placeholder='Password'
                        required onChange={(e)=>setPassword(e.target.value)} value={password}
                        />
                        {!show &&<MdOutlineRemoveRedEye className='w-[20px] h-[20px] cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-white' onClick={()=>setShow(prev=>!prev)} />}
                        {show &&<IoMdEye className='w-[20px] h-[20px] cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-white'onClick={()=>setShow(prev=>!prev)} />}
                    </div>

                    <button className='w-full h-[50px] bg-[#6060f5] hover:bg-[#4f4fe0] transition-colors rounded-lg flex items-center justify-center mt-2 text-[17px] font-semibold'>Create Account</button>
                    <p className='flex justify-center gap-[10px] text-sm sm:text-base'>You have any account ?<span className='text-[#5555f6cf] font-semibold cursor-pointer' onClick={()=>navigate('/login')}>Login</span></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Registration
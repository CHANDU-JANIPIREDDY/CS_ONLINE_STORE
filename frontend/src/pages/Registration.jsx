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
    <div className='relative min-h-screen overflow-hidden bg-[#07161b] px-4 py-6 text-white'>
        <div className='pointer-events-none absolute -left-16 top-8 h-64 w-64 rounded-full bg-[#14a8ba]/45 blur-3xl' />
        <div className='pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-[#3d74ff]/35 blur-3xl' />
        <div className='pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#8ee9f2]/25 blur-3xl' />

        <div className='relative z-10 mx-auto flex w-full max-w-md cursor-pointer items-center' onClick={() => navigate('/')}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Counter-Strike_CS_logo.svg" alt="CS Store" className='h-12 w-auto object-contain' />
        </div>

        <div className='glass-water relative z-10 mx-auto mt-6 w-full max-w-md rounded-[28px]'>
            <form onSubmit={handleSingUp} className='relative z-10 flex flex-col gap-4 p-5 sm:p-7'>
                <div className='text-center'>
                    <p className='text-xs uppercase tracking-[0.22em] text-[#d8fcff]/80'>Welcome to CS Store</p>
                    <h1 className='mt-1 text-2xl font-semibold'>Create Account</h1>
                </div>
                <button type='button' className='flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/15 text-sm cursor-pointer hover:bg-white/25' onClick={googleSignUp}>
                    <img src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png" alt="" className='w-5'/>
                    Register with Google
                </button>
                <div className='flex items-center gap-3 text-xs tracking-[0.16em] text-white/70'>
                    <div className='h-px flex-1 bg-white/25'></div> OR <div className='h-px flex-1 bg-white/25'></div>
                </div>
                <input type="text" className='glass-field' placeholder='User Name' required onChange={(e)=>setName(e.target.value)} value={name}/>
                <input type="email" className='glass-field' placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <div className="relative w-full">
                    <input type={show ? "text" : "password"} className='glass-field pr-11' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} value={password} />
                    {!show &&<MdOutlineRemoveRedEye className='absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-white' onClick={()=>setShow(prev=>!prev)} />}
                    {show &&<IoMdEye className='absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-white' onClick={()=>setShow(prev=>!prev)} />}
                </div>
                <button className='h-12 w-full cursor-pointer rounded-2xl bg-gradient-to-r from-[#7de7f2] to-[#5aa7ff] text-base font-semibold text-[#072026]'>Create Account</button>
                <p className='text-center text-sm text-white/85'>You have an account? <span className='cursor-pointer font-semibold text-white' onClick={()=>navigate('/login')}>Login</span></p>
            </form>
        </div>
    </div>
  )
}

export default Registration
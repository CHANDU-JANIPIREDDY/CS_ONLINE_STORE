import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';



import { userDataContext } from "../context/UserContext";
import { toast } from 'react-toastify';
import { authDataContext } from '../context/AuthContext';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password
      }, { withCredentials: true });

      getCurrentUser();
      navigate('/');
      console.log(result.data);
      toast.success(" UserLogin Successful");
    } catch (error) {
      console.log(error);
      toast.error("UserLogin Failed");
    }
  };

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(`${serverUrl}/api/auth/googlelogin`, {
        name,
        email
      }, { withCredentials: true });

      console.log(result.data);
      getCurrentUser();
      navigate('/');
      toast.success(" UserLogin Successful");
    } catch (error) {
      console.log(error);
      toast.error("UserLogin Failed");
    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start py-6'>
      <div className='w-full h-[70px] flex items-center justify-start px-5 sm:px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate('/')}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Counter-Strike_CS_logo.svg/1024px-Counter-Strike_CS_logo.svg.png" alt="" className='h-[50px] w-[50px] sm:h-[60px] sm:w-[60px]' />
      </div>

      <div className='w-full flex flex-col items-center justify-center gap-2 text-center px-4 mb-6'>
        <span className='text-[20px] sm:text-[24px] lg:text-[28px] font-semibold'>LOGIN PAGE</span>
        <span className='text-[13px] sm:text-[16px] lg:text-[18px]'>WELCOME TO <span className='text-red-500 font-semibold'>CS STORE</span>, PLACE YOUR ORDER</span>
      </div>

      <div className='max-w-[600px] w-[90%] bg-[#00000025] border border-[#96969635] backdrop-blur-[2px] rounded-lg shadow-lg flex items-center justify-center p-5 sm:p-8'>
        <form onSubmit={handleLogin} className='w-full flex flex-col items-center justify-start gap-5'>
          <div className='w-full h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] cursor-pointer text-sm sm:text-base' onClick={googleLogin}>
            <img src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png" alt="" className='w-[20px]'/>
            Login with Google
          </div>

          <div className='w-full flex items-center justify-center gap-[10px]'>
            <div className='flex-1 h-[1px] bg-[#96969635]'></div> OR <div className='flex-1 h-[1px] bg-[#96969635]'></div>
          </div>

          <div className='w-full flex flex-col items-center justify-center gap-4'>
            <input
              type="email"
              className='w-full h-[50px] border-2 border-[#95969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold focus:outline-none focus:border-[#6060f5]'
              placeholder='Email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative w-full">
              <input
                type={show ? "text" : "password"}
                className='w-full h-[50px] border-2 border-[#95969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold pr-[40px] focus:outline-none focus:border-[#6060f5]'
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!show && <MdOutlineRemoveRedEye className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white' onClick={() => setShow(prev => !prev)} />}
              {show && <IoMdEye className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white' onClick={() => setShow(prev => !prev)} />}
            </div>

            <button className='w-full h-[50px] bg-[#6060f5] hover:bg-[#4f4fe0] transition-colors rounded-lg text-[17px] font-semibold'>Login</button>

            <p className='flex justify-center gap-[10px] text-sm sm:text-base'>
              You have no account?
              <span className='text-[#5555f6cf] font-semibold cursor-pointer' onClick={() => navigate('/signup')}>
                Create New Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

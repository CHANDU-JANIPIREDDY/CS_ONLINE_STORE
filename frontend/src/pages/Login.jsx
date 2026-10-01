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
    <div className='relative min-h-screen overflow-hidden bg-[#07161b] px-4 py-6 text-white'>
      <div className='pointer-events-none absolute -left-16 top-8 h-64 w-64 rounded-full bg-[#14a8ba]/45 blur-3xl' />
      <div className='pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-[#3d74ff]/35 blur-3xl' />
      <div className='pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#8ee9f2]/25 blur-3xl' />

      <div className='relative z-10 mx-auto flex w-full max-w-md cursor-pointer items-center' onClick={() => navigate('/')}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Counter-Strike_CS_logo.svg" alt="CS Store" className='h-12 w-auto object-contain' />
      </div>

      <div className='glass-water relative z-10 mx-auto mt-6 w-full max-w-md rounded-[28px]'>
        <form onSubmit={handleLogin} className='relative z-10 flex flex-col gap-4 p-5 sm:p-7'>
          <div className='text-center'>
            <p className='text-xs uppercase tracking-[0.22em] text-[#d8fcff]/80'>Welcome to CS Store</p>
            <h1 className='mt-1 text-2xl font-semibold'>Login</h1>
          </div>
          <button type='button' className='flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/15 text-sm cursor-pointer hover:bg-white/25' onClick={googleLogin}>
            <img src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png" alt="" className='w-5'/>
            Login with Google
          </button>
          <div className='flex items-center gap-3 text-xs tracking-[0.16em] text-white/70'>
            <div className='h-px flex-1 bg-white/25'></div> OR <div className='h-px flex-1 bg-white/25'></div>
          </div>
          <input type="email" className='glass-field' placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="relative w-full">
            <input type={show ? "text" : "password"} className='glass-field pr-11' placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
            {!show && <MdOutlineRemoveRedEye className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white' onClick={() => setShow(prev => !prev)} />}
            {show && <IoMdEye className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white' onClick={() => setShow(prev => !prev)} />}
          </div>
          <button className='h-12 w-full cursor-pointer rounded-2xl bg-gradient-to-r from-[#7de7f2] to-[#5aa7ff] text-base font-semibold text-[#072026]'>Login</button>
          <p className='text-center text-sm text-white/85'>
            You have no account?{' '}
            <span className='cursor-pointer font-semibold text-white' onClick={() => navigate('/signup')}>Create New Account</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

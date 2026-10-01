import React, { useContext, useState } from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEye, IoMdClose } from "react-icons/io";
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { toast } from 'react-toastify';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';

const AuthPanel = ({ onClose }) => {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const finish = () => {
    getCurrentUser();
    onClose();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${serverUrl}/api/auth/login`, { email, password }, { withCredentials: true });
      toast.success('Login successful');
      finish();
    } catch (error) {
      console.log(error);
      toast.error('Login failed');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${serverUrl}/api/auth/signup`, { name, email, password }, { withCredentials: true });
      toast.success('Account created');
      finish();
    } catch (error) {
      console.log(error);
      toast.error('Registration failed');
    }
  };

  const googleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      await axios.post(`${serverUrl}/api/auth/googlelogin`, {
        name: user.displayName,
        email: user.email,
      }, { withCredentials: true });
      toast.success(mode === 'login' ? 'Login successful' : 'Account created');
      finish();
    } catch (error) {
      console.log(error);
      toast.error(mode === 'login' ? 'Login failed' : 'Registration failed');
    }
  };

  const switchMode = (next) => {
    setMode(next);
    setShowPassword(false);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <div className='fixed inset-0 z-40' onClick={onClose} />
      <div className='absolute top-[78px] right-2 sm:right-4 z-50 w-[min(380px,calc(100vw-16px))] max-h-[calc(100vh-160px)] lg:max-h-[calc(100vh-100px)] overflow-y-auto rounded-xl border border-[#96969655] bg-[#0c2025] text-white shadow-2xl p-4'>
        <div className='flex items-center justify-between mb-3'>
          <p className='text-[15px] font-semibold'>
            WELCOME TO <span className='text-red-500'>CS STORE</span>
          </p>
          <button type='button' onClick={onClose} className='text-white cursor-pointer' aria-label='Close'>
            <IoMdClose className='w-[22px] h-[22px]' />
          </button>
        </div>

        <div className='grid grid-cols-2 gap-2 mb-4'>
          <button
            type='button'
            onClick={() => switchMode('login')}
            className={`h-[40px] rounded-lg text-[14px] font-semibold cursor-pointer ${mode === 'login' ? 'bg-[#6060f5]' : 'bg-[#1c3338]'}`}
          >
            Login
          </button>
          <button
            type='button'
            onClick={() => switchMode('register')}
            className={`h-[40px] rounded-lg text-[14px] font-semibold cursor-pointer ${mode === 'register' ? 'bg-[#6060f5]' : 'bg-[#1c3338]'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={mode === 'login' ? handleLogin : handleSignUp} className='flex flex-col gap-3'>
          <button
            type='button'
            onClick={googleAuth}
            className='w-full h-[46px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] cursor-pointer text-sm'
          >
            <img src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png" alt="" className='w-[18px]' />
            {mode === 'login' ? 'Login with Google' : 'Register with Google'}
          </button>

          <div className='w-full flex items-center gap-[10px] text-xs text-[#d0d0d0]'>
            <div className='flex-1 h-[1px] bg-[#96969635]'></div>
            OR
            <div className='flex-1 h-[1px] bg-[#96969635]'></div>
          </div>

          {mode === 'register' && (
            <input
              type='text'
              className='w-full h-[46px] border-2 border-[#95969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-[16px] font-semibold focus:outline-none focus:border-[#6060f5]'
              placeholder='User Name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type='email'
            className='w-full h-[46px] border-2 border-[#95969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-[16px] font-semibold focus:outline-none focus:border-[#6060f5]'
            placeholder='Email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className='relative w-full'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='w-full h-[46px] border-2 border-[#95969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-[16px] pr-[40px] font-semibold focus:outline-none focus:border-[#6060f5]'
              placeholder='Password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!showPassword && (
              <MdOutlineRemoveRedEye className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer' onClick={() => setShowPassword(true)} />
            )}
            {showPassword && (
              <IoMdEye className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer' onClick={() => setShowPassword(false)} />
            )}
          </div>

          <button className='w-full h-[46px] bg-[#6060f5] hover:bg-[#4f4fe0] transition-colors rounded-lg text-[16px] font-semibold cursor-pointer'>
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>

          {mode === 'login' ? (
            <p className='text-center text-sm'>
              You have no account?{' '}
              <span className='text-[#8b8bff] font-semibold cursor-pointer' onClick={() => switchMode('register')}>
                Create New Account
              </span>
            </p>
          ) : (
            <p className='text-center text-sm'>
              You have an account?{' '}
              <span className='text-[#8b8bff] font-semibold cursor-pointer' onClick={() => switchMode('login')}>
                Login
              </span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default AuthPanel;

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
      <div className='fixed inset-0 z-40 bg-[#04141c]/35 backdrop-blur-[2px]' onClick={onClose} />
      <div className='fixed z-50 left-1/2 top-1/2 w-[min(400px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 sm:left-auto sm:right-4 sm:top-[78px] sm:w-[400px] sm:translate-x-0 sm:translate-y-0'>
      <div className='glass-water relative rounded-[28px] text-white'>
        <div className='relative z-10 max-h-[calc(100vh-48px)] overflow-y-auto p-4 sm:max-h-[calc(100vh-110px)] sm:p-5'>
          <div className='mb-4 flex items-center justify-between gap-3'>
            <div>
              <p className='text-[11px] uppercase tracking-[0.22em] text-[#d8fcff]/80'>Welcome to</p>
              <p className='text-lg font-semibold'>CS Store</p>
            </div>
            <button type='button' onClick={onClose} className='flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 cursor-pointer' aria-label='Close'>
              <IoMdClose className='h-5 w-5' />
            </button>
          </div>

          <div className='mb-4 grid grid-cols-2 gap-2 rounded-2xl border border-white/20 bg-white/10 p-1'>
            <button
              type='button'
              onClick={() => switchMode('login')}
              className={`h-10 rounded-xl text-sm font-semibold cursor-pointer ${mode === 'login' ? 'bg-white/85 text-[#0c2025]' : 'text-white'}`}
            >
              Login
            </button>
            <button
              type='button'
              onClick={() => switchMode('register')}
              className={`h-10 rounded-xl text-sm font-semibold cursor-pointer ${mode === 'register' ? 'bg-white/85 text-[#0c2025]' : 'text-white'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={mode === 'login' ? handleLogin : handleSignUp} className='flex flex-col gap-3'>
            <button
              type='button'
              onClick={googleAuth}
              className='flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/15 text-sm cursor-pointer hover:bg-white/25'
            >
              <img src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png" alt="" className='w-[18px]' />
              {mode === 'login' ? 'Login with Google' : 'Register with Google'}
            </button>

            <div className='flex items-center gap-3 text-xs tracking-[0.16em] text-white/70'>
              <div className='h-px flex-1 bg-white/25'></div>
              OR
              <div className='h-px flex-1 bg-white/25'></div>
            </div>

            {mode === 'register' && (
              <input
                type='text'
                className='glass-field'
                placeholder='User Name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              type='email'
              className='glass-field'
              placeholder='Email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className='relative w-full'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='glass-field pr-11'
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

            <button className='h-12 w-full cursor-pointer rounded-2xl bg-gradient-to-r from-[#7de7f2] to-[#5aa7ff] text-base font-semibold text-[#072026] hover:brightness-105'>
              {mode === 'login' ? 'Login' : 'Create Account'}
            </button>

            {mode === 'login' ? (
              <p className='text-center text-sm text-white/85'>
                You have no account?{' '}
                <span className='cursor-pointer font-semibold text-white' onClick={() => switchMode('register')}>
                  Create New Account
                </span>
              </p>
            ) : (
              <p className='text-center text-sm text-white/85'>
                You have an account?{' '}
                <span className='cursor-pointer font-semibold text-white' onClick={() => switchMode('login')}>
                  Login
                </span>
              </p>
            )}
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default AuthPanel;

import React, { useContext } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import Nav from './component/Nav';

import About from './pages/About';
import Collections from './pages/Collections';
import Product from './pages/Product';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';


import { ToastContainer, toast } from 'react-toastify';

import UserProvider, { userDataContext } from './context/UserContext';
import NotFound from './pages/NotFound';
import Ai from './component/Ai';
import AuthProvider from './context/AuthContext';
import Loading from './component/Loading';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </AuthProvider>
  );
}

function GuestOnly({ children }) {
  const { userData, userLoading } = useContext(userDataContext);
  const location = useLocation();

  if (userLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#0c2025]'>
        <Loading />
      </div>
    );
  }

  if (userData) {
    return <Navigate to={location.state?.from || '/'} />;
  }

  return children;
}

function RequireAuth({ children }) {
  const { userData, userLoading } = useContext(userDataContext);
  const location = useLocation();

  if (userLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#0c2025]'>
        <Loading />
      </div>
    );
  }

  if (!userData) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children;
}

function AppContent() {
  const location = useLocation();
  const hideNavOn = ['/login', '/signup'];

  return (
    <>
      <ToastContainer />
      {!hideNavOn.includes(location.pathname) && <Nav />}
      <Routes>
        <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
        <Route path="/signup" element={<GuestOnly><Registration /></GuestOnly>} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/productdetail/:productId" element={<ProductDetail />} />

        <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
        <Route path="/placeorder" element={<RequireAuth><PlaceOrder /></RequireAuth>} />
        <Route path="/order" element={<RequireAuth><Orders /></RequireAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Ai />
    </>
  );
}

export default App;

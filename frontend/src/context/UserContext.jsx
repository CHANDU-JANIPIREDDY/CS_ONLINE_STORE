import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { authDataContext } from './AuthContext';


axios.defaults.withCredentials = true; 
export const userDataContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      console.log("Server URL:", serverUrl);
      const result = await axios.get(`${serverUrl}/api/user/getCurrentUser`, {
        withCredentials: true,
      });
      setUserData(result.data.user);
      console.log("Fetched User:", result.data.user);
    } catch (error) {
      console.error("Failed to fetch User:", error);
      setUserData(null);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    userData,
    setUserData,
    getCurrentUser,
    userLoading,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}


export default UserProvider;

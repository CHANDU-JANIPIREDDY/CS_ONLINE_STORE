import React, { createContext } from 'react'

export const authDataContext = createContext()

const AuthContext = ({ children }) => {
  // In dev (npm run dev) talk to the local backend; in a production build use
  // the deployed backend. Override either with VITE_SERVER_URL in a .env file.
  const serverUrl =
    import.meta.env.VITE_SERVER_URL ||
    (import.meta.env.DEV
      ? "http://localhost:8000"
      : "https://cs-online-store-backend.onrender.com")
  const value = { serverUrl }

  return (
    <authDataContext.Provider value={{serverUrl}}>
      {children}
    </authDataContext.Provider>
  )
}

export default AuthContext

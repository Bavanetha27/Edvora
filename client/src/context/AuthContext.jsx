// src/context/AuthContext.jsx
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Set user after login/signup
  const setUserDetails = (userData) => setUser(userData);

  // Clear user on logout
  const clearUser = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserDetails,
        clearUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

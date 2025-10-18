// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set user after login/signup
  const setUserDetails = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Clear user on logout
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Persist user on page reload
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,       // provide setUser
        setUserDetails,
        logoutUser,    // provide logoutUser
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

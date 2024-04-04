// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
// Create a context with initial state isLoggedIn set to false
const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap the app and provide the context
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  // Function to set the login state to true
  const login = () => {
    setLoggedIn(true);
  };

  // Function to set the login state to false
  const logout = () => {
    setLoggedIn(false);
    setRole("");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getRole = localStorage.getItem("role");
    if (getRole) {
      setRole(getRole);
    }
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [login]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

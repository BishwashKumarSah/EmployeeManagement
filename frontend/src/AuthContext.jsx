import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") // Initialize based on the existence of the token
  );
  const [loading, setLoading] = useState(true); // Track the loading state

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      console.log("Retrieved token:", token);
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false); // Authentication check complete
    };

    checkAuth();
  }, []);

  const login = (token) => {
    console.log("Setting token:", token);
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };
  //asd

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

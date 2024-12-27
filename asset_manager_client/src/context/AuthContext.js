import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Create AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  //Check token on initial render
  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        //Check if token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          handleLogout(); // Token expired, log out
        } else {
          setUser(decodedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        handleLogout();
      }
    }
  }, []);

  // Handle Login
  const handleLogin = (tokens) => {
    if (!tokens || !tokens.access || !tokens.refresh) {
      console.error("Invalid tokens:", tokens);
      return; // Safeguard against invalid responses
    }

    // Store tokens in localStorage
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);

    // Decode the access token
    try {
      const decodedToken = jwtDecode(tokens.access);
      setUser(decodedToken);
      setIsAuthenticated(true);
      navigate("/dashboard"); // Redirect after successful login
    } catch (error) {
      console.error("Error decoding token:", error);
      handleLogout(); // Clear state if decoding fails
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

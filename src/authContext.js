import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setAuthData({ token, user });
    }
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      try {
        const response = await axios.get(
          `https://project-management-server-4av5.onrender.com/user/${user.uid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        localStorage.setItem("user", JSON.stringify(response.data));
        setAuthData({ token, user: response.data });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData.user));
    setAuthData(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, fetchUserData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

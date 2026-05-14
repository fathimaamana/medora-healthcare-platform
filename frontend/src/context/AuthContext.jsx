import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.log(error);
      }
    }

    setLoading(false);

  }, []);

  const loginUser = async (username, password) => {

    try {

      const response = await axiosInstance.post(
        "auth/login/",
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.access
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      const decoded = jwtDecode(response.data.access);

      setUser(decoded);

      return {
        success: true
      };

    } catch (error) {

      return {
        success: false,
        error: error.response?.data
      };
    }
  };

  const logoutUser = () => {

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
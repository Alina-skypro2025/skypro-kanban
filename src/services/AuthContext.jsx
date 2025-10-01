// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../services/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setError(null);
      const data = await loginUser({ email, password });
      setUser(data.user);
      setIsAuth(true);

      localStorage.setItem("token", data.user.token); // ✅ обязательно так
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      setError(err.message);
      setIsAuth(false);
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      setError(null);
      const data = await registerUser({ name, email, password });
      setUser(data.user);
      setIsAuth(true);

      localStorage.setItem("token", data.user.token); // ✅ обязательно так
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      setError(err.message);
      setIsAuth(false);
    }
  };

  const logout = () => {
    setIsAuth(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

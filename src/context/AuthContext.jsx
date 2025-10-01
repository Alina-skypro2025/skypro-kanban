import React, { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../services/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setError(null);
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.user.token);
      setUser(data.user);
      setIsAuth(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      setError(null);
      const data = await registerUser({ name, email, password });
      localStorage.setItem("token", data.user.token);
      setUser(data.user);
      setIsAuth(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    setIsAuth(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

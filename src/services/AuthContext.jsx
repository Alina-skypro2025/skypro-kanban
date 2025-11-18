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

      const { token, user } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setIsAuth(true);
    } catch (err) {
      setError(err.message);
    }
  };

  
  const register = async ({ name, email, password }) => {
    try {
      setError(null);
      const data = await registerUser({ name, email, password });

      const { token, user } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setIsAuth(true);
    } catch (err) {
      setError(err.message);
    }
  };

  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, user, login, register, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  // логин по email (если имя не известно, возьмём часть до @)
  const login = (email) => {
    const name = email ? email.split("@")[0] : null;
    setUser({ name, email });
    setIsAuth(true);
  };

  // регистрация принимает объект {name, email}
  const register = ({ name, email }) => {
    setUser({ name, email });
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

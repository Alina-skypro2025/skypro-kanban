import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsAuth(true);
      setUser(JSON.parse(userData));
    }

    setLoading(false); 
  }, []);

  
  const login = async (email, password) => {
    try {
      setError(null);

      const res = await fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({ login: email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка входа");

      const token = data.user.token;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setIsAuth(true);
    } catch (e) {
      setError(e.message);
    }
  };

  
  const register = async ({ name, email, password }) => {
    try {
      setError(null);

      const res = await fetch("https://wedev-api.sky.pro/api/user", {
        method: "POST",
        body: JSON.stringify({ login: email, password, name }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка регистрации");

      const token = data.user.token;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setIsAuth(true);
    } catch (e) {
      setError(e.message);
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
      value={{ isAuth, user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

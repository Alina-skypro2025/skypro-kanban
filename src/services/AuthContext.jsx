// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../services/auth";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [error, setError] = useState(null);

  // ===== Авторизация =====
  const login = async (email, password) => {
    try {
      setError(null);
      const data = await loginUser({ email, password });

      // API возвращает token и user отдельно
      const { token, user } = data;
      if (!token) throw new Error("Токен не получен от сервера");

      setUser(user);
      setIsAuth(true);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Добро пожаловать, ${user?.name || "пользователь"}!`);
    } catch (err) {
      setError(err.message);
      setIsAuth(false);
      toast.error(err.message || "Ошибка при входе");
    }
  };

  // ===== Регистрация =====
  const register = async ({ name, email, password }) => {
    try {
      setError(null);
      const data = await registerUser({ name, email, password });

      const { token, user } = data;
      if (!token) throw new Error("Токен не получен от сервера");

      setUser(user);
      setIsAuth(true);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Регистрация успешна!");
    } catch (err) {
      setError(err.message);
      setIsAuth(false);
      toast.error(err.message || "Ошибка при регистрации");
    }
  };

  // ===== Выход =====
  const logout = () => {
    setIsAuth(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("Вы вышли из аккаунта");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Хук для доступа к контексту
export const useAuth = () => useContext(AuthContext);

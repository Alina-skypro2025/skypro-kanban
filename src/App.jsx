import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Main from "./components/Main/Main";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isAuth, loading, logout } = useAuth();

  
  if (loading) return null;

  return (
    <Routes>
      {/* ====== Авторизованный пользователь ====== */}
      {isAuth && (
        <>
          <Route
            path="/"
            element={
              <Main
                token={localStorage.getItem("token")}
                onLogout={logout}
              />
            }
          />

          {/* 404 для авторизованных */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}

      {/* ====== Неавторизованный пользователь ====== */}
      {!isAuth && (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 404: любой путь ведёт на login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
}

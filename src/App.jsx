// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/Main/Main";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isAuth, logout } = useAuth();

  return (
    <Routes>
      {isAuth ? (
        <>
          <Route
            path="/"
            element={<Main token={localStorage.getItem("token")} onLogout={logout} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
}

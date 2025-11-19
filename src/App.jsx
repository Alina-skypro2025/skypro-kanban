
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Main from "./components/Main/Main";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isAuth, logout } = useAuth();

  const token = localStorage.getItem("token");

  return (
    <Routes>
     
      <Route
        path="/login"
        element={
          isAuth
            ? <Navigate to="/" replace />
            : <LoginPage />
        }
      />

      <Route
        path="/register"
        element={
          isAuth
            ? <Navigate to="/" replace />
            : <RegisterPage />
        }
      />

     
      <Route
        path="/"
        element={
          isAuth
            ? <Main token={token} onLogout={logout} />
            : <Navigate to="/login" replace />
        }
      />

      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();

  // Если провайдер не подключён или хук не вернул данные
  if (!auth) return <Navigate to="/login" replace />;

  const { isAuth } = auth;
  return isAuth ? children : <Navigate to="/login" replace />;
}

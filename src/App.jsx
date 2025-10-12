import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import CardPage from "./pages/CardPage.jsx";
import AddCardPage from "./pages/AddCardPage.jsx";
import ExitPage from "./pages/ExitPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Routes>
          {/* публичные */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* защищённые */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/card/:id"
            element={
              <ProtectedRoute>
                <CardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddCardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exit"
            element={
              <ProtectedRoute>
                <ExitPage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </TaskProvider>
    </AuthProvider>
  );
}

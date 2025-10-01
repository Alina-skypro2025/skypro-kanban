import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// страницы
import MainPage from "./pages/MainPage";
import CardPage from "./pages/CardPage";
import AddCardPage from "./pages/AddCardPage";
import ExitPage from "./pages/ExitPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./main.scss";

export default function AppRoutes() {
  return (
    <Routes>
      {/* --- публичные --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* --- защищённые --- */}
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

      {/* --- 404 --- */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
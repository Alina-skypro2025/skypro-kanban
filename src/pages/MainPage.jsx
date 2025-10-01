// src/pages/MainPage.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import { getTasks } from "../services/tasks";
import "../main.scss";

export default function MainPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // достаем токен
        const data = await getTasks(token); // запрос к API
        console.log("Ответ API:", data);
        setTasks(data.tasks); // сохраняем в стейт
      } catch (err) {
        console.error("Ошибка при загрузке задач:", err);
        setError("Не удалось загрузить задачи");
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Загрузка...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="wrapper">
      <Header />
      <Main tasks={tasks} />
    </div>
  );
}

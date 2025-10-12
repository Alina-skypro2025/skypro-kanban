import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import { useTasks } from "../context/TaskContext";
import "../main.scss";

export default function MainPage() {
  const { tasks, loading, error, loadTasks } = useTasks();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) loadTasks(token);
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

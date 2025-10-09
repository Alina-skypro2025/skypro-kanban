import React, { createContext, useContext, useState, useEffect } from "react";
import { getTasks } from "../services/tasks";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // загрузка задач при монтировании
  const loadTasks = async (token) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks(token);
      setTasks(data.tasks || []);
    } catch (err) {
      setError("Не удалось загрузить задачи");
      console.error("Ошибка загрузки:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearTasks = () => setTasks([]);

  return (
    <TaskContext.Provider value={{ tasks, loading, error, loadTasks, clearTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);

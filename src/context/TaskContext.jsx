
import React, { createContext, useContext, useCallback, useMemo, useState } from "react";
import {
  getTasks as apiGetTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
  getTaskById as apiGetTaskById,
} from "../services/tasks";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);         
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);       

  
  const normalize = (list = []) =>
    list.map((t) => ({
      ...t,
      id: t._id || t.id,
    }));

  const loadTasks = useCallback(async (token) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetTasks(token);
      setTasks(normalize(data.tasks || []));
    } catch (e) {
      console.error(e);
      setError(e.message || "Не удалось загрузить задачи");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTask = useCallback(async (id, token) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetTaskById(id, token);
      return { ...data.task, id: data.task?._id || data.task?.id };
    } catch (e) {
      console.error(e);
      setError(e.message || "Не удалось получить задачу");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (payload, token) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCreateTask(payload, token);
      setTasks(normalize(data.tasks || [])); 
      return true;
    } catch (e) {
      console.error(e);
      setError(e.message || "Не удалось добавить задачу");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const editTask = useCallback(async (id, payload, token) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiUpdateTask(id, payload, token);
      setTasks(normalize(data.tasks || []));
      return true;
    } catch (e) {
      console.error(e);
      setError(e.message || "Не удалось изменить задачу");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeTask = useCallback(async (id, token) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiDeleteTask(id, token);
      setTasks(normalize(data.tasks || []));
      return true;
    } catch (e) {
      console.error(e);
      setError(e.message || "Не удалось удалить задачу");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      loading,
      error,
      loadTasks,
      addTask,
      editTask,
      removeTask,
      fetchTask,
      setError, 
    }),
    [tasks, loading, error, loadTasks, addTask, editTask, removeTask, fetchTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => useContext(TaskContext);

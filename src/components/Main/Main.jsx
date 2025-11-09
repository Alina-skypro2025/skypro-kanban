import React, { useEffect, useState, useCallback } from "react";
import { MainWrapper, Content } from "./Main.styled";
import Header from "../Header/Header";
import Column from "../Column/Column";
import TaskCard from "../TaskCard/TaskCard";
import TaskModalCreate from "../TaskModal/TaskModalCreate";
import TaskModal from "../TaskModal/TaskModal";
import { getTasks, createTask } from "../../services/tasks";

export default function Main({ token, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const statuses = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  // ====== Загрузка задач ======
  const loadTasks = useCallback(async () => {
    try {
      const data = await getTasks(token);
      setTasks(Array.isArray(data) ? data : data.tasks || []);
    } catch (err) {
      console.error("Ошибка при загрузке задач:", err);
      setError(err.message);
      if (err.message.includes("401")) {
        alert("Сессия истекла, войдите снова");
        onLogout();
      }
    }
  }, [token, onLogout]);

  useEffect(() => {
    if (token) loadTasks();
  }, [token, loadTasks]);

  // ====== Создание ======
  async function handleTaskCreated(newTaskData) {
    try {
      await createTask(token, newTaskData);
      setIsCreateModalOpen(false);
      setTimeout(loadTasks, 800); 
    } catch (err) {
      console.error("Ошибка при создании:", err);
      alert("Ошибка при создании: " + err.message);
    }
  }

  // ====== Обновление ======
  function handleTaskUpdated(updatedTask) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === updatedTask.id || t._id === updatedTask._id
          ? { ...t, ...updatedTask }
          : t
      )
    );
    
    setTimeout(loadTasks, 1000);
  }

  // ====== Удаление ======
  function handleTaskDeleted(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id && t._id !== id));
    setTimeout(loadTasks, 800);
  }

  return (
    <MainWrapper>
      <Header onLogout={onLogout} onCreate={() => setIsCreateModalOpen(true)} />

      <div className="container">
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Content>
          {statuses.map((status) => (
            <Column key={status} title={status}>
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <TaskCard
                    key={task._id || task.id}
                    task={task}
                    token={token}
                    onClick={() => setSelectedTask(task)}
                    onTaskUpdated={handleTaskUpdated}
                    onTaskDeleted={handleTaskDeleted}
                  />
                ))}
            </Column>
          ))}
        </Content>
      </div>

      {isCreateModalOpen && (
        <TaskModalCreate
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleTaskCreated}
        />
      )}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          token={token}
          onClose={() => {
            setSelectedTask(null);
            setTimeout(loadTasks, 800); 
          }}
          onUpdate={handleTaskUpdated}
          onDelete={handleTaskDeleted}
        />
      )}
    </MainWrapper>
  );
}

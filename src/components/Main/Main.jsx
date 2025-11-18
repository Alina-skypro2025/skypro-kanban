import React, { useState, useEffect, useCallback } from "react";
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

  // === SAFE ID HELPERS ===
  function getId(task) {
    if (!task) return null;
    return task._id || task.id || null;
  }

  function sameId(a, b) {
    return getId(a) === getId(b);
  }

  // ===== Загрузка задач =====
  const loadTasks = useCallback(async () => {
    try {
      const list = await getTasks(token);

      // защищаемся от undefined задач
      const safe = list.filter((t) => t && getId(t));

      setTasks(safe);
    } catch (err) {
      if (err.message === "401") return;
      setError(err.message);
    }
  }, [token]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // ===== Создание =====
  async function handleTaskCreated(newTaskData) {
    await createTask(newTaskData, token);
    setIsCreateModalOpen(false);
    loadTasks();
  }

  // ===== Обновление =====
  function handleTaskUpdated(updatedTask) {
    setTasks((prev) =>
      prev.map((t) => (sameId(t, updatedTask) ? updatedTask : t))
    );

    setSelectedTask(null);
    loadTasks();
  }

  // ===== Удаление =====
  function handleTaskDeleted(id) {
    setTasks((prev) => prev.filter((t) => getId(t) !== id));

    setSelectedTask(null);
    loadTasks();
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
                    key={getId(task)}
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
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdated}
          onDelete={handleTaskDeleted}
        />
      )}
    </MainWrapper>
  );
}

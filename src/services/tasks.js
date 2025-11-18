// src/services/tasks.js
const BASE_URL = "https://wedev-api.sky.pro/api/kanban";

// ===== Получение всех задач =====
export async function getTasks(token) {
  const response = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    throw new Error("Сессия истекла. Войдите заново.");
  }

  if (!response.ok) {
    throw new Error("Ошибка загрузки задач");
  }

  const data = await response.json();
  return data.tasks || [];
}

// ===== Создание новой задачи =====
export async function createTask(token, taskData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Ошибка создания задачи");
  }

  return data.task || data.tasks || [];
}

// ===== Обновление задачи =====
export async function updateTask(token, taskId, updatedData) {
  if (!taskId) throw new Error("ID задачи не указан");

  const response = await fetch(`${BASE_URL}/${taskId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Ошибка обновления задачи");
  }

  // ❗ Убираем всплывающее уведомление и возвращаем саму задачу
  return data.task || data.tasks || updatedData;
}

// ===== Удаление задачи =====
export async function deleteTask(token, taskId) {
  if (!taskId) throw new Error("ID задачи не указан");

  const response = await fetch(`${BASE_URL}/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Ошибка удаления задачи");
  }

  // ❗ Тихое удаление, без toast
  return true;
}

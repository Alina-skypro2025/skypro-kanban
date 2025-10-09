// src/services/tasks.js
const API_URL = "https://wedev-api.sky.pro/api/kanban";

// Получение задач
export async function getTasks(token) {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Ошибка загрузки задач");
  }

  return res.json(); // вернёт { tasks: [...] }
}

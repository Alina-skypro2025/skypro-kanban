// src/services/api.js
const API_URL = "https://wedev-api.sky.pro/api";

async function request(url, method = "GET", body = null, token = null) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  let options = { method, headers };

  if (body) {
    if (url.includes("/user")) {
      //  Шлём чистый JSON БЕЗ content-type
      options.body = JSON.stringify(body);
    } else {
      //  Для задач — FormData
      const form = new FormData();
      Object.keys(body).forEach((key) => form.append(key, body[key]));
      options.body = form;
    }
  }

  const response = await fetch(`${API_URL}${url}`, options);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Ошибка запроса");
  }

  return response.json();
}

// 🔑 Авторизация
export function loginUser({ login, password }) {
  return request("/user/login", "POST", { login, password });
}

// 🔑 Регистрация
export function registerUser({ login, password, name }) {
  return request("/user", "POST", { login, password, name });
}

// 📋 Задачи
export function getTasks(token) {
  return request("/kanban", "GET", null, token);
}

export function createTask(task, token) {
  return request("/kanban", "POST", task, token);
}

export function updateTask(id, task, token) {
  return request(`/kanban/${id}`, "PUT", task, token);
}

export function deleteTask(id, token) {
  return request(`/kanban/${id}`, "DELETE", null, token);
}

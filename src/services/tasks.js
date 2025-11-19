const BASE_URL = "https://wedev-api.sky.pro/api/kanban";


export async function getTasks(token) {
  const response = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    throw new Error("401");
  }

  if (!response.ok) {
    throw new Error(data.message || "Ошибка загрузки задач");
  }

  return data.tasks || [];
}


export async function createTask(task, token) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(task),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Ошибка создания");
  }

  return data.task;
}


export async function updateTask(id, task, token) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(task),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Ошибка обновления");
  }

  return data.task;
}


export async function deleteTask(id, token) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Ошибка удаления");
  }

  return true;
}

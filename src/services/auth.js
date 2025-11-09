// src/services/auth.js
import { toast } from "react-toastify";

const API_URL = "https://wedev-api.sky.pro/api/user";

export async function loginUser({ email, password }) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      // ❗ Не указываем Content-Type — API не принимает этот заголовок
      body: JSON.stringify({
        login: email,
        password,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || data.error || "Ошибка при входе");
    }

    // toast.success("Добро пожаловать!"); // ✅ отключено уведомление
    return data; // API возвращает { user, token }
  } catch (err) {
    toast.error(err.message || "Ошибка при входе");
    throw err;
  }
}

export async function registerUser({ name, email, password }) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      // ❗ Не добавляем Content-Type
      body: JSON.stringify({
        login: email,
        name,
        password,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || data.error || "Ошибка при регистрации");
    }

    // toast.success("Регистрация успешна!"); // ✅ тоже можно отключить
    return data; // { user, token }
  } catch (err) {
    toast.error(err.message || "Ошибка при регистрации");
    throw err;
  }
}

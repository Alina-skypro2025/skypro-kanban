const API_URL = "https://wedev-api.sky.pro/api/user";

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({
      login: email,
      password,
    }),
  });

  const data = await response.json();
  console.log("LOGIN RESPONSE:", data);

  if (!response.ok) {
    throw new Error(data.message || data.error || "Ошибка при входе");
  }

  return data;
}

export async function registerUser({ name, email, password }) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      login: email,
      name,
      password,
    }),
  });

  const data = await response.json();
  console.log("REGISTER RESPONSE:", data);

  if (!response.ok) {
    throw new Error(data.message || data.error || "Ошибка при регистрации");
  }

  return data;
}

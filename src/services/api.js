const API_URL = "https://wedev-api.sky.pro/api";

export async function request(url, method = "GET", body = null, token = null) {
  const headers = {};

  if (token) headers.Authorization = `Bearer ${token}`;

  const options = { method, headers };

  if (body) {
    
    options.body = JSON.stringify(body);
  }

  const response = await fetch(API_URL + url, options);

  let data = {};
  try {
    data = await response.json();
  } catch {}

  if (!response.ok) {
    throw new Error(data.error || data.message || "Ошибка запроса");
  }

  return data;
}

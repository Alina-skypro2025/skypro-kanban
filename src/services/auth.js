import { request } from "./api";


export function loginUser({ email, password }) {
  return request("/user/login", "POST", {
    login: email,
    password,
  });
}


export function registerUser({ name, email, password }) {
  return request("/user", "POST", {
    login: email,
    password,
    name,
  });
}

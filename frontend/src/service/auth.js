const API_URL = "http://127.0.0.1:5000";

export const register = async (name, email, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (data.token) localStorage.setItem("token", data.token); // Lưu token vào localStorage
  return data;
};

export const forgotPassword = async (email) => {
  const response = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return response.json();
};

export const logout = () => {
  localStorage.removeItem("token"); // Xóa token khi logout
};

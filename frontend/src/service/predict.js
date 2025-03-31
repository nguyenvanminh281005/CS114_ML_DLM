const API_URL = "http://127.0.0.1:5000";

export const predict = async (features) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  if (!token) {
    return { error: "Unauthorized: Please log in first." };
  }

  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`  // Gửi token để xác thực
    },
    body: JSON.stringify({ features }),
  });

  return response.json();
};

import { useMutation } from "@tanstack/react-query";
const registerApi = async (userData) => {
  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }
  return response.json();
};
const loginApi = async (credentials) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }
  return response.json();
};
export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      localStorage.setItem("userInfo", JSON.stringify(data));
    },
  });
};
export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      localStorage.setItem("userInfo", JSON.stringify(data));
    },
  });
};

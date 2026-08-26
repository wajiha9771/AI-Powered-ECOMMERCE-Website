import { useMutation } from "@tanstack/react-query";

const sendAIChat = async (message) => {
  const response = await fetch("http://localhost:5000/api/ai/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        "An error occurred while getting a response from the AI Assistant",
    );
  }
  return response.json();
};
export const useAIChat = () => {
  return useMutation({
    mutationFn: sendAIChat,
  });
};

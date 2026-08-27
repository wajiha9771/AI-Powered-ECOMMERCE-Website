import { useMutation } from "@tanstack/react-query";

const sendAISearch = async (message) => {
 const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/chat`, {
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
        "An error occurred while getting a response from AI Search.",
    );
  }
  return response.json();
};

export const useAISearch = () => {
  return useMutation({
    mutationFn: sendAISearch,
  });
};

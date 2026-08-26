import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const fetchContactMessages = async () => {
  const response = await fetch("http://localhost:5000/api/contact");
  if (!response.ok) {
    throw new Error("Failed to fetch contact messages.");
  }
  return response.json();
};
const deleteContactMessageAPI = async (messageId) => {
  const response = await fetch(
    `http://localhost:5000/api/contact/${messageId}`,
    {
      method: "DELETE",
    },
  );
  if (!response.ok) {
    throw new Error("Failed to delete contact message.");
  }
  return response.json();
};

export const useContactMessages = () => {
  return useQuery({
    queryKey: ["contactMessages"],
    queryFn: fetchContactMessages,
    staleTime: 1000 * 60 * 5,
  });
};
export const useDeleteContactMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteContactMessageAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contactMessages"],
      });
    },
  });
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const fetchCMSData = async () => {
  const response = await fetch("http://localhost:5000/api/cms");
  if (!response.ok) {
    throw new Error("Error occured in loading CMS data");
  }
  return response.json();
};
const updateCMSData = async (updatedConfig) => {
  const response = await fetch("http://localhost:5000/api/cms", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedConfig),
  });
  if (!response.ok) {
    throw new Error("Error occured in updating CMS data");
  }
  return response.json();
};
export const useCMS = () => {
  return useQuery({
    queryKey: ["cmsSettings"],
    queryFn: fetchCMSData,
    staleTime: 1000 * 60 * 10,
  });
};

export const useUpdateCMS = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCMSData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cmsSettings"] });
    },
  });
};

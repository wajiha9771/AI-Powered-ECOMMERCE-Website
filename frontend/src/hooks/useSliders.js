import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const fetchSliders = async () => {
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sliders`);
  if (!response.ok) {
    throw new Error("Failed to fetch slider catalog from the database.");
  }
  return response.json();
};
const addSliderAPI = async (newSliderData) => {
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sliders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSliderData),
  });
  if (!response.ok) {
    throw new Error("Failed to create and add the new slider asset.");
  }
  return response.json();
};
const updateSliderAPI = async ({ id, updatedData }) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sliders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error("Error occured in Slider update !");
  }
  return response.json();
};
const deleteSliderAPI = async (sliderId) => {
  const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/sliders/${sliderId}`,
    {
      method: "DELETE",
    },
  );
  if (!response.ok) {
    throw new Error(
      "Failed to delete the requested slider asset from the database.",
    );
  }
  return response.json();
};
export const useSliders = () => {
  return useQuery({
    queryKey: ["sliders"],
    queryFn: fetchSliders,
    staleTime: 1000 * 60 * 5,
  });
};
export const useAddSlider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSliderAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sliders"] });
    },
  });
};
export const useUpdateSlider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSliderAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sliders"] });
    },
  });
};
export const useDeleteSlider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSliderAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sliders"] });
    },
  });
};

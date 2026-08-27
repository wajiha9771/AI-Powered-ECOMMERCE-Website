import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchAnalytics = async () => {
 const response = await fetch(`${import.meta.env.VITE_API_URL}/api/analytics`);
  if (!response.ok) {
    throw new Error("Failed to fetch analytics logs.");
  }
  return response.json();
};
const fetchAnalyticsSummary = async () => {
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/analytics/summary`);
  if (!response.ok) {
    throw new Error("Failed to fetch analytics summary.");
  }
  return response.json();
};
const trackEventAPI = async (eventData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/analytics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    throw new Error("Failed to record event.");
  }
  return response.json();
};
export const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
    staleTime: 1000 * 60 * 2,
  });
};
export const useAnalyticsSummary = () => {
  return useQuery({
    queryKey: ["analytics-summary"],
    queryFn: fetchAnalyticsSummary,
    staleTime: 1000 * 60 * 2,
  });
};
export const useTrackEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: trackEventAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });
      queryClient.invalidateQueries({
        queryKey: ["analytics-summary"],
      });
    },
  });
};

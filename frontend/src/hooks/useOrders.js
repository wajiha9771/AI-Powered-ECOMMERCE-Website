import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const fetchOrders = async () => {
 const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`);
  if (!response.ok) {
    throw new Error("Failed to fetch customer orders from the database.");
  }
  return response.json();
};
const updateOrderStatusAPI = async ({ orderId, status }) => {
  const response = await fetch(
`${import.meta.env.VITE_API_URL}/api/orders/${orderId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to update the order status.");
  }
  return response.json();
};
const deleteOrderAPI = async (orderId) => {
const response = await fetch(
`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`,
{
method: "DELETE",
},
);

if (!response.ok) {
throw new Error("Failed to delete the order.");
}

return response.json();
};

export const useDeleteOrder = () => {
const queryClient = useQueryClient();

return useMutation({
mutationFn: deleteOrderAPI,
onSuccess: () => {
queryClient.invalidateQueries({ queryKey: ["orders"] });
},
});
};

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 5,
  });
};
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrderStatusAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
const createOrderAPI = async (newOrderData) => {
const storedUser = JSON.parse(localStorage.getItem("userInfo")) || {};
const token = storedUser.token;

const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${token}`,
},
body: JSON.stringify(newOrderData),
});

if (!response.ok) {
throw new Error("Failed to create order asset from Database!");
}

return response.json();
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrderAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
export const useUserOrders = (userId) => {
  return useQuery({
    queryKey: ["userOrders", userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/orders/user/${userId}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user orders");
      }
      return response.json();
    },
    enabled: !!userId,
  });
};

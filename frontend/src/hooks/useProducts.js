import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const fetchProducts = async () => {
 const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch product catalog from the database.");
  }
  return response.json();
};
const addProductAPI = async (newProductPayload) => {
 const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
    method: "POST",
    body: newProductPayload,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || "Failed to create and add the new product.",
    );
  }
  return response.json();
};
const updateProductAPI = async ({ id, updatedData }) => {
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
    method: "PUT",
    body: updatedData,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error occured in updating product!");
  }
  return response.json();
};
const deleteProductAPI = async (productId) => {
  const response = await fetch(
`${import.meta.env.VITE_API_URL}/api/products/${productId}`,
    {
      method: "DELETE",
    },
  );
  if (!response.ok) {
    throw new Error(
      "Failed to delete the requested product asset from the database.",
    );
  }
  return response.json();
};
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });
};
export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

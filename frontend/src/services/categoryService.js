import axiosInstance from "./axiosInstance";

// Get All Categories
export const getCategories = () =>
    axiosInstance.get("/categories");

// Add Category
export const addCategory = (data) =>
    axiosInstance.post("/categories/add", data);

// Update Category
export const updateCategory = (id, data) =>
    axiosInstance.put(`/categories/${id}`, data);

// Delete Category
export const deleteCategory = (id) =>
    axiosInstance.delete(`/categories/${id}`);
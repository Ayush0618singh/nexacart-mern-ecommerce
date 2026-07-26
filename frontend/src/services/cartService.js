import axiosInstance from "./axiosInstance";

// Add Product To Cart
export const addToCart = (data) =>
    axiosInstance.post("/cart", data);

// Get Cart Items
export const getCartItems = () =>
    axiosInstance.get("/cart");

// Update Quantity
export const updateCartQuantity = (id, data) =>
    axiosInstance.put(`/cart/${id}`, data);

// Delete Cart Item
export const deleteCartItem = (id) =>
    axiosInstance.delete(`/cart/${id}`);
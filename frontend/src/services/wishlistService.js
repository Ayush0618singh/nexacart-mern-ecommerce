import axiosInstance from "./axiosInstance";

// Add Product To Wishlist
export const addToWishlist = (data) =>
    axiosInstance.post("/wishlist", data);

// Get Wishlist
export const getWishlist = () =>
    axiosInstance.get("/wishlist");

// Remove Wishlist Item
export const removeWishlistItem = (id) =>
    axiosInstance.delete(`/wishlist/${id}`);
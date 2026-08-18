import axiosInstance from "./axiosInstance";

// Add Review
export const addReview = (data) =>
    axiosInstance.post("/reviews", data);

// Get Reviews
export const getProductReviews = (productId) =>
    axiosInstance.get(`/reviews/product/${productId}`);;

// Update Review
export const updateReview = (id, data) =>
    axiosInstance.put(`/reviews/${id}`, data);

// Delete Review
export const deleteReview = (id) =>
    axiosInstance.delete(`/reviews/${id}`);

// Get All Reviews (Admin)
export const getAllReviews = () =>
    axiosInstance.get("/reviews/admin/all");
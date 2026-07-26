import axiosInstance from "./axiosInstance";

// Place Order
export const placeOrder = (data) =>
    axiosInstance.post("/orders", data);

// Get My Orders
export const getMyOrders = () =>
    axiosInstance.get("/orders");

// Get Single Order
export const getSingleOrder = (id) =>
    axiosInstance.get(`/orders/${id}`);
import axiosInstance from "./axiosInstance";

// =====================================================
// PLACE ORDER
// =====================================================

export const placeOrder = (data) =>
    axiosInstance.post("/orders", data);


// =====================================================
// GET MY ORDERS
// =====================================================

export const getMyOrders = () =>
    axiosInstance.get("/orders");


// =====================================================
// GET SINGLE ORDER
// =====================================================

export const getSingleOrder = (id) =>
    axiosInstance.get(`/orders/${id}`);


// Create Razorpay Order
export const createPaymentOrder = (data) =>
    axiosInstance.post("/payment/create-order", data);

// Verify Razorpay Payment
export const verifyPayment = (data) =>
    axiosInstance.post("/payment/verify", data);
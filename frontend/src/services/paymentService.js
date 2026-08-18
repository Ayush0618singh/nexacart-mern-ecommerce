import axiosInstance from "./axiosInstance";

// Create Razorpay Order
export const createPaymentOrder = (orderId) =>
    axiosInstance.post("/payment/create-order", {
        orderId,
    });


// Verify Razorpay Payment
export const verifyPayment = (paymentData) =>
    axiosInstance.post("/payment/verify", paymentData);
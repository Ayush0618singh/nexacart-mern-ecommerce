import axiosInstance from "./axiosInstance";

// =========================================================
// SEND SUPPORT REQUEST
// =========================================================

export const sendSupportRequest = (data) => {
    return axiosInstance.post("/support", data);
};
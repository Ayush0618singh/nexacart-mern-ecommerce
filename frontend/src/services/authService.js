import axiosInstance from "./axiosInstance";


// =====================================================
// LOGIN API
// =====================================================

export const loginUser = (userData) => {
    return axiosInstance.post(
        "/auth/login",
        userData
    );
};


// =====================================================
// REGISTER API
// =====================================================

export const registerUser = (userData) => {
    return axiosInstance.post(
        "/auth/register",
        userData
    );
};


// =====================================================
// UPDATE PROFILE API
// =====================================================

export const updateUserProfile = (formData) => {
    return axiosInstance.put(
        "/auth/profile",
        formData
    );
};
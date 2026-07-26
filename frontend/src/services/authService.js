import axiosInstance from "./axiosInstance";

//Login API
export const loginUser = (userData) => {
    return axiosInstance.post("/auth/login", userData);

};

//Register API
export const registerUser = (userData) => {
    return axiosInstance.post("/auth/register", userData);

};
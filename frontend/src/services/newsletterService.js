import axiosInstance from "./axiosInstance";


// =========================================================
// SUBSCRIBE TO NEWSLETTER
// =========================================================

export const subscribeNewsletter = (
    email
) => {

    return axiosInstance.post(
        "/newsletter",
        {
            email,
        }
    );

};
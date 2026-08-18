import axios from "axios";

import { BASE_URL } from "../constants/api";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
});


// =====================================================
// REQUEST INTERCEPTOR
// =====================================================

axiosInstance.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem("token");


        if (token) {

            config.headers =
                config.headers || {};

            config.headers.Authorization =
                `Bearer ${token}`;
        }


        // =================================================
        // FORMDATA REQUEST
        // Let browser/Axios set multipart boundary
        // =================================================

        if (
            typeof FormData !== "undefined" &&
            config.data instanceof FormData
        ) {

            delete config.headers[
                "Content-Type"
            ];

        } else {

            // Normal JSON request

            config.headers[
                "Content-Type"
            ] =
                "application/json";
        }


        return config;

    },
    (error) =>
        Promise.reject(error)
);


export default axiosInstance;
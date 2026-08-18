import axiosInstance from "./axiosInstance";

//Get All Products
export const getProducts = () =>
    axiosInstance.get("/products");

//Featured Products
export const getFeaturedProducts = () =>
    axiosInstance.get("/products/featured");

//Latest Products
export const getLatestProducts = () =>
    axiosInstance.get("/products/latest");

//Get Single Product
export const getSingleProduct = (id) =>
    axiosInstance.get(`/products/${id}`);

//Top Rated Products
export const getTopRatedProducts = () =>
    axiosInstance.get("/products/top-rated");

// Related Products
export const getRelatedProducts = (id) =>
    axiosInstance.get(`/products/${id}/related`);

//Get All Products
export const getAllProducts = (params) => {
    return axiosInstance.get("/products",
    {

        params,

    });
};

// Get Product Reviews
export const getProductReviews = (productId) =>
    axiosInstance.get(`/reviews/product/${productId}`);

// Add Review
export const addReview = (data) =>
    axiosInstance.post("/reviews", data);
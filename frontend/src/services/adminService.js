import axiosInstance from "./axiosInstance";

// Dashboard Stats
export const getDashboardStats = () =>
    axiosInstance.get("/admin/dashboard");

// Get All Products (Admin)
export const getAdminProducts = (
    page = 1,
    limit = 5,
    keyword = "",
    category = "",
    brand = "",
    stock = "",
    sort = "latest"
) =>
    axiosInstance.get(
        `/products?page=${page}&limit=${limit}&keyword=${keyword}&category=${category}&brand=${brand}&stock=${stock}&sort=${sort}`
    );

// Delete Product
export const deleteProduct = (id) =>
    axiosInstance.delete(`/products/${id}`);

// Toggle Featured Product
export const toggleFeatured = (id) =>
    axiosInstance.put(`/products/${id}/featured`);

// Get Single Product
export const getProductById = (id) =>
    axiosInstance.get(`/products/${id}`);

// Update Product
export const updateProduct = (id, data) =>
    axiosInstance.put(`/products/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

// Add Product
export const addProduct = (data) =>
    axiosInstance.post("/products", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

// Get All Orders (Admin)
export const getAdminOrders = () =>
    axiosInstance.get("/admin/orders");

// Update Order Status
export const updateOrderStatus = (id, orderStatus) =>
    axiosInstance.put(`/admin/orders/${id}`, {
        orderStatus,
    });

// Get All Users
export const getAdminUsers = () =>
    axiosInstance.get("/admin/users");

// Delete User
export const deleteUser = (id) =>
    axiosInstance.delete(`/admin/users/${id}`);

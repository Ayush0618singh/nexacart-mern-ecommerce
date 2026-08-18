import axiosInstance from "./axiosInstance";


// =====================================================
// ADMIN - GET ALL COUPONS
// =====================================================

export const getAdminCoupons = () =>
    axiosInstance.get(
        "/admin/coupons"
    );


// =====================================================
// ADMIN - CREATE COUPON
// =====================================================

export const createAdminCoupon = (
    data
) =>
    axiosInstance.post(
        "/admin/coupons",
        data
    );


// =====================================================
// ADMIN - UPDATE COUPON
// =====================================================

export const updateAdminCoupon = (
    id,
    data
) =>
    axiosInstance.put(
        `/admin/coupons/${id}`,
        data
    );


// =====================================================
// ADMIN - DELETE COUPON
// =====================================================

export const deleteAdminCoupon = (
    id
) =>
    axiosInstance.delete(
        `/admin/coupons/${id}`
    );


// =====================================================
// CUSTOMER - VALIDATE COUPON
// =====================================================

export const validateCoupon = (
    data
) =>
    axiosInstance.post(
        "/coupons/validate",
        data
    );
const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
    getDashboardStats,
    getAllOrders,
    updateOrderStatus,
    getAllUsers,
    deleteUser,

} = require("../controllers/adminController");

const {
    getAllCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
} = require("../controllers/couponController");

router.get(
    "/dashboard",
    auth,
    admin,
    getDashboardStats
);

router.get(
    "/orders",
    auth,
    admin,
    getAllOrders,
);

router.put(
    "/orders/:id",
    auth,
    admin,
    updateOrderStatus
);

// Get All Users
router.get(
    "/users",
    auth,
    admin,
    getAllUsers
);

// Delete User
router.delete(
    "/users/:id",
    auth,
    admin,
    deleteUser
);

router.get(
    "/coupons",
    auth,
    admin,
    getAllCoupons
);

router.post(
    "/coupons",
    auth,
    admin,
    createCoupon
);

router.put(
    "/coupons/:id",
    auth,
    admin,
    updateCoupon
);

router.delete(
    "/coupons/:id",
    auth,
    admin,
    deleteCoupon
);

module.exports = router;
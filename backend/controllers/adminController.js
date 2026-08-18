const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");
const User = require("../models/User");
const Review = require("../models/Review");

const getDashboardStats = async (req, res) => {
    try {

        const totalProducts = await Product.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalReviews = await Review.countDocuments();

        // =====================================================
        // TOTAL PAID REVENUE
        // =====================================================

        const revenue = await Order.aggregate([
            {
                $match: {
                    isPaid: true,
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: {
                            $ifNull: [
                                "$payableAmount",
                                "$totalPrice",
                            ],
                        },
                    },
                },
            },
        ]);


        // =====================================================
        // LAST 7 DAYS SALES
        // =====================================================

        const startDate = new Date();

        startDate.setHours(0, 0, 0, 0);

        startDate.setDate(
            startDate.getDate() - 6
        );


        const dailySales = await Order.aggregate([

            // Only paid orders
            {
                $match: {
                    isPaid: true,

                    createdAt: {
                        $gte: startDate,
                    },
                },
            },


            // Group by date
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt",
                        },
                    },

                    revenue: {
                        $sum: {
                            $ifNull: [
                                "$payableAmount",
                                "$totalPrice",
                            ],
                        },
                    },

                    orders: {
                        $sum: 1,
                    },
                },
            },


            // Oldest → newest
            {
                $sort: {
                    _id: 1,
                },
            },

        ]);

        // =====================================================
        // FILL ALL LAST 7 DAYS
        // =====================================================

        const salesByDate = new Map(
            dailySales.map((item) => [
                item._id,
                item,
            ])
        );


        const completeDailySales = [];


        for (let i = 6; i >= 0; i--) {

            const date = new Date();

            date.setHours(0, 0, 0, 0);

            date.setDate(
                date.getDate() - i
            );


            const dateKey =
                date.toISOString().split("T")[0];


            const existing =
                salesByDate.get(dateKey);


            completeDailySales.push({

                _id: dateKey,

                revenue:
                    existing?.revenue || 0,

                orders:
                    existing?.orders || 0,

            });

        }

        // =====================================================
        // PREVIOUS 7 DAYS ANALYTICS
        // =====================================================

        const currentStartDate = new Date();
        currentStartDate.setHours(0, 0, 0, 0);
        currentStartDate.setDate(
            currentStartDate.getDate() - 6
        );


        // Previous 7 days start
        const previousStartDate = new Date(
            currentStartDate
        );

        previousStartDate.setDate(
            previousStartDate.getDate() - 7
        );


        // Current period orders
        const currentPeriodStats =
            await Order.aggregate([

                {
                    $match: {
                        createdAt: {
                            $gte: currentStartDate,
                        },
                    },
                },

                {
                    $group: {
                        _id: null,

                        orders: {
                            $sum: 1,
                        },

                        revenue: {
                            $sum: {
                                $cond: [
                                    {
                                        $eq: [
                                            "$isPaid",
                                            true,
                                        ],
                                    },
                                    {
                                        $ifNull: [
                                            "$payableAmount",
                                            "$totalPrice",
                                        ],
                                    },
                                    0,
                                ],
                            },
                        },
                    },
                },

            ]);


        // Previous period orders
        const previousPeriodStats =
            await Order.aggregate([

                {
                    $match: {
                        createdAt: {
                            $gte: previousStartDate,
                            $lt: currentStartDate,
                        },
                    },
                },

                {
                    $group: {
                        _id: null,

                        orders: {
                            $sum: 1,
                        },

                        revenue: {
                            $sum: {
                                $cond: [
                                    {
                                        $eq: [
                                            "$isPaid",
                                            true,
                                        ],
                                    },
                                    {
                                        $ifNull: [
                                            "$payableAmount",
                                            "$totalPrice",
                                        ],
                                    },
                                    0,
                                ],
                            },
                        },
                    },
                },

            ]);

            // =====================================================
            // GROWTH CALCULATION
            // =====================================================

            const getGrowthPercentage = (
                current,
                previous
            ) => {

                if (previous === 0) {

                    return current > 0
                        ? 100
                        : 0;
                }

                return Number(
                    (
                        ((current - previous) /
                            previous) *
                        100
                    ).toFixed(1)
                );
            };


            const currentOrders =
                currentPeriodStats[0]?.orders || 0;

            const previousOrders =
                previousPeriodStats[0]?.orders || 0;


            const currentRevenue =
                currentPeriodStats[0]?.revenue || 0;

            const previousRevenue =
                previousPeriodStats[0]?.revenue || 0;


            const ordersGrowth =
                getGrowthPercentage(
                    currentOrders,
                    previousOrders
                );


            const revenueGrowth =
                getGrowthPercentage(
                    currentRevenue,
                    previousRevenue
                );

        // =====================================================
        // ORDER STATUS DISTRIBUTION
        // =====================================================

        const orderStatusStats = await Order.aggregate([
            {
                $group: {
                    _id: "$orderStatus",
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    count: -1,
                },
            },
        ]);

        const recentOrders = await Order.find()
        .populate("user", "name email")
        .select(
            "user totalPrice payableAmount paymentMethod isPaid razorpayOrderId paymentId orderStatus createdAt"
        )
        .sort("-createdAt")
        .limit(5);

        const recentReviews = await Review.find()
        .populate("user", "name")
        .populate("product", "name")
        .sort("-createdAt")
        .limit(5);

        // =====================================================
        // LOW STOCK PRODUCTS
        // =====================================================

        const lowStockProducts = await Product.find({
            stock: { $lte: 5 }
        })
        .select("name stock images price")
        .sort({ stock: 1 })
        .limit(5);

        // Pending Orders
        const pendingOrders = await Order.countDocuments({
            orderStatus: "Pending",
        });

        // Delivered Orders
        const deliveredOrders = await Order.countDocuments({
            orderStatus: "Delivered",
        });

        const topSellingProducts = await Order.aggregate([
            {
                $match: {
                    orderStatus: {
                        $ne: "Cancelled",
                    },
                },
            },
            
            { $unwind: "$products" },

            {
                $group: {
                    _id: "$products.product",
                    totalSold: { $sum: "$products.quantity" }
                }
            },

            {
                $sort: {
                    totalSold: -1
                }
            },

            {
                $limit: 5
            },

            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },

            {
                $unwind: "$product"
            },

            {
                $project: {
                    totalSold: 1,
                    product: {
                        _id: 1,
                        name: 1,
                        price: 1,
                        images: 1,
                        stock: 1,
                    },
                },
            },
        ]);

        const latestUsers = await User.find()
        .select("name email createdAt")
        .sort({ createdAt: -1 })
        .limit(5);

        res.json({
            success: true,

            stats: {
                totalProducts,
                totalCategories,
                totalOrders,
                totalUsers,
                totalReviews,
                totalRevenue:

                    revenue.length > 0
                    ? revenue[0].total
                    : 0,

                pendingOrders,
                deliveredOrders,
                ordersGrowth,
                revenueGrowth,
            },
            recentOrders,
            recentReviews,
            lowStockProducts,
            topSellingProducts,
            latestUsers,

            dailySales:
                completeDailySales,
            orderStatusStats,
        });

    } catch (error) {

        console.error(
            "GET DASHBOARD STATS ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
}
// Get All Orders (Admin)
const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("products.product", "name price image")
            .sort("-createdAt");

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// Update Order Status
const updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order Not Found",
            });

        }

        order.orderStatus = req.body.orderStatus;

        await order.save();

        res.status(200).json({

            success: true,
            message: "Order Status Updated",

            order,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// Get All Users (Admin)
const getAllUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password")
            .sort("-createdAt");

        res.status(200).json({

            success: true,

            count: users.length,

            users,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// Delete User (Admin)
const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User Not Found",

            });

        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,

            message: "User Deleted Successfully",

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

module.exports = {
    getDashboardStats,
    getAllOrders,
    updateOrderStatus,
    getAllUsers,
    deleteUser,
};
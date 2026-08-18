const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");


// =====================================================
// PLACE ORDER
// =====================================================

const placeOrder = async (req, res) => {

    try {

        const {
            shippingAddress,
            phone,
            paymentMethod,
            productId,
            quantity,
            couponCode,
        } = req.body;


        // ==============================================
        // BASIC VALIDATION
        // ==============================================

        if (!shippingAddress || !phone || !paymentMethod) {

            return res.status(400).json({
                success: false,
                message: "Shipping address, phone and payment method are required",
            });

        }


        let products = [];
        let subtotal = 0;


        // ==============================================
        // BUY NOW
        // ==============================================

        if (productId) {

            const product = await Product.findById(productId);


            if (!product) {

                return res.status(404).json({
                    success: false,
                    message: "Product Not Found",
                });

            }


            const orderQuantity =
                Number(quantity) || 1;


            if (orderQuantity <= 0) {

                return res.status(400).json({
                    success: false,
                    message: "Invalid Quantity",
                });

            }


            if (orderQuantity > product.stock) {

                return res.status(400).json({
                    success: false,
                    message: "Insufficient Stock",
                });

            }


            products = [
                {
                    product: product._id,
                    quantity: orderQuantity,
                }
            ];


            subtotal =
                product.price * orderQuantity;

        }


        // ==============================================
        // CART CHECKOUT
        // ==============================================

        else {

            const cartItems = await Cart.find({
                user: req.user.id
            }).populate("product");


            if (cartItems.length === 0) {

                return res.status(400).json({
                    success: false,
                    message: "Cart is Empty",
                });

            }


            for (const item of cartItems) {

                if (!item.product) {

                    continue;

                }


                if (item.quantity > item.product.stock) {

                    return res.status(400).json({
                        success: false,
                        message:
                            `${item.product.name} has insufficient stock`,
                    });

                }


                subtotal +=
                    item.product.price *
                    item.quantity;

            }


            products = cartItems
                .filter(item => item.product)
                .map(item => ({

                    product: item.product._id,

                    quantity: item.quantity,

                }));

        }


        // ==============================================
        // SHIPPING CALCULATION
        // ==============================================

        const shippingCharge =
            subtotal >= 1000 ? 0 : 99;


        // ==============================================
        // BASE DISCOUNT
        // Existing NexaCart offer
        // ==============================================

        const baseDiscount =
            subtotal >= 5000 ? 500 : 0;


        // ==============================================
        // COUPON VARIABLES
        // ==============================================

        let couponDiscount = 0;
        let appliedCoupon = null;


        // ==============================================
        // COUPON VALIDATION
        // ==============================================

        if (couponCode) {

            const normalizedCouponCode =
                String(couponCode)
                    .trim()
                    .toUpperCase();


            const coupon =
                await Coupon.findOne({
                    code: normalizedCouponCode,
                    isActive: true,
                });


            // Coupon doesn't exist
            if (!coupon) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid or inactive coupon",
                });

            }


            // Coupon expired
            if (
                new Date(coupon.expiresAt) <=
                new Date()
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Coupon has expired",
                });

            }


            // Usage limit reached
            if (
                coupon.usageLimit > 0 &&
                coupon.usedCount >=
                    coupon.usageLimit
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Coupon usage limit reached",
                });

            }


            // Minimum order check
            if (
                subtotal <
                coupon.minOrderAmount
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        `Minimum order value is ₹${coupon.minOrderAmount}`,
                });

            }


            // ==========================================
            // CALCULATE COUPON DISCOUNT
            // ==========================================

            if (
                coupon.discountType ===
                "percentage"
            ) {

                couponDiscount =
                    (subtotal *
                        coupon.discountValue) /
                    100;

            } else {

                couponDiscount =
                    coupon.discountValue;

            }


            // Discount cannot exceed subtotal
            couponDiscount =
                Math.min(
                    couponDiscount,
                    subtotal
                );


            appliedCoupon =
                coupon.code;
        }


        // ==============================================
        // TOTAL DISCOUNT
        // ==============================================

        const totalDiscount =
            Math.min(
                subtotal,
                baseDiscount +
                    couponDiscount
            );


        // ==============================================
        // FINAL TOTAL
        // ==============================================

        const totalPrice =
            subtotal +
            shippingCharge -
            totalDiscount;

        const payableAmount =
            totalPrice;


        // ==============================================
        // CREATE ORDER
        // ==============================================

        const order = await Order.create({
            user: req.user.id,
            products,
            subtotal,
            shippingCharge,

            discount:
                totalDiscount,

            totalPrice,

            payableAmount,

            shippingAddress,
            phone,
            paymentMethod,

            couponCode:
                appliedCoupon || null,
        });


        // ==============================================
        // CLEAR CART
        // ONLY CART CHECKOUT
        // ==============================================

        if (!productId) {

            await Cart.deleteMany({
                user: req.user.id
            });

        }

        // ==============================================
        // INCREMENT COUPON USAGE FOR COD
        // ==============================================

        if (
            appliedCoupon &&
            paymentMethod === "COD"
        ) {

            await Coupon.findOneAndUpdate(
                {
                    code: appliedCoupon,
                },
                {
                    $inc: {
                        usedCount: 1,
                    },
                }
            );

        }


        // ==============================================
        // RESPONSE
        // ==============================================

        return res.status(201).json({

            success: true,

            message: "Order Created Successfully",

            order,

        });


    } catch (error) {

        console.error(
            "Place Order Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// =========================================================
// GET MY ORDERS
// =========================================================

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id,
        })
            .populate("products.product")
            .sort({ createdAt: -1 });

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


// =========================================================
// GET SINGLE ORDER
// =========================================================

const getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate(
                "products.product",
                "name price image"
            )
            .populate(
                "user",
                "name email"
            );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found",
            });
        }

        res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =========================================================
// GET ALL ORDERS - ADMIN
// =========================================================

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate(
                "products.product",
                "name price image"
            )
            .sort({ createdAt: -1 });

        res.json({
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


// =========================================================
// UPDATE ORDER STATUS - ADMIN
// =========================================================

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

        res.json({
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


module.exports = {
    placeOrder,
    getMyOrders,
    getSingleOrder,
    getAllOrders,
    updateOrderStatus,
};
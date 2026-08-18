const Order = require("../models/Order");
const Coupon = require("../models/Coupon");
const Razorpay = require("../config/razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");


// =========================================================
// CREATE RAZORPAY ORDER
// =========================================================

const createPaymentOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        // =============================================
        // VALIDATE ORDER ID
        // =============================================

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "Order ID is required",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Order ID",
            });
        }

        // =============================================
        // FIND USER ORDER
        // =============================================

        const order = await Order.findOne({
            _id: orderId,
            user: req.user.id,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (order.isPaid) {
            return res.status(400).json({
                success: false,
                message: "Payment already verified",
            });
        }

        // =============================================
        // RAZORPAY OPTIONS
        // =============================================

        const options = {
            amount: Math.round(order.payableAmount * 100),
            currency: "INR",
            receipt: `receipt_${order._id}`,
        };

        // =============================================
        // CREATE RAZORPAY ORDER
        // =============================================

        const razorpayOrder =
            await Razorpay.orders.create(options);

        // =============================================
        // SAVE RAZORPAY ORDER ID
        // =============================================

        order.razorpayOrderId = razorpayOrder.id;

        await order.save();

        // =============================================
        // RESPONSE
        // =============================================

        return res.status(200).json({
            success: true,
            order: razorpayOrder,
        });

    } catch (error) {

        console.error(
            "Create Payment Order Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =========================================================
// VERIFY RAZORPAY PAYMENT
// =========================================================

const verifyPayment = async (req, res) => {
    try {

        const {
            orderId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        // =============================================
        // BASIC VALIDATION
        // =============================================

        if (
            !orderId ||
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment verification data is incomplete",
            });
        }

        // =============================================
        // VALIDATE MONGODB ORDER ID
        // =============================================

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Order ID",
            });
        }

        // =============================================
        // FIND USER ORDER
        // =============================================

        const order = await Order.findOne({
            _id: orderId,
            user: req.user.id,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // =============================================
        // CHECK RAZORPAY ORDER ID
        // =============================================

        if (
            order.razorpayOrderId &&
            order.razorpayOrderId !== razorpay_order_id
        ) {
            return res.status(400).json({
                success: false,
                message: "Razorpay Order ID mismatch",
            });
        }

        // =============================================
        // GENERATE SIGNATURE
        // =============================================

        const sign =
            razorpay_order_id +
            "|" +
            razorpay_payment_id;

        const expectedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(sign)
                .digest("hex");

        // =============================================
        // VERIFY SIGNATURE
        // =============================================

        if (
            expectedSignature !==
            razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid Payment Signature",
            });
        }

        // =============================================
        // PAYMENT SUCCESS
        // =============================================

        order.isPaid = true;

        order.paymentId =
            razorpay_payment_id;

        order.paidAt = new Date();

        order.orderStatus = "Processing";

        await order.save();


        // =============================================
        // INCREMENT COUPON USAGE
        // ONLY AFTER SUCCESSFUL PAYMENT
        // =============================================

        if (order.couponCode) {

            await Coupon.findOneAndUpdate(
                {
                    code: order.couponCode,
                },
                {
                    $inc: {
                        usedCount: 1,
                    },
                }
            );

        }

        // =============================================
        // RESPONSE
        // =============================================

        return res.status(200).json({
            success: true,
            message: "Payment Verified Successfully",
            order,
        });

    } catch (error) {

        console.error(
            "Verify Payment Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    createPaymentOrder,
    verifyPayment,
};
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                },
            },
        ],

        
        subtotal: {
            type: Number,
            required: true,
        },

        // Shipping charge
        shippingCharge: {
            type: Number,
            required: true,
            default: 0,
        },

        // Discount applied
        discount: {
            type: Number,
            required: true,
            default: 0,
        },

        couponCode: {
            type: String,
            default: null,
            trim: true,
            uppercase: true,
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        // Final amount payable by customer
        payableAmount: {
            type: Number,
            required: true,
        },

        shippingAddress: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: ["COD", "UPI", "Card"],
            default: "COD",
        },

        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
            ],
            default: "Pending",
        },

        // Payment status
        isPaid: {
            type: Boolean,
            default: false,
        },

        // Payment Information
        razorpayOrderId: {
            type: String,
            default: "",
        },

        paymentId: {
            type: String,
            default: "",
        },

        paidAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

module.exports =
    mongoose.models.Order ||
    mongoose.model("Order", orderSchema);
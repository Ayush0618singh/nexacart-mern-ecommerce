const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },

        discountType: {
            type: String,
            enum: ["percentage", "fixed"],
            required: true,
        },

        discountValue: {
            type: Number,
            required: true,
            min: 0,
        },

        minOrderAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        usageLimit: {
            type: Number,
            default: 0, // 0 = unlimited
            min: 0,
        },

        usedCount: {
            type: Number,
            default: 0,
            min: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Coupon",
    couponSchema
);
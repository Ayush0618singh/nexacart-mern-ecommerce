const Coupon = require("../models/Coupon");

// =====================================================
// GET ALL COUPONS - ADMIN
// =====================================================

const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: coupons.length,
            coupons,
        });

    } catch (error) {
        console.error(
            "Get Coupons Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =====================================================
// CREATE COUPON - ADMIN
// =====================================================

const createCoupon = async (req, res) => {
    try {
        const {
            code,
            discountType,
            discountValue,
            minOrderAmount,
            expiresAt,
            usageLimit,
        } = req.body;

        const normalizedCode = String(code || "")
            .trim()
            .toUpperCase();

        if (!normalizedCode) {
            return res.status(400).json({
                success: false,
                message: "Coupon code is required",
            });
        }

        if (
            !["percentage", "fixed"].includes(
                discountType
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid discount type",
            });
        }

        const value = Number(discountValue);

        if (!Number.isFinite(value) || value <= 0) {
            return res.status(400).json({
                success: false,
                message: "Discount value must be greater than 0",
            });
        }

        if (
            discountType === "percentage" &&
            value > 100
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Percentage discount cannot exceed 100%",
            });
        }

        const expiryDate = new Date(expiresAt);

        if (
            Number.isNaN(expiryDate.getTime()) ||
            expiryDate <= new Date()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Expiry date must be in the future",
            });
        }

        const existingCoupon =
            await Coupon.findOne({
                code: normalizedCode,
            });

        if (existingCoupon) {
            return res.status(400).json({
                success: false,
                message:
                    "Coupon code already exists",
            });
        }

        const coupon = await Coupon.create({
            code: normalizedCode,
            discountType,
            discountValue: value,
            minOrderAmount: Number(
                minOrderAmount || 0
            ),
            expiresAt: expiryDate,
            usageLimit: Number(
                usageLimit || 0
            ),
        });

        return res.status(201).json({
            success: true,
            message:
                "Coupon created successfully",
            coupon,
        });

    } catch (error) {
        console.error(
            "Create Coupon Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =====================================================
// UPDATE COUPON - ADMIN
// =====================================================

const updateCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findById(
            req.params.id
        );

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found",
            });
        }

        const {
            discountType,
            discountValue,
            minOrderAmount,
            expiresAt,
            usageLimit,
            isActive,
        } = req.body;

        if (discountType !== undefined) {
            if (
                !["percentage", "fixed"].includes(
                    discountType
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid discount type",
                });
            }

            coupon.discountType = discountType;
        }

        if (discountValue !== undefined) {
            const value = Number(discountValue);

            if (!Number.isFinite(value) || value <= 0) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid discount value",
                });
            }

            if (
                coupon.discountType === "percentage" &&
                value > 100
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Percentage discount cannot exceed 100%",
                });
            }

            coupon.discountValue = value;
        }

        if (minOrderAmount !== undefined) {
            coupon.minOrderAmount = Math.max(
                0,
                Number(minOrderAmount)
            );
        }

        if (expiresAt !== undefined) {
            const date = new Date(expiresAt);

            if (Number.isNaN(date.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid expiry date",
                });
            }

            coupon.expiresAt = date;
        }

        if (usageLimit !== undefined) {
            coupon.usageLimit = Math.max(
                0,
                Number(usageLimit)
            );
        }

        if (isActive !== undefined) {
            coupon.isActive =
                Boolean(isActive);
        }

        await coupon.save();

        return res.status(200).json({
            success: true,
            message:
                "Coupon updated successfully",
            coupon,
        });

    } catch (error) {
        console.error(
            "Update Coupon Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =====================================================
// DELETE COUPON - ADMIN
// =====================================================

const deleteCoupon = async (req, res) => {
    try {
        const coupon =
            await Coupon.findByIdAndDelete(
                req.params.id
            );

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Coupon deleted successfully",
        });

    } catch (error) {
        console.error(
            "Delete Coupon Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =====================================================
// VALIDATE COUPON - CUSTOMER
// =====================================================

const validateCoupon = async (req, res) => {
    try {
        const {
            code,
            subtotal,
        } = req.body;

        const normalizedCode = String(code || "")
            .trim()
            .toUpperCase();

        const amount = Number(subtotal);

        if (!normalizedCode) {
            return res.status(400).json({
                success: false,
                message:
                    "Coupon code is required",
            });
        }

        if (!Number.isFinite(amount) || amount < 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid subtotal",
            });
        }

        const coupon = await Coupon.findOne({
            code: normalizedCode,
            isActive: true,
        });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message:
                    "Invalid or inactive coupon",
            });
        }

        if (
            new Date(coupon.expiresAt) <=
            new Date()
        ) {
            return res.status(400).json({
                success: false,
                message: "Coupon has expired",
            });
        }

        if (
            coupon.usageLimit > 0 &&
            coupon.usedCount >= coupon.usageLimit
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Coupon usage limit reached",
            });
        }

        if (
            amount <
            coupon.minOrderAmount
        ) {
            return res.status(400).json({
                success: false,
                message:
                    `Minimum order value is ₹${coupon.minOrderAmount}`,
            });
        }

        let discount = 0;

        if (
            coupon.discountType ===
            "percentage"
        ) {
            discount =
                (amount *
                    coupon.discountValue) /
                100;
        } else {
            discount =
                coupon.discountValue;
        }

        discount = Math.min(
            discount,
            amount
        );

        return res.status(200).json({
            success: true,
            message:
                "Coupon applied successfully",
            coupon: {
                _id: coupon._id,
                code: coupon.code,
                discountType:
                    coupon.discountType,
                discountValue:
                    coupon.discountValue,
            },
            discount,
        });

    } catch (error) {
        console.error(
            "Validate Coupon Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    getAllCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    validateCoupon,
};
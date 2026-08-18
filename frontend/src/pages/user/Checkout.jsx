import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    Link,
    useNavigate,
    useLocation,

} from "react-router-dom";

import { getCartItems } from "../../services/cartService";
import { validateCoupon } from "../../services/couponService";

import {
    placeOrder,
    createPaymentOrder,
    verifyPayment,
} from "../../services/orderService";

import {
    FaArrowRight,
    FaBoxOpen,
    FaCheckCircle,
    FaCreditCard,
    FaGlobe,
    FaHeadset,
    FaLock,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaPhone,
    FaShieldAlt,
    FaTruck,
    FaUser,
} from "react-icons/fa";

import "../../styles/checkout.css";

// =====================================================
// LOAD RAZORPAY SCRIPT
// =====================================================

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const existingScript = document.querySelector(
            'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        );

        if (existingScript) {
            resolve(true);
            return;
        }

        const script = document.createElement("script");

        script.src =
            "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => resolve(true);

        script.onerror = () => resolve(false);

        document.body.appendChild(script);
    });
};

// =====================================================
// CHECKOUT COMPONENT
// =====================================================

function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();

    // =================================================
    // BUY NOW DATA
    // =================================================

    const buyNowProduct = location.state?.product;
    const buyNowQuantity = location.state?.quantity || 1;

    const isBuyNow = !!buyNowProduct;

    // =================================================
    // FORM STATE
    // =================================================

    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        phone: "",
        city: "",
        state: "",
        pincode: "",
        paymentMethod: "COD",
    });

    // =================================================
    // CHECKOUT STATE
    // =================================================

    const [cartItems, setCartItems] = useState([]);

    const [subtotal, setSubtotal] = useState(0);

    const [placingOrder, setPlacingOrder] = useState(false);

    const [couponCode, setCouponCode] = useState("");

    const [appliedCoupon, setAppliedCoupon] =
        useState(null);

    const [couponDiscount, setCouponDiscount] =
        useState(0);

    const [couponLoading, setCouponLoading] =
        useState(false);

    // =================================================
    // PRICE CALCULATION
    // =================================================

    const shippingCharge =
    subtotal >= 1000 ? 0 : 99;

    // Existing NexaCart discount
    const baseDiscount =
        subtotal >= 5000 ? 500 : 0;


    // Coupon + existing discount
    const totalDiscount =
        Math.min(
            subtotal,
            baseDiscount +
                couponDiscount
        );


    // Final payable amount
    const finalTotal =
        Math.max(
            0,
            subtotal +
                shippingCharge -
                totalDiscount
        );

    // =================================================
    // FETCH CART
    // =================================================

    const fetchCart = async () => {
        try {
            // =========================================
            // BUY NOW
            // =========================================

            if (isBuyNow) {
                const singleItem = {
                    _id: buyNowProduct._id,
                    product: buyNowProduct,
                    quantity: buyNowQuantity,
                };

                setCartItems([singleItem]);

                setSubtotal(
                    buyNowProduct.price * buyNowQuantity
                );

                return;
            }

            // =========================================
            // NORMAL CART CHECKOUT
            // =========================================

            const { data } = await getCartItems();

            setCartItems(data.cart);

            const total = data.cart.reduce(
                (sum, item) => {
                    return (
                        sum +
                        item.product.price *
                            item.quantity
                    );
                },
                0
            );

            setSubtotal(total);
        } catch (error) {
            console.error(
                "Checkout Cart Error:",
                error
            );

            toast.error(
                "Unable to load cart"
            );
        }
    };

    // =================================================
    // HANDLE INPUT CHANGE
    // =================================================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // =================================================
    // APPLY COUPON
    // =================================================

    const handleApplyCoupon = async () => {

        const code =
            couponCode.trim();

        if (!code) {
            toast.error(
                "Enter a coupon code"
            );

            return;
        }


        if (subtotal <= 0) {
            toast.error(
                "Invalid order amount"
            );

            return;
        }


        try {

            setCouponLoading(true);


            const { data } =
                await validateCoupon({
                    code,
                    subtotal,
                });


            setAppliedCoupon(
                data.coupon
            );

            setCouponDiscount(
                Number(
                    data.discount || 0
                )
            );


            toast.success(
                data.message
            );

        } catch (error) {

            setAppliedCoupon(null);

            setCouponDiscount(0);

            toast.error(
                error.response?.data?.message ||
                "Unable to apply coupon"
            );

        } finally {

            setCouponLoading(false);

        }
    };

    // =================================================
    // PLACE ORDER
    // =================================================

    const handlePlaceOrder = async () => {
        // =============================================
        // VALIDATION
        // =============================================

        if (
            !formData.fullName.trim() ||
            !formData.address.trim() ||
            !formData.phone.trim() ||
            !formData.city.trim() ||
            !formData.state.trim() ||
            !formData.pincode.trim()
        ) {
            toast.error(
                "Please Fill All Fields"
            );

            return;
        }

        // =============================================
        // PHONE VALIDATION
        // =============================================

        if (!/^[0-9]{10}$/.test(formData.phone)) {
            toast.error(
                "Enter Valid Mobile Number"
            );

            return;
        }

        // =============================================
        // PINCODE VALIDATION
        // =============================================

        if (!/^[0-9]{6}$/.test(formData.pincode)) {
            toast.error(
                "Enter Valid Pincode"
            );

            return;
        }

        try {
            setPlacingOrder(true);

            // =========================================
            // SHIPPING ADDRESS
            // =========================================

            const shippingAddress =
                `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;

            // =========================================
            // CREATE DATABASE ORDER
            // =========================================

            const { data } = await placeOrder({
                shippingAddress,
                phone:
                    formData.phone,

                paymentMethod:
                    formData.paymentMethod,

                couponCode:
                    appliedCoupon?.code || "",

                ...(isBuyNow && {
                    productId:
                        buyNowProduct._id,

                    quantity:
                        buyNowQuantity,
                }),
            });

            const createdOrder = data.order;

            // =========================================
            // COD PAYMENT
            // =========================================

            if (
                formData.paymentMethod === "COD"
            ) {
                toast.success(
                    "Order Placed Successfully"
                );

                navigate("/orders");

                return;
            }

            // =========================================
            // ONLINE PAYMENT
            // =========================================

            if (
                formData.paymentMethod === "UPI"
            ) {
                // =====================================
                // LOAD RAZORPAY
                // =====================================

                const razorpayLoaded =
                    await loadRazorpayScript();

                if (!razorpayLoaded) {
                    toast.error(
                        "Razorpay failed to load. Please refresh the page."
                    );

                    setPlacingOrder(false);

                    return;
                }

                // =====================================
                // CREATE RAZORPAY ORDER
                // =====================================

                const paymentResponse =
                await createPaymentOrder({
                    orderId: createdOrder._id,
                });

                const razorpayOrder =
                    paymentResponse.data.order;

                // =====================================
                // RAZORPAY OPTIONS
                // =====================================

                const options = {
                    key:
                        import.meta.env
                            .VITE_RAZORPAY_KEY_ID,

                    amount:
                        razorpayOrder.amount,

                    currency:
                        razorpayOrder.currency,

                    name: "NexaCart",

                    description:
                        "Secure Online Payment",

                    order_id:
                        razorpayOrder.id,

                    // =================================
                    // PAYMENT SUCCESS
                    // =================================

                    handler: async function (
                        response
                    ) {
                        try {
                            const verifyResponse =
                                await verifyPayment({
                                    orderId:
                                        createdOrder._id,

                                    razorpay_order_id:
                                        response.razorpay_order_id,

                                    razorpay_payment_id:
                                        response.razorpay_payment_id,

                                    razorpay_signature:
                                        response.razorpay_signature,
                                });

                            if (
                                verifyResponse.data
                                    .success
                            ) {
                                toast.success(
                                    "Payment Successful!"
                                );

                                navigate(
                                    "/orders"
                                );
                            }
                        } catch (error) {
                            console.error(
                                "Payment Verification Error:",
                                error
                            );

                            toast.error(
                                error.response?.data
                                    ?.message ||
                                    "Payment Verification Failed"
                            );

                            setPlacingOrder(
                                false
                            );
                        }
                    },

                    // =================================
                    // CUSTOMER DETAILS
                    // =================================

                    prefill: {
                        name:
                            formData.fullName,

                        contact:
                            formData.phone,
                    },

                    // =================================
                    // RAZORPAY THEME
                    // =================================

                    theme: {
                        color: "#111827",
                    },

                    // =================================
                    // PAYMENT MODAL CLOSE
                    // =================================

                    modal: {
                        ondismiss: () => {
                            setPlacingOrder(
                                false
                            );

                            toast.info(
                                "Payment cancelled. Your order is still pending."
                            );
                        },
                    },
                };

                // =====================================
                // CREATE RAZORPAY INSTANCE
                // =====================================

                const razorpay =
                    new window.Razorpay(
                        options
                    );

                // =====================================
                // PAYMENT FAILED
                // =====================================

                razorpay.on(
                    "payment.failed",
                    function (response) {
                        console.error(
                            "Payment Failed:",
                            response.error
                        );

                        toast.error(
                            response.error
                                ?.description ||
                                "Payment failed. Please try again."
                        );

                        setPlacingOrder(
                            false
                        );
                    }
                );

                // =====================================
                // OPEN RAZORPAY
                // =====================================

                razorpay.open();

                return;
            }
        } catch (error) {
            console.error(
                "Order / Payment Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                    "Unable To Place Order"
            );

            setPlacingOrder(false);
        }
    };

    // =================================================
    // FETCH DATA ON PAGE LOAD
    // =================================================

    useEffect(() => {
        fetchCart();
    }, [
        isBuyNow,
        buyNowProduct,
        buyNowQuantity,
    ]);

    // =================================================
    // UI
    // =================================================

       // =================================================
    // UI
    // =================================================

    return (

        <div className="checkout-page">

            <div className="checkout-container">


                {/* =================================================
                    CHECKOUT HEADER
                ================================================= */}

                <section className="checkout-header">

                    <div>

                        <span className="checkout-kicker">
                            NEXACART SECURE CHECKOUT
                        </span>

                        <h1>
                            <span>
                                Checkout
                            </span>
                        </h1>

                        <p>
                            Complete your order securely and
                            review all details before placing it.
                        </p>

                    </div>

                </section>


                {/* =================================================
                    MAIN CHECKOUT LAYOUT
                ================================================= */}

                <div className="checkout-layout">


                    {/* =================================================
                        LEFT COLUMN
                    ================================================= */}

                    <div className="checkout-left-column">


                        {/* =================================================
                            INFORMATION & PAYMENT
                        ================================================= */}

                        <section className="checkout-card">

                            <div className="checkout-card-header">

                                <div>

                                    <span>
                                        DELIVERY INFORMATION
                                    </span>

                                    <h2>
                                        Information & Payment
                                    </h2>

                                    <p>
                                        Enter your details exactly as
                                        they should appear on your order.
                                    </p>

                                </div>

                                <div className="checkout-card-icon">
                                    <FaMapMarkerAlt />
                                </div>

                            </div>


                            <form
                                className="checkout-form"
                                onSubmit={(e) =>
                                    e.preventDefault()
                                }
                            >


                                {/* FULL NAME */}

                                <div className="checkout-field checkout-field-full">

                                    <label htmlFor="fullName">
                                        Full Name
                                    </label>

                                    <div className="checkout-input-wrap">

                                        <FaUser />

                                        <input
                                            id="fullName"
                                            type="text"
                                            name="fullName"
                                            placeholder="Enter your full name"
                                            value={
                                                formData.fullName
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            autoComplete="name"
                                        />

                                    </div>

                                </div>


                                {/* ADDRESS */}

                                <div className="checkout-field checkout-field-full">

                                    <label htmlFor="address">
                                        Delivery Address
                                    </label>

                                    <div className="checkout-input-wrap checkout-textarea-wrap">

                                        <FaMapMarkerAlt />

                                        <textarea
                                            id="address"
                                            name="address"
                                            rows="3"
                                            placeholder="Enter your complete delivery address"
                                            value={
                                                formData.address
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            autoComplete="street-address"
                                        />

                                    </div>

                                </div>


                                {/* PHONE + STATE */}

                                <div className="checkout-form-grid">

                                    <div className="checkout-field">

                                        <label htmlFor="phone">
                                            Phone Number
                                        </label>

                                        <div className="checkout-input-wrap">

                                            <FaPhone />

                                            <input
                                                id="phone"
                                                type="text"
                                                name="phone"
                                                inputMode="numeric"
                                                maxLength="10"
                                                placeholder="10 digit mobile number"
                                                value={
                                                    formData.phone
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                autoComplete="tel"
                                            />

                                        </div>

                                    </div>


                                    <div className="checkout-field">

                                        <label htmlFor="state">
                                            State
                                        </label>

                                        <div className="checkout-input-wrap">

                                            <FaGlobe />

                                            <input
                                                id="state"
                                                type="text"
                                                name="state"
                                                placeholder="Enter state"
                                                value={
                                                    formData.state
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                autoComplete="address-level1"
                                            />

                                        </div>

                                    </div>

                                </div>


                                {/* CITY + PINCODE */}

                                <div className="checkout-form-grid">

                                    <div className="checkout-field">

                                        <label htmlFor="city">
                                            City
                                        </label>

                                        <div className="checkout-input-wrap">

                                            <FaTruck />

                                            <input
                                                id="city"
                                                type="text"
                                                name="city"
                                                placeholder="Enter city"
                                                value={
                                                    formData.city
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                autoComplete="address-level2"
                                            />

                                        </div>

                                    </div>


                                    <div className="checkout-field">

                                        <label htmlFor="pincode">
                                            Pincode
                                        </label>

                                        <div className="checkout-input-wrap">

                                            <FaMapMarkerAlt />

                                            <input
                                                id="pincode"
                                                type="text"
                                                name="pincode"
                                                inputMode="numeric"
                                                maxLength="6"
                                                placeholder="6 digit pincode"
                                                value={
                                                    formData.pincode
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                autoComplete="postal-code"
                                            />

                                        </div>

                                    </div>

                                </div>

                            </form>

                        </section>


                        {/* =================================================
                            PAYMENT METHOD
                        ================================================= */}

                        <section className="checkout-card payment-card">

                            <div className="checkout-card-header">

                                <div>

                                    <span>
                                        PAYMENT
                                    </span>

                                    <h2>
                                        Choose Payment Method
                                    </h2>

                                    <p>
                                        Select the payment option
                                        that works best for you.
                                    </p>

                                </div>

                                <div className="checkout-card-icon">
                                    <FaCreditCard />
                                </div>

                            </div>


                            <div className="payment-options">


                                {/* COD */}

                                <label
                                    htmlFor="codPayment"
                                    className={`payment-option ${
                                        formData.paymentMethod ===
                                        "COD"
                                            ? "payment-option-active"
                                            : ""
                                    }`}
                                >

                                    <input
                                        id="codPayment"
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        checked={
                                            formData.paymentMethod ===
                                            "COD"
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />


                                    <div className="payment-option-check">
                                        <FaCheckCircle />
                                    </div>


                                    <div className="payment-option-content">

                                        <strong>
                                            Cash On Delivery
                                        </strong>

                                        <span>
                                            Pay when your order
                                            is delivered.
                                        </span>

                                    </div>


                                    <div className="payment-option-icon">
                                        <FaMoneyBillWave />
                                    </div>

                                </label>


                                {/* ONLINE */}

                                <label
                                    htmlFor="onlinePayment"
                                    className={`payment-option ${
                                        formData.paymentMethod ===
                                        "UPI"
                                            ? "payment-option-active"
                                            : ""
                                    }`}
                                >

                                    <input
                                        id="onlinePayment"
                                        type="radio"
                                        name="paymentMethod"
                                        value="UPI"
                                        checked={
                                            formData.paymentMethod ===
                                            "UPI"
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />


                                    <div className="payment-option-check">
                                        <FaCheckCircle />
                                    </div>


                                    <div className="payment-option-content">

                                        <strong>
                                            Online Payment
                                        </strong>

                                        <span>
                                            UPI, Cards, Net Banking
                                            & more via Razorpay.
                                        </span>

                                    </div>


                                    <div className="payment-provider-badge">
                                        Razorpay
                                    </div>

                                </label>

                            </div>


                            <div className="payment-security-note">

                                <FaShieldAlt />

                                <span>
                                    Your payment is processed through
                                    a secure checkout flow. Never share
                                    your OTP or payment PIN with anyone.
                                </span>

                            </div>

                        </section>


                    </div>


                    {/* =================================================
                        RIGHT COLUMN — SUMMARY
                    ================================================= */}

                    <aside className="checkout-right-column">

                        <section className="checkout-summary-card">

                            <div className="checkout-summary-heading">

                                <div>

                                    <span>
                                        YOUR ORDER
                                    </span>

                                    <h2>
                                        Order Summary
                                    </h2>

                                </div>

                                <div className="summary-lock-icon">
                                    <FaShieldAlt />
                                </div>

                            </div>


                            {/* PRODUCTS */}

                            <div className="checkout-products">

                                {cartItems.length > 0 ? (

                                    cartItems.map(
                                        (item) => {

                                            const product =
                                                item.product;

                                            return (

                                                <div
                                                    key={
                                                        item._id
                                                    }
                                                    className="checkout-product-row"
                                                >

                                                    <div className="checkout-product-image">

                                                        <img
                                                            src={
                                                                product
                                                                    ?.images?.[0] ||
                                                                "https://placehold.co/90x90?text=NexaCart"
                                                            }
                                                            alt={
                                                                product?.name ||
                                                                "Product"
                                                            }
                                                        />

                                                    </div>


                                                    <div className="checkout-product-info">

                                                        <strong>
                                                            {
                                                                product?.name
                                                            }
                                                        </strong>

                                                        <span>
                                                            Qty:{" "}
                                                            {
                                                                item.quantity
                                                            }
                                                        </span>

                                                        <small>
                                                            ₹{" "}
                                                            {(
                                                                product.price *
                                                                item.quantity
                                                            ).toLocaleString(
                                                                "en-IN"
                                                            )}
                                                        </small>

                                                    </div>

                                                </div>

                                            );
                                        }
                                    )

                                ) : (

                                    <div className="checkout-empty-order">
                                        No products in your order.
                                    </div>

                                )}

                            </div>


                            {/* =================================================
                                COUPON
                            ================================================= */}

                            <div className="checkout-coupon-box">

                                <div className="checkout-coupon-title">
                                    Have a coupon?
                                </div>


                                <div className="checkout-coupon-form">

                                    <input
                                        type="text"
                                        placeholder="Enter coupon code"
                                        value={couponCode}
                                        onChange={(e) =>
                                            setCouponCode(
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                        onKeyDown={(e) => {

                                            if (e.key === "Enter") {

                                                e.preventDefault();

                                                handleApplyCoupon();

                                            }

                                        }}
                                        disabled={
                                            couponLoading
                                        }
                                    />


                                    <button
                                        type="button"
                                        onClick={
                                            handleApplyCoupon
                                        }
                                        disabled={
                                            couponLoading
                                        }
                                    >
                                        {couponLoading
                                            ? "Applying..."
                                            : "Apply"
                                        }
                                    </button>

                                </div>


                                {appliedCoupon && (

                                    <div className="checkout-coupon-success">

                                        <FaCheckCircle />

                                        <span>

                                            {appliedCoupon.code}
                                            {" "}applied — you saved ₹
                                            {couponDiscount.toLocaleString(
                                                "en-IN"
                                            )}

                                        </span>

                                    </div>

                                )}

                            </div>


                            <div className="checkout-summary-divider" />


                            {/* SUBTOTAL */}

                            <div className="checkout-summary-line">

                                <span>
                                    Subtotal
                                </span>

                                <strong>
                                    ₹{" "}
                                    {subtotal.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                            </div>


                            {/* SHIPPING */}

                            <div className="checkout-summary-line">

                                <span>
                                    Shipping
                                </span>

                                <strong
                                    className={
                                        shippingCharge === 0
                                            ? "summary-free"
                                            : ""
                                    }
                                >
                                    {shippingCharge === 0
                                        ? "FREE"
                                        : `₹ ${shippingCharge.toLocaleString(
                                              "en-IN"
                                          )}`}
                                </strong>

                            </div>


                            {/* DISCOUNT */}

                            <div className="checkout-summary-line">
                                <span>
                                    Discount
                                </span>

                                <strong className="summary-discount">

                                    - ₹{" "}
                                    {totalDiscount.toLocaleString(
                                        "en-IN"
                                    )}

                                </strong>

                            </div>


                            <div className="checkout-summary-divider" />


                            {/* TOTAL */}

                            <div className="checkout-total-row">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    ₹{" "}
                                    {finalTotal.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                            </div>


                            {/* SAVINGS */}

                            {totalDiscount > 0 && (
                                <div className="checkout-savings">

                                    <FaCheckCircle />

                                    <span>
                                        Congratulations! You saved ₹{" "}
                                        {totalDiscount.toLocaleString("en-IN")}
                    
                                    </span>

                                </div>

                            )}


                            {/* PLACE ORDER */}

                            <button
                                type="button"
                                className="checkout-place-order"
                                onClick={
                                    handlePlaceOrder
                                }
                                disabled={
                                    placingOrder
                                }
                            >

                                <span>

                                    {placingOrder
                                        ? "Processing..."
                                        : formData.paymentMethod ===
                                          "COD"
                                        ? "Place Order"
                                        : `Pay ₹ ${finalTotal.toLocaleString(
                                              "en-IN"
                                          )}`}

                                </span>

                                {!placingOrder && (
                                    <FaArrowRight />
                                )}

                            </button>


                            {/* SECURITY */}

                            <div className="checkout-summary-security">

                                <FaLock />

                                <div>

                                    <strong>
                                        Secure Checkout
                                    </strong>

                                    <span>
                                        Your personal and payment
                                        information is protected.
                                    </span>

                                </div>

                            </div>


                            {/* TRUST ROW */}

                            <div className="checkout-summary-trust">
                                <Link
                                    to="/payment-security"
                                    className="checkout-summary-trust-link"
                                >
                                    <FaShieldAlt />

                                    <span>
                                        Secure Checkout
                                    </span>
                                </Link>


                                <Link
                                    to="/shipping-policy"
                                    className="checkout-summary-trust-link"
                                >
                                    <FaTruck />

                                    <span>
                                        Reliable Delivery
                                    </span>
                                </Link>


                                <div className="checkout-summary-trust-item">
                                    <FaCheckCircle />

                                    <span>
                                        Order Protection
                                    </span>
                                </div>

                            </div>

                        </section>

                    </aside>

                </div>


                {/* =================================================
                    BOTTOM TRUST STRIP
                ================================================= */}
                <section className="checkout-bottom-trust">
                    <Link
                        to="/payment-security"
                        className="checkout-bottom-trust-link"
                    >
                        <FaShieldAlt />

                        <div>

                            <strong>
                                Secure Payment
                            </strong>

                            <span>
                                Protected payment processing.
                            </span>

                        </div>

                        <FaArrowRight className="checkout-trust-arrow" />
                    </Link>


                    <Link
                        to="/shipping-policy"
                        className="checkout-bottom-trust-link"
                    >
                        <FaTruck />

                        <div>

                            <strong>
                                Reliable Delivery
                            </strong>

                            <span>
                                Clear order and delivery updates.
                            </span>

                        </div>

                        <FaArrowRight className="checkout-trust-arrow" />
                    </Link>


                    <Link
                        to="/contact-support"
                        className="checkout-bottom-trust-link"
                    >
                        <FaHeadset />

                        <div>

                            <strong>
                                Customer Support
                            </strong>

                            <span>
                                We're here when you need assistance.
                            </span>

                        </div>

                        <FaArrowRight className="checkout-trust-arrow" />
                    </Link>

                </section>

               


                {/* =================================================
                    FOOTER LINE
                ================================================= */}

                <div className="checkout-footer-line">

                    <span>
                        © 2026 NexaCart Premium
                    </span>

                    <span>
                        Secure Checkout • Quality Products • Better Shopping
                    </span>

                </div>

            </div>

        </div>
    );
}
export default Checkout;
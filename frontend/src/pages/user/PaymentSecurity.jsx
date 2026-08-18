import React from "react";
import { Link } from "react-router-dom";

import {
    FaArrowLeft,
    FaCheckCircle,
    FaCreditCard,
    FaLock,
    FaQuestionCircle,
    FaShieldAlt,
    FaWallet,
} from "react-icons/fa";

import "../../styles/help.css";


function PaymentSecurity() {

    const paymentMethods = [
        {
            title: "Razorpay",
            description:
                "Use the configured online payment flow available during checkout.",
            icon: <FaCreditCard />,
        },
        {
            title: "UPI",
            description:
                "Complete supported online payments using your preferred UPI method.",
            icon: <FaWallet />,
        },
        {
            title: "Cash on Delivery",
            description:
                "Choose COD when it is available for the current order and delivery location.",
            icon: <FaWallet />,
        },
    ];


    const securityPoints = [
        "Never share your password, OTP or payment PIN with anyone.",
        "Always verify the order amount before confirming payment.",
        "After payment, check your order status before attempting another payment.",
        "Use only the official NexaCart checkout flow for online payments.",
    ];


    return (

        <div className="help-page">

            <div className="help-container">


                {/* =================================================
                    HERO
                ================================================= */}

                <section className="policy-hero">

                    <Link
                        to="/help"
                        className="faq-back-link"
                    >
                        <FaArrowLeft />
                        Back to Help Center
                    </Link>


                    <div className="policy-hero-main">

                        <div>

                            <span className="help-kicker">
                                NEXACART PAYMENTS
                            </span>

                            <h1>
                                Payment &
                                <span>
                                    Security
                                </span>
                            </h1>

                            <p>
                                Understand available payment
                                methods, payment verification,
                                failed transactions and safer
                                online shopping practices.
                            </p>

                        </div>


                        <div className="policy-hero-icon">
                            <FaShieldAlt />
                        </div>

                    </div>

                </section>


                {/* =================================================
                    PAYMENT METHODS
                ================================================= */}

                <section className="policy-section">

                    <div className="help-section-heading">

                        <div>

                            <span>
                                PAYMENT METHODS
                            </span>

                            <h2>
                                Choose how you want to pay
                            </h2>

                        </div>

                    </div>


                    <div className="payment-method-grid">

                        {paymentMethods.map(
                            (method) => (

                                <div
                                    className="payment-method-card"
                                    key={method.title}
                                >

                                    <div className="payment-method-icon">
                                        {method.icon}
                                    </div>

                                    <h3>
                                        {method.title}
                                    </h3>

                                    <p>
                                        {method.description}
                                    </p>

                                </div>

                            )
                        )}

                    </div>

                </section>


                {/* =================================================
                    PAYMENT FLOW
                ================================================= */}

                <section className="policy-section">

                    <div className="help-section-heading">

                        <div>

                            <span>
                                PAYMENT FLOW
                            </span>

                            <h2>
                                What happens after checkout?
                            </h2>

                        </div>

                    </div>


                    <div className="shipping-steps">


                        <div className="shipping-step">

                            <div className="shipping-step-number">
                                01
                            </div>

                            <div className="shipping-step-icon">
                                <FaWallet />
                            </div>

                            <h3>
                                Select Payment
                            </h3>

                            <p>
                                Choose an available payment
                                method during checkout.
                            </p>

                        </div>


                        <div className="shipping-step">

                            <div className="shipping-step-number">
                                02
                            </div>

                            <div className="shipping-step-icon">
                                <FaLock />
                            </div>

                            <h3>
                                Complete Payment
                            </h3>

                            <p>
                                Follow the payment provider or
                                COD instructions shown at checkout.
                            </p>

                        </div>


                        <div className="shipping-step">

                            <div className="shipping-step-number">
                                03
                            </div>

                            <div className="shipping-step-icon">
                                <FaCheckCircle />
                            </div>

                            <h3>
                                Payment Verification
                            </h3>

                            <p>
                                Wait for the order and payment
                                status to update before retrying.
                            </p>

                        </div>


                        <div className="shipping-step">

                            <div className="shipping-step-number">
                                04
                            </div>

                            <div className="shipping-step-icon">
                                <FaCreditCard />
                            </div>

                            <h3>
                                Order Confirmation
                            </h3>

                            <p>
                                Once the order is successfully
                                processed, review it in My Orders.
                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    SECURITY + FAILED PAYMENT
                ================================================= */}

                <section className="policy-content-grid">

                    <article className="policy-content-card">

                        <div className="policy-content-card-heading">

                            <FaShieldAlt />

                            <h2>
                                Payment Security
                            </h2>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Protect your credentials
                            </h3>

                            <p>
                                Never share your password, OTP,
                                UPI PIN, card PIN or other confidential
                                authentication information with anyone.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Verify before paying
                            </h3>

                            <p>
                                Check the products, quantity, delivery
                                details and final amount before confirming
                                your payment.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Use official checkout
                            </h3>

                            <p>
                                Complete online payments only through
                                the payment flow presented by the
                                NexaCart checkout experience.
                            </p>

                        </div>

                    </article>


                    <article className="policy-content-card">

                        <div className="policy-content-card-heading">

                            <FaQuestionCircle />

                            <h2>
                                Failed Payment?
                            </h2>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Do not immediately retry
                            </h3>

                            <p>
                                If money was deducted, first check the
                                payment or bank status and then check
                                your NexaCart order status before trying
                                another payment.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Payment deducted but order missing
                            </h3>

                            <p>
                                Keep the transaction reference or other
                                available payment details and contact
                                support so the transaction can be reviewed.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Need assistance?
                            </h3>

                            <p>
                                Share the relevant order or transaction
                                information with support. Never send your
                                password, OTP or PIN.
                            </p>

                            <Link
                                to="/contact-support"
                                className="help-link-button"
                            >
                                Contact Support
                                <span>→</span>
                            </Link>

                        </div>

                    </article>

                </section>


                {/* =================================================
                    TRUST STRIP
                ================================================= */}

                <section className="payment-security-strip">

                    <div>

                        <FaLock />

                        <span>
                            Protected Checkout
                        </span>

                    </div>


                    <div>

                        <FaShieldAlt />

                        <span>
                            Security Awareness
                        </span>

                    </div>


                    <div>

                        <FaCheckCircle />

                        <span>
                            Order Verification
                        </span>

                    </div>

                </section>


                {/* =================================================
                    FAQ CTA
                ================================================= */}

                <section className="policy-cta">

                    <div className="policy-cta-icon">
                        <FaQuestionCircle />
                    </div>

                    <div>

                        <span>
                            STILL HAVE QUESTIONS?
                        </span>

                        <h2>
                            Browse payment and checkout FAQs.
                        </h2>

                    </div>

                    <Link
                        to="/faq"
                        className="faq-support-button"
                    >
                        Browse FAQs
                    </Link>

                </section>


                {/* =================================================
                    FOOTER NOTE
                ================================================= */}

                <div className="help-footer-note">

                    <span>
                        © 2026 NexaCart Premium
                    </span>

                    <span>
                        Payments • Security • Checkout
                    </span>

                </div>

            </div>

        </div>
    );
}

export default PaymentSecurity;
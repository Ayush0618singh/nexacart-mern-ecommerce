import React from "react";
import { Link } from "react-router-dom";

import {
    FaArrowLeft,
    FaClock,
    FaMapMarkerAlt,
    FaRoute,
    FaTruck,
    FaBoxOpen,
    FaCheckCircle,
    FaQuestionCircle,
} from "react-icons/fa";

import "../../styles/help.css";


function ShippingPolicy() {

    const shippingSteps = [
        {
            number: "01",
            title: "Order Confirmed",
            description:
                "Your order is received and prepared for processing.",
            icon: <FaCheckCircle />,
        },
        {
            number: "02",
            title: "Packed",
            description:
                "The product is checked and prepared for dispatch.",
            icon: <FaBoxOpen />,
        },
        {
            number: "03",
            title: "Shipped",
            description:
                "The order is handed over for delivery.",
            icon: <FaTruck />,
        },
        {
            number: "04",
            title: "Delivered",
            description:
                "Your order reaches the delivery address provided.",
            icon: <FaMapMarkerAlt />,
        },
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
                                NEXACART DELIVERY
                            </span>

                            <h1>
                                Shipping &
                                <span>
                                    Delivery
                                </span>
                            </h1>

                            <p>
                                Everything you need to know about
                                order processing, delivery timelines,
                                shipping charges and tracking.
                            </p>

                        </div>


                        <div className="policy-hero-icon">
                            <FaTruck />
                        </div>

                    </div>

                </section>


                {/* =================================================
                    QUICK SUMMARY
                ================================================= */}

                <section className="policy-summary-grid">

                    <div className="policy-summary-card">

                        <div className="policy-summary-icon">
                            <FaClock />
                        </div>

                        <span>
                            PROCESSING
                        </span>

                        <h3>
                            Order Preparation
                        </h3>

                        <p>
                            Orders are processed after
                            successful confirmation.
                        </p>

                    </div>


                    <div className="policy-summary-card">

                        <div className="policy-summary-icon">
                            <FaRoute />
                        </div>

                        <span>
                            TRACKING
                        </span>

                        <h3>
                            Order Updates
                        </h3>

                        <p>
                            Check your Orders section for
                            available status and tracking updates.
                        </p>

                    </div>


                    <div className="policy-summary-card">

                        <div className="policy-summary-icon">
                            <FaMapMarkerAlt />
                        </div>

                        <span>
                            ADDRESS
                        </span>

                        <h3>
                            Delivery Location
                        </h3>

                        <p>
                            Make sure your address and contact
                            details are correct before ordering.
                        </p>

                    </div>

                </section>


                {/* =================================================
                    DELIVERY JOURNEY
                ================================================= */}

                <section className="policy-section">

                    <div className="help-section-heading">

                        <div>

                            <span>
                                DELIVERY JOURNEY
                            </span>

                            <h2>
                                How your order moves
                            </h2>

                        </div>

                    </div>


                    <div className="shipping-steps">

                        {shippingSteps.map(
                            (step) => (

                                <div
                                    className="shipping-step"
                                    key={step.number}
                                >

                                    <div className="shipping-step-number">
                                        {step.number}
                                    </div>

                                    <div className="shipping-step-icon">
                                        {step.icon}
                                    </div>

                                    <h3>
                                        {step.title}
                                    </h3>

                                    <p>
                                        {step.description}
                                    </p>

                                </div>

                            )
                        )}

                    </div>

                </section>


                {/* =================================================
                    IMPORTANT INFORMATION
                ================================================= */}

                <section className="policy-content-grid">


                    <article className="policy-content-card">

                        <div className="policy-content-card-heading">

                            <FaTruck />

                            <h2>
                                Delivery Information
                            </h2>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Delivery timelines
                            </h3>

                            <p>
                                Estimated delivery information is
                                shown where available during the
                                shopping and checkout process.
                                Actual delivery time can vary based
                                on product availability, destination
                                and logistics processing.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Shipping charges
                            </h3>

                            <p>
                                Any applicable delivery or shipping
                                charge is shown during checkout before
                                the order is placed. When free delivery
                                applies, it will be displayed there.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Delivery delays
                            </h3>

                            <p>
                                Delivery can occasionally take longer
                                because of weather, logistics issues,
                                high order volume or other circumstances.
                            </p>

                        </div>

                    </article>


                    <article className="policy-content-card">

                        <div className="policy-content-card-heading">

                            <FaMapMarkerAlt />

                            <h2>
                                Address & Tracking
                            </h2>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Check your address
                            </h3>

                            <p>
                                Please verify your delivery address,
                                mobile number and other contact details
                                before placing your order.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Tracking your order
                            </h3>

                            <p>
                                Open My Orders to check the latest
                                available order status. Tracking
                                information will appear when it becomes
                                available for the shipment.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Need help?
                            </h3>

                            <p>
                                If you cannot find the information you
                                need, contact NexaCart support with your
                                order details.
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
                    FAQ CTA
                ================================================= */}

                <section className="policy-cta">

                    <div className="policy-cta-icon">
                        <FaQuestionCircle />
                    </div>

                    <div>

                        <span>
                            HAVE MORE QUESTIONS?
                        </span>

                        <h2>
                            Check our frequently asked questions.
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
                        Shipping • Tracking • Delivery
                    </span>

                </div>

            </div>

        </div>
    );
}

export default ShippingPolicy;
import React from "react";
import { Link } from "react-router-dom";

import {
    FaArrowLeft,
    FaBalanceScale,
    FaCheckCircle,
    FaFileContract,
    FaLock,
    FaShoppingBag,
    FaUserCheck,
} from "react-icons/fa";

import "../../styles/help.css";


function Terms() {

    const sections = [
        {
            title: "Account Responsibilities",
            text:
                "You are responsible for keeping your account credentials confidential and for providing accurate information when using NexaCart.",
            icon: <FaUserCheck />,
        },
        {
            title: "Orders & Pricing",
            text:
                "Product information, prices, availability and applicable charges are presented during the shopping and checkout process and may change when the service is updated.",
            icon: <FaShoppingBag />,
        },
        {
            title: "Payments",
            text:
                "Available payment methods and the applicable payment flow are shown during checkout. Orders may be subject to payment verification before confirmation.",
            icon: <FaFileContract />,
        },
        {
            title: "Returns & Refunds",
            text:
                "Returns, cancellations and refunds are handled according to the applicable NexaCart return and refund policy for the order.",
            icon: <FaCheckCircle />,
        },
        {
            title: "Acceptable Use",
            text:
                "The website should not be used for unlawful activity, fraud, abuse, interference with the service or attempts to gain unauthorized access.",
            icon: <FaLock />,
        },
        {
            title: "Service Changes",
            text:
                "NexaCart may update features, content, product information or service functionality from time to time to improve the platform.",
            icon: <FaBalanceScale />,
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
                                NEXACART INFORMATION
                            </span>

                            <h1>
                                Terms &
                                <span>
                                    Conditions
                                </span>
                            </h1>

                            <p>
                                These terms describe the basic rules,
                                responsibilities and conditions for
                                using the NexaCart website and services.
                            </p>

                        </div>

                        <div className="policy-hero-icon">
                            <FaFileContract />
                        </div>

                    </div>

                </section>


                {/* =================================================
                    NOTICE
                ================================================= */}

                <section className="terms-notice">

                    <div className="terms-notice-icon">
                        <FaBalanceScale />
                    </div>

                    <div>

                        <strong>
                            Please read before using NexaCart
                        </strong>

                        <p>
                            By using the website, creating an account
                            or placing an order, you agree to follow
                            the applicable terms and policies of the
                            service.
                        </p>

                    </div>

                </section>


                {/* =================================================
                    TERMS GRID
                ================================================= */}

                <section className="terms-grid">

                    {sections.map((section, index) => (

                        <article
                            className="terms-card"
                            key={section.title}
                        >

                            <div className="terms-card-number">
                                {String(index + 1).padStart(2, "0")}
                            </div>

                            <div className="terms-card-icon">
                                {section.icon}
                            </div>

                            <h2>
                                {section.title}
                            </h2>

                            <p>
                                {section.text}
                            </p>

                        </article>

                    ))}

                </section>


                {/* =================================================
                    IMPORTANT
                ================================================= */}

                <section className="policy-content-grid">

                    <article className="policy-content-card">

                        <div className="policy-content-card-heading">

                            <FaShoppingBag />

                            <h2>
                                Orders & Product Information
                            </h2>

                        </div>

                        <div className="policy-content-block">

                            <h3>
                                Product information
                            </h3>

                            <p>
                                Product names, descriptions, prices,
                                stock information and images are intended
                                to help customers make informed purchases.
                            </p>

                        </div>

                        <div className="policy-content-block">

                            <h3>
                                Order confirmation
                            </h3>

                            <p>
                                Placing an order does not remove the need
                                for payment, verification and successful
                                processing before an order is considered
                                confirmed.
                            </p>

                        </div>

                        <div className="policy-content-block">

                            <h3>
                                Availability
                            </h3>

                            <p>
                                Product availability can change and may
                                affect whether an order can be completed.
                            </p>

                        </div>

                    </article>


                    <article className="policy-content-card">

                        <div className="policy-content-card-heading">

                            <FaLock />

                            <h2>
                                Account & Website Use
                            </h2>

                        </div>

                        <div className="policy-content-block">

                            <h3>
                                Account security
                            </h3>

                            <p>
                                Keep your login credentials private and
                                notify support if you believe your account
                                has been accessed without permission.
                            </p>

                        </div>

                        <div className="policy-content-block">

                            <h3>
                                Prohibited activity
                            </h3>

                            <p>
                                Do not use NexaCart to commit fraud,
                                interfere with the service, misuse
                                another user's account or access restricted
                                systems without authorization.
                            </p>

                        </div>

                        <div className="policy-content-block">

                            <h3>
                                Policy relationship
                            </h3>

                            <p>
                                These terms should be read together with
                                the privacy, returns, payment and other
                                policies made available on NexaCart.
                            </p>

                        </div>

                    </article>

                </section>


                {/* =================================================
                    CTA
                ================================================= */}

                <section className="policy-cta">

                    <div className="policy-cta-icon">
                        <FaFileContract />
                    </div>

                    <div>

                        <span>
                            NEED MORE INFORMATION?
                        </span>

                        <h2>
                            Review our policies or contact support.
                        </h2>

                    </div>

                    <Link
                        to="/privacy-policy"
                        className="faq-support-button"
                    >
                        Privacy Policy
                    </Link>

                    <Link
                        to="/contact-support"
                        className="faq-support-button"
                    >
                        Contact Support
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
                        Terms • Policies • Responsible Shopping
                    </span>

                </div>

            </div>

        </div>
    );
}

export default Terms;
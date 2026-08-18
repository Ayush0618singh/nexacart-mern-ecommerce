import React from "react";
import { Link } from "react-router-dom";

import {
    FaArrowLeft,
    FaCheckCircle,
    FaCookieBite,
    FaDatabase,
    FaLock,
    FaShieldAlt,
    FaUserShield,
} from "react-icons/fa";

import "../../styles/help.css";


function PrivacyPolicy() {

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
                                NEXACART PRIVACY
                            </span>

                            <h1>
                                Privacy
                                <span>
                                    Policy
                                </span>
                            </h1>

                            <p>
                                This page explains what information
                                NexaCart may collect, how it may be
                                used and the choices available to users.
                            </p>

                        </div>


                        <div className="policy-hero-icon">
                            <FaUserShield />
                        </div>

                    </div>

                </section>


                {/* =================================================
                    QUICK SUMMARY
                ================================================= */}

                <section className="policy-summary-grid">

                    <div className="policy-summary-card">

                        <div className="policy-summary-icon">
                            <FaDatabase />
                        </div>

                        <span>
                            INFORMATION
                        </span>

                        <h3>
                            Data We Collect
                        </h3>

                        <p>
                            Account, contact, order and other
                            information needed to provide the service.
                        </p>

                    </div>


                    <div className="policy-summary-card">

                        <div className="policy-summary-icon">
                            <FaLock />
                        </div>

                        <span>
                            SECURITY
                        </span>

                        <h3>
                            Protecting Information
                        </h3>

                        <p>
                            We use appropriate technical and
                            organisational safeguards for the service.
                        </p>

                    </div>


                    <div className="policy-summary-card">

                        <div className="policy-summary-icon">
                            <FaCheckCircle />
                        </div>

                        <span>
                            CONTROL
                        </span>

                        <h3>
                            Your Choices
                        </h3>

                        <p>
                            Users can review and update available
                            account information and preferences.
                        </p>

                    </div>

                </section>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <section className="policy-content-grid">


                    {/* COLLECTION */}

                    <article className="policy-content-card">

                        <div className="policy-content-card-heading">

                            <FaDatabase />

                            <h2>
                                Information We May Collect
                            </h2>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Account information
                            </h3>

                            <p>
                                This may include your name, email
                                address, password-related credentials,
                                profile information and other details
                                you choose to provide.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Order information
                            </h3>

                            <p>
                                When you place an order, the service may
                                process information needed to complete
                                the order, including delivery details,
                                products and order status.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Support information
                            </h3>

                            <p>
                                Information you provide through customer
                                support, feedback or contact forms may
                                be used to understand and respond to your
                                request.
                            </p>

                        </div>

                    </article>


                    {/* USAGE */}

                    <article className="policy-content-card">

                        <div className="policy-content-card-heading">

                            <FaShieldAlt />

                            <h2>
                                How Information May Be Used
                            </h2>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Provide the service
                            </h3>

                            <p>
                                Information may be used to authenticate
                                users, process orders, provide account
                                features and deliver requested services.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Improve NexaCart
                            </h3>

                            <p>
                                Information may help us understand how
                                features are used, identify issues and
                                improve the overall shopping experience.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Security and fraud prevention
                            </h3>

                            <p>
                                Information may be used to protect the
                                service, investigate suspicious activity
                                and help prevent misuse.
                            </p>

                        </div>

                    </article>

                </section>


                {/* =================================================
                    COOKIES
                ================================================= */}

                <section className="policy-content-card privacy-wide-card">

                    <div className="policy-content-card-heading">

                        <FaCookieBite />

                        <h2>
                            Cookies & Similar Technologies
                        </h2>

                    </div>


                    <div className="policy-content-block">

                        <h3>
                            Why cookies may be used
                        </h3>

                        <p>
                            Cookies or similar browser technologies may
                            be used to remember preferences, maintain
                            session-related functionality and understand
                            how the website is used.
                        </p>

                    </div>


                    <div className="policy-content-block">

                        <h3>
                            Managing cookies
                        </h3>

                        <p>
                            Depending on your browser, you may be able
                            to control or clear cookies through browser
                            settings. Disabling some cookies can affect
                            certain website features.
                        </p>

                    </div>

                </section>


                {/* =================================================
                    DATA SECURITY
                ================================================= */}

                <section className="policy-section">

                    <div className="help-section-heading">

                        <div>

                            <span>
                                DATA PROTECTION
                            </span>

                            <h2>
                                Security & user responsibilities
                            </h2>

                        </div>

                    </div>


                    <div className="privacy-security-grid">

                        <div className="privacy-security-card">

                            <FaLock />

                            <h3>
                                Security Measures
                            </h3>

                            <p>
                                Reasonable safeguards are used to help
                                protect information processed through
                                the application.
                            </p>

                        </div>


                        <div className="privacy-security-card">

                            <FaUserShield />

                            <h3>
                                Keep Your Account Safe
                            </h3>

                            <p>
                                Use a strong password and never share
                                your password, OTP, PIN or authentication
                                credentials.
                            </p>

                        </div>


                        <div className="privacy-security-card">

                            <FaCheckCircle />

                            <h3>
                                Review Your Information
                            </h3>

                            <p>
                                Review your profile details and keep
                                important account information accurate.
                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    CONTACT CTA
                ================================================= */}

                <section className="policy-cta">

                    <div className="policy-cta-icon">
                        <FaUserShield />
                    </div>

                    <div>

                        <span>
                            PRIVACY QUESTIONS?
                        </span>

                        <h2>
                            Need help understanding your information?
                        </h2>

                    </div>

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
                        Privacy • Security • User Control
                    </span>

                </div>

            </div>

        </div>
    );
}

export default PrivacyPolicy;
import React from "react";
import { Link } from "react-router-dom";

import {
    FaArrowLeft,
    FaBoxOpen,
    FaCheckCircle,
    FaClock,
    FaExchangeAlt,
    FaQuestionCircle,
    FaUndoAlt,
    FaWallet,
} from "react-icons/fa";

import "../../styles/help.css";

function ReturnPolicy() {
    const returnSteps = [
        {
            number: "01",
            title: "Check Eligibility",
            description:
                "Review whether your product is eligible for return.",
            icon: <FaCheckCircle />,
        },
        {
            number: "02",
            title: "Raise Request",
            description:
                "Submit the return request with the required order details.",
            icon: <FaUndoAlt />,
        },
        {
            number: "03",
            title: "Product Review",
            description:
                "The returned product may be checked for eligibility and condition.",
            icon: <FaBoxOpen />,
        },
        {
            number: "04",
            title: "Refund / Resolution",
            description:
                "Eligible requests move to refund or the applicable resolution.",
            icon: <FaWallet />,
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
                                NEXACART RETURNS
                            </span>

                            <h1>
                                Returns &
                                <span>
                                    Refunds
                                </span>
                            </h1>

                            <p>
                                Understand return eligibility,
                                cancellation, refund processing
                                and what to do when an order has
                                an issue.
                            </p>

                        </div>

                        <div className="policy-hero-icon">
                            <FaUndoAlt />
                        </div>

                    </div>

                </section>


                {/* =================================================
                    SUMMARY CARDS
                ================================================= */}

                <section className="policy-summary-grid">

                    <div className="policy-summary-card">

                        <div className="policy-summary-icon">
                            <FaCheckCircle />
                        </div>

                        <span>
                            ELIGIBILITY
                        </span>

                        <h3>
                            Check Before Returning
                        </h3>

                        <p>
                            Return eligibility depends on
                            the product, condition and the
                            applicable policy.
                        </p>

                    </div>


                    <div className="policy-summary-card">

                        <div className="policy-summary-icon">
                            <FaClock />
                        </div>

                        <span>
                            PROCESS
                        </span>

                        <h3>
                            Return Timeline
                        </h3>

                        <p>
                            Submit requests as soon as possible
                            within the applicable return window.
                        </p>

                    </div>


                    <div className="policy-summary-card">

                        <div className="policy-summary-icon">
                            <FaWallet />
                        </div>

                        <span>
                            REFUND
                        </span>

                        <h3>
                            Refund Processing
                        </h3>

                        <p>
                            Refund timing can vary based on
                            verification and the original payment method.
                        </p>

                    </div>

                </section>


                {/* =================================================
                    RETURN JOURNEY
                ================================================= */}

                <section className="policy-section">

                    <div className="help-section-heading">

                        <div>

                            <span>
                                RETURN JOURNEY
                            </span>

                            <h2>
                                How the return process works
                            </h2>

                        </div>

                    </div>


                    <div className="shipping-steps">

                        {returnSteps.map((step) => (

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

                        ))}

                    </div>

                </section>


                {/* =================================================
                    IMPORTANT INFORMATION
                ================================================= */}

                <section className="policy-content-grid">

                    <article className="policy-content-card">

                        <div className="policy-content-card-heading">

                            <FaExchangeAlt />

                            <h2>
                                Returns & Exchanges
                            </h2>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Product condition
                            </h3>

                            <p>
                                Returned products should meet the
                                applicable return requirements.
                                Product condition, packaging and
                                included items may be considered
                                during the return review.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Wrong or damaged product
                            </h3>

                            <p>
                                If you receive a wrong, damaged or
                                materially different product, contact
                                support as soon as possible with your
                                order details and relevant information.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Exchanges
                            </h3>

                            <p>
                                Exchange availability may depend on
                                product availability and the applicable
                                return or exchange policy.
                            </p>

                        </div>

                    </article>


                    <article className="policy-content-card">

                        <div className="policy-content-card-heading">

                            <FaWallet />

                            <h2>
                                Refunds & Cancellation
                            </h2>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Refund timing
                            </h3>

                            <p>
                                Once an eligible return is approved,
                                the refund process depends on the
                                order verification and original payment
                                method.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Failed or reversed payment
                            </h3>

                            <p>
                                When a payment is unsuccessful or a
                                transaction is reversed, the final
                                status should be verified before any
                                refund is considered.
                            </p>

                        </div>


                        <div className="policy-content-block">

                            <h3>
                                Order cancellation
                            </h3>

                            <p>
                                Cancellation may be available while
                                the order is still eligible for it.
                                Once processing or shipment has progressed,
                                cancellation may no longer be possible.
                            </p>

                        </div>

                    </article>

                </section>


                {/* =================================================
                    NEED HELP
                ================================================= */}

                <section className="policy-cta">

                    <div className="policy-cta-icon">
                        <FaQuestionCircle />
                    </div>

                    <div>

                        <span>
                            NEED HELP WITH A RETURN?
                        </span>

                        <h2>
                            Check the FAQs or contact support.
                        </h2>

                    </div>

                    <Link
                        to="/faq"
                        className="faq-support-button"
                    >
                        Browse FAQs
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
                        Returns • Refunds • Customer Support
                    </span>

                </div>

            </div>
        </div>
    );
}

export default ReturnPolicy;
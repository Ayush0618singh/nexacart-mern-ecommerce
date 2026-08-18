import React from "react";
import { Link, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaArrowRight,
    FaBoxOpen,
    FaCheckCircle,
    FaClock,
    FaCreditCard,
    FaHeadset,
    FaInfoCircle,
    FaMapMarkerAlt,
    FaQuestionCircle,
    FaShieldAlt,
    FaUndoAlt,
    FaWallet,
} from "react-icons/fa";

import "../../styles/help.css";


function HelpArticle() {

    const { slug } = useParams();

    const articles = {

        /* =========================================================
           1. HOW TO TRACK YOUR ORDER
        ========================================================= */

        "orders-tracking": {

            category: "Orders & Tracking",

            title: "How to Track Your Order",

            description:
                "Learn how to review your order status, understand each delivery stage and find available tracking information on NexaCart.",

            updated: "August 2026",

            icon: <FaBoxOpen />,

            intro:
                "Once your order has been successfully placed, NexaCart provides you with a simple way to review its progress from your account. The Orders section helps you understand whether your order has been confirmed, is being prepared, has been shipped or has reached the delivery stage.",

            beforeStart: [
                "A NexaCart account",
                "Access to the Orders section",
                "Your order details or order date",
            ],

            overview: [
                "Order tracking is useful when you want to understand the current stage of a purchase without contacting support immediately.",
                "The information shown on an order can change as processing and delivery progress. Tracking information may not appear immediately after an order is placed because shipment-related details generally become available only after the order moves further through fulfilment.",
            ],

            steps: [

                {
                    number: "01",
                    title: "Open My Orders",

                    paragraphs: [
                        "Sign in to the NexaCart account used when the order was placed and open the My Orders section from your navigation menu or profile area.",
                        "Your order history contains the purchases associated with your account. If you have more than one order, review the product name, order date or other visible information to identify the purchase you want to track.",
                    ],
                },

                {
                    number: "02",
                    title: "Select the Order",

                    paragraphs: [
                        "Open the relevant order to view its details. Depending on the current stage of the purchase, you may see information relating to payment, order processing, shipment and delivery.",
                        "Review the order carefully before contacting support. The order details may already answer questions about the current status of your purchase.",
                    ],
                },

                {
                    number: "03",
                    title: "Review the Current Status",

                    paragraphs: [
                        "Order status provides a high-level view of where the purchase currently stands. A typical order may move through several stages before it is delivered.",
                        "The exact status names and available information can depend on the current implementation and the progress of the order.",
                    ],

                    timeline: true,
                },
            ],

            sections: [

                {
                    id: "tracking",
                    title: "Understanding Order Status",

                    paragraphs: [
                        "Order Confirmed generally means that the order has been successfully received by the application.",
                        "Processing indicates that the order is being prepared for the next fulfilment stage.",
                        "Shipped indicates that the order has moved into the delivery process. Additional tracking information may become available at this stage.",
                        "Delivered indicates that the order has reached the delivery destination recorded for the purchase.",
                    ],
                },

                {
                    id: "tracking-info",
                    title: "Understanding Tracking Information",

                    paragraphs: [
                        "Tracking information may become available only after an order has progressed far enough in the shipping process. If tracking details are not visible immediately, the order may still be undergoing preparation or dispatch processing.",
                        "Tracking availability can also depend on the delivery service, shipment stage and the information returned to the application. If new information has not appeared yet, checking the order again later can be useful.",
                    ],
                },

                {
                    id: "delayed",
                    title: "What If Your Order Is Delayed?",

                    paragraphs: [
                        "Delivery timelines can vary depending on product availability, destination, logistics processing, high order volume and other circumstances. A delay does not automatically mean that an order has been cancelled or lost.",
                        "Before contacting support, review the latest order status and any available tracking details. If the status has not changed for an unreasonable period or the information appears inconsistent, contact NexaCart Support with your order details.",
                    ],
                },

                {
                    id: "when-contact",
                    title: "When Should You Contact Support?",

                    paragraphs: [
                        "You may contact support when your order status does not provide enough information, when you believe an order is significantly delayed, or when you notice an issue that cannot be resolved through the normal order flow.",
                        "When contacting support, provide the relevant order ID and a clear description of the issue. Avoid sending passwords, OTPs, UPI PINs or other confidential authentication information.",
                    ],
                },
            ],

            important:
                "NexaCart support will never require your password, OTP, UPI PIN, card PIN or other confidential authentication information to review a delivery issue.",

            related: [
                {
                    slug: "order-cancellation",
                    title: "How to Cancel an Order",
                    description:
                        "Understand cancellation eligibility and the next steps.",
                    icon: <FaClock />,
                },
                {
                    slug: "payment-failed",
                    title: "What to Do After a Failed Payment",
                    description:
                        "Learn what to check before making another payment.",
                    icon: <FaCreditCard />,
                },
            ],
        },


        /* =========================================================
           2. HOW TO CANCEL AN ORDER
        ========================================================= */

        "order-cancellation": {

            category: "Orders & Tracking",

            title: "How to Cancel an Order",

            description:
                "Learn when an order may be cancelled, how to check cancellation availability and what to do when cancellation is no longer available.",

            updated: "August 2026",

            icon: <FaUndoAlt />,

            intro:
                "Order cancellation is generally available only while a purchase remains within an eligible stage of processing. As an order moves through fulfilment and delivery, cancellation availability can change.",

            beforeStart: [
                "A NexaCart account",
                "The order you want to cancel",
                "Access to My Orders",
            ],

            overview: [
                "Checking cancellation availability before taking further action helps prevent confusion and avoids unnecessary support requests.",
                "If the normal cancellation option is no longer available, the order may already have progressed to a stage where it cannot be cancelled through the standard order flow.",
            ],

            steps: [

                {
                    number: "01",
                    title: "Open My Orders",

                    paragraphs: [
                        "Sign in to your NexaCart account and open My Orders. Locate the purchase you want to cancel using the product name, order date or other available order information.",
                    ],
                },

                {
                    number: "02",
                    title: "Check Cancellation Availability",

                    paragraphs: [
                        "Open the order details and look for the cancellation option. If the option is visible and enabled, the order is still within the cancellation stage supported by the application.",
                        "If the cancellation option is not available, the order may already have progressed into a later processing, shipment or delivery stage.",
                    ],
                },

                {
                    number: "03",
                    title: "Confirm the Cancellation",

                    paragraphs: [
                        "When cancellation is available, follow the confirmation flow presented by NexaCart. Review the order details before submitting the cancellation request.",
                        "After submitting the request, check My Orders again to confirm that the order status has been updated.",
                    ],
                },
            ],

            sections: [

                {
                    id: "when-cancellation",
                    title: "When Cancellation May Not Be Available",

                    paragraphs: [
                        "Cancellation may become unavailable after an order has progressed into later fulfilment or delivery stages. Product availability, shipment status and the current order state can affect whether cancellation remains possible.",
                        "If the normal cancellation option is unavailable and you believe there is a genuine issue with the order, contact NexaCart Support and provide the relevant order information.",
                    ],
                },

                {
                    id: "after-cancellation",
                    title: "What Happens After Cancellation?",

                    paragraphs: [
                        "Once a cancellation is accepted, the order status should reflect the updated state. You should continue to monitor the order until the cancellation is fully reflected.",
                        "If payment has already been completed, any applicable refund process depends on the transaction status, payment method and relevant refund policy.",
                    ],
                },

                {
                    id: "refund-cancellation",
                    title: "Cancellation and Refunds",

                    paragraphs: [
                        "A cancelled order and a completed refund are related but separate stages. Cancellation confirms that the order should no longer proceed, while the refund process determines whether money already paid must be returned.",
                        "Refund timing can depend on payment verification and the original payment method. Keep your order information available until the payment outcome has been fully resolved.",
                    ],
                },

                {
                    id: "support-cancel",
                    title: "When to Contact Support",

                    paragraphs: [
                        "Contact support when you believe an eligible cancellation option is missing, when the order status does not reflect your cancellation request, or when you need clarification about a payment already made for a cancelled order.",
                    ],
                },
            ],

            important:
                "Never share your password, OTP, payment PIN or other confidential authentication information when requesting cancellation assistance.",

            related: [
                {
                    slug: "orders-tracking",
                    title: "How to Track Your Order",
                    description:
                        "Review order status and available tracking information.",
                    icon: <FaBoxOpen />,
                },
                {
                    slug: "payment-failed",
                    title: "What to Do After a Failed Payment",
                    description:
                        "Understand what to check after a payment issue.",
                    icon: <FaCreditCard />,
                },
            ],
        },


        /* =========================================================
           3. FAILED PAYMENT
        ========================================================= */

        "payment-failed": {

            category: "Payments",

            title: "What to Do After a Failed Payment",

            description:
                "Learn what to check when an online payment fails, when money appears to be deducted and how to avoid accidental duplicate payments.",

            updated: "August 2026",

            icon: <FaCreditCard />,

            intro:
                "A payment failure does not always mean that money has been permanently lost. The safest first step is to check both the payment status and the corresponding NexaCart order status before attempting another transaction.",

            beforeStart: [
                "Your order details",
                "Your payment or transaction reference",
                "Access to your payment app or bank status",
            ],

            overview: [
                "Payment processing can involve multiple systems. A payment may occasionally appear delayed, failed, pending or completed at a different time from the order status shown by the application.",
                "For this reason, repeated payment attempts should be avoided until the result of the original transaction is reasonably clear.",
            ],

            steps: [

                {
                    number: "01",
                    title: "Check Your Payment Status",

                    paragraphs: [
                        "Open the payment application, banking channel or payment confirmation interface used during checkout. Determine whether the transaction is marked successful, failed, pending or reversed.",
                        "If the transaction is still pending, avoid immediately creating another payment attempt for the same order.",
                    ],
                },

                {
                    number: "02",
                    title: "Check Your NexaCart Order",

                    paragraphs: [
                        "Return to NexaCart and open My Orders. Check whether the order was created, whether payment status was updated and whether the order appears to be confirmed.",
                        "A payment result and order result should be considered together before you decide what to do next.",
                    ],
                },

                {
                    number: "03",
                    title: "Take the Correct Next Step",

                    paragraphs: [
                        "If the payment clearly failed and no amount was deducted, you may retry the payment through the checkout process when appropriate.",
                        "If money was deducted but the order was not confirmed, do not immediately make another payment. Keep the transaction reference and contact support if the issue does not resolve.",
                    ],
                },
            ],

            sections: [

                {
                    id: "payment-deducted",
                    title: "Payment Deducted but Order Is Missing",

                    paragraphs: [
                        "When money appears to have been deducted but the order is not confirmed, keep the transaction reference and any available payment information. These details can help support investigate the transaction.",
                        "The final resolution and refund timing can depend on payment verification and the processing status reported by the payment provider.",
                    ],
                },

                {
                    id: "safe-retry",
                    title: "When Is It Safe to Retry?",

                    paragraphs: [
                        "A retry should be considered only after the previous transaction has been checked. Repeatedly initiating payments without understanding the original status can create unnecessary duplicate transactions.",
                        "If the payment status is unclear, contact support before starting another payment for the same order.",
                    ],
                },

                {
                    id: "payment-security",
                    title: "How to Keep Payments Safer",

                    paragraphs: [
                        "Always verify the order amount, selected products and delivery details before confirming a payment.",
                        "Use the official NexaCart checkout experience and avoid payment links or messages received from unknown sources claiming to represent customer support.",
                    ],
                },

                {
                    id: "support-payment",
                    title: "When to Contact Support",

                    paragraphs: [
                        "Contact support if money was deducted but the order is missing, if a transaction remains unresolved, or if the order and payment status appear inconsistent.",
                        "When contacting support, provide the order ID and relevant transaction reference where appropriate. Never provide your password, OTP, UPI PIN or card PIN.",
                    ],
                },
            ],

            important:
                "NexaCart support will never ask you to reveal an OTP, UPI PIN, card PIN, password or other confidential authentication information.",

            related: [
                {
                    slug: "orders-tracking",
                    title: "How to Track Your Order",
                    description:
                        "Review the latest status of your order.",
                    icon: <FaBoxOpen />,
                },
                {
                    slug: "order-cancellation",
                    title: "How to Cancel an Order",
                    description:
                        "Check cancellation availability for your order.",
                    icon: <FaUndoAlt />,
                },
            ],
        },
    };


    const article = articles[slug];


    /* =========================================================
       ARTICLE NOT FOUND
    ========================================================= */

    if (!article) {

        return (
            <div className="help-page">

                <div className="help-container">

                    <section className="faq-empty">

                        <div className="faq-empty-icon">
                            <FaQuestionCircle />
                        </div>

                        <h3>
                            Help Article Not Found
                        </h3>

                        <p>
                            The article you are looking for
                            does not exist or may have moved.
                        </p>

                        <Link
                            to="/help"
                            className="faq-support-button"
                        >
                            Back to Help Center
                        </Link>

                    </section>

                </div>

            </div>
        );
    }


    return (
        <div className="help-page">

            <div className="help-container">

                {/* =================================================
                    ARTICLE HERO
                ================================================= */}

                <section className="article-hero">

                    <Link
                        to="/help"
                        className="article-back-link"
                    >
                        <FaArrowLeft />
                        Back to Help Center
                    </Link>

                    <div className="article-hero-content">

                        <div>

                            <span className="article-category">
                                {article.category}
                            </span>

                            <h1>
                                {article.title}
                            </h1>

                            <p>
                                {article.description}
                            </p>

                            <span className="article-updated">
                                Last updated:{" "}
                                {article.updated}
                            </span>

                        </div>

                        <div className="article-hero-icon">
                            {article.icon}
                        </div>

                    </div>

                </section>


                {/* =================================================
                    ARTICLE BODY
                ================================================= */}

                <div className="article-layout">

                    <article className="article-content">

                        {/* INTRO */}

                        <div className="article-intro">

                            <FaInfoCircle />

                            <p>
                                {article.intro}
                            </p>

                        </div>


                        {/* OVERVIEW */}

                        <section className="article-section">

                            <h2>
                                Overview
                            </h2>

                            {article.overview.map(
                                (paragraph) => (
                                    <p key={paragraph}>
                                        {paragraph}
                                    </p>
                                )
                            )}

                        </section>


                        {/* BEFORE START */}

                        <section
                            className="article-section"
                            id="before-start"
                        >

                            <h2>
                                Before You Start
                            </h2>

                            <p>
                                Having the right information ready
                                can make the process faster and easier.
                            </p>

                            <div className="article-checklist">

                                {article.beforeStart.map(
                                    (item) => (

                                        <div key={item}>

                                            <FaCheckCircle />

                                            <span>
                                                {item}
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        </section>


                        {/* STEPS */}

                        {article.steps.map(
                            (step, index) => {

                                const stepIds = [
                                    "open-orders",
                                    "select-order",
                                    "status",
                                ];

                                return (
                                    <section
                                        className="article-step"
                                        id={
                                            stepIds[index] ||
                                            `step-${index + 1}`
                                        }
                                        key={step.number}
                                    >

                                        <div className="article-step-number">
                                            {step.number}
                                        </div>

                                        <div className="article-step-body">

                                            <h2>
                                                {step.title}
                                            </h2>

                                            {step.paragraphs.map(
                                                (paragraph) => (
                                                    <p key={paragraph}>
                                                        {paragraph}
                                                    </p>
                                                )
                                            )}


                                            {step.timeline && (

                                                <div className="status-timeline">

                                                    <div className="status-item">

                                                        <span>
                                                            <FaCheckCircle />
                                                        </span>

                                                        <div>
                                                            <strong>
                                                                Order Confirmed
                                                            </strong>

                                                            <small>
                                                                Your order has been
                                                                successfully received.
                                                            </small>
                                                        </div>

                                                    </div>


                                                    <div className="status-item">

                                                        <span>
                                                            <FaBoxOpen />
                                                        </span>

                                                        <div>
                                                            <strong>
                                                                Processing
                                                            </strong>

                                                            <small>
                                                                Your product is being
                                                                prepared for dispatch.
                                                            </small>
                                                        </div>

                                                    </div>


                                                    <div className="status-item">

                                                        <span>
                                                            <FaMapMarkerAlt />
                                                        </span>

                                                        <div>
                                                            <strong>
                                                                Shipped
                                                            </strong>

                                                            <small>
                                                                The order has entered
                                                                the delivery process.
                                                            </small>
                                                        </div>

                                                    </div>


                                                    <div className="status-item">

                                                        <span>
                                                            <FaCheckCircle />
                                                        </span>

                                                        <div>
                                                            <strong>
                                                                Delivered
                                                            </strong>

                                                            <small>
                                                                The order has reached
                                                                the delivery destination.
                                                            </small>
                                                        </div>

                                                    </div>

                                                </div>
                                            )}

                                        </div>

                                    </section>
                                );
                            }
                        )}


                        {/* ADDITIONAL SECTIONS */}

                        {article.sections.map(
                            (section) => (

                                <section
                                    className="article-section"
                                    id={section.id}
                                    key={section.id}
                                >

                                    <h2>
                                        {section.title}
                                    </h2>

                                    {section.paragraphs.map(
                                        (paragraph) => (
                                            <p key={paragraph}>
                                                {paragraph}
                                            </p>
                                        )
                                    )}

                                </section>

                            )
                        )}


                        {/* IMPORTANT */}

                        <section className="article-important">

                            <div>
                                <FaShieldAlt />
                            </div>

                            <div>

                                <strong>
                                    Important
                                </strong>

                                <p>
                                    {article.important}
                                </p>

                            </div>

                        </section>


                        {/* SUPPORT */}

                        <section className="article-support-card">

                            <div className="article-support-icon">
                                <FaHeadset />
                            </div>

                            <div>

                                <span>
                                    STILL NEED HELP?
                                </span>

                                <h2>
                                    We’re here to assist you.
                                </h2>

                                <p>
                                    If this article does not answer
                                    your question, contact NexaCart
                                    Support with the relevant details.
                                </p>

                            </div>

                            <Link
                                to="/contact-support"
                                className="article-support-button"
                            >
                                Contact Support
                                <FaArrowRight />
                            </Link>

                        </section>

                    </article>


                    {/* =================================================
                        SIDEBAR
                    ================================================= */}

                    <aside className="article-sidebar">

                        <div className="article-sidebar-card">

                            <span>
                                ON THIS PAGE
                            </span>

                            <a href="#before-start">
                                Before You Start
                            </a>

                            <a href="#open-orders">
                                Step 1
                            </a>

                            <a href="#select-order">
                                Step 2
                            </a>

                            <a href="#status">
                                Step 3
                            </a>

                            {article.sections
                                .slice(0, 3)
                                .map(
                                    (section) => (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                        >
                                            {section.title}
                                        </a>
                                    )
                                )}

                        </div>


                        <div className="article-sidebar-card article-help-card">

                            <FaQuestionCircle />

                            <strong>
                                Need another answer?
                            </strong>

                            <p>
                                Browse frequently asked questions
                                for quick answers.
                            </p>

                            <Link
                                to="/faq"
                                className="article-sidebar-button"
                            >
                                Browse FAQs
                            </Link>

                        </div>

                    </aside>

                </div>


                {/* =================================================
                    RELATED ARTICLES
                ================================================= */}

                <section className="article-related">

                    <div className="help-section-heading">

                        <div>

                            <span>
                                RELATED ARTICLES
                            </span>

                            <h2>
                                You may also find these useful
                            </h2>

                        </div>

                    </div>


                    <div className="article-related-grid">

                        {article.related.map(
                            (relatedArticle) => (

                                <Link
                                    key={
                                        relatedArticle.slug
                                    }
                                    to={
                                        `/help/article/${relatedArticle.slug}`
                                    }
                                    className="article-related-card"
                                >

                                    {relatedArticle.icon}

                                    <div>

                                        <strong>
                                            {
                                                relatedArticle.title
                                            }
                                        </strong>

                                        <span>
                                            {
                                                relatedArticle.description
                                            }
                                        </span>

                                    </div>

                                    <FaArrowRight />

                                </Link>

                            )
                        )}

                    </div>

                </section>


                {/* =================================================
                    FOOTER NOTE
                ================================================= */}

                <div className="help-footer-note">

                    <span>
                        © 2026 NexaCart Premium
                    </span>

                    <span>
                        Knowledge Base • Clear Answers • Better Shopping
                    </span>

                </div>

            </div>

        </div>
    );
}

export default HelpArticle;
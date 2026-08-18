import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
    FaSearch,
    FaChevronDown,
    FaArrowLeft,
    FaQuestionCircle,
    FaBoxOpen,
    FaCreditCard,
    FaTruck,
    FaUndoAlt,
    FaUserCircle,
    FaHeart,
} from "react-icons/fa";

import "../../styles/help.css";


function FAQ() {

    const [searchParams] = useSearchParams();

    const initialSearch =
        searchParams.get("search") || "";

    const [search, setSearch] =
        useState(initialSearch);

    const [activeQuestion, setActiveQuestion] =
        useState(null);


    const categories = [
        {
            key: "orders",
            title: "Orders & Tracking",
            icon: <FaBoxOpen />,
        },
        {
            key: "payments",
            title: "Payments",
            icon: <FaCreditCard />,
        },
        {
            key: "shipping",
            title: "Shipping & Delivery",
            icon: <FaTruck />,
        },
        {
            key: "returns",
            title: "Returns & Refunds",
            icon: <FaUndoAlt />,
        },
        {
            key: "account",
            title: "Account & Profile",
            icon: <FaUserCircle />,
        },
        {
            key: "cart",
            title: "Cart & Wishlist",
            icon: <FaHeart />,
        },
    ];


    const questions = [
        {
            id: 1,
            category: "orders",
            question:
                "How can I track my order?",
            answer:
                "Open My Orders from your account to view the current status of your order. Once tracking information becomes available, it will be shown with the order details.",
        },

        {
            id: 2,
            category: "orders",
            question:
                "Can I cancel an order?",
            answer:
                "Orders may be cancelled when they are still eligible for cancellation. Open the order details and check whether the cancellation option is available.",
        },

        {
            id: 3,
            category: "orders",
            question:
                "Where can I see my order history?",
            answer:
                "Open the Orders section from your account. You can review previous orders, their status and the related order details there.",
        },

        {
            id: 4,
            category: "payments",
            question:
                "What payment methods are available?",
            answer:
                "NexaCart can support online payments through the configured Razorpay flow and Cash on Delivery where available for the order.",
        },

        {
            id: 5,
            category: "payments",
            question:
                "What should I do if my payment fails?",
            answer:
                "First check your bank or payment app status. If the payment failed and your order was not confirmed, you can try the payment again from checkout. Avoid making repeated payments while a previous transaction is still being processed.",
        },

        {
            id: 6,
            category: "payments",
            question:
                "Will I get a refund for a failed payment?",
            answer:
                "If money was deducted but the order was not successfully completed, the payment status should be verified before a refund is considered. The exact timeline depends on the payment provider and transaction status.",
        },

        {
            id: 7,
            category: "shipping",
            question:
                "How long does delivery take?",
            answer:
                "The expected delivery information is shown with the order or checkout details where available. Actual delivery time can vary by product, destination and logistics processing.",
        },

        {
            id: 8,
            category: "shipping",
            question:
                "Is delivery free?",
            answer:
                "Your checkout page shows the applicable delivery charge for the current order. When free delivery applies, it is displayed there.",
        },

        {
            id: 9,
            category: "shipping",
            question:
                "Can I change my delivery address?",
            answer:
                "Update your address before placing the order whenever possible. After an order is placed, address changes may not always be possible depending on its current processing status.",
        },

        {
            id: 10,
            category: "returns",
            question:
                "How do I return a product?",
            answer:
                "Open the Returns & Refunds information page to review the return conditions and the available process for eligible products.",
        },

        {
            id: 11,
            category: "returns",
            question:
                "When will I receive my refund?",
            answer:
                "Refund timing depends on the return process, order verification and the original payment method. The final timeline can vary by payment provider.",
        },

        {
            id: 12,
            category: "returns",
            question:
                "Can I return every product?",
            answer:
                "Return eligibility can depend on the product, its condition and the applicable return policy. Check the Returns & Refunds policy before initiating a return.",
        },

        {
            id: 13,
            category: "account",
            question:
                "How can I update my profile?",
            answer:
                "Open My Profile to update your personal information, contact details, address and other available profile settings.",
        },

        {
            id: 14,
            category: "account",
            question:
                "How can I change my password?",
            answer:
                "Open the account security section when available and follow the password update process. Use a strong password and never share it with anyone.",
        },

        {
            id: 15,
            category: "account",
            question:
                "Can I upload or change my profile photo?",
            answer:
                "Yes. Your profile page supports changing the profile photo. You can also remove the existing image when the option is available.",
        },

        {
            id: 16,
            category: "cart",
            question:
                "How can I change cart quantity?",
            answer:
                "Open your Cart and use the plus or minus controls next to a product to update its quantity.",
        },

        {
            id: 17,
            category: "cart",
            question:
                "Can I remove an item from my cart?",
            answer:
                "Yes. Use the Remove action on the product card inside your Cart.",
        },

        {
            id: 18,
            category: "cart",
            question:
                "Where can I find my wishlist?",
            answer:
                "Open Wishlist from the navigation or your profile to view products you have saved for later.",
        },
    ];


    const categoryLookup =
        useMemo(() => {

            return Object.fromEntries(
                categories.map(
                    (category) => [
                        category.key,
                        category,
                    ]
                )
            );

        }, []);


    const filteredQuestions =
        useMemo(() => {

            const term =
                search
                    .trim()
                    .toLowerCase();

            if (!term) {
                return questions;
            }

            return questions.filter(
                (item) => {

                    const categoryName =
                        categoryLookup[
                            item.category
                        ]?.title || "";

                    return (
                        item.question
                            .toLowerCase()
                            .includes(term) ||

                        item.answer
                            .toLowerCase()
                            .includes(term) ||

                        categoryName
                            .toLowerCase()
                            .includes(term)
                    );
                }
            );

        }, [search, categoryLookup, questions]);


    useEffect(() => {

        if (
            activeQuestion !== null &&
            !filteredQuestions.some(
                (item) =>
                    item.id === activeQuestion
            )
        ) {
            setActiveQuestion(null);
        }

    }, [
        filteredQuestions,
        activeQuestion,
    ]);


    const toggleQuestion = (id) => {

        setActiveQuestion(
            (current) =>
                current === id
                    ? null
                    : id
        );
    };


    return (

        <div className="help-page">

            <div className="help-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <section className="faq-hero">

                    <Link
                        to="/help"
                        className="faq-back-link"
                    >
                        <FaArrowLeft />
                        Back to Help Center
                    </Link>


                    <div className="faq-hero-main">

                        <div>

                            <span className="help-kicker">
                                NEXACART FAQ
                            </span>

                            <h1>
                                Frequently Asked
                                <span>
                                    Questions
                                </span>
                            </h1>

                            <p>
                                Find quick answers about orders,
                                payments, delivery, returns and
                                your account.
                            </p>

                        </div>


                        <div className="faq-hero-icon">
                            <FaQuestionCircle />
                        </div>

                    </div>


                    <div className="help-search faq-search">

                        <FaSearch />

                        <input
                            type="search"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder="Search frequently asked questions..."
                            aria-label="Search FAQs"
                        />

                    </div>

                </section>


                {/* =================================================
                    CATEGORY FILTERS
                ================================================= */}

                <div className="faq-category-bar">

                    {categories.map(
                        (category) => (

                            <button
                                key={category.key}
                                type="button"
                                className="faq-category-chip"
                                onClick={() =>
                                    setSearch(
                                        category.title
                                    )
                                }
                            >
                                {category.icon}
                                <span>
                                    {category.title}
                                </span>
                            </button>

                        )
                    )}

                </div>


                {/* =================================================
                    RESULTS
                ================================================= */}

                <section className="faq-results">

                    <div className="faq-results-header">

                        <div>

                            <span>
                                HELP ANSWERS
                            </span>

                            <h2>
                                {search.trim()
                                    ? `Results for "${search}"`
                                    : "Browse all questions"}
                            </h2>

                        </div>

                        <strong>
                            {filteredQuestions.length}{" "}
                            {filteredQuestions.length === 1
                                ? "Question"
                                : "Questions"}
                        </strong>

                    </div>


                    {filteredQuestions.length === 0 ? (

                        <div className="faq-empty">

                            <div className="faq-empty-icon">
                                <FaQuestionCircle />
                            </div>

                            <h3>
                                No matching questions found
                            </h3>

                            <p>
                                Try another search term or
                                browse the categories above.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    setSearch("")
                                }
                                className="faq-reset-button"
                            >
                                Show All Questions
                            </button>

                        </div>

                    ) : (

                        <div className="faq-list">

                            {filteredQuestions.map(
                                (item) => {

                                    const isOpen =
                                        activeQuestion ===
                                        item.id;

                                    const category =
                                        categoryLookup[
                                            item.category
                                        ];

                                    return (

                                        <article
                                            key={item.id}
                                            className={`faq-item ${
                                                isOpen
                                                    ? "open"
                                                    : ""
                                            }`}
                                        >

                                            <button
                                                type="button"
                                                className="faq-question"
                                                onClick={() =>
                                                    toggleQuestion(
                                                        item.id
                                                    )
                                                }
                                            >

                                                <span className="faq-question-left">

                                                    <span className="faq-question-icon">
                                                        {category.icon}
                                                    </span>

                                                    <span>

                                                        <small>
                                                            {category.title}
                                                        </small>

                                                        <strong>
                                                            {item.question}
                                                        </strong>

                                                    </span>

                                                </span>


                                                <FaChevronDown
                                                    className={
                                                        isOpen
                                                            ? "rotated"
                                                            : ""
                                                    }
                                                />

                                            </button>


                                            {isOpen && (

                                                <div className="faq-answer">

                                                    <p>
                                                        {item.answer}
                                                    </p>

                                                </div>

                                            )}

                                        </article>

                                    );
                                }
                            )}

                        </div>

                    )}

                </section>


                {/* =================================================
                    SUPPORT CTA
                ================================================= */}

                <section className="faq-support-card">

                    <div>

                        <span>
                            CAN'T FIND YOUR ANSWER?
                        </span>

                        <h2>
                            We're here to help.
                        </h2>

                        <p>
                            Contact NexaCart support and tell us
                            what you need help with.
                        </p>

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
                        Clear Answers • Better Shopping
                    </span>

                </div>

            </div>

        </div>
    );
}

export default FAQ;
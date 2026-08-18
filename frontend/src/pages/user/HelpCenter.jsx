import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
    FaSearch,
    FaBoxOpen,
    FaCreditCard,
    FaTruck,
    FaUndoAlt,
    FaUserCircle,
    FaHeart,
    FaQuestionCircle,
    FaHeadset,
    FaArrowRight,
} from "react-icons/fa";

import "../../styles/help.css";


function HelpCenter() {

    const [search, setSearch] = useState("");


    const helpCategories = [
        {
            title: "Orders & Tracking",
            description:
                "Track orders, delivery updates and order status.",
            icon: <FaBoxOpen />,
            link: "/help/article/orders-tracking"
        },

        {
            title: "Payments",
            description:
                "Payment methods, failed payments and refunds.",
            icon: <FaCreditCard />,
            link: "/help/article/payment-failed",
        },

        {
            title: "Shipping & Delivery",
            description:
                "Delivery timelines, shipping charges and tracking.",
            icon: <FaTruck />,
            link: "/shipping-policy",
        },

        {
            title: "Returns & Refunds",
            description:
                "Return eligibility, cancellations and refunds.",
            icon: <FaUndoAlt />,
            link: "/return-policy",
        },

        {
            title: "Account & Profile",
            description:
                "Manage profile, password and account details.",
            icon: <FaUserCircle />,
            link: "/profile",
        },

        {
            title: "Cart & Wishlist",
            description:
                "Manage saved items, cart products and wishlist.",
            icon: <FaHeart />,
            link: "/cart",
        },
    ];


    const popularQuestions = [
        "How can I track my order?",
        "How can I cancel my order?",
        "How do I return a product?",
        "What payment methods are available?",
        "How can I update my delivery address?",
        "How do I change my password?",
    ];


    const handleSearch = (e) => {
        e.preventDefault();

        if (!search.trim()) {
            return;
        }

        const query =
            encodeURIComponent(
                search.trim()
            );

        window.location.href =
            `/faq?search=${query}`;
    };


    return (

        <div className="help-page">

            <div className="help-container">


                {/* =================================================
                    HERO
                ================================================= */}

                <section className="help-hero">

                    <div className="help-hero-content">

                        <span className="help-kicker">
                            NEXACART SUPPORT
                        </span>

                        <h1>
                            How can we
                            <span>
                                help you?
                            </span>
                        </h1>

                        <p>
                            Find answers, manage your orders,
                            understand payments and get support
                            whenever you need it.
                        </p>


                        <form
                            className="help-search"
                            onSubmit={handleSearch}
                        >

                            <FaSearch />

                            <input
                                type="search"
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                placeholder="Search for help..."
                                aria-label="Search for help"
                            />

                            <button
                                type="submit"
                            >
                                Search
                            </button>

                        </form>

                    </div>

                </section>


                {/* =================================================
                    QUICK ACCESS
                ================================================= */}

                <section className="help-quick-section">

                    <div className="help-section-heading">

                        <div>

                            <span>
                                QUICK ACCESS
                            </span>

                            <h2>
                                What do you need help with?
                            </h2>

                        </div>

                    </div>


                    <div className="help-category-grid">

                        {helpCategories.map(
                            (category) => (

                                <Link
                                    key={category.title}
                                    to={category.link}
                                    className="help-category-card"
                                >

                                    <div className="help-category-icon">
                                        {category.icon}
                                    </div>


                                    <div className="help-category-content">

                                        <h3>
                                            {category.title}
                                        </h3>

                                        <p>
                                            {category.description}
                                        </p>

                                    </div>


                                    <FaArrowRight
                                        className="help-category-arrow"
                                    />

                                </Link>

                            )
                        )}

                    </div>

                </section>


                {/* =================================================
                    FAQ + SUPPORT
                ================================================= */}

                <section className="help-bottom-grid">


                    {/* FAQ CARD */}

                    <div className="help-info-card">

                        <div className="help-info-icon">
                            <FaQuestionCircle />
                        </div>

                        <div>

                            <span>
                                NEED QUICK ANSWERS?
                            </span>

                            <h3>
                                Browse FAQs
                            </h3>

                            <p>
                                Explore frequently asked questions
                                about orders, payments, returns and
                                your account.
                            </p>

                            <Link
                                to="/faq"
                                className="help-link-button"
                            >
                                Browse FAQs
                                <FaArrowRight />
                            </Link>

                        </div>

                    </div>


                    {/* SUPPORT CARD */}

                    <div className="help-info-card support-card">

                        <div className="help-info-icon">
                            <FaHeadset />
                        </div>

                        <div>

                            <span>
                                STILL NEED HELP?
                            </span>

                            <h3>
                                Contact Support
                            </h3>

                            <p>
                                Can't find what you need?
                                Our support team is here to assist you.
                            </p>

                            <Link
                                to="/contact-support"
                                className="help-link-button"
                            >
                                Contact Support
                                <FaArrowRight />
                            </Link>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    POPULAR QUESTIONS
                ================================================= */}

                <section className="help-faq-preview">

                    <div className="help-section-heading">

                        <div>

                            <span>
                                POPULAR QUESTIONS
                            </span>

                            <h2>
                                What other shoppers ask
                            </h2>

                        </div>

                        <Link to="/faq">
                            View All FAQs →
                        </Link>

                    </div>


                    <div className="help-question-list">

                        {popularQuestions.map(
                            (question) => (

                                <Link
                                    key={question}
                                    to={`/faq?search=${encodeURIComponent(
                                        question
                                    )}`}
                                    className="help-question-item"
                                >

                                    <span>
                                        {question}
                                    </span>

                                    <FaArrowRight />

                                </Link>

                            )
                        )}

                    </div>

                </section>


                {/* =================================================
                    FOOT NOTE
                ================================================= */}

                <div className="help-footer-note">

                    <span>
                        © 2026 NexaCart Premium
                    </span>

                    <span>
                        Secure Support • Clear Information • Better Shopping
                    </span>

                </div>

            </div>

        </div>
    );
}

export default HelpCenter;
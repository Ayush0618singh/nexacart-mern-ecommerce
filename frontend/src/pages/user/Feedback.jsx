import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
    FaArrowLeft,
    FaCheckCircle,
    FaCommentDots,
    FaHeart,
    FaLightbulb,
    FaPaperPlane,
    FaStar,
} from "react-icons/fa";

import "../../styles/help.css";


function Feedback() {

    const [formData, setFormData] = useState({
        type: "Website Experience",
        orderId: "",
        message: "",
    });

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);


    const feedbackTypes = [
        "Website Experience",
        "Product Experience",
        "Order Experience",
        "Checkout & Payment",
        "Suggestion",
        "Other",
    ];


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {

        e.preventDefault();

        if (!rating) {
            return;
        }

        if (!formData.message.trim()) {
            return;
        }

        // Frontend-only for now.
        // Backend feedback API can be connected later.
        setSubmitted(true);
    };


    const resetForm = () => {

        setSubmitted(false);

        setRating(0);
        setHoverRating(0);

        setFormData({
            type: "Website Experience",
            orderId: "",
            message: "",
        });
    };


    if (submitted) {

        return (

            <div className="help-page">

                <div className="help-container">

                    <section className="feedback-success-card">

                        <div className="feedback-success-icon">
                            <FaCheckCircle />
                        </div>

                        <span className="help-kicker">
                            FEEDBACK RECEIVED
                        </span>

                        <h1>
                            Thank you for sharing.
                        </h1>

                        <p>
                            Your feedback helps us improve
                            the NexaCart shopping experience.
                        </p>

                        <div className="feedback-success-actions">

                            <Link
                                to="/help"
                                className="help-link-button"
                            >
                                Back to Help Center
                                <span>→</span>
                            </Link>

                            <button
                                type="button"
                                className="support-secondary-button"
                                onClick={resetForm}
                            >
                                Share More Feedback
                            </button>

                        </div>

                    </section>

                </div>

            </div>
        );
    }


    return (

        <div className="help-page">

            <div className="help-container">


                {/* =================================================
                    HERO
                ================================================= */}

                <section className="feedback-hero">

                    <Link
                        to="/help"
                        className="faq-back-link"
                    >
                        <FaArrowLeft />
                        Back to Help Center
                    </Link>


                    <div className="feedback-hero-content">

                        <div>

                            <span className="help-kicker">
                                NEXACART FEEDBACK
                            </span>

                            <h1>
                                Tell us what you
                                <span>
                                    think.
                                </span>
                            </h1>

                            <p>
                                Share your experience, report an issue
                                or suggest an idea that could make
                                NexaCart better.
                            </p>

                        </div>


                        <div className="feedback-hero-icon">
                            <FaCommentDots />
                        </div>

                    </div>

                </section>


                {/* =================================================
                    FEEDBACK FORM
                ================================================= */}

                <section className="feedback-layout">


                    {/* FORM */}

                    <div className="feedback-form-card">

                        <div className="support-card-heading">

                            <span>
                                YOUR EXPERIENCE
                            </span>

                            <h2>
                                Share your feedback
                            </h2>

                            <p>
                                A few details help us understand
                                your experience better.
                            </p>

                        </div>


                        <form
                            className="feedback-form"
                            onSubmit={handleSubmit}
                        >


                            {/* RATING */}

                            <div className="feedback-rating-section">

                                <label>
                                    How was your experience?
                                </label>

                                <div className="feedback-stars">

                                    {[1, 2, 3, 4, 5].map(
                                        (star) => (

                                            <button
                                                key={star}
                                                type="button"
                                                className={
                                                    star <=
                                                        (hoverRating ||
                                                            rating)
                                                        ? "active"
                                                        : ""
                                                }
                                                onMouseEnter={() =>
                                                    setHoverRating(
                                                        star
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    setHoverRating(0)
                                                }
                                                onClick={() =>
                                                    setRating(star)
                                                }
                                                aria-label={`${star} star`}
                                            >
                                                <FaStar />
                                            </button>

                                        )
                                    )}

                                </div>

                                <span className="feedback-rating-note">

                                    {rating === 0
                                        ? "Select a rating"
                                        : `${rating} out of 5`}
                                </span>

                            </div>


                            {/* FEEDBACK TYPE */}

                            <div className="support-field">

                                <label htmlFor="type">
                                    Feedback Type
                                </label>

                                <div className="feedback-select-wrap">

                                    <select
                                        id="type"
                                        name="type"
                                        value={
                                            formData.type
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >

                                        {feedbackTypes.map(
                                            (type) => (

                                                <option
                                                    key={type}
                                                    value={type}
                                                >
                                                    {type}
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                            </div>


                            {/* ORDER ID */}

                            <div className="support-field">

                                <label htmlFor="orderId">
                                    Order ID
                                    <span>
                                        Optional
                                    </span>
                                </label>

                                <div className="support-input-wrap">

                                    <input
                                        id="orderId"
                                        name="orderId"
                                        type="text"
                                        value={
                                            formData.orderId
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Add an order ID if relevant"
                                    />

                                </div>

                            </div>


                            {/* MESSAGE */}

                            <div className="support-field">

                                <label htmlFor="message">
                                    Your Feedback
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    value={
                                        formData.message
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Tell us what worked well, what could be improved or what you'd like to see next..."
                                    rows="7"
                                    required
                                />

                            </div>


                            <div className="feedback-form-bottom">

                                <div className="feedback-guidance">

                                    <FaHeart />

                                    <span>
                                        Honest feedback helps us
                                        build a better experience.
                                    </span>

                                </div>


                                <button
                                    type="submit"
                                    className="support-submit-button"
                                >
                                    Submit Feedback
                                    <FaPaperPlane />
                                </button>

                            </div>

                        </form>

                    </div>


                    {/* SIDE INFO */}

                    <aside className="feedback-side-column">


                        <div className="feedback-side-card">

                            <div className="feedback-side-icon">
                                <FaLightbulb />
                            </div>

                            <span>
                                IDEAS MATTER
                            </span>

                            <h3>
                                Suggest something new
                            </h3>

                            <p>
                                Have an idea for a feature,
                                design improvement or shopping
                                experience upgrade? Tell us.
                            </p>

                        </div>


                        <div className="feedback-side-card">

                            <div className="feedback-side-icon">
                                <FaCommentDots />
                            </div>

                            <span>
                                NEED SUPPORT?
                            </span>

                            <h3>
                                Something went wrong?
                            </h3>

                            <p>
                                For an order issue or account
                                problem, contacting support is
                                usually the better option.
                            </p>

                            <Link
                                to="/contact-support"
                                className="help-link-button"
                            >
                                Contact Support
                                <span>→</span>
                            </Link>

                        </div>

                    </aside>

                </section>


                {/* =================================================
                    FOOTER NOTE
                ================================================= */}

                <div className="help-footer-note">

                    <span>
                        © 2026 NexaCart Premium
                    </span>

                    <span>
                        Your Feedback • Better Shopping
                    </span>

                </div>

            </div>

        </div>
    );
}

export default Feedback;
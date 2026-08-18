import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
    FaArrowLeft,
    FaCheckCircle,
    FaEnvelope,
    FaHeadset,
    FaLifeRing,
    FaPaperPlane,
    FaUser,
    FaSpinner,
} from "react-icons/fa";

import { sendSupportRequest } from "../../services/supportService";

import "../../styles/help.css";


function ContactSupport() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        orderId: "",
        subject: "",
        message: "",
    });

    const [submitted, setSubmitted] =
        useState(false);

    const [sending, setSending] =
        useState(false);


    // =========================================================
    // HANDLE INPUT CHANGE
    // =========================================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // =========================================================
    // RESET FORM
    // =========================================================

    const resetForm = () => {

        setSubmitted(false);

        setFormData({
            name: "",
            email: "",
            orderId: "",
            subject: "",
            message: "",
        });
    };


    // =========================================================
    // SUBMIT SUPPORT REQUEST
    // =========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (sending) {
            return;
        }


        // =====================================================
        // EXTRA FRONTEND VALIDATION
        // =====================================================

        if (!formData.name.trim()) {

            toast.error(
                "Please enter your name."
            );

            return;
        }


        if (!formData.email.trim()) {

            toast.error(
                "Please enter your email address."
            );

            return;
        }


        if (!formData.subject.trim()) {

            toast.error(
                "Please enter a subject."
            );

            return;
        }


        if (!formData.message.trim()) {

            toast.error(
                "Please describe your issue."
            );

            return;
        }


        try {

            setSending(true);


            // =================================================
            // SEND TO BACKEND
            // =================================================

            const { data } =
                await sendSupportRequest({
                    name:
                        formData.name.trim(),

                    email:
                        formData.email.trim(),

                    orderId:
                        formData.orderId.trim(),

                    subject:
                        formData.subject.trim(),

                    message:
                        formData.message.trim(),
                });


            // =================================================
            // SUCCESS
            // =================================================

            if (data?.success) {

                setSubmitted(true);

                toast.success(
                    "Support request sent successfully."
                );

            } else {

                toast.error(
                    data?.message ||
                    "Unable to send support request."
                );

            }

        } catch (error) {

            console.error(
                "Contact Support Error:",
                error
            );


            toast.error(
                error?.response?.data?.message ||
                "Unable to send support request. Please try again."
            );

        } finally {

            setSending(false);

        }
    };


    // =========================================================
    // SUCCESS SCREEN
    // =========================================================

    if (submitted) {

        return (
            <div className="help-page">

                <div className="help-container">

                    <section className="support-success-card">

                        <div className="support-success-icon">
                            <FaCheckCircle />
                        </div>

                        <span className="help-kicker">
                            SUPPORT REQUEST
                        </span>

                        <h1>
                            Message Sent Successfully
                        </h1>

                        <p>
                            Thank you for contacting NexaCart.
                            Your support request has been sent to
                            our support team. We will review the
                            information you provided and get back
                            to you using the email address you entered.
                        </p>

                        <div className="support-success-actions">

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
                                Send Another Message
                            </button>

                        </div>

                    </section>

                </div>

            </div>
        );
    }


    // =========================================================
    // MAIN PAGE
    // =========================================================

    return (

        <div className="help-page">

            <div className="help-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <section className="support-hero">

                    <Link
                        to="/help"
                        className="faq-back-link"
                    >
                        <FaArrowLeft />
                        Back to Help Center
                    </Link>


                    <div className="support-hero-content">

                        <div>

                            <span className="help-kicker">
                                NEXACART SUPPORT
                            </span>

                            <h1>
                                We're here to
                                <span>
                                    help you.
                                </span>
                            </h1>

                            <p>
                                Tell us what you need help with.
                                Share your order details when relevant
                                so we can understand the issue clearly.
                            </p>

                        </div>


                        <div className="support-hero-icon">
                            <FaHeadset />
                        </div>

                    </div>

                </section>


                {/* =================================================
                    SUPPORT GRID
                ================================================= */}

                <div className="support-layout">


                    {/* =================================================
                        FORM
                    ================================================= */}

                    <section className="support-form-card">

                        <div className="support-card-heading">

                            <span>
                                CONTACT SUPPORT
                            </span>

                            <h2>
                                How can we help?
                            </h2>

                            <p>
                                Fill in the details below and
                                describe your issue clearly.
                            </p>

                        </div>


                        <form
                            className="support-form"
                            onSubmit={handleSubmit}
                        >


                            {/* NAME */}

                            <div className="support-field">

                                <label htmlFor="name">
                                    Your Name
                                </label>

                                <div className="support-input-wrap">

                                    <FaUser />

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={
                                            formData.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter your name"
                                        autoComplete="name"
                                        required
                                        disabled={sending}
                                    />

                                </div>

                            </div>


                            {/* EMAIL */}

                            <div className="support-field">

                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <div className="support-input-wrap">

                                    <FaEnvelope />

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={
                                            formData.email
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter your email address"
                                        autoComplete="email"
                                        required
                                        disabled={sending}
                                    />

                                </div>

                            </div>


                            <div className="support-form-row">


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
                                            placeholder="e.g. #NX1024"
                                            disabled={sending}
                                        />

                                    </div>

                                </div>


                                {/* SUBJECT */}

                                <div className="support-field">

                                    <label htmlFor="subject">
                                        Subject
                                    </label>

                                    <div className="support-input-wrap">

                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            value={
                                                formData.subject
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="What do you need help with?"
                                            required
                                            disabled={sending}
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* MESSAGE */}

                            <div className="support-field">

                                <label htmlFor="message">
                                    Message
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
                                    placeholder="Describe your issue in detail..."
                                    rows="7"
                                    required
                                    disabled={sending}
                                />

                            </div>


                            <div className="support-form-bottom">

                                <div className="support-privacy-note">

                                    <FaLifeRing />

                                    <span>
                                        Please avoid sharing
                                        passwords, OTPs or
                                        sensitive payment details.
                                    </span>

                                </div>


                                <button
                                    type="submit"
                                    className="support-submit-button"
                                    disabled={sending}
                                >

                                    {sending ? (
                                        <>
                                            <FaSpinner
                                                className="support-spinner"
                                            />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <FaPaperPlane />
                                        </>
                                    )}

                                </button>

                            </div>

                        </form>

                    </section>


                    {/* =================================================
                        SUPPORT INFO
                    ================================================= */}

                    <aside className="support-side-column">


                        <div className="support-info-card">

                            <div className="support-info-icon">
                                <FaHeadset />
                            </div>

                            <span>
                                SUPPORT
                            </span>

                            <h3>
                                Need direct assistance?
                            </h3>

                            <p>
                                Share the issue you're facing
                                and include your order ID when
                                the request is related to an order.
                            </p>

                        </div>


                        <div className="support-info-card">

                            <div className="support-info-icon">
                                <FaEnvelope />
                            </div>

                            <span>
                                BEFORE YOU CONTACT US
                            </span>

                            <h3>
                                Check the FAQs first
                            </h3>

                            <p>
                                You may find a quick answer for
                                common questions about orders,
                                delivery, returns or payments.
                            </p>

                            <Link
                                to="/faq"
                                className="help-link-button"
                            >
                                Browse FAQs
                                <span>→</span>
                            </Link>

                        </div>


                    </aside>

                </div>


                {/* =================================================
                    FOOTER NOTE
                ================================================= */}

                <div className="help-footer-note">

                    <span>
                        © 2026 NexaCart Premium
                    </span>

                    <span>
                        Support • Privacy • Better Shopping
                    </span>

                </div>

            </div>

        </div>
    );
}

export default ContactSupport;
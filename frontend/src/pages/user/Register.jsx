import React, { useState } from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import { toast } from "react-toastify";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaArrowRight,
} from "react-icons/fa";

import { registerUser } from "../../services/authService";

import "../../styles/auth.css";


function Register() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });


    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);


    // =====================================================
    // CHANGE
    // =====================================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) {
            return;
        }

        try {

            setLoading(true);

            const { data } =
                await registerUser(formData);


            toast.success(data.message);


            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <main className="auth-page">


            <section className="auth-card">


                {/* LOGO */}

                <div className="auth-brand">

                    <div
                        className="navbar-premium-logo"
                        style={{
                            width: "54px",
                            height: "54px",
                        }}
                    >

                        <svg
                            className="navbar-brand-svg"
                            viewBox="0 0 120 120"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-label="NexaCart"
                            role="img"
                        >

                            <defs>

                                <linearGradient
                                    id="registerNexaGold"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="100%"
                                >

                                    <stop
                                        offset="0%"
                                        stopColor="#fff7cf"
                                    />

                                    <stop
                                        offset="22%"
                                        stopColor="#f6df92"
                                    />

                                    <stop
                                        offset="48%"
                                        stopColor="#d6ae55"
                                    />

                                    <stop
                                        offset="72%"
                                        stopColor="#fff0ae"
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#ae7b23"
                                    />

                                </linearGradient>

                            </defs>


                            <ellipse
                                cx="60"
                                cy="60"
                                rx="46"
                                ry="20"
                                fill="none"
                                stroke="#2d8cff"
                                strokeWidth="2.2"
                                opacity="0.82"
                                transform="rotate(-28 60 60)"
                            />


                            <ellipse
                                cx="60"
                                cy="60"
                                rx="46"
                                ry="20"
                                fill="none"
                                stroke="#eac467"
                                strokeWidth="1.8"
                                opacity="0.9"
                                transform="rotate(30 60 60)"
                            />


                            <text
                                x="60"
                                y="80"
                                textAnchor="middle"
                                fontSize="66"
                                fontWeight="900"
                                fontFamily="Georgia, 'Times New Roman', serif"
                                fill="url(#registerNexaGold)"
                                stroke="#f8e4a3"
                                strokeWidth="1.2"
                            >
                                N
                            </text>

                        </svg>

                    </div>

                </div>


                <span className="auth-eyebrow">
                    JOIN NEXACART
                </span>


                <h1 className="auth-title">
                    Create Your Account
                </h1>


                <p className="auth-subtitle">
                    Join NexaCart and start shopping
                    smarter with a better experience.
                </p>


                <form onSubmit={handleSubmit}>


                    {/* NAME */}

                    <div className="auth-form-group">

                        <label
                            className="auth-form-label"
                            htmlFor="register-name"
                        >
                            Full Name
                        </label>


                        <div className="auth-input-wrapper">

                            <FaUser
                                className="auth-input-icon"
                            />


                            <input
                                id="register-name"
                                type="text"
                                className="auth-input"
                                placeholder="Enter your full name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="name"
                                required
                            />

                        </div>

                    </div>


                    {/* EMAIL */}

                    <div className="auth-form-group">

                        <label
                            className="auth-form-label"
                            htmlFor="register-email"
                        >
                            Email
                        </label>


                        <div className="auth-input-wrapper">

                            <FaEnvelope
                                className="auth-input-icon"
                            />


                            <input
                                id="register-email"
                                type="email"
                                className="auth-input"
                                placeholder="Enter your email address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />

                        </div>

                    </div>


                    {/* PASSWORD */}

                    <div className="auth-form-group">

                        <label
                            className="auth-form-label"
                            htmlFor="register-password"
                        >
                            Password
                        </label>


                        <div className="auth-input-wrapper">

                            <FaLock
                                className="auth-input-icon"
                            />


                            <input
                                id="register-password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                className="auth-input auth-input-password"
                                placeholder="Create a password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                                required
                            />


                            <button
                                type="button"
                                className="auth-password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        (prev) =>
                                            !prev
                                    )
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >

                                {showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                                }

                            </button>

                        </div>

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="auth-submit-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Account..."
                            : "Create Account"
                        }

                        {!loading && (
                            <FaArrowRight />
                        )}

                    </button>

                </form>


                {/* LOGIN */}

                <p className="auth-switch">

                    Already have an account?{" "}

                    <Link to="/login">
                        Sign In
                    </Link>

                </p>


                <p className="auth-security-note">

                    Secure registration •
                    Your information is protected.

                </p>

            </section>

        </main>
    );
}


export default Register;
import React, { useState } from "react";

import useAuth from "../../hooks/useAuth";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaArrowRight,
} from "react-icons/fa";

import { loginUser } from "../../services/authService";

import "../../styles/auth.css";


function Login() {

    const navigate = useNavigate();

    const { setUser } = useAuth();


    const [formData, setFormData] = useState({
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
                await loginUser(formData);


            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            setUser(data.user);


            toast.success(data.message);


            navigate("/");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
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
                                    id="loginNexaGold"
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
                                fill="url(#loginNexaGold)"
                                stroke="#f8e4a3"
                                strokeWidth="1.2"
                            >
                                N
                            </text>

                        </svg>

                    </div>

                </div>


                <span className="auth-eyebrow">
                    NEXACART ACCOUNT
                </span>


                <h1 className="auth-title">
                    Welcome Back
                </h1>


                <p className="auth-subtitle">
                    Sign in to continue your shopping
                    experience with NexaCart.
                </p>


                <form onSubmit={handleSubmit}>


                    {/* EMAIL */}

                    <div className="auth-form-group">

                        <label
                            className="auth-form-label"
                            htmlFor="login-email"
                        >
                            Email
                        </label>


                        <div className="auth-input-wrapper">

                            <FaEnvelope
                                className="auth-input-icon"
                            />


                            <input
                                id="login-email"
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
                            htmlFor="login-password"
                        >
                            Password
                        </label>


                        <div className="auth-input-wrapper">

                            <FaLock
                                className="auth-input-icon"
                            />


                            <input
                                id="login-password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                className="auth-input auth-input-password"
                                placeholder="Enter your password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
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
                            ? "Signing In..."
                            : "Sign In"
                        }

                        {!loading && (
                            <FaArrowRight />
                        )}

                    </button>

                </form>


                {/* REGISTER */}

                <p className="auth-switch">

                    Don't have an account?{" "}

                    <Link to="/register">
                        Create Account
                    </Link>

                </p>


                <p className="auth-security-note">

                    Secure account access •
                    Your information is protected.

                </p>

            </section>

        </main>
    );
}


export default Login;
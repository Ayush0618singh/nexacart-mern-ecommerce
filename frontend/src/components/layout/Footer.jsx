import React from "react";
import { toast } from "react-toastify";

import {
    subscribeNewsletter,
} from "../../services/newsletterService";

import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    SiGmail,
    SiRazorpay,
} from "react-icons/si";

import {
    FaMapMarkerAlt,
    FaArrowRight,
    FaLinkedinIn,
} from "react-icons/fa";

import "../../styles/Footer.css";
import offerProductsCollage from "../../assets/images/offer-products-collage.png";


function Footer() {

    const location = useLocation();
    const navigate = useNavigate();


    // =====================================================
    // SPECIAL PAGE CHECKS
    // =====================================================

    const isProfilePage =
        location.pathname === "/profile";

    const isCartPage =
        location.pathname === "/cart";

    const isCheckoutPage =
        location.pathname === "/checkout";

    const isOrdersPage =
        location.pathname === "/orders";

    const isWishlistPage =
        location.pathname === "/wishlist";

    const [newsletterEmail, setNewsletterEmail] =
        React.useState("");

    const [newsletterLoading, setNewsletterLoading] =
        React.useState(false);

    const isProductDetailsPage =
        location.pathname.startsWith("/product/");

    const isLoginPage =
        location.pathname === "/login";

    const isRegisterPage =
        location.pathname === "/register";

    // =====================================================
    // HIDE COMPLETE FOOTER
    // ON FOCUSED PAGES
    // =====================================================

    if (
        isProfilePage ||
        isCartPage ||
        isCheckoutPage ||
        isOrdersPage ||
        isWishlistPage ||
        isLoginPage ||
        isRegisterPage
    ) {
        return null;
    }

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!newsletterEmail.trim()) {

            toast.error(
                "Please enter your email address."
            );

            return;
        }


        try {

            setNewsletterLoading(true);


            const { data } =
                await subscribeNewsletter(
                    newsletterEmail
                );


            toast.success(
                data.message ||
                "Subscribed successfully!"
            );


            setNewsletterEmail("");

        } catch (error) {

            console.error(
                error
            );


            toast.error(
                error.response?.data?.message ||
                "Unable to subscribe."
            );

        } finally {

            setNewsletterLoading(false);

        }

    };


    // =====================================================
    // REUSABLE NEXACART LOGO
    // Same visual identity as BIG SALE logo
    // =====================================================

    const NexaCartLogo = ({
        className = "",
        size = "normal",
    }) => {

        return (
            <svg
                className={`${className} ${size === "small"
                    ? "nexacart-logo-small"
                    : "nexacart-logo-normal"
                    }`}
                viewBox="0 0 120 120"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="NexaCart"
                role="img"
            >

                <defs>

                    <linearGradient
                        id={`nexaGold-${size}`}
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


                    <filter
                        id={`nexaGlow-${size}`}
                        x="-80%"
                        y="-80%"
                        width="260%"
                        height="260%"
                    >

                        <feGaussianBlur
                            stdDeviation={
                                size === "small"
                                    ? "2.5"
                                    : "4"
                            }
                            result="blur"
                        />

                        <feMerge>

                            <feMergeNode in="blur" />

                            <feMergeNode in="SourceGraphic" />

                        </feMerge>

                    </filter>


                    <filter
                        id={`goldGlow-${size}`}
                        x="-80%"
                        y="-80%"
                        width="260%"
                        height="260%"
                    >

                        <feGaussianBlur
                            stdDeviation={
                                size === "small"
                                    ? "1.8"
                                    : "2.5"
                            }
                            result="goldBlur"
                        />

                        <feMerge>

                            <feMergeNode in="goldBlur" />

                            <feMergeNode in="SourceGraphic" />

                        </feMerge>

                    </filter>

                </defs>


                {/* BLUE ORBIT */}

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
                    filter={`url(#nexaGlow-${size})`}
                />


                {/* GOLD ORBIT */}

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
                    filter={`url(#goldGlow-${size})`}
                />


                {/* N */}

                <text
                    x="60"
                    y="80"
                    textAnchor="middle"
                    fontSize="66"
                    fontWeight="900"
                    fontFamily="Georgia, 'Times New Roman', serif"
                    fill={`url(#nexaGold-${size})`}
                    stroke="#f8e4a3"
                    strokeWidth="1.2"
                    filter={`url(#goldGlow-${size})`}
                >
                    N
                </text>


                {/* BLUE DOT */}

                <circle
                    cx="21"
                    cy="47"
                    r="2.2"
                    fill="#62a8ff"
                    filter={`url(#nexaGlow-${size})`}
                />


                {/* GOLD DOT */}

                <circle
                    cx="95"
                    cy="36"
                    r="1.8"
                    fill="#ffd96f"
                    filter={`url(#goldGlow-${size})`}
                />


                {/* BLUE DOT */}

                <circle
                    cx="91"
                    cy="88"
                    r="1.7"
                    fill="#62a8ff"
                    filter={`url(#nexaGlow-${size})`}
                />

            </svg>
        );
    };


    // =====================================================
    // NORMAL FOOTER
    // =====================================================

    return (

        <footer
            className={`footer ${
                isProductDetailsPage
                    ? "footer-product-details"
                    : ""
            }`}
        >


            {/* =================================================
                PREMIUM OFFER BANNER

                SHOWN:
                Home
                Products
                Other normal pages

                HIDDEN:
                Product Details
            ================================================= */}

            {!isProductDetailsPage && (

                <div className="footer-offer">


                    {/* =================================================
                        LOGO
                    ================================================= */}

                    <div className="offer-brand">

                        <div className="offer-logo-glow">
                        </div>


                        <NexaCartLogo
                            className="offer-logo-svg"
                            size="normal"
                        />

                    </div>


                    {/* =================================================
                        OFFER CONTENT
                    ================================================= */}

                    <div className="offer-content">

                        <span className="offer-small">
                            LIMITED TIME OFFER
                        </span>


                        <h2>

                            BIG SALE

                            <span className="offer-dash">
                                {" "}–{" "}
                            </span>

                            <span className="offer-white">
                                UP TO 50% OFF
                            </span>

                        </h2>


                        <p>
                            Grab your favorite products at amazing prices.
                            Don't miss out on these special offers.
                        </p>


                        <button
                            type="button"
                            className="offer-btn"
                            onClick={() => navigate("/products")}
                        >
                            <span>
                                Shop Now
                            </span>

                            <FaArrowRight />
                        </button>

                    </div>


                    {/* =================================================
                        OFFER PRODUCT IMAGE
                    ================================================= */}

                    <div className="offer-product-visual">

                        <img
                            src={offerProductsCollage}
                            alt="NexaCart products"
                        />

                    </div>


                    {/* =================================================
                        IMAGE BLEND
                    ================================================= */}

                    <div className="offer-product-overlay">
                    </div>

                </div>

            )}


            {/* =================================================
                NEWSLETTER

                HIDDEN ON PRODUCT DETAILS
            ================================================= */}

            {!isProductDetailsPage && (

                <div className="footer-newsletter">

                    <div className="newsletter-icon">
                        ✉
                    </div>


                    <div className="newsletter-content">

                        <span>
                            STAY UPDATED
                        </span>


                        <h2>
                            Subscribe To Our Newsletter
                        </h2>


                        <p>
                            Get the latest products, offers and updates
                            directly in your inbox.
                        </p>

                    </div>


                    <form
                        className="newsletter-form"
                        onSubmit={handleNewsletterSubmit}
                    >

                       <input
                            type="email"
                            placeholder="Enter your email address"
                            value={newsletterEmail}
                            onChange={(e) =>
                                setNewsletterEmail(
                                    e.target.value
                                )
                            }
                            disabled={newsletterLoading}
                        />

                        <button
                            type="submit"
                            disabled={newsletterLoading}
                        >
                            <span>
                                {newsletterLoading
                                    ? "Subscribing..."
                                    : "Subscribe"}
                            </span>

                            {!newsletterLoading && (
                                <FaArrowRight />
                            )}
                        </button>

                    </form>

                </div>

            )}


            {/* =================================================
                MAIN FOOTER
            ================================================= */}

            <div className="footer-main">


                {/* =================================================
                    BRAND
                ================================================= */}

                <div className="footer-column footer-brand">


                    {/* =================================================
                        SAME NEXACART LOGO
                        AS BIG SALE
                    ================================================= */}

                    <div className="footer-logo-premium">

                        <NexaCartLogo
                            className="footer-brand-svg"
                            size="small"
                        />

                    </div>


                    {/* =================================================
                        BRAND NAME
                    ================================================= */}

                    <div className="footer-brand-name">

                        <strong>
                            NexaCart
                        </strong>

                    </div>


                    {/* =================================================
                        BRAND DESCRIPTION
                    ================================================= */}

                    <p className="brand-description">

                        Thoughtfully selected products,
                        secure payments and a shopping
                        experience designed around you.

                    </p>


                    {/* =================================================
                        SOCIAL TITLE
                    ================================================= */}

                    <h4 className="follow-title">
                        Stay Connected
                    </h4>


                    {/* =================================================
                        SOCIAL LINKS
                    ================================================= */}

                    <div className="footer-social">


                        {/* GMAIL */}

                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=ayush0618singh@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gmail-icon"
                            title="Gmail"
                        >

                            <svg
                                className="gmail-brand-svg"
                                viewBox="0 0 64 48"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                focusable="false"
                            >

                                {/* WHITE BASE */}

                                <rect
                                    x="0"
                                    y="0"
                                    width="64"
                                    height="48"
                                    rx="2"
                                    fill="#FFFFFF"
                                />


                                {/* LEFT BLUE */}

                                <path
                                    d="
                                        M4 18
                                        L18 28
                                        L18 44
                                        H8
                                        C5.8 44 4 42.2 4 40
                                        Z
                                    "
                                    fill="#4285F4"
                                />


                                {/* LEFT RED */}

                                <path
                                    d="
                                        M4 18
                                        L4 8
                                        C4 5.8 5.8 4 8 4
                                        C9.4 4 10.8 4.5 12 5.4
                                        L18 9.8
                                        L18 28
                                        Z
                                    "
                                    fill="#C5221F"
                                />


                                {/* CENTER RED M */}

                                <path
                                    d="
                                        M12 5.4
                                        L32 21
                                        L52 5.4
                                        L58 9.8
                                        L32 30
                                        L6 9.8
                                        Z
                                    "
                                    fill="#EA4335"
                                />


                                {/* RIGHT YELLOW */}

                                <path
                                    d="
                                        M52 5.4
                                        C53.2 4.5 54.6 4 56 4
                                        C58.2 4 60 5.8 60 8
                                        V18
                                        L46 28
                                        V9.8
                                        Z
                                    "
                                    fill="#FBBC04"
                                />


                                {/* RIGHT GREEN */}

                                <path
                                    d="
                                        M46 28
                                        L60 18
                                        V40
                                        C60 42.2 58.2 44 56 44
                                        H46
                                        Z
                                    "
                                    fill="#34A853"
                                />


                                {/* WHITE INNER */}

                                <path
                                    d="
                                        M18 28
                                        L32 39
                                        L46 28
                                        V44
                                        H18
                                        Z
                                    "
                                    fill="#FFFFFF"
                                />

                            </svg>

                        </a>


                        {/* LINKEDIN */}

                        <a
                            href="https://www.linkedin.com/in/ayush-singh0618/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="linkedin-icon"
                            title="LinkedIn"
                        >

                            <FaLinkedinIn />

                        </a>

                    </div>

                </div>


                {/* =================================================
                    QUICK LINKS
                ================================================= */}

                <div className="footer-column">

                    <h4>
                        Quick Links
                    </h4>


                    <Link to="/">
                        <span>›</span>
                        Home
                    </Link>


                    <Link to="/products">
                        <span>›</span>
                        Products
                    </Link>


                    <Link to="/cart">
                        <span>›</span>
                        Cart
                    </Link>


                    <Link to="/wishlist">
                        <span>›</span>
                        Wishlist
                    </Link>


                    <Link to="/profile">
                        <span>›</span>
                        My Profile
                    </Link>

                </div>


                {/* =================================================
                    CUSTOMER SERVICE
                ================================================= */}

                <div className="footer-column">

                    <h4>
                        Customer Service
                    </h4>


                    <Link to="/help">
                        <span>›</span>
                        Help Center
                    </Link>


                    <Link to="/faq">
                        <span>›</span>
                        Browse FAQs
                    </Link>


                    <Link to="/contact-support">
                        <span>›</span>
                        Contact Support
                    </Link>


                    <Link to="/orders">
                        <span>›</span>
                        My Orders
                    </Link>


                    <Link to="/shipping-policy">
                        <span>›</span>
                        Shipping & Delivery
                    </Link>


                    <Link to="/return-policy">
                        <span>›</span>
                        Returns & Refunds
                    </Link>

                </div>


                {/* =================================================
                    INFORMATION
                ================================================= */}

                <div className="footer-column">

                    <h4>
                        Information
                    </h4>


                    <Link to="/payment-security">
                        <span>›</span>
                        Payment & Security
                    </Link>


                    <Link to="/privacy-policy">
                        <span>›</span>
                        Privacy Policy
                    </Link>


                    <Link to="/terms">
                        <span>›</span>
                        Terms & Conditions
                    </Link>


                    <Link to="/feedback">
                        <span>›</span>
                        Feedback & Suggestions
                    </Link>


                    <Link to="/licenses">
                        <span>›</span>
                        Licenses & Credits
                    </Link>


                    <Link to="/profile">
                        <span>›</span>
                        Account & Profile
                    </Link>

                </div>


                {/* =================================================
                    CONTACT
                    HIDDEN ON PRODUCT DETAILS
                ================================================= */}

                {!isProductDetailsPage && (

                    <div className="footer-column footer-contact">

                        <h4>
                            Contact Us
                        </h4>


                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=ayush0618singh@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-email-link"
                        >

                            <SiGmail />

                            <span>
                                ayush0618singh@gmail.com
                            </span>

                        </a>


                        <p>

                            <FaMapMarkerAlt />

                            <span>
                                Noida, Uttar Pradesh, India
                            </span>

                        </p>


                        <p className="support-line">

                            <span>
                                24×7 Customer Support
                            </span>

                        </p>


                        <p className="support-hours">

                            We're here to make your shopping
                            experience simple, secure and
                            hassle-free.

                        </p>


                        <div className="contact-payments">

                            <span className="secure-payment-label">
                                Secure Payments
                            </span>


                            <div className="payment-logo razorpay">

                                <SiRazorpay />

                                <span>
                                    Razorpay
                                </span>

                            </div>


                            <div className="payment-logo upi-payment">

                                <span>
                                    UPI
                                </span>

                            </div>

                        </div>

                    </div>

                )}

            </div>


            {/* =================================================
                BOTTOM FOOTER
            ================================================= */}

            <div className="footer-bottom">

                <p className="footer-copyright">

                    <span>
                        © 2026
                    </span>


                    <span className="copyright-dot">
                        •
                    </span>


                    <span className="copyright-brand">

                        <span className="copyright-nexa">
                            Nexa
                        </span>

                        <span className="copyright-cart">
                            Cart
                        </span>

                    </span>

                    <span className="copyright-premium">
                        Premium
                    </span>

                    <span className="copyright-dot">
                        •
                    </span>

                     <span className="crafted-by">
                        Crafted by Ayush Singh
                    </span>


                    <span>
                        |
                    </span>


                    <span>
                        Experience Uncompromising Quality
                    </span>


                    <span>
                        •
                    </span>


                    <span>
                        All rights reserved.
                    </span>

                </p>

            </div>

        </footer>
    );
}


export default Footer;
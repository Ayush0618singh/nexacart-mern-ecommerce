 import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Link,
    useNavigate,
    useLocation,
} from "react-router-dom";

import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

import {
    FaSearch,
    FaHeart,
    FaShoppingBag,
    FaChevronDown,
    FaUser,
    FaBoxOpen,
    FaTachometerAlt,
    FaSignOutAlt,
    FaShoppingCart,
} from "react-icons/fa";

import { getAllProducts } from "../../services/productService";

import "../../styles/navbar.css";


function Navbar() {

    const { user, setUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();


    // =========================================================
    // SEARCH STATE
    // =========================================================

    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);


    // =========================================================
    // NAVBAR STATE
    // =========================================================

    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [profileOpen, setProfileOpen] = useState(false);


    // =========================================================
    // REFS
    // =========================================================

    const searchWrapperRef = useRef(null);
    const profileWrapperRef = useRef(null);


    // =========================================================
    // CART + WISHLIST COUNTS
    // =========================================================

    useEffect(() => {

        const fetchNavbarCounts = async () => {

            if (!user) {
                setCartCount(0);
                setWishlistCount(0);
                return;
            }

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    setCartCount(0);
                    setWishlistCount(0);
                    return;
                }


                // =================================================
                // CART COUNT
                // =================================================

                const cartResponse = await fetch(
                    "http://localhost:5000/api/cart",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );


                if (cartResponse.ok) {

                    const cartData =
                        await cartResponse.json();

                    setCartCount(
                        cartData.count || 0
                    );
                }


                // =================================================
                // WISHLIST COUNT
                // =================================================

                const wishlistResponse =
                    await fetch(
                        "http://localhost:5000/api/wishlist",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );


                if (wishlistResponse.ok) {

                    const wishlistData =
                        await wishlistResponse.json();

                    setWishlistCount(
                        wishlistData.count || 0
                    );
                }

            } catch (error) {

                console.error(
                    "Navbar count fetch error:",
                    error
                );

                setCartCount(0);
                setWishlistCount(0);
            }
        };


        fetchNavbarCounts();

    }, [user]);


    // =========================================================
    // LIVE SEARCH SUGGESTIONS
    // =========================================================

    useEffect(() => {

        const query =
            search.trim();


        if (!query) {

            setSuggestions([]);
            setShowSuggestions(false);
            setSearchLoading(false);

            return;
        }


        const timer =
            setTimeout(
                async () => {

                    try {

                        setSearchLoading(true);


                        const { data } =
                            await getAllProducts({
                                page: 1,
                                limit: 6,
                                keyword: query,
                            });


                        setSuggestions(
                            data.products || []
                        );

                        setShowSuggestions(true);

                    } catch (error) {

                        console.error(
                            "Search Suggestions Error:",
                            error
                        );

                        setSuggestions([]);
                        setShowSuggestions(false);

                    } finally {

                        setSearchLoading(false);
                    }

                },
                300
            );


        return () =>
            clearTimeout(timer);

    }, [search]);


    // =========================================================
    // CLOSE SEARCH SUGGESTIONS ON OUTSIDE CLICK
    // =========================================================

    useEffect(() => {

        const handleSearchOutsideClick =
            (event) => {

                if (
                    searchWrapperRef.current &&
                    !searchWrapperRef.current.contains(
                        event.target
                    )
                ) {

                    setShowSuggestions(false);
                }
            };


        document.addEventListener(
            "mousedown",
            handleSearchOutsideClick
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleSearchOutsideClick
            );

        };

    }, []);


    // =========================================================
    // CLOSE PROFILE DROPDOWN ON OUTSIDE CLICK
    // =========================================================

    useEffect(() => {

        const handleProfileOutsideClick =
            (event) => {

                if (
                    profileWrapperRef.current &&
                    !profileWrapperRef.current.contains(
                        event.target
                    )
                ) {

                    setProfileOpen(false);
                }
            };


        document.addEventListener(
            "mousedown",
            handleProfileOutsideClick
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleProfileOutsideClick
            );

        };

    }, []);


    // =========================================================
    // CLOSE PROFILE DROPDOWN ON ROUTE CHANGE
    // =========================================================

    useEffect(() => {

        setProfileOpen(false);
        setShowSuggestions(false);

    }, [location.pathname]);


    // =========================================================
    // CLOSE PROFILE DROPDOWN WITH ESC
    // =========================================================

    useEffect(() => {

        const handleEscapeKey =
            (event) => {

                if (
                    event.key === "Escape"
                ) {

                    setProfileOpen(false);
                    setShowSuggestions(false);
                }
            };


        document.addEventListener(
            "keydown",
            handleEscapeKey
        );


        return () => {

            document.removeEventListener(
                "keydown",
                handleEscapeKey
            );

        };

    }, []);


    // =========================================================
    // SUGGESTION CLICK
    // =========================================================

    const handleSuggestionClick =
        (product) => {

            setShowSuggestions(false);

            if (!product?._id) {
                return;
            }

            navigate(
                `/product/${product._id}`
            );
        };


    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        setUser(null);

        setProfileOpen(false);

        toast.success(
            "Logout Successfully"
        );

        navigate("/login");
    };


    // =========================================================
    // SEARCH SUBMIT
    // =========================================================

    const handleSearch = (e) => {

        e.preventDefault();

        const query =
            search.trim();


        if (!query) {

            navigate("/products");

            setShowSuggestions(false);

            return;
        }


        navigate(
            `/products?search=${encodeURIComponent(
                query
            )}`
        );


        setShowSuggestions(false);
    };


    // =========================================================
    // PROFILE TOGGLE
    // =========================================================

    const handleProfileToggle =
        () => {

            setProfileOpen(
                (prev) => !prev
            );
        };


    return (

        <nav className="main-navbar">

            <div className="navbar-container">


                {/* =================================================
                    LOGO
                ================================================= */}

                <Link
                    to="/"
                    className="navbar-logo"
                    aria-label="NexaCart Home"
                >

                    <div className="navbar-premium-logo">

                        <svg
                            className="navbar-brand-svg"
                            viewBox="0 0 120 120"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-label="NexaCart"
                            role="img"
                        >

                            <defs>

                                <linearGradient
                                    id="navbarNexaGold"
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
                                    id="navbarNexaGlow"
                                    x="-80%"
                                    y="-80%"
                                    width="260%"
                                    height="260%"
                                >

                                    <feGaussianBlur
                                        stdDeviation="3"
                                        result="blur"
                                    />

                                    <feMerge>

                                        <feMergeNode in="blur" />

                                        <feMergeNode in="SourceGraphic" />

                                    </feMerge>

                                </filter>


                                <filter
                                    id="navbarGoldGlow"
                                    x="-80%"
                                    y="-80%"
                                    width="260%"
                                    height="260%"
                                >

                                    <feGaussianBlur
                                        stdDeviation="2"
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
                                filter="url(#navbarNexaGlow)"
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
                                filter="url(#navbarGoldGlow)"
                            />


                            {/* N */}

                            <text
                                x="60"
                                y="80"
                                textAnchor="middle"
                                fontSize="66"
                                fontWeight="900"
                                fontFamily="Georgia, 'Times New Roman', serif"
                                fill="url(#navbarNexaGold)"
                                stroke="#f8e4a3"
                                strokeWidth="1.2"
                                filter="url(#navbarGoldGlow)"
                            >
                                N
                            </text>


                            {/* BLUE DOT */}

                            <circle
                                cx="21"
                                cy="47"
                                r="2.2"
                                fill="#62a8ff"
                                filter="url(#navbarNexaGlow)"
                            />


                            {/* GOLD DOT */}

                            <circle
                                cx="95"
                                cy="36"
                                r="1.8"
                                fill="#ffd96f"
                                filter="url(#navbarGoldGlow)"
                            />


                            {/* BLUE DOT */}

                            <circle
                                cx="91"
                                cy="88"
                                r="1.7"
                                fill="#62a8ff"
                                filter="url(#navbarNexaGlow)"
                            />

                        </svg>

                    </div>


                    <span className="logo-text">

                        <span className="logo-text-nexa">
                            Nexa
                        </span>

                        <span className="logo-text-cart">
                            Cart
                        </span>

                    </span>

                </Link>


                {/* =================================================
                    SEARCH
                ================================================= */}

                <div
                    className="navbar-search-wrapper"
                    ref={searchWrapperRef}
                >

                    <form
                        className="navbar-search"
                        onSubmit={handleSearch}
                    >

                        <span className="search-icon">
                            <FaSearch />
                        </span>


                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => {

                                setSearch(
                                    e.target.value
                                );

                                setShowSuggestions(
                                    true
                                );

                            }}
                            onFocus={() => {

                                if (
                                    search.trim()
                                ) {

                                    setShowSuggestions(
                                        true
                                    );
                                }

                            }}
                        />


                        <button
                            type="submit"
                            aria-label="Search products"
                        >
                            Search
                        </button>

                    </form>


                    {/* =================================================
                        SEARCH SUGGESTIONS
                    ================================================= */}

                    {showSuggestions &&
                        search.trim() && (

                            <div className="search-suggestions">


                                {/* LOADING */}

                                {searchLoading ? (

                                    <div className="search-suggestion-loading">
                                        Searching products...
                                    </div>

                                ) : suggestions.length > 0 ? (


                                    /* RESULTS */

                                    suggestions.map(
                                        (product) => (

                                            <button
                                                type="button"
                                                key={product._id}
                                                className="search-suggestion-item"
                                                onClick={() =>
                                                    handleSuggestionClick(
                                                        product
                                                    )
                                                }
                                            >

                                                {/* IMAGE */}

                                                <div className="search-suggestion-image">

                                                    <img
                                                        src={
                                                            product.images?.length > 0
                                                                ? product.images[0]
                                                                : "https://placehold.co/60x60"
                                                        }
                                                        alt={
                                                            product.name ||
                                                            "Product"
                                                        }
                                                        onError={(e) => {

                                                            e.currentTarget.src =
                                                                "https://placehold.co/60x60";

                                                        }}
                                                    />

                                                </div>


                                                {/* PRODUCT INFO */}

                                                <div className="search-suggestion-content">

                                                    <span className="search-suggestion-name">
                                                        {product.name}
                                                    </span>

                                                    <span className="search-suggestion-brand">
                                                        {product.brand ||
                                                            "NexaCart"}
                                                    </span>

                                                </div>


                                                {/* PRICE */}

                                                <span className="search-suggestion-price">

                                                    ₹ {product.price}

                                                </span>

                                            </button>

                                        )
                                    )

                                ) : (

                                    <div className="search-suggestion-empty">
                                        No matching products found
                                    </div>

                                )}

                            </div>

                        )}

                </div>


                {/* =================================================
                    MAIN NAVIGATION
                ================================================= */}

                <div className="navbar-actions">


                    {/* HOME */}

                    <Link
                        to="/"
                        className="navbar-link"
                    >
                        Home
                    </Link>


                    {/* PRODUCTS */}

                    <Link
                        to="/products"
                        className="navbar-link"
                    >
                        Products
                    </Link>


                    {/* WISHLIST */}

                    <Link
                        to="/wishlist"
                        className="navbar-icon-link navbar-badge-link"
                        title="Wishlist"
                        aria-label={`Wishlist ${wishlistCount}`}
                    >

                        <span className="nav-icon">
                            <FaHeart />
                        </span>

                        <span className="nav-count-badge">
                            {wishlistCount}
                        </span>

                    </Link>


                    {/* CART */}

                    <Link
                        to="/cart"
                        className="navbar-icon-link navbar-badge-link"
                        title="Cart"
                        aria-label={`Cart ${cartCount}`}
                    >

                        <span className="nav-icon">
                            <FaShoppingBag />
                        </span>

                        <span className="nav-count-badge">
                            {cartCount}
                        </span>

                    </Link>


                    {/* =================================================
                        PROFILE
                    ================================================= */}

                    {user ? (

                        <div
                            className="profile-wrapper"
                            ref={profileWrapperRef}
                        >


                            {/* PROFILE BUTTON */}

                            <button
                                type="button"
                                className={`navbar-profile ${
                                    profileOpen
                                        ? "profile-active"
                                        : ""
                                }`}
                                onClick={
                                    handleProfileToggle
                                }
                                aria-expanded={
                                    profileOpen
                                }
                                aria-haspopup="menu"
                                aria-label="Open profile menu"
                            >

                                <span className="profile-avatar">

                                    {user?.profileImage ? (

                                        <img
                                            src={
                                                user.profileImage
                                            }
                                            alt={
                                                user?.name ||
                                                "Profile"
                                            }
                                            onError={(e) => {

                                                e.currentTarget.style.display =
                                                    "none";

                                            }}
                                        />

                                    ) : (

                                        user?.name
                                            ?.charAt(0)
                                            ?.toUpperCase() ||
                                        "U"

                                    )}

                                </span>


                                <FaChevronDown
                                    className={`profile-arrow ${
                                        profileOpen
                                            ? "rotate"
                                            : ""
                                    }`}
                                />

                            </button>


                            {/* =================================================
                                PROFILE DROPDOWN
                            ================================================= */}

                            {profileOpen && (

                                <div
                                    className="profile-dropdown"
                                    role="menu"
                                >


                                    {/* ACCOUNT */}

                                    <Link
                                        to="/profile"
                                        className="profile-dropdown-item"
                                        role="menuitem"
                                        onClick={() =>
                                            setProfileOpen(
                                                false
                                            )
                                        }
                                    >

                                        <FaUser />

                                        <span>
                                            Account Profile
                                        </span>

                                    </Link>


                                    {/* ORDERS */}

                                    <Link
                                        to="/orders"
                                        className="profile-dropdown-item"
                                        role="menuitem"
                                        onClick={() =>
                                            setProfileOpen(
                                                false
                                            )
                                        }
                                    >

                                        <FaBoxOpen />

                                        <span>
                                            My Orders
                                        </span>

                                    </Link>


                                    {/* ADMIN */}

                                    {user?.role ===
                                        "admin" && (

                                        <>

                                            <div
                                                className="dropdown-divider"
                                            />


                                            <Link
                                                to="/admin/dashboard"
                                                className="profile-dropdown-item admin-dropdown-item"
                                                role="menuitem"
                                                onClick={() =>
                                                    setProfileOpen(
                                                        false
                                                    )
                                                }
                                            >

                                                <FaTachometerAlt />

                                                <span>
                                                    Admin Dashboard
                                                </span>

                                            </Link>


                                            <Link
                                                to="/admin/products"
                                                className="profile-dropdown-item admin-dropdown-item"
                                                role="menuitem"
                                                onClick={() =>
                                                    setProfileOpen(
                                                        false
                                                    )
                                                }
                                            >

                                                <FaShoppingCart />

                                                <span>
                                                    Manage Products
                                                </span>

                                            </Link>

                                        </>

                                    )}


                                    <div
                                        className="dropdown-divider"
                                    />


                                    {/* LOGOUT */}

                                    <button
                                        type="button"
                                        className="profile-dropdown-item logout-dropdown-item"
                                        onClick={
                                            handleLogout
                                        }
                                    >

                                        <FaSignOutAlt />

                                        <span>
                                            Logout
                                        </span>

                                    </button>

                                </div>

                            )}

                        </div>

                    ) : (

                        <>

                            <Link
                                to="/login"
                                className="navbar-link"
                            >
                                Login
                            </Link>


                            <Link
                                to="/register"
                                className="navbar-register"
                            >
                                Register
                            </Link>

                        </>

                    )}

                </div>

            </div>

        </nav>
    );
}


export default Navbar;
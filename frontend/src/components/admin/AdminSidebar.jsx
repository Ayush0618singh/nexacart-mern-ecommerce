import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
    FaTachometerAlt,
    FaBoxOpen,
    FaTags,
    FaShoppingCart,
    FaUsers,
    FaStar,
    FaArrowLeft,
    FaCog,
    FaTicketAlt,
    FaUserCircle,
} from "react-icons/fa";

import "../../styles/admin.css";

function AdminSidebar() {

    const navigate = useNavigate();

    const menu = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: <FaTachometerAlt />,
        },
        {
            name: "Products",
            path: "/admin/products",
            icon: <FaBoxOpen />,
        },
        {
            name: "Categories",
            path: "/admin/categories",
            icon: <FaTags />,
        },
        {
            name: "Orders",
            path: "/admin/orders",
            icon: <FaShoppingCart />,
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: <FaUsers />,
        },
        {
            name: "Reviews",
            path: "/admin/reviews",
            icon: <FaStar />,
        },
        {
            name: "Coupons",
            path: "/admin/coupons",
            icon: <FaTicketAlt />,
        },
        {
            name: "Settings",
            path: "/admin/settings",
            icon: <FaCog />,
        },
        {
            name: "Profile",
            path: "/admin/profile",
            icon: <FaUserCircle />,
        },
    ];

    return (
        <aside className="admin-sidebar">

            {/* BRAND */}

            <div className="admin-sidebar-brand">
                <div className="admin-brand-left">
                    <div className="admin-brand-icon">
                        <svg
                            className="admin-brand-svg"
                            viewBox="0 0 120 120"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-label="NexaCart"
                            role="img"
                        >

                            <defs>

                                <linearGradient
                                    id="adminNexaGold"
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
                                    id="adminNexaGlow"
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
                                    id="adminGoldGlow"
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
                                filter="url(#adminNexaGlow)"
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
                                filter="url(#adminGoldGlow)"
                            />


                            {/* N */}

                            <text
                                x="60"
                                y="80"
                                textAnchor="middle"
                                fontSize="66"
                                fontWeight="900"
                                fontFamily="Georgia, 'Times New Roman', serif"
                                fill="url(#adminNexaGold)"
                                stroke="#f8e4a3"
                                strokeWidth="1.2"
                                filter="url(#adminGoldGlow)"
                            >
                                N
                            </text>


                            {/* BLUE DOT */}

                            <circle
                                cx="21"
                                cy="47"
                                r="2.2"
                                fill="#62a8ff"
                                filter="url(#adminNexaGlow)"
                            />


                            {/* GOLD DOT */}

                            <circle
                                cx="95"
                                cy="36"
                                r="1.8"
                                fill="#ffd96f"
                                filter="url(#adminGoldGlow)"
                            />


                            {/* BLUE DOT */}

                            <circle
                                cx="91"
                                cy="88"
                                r="1.7"
                                fill="#62a8ff"
                                filter="url(#adminNexaGlow)"
                            />

                        </svg>

                    </div>


                    <span className="admin-brand-name">
                        NexaCart
                    </span>

                </div>

                <button
                    type="button"
                    className="admin-brand-settings"
                    title="Settings"
                    aria-label="Open settings"
                    onClick={() =>
                        navigate("/admin/settings")
                    }
                >
                    <FaCog />
                </button>

            </div>


            {/* NAVIGATION */}

            <nav className="admin-sidebar-nav">

                {menu.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `admin-sidebar-link ${
                                isActive
                                    ? "active"
                                    : ""
                            }`
                        }
                    >
                        <span className="admin-sidebar-icon">
                            {item.icon}
                        </span>

                        <span className="admin-sidebar-label">
                            {item.name}
                        </span>
                    </NavLink>
                ))}

            </nav>


            <div className="admin-sidebar-spacer" />


            {/* BACK TO WEBSITE */}

            <div className="admin-sidebar-footer">

                <NavLink
                    to="/"
                    className="admin-back-link"
                >
                    <span className="admin-sidebar-icon">
                        <FaArrowLeft />
                    </span>

                    <span className="admin-sidebar-label">
                        Back To Website
                    </span>
                </NavLink>

            </div>

        </aside>
    );
}

export default AdminSidebar;
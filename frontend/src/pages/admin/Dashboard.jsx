import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../../styles/dashboard.css";

import { getDashboardStats } from "../../services/adminService";
import { AuthContext } from "../../context/AuthContext";

import {
    FaBoxOpen,
    FaList,
    FaShoppingCart,
    FaUsers,
    FaDollarSign,
    FaStar,
    FaTruck,
    FaSearch,
    FaDownload,
    FaPlus,
    FaUserCog,
    FaCog,
    FaExclamationTriangle,
    FaBell,
    FaUser,
    FaSignOutAlt,
    FaArrowUp,
} from "react-icons/fa";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

import {
    Line,
    Doughnut,
} from "react-chartjs-2";

 
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend,
    Filler
);


function Dashboard() {

    const navigate = useNavigate();

    const { user, setUser } =
        useContext(AuthContext);

    const [profileOpen, setProfileOpen] =
        useState(false);

    const profileRef = useRef(null);


    // =========================================================
    // STATE
    // =========================================================

    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCategories: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalReviews: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
        ordersGrowth: 0,
        revenueGrowth: 0,
    });

    const [recentOrders, setRecentOrders] = useState([]);
    const [recentReviews, setRecentReviews] = useState([]);
    const [latestUsers, setLatestUsers] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [dailySales, setDailySales] = useState([]);
    const [orderStatusStats, setOrderStatusStats] = useState([]);
    const [topSellingProducts, setTopSellingProducts] = useState([]);

    const [currentTime, setCurrentTime] = useState(
        new Date()
    );

    const handleAdminLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setProfileOpen(false);
        toast.success(
            "Logout Successfully"
        );

        navigate("/login");
    };


    // =========================================================
    // FETCH DASHBOARD DATA
    // =========================================================

    const fetchDashboard = async () => {

        try {

            const { data } =
                await getDashboardStats();

            setStats(
                data.stats || {}
            );

            setRecentOrders(
                data.recentOrders || []
            );

            setRecentReviews(
                data.recentReviews || []
            );

            setLowStockProducts(
                data.lowStockProducts || []
            );

            setLatestUsers(
                data.latestUsers || []
            );

            setDailySales(
                data.dailySales || []
            );

            setOrderStatusStats(
                data.orderStatusStats || []
            );

            setTopSellingProducts(
                data.topSellingProducts || []
            );

        } catch (error) {

            console.error(
                "Dashboard Error:",
                error
            );

            toast.error(
                "Unable to load dashboard"
            );

        }

    };


    useEffect(() => {
        fetchDashboard();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };

    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(
                    event.target
                )
            ) {
                setProfileOpen(false);
            }

        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };

    }, []);


    // =========================================================
    // SALES TREND — LAST 7 DAYS
    // =========================================================

    const salesLabels = dailySales.map(
        (item) => {

            const date =
                new Date(
                    `${item._id}T00:00:00`
                );

            return date.toLocaleDateString(
                "en-IN",
                {
                    weekday: "short",
                }
            );
        }
    );


    const salesValues = dailySales.map(
        (item) => item.revenue
    );


    const salesChartData = {
        labels:
            salesLabels.length > 0
                ? salesLabels
                : [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun",
                ],

        datasets: [
            {
                label: "Sales",

                data:
                    salesValues.length > 0
                        ? salesValues
                        : [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                        ],

                borderColor: "#2f6fed",

                backgroundColor:
                    "rgba(47, 111, 237, 0.10)",

                fill: true,

                tension: 0.42,

                borderWidth: 3,

                pointRadius: 3,

                pointHoverRadius: 6,

                pointBackgroundColor:
                    "#2f6fed",

                pointBorderWidth: 0,
            },
        ],
    };


    const salesChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: "index",
            intersect: false,
        },

        plugins: {

            legend: {
                display: true,

                position: "top",

                align: "start",

                labels: {
                    usePointStyle: true,

                    pointStyle: "circle",

                    padding: 16,

                    boxWidth: 8,

                    font: {
                        size: 11,
                        weight: "600",
                    },
                },
            },

            tooltip: {

                displayColors: false,

                callbacks: {

                    label: (context) =>
                        ` ₹${Number(
                            context.raw || 0
                        ).toLocaleString("en-IN")}`,

                },

            },

        },

        scales: {

            y: {

                beginAtZero: true,

                grid: {
                    color:
                        "rgba(15, 23, 42, 0.06)",
                },

                ticks: {

                    color: "#7b8494",

                    font: {
                        size: 10,
                    },

                    callback: (
                        value
                    ) =>
                        `₹${Number(
                            value
                        ).toLocaleString("en-IN")}`,

                },

            },

            x: {

                grid: {
                    display: false,
                },

                ticks: {

                    color: "#7b8494",

                    font: {
                        size: 10,
                    },

                },

            },

        },

    };


    // =========================================================
    // ORDER STATUS DATA
    // =========================================================

    const filteredStatus =
        orderStatusStats.filter(
            (item) => item.count > 0
        );


    const orderStatusLabels =
        filteredStatus.map(
            (item) => item._id
        );


    const orderStatusValues =
        filteredStatus.map(
            (item) => item.count
        );


    const orderStatusChartData = {

        labels:
            orderStatusLabels.length > 0
                ? orderStatusLabels
                : ["No Orders"],

        datasets: [

            {
                data:
                    orderStatusValues.length > 0
                        ? orderStatusValues
                        : [1],

                backgroundColor: [
                    "#f4c95d",
                    "#36b8c5",
                    "#2f6fed",
                    "#21b26b",
                    "#e65a5a",
                ],

                borderWidth: 0,

                hoverOffset: 6,

            },

        ],

    };

    const doughnutCenterTextPlugin = {
        id: "doughnutCenterText",
        beforeDraw(chart) {
            const meta =
                chart.getDatasetMeta(0);

            if (
                !meta ||
                !meta.data ||
                meta.data.length === 0
            ) {
                return;
            }


            const total =
            chart.data.datasets[0].data.reduce(
                (sum, value) =>
                    sum + Number(value || 0),
                0
            );


            const {
                ctx,
                chartArea: {
                    left,
                    right,
                    top,
                    bottom,
                },
            } = chart;


            const centerX =
                (left + right) / 2;

            const centerY =
                (top + bottom) / 2;


            ctx.save();


            ctx.textAlign = "center";
            ctx.textBaseline = "middle";


            ctx.font =
                "700 24px Arial";

            ctx.fillStyle =
                "#172033";

            ctx.fillText(
                total,
                centerX,
                centerY - 8
            );


            ctx.font =
                "600 10px Arial";

            ctx.fillStyle =
                "#7b8494";

            ctx.fillText(
                "Total Orders",
                centerX,
                centerY + 15
            );


            ctx.restore();
        },

    };


    const orderStatusChartOptions = {
        responsive: true,
        maintainAspectRatio: false,

        cutout: "72%",

        plugins: {

            legend: {

                position: "bottom",

                labels: {

                    usePointStyle: true,

                    pointStyle: "circle",

                    padding: 12,

                    boxWidth: 8,

                    font: {
                        size: 10,
                        weight: "600",
                    },

                },

            },

            tooltip: {

                callbacks: {

                    label: (
                        context
                    ) => {

                        const value =
                            context.raw || 0;

                        return ` ${context.label}: ${value} orders`;
                    },
                },
            },
        },
    };


    // =========================================================
    // FORMAT REVENUE
    // =========================================================

    const formattedRevenue =
        Number(
            stats.totalRevenue || 0
        ).toLocaleString(
            "en-IN"
        );


    // =========================================================
    // STATUS CLASS
    // =========================================================

    const getStatusClass = (
        status
    ) => {

        switch (status) {

            case "Delivered":
                return "status-badge status-delivered";

            case "Processing":
                return "status-badge status-processing";

            case "Shipped":
                return "status-badge status-shipped";

            case "Pending":
                return "status-badge status-pending";

            case "Cancelled":
                return "status-badge status-cancelled";

            default:
                return "status-badge status-default";

        }

    };

    // =========================================================
    // LOW STOCK PRIORITY
    // =========================================================

    const getStockPriority = (stock) => {

        if (stock <= 2) {
            return {
                label: "Critical",
                className: "critical",
            };
        }

        if (stock <= 5) {
            return {
                label: "Low Stock",
                className: "low",
            };
        }

        return {
            label: "Healthy",
            className: "healthy",
        };

    };


    // =========================================================
    // DECORATIVE SPARKLINE
    // =========================================================

    const Sparkline = ({
        variant = 1,
    }) => {

        const paths = {

            1:
                "M2 32 C12 27 18 30 25 25 C34 18 42 27 50 21 C58 16 65 22 74 14 C83 7 90 14 98 8",

            2:
                "M2 29 C12 32 18 23 27 25 C37 27 43 15 51 20 C61 25 68 10 77 15 C86 19 91 7 98 11",

            3:
                "M2 27 C11 17 19 31 29 23 C40 14 45 28 55 20 C65 11 72 24 81 12 C88 5 94 14 98 6",

            4:
                "M2 30 C12 25 19 29 28 21 C38 12 46 27 56 22 C65 18 71 7 80 14 C89 20 93 4 98 7",

        };


        return (
            <svg
                viewBox="0 0 100 36"
                className="stat-sparkline"
                preserveAspectRatio="none"
            >
                <path
                    d={paths[variant] || paths[1]}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                />
            </svg>
        );

    };


    // =========================================================
    // STAT CARD DATA
    // =========================================================

    const statCards = [

        {
            title: "Total Products",
            value: stats.totalProducts,
            icon: <FaBoxOpen />,
            iconClass: "stat-icon-green",
            route: "/admin/products",
            spark: 1,
        },

        {
            title: "Total Categories",
            value: stats.totalCategories,
            icon: <FaList />,
            iconClass: "stat-icon-teal",
            route: "/admin/categories",
            spark: 2,
        },

        {
            title: "Total Orders",
            value: stats.totalOrders,
            icon: <FaShoppingCart />,
            iconClass: "stat-icon-blue",
            route: "/admin/orders",
            spark: 3,
            growth:
                stats.ordersGrowth,
        },

        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: <FaUsers />,
            iconClass: "stat-icon-cyan",
            route: "/admin/users",
            spark: 4,
        },

        {
            title: "Total Revenue",
            value: `₹${formattedRevenue}`,
            icon: <FaDollarSign />,
            iconClass: "stat-icon-purple",
            route: "/admin/orders",
            spark: 1,
            growth:
                stats.revenueGrowth,
        },

        {
            title: "Delivered Orders",
            value: stats.deliveredOrders,
            icon: <FaTruck />,
            iconClass: "stat-icon-blue",
            route: "/admin/orders",
            spark: 2,
        },

        {
            title: "Total Reviews",
            value: stats.totalReviews,
            icon: <FaStar />,
            iconClass: "stat-icon-yellow",
            route: "/admin/reviews",
            spark: 3,
        },

    ];


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="dashboard-page">

            {/* =================================================
                TOP HEADER
            ================================================= */}

            <header className="dashboard-header">

                {/* =================================================
                    LEFT
                ================================================= */}

                <div className="dashboard-header-left">

                    <h1>
                        Welcome Back, Admin 👋
                    </h1>

                    <p>
                        Here's what's happening with
                        your store today.
                    </p>

                </div>


                {/* =================================================
                    RIGHT
                ================================================= */}

                <div className="dashboard-header-right">

                    {/* SEARCH */}

                    <div className="dashboard-search">

                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Search..."
                        />

                    </div>


                    {/* NOTIFICATION */}

                    <button
                        type="button"
                        className="header-icon-button notification-button"
                        title="Notifications"
                        onClick={() =>
                            toast.info(
                                "No new notifications"
                            )
                        }
                    >

                        <FaBell />

                        <span className="notification-dot">
                            0
                        </span>

                    </button>


                    {/* PROFILE */}

                    <div
                        className="dashboard-profile-wrapper"
                        ref={profileRef}
                    >

                        <button
                            type="button"
                            className="header-profile-button"
                            onClick={() =>
                                setProfileOpen(
                                    !profileOpen
                                )
                            }
                            aria-label="Admin profile"
                        >

                            <span>
                                {user?.profileImage ? (
                                    <img
                                        src={user.profileImage}
                                        alt={user?.name || "Admin"}
                                    />
                                ) : (
                                    user?.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "A"
                                )}
                            </span>

                        </button>


                        {profileOpen && (

                            <div className="dashboard-profile-dropdown">

                                <div className="dashboard-profile-header">

                                    <div className="dashboard-profile-avatar">
                                        {user?.name
                                            ?.charAt(0)
                                            ?.toUpperCase() ||
                                            "A"}
                                    </div>

                                    <div>

                                        <strong>
                                            {user?.name ||
                                                "Admin"}
                                        </strong>

                                        <small>
                                            {user?.email ||
                                                "Administrator"}
                                        </small>

                                    </div>

                                </div>


                                <div className="dashboard-profile-divider" />


                                <button
                                    type="button"
                                    onClick={() => {
                                        setProfileOpen(
                                            false
                                        );

                                        navigate(
                                            "/admin/profile"
                                        );
                                    }}
                                >

                                    <FaUser />

                                    <span>
                                        Admin Profile
                                    </span>

                                </button>


                                <button
                                    type="button"
                                    onClick={handleAdminLogout}
                                    className="dashboard-profile-logout"
                                >

                                    <FaSignOutAlt />

                                    <span>
                                        Logout
                                    </span>

                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </header>


            {/* =================================================
                STAT CARDS
            ================================================= */}

            <section className="stats-grid">

                {statCards.map(
                    (card) => (

                        <div
                            key={card.title}
                            className="stat-card"
                            onClick={() =>
                                navigate(
                                    card.route
                                )
                            }
                        >

                            <div className="stat-card-top">

                                <div>

                                    <p className="stat-title">
                                        {card.title}
                                    </p>

                                    <h2 className="stat-value">
                                        {card.value}
                                    </h2>

                                    {card.growth !== undefined && (
                                        <div
                                            className={
                                                card.growth >= 0
                                                    ? "stat-growth positive"
                                                    : "stat-growth negative"
                                            }
                                        >
                                            <FaArrowUp
                                                className={
                                                    card.growth < 0
                                                        ? "growth-down"
                                                        : ""
                                                }
                                            />

                                            {Math.abs(card.growth)}%
                                            <span>
                                                vs previous 7 days
                                            </span>
                                        </div>
                                    )}

                                </div>


                                <div
                                    className={`stat-icon ${card.iconClass}`}
                                >
                                    {card.icon}
                                </div>

                            </div>


                            <Sparkline
                                variant={
                                    card.spark
                                }
                            />

                        </div>

                    )
                )}

            </section>


            {/* =================================================
                MIDDLE GRID
            ================================================= */}

            <section className="dashboard-middle-grid">

                {/* =========================
                    RECENT ORDERS
                ========================= */}

                <div className="dashboard-panel orders-panel">

                    <div className="panel-header">

                        <h3>
                            Recent Orders
                        </h3>

                        <div className="panel-actions">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/admin/orders"
                                    )
                                }
                            >
                                View All
                            </button>

                            <button
                                type="button"
                                title="Export"
                            >
                                <FaDownload />
                                Export
                            </button>

                        </div>

                    </div>


                    <div className="table-wrapper">

                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>

                            <tbody>

                                {recentOrders
                                    .slice(0, 5)
                                    .map((order) => {

                                        const amount =
                                            order.payableAmount ??
                                            order.totalPrice ??
                                            0;

                                        const paymentLabel =
                                            order.paymentMethod === "COD"
                                                ? "COD"
                                                : order.isPaid
                                                ? "Paid"
                                                : "Unpaid";

                                        const paymentClass =
                                            order.paymentMethod === "COD"
                                                ? "payment-badge payment-cod"
                                                : order.isPaid
                                                ? "payment-badge payment-paid"
                                                : "payment-badge payment-unpaid";

                                        return (
                                            <tr key={order._id}>

                                                {/* ORDER ID */}

                                                <td>
                                                    <span className="order-id-text">
                                                        ODR-
                                                        {order._id
                                                            .slice(-6)
                                                            .toUpperCase()}
                                                    </span>
                                                </td>


                                                {/* CUSTOMER */}

                                                <td>

                                                    <div className="customer-cell">

                                                        <div className="customer-avatar">

                                                            {order.user?.name
                                                                ?.charAt(0)
                                                                ?.toUpperCase() || "U"}

                                                        </div>

                                                        <div className="customer-info">

                                                            <strong>
                                                                {order.user?.name ||
                                                                    "Unknown User"}
                                                            </strong>

                                                            <small>
                                                                {order.user?.email ||
                                                                    ""}
                                                            </small>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* TOTAL */}

                                                <td>

                                                    <strong className="order-amount">
                                                        ₹
                                                        {Number(
                                                            amount
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </strong>

                                                </td>


                                                {/* PAYMENT */}

                                                <td>

                                                    <span
                                                        className={
                                                            paymentClass
                                                        }
                                                    >
                                                        {paymentLabel}
                                                    </span>

                                                </td>


                                                {/* ORDER STATUS */}

                                                <td>

                                                    <span
                                                        className={getStatusClass(
                                                            order.orderStatus
                                                        )}
                                                    >
                                                        {order.orderStatus}
                                                    </span>

                                                </td>


                                                {/* DATE */}

                                                <td>

                                                    <span className="order-date">
                                                        {new Date(
                                                            order.createdAt
                                                        ).toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </span>

                                                </td>

                                            </tr>
                                        );
                                    })}

                            </tbody>

                        </table>

                    </div>

                </div>


                {/* =========================
                    LOW STOCK
                ========================= */}

                <div className="dashboard-panel low-stock-panel">

                    <div className="panel-header">

                        <h3>
                            <FaExclamationTriangle />
                            Low Stock
                        </h3>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/admin/products"
                                )
                            }
                        >
                            View All
                        </button>

                    </div>


                    <div className="low-stock-list">
                        {lowStockProducts.length > 0 ? (

                            lowStockProducts
                                .slice(0, 3)
                                .map((product) => {

                                    const priority =
                                        getStockPriority(
                                            product.stock
                                        );

                                    return (
                                        <div
                                            className="low-stock-item"
                                            key={product._id}
                                            onClick={() =>
                                                navigate(
                                                    `/admin/product/edit/${product._id}`
                                                )
                                            }
                                        >

                                            {/* PRODUCT IMAGE */}

                                            <div className="low-stock-image">

                                                <img
                                                    src={
                                                        product.images?.[0] ||
                                                        "https://placehold.co/70x70"
                                                    }
                                                    alt={
                                                        product.name ||
                                                        "Product"
                                                    }
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            "https://placehold.co/70x70";
                                                    }}
                                                />

                                            </div>


                                            {/* PRODUCT INFO */}

                                            <div className="low-stock-content">

                                                <strong>
                                                    {product.name}
                                                </strong>

                                                <span>
                                                    ₹
                                                    {" "}
                                                    {Number(
                                                        product.price || 0
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </span>

                                                <div className="stock-progress">

                                                    <div
                                                        className={`stock-progress-bar ${priority.className}`}
                                                        style={{
                                                            width:
                                                                `${Math.min(
                                                                    100,
                                                                    Math.max(
                                                                        12,
                                                                        product.stock *
                                                                            12
                                                                    )
                                                                )}%`,
                                                        }}
                                                    />

                                                </div>

                                            </div>


                                            {/* STOCK STATUS */}

                                            <div className="stock-meta">

                                                <span
                                                    className={`stock-badge ${priority.className}`}
                                                >
                                                    {product.stock} left
                                                </span>

                                                <small>
                                                    {priority.label}
                                                </small>

                                            </div>

                                        </div>
                                    );
                                })

                        ) : (

                            <div className="low-stock-empty">

                                <span>
                                    ✓
                                </span>

                                <div>
                                    <strong>
                                        Inventory is healthy
                                    </strong>

                                    <small>
                                        No products need immediate restocking.
                                    </small>
                                </div>

                            </div>

                        )}

                    </div>

                </div>


                {/* =========================
                    RECENT REVIEWS
                ========================= */}

                <div className="dashboard-panel reviews-panel">

                    <div className="panel-header">

                        <h3>
                            Recent Reviews
                        </h3>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/admin/reviews"
                                )
                            }
                        >
                            View All
                        </button>

                    </div>


                    <div className="review-list">
                        {recentReviews.length > 0 ? (

                            recentReviews
                                .slice(0, 3)
                                .map((review) => {

                                    const rating =
                                        Number(
                                            review.rating || 0
                                        );

                                    return (
                                        <div
                                            className="review-item"
                                            key={review._id}
                                        >

                                            {/* AVATAR */}

                                            <div className="review-avatar">

                                                {review
                                                    .user
                                                    ?.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() ||
                                                    "U"}

                                            </div>


                                            {/* CONTENT */}

                                            <div className="review-content">

                                                <div className="review-top-row">

                                                    <strong>
                                                        {review
                                                            .user
                                                            ?.name ||
                                                            "User"}
                                                    </strong>

                                                    <span className="review-date">

                                                        {review.createdAt
                                                            ? new Date(
                                                                review.createdAt
                                                            ).toLocaleDateString(
                                                                "en-IN",
                                                                {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                }
                                                            )
                                                            : ""}

                                                    </span>

                                                </div>


                                                <div className="stars">

                                                    {"★".repeat(
                                                        rating
                                                    )}

                                                    {"☆".repeat(
                                                        Math.max(
                                                            0,
                                                            5 - rating
                                                        )
                                                    )}

                                                    <span>
                                                        {rating.toFixed(1)}
                                                    </span>

                                                </div>


                                                <div className="review-product">

                                                    {review
                                                        .product
                                                        ?.name ||
                                                        "Product"}

                                                </div>


                                                <p>
                                                    {review.comment ||
                                                        "No comment provided."}
                                                </p>

                                            </div>

                                        </div>
                                    );
                                })

                        ) : (

                            <div className="review-empty">

                                <span>
                                    ★
                                </span>

                                <div>
                                    <strong>
                                        No reviews yet
                                    </strong>

                                    <small>
                                        Customer feedback will appear here.
                                    </small>
                                </div>

                            </div>

                        )}

                    </div>

                </div>

            </section>


            {/* =================================================
                LOWER GRID
            ================================================= */}

            <section className="dashboard-lower-grid">

                {/* SALES TREND */}

                <div className="dashboard-panel sales-panel">

                    <div className="panel-header">

                        <h3>
                            Sales Trend
                        </h3>

                    </div>

                    <div className="chart-container">

                        <Line
                            data={
                                salesChartData
                            }
                            options={
                                salesChartOptions
                            }
                        />

                    </div>

                </div>


                {/* ORDER STATUS */}

                <div className="dashboard-panel status-panel">

                    <div className="panel-header">

                        <h3>
                            Order Status Distribution
                        </h3>

                    </div>

                    <div className="donut-chart-container">

                        <Doughnut
                            data={orderStatusChartData}
                            options={orderStatusChartOptions}
                            plugins={[
                                doughnutCenterTextPlugin
                            ]}
                        />
                    </div>
                </div>


                {/* QUICK ACTIONS */}

                <div className="dashboard-panel actions-panel">

                    <div className="panel-header">

                        <h3>
                            Quick Actions
                        </h3>

                    </div>


                    <div className="quick-actions">
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/admin/product/add")
                            }
                        >
                            <FaPlus />
                            Add New Product
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                navigate("/admin/orders")
                            }
                        >
                            <FaShoppingCart />
                            Manage Orders
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                navigate("/admin/categories")
                            }
                        >
                            <FaList />
                            Categories
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                navigate("/admin/users")
                            }
                        >
                            <FaUserCog />
                            User Management
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                navigate("/admin/products")
                            }
                        >
                            <FaBoxOpen />
                            View Products
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                navigate("/admin/reviews")
                            }
                        >
                            <FaStar />
                            View Reviews
                        </button>

                    </div>

                </div>

            </section>


            <div className="dashboard-panel top-selling-panel">
                <div className="panel-header">
                    <h3>
                        Top Selling Products
                    </h3>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/products")
                        }
                    >
                        View All
                    </button>

                </div>


                <div className="top-selling-list">

                    {topSellingProducts.length > 0 ? (

                        topSellingProducts
                            .slice(0, 5)
                            .map((item, index) => {

                                const product =
                                    item.product || {};

                                const sold =
                                    Number(
                                        item.totalSold || 0
                                    );

                                const price =
                                    Number(
                                        product.price || 0
                                    );

                                return (
                                    <div
                                        className="top-selling-item"
                                        key={
                                            product._id ||
                                            item._id
                                        }
                                    >

                                        {/* RANK */}

                                        <span className="selling-rank">
                                            #{index + 1}
                                        </span>


                                        {/* IMAGE */}

                                        <div className="selling-image">

                                            <img
                                                src={
                                                    product
                                                        .images
                                                        ?.[
                                                        0
                                                    ] ||
                                                    "https://placehold.co/60x60"
                                                }
                                                alt={
                                                    product.name ||
                                                    "Product"
                                                }
                                                onError={(
                                                    e
                                                ) => {
                                                    e.currentTarget.src =
                                                        "https://placehold.co/60x60";
                                                }}
                                            />

                                        </div>


                                        {/* PRODUCT INFO */}

                                        <div className="selling-content">

                                            <strong>
                                                {product.name ||
                                                    "Product"}
                                            </strong>

                                            <span>
                                                ₹
                                                {price.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </span>

                                        </div>


                                        {/* SOLD */}

                                        <div className="selling-metrics">

                                            <strong>
                                                {sold}
                                            </strong>

                                            <small>
                                                sold
                                            </small>

                                        </div>

                                    </div>
                                );
                            })

                    ) : (

                        <div className="top-selling-empty">
                            No sales yet
                        </div>

                    )}

                </div>

            </div>


            {/* =================================================
                SYSTEM STATUS
            ================================================= */}

            <div className="dashboard-status-bar">
                <div className="status-bar-left">
                    <span className="system-status-item">
                        <i className="status-dot" />

                        <strong>
                            System Status
                        </strong>

                        <em>
                            All Systems Operational
                        </em>

                    </span>


                    <span className="system-status-item">

                        <i className="status-dot" />

                        <strong>
                            Current Time
                        </strong>

                        <em>
                            {currentTime.toLocaleTimeString(
                                "en-IN",
                                {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                }
                            )}
                        </em>

                    </span>

                </div>


                <div className="status-bar-right">

                    <button
                        type="button"
                        onClick={() =>
                            toast.info(
                                "Backup scheduling will be available soon."
                            )
                        }
                    >
                        ↻ Schedule Backup
                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            toast.info(
                                "Support contact feature will be available soon."
                            )
                        }
                    >
                        ☎ Contact Support
                    </button>

                </div>

            </div>

        </div>
    );
}


// =========================================================
// SMALL SAFE HEADER ICON
// =========================================================

function FaBellPlaceholder() {
    return (
        <span
            style={{
                fontSize: "18px",
                lineHeight: 1,
            }}
        >
            🔔
        </span>
    );
}


export default Dashboard;
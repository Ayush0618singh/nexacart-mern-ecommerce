import React, {
    useEffect,
    useMemo,
    useState,

} from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import {
    FaArrowRight,
    FaBoxOpen,
    FaCalendarAlt,
    FaCheckCircle,
    FaChevronDown,
    FaChevronUp,
    FaFileInvoice,
    FaHeadset,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaRedo,
    FaReceipt,
    FaShoppingBag,
    FaTruck,
} from "react-icons/fa";

import { getMyOrders } from "../../services/orderService";
import { addToCart } from "../../services/cartService";

import "../../styles/orders.css";

function Orders() {
    const [orders, setOrders] = useState([]);

    const [expandedOrder, setExpandedOrder] =
        useState(null);

    const [invoiceOrder, setInvoiceOrder] =
        useState(null);

    const fetchOrders = async () => {
        try {
            const { data } = await getMyOrders();
            setOrders(data.orders || []);
        } catch (error) {
            console.log(error);
            toast.error("Unable To Load Orders");
        }
    };

    const handleOrderAgain = async (order) => {
        try {
            for (const item of order.products) {
                if (!item.product?._id) {
                    continue;
                }

                await addToCart({
                    product: item.product._id,
                    quantity: item.quantity,
                });
            }

            toast.success("Products Added To Cart");
        } catch (error) {
            console.log(error);
            toast.error("Unable To Add Products To Cart");
        }
    };

    const handleViewDetails = (orderId) => {
        setExpandedOrder((current) =>
            current === orderId
                ? null
                : orderId
        );
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Order Status
    const getStatusClass = (status) => {
        switch (status) {
            case "Delivered":
                return "delivered";

            case "Shipped":
                return "shipped";

            case "Processing":
                return "processing";

            case "Pending":
                return "pending";

            case "Cancelled":
                return "cancelled";

            default:
                return "default";
        }
    };

    // Payment Status
    const getPaymentStatus = (order) => {
        if (order.isPaid) {
            return {
                text: "Paid",
                className: "badge bg-success",
            };
        }

        return {
            text: "Payment Pending",
            className: "badge bg-warning text-dark",
        };
    };

    const orderStats = useMemo(() => {
        return {
            total: orders.length,

            pending: orders.filter(
                (order) =>
                    order.orderStatus === "Pending"
            ).length,

            processing: orders.filter(
                (order) =>
                    order.orderStatus === "Processing"
            ).length,

            shipped: orders.filter(
                (order) =>
                    order.orderStatus === "Shipped"
            ).length,

            delivered: orders.filter(
                (order) =>
                    order.orderStatus === "Delivered"
            ).length,
        };

    }, [orders]);

    return (

        <div className="orders-page">

            <div className="orders-container">


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <section className="orders-header">

                    <div>

                        <span className="orders-kicker">
                            NEXACART ORDER CENTER
                        </span>

                        <h1>
                            Your <span>Orders</span>
                        </h1>

                        <p>
                            Track your purchases, manage your orders
                            and review your shopping history.
                        </p>

                    </div>


                    <div className="orders-header-icon">
                        <FaShoppingBag />
                    </div>

                </section>


                {/* =================================================
                    ORDER HISTORY
                ================================================= */}

                <section className="orders-list-section">

                    <div className="orders-section-heading">

                        <div>

                            <span>
                                ORDER HISTORY
                            </span>

                            <h2>
                                Recent Purchases
                            </h2>

                        </div>

                        <span className="orders-count-label">
                            {orders.length}{" "}
                            {orders.length === 1
                                ? "Order"
                                : "Orders"}
                        </span>

                    </div>


                    {/* =================================================
                        EMPTY
                    ================================================= */}

                    {orders.length === 0 ? (

                        <section className="orders-empty-card">

                            <div className="orders-empty-icon">
                                <FaBoxOpen />
                            </div>

                            <span className="orders-empty-kicker">
                                ORDER CENTER
                            </span>

                            <h2>
                                No Orders Yet
                            </h2>

                            <p>
                                You haven't placed any orders yet.
                                Explore NexaCart and discover something
                                you'll love.
                            </p>

                            <Link
                                to="/products"
                                className="orders-primary-button"
                            >
                                Start Shopping
                                <FaArrowRight />
                            </Link>

                        </section>

                    ) : (

                        orders.map((order, index) => {

                            const isExpanded =
                                expandedOrder === order._id;

                            return (

                                <article
                                    key={order._id}
                                    className="compact-order-card"
                                >


                                    {/* =================================================
                                        ORDER TOP BAR
                                    ================================================= */}

                                    <div className="compact-order-header">


                                        {/* DATE */}

                                        <div className="compact-order-meta">

                                            <span>
                                                ORDER PLACED
                                            </span>

                                            <strong>
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day:
                                                            "2-digit",
                                                        month:
                                                            "long",
                                                        year:
                                                            "numeric",
                                                    }
                                                )}
                                            </strong>

                                        </div>


                                        {/* TOTAL */}

                                        <div className="compact-order-meta">

                                            <span>
                                                TOTAL
                                            </span>

                                            <strong>
                                                ₹{" "}
                                                {Number(
                                                    order.totalPrice ||
                                                        0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </strong>

                                        </div>


                                        {/* SHIP TO */}

                                        <div className="compact-order-meta ship-to-meta">

                                            <span>
                                                SHIP TO
                                            </span>

                                            <strong>
                                                Ayush Singh
                                            </strong>

                                            <small>
                                                {order.shippingAddress ||
                                                    "Address unavailable"}
                                            </small>

                                        </div>


                                        {/* ORDER NUMBER */}

                                        <div className="compact-order-right">

                                            <span className="compact-order-number">
                                                ORDER #{" "}
                                                {order._id
                                                    .slice(-12)
                                                    .toUpperCase()}
                                            </span>


                                            <div className="compact-order-links">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleViewDetails(
                                                            order._id
                                                        )
                                                    }
                                                >
                                                    {isExpanded
                                                        ? "Hide order details"
                                                        : "View order details"}
                                                </button>


                                                <span>
                                                    |
                                                </span>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setInvoiceOrder(
                                                            order
                                                        )
                                                    }
                                                >
                                                    Invoice
                                                    <FaChevronDown />
                                                </button>

                                            </div>

                                        </div>

                                    </div>


                                    {/* =================================================
                                        ORDER DETAILS TOGGLE
                                    ================================================= */}

                                    {isExpanded && (

                                        <div className="compact-order-details">

                                            <div>

                                                <span>
                                                    PAYMENT
                                                </span>

                                                <strong>
                                                    {order.paymentMethod ===
                                                    "COD"
                                                        ? "Cash On Delivery"
                                                        : "Online Payment"}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    PAYMENT STATUS
                                                </span>

                                                <strong
                                                    className={
                                                        order.isPaid
                                                            ? "details-paid"
                                                            : "details-pending"
                                                    }
                                                >
                                                    {order.isPaid
                                                        ? "✓ Paid"
                                                        : "Payment Pending"}
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    ORDER STATUS
                                                </span>

                                                <strong>
                                                    {order.orderStatus}
                                                </strong>

                                            </div>


                                            {order.paymentId && (

                                                <div>

                                                    <span>
                                                        PAYMENT ID
                                                    </span>

                                                    <strong>
                                                        {
                                                            order.paymentId
                                                        }
                                                    </strong>

                                                </div>

                                            )}

                                        </div>

                                    )}


                                    {/* =================================================
                                        PRODUCTS
                                    ================================================= */}

                                    <div className="compact-order-products">

                                        {order.products.map(
                                            (item) => {

                                                const product =
                                                    item.product;

                                                const itemTotal =
                                                    Number(
                                                        product?.price ||
                                                            0
                                                    ) *
                                                    Number(
                                                        item.quantity ||
                                                            0
                                                    );

                                                return (

                                                    <div
                                                        key={
                                                            item._id
                                                        }
                                                        className="compact-product-row"
                                                    >


                                                        {/* IMAGE */}

                                                        <Link
                                                            to={
                                                                product?._id
                                                                    ? `/product/${product._id}`
                                                                    : "#"
                                                            }
                                                            className="compact-product-image"
                                                        >

                                                            <img
                                                                src={
                                                                    product
                                                                        ?.images
                                                                        ?.length >
                                                                    0
                                                                        ? product.images[0]
                                                                        : "https://placehold.co/100x100?text=NexaCart"
                                                                }
                                                                alt={
                                                                    product?.name ||
                                                                    "Product"
                                                                }
                                                                onError={(
                                                                    e
                                                                ) => {
                                                                    e.currentTarget.src =
                                                                        "https://placehold.co/100x100?text=NexaCart";
                                                                }}
                                                            />

                                                        </Link>


                                                        {/* PRODUCT INFO */}

                                                        <div className="compact-product-info">

                                                            <Link
                                                                to={
                                                                    product?._id
                                                                        ? `/product/${product._id}`
                                                                        : "#"
                                                                }
                                                                className="compact-product-name"
                                                            >
                                                                {
                                                                    product?.name ||
                                                                    "Product Unavailable"
                                                                }
                                                            </Link>


                                                            <div className="compact-product-meta">

                                                                <span>
                                                                    Qty:{" "}
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </span>


                                                                {product?.brand && (

                                                                    <span>
                                                                        {
                                                                            product.brand
                                                                        }
                                                                    </span>

                                                                )}

                                                            </div>


                                                            <div className="compact-product-status">

                                                                <span
                                                                    className={
                                                                        `compact-status ${order.orderStatus
                                                                            ?.toLowerCase()
                                                                            .replace(
                                                                                /\s+/g,
                                                                                "-"
                                                                            )}`
                                                                    }
                                                                >
                                                                    {order.orderStatus}
                                                                </span>


                                                                {order.isPaid && (

                                                                    <span className="compact-paid">
                                                                        <FaCheckCircle />
                                                                        Paid
                                                                    </span>

                                                                )}

                                                            </div>

                                                        </div>


                                                        {/* PRICE */}

                                                        <div className="compact-product-price">

                                                            ₹{" "}
                                                            {itemTotal.toLocaleString(
                                                                "en-IN"
                                                            )}

                                                        </div>


                                                        {/* PRODUCT ACTIONS */}

                                                        <div className="compact-product-actions">

                                                            <button
                                                                type="button"
                                                                className="product-buy-again-button"
                                                                onClick={() =>
                                                                    handleOrderAgain(
                                                                        {
                                                                            ...order,
                                                                            products: [
                                                                                item,
                                                                            ],
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <FaRedo />
                                                                Buy It Again
                                                            </button>


                                                            {product?._id && (

                                                                <Link
                                                                    to={`/product/${product._id}`}
                                                                    className="product-view-button"
                                                                >
                                                                    View Your Item
                                                                </Link>

                                                            )}

                                                        </div>

                                                    </div>

                                                );
                                            }
                                        )}

                                    </div>


                                    {/* =================================================
                                        BOTTOM ACTIONS
                                    ================================================= */}

                                    <div className="compact-order-footer">


                                        <div className="compact-shipping">

                                            <FaTruck />

                                            <div>

                                                <span>
                                                    DELIVERY
                                                </span>

                                                <strong>
                                                    {order.orderStatus}
                                                </strong>

                                            </div>

                                        </div>


                                        <Link
                                            to="/contact-support"
                                            className="product-support-button"
                                        >
                                            <FaHeadset />
                                            Get Product Support
                                        </Link>


                                        <button
                                            type="button"
                                            className="order-again-main-button"
                                            onClick={() =>
                                                handleOrderAgain(
                                                    order
                                                )
                                            }
                                        >
                                            <FaRedo />
                                            Order Again
                                        </button>

                                    </div>

                                </article>

                            );
                        })

                    )}

                </section>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className="orders-footer">

                    <span>
                        © 2026 NexaCart Premium
                    </span>

                    <span>
                        Secure Shopping • Better Experience
                    </span>

                </div>

            </div>

            {/* =====================================================
                INVOICE MODAL
            ===================================================== */}
            {invoiceOrder && (
                <div
                    className="invoice-modal-overlay"
                    onClick={() => setInvoiceOrder(null)}
                >

                    <div
                        className="invoice-document"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* =================================================
                            HEADER
                        ================================================= */}

                        <div className="invoice-document-header">

                            <div className="invoice-brand">

                                <div className="invoice-logo-mark">
                                    N
                                </div>

                                <div>

                                    <h1>
                                        NexaCart
                                    </h1>

                                    <span>
                                        Premium Shopping Platform
                                    </span>

                                </div>

                            </div>


                            <div className="invoice-title">

                                <strong>
                                    INVOICE
                                </strong>

                                <span>
                                    Original for Customer
                                </span>

                            </div>

                        </div>


                        {/* =================================================
                            SELLER / BILLING / SHIPPING
                        ================================================= */}

                        <div className="invoice-parties">

                            <div className="invoice-party">

                                <span>
                                    SOLD BY
                                </span>

                                <strong>
                                    NexaCart
                                </strong>

                                <p>
                                    Premium Shopping Platform
                                </p>

                                <p>
                                    support@nexacart.com
                                </p>

                            </div>


                            <div className="invoice-party">

                                <span>
                                    BILLING ADDRESS
                                </span>

                                <strong>
                                    Ayush Singh
                                </strong>

                                <p>
                                    {invoiceOrder?.shippingAddress ||
                                        "Address unavailable"}
                                </p>

                            </div>


                            <div className="invoice-party">

                                <span>
                                    SHIPPING ADDRESS
                                </span>

                                <strong>
                                    Ayush Singh
                                </strong>

                                <p>
                                    {invoiceOrder?.shippingAddress ||
                                        "Address unavailable"}
                                </p>

                            </div>

                        </div>


                        {/* =================================================
                            ORDER DETAILS
                        ================================================= */}

                        <div className="invoice-meta-grid">

                            <div>

                                <span>
                                    ORDER NUMBER
                                </span>

                                <strong>
                                    NX-
                                    {invoiceOrder?._id
                                        ?.slice(-10)
                                        .toUpperCase()}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    ORDER DATE
                                </span>

                                <strong>

                                    {invoiceOrder?.createdAt
                                        ? new Date(
                                            invoiceOrder.createdAt
                                        ).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )
                                        : "—"}

                                </strong>

                            </div>


                            <div>

                                <span>
                                    INVOICE NUMBER
                                </span>

                                <strong>
                                    INV-
                                    {invoiceOrder?._id
                                        ?.slice(-8)
                                        .toUpperCase()}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    PAYMENT
                                </span>

                                <strong>
                                    {invoiceOrder?.isPaid
                                        ? "PAID"
                                        : "PENDING"}
                                </strong>

                            </div>

                        </div>


                        {/* =================================================
                            PRODUCT TABLE
                        ================================================= */}

                        <div className="invoice-table">

                            <div className="invoice-table-head">

                                <span>
                                    #
                                </span>

                                <span>
                                    PRODUCT DESCRIPTION
                                </span>

                                <span>
                                    UNIT PRICE
                                </span>

                                <span>
                                    QTY
                                </span>

                                <span>
                                    TOTAL
                                </span>

                            </div>


                            {invoiceOrder?.products?.map(
                                (item, index) => {

                                    const product =
                                        item?.product;

                                    const unitPrice =
                                        Number(
                                            product?.price || 0
                                        );

                                    const quantity =
                                        Number(
                                            item?.quantity || 0
                                        );

                                    const total =
                                        unitPrice * quantity;

                                    return (

                                        <div
                                            key={
                                                item?._id ||
                                                index
                                            }
                                            className="invoice-table-row"
                                        >

                                            <span>
                                                {index + 1}
                                            </span>

                                            <span className="invoice-product-description">

                                                {product?.name ||
                                                    "Product Unavailable"}

                                            </span>

                                            <span>

                                                ₹{" "}
                                                {unitPrice.toLocaleString(
                                                    "en-IN"
                                                )}

                                            </span>

                                            <span>
                                                {quantity}
                                            </span>

                                            <span>

                                                ₹{" "}
                                                {total.toLocaleString(
                                                    "en-IN"
                                                )}

                                            </span>

                                        </div>
                                    );
                                }
                            )}

                        </div>


                        {/* =================================================
                            TOTALS
                        ================================================= */}

                        <div className="invoice-summary">

                            <div className="invoice-summary-left">

                                <div className="invoice-note">

                                    <strong>
                                        Payment Information
                                    </strong>

                                    <span>
                                        Method:{" "}
                                        {invoiceOrder?.paymentMethod ===
                                        "COD"
                                            ? "Cash On Delivery"
                                            : "Online Payment"}
                                    </span>

                                    <span>
                                        Status:{" "}
                                        {invoiceOrder?.isPaid
                                            ? "Paid"
                                            : "Payment Pending"}
                                    </span>

                                </div>

                            </div>


                            <div className="invoice-summary-right">

                                <div>

                                    <span>
                                        Order Total
                                    </span>

                                    <strong>

                                        ₹{" "}
                                        {Number(
                                            invoiceOrder?.totalPrice ||
                                                0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}

                                    </strong>

                                </div>


                                <div className="invoice-grand-total">

                                    <span>
                                        GRAND TOTAL
                                    </span>

                                    <strong>

                                        ₹{" "}
                                        {Number(
                                            invoiceOrder?.totalPrice ||
                                                0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}

                                    </strong>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            FOOTER
                        ================================================= */}

                        <div className="invoice-document-footer">

                            <div>

                                <strong>
                                    Thank you for shopping with NexaCart.
                                </strong>

                                <span>
                                    Secure • Reliable • Premium Shopping
                                </span>

                            </div>


                            <div className="invoice-signature">

                                <span>
                                    Authorized by
                                </span>

                                <strong>
                                    NexaCart
                                </strong>

                            </div>

                        </div>


                        {/* =================================================
                            ACTIONS
                        ================================================= */}

                        <div className="invoice-actions">

                            <button
                                type="button"
                                onClick={() =>
                                    window.print()
                                }
                                className="invoice-print-button"
                            >
                                <FaFileInvoice />
                                Print / Save PDF
                            </button>


                            <button
                                type="button"
                                onClick={() =>
                                    setInvoiceOrder(null)
                                }
                                className="invoice-cancel-button"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}


             

        </div>
    );
}
export default Orders;
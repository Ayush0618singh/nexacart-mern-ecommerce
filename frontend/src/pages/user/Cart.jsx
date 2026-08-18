import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    FaArrowRight,
    FaHeart,
    FaMinus,
    FaPlus,
    FaShoppingBag,
    FaShieldAlt,
    FaTrash,
    FaTruck,
} from "react-icons/fa";

import {
    getCartItems,
    updateCartQuantity,
    deleteCartItem,
} from "../../services/cartService";

import "../../styles/cart.css";


function Cart() {

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [likedItems, setLikedItems] = useState({});

    const navigate = useNavigate();


    // =====================================================
    // FETCH CART
    // =====================================================

    const fetchCart = async () => {

        try {

            const { data } =
                await getCartItems();

            const validCart =
                (data.cart || []).filter(
                    (item) =>
                        item.product !== null
                );

            setCart(validCart);

        } catch (error) {

            console.log(error);

            toast.error(
                "Unable To Load Cart"
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchCart();

    }, []);


    // =====================================================
    // INCREASE QUANTITY
    // =====================================================

    const increaseQuantity = async (item) => {

        try {

            await updateCartQuantity(
                item._id,
                {
                    quantity:
                        item.quantity + 1,
                }
            );

            fetchCart();

        } catch (error) {

            toast.error(
                "Unable To Update Cart"
            );
        }
    };


    // =====================================================
    // DECREASE QUANTITY
    // =====================================================

    const decreaseQuantity = async (item) => {

        if (item.quantity <= 1) {
            return;
        }

        try {

            await updateCartQuantity(
                item._id,
                {
                    quantity:
                        item.quantity - 1,
                }
            );

            fetchCart();

        } catch (error) {

            toast.error(
                "Unable To Update Cart"
            );
        }
    };


    // =====================================================
    // REMOVE ITEM
    // =====================================================

    const removeItem = async (id) => {

        try {

            await deleteCartItem(id);

            toast.success(
                "Item Removed"
            );

            fetchCart();

        } catch (error) {

            toast.error(
                "Unable To Remove Item"
            );
        }
    };


    // =====================================================
    // BUY NOW
    // =====================================================

    const handleBuyNow = (item) => {

        navigate(
            "/checkout",
            {
                state: {
                    product:
                        item.product,

                    quantity:
                        item.quantity,
                },
            }
        );
    };

    const toggleLike = (itemId) => {
        setLikedItems((prev) => ({
            ...prev,
            [itemId]: !prev[itemId],
        }));
    };


    // =====================================================
    // PRICE CALCULATIONS
    // =====================================================

    const totalPrice =
        cart.reduce(
            (total, item) => {

                return (
                    total +
                    item.product.price *
                        item.quantity
                );

            },
            0
        );


    const gst =
        Math.round(
            totalPrice * 0.18
        );


    const grandTotal =
        totalPrice + gst;


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="cart-loading">

                <div className="cart-loading-spinner">
                </div>

                <h3>
                    Loading Your Cart...
                </h3>

                <p>
                    Please wait while we
                    prepare your items.
                </p>

            </div>
        );
    }


    // =====================================================
    // EMPTY CART
    // =====================================================

    if (cart.length === 0) {

        return (

            <div className="cart-page">

                <div className="cart-empty-card">

                    <div className="cart-empty-icon">
                        <FaShoppingBag />
                    </div>

                    <span className="cart-empty-label">
                        YOUR BAG IS READY
                    </span>

                    <h1>
                        Your Cart Is Empty
                    </h1>

                    <p>
                        Looks like you haven't
                        added anything yet.
                        Discover something you'll
                        love and start shopping.
                    </p>

                    <Link
                        to="/products"
                        className="cart-primary-button"
                    >
                        Continue Shopping
                        <FaArrowRight />
                    </Link>

                </div>

            </div>
        );
    }


    // =====================================================
    // CART
    // =====================================================

    return (

        <div className="cart-page">

            <div className="cart-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="cart-heading">

                    <div>

                        <span className="cart-kicker">
                            NEXACART SHOPPING SPACE
                        </span>

                        <h1>
                            <span className="cart-title-gold">
                                Shopping
                            </span>{" "}
                            Cart
                        </h1>

                        <p>
                            Review your selected
                            products before checkout.
                        </p>

                    </div>


                    <div className="cart-count-badge">

                        <FaShoppingBag />

                        <span>
                            {cart.length}
                        </span>

                        {cart.length === 1
                            ? "Item"
                            : "Items"}

                    </div>

                </div>


                {/* =================================================
                    MAIN GRID
                ================================================= */}

                <div className="cart-layout">


                    {/* =================================================
                        PRODUCTS
                    ================================================= */}

                    <div className="cart-products-column">

                        {cart.map(
                            (item, index) => {

                                const product =
                                    item.product;

                                const productImage =
                                    product?.images?.[0] ||
                                    "https://placehold.co/500x400?text=NexaCart";


                                return (

                                    <article
                                        key={item._id}
                                        className="cart-product-card"
                                    >


                                        {/* TOP BADGE */}

                                        <button
                                            type="button"
                                            className={`cart-curated-badge ${
                                                likedItems[item._id]
                                                    ? "liked"
                                                    : ""
                                            }`}
                                            onClick={() => toggleLike(item._id)}
                                            aria-label={
                                                likedItems[item._id]
                                                    ? "Remove from favorites"
                                                    : "Add to favorites"
                                            }
                                        >
                                            <FaHeart />

                                            <span>
                                                Your Selection
                                            </span>
                                        </button>


                                        {/* IMAGE */}

                                        <Link
                                            to={`/product/${product._id}`}
                                            className="cart-product-image"
                                        >

                                            <img
                                                src={
                                                    productImage
                                                }
                                                alt={
                                                    product.name
                                                }
                                            />

                                        </Link>


                                        {/* PRODUCT INFO */}

                                        <div className="cart-product-content">

                                            <Link
                                                to={`/product/${product._id}`}
                                                className="cart-product-title"
                                            >
                                                {product.name}
                                            </Link>


                                            <div className="cart-meta-grid">

                                                <div>

                                                    <span>
                                                        Brand
                                                    </span>

                                                    <strong>
                                                        {product.brand ||
                                                            "NexaCart"}
                                                    </strong>

                                                </div>


                                                <div>

                                                    <span>
                                                        Category
                                                    </span>

                                                    <strong>
                                                        {product.category?.name ||
                                                            "General"}
                                                    </strong>

                                                </div>

                                            </div>


                                            <div className="cart-price-row">

                                                <div>

                                                    <span className="cart-unit-label">
                                                        Unit Price
                                                    </span>

                                                    <strong className="cart-unit-price">
                                                        ₹{" "}
                                                        {product.price.toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </strong>

                                                </div>


                                                <div className="cart-item-total">

                                                    <span>
                                                        Item Total
                                                    </span>

                                                    <strong>
                                                        ₹{" "}
                                                        {(
                                                            product.price *
                                                            item.quantity
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* QUANTITY */}

                                            <div className="cart-bottom-row">

                                                <div className="cart-quantity-box">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            decreaseQuantity(
                                                                item
                                                            )
                                                        }
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <FaMinus />
                                                    </button>


                                                    <span>
                                                        {item.quantity}
                                                    </span>


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            increaseQuantity(
                                                                item
                                                            )
                                                        }
                                                        aria-label="Increase quantity"
                                                    >
                                                        <FaPlus />
                                                    </button>

                                                </div>


                                                {/* ACTIONS */}

                                                <div className="cart-item-actions">

                                                    <button
                                                        type="button"
                                                        className="cart-remove-button"
                                                        onClick={() =>
                                                            removeItem(
                                                                item._id
                                                            )
                                                        }
                                                    >
                                                        <FaTrash />
                                                        Remove
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="cart-buy-button"
                                                        onClick={() =>
                                                            handleBuyNow(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <FaShoppingBag />
                                                        Buy Now
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </article>
                                );
                            }
                        )}

                    </div>


                    {/* =================================================
                        ORDER SUMMARY
                    ================================================= */}

                    <aside className="cart-summary-column">

                        <div className="cart-summary-card">


                            <div className="cart-summary-header">

                                <div>

                                    <span>
                                        CHECKOUT
                                    </span>

                                    <h2>
                                        Order Summary
                                    </h2>

                                </div>

                                <FaShieldAlt />

                            </div>


                            <div className="cart-summary-line">
                                <span>
                                    Subtotal
                                </span>

                                <strong>
                                    ₹{" "}
                                    {totalPrice.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>
                            </div>


                            <div className="cart-summary-line">
                                <span>
                                    GST (18%)
                                </span>

                                <strong>
                                    ₹{" "}
                                    {gst.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>
                            </div>


                            <div className="cart-summary-line">
                                <span>
                                    Delivery
                                </span>

                                <strong className="free-delivery">
                                    FREE
                                </strong>
                            </div>


                            <div className="cart-summary-divider">
                            </div>


                            <div className="cart-grand-total">

                                <span>
                                    Grand Total
                                </span>

                                <strong>
                                    ₹{" "}
                                    {grandTotal.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                            </div>


                            <button
                                type="button"
                                className="cart-checkout-button"
                                onClick={() =>
                                    navigate(
                                        "/checkout"
                                    )
                                }
                            >
                                Proceed To Checkout
                                <FaArrowRight />
                            </button>


                            <div className="cart-secure-note">

                                <FaShieldAlt />

                                <div>

                                    <strong>
                                        Secure Checkout
                                    </strong>

                                    <span>
                                        Your payment and
                                        personal information
                                        are protected.
                                    </span>

                                </div>

                            </div>


                            <div className="cart-payment-strip">
                                <span>
                                    UPI
                                </span>

                                <span>
                                    Razorpay
                                </span>

                            </div>

                            <div className="cart-trust-bar">
                                <Link
                                    to="/payment-security"
                                    className="cart-trust-item cart-trust-link"
                                >
                                    <FaShieldAlt />

                                    <div>
                                        <strong>
                                            Secure Checkout
                                        </strong>

                                        <span>
                                            Protected payment processing.
                                        </span>
                                    </div>

                                    <FaArrowRight className="cart-trust-arrow" />
                                </Link>


                                <Link
                                    to="/checkout"
                                    className="cart-trust-item cart-trust-link"
                                >
                                    <FaShoppingBag />

                                    <div>
                                        <strong>
                                            Easy Checkout
                                        </strong>

                                        <span>
                                            Simple & quick checkout.
                                        </span>
                                    </div>

                                    <FaArrowRight className="cart-trust-arrow" />
                                </Link>


                                <Link
                                    to="/shipping-policy"
                                    className="cart-trust-item cart-trust-link"
                                >
                                    <FaTruck />

                                    <div>
                                        <strong>
                                            Reliable Delivery
                                        </strong>

                                        <span>
                                            Trackable order updates.
                                        </span>
                                    </div>

                                    <FaArrowRight className="cart-trust-arrow" />
                                </Link>

                            </div>
                        </div>
                    </aside>
                </div>


                <div className="cart-promise-strip">
                     <div className="cart-promise-title">
                        NEXACART PROMISE
                    </div>

                    <div className="cart-promise-items">
                        <Link
                            to="/contact-support"
                            className="cart-promise-item"
                        >
                            <div className="cart-promise-content">

                                <strong>
                                    Customer Support
                                </strong>

                                <span>
                                    We're here when you need assistance.
                                </span>

                            </div>

                            <FaArrowRight
                                className="cart-promise-arrow"
                            />
                        </Link>


                        <Link
                            to="/return-policy"
                            className="cart-promise-item"
                        >
                            <div className="cart-promise-content">

                                <strong>
                                    Easy Returns
                                </strong>

                                <span>
                                    Simple return support for eligible orders.
                                </span>

                            </div>

                            <FaArrowRight
                                className="cart-promise-arrow"
                            />
                        </Link>


                        <Link
                            to="/products"
                            className="cart-promise-item"
                        >
                            <div className="cart-promise-content">

                                <strong>
                                    Quality Products
                                </strong>

                                <span>
                                    Carefully selected products for you.
                                </span>

                            </div>

                            <FaArrowRight
                                className="cart-promise-arrow"
                            />
                        </Link>

                    </div>

                </div>

                <div className="cart-final-line">

                    <Link to="/products">
                        Continue Shopping →
                    </Link>

                    <span>
                        © 2026 NexaCart Premium • Experience Uncompromising Quality
                    </span>

                </div>

            </div>

        </div>
    );
}


export default Cart;
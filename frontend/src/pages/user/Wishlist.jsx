import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
    FaArrowRight,
    FaHeart,
    FaShoppingCart,
    FaTrash,
    FaBoxOpen,
    FaEye,
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa";

import {
    getWishlist,
    removeWishlistItem,
} from "../../services/wishlistService";

import { addToCart } from "../../services/cartService";

import "../../styles/wishlist.css";


function Wishlist() {

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);


    // =====================================================
    // FETCH WISHLIST
    // =====================================================

    const fetchWishlist = async () => {

        try {

            const { data } =
                await getWishlist();

            const validWishlist =
                (data.wishlist || []).filter(
                    (item) =>
                        item.product !== null
                );

            setWishlist(validWishlist);

        } catch (error) {

            console.log(error);

            toast.error(
                "Unable To Load Wishlist"
            );

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // REMOVE
    // =====================================================

    const handleRemove = async (id) => {

        if (
            !window.confirm(
                "Remove this product from wishlist?"
            )
        ) {
            return;
        }

        try {

            await removeWishlistItem(id);

            toast.success(
                "Removed From Wishlist"
            );

            fetchWishlist();

        } catch (error) {

            console.log(error);

            toast.error(
                "Unable To Remove"
            );

        }
    };


    // =====================================================
    // MOVE TO CART
    // =====================================================

    const handleMoveToCart =
        async (item) => {

            if (!item.product) {

                toast.error(
                    "Product is no longer available"
                );

                return;
            }

            try {

                await addToCart({
                    product:
                        item.product._id,

                    quantity: 1,
                });


                await removeWishlistItem(
                    item._id
                );


                toast.success(
                    "Product Moved To Cart"
                );


                fetchWishlist();

            } catch (error) {

                console.log(error);

                toast.error(
                    error.response?.data?.message ||
                    "Unable To Move Product"
                );

            }
        };


    // =====================================================
    // LOAD
    // =====================================================

    useEffect(() => {

        fetchWishlist();

    }, []);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="wishlist-page">

                <div className="wishlist-container">

                    <div className="wishlist-loading">

                        <div className="wishlist-loading-spinner">
                        </div>

                        <h3>
                            Loading Your Wishlist
                        </h3>

                        <p>
                            Preparing your saved collection...
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    // =====================================================
    // TOTAL SAVED
    // =====================================================

    const inStockCount =
        wishlist.filter(
            (item) =>
                item.product?.stock > 0
        ).length;

    const outOfStockCount =
        wishlist.length -
        inStockCount;


    return (

        <div className="wishlist-page">

            <div className="wishlist-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <section className="wishlist-header">

                    <div>

                        <span className="wishlist-kicker">
                            NEXACART SAVED COLLECTION
                        </span>

                        <h1>
                            My{" "}
                            <span>
                                Wishlist
                            </span>
                        </h1>

                        <p>
                            Keep your favourite products close,
                            compare them later and move them to
                            your cart whenever you're ready.
                        </p>

                    </div>


                    <div className="wishlist-header-icon">

                        <FaHeart />

                    </div>

                </section>


                {/* =================================================
                    SUMMARY
                ================================================= */}

                <section className="wishlist-stats">

                    <div className="wishlist-stat-card">

                        <div className="wishlist-stat-icon">
                            <FaHeart />
                        </div>

                        <div>

                            <span>
                                Total Saved
                            </span>

                            <strong>
                                {wishlist.length}
                            </strong>

                        </div>

                    </div>


                    <div className="wishlist-stat-card">

                        <div className="wishlist-stat-icon in-stock">
                            <FaCheckCircle />
                        </div>

                        <div>

                            <span>
                                In Stock
                            </span>

                            <strong>
                                {inStockCount}
                            </strong>

                        </div>

                    </div>


                    <div className="wishlist-stat-card">

                        <div className="wishlist-stat-icon out-stock">
                            <FaTimesCircle />
                        </div>

                        <div>

                            <span>
                                Out Of Stock
                            </span>

                            <strong>
                                {outOfStockCount}
                            </strong>

                        </div>

                    </div>


                    <Link
                        to="/products"
                        className="wishlist-shop-button"
                    >

                        Continue Shopping

                        <FaArrowRight />

                    </Link>

                </section>


                {/* =================================================
                    EMPTY WISHLIST
                ================================================= */}

                {wishlist.length === 0 ? (

                    <section className="wishlist-empty">

                        <div className="wishlist-empty-icon">

                            <FaHeart />

                        </div>


                        <span className="wishlist-empty-kicker">
                            SAVED COLLECTION
                        </span>


                        <h2>
                            Your Wishlist Is Empty
                        </h2>


                        <p>
                            Save products you're interested in
                            and come back to them whenever you're ready.
                        </p>


                        <Link
                            to="/products"
                            className="wishlist-primary-button"
                        >

                            Explore Products

                            <FaArrowRight />

                        </Link>

                    </section>

                ) : (

                    <section className="wishlist-products-section">


                        {/* =================================================
                            SECTION TITLE
                        ================================================= */}

                        <div className="wishlist-section-heading">

                            <div>

                                <span>
                                    YOUR SAVED PRODUCTS
                                </span>

                                <h2>
                                    Favourite Picks
                                </h2>

                            </div>


                            <span className="wishlist-count-label">
                                {wishlist.length}{" "}
                                {wishlist.length === 1
                                    ? "Product"
                                    : "Products"}
                            </span>

                        </div>


                        {/* =================================================
                            PRODUCT GRID
                        ================================================= */}

                        <div className="wishlist-grid">

                            {wishlist.map(
                                (item) => {

                                    const product =
                                        item.product;

                                    const image =
                                        product?.images?.[0] ||
                                        "https://placehold.co/500x400?text=NexaCart";

                                    const available =
                                        Number(
                                            product?.stock || 0
                                        ) > 0;

                                    return (

                                        <article
                                            key={
                                                item._id
                                            }
                                            className="wishlist-card"
                                        >


                                            {/* BADGE */}

                                            <div className="wishlist-card-top">

                                                <span className="wishlist-saved-badge">

                                                    <FaHeart />

                                                    Saved

                                                </span>


                                                <button
                                                    type="button"
                                                    className="wishlist-remove-icon"
                                                    onClick={() =>
                                                        handleRemove(
                                                            item._id
                                                        )
                                                    }
                                                    title="Remove from wishlist"
                                                    aria-label="Remove from wishlist"
                                                >

                                                    <FaTrash />

                                                </button>

                                            </div>


                                            {/* IMAGE */}

                                            <Link
                                                to={
                                                    `/product/${product?._id}`
                                                }
                                                className="wishlist-image-wrap"
                                            >

                                                <img
                                                    src={
                                                        image
                                                    }
                                                    alt={
                                                        product?.name ||
                                                        "Product"
                                                    }
                                                    onError={(
                                                        e
                                                    ) => {

                                                        e.currentTarget.src =
                                                            "https://placehold.co/500x400?text=NexaCart";

                                                    }}
                                                />

                                            </Link>


                                            {/* CONTENT */}

                                            <div className="wishlist-card-body">


                                                {/* CATEGORY */}

                                                <span className="wishlist-category">
                                                    {
                                                        product?.category?.name ||
                                                        "Uncategorized"
                                                    }
                                                </span>


                                                {/* NAME */}

                                                <Link
                                                    to={
                                                        `/product/${product?._id}`
                                                    }
                                                    className="wishlist-product-name"
                                                >
                                                    {
                                                        product?.name ||
                                                        "Product"
                                                    }
                                                </Link>


                                                {/* BRAND */}

                                                <span className="wishlist-brand">

                                                    {product?.brand ||
                                                        "NexaCart"}

                                                </span>


                                                {/* PRICE */}

                                                <div className="wishlist-price-row">

                                                    <strong>
                                                        ₹{" "}
                                                        {Number(
                                                            product?.price ||
                                                                0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </strong>

                                                </div>


                                                {/* STOCK */}

                                                <div className="wishlist-stock">

                                                    {available ? (

                                                        <>
                                                            <FaCheckCircle />

                                                            <span>
                                                                In Stock
                                                            </span>
                                                        </>

                                                    ) : (

                                                        <>
                                                            <FaTimesCircle />

                                                            <span>
                                                                Out Of Stock
                                                            </span>
                                                        </>

                                                    )}

                                                </div>


                                                {/* ACTIONS */}

                                                <div className="wishlist-actions">


                                                    <Link
                                                        to={
                                                            `/product/${product?._id}`
                                                        }
                                                        className="wishlist-view-button"
                                                    >

                                                        <FaEye />

                                                        View Details

                                                    </Link>


                                                    <button
                                                        type="button"
                                                        className="wishlist-cart-button"
                                                        disabled={
                                                            !available
                                                        }
                                                        onClick={() =>
                                                            handleMoveToCart(
                                                                item
                                                            )
                                                        }
                                                    >

                                                        <FaShoppingCart />

                                                        {available
                                                            ? "Move To Cart"
                                                            : "Out Of Stock"}

                                                    </button>

                                                </div>


                                                {/* REMOVE TEXT */}

                                                <button
                                                    type="button"
                                                    className="wishlist-remove-button"
                                                    onClick={() =>
                                                        handleRemove(
                                                            item._id
                                                        )
                                                    }
                                                >

                                                    <FaTrash />

                                                    Remove from Wishlist

                                                </button>

                                            </div>

                                        </article>

                                    );
                                }
                            )}

                        </div>

                    </section>

                )}


                {/* =================================================
                    FOOTER LINE
                ================================================= */}

                <div className="wishlist-footer">

                    <span>
                        © 2026 NexaCart Premium
                    </span>

                    <span>
                        Saved Products • Better Shopping Experience
                    </span>

                </div>

            </div>

        </div>
    );
}


export default Wishlist;
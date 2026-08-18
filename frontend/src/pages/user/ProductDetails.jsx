import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    getSingleProduct,
    getRelatedProducts,
} from "../../services/productService";

import {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
} from "../../services/reviewService";

import RelatedProducts from "../../components/product/RelatedProducts";
import { addToWishlist } from "../../services/wishlistService";
import { addToCart } from "../../services/cartService";

import "../../styles/product-details.css";
import "../../styles/product-gallery.css";
import "../../styles/product-specifications.css";
import "../../styles/product-reviews.css";


function ProductDetails() {

    /* =========================================================
       USER
    ========================================================= */

    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();

    const { id } = useParams();


    /* =========================================================
       STATES
    ========================================================= */

    const [product, setProduct] = useState(null);

    const [relatedProducts, setRelatedProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [reviews, setReviews] = useState([]);

    const [editingReview, setEditingReview] = useState(null);

    const [editData, setEditData] = useState({
        rating: 5,
        comment: "",
    });

    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");

    const [quantity, setQuantity] = useState(1);

    const [activeImage, setActiveImage] = useState(0);

    const [selectedVariant, setSelectedVariant] = useState(null);

    const [showAllSpecifications, setShowAllSpecifications] =
        useState(false);

    const [touchStart, setTouchStart] = useState(null);

    const [touchEnd, setTouchEnd] = useState(null);


    /* =========================================================
       PRODUCT IMAGES
    ========================================================= */

    const getProductImages = () => {

        if (
            selectedVariant &&
            Array.isArray(selectedVariant.images) &&
            selectedVariant.images.length > 0
        ) {
            return selectedVariant.images;
        }

        if (
            product &&
            Array.isArray(product.images) &&
            product.images.length > 0
        ) {
            return product.images;
        }

        return [
            "https://placehold.co/700x700?text=No+Image",
        ];
    };


    const images = getProductImages();


    /* =========================================================
       STOCK
    ========================================================= */

    const selectedStock =
        selectedVariant?.stock ?? product?.stock ?? 0;


    /* =========================================================
       RATING BREAKDOWN
    ========================================================= */

    const ratingBreakdown = useMemo(() => {

        const total = reviews.length;

        const counts = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
        };

        reviews.forEach((review) => {

            const reviewRating = Number(review.rating);

            if (counts[reviewRating] !== undefined) {
                counts[reviewRating]++;
            }

        });

        return [5, 4, 3, 2, 1].map((star) => {

            const count = counts[star];

            const percentage =
                total > 0
                    ? Math.round((count / total) * 100)
                    : 0;

            return {
                star,
                count,
                percentage,
            };

        });

    }, [reviews]);


    /* =========================================================
       NEXT IMAGE
    ========================================================= */

    const handleNextImage = () => {

        setActiveImage((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );

    };


    /* =========================================================
       PREVIOUS IMAGE
    ========================================================= */

    const handlePreviousImage = () => {

        setActiveImage((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );

    };


    /* =========================================================
       TOUCH START
    ========================================================= */

    const handleTouchStart = (e) => {

        setTouchStart(
            e.targetTouches[0].clientX
        );

    };


    /* =========================================================
       TOUCH MOVE
    ========================================================= */

    const handleTouchMove = (e) => {

        setTouchEnd(
            e.targetTouches[0].clientX
        );

    };


    /* =========================================================
       TOUCH END
    ========================================================= */

    const handleTouchEnd = () => {

        if (!touchStart || !touchEnd) {
            return;
        }

        const distance = touchStart - touchEnd;

        if (distance > 50) {
            handleNextImage();
        }

        if (distance < -50) {
            handlePreviousImage();
        }

        setTouchStart(null);
        setTouchEnd(null);

    };


    /* =========================================================
       FETCH PRODUCT
    ========================================================= */

    const fetchProduct = async () => {

        try {

            setLoading(true);

            const { data } = await getSingleProduct(id);

            const productData = data.product;

            setProduct(productData);

            setActiveImage(0);

            setQuantity(1);

            /*
             * Automatically select first variant
             */

            if (
                productData.variants &&
                productData.variants.length > 0
            ) {

                const firstAvailableVariant =
                    productData.variants.find(
                        (variant) => variant.stock > 0
                    ) || productData.variants[0];

                setSelectedVariant(
                    firstAvailableVariant
                );

            } else {

                setSelectedVariant(null);

            }


            /* Related products */

            const related =
                await getRelatedProducts(id);

            setRelatedProducts(
                related.data.products || []
            );

        } catch (error) {

            console.log(error);

            toast.error(
                "Unable to load product"
            );

        } finally {

            setLoading(false);

        }

    };


    /* =========================================================
       FETCH REVIEWS
    ========================================================= */

    const fetchReviews = async () => {

        try {

            const { data } =
                await getProductReviews(id);

            setReviews(
                data.reviews || []
            );

        } catch (error) {

            console.log(error);

            setReviews([]);

        }

    };


    /* =========================================================
       SELECT VARIANT
    ========================================================= */

    const handleVariantSelect = (variant) => {

        if (variant.stock <= 0) {
            return;
        }

        setSelectedVariant(variant);

        setActiveImage(0);

        setQuantity(1);

    };


    /* =========================================================
       QUANTITY DECREASE
    ========================================================= */

    const decreaseQuantity = () => {

        setQuantity((prev) =>
            Math.max(1, prev - 1)
        );

    };


    /* =========================================================
       QUANTITY INCREASE
    ========================================================= */

    const increaseQuantity = () => {

        setQuantity((prev) =>
            Math.min(prev + 1, selectedStock)
        );

    };


    /* =========================================================
       ADD TO CART
    ========================================================= */

    const handleAddToCart = async () => {

        if (!user) {

            toast.error(
                "Please Login First"
            );

            return;
        }

        if (selectedStock <= 0) {

            toast.error(
                "Product Out Of Stock"
            );

            return;
        }

        try {

            await addToCart({

                product: product._id,

                quantity,

                color:
                    selectedVariant?.color || "",

            });

            toast.success(
                "Product Added To Cart"
            );

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Unable To Add Product To Cart"
            );

        }

    };


    /* =========================================================
       BUY NOW
    ========================================================= */

    const handleBuyNow = () => {

        if (!user) {

            toast.error(
                "Please Login First"
            );

            return;
        }

        if (selectedStock <= 0) {

            toast.error(
                "Product Out Of Stock"
            );

            return;
        }

        navigate("/checkout", {

            state: {

                product,

                quantity,

                color:
                    selectedVariant?.color || "",

                variant:
                    selectedVariant || null,

            },

        });

    };


    /* =========================================================
       ADD TO WISHLIST
    ========================================================= */

    const handleAddToWishlist = async () => {

        if (!user) {

            toast.error(
                "Please Login First"
            );

            return;
        }

        try {

            await addToWishlist({

                product: product._id,

            });

            toast.success(
                "Product Added To Wishlist"
            );

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Unable To Add To Wishlist"
            );

        }

    };


    /* =========================================================
       SUBMIT REVIEW
    ========================================================= */

    const handleReviewSubmit = async (e) => {

        e.preventDefault();

        if (!user) {

            toast.error(
                "Please Login First"
            );

            return;
        }

        if (!comment.trim()) {

            toast.error(
                "Please write your review"
            );

            return;
        }

        try {

            await addReview({

                product: product._id,

                rating,

                comment: comment.trim(),

            });

            toast.success(
                "Review Added Successfully"
            );

            setRating(5);

            setComment("");

            await fetchReviews();

            await fetchProduct();

        } catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Unable To Add Review"

            );

        }

    };


    /* =========================================================
       DELETE REVIEW
    ========================================================= */

    const handleDeleteReview = async (reviewId) => {

        const confirmed =
            window.confirm(
                "Delete this review?"
            );

        if (!confirmed) {
            return;
        }

        try {

            const { data } =
                await deleteReview(reviewId);

            toast.success(
                data.message ||
                "Review Deleted"
            );

            await fetchReviews();

            await fetchProduct();

        } catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Unable To Delete Review"

            );

        }

    };


    /* =========================================================
       UPDATE REVIEW
    ========================================================= */

    const handleUpdateReview = async () => {

        if (!editData.comment.trim()) {

            toast.error(
                "Review cannot be empty"
            );

            return;
        }

        try {

            await updateReview(

                editingReview._id,

                {
                    rating: editData.rating,

                    comment:
                        editData.comment.trim(),
                }

            );

            toast.success(
                "Review Updated Successfully"
            );

            setEditingReview(null);

            setEditData({
                rating: 5,
                comment: "",
            });

            await fetchReviews();

            await fetchProduct();

        } catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Unable To Update Review"

            );

        }

    };


    /* =========================================================
       EFFECT
    ========================================================= */

    useEffect(() => {

        fetchProduct();

        fetchReviews();

    }, [id]);


    /* =========================================================
       RESET ACTIVE IMAGE WHEN IMAGES CHANGE
    ========================================================= */

    useEffect(() => {

        if (
            activeImage >= images.length
        ) {

            setActiveImage(0);

        }

    }, [images.length, activeImage]);


    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {

        return (

            <div className="product-details-loading">

                <div className="loading-spinner"></div>

                <h3>
                    Loading Product...
                </h3>

                <p>
                    Please wait while we fetch the product details.
                </p>

            </div>

        );

    }


    /* =========================================================
       PRODUCT NOT FOUND
    ========================================================= */

    if (!product) {

        return (

            <div className="product-not-found">

                <div className="not-found-icon">
                    !
                </div>

                <h3>
                    Product Not Found
                </h3>

                <p>
                    The product you're looking for
                    may have been removed.
                </p>

                <Link
                    to="/products"
                    className="back-products-btn"
                >
                    ← Back To Products
                </Link>

            </div>

        );

    }


    /* =========================================================
       MAIN JSX
    ========================================================= */

    return (

        <div className="product-details-page">

            <div className="product-details-container">


                {/* =====================================================
                    PRODUCT TOP SECTION
                ===================================================== */}

                <div className="product-details-row">


                    {/* =================================================
                        LEFT - PRODUCT GALLERY
                    ================================================= */}

                    <div className="product-gallery-section">

                        <div className="product-gallery">


                            {/* Desktop thumbnails */}

                            {images.length > 1 && (

                                <div className="product-thumbnails">

                                    {images.map(
                                        (image, index) => (

                                            <button
                                                key={index}
                                                type="button"
                                                className={
                                                    activeImage === index
                                                        ? "thumbnail-btn active"
                                                        : "thumbnail-btn"
                                                }
                                                onClick={() =>
                                                    setActiveImage(index)
                                                }
                                            >

                                                <img
                                                    src={image}
                                                    alt={`${product.name} ${index + 1}`}
                                                />

                                            </button>

                                        )
                                    )}

                                </div>

                            )}


                            {/* Main image */}

                            <div className="product-main-card">

                                <div
                                    className="product-main-image-wrapper"
                                    onTouchStart={
                                        handleTouchStart
                                    }
                                    onTouchMove={
                                        handleTouchMove
                                    }
                                    onTouchEnd={
                                        handleTouchEnd
                                    }
                                >

                                    <img
                                        src={images[activeImage]}
                                        alt={product.name}
                                        className="product-main-image"
                                    />


                                    {/* Navigation */}

                                    {images.length > 1 && (

                                        <>

                                            <button
                                                type="button"
                                                className="gallery-nav gallery-prev"
                                                onClick={
                                                    handlePreviousImage
                                                }
                                                aria-label="Previous image"
                                            >
                                                ‹
                                            </button>

                                            <button
                                                type="button"
                                                className="gallery-nav gallery-next"
                                                onClick={
                                                    handleNextImage
                                                }
                                                aria-label="Next image"
                                            >
                                                ›
                                            </button>

                                        </>

                                    )}


                                    {/* Image counter */}

                                    {images.length > 1 && (

                                        <div className="image-counter">

                                            {activeImage + 1}
                                            {" / "}
                                            {images.length}

                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* Mobile thumbnails */}

                            {images.length > 1 && (

                                <div className="mobile-product-thumbnails">

                                    {images.map(
                                        (image, index) => (

                                            <button
                                                key={index}
                                                type="button"
                                                className={
                                                    activeImage === index
                                                        ? "mobile-thumbnail active"
                                                        : "mobile-thumbnail"
                                                }
                                                onClick={() =>
                                                    setActiveImage(index)
                                                }
                                            >

                                                <img
                                                    src={image}
                                                    alt={`${product.name} ${index + 1}`}
                                                />

                                            </button>

                                        )
                                    )}

                                </div>

                            )}


                            {/* =================================================
                                PRODUCT META
                            ================================================= */}

                            <div className="product-meta-card">

                                <div className="product-meta-item">

                                    <span className="meta-label">
                                        Brand
                                    </span>

                                    <span className="meta-value">
                                        {product.brand || "N/A"}
                                    </span>

                                </div>


                                <div className="product-meta-item">

                                    <span className="meta-label">
                                        Category
                                    </span>

                                    <span className="meta-value">
                                        {product.category?.name ||
                                            "N/A"}
                                    </span>

                                </div>


                                <div className="product-meta-item">

                                    <span className="meta-label">
                                        Availability
                                    </span>

                                    {selectedStock > 0 ? (

                                        <span className="stock-badge in-stock">
                                            <span>●</span>
                                            In Stock
                                        </span>

                                    ) : (

                                        <span className="stock-badge out-stock">
                                            <span>●</span>
                                            Out Of Stock
                                        </span>

                                    )}

                                </div>


                                <div className="product-meta-item">

                                    <span className="meta-label">
                                        Available Qty
                                    </span>

                                    <span className="meta-value">
                                        {selectedStock}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        RIGHT - PRODUCT INFORMATION
                    ================================================= */}

                    <div className="product-info-section">


                        {/* Product badge */}

                        <div className="product-top-badge">
                            PRODUCT DETAILS
                        </div>


                        {/* Title */}

                        <h1 className="product-title">
                            {product.name}
                        </h1>


                        {/* Rating */}

                        <div className="product-rating-row">

                            <div className="product-stars">

                                {[1, 2, 3, 4, 5].map(
                                    (star) => (

                                        <span
                                            key={star}
                                            className={
                                                star <=
                                                Math.round(
                                                    product.rating || 0
                                                )
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            ★
                                        </span>

                                    )
                                )}

                            </div>

                            <strong>
                                {product.rating?.toFixed(1) ||
                                    "0.0"}
                            </strong>

                            <span className="rating-separator">
                                |
                            </span>

                            <span>
                                {product.numReviews || 0}
                                {" "}
                                Reviews
                            </span>

                        </div>


                        {/* Price */}

                        <div className="product-price-block">

                            <span className="price-label">
                                Our Price
                            </span>

                            <div className="product-price">

                                ₹{" "}
                                {(
                                    selectedVariant?.price ??
                                    product.price ??
                                    0
                                ).toLocaleString("en-IN")}

                            </div>

                            <span className="price-note">
                                Inclusive of all applicable taxes
                            </span>

                        </div>


                        {/* Description */}

                        <div className="product-description-box">

                            <h4>
                                About this product
                            </h4>

                            <p className="product-description">
                                {product.description}
                            </p>

                        </div>


                        {/* =================================================
                            SPECIFICATIONS
                        ================================================= */}

                        {product.specifications &&
                            Object.keys(
                                product.specifications
                            ).length > 0 && (

                                <div className="product-specifications-card">

                                    <div className="specifications-header">

                                        <div>

                                            <span className="section-mini-label">
                                                PRODUCT INFORMATION
                                            </span>

                                            <h4>
                                                Specifications
                                            </h4>

                                            <p>
                                                Key product details and technical information
                                            </p>

                                        </div>

                                    </div>


                                    <div
                                        className={
                                            showAllSpecifications
                                                ? "specifications-table-wrapper expanded"
                                                : "specifications-table-wrapper"
                                        }
                                    >

                                        <table className="specifications-table">

                                            <tbody>

                                                {Object.entries(
                                                    product.specifications
                                                ).map(
                                                    (
                                                        [key, value],
                                                        index
                                                    ) => (

                                                        <tr
                                                            key={key}
                                                            className={
                                                                !showAllSpecifications &&
                                                                index >= 5
                                                                    ? "specification-hidden"
                                                                    : ""
                                                            }
                                                        >

                                                            <th>
                                                                {key}
                                                            </th>

                                                            <td>
                                                                {String(
                                                                    value
                                                                )}
                                                            </td>

                                                        </tr>

                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>


                                    {Object.keys(
                                        product.specifications
                                    ).length > 5 && (

                                        <button
                                            type="button"
                                            className="specifications-toggle"
                                            onClick={() =>
                                                setShowAllSpecifications(
                                                    (prev) =>
                                                        !prev
                                                )
                                            }
                                        >

                                            <span>
                                                {showAllSpecifications
                                                    ? "Show less"
                                                    : "View all specifications"}
                                            </span>

                                            <span
                                                className={
                                                    showAllSpecifications
                                                        ? "specifications-arrow rotate"
                                                        : "specifications-arrow"
                                                }
                                            >
                                                ↓
                                            </span>

                                        </button>

                                    )}

                                </div>

                            )}


                        {/* =================================================
                            VARIANTS
                        ================================================= */}

                        {product.variants &&
                            product.variants.length > 0 && (

                                <div className="variant-section">

                                    <div className="variant-heading">

                                        <div>

                                            <span className="section-mini-label">
                                                AVAILABLE OPTIONS
                                            </span>

                                            <h4>
                                                Choose Color
                                            </h4>

                                        </div>

                                        <span className="selected-color">
                                            {selectedVariant?.color ||
                                                "Select"}
                                        </span>

                                    </div>


                                    <div className="variant-list">

                                        {product.variants.map(
                                            (
                                                variant,
                                                index
                                            ) => {

                                                const isSelected =
                                                    selectedVariant?._id ===
                                                    variant._id;

                                                const variantImage =
                                                    variant.images &&
                                                    variant.images.length >
                                                        0
                                                        ? variant.images[0]
                                                        : product.images?.[0];

                                                return (

                                                    <button
                                                        key={
                                                            variant._id ||
                                                            index
                                                        }
                                                        type="button"
                                                        className={
                                                            isSelected
                                                                ? "variant-card selected"
                                                                : "variant-card"
                                                        }
                                                        disabled={
                                                            variant.stock <=
                                                            0
                                                        }
                                                        onClick={() =>
                                                            handleVariantSelect(
                                                                variant
                                                            )
                                                        }
                                                    >

                                                        <div className="variant-image">

                                                            <img
                                                                src={
                                                                    variantImage ||
                                                                    "https://placehold.co/120x120?text=No+Image"
                                                                }
                                                                alt={
                                                                    variant.color
                                                                }
                                                            />

                                                        </div>

                                                        <span className="variant-color">
                                                            {variant.color}
                                                        </span>

                                                        {variant.stock <=
                                                            0 && (

                                                            <span className="variant-out">
                                                                Out of stock
                                                            </span>

                                                        )}

                                                    </button>

                                                );

                                            }
                                        )}

                                    </div>

                                </div>

                            )}


                        {/* =================================================
                            QUANTITY
                        ================================================= */}

                        <div className="quantity-section">

                            <div>

                                <span className="section-mini-label">
                                    QUANTITY
                                </span>

                                <div className="quantity-control">

                                    <button
                                        type="button"
                                        onClick={
                                            decreaseQuantity
                                        }
                                        disabled={
                                            quantity === 1
                                        }
                                    >
                                        −
                                    </button>

                                    <span>
                                        {quantity}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={
                                            increaseQuantity
                                        }
                                        disabled={
                                            quantity >=
                                            selectedStock
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                            </div>

                            <div className="quantity-stock">

                                {selectedStock > 0 ? (
                                    <>
                                        <span className="stock-dot"></span>
                                        {selectedStock} available
                                    </>
                                ) : (
                                    <>
                                        <span className="stock-dot danger"></span>
                                        Currently unavailable
                                    </>
                                )}

                            </div>

                        </div>


                        {/* =================================================
                            ACTION BUTTONS
                        ================================================= */}
                        <div className="product-action-buttons">

                            <button
                                type="button"
                                className="product-cart-action"
                                onClick={handleAddToCart}
                                disabled={selectedStock <= 0}
                            >
                                Add To Cart
                            </button>

                            <button
                                type="button"
                                className="product-buy-action"
                                onClick={handleBuyNow}
                                disabled={selectedStock <= 0}
                            >
                                Buy Now
                            </button>

                            <button
                                type="button"
                                className="product-wishlist-action"
                                onClick={handleAddToWishlist}
                            >
                                Wishlist
                            </button>

                        </div>

                        <div className="product-offer-strip">
                            🚚 Free delivery on orders above
                            <strong>₹999</strong>
                            • Secure Razorpay payments
                        </div>


                        {/* Trust information */}

                        <div className="product-trust-row">
                            <Link
                                to="/privacy-policy"
                                className="product-trust-link"
                            >
                                <span className="trust-icon">
                                    ✓
                                </span>

                                <span>
                                    Secure Checkout
                                </span>
                            </Link>


                            <div className="product-trust-static">
                                <span className="trust-icon">
                                    ✓
                                </span>

                                <span>
                                    Quality Assured
                                </span>
                            </div>


                            <Link
                                to="/help"
                                className="product-trust-link"
                            >
                                <span className="trust-icon">
                                    ✓
                                </span>

                                <span>
                                    Easy Support
                                </span>
                            </Link>

                        </div>


                        {/* Back */}

                        <Link
                            to="/products"
                            className="back-products-link"
                        >
                            ← Back To Products
                        </Link>

                    </div>

                </div>


                {/* =====================================================
                    CUSTOMER REVIEWS
                ===================================================== */}

                <section className="reviews-section">


                    {/* Reviews heading */}

                    <div className="reviews-heading">

                        <span className="reviews-eyebrow">
                            CUSTOMER FEEDBACK
                        </span>

                        <h2>
                            Customer Reviews
                        </h2>

                        <p>
                            Real experiences from customers who purchased
                            this product.
                        </p>

                    </div>


                    {/* =================================================
                        REVIEW SUMMARY
                    ================================================= */}

                    <div className="reviews-summary">


                        {/* Overall */}

                        <div className="overall-rating">

                            <span className="summary-label">
                                OVERALL RATING
                            </span>

                            <div className="overall-rating-number">
                                {product.rating?.toFixed(1) ||
                                    "0.0"}
                            </div>

                            <div className="overall-stars">

                                {[1, 2, 3, 4, 5].map(
                                    (star) => (

                                        <span
                                            key={star}
                                            className={
                                                star <=
                                                Math.round(
                                                    product.rating || 0
                                                )
                                                    ? "star active"
                                                    : "star"
                                            }
                                        >
                                            ★
                                        </span>

                                    )
                                )}

                            </div>

                            <div className="overall-review-count">
                                Based on{" "}
                                {product.numReviews || 0}
                                {" "}
                                reviews
                            </div>

                        </div>


                        {/* Rating breakdown */}

                        <div className="rating-breakdown">

                            <div className="rating-info-title">
                                Customer satisfaction
                            </div>

                            <p>
                                See how customers rated this product.
                            </p>


                            <div className="rating-bars">

                                {ratingBreakdown.map(
                                    (item) => (

                                        <div
                                            className="rating-bar-row"
                                            key={item.star}
                                        >

                                            <span className="rating-star-label">
                                                {item.star} ★
                                            </span>

                                            <div className="progress-track">

                                                <div
                                                    className="progress-fill"
                                                    style={{
                                                        width: `${item.percentage}%`,
                                                    }}
                                                ></div>

                                            </div>

                                            <span className="rating-percent">
                                                {item.percentage}%
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        WRITE REVIEW
                    ================================================= */}

                    <div className="write-review-card">

                        <div className="write-review-header">

                            <div className="write-review-title">

                                <div className="write-review-icon">
                                    ✦
                                </div>

                                <div>

                                    <h3>
                                        Write a Review
                                    </h3>

                                    <p>
                                        Share your experience with other shoppers.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <form
                            onSubmit={
                                handleReviewSubmit
                            }
                        >


                            {/* Rating */}

                            <div className="review-rating-input">

                                <label>
                                    Your Rating
                                </label>

                                <div className="review-stars">

                                    {[1, 2, 3, 4, 5].map(
                                        (star) => (

                                            <button
                                                key={star}
                                                type="button"
                                                className={
                                                    star <= rating
                                                        ? "review-star active"
                                                        : "review-star"
                                                }
                                                onClick={() =>
                                                    setRating(
                                                        star
                                                    )
                                                }
                                                aria-label={`Rate ${star} stars`}
                                            >
                                                ★
                                            </button>

                                        )
                                    )}

                                </div>

                            </div>


                            {/* Comment */}

                            <div className="review-comment-field">

                                <label htmlFor="review-comment">
                                    Your Review
                                </label>

                                <textarea
                                    id="review-comment"
                                    value={comment}
                                    onChange={(e) =>
                                        setComment(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Tell other shoppers about your experience with this product..."
                                    rows="5"
                                    required
                                />

                                <span>
                                    Your honest feedback helps other shoppers make better decisions.
                                </span>

                            </div>


                            {/* Submit */}

                            <div className="review-submit-row">

                                <button
                                    type="submit"
                                    className="submit-review-btn"
                                >
                                    Submit Review
                                    <span>
                                        →
                                    </span>
                                </button>

                            </div>

                        </form>

                    </div>


                    {/* =================================================
                        EXISTING REVIEWS
                    ================================================= */}

                    <div className="customer-review-list">


                        <div className="customer-review-list-header">

                            <div>

                                <span className="section-mini-label">
                                    CUSTOMER EXPERIENCES
                                </span>

                                <h3>
                                    Recent Reviews
                                </h3>

                            </div>

                            <span className="review-count-badge">
                                {reviews.length}
                                {" "}
                                {reviews.length === 1
                                    ? "Review"
                                    : "Reviews"}
                            </span>

                        </div>


                        {/* No reviews */}

                        {reviews.length === 0 ? (

                            <div className="no-reviews-card">

                                <div className="no-reviews-icon">
                                    ★
                                </div>

                                <h4>
                                    No Reviews Yet
                                </h4>

                                <p>
                                    Be the first customer to share
                                    your experience with this product.
                                </p>

                            </div>

                        ) : (


                            /* Review list */

                            <div className="reviews-list">

                                {reviews.map(
                                    (review) => {

                                        const currentUserId =
                                            user?.id ||
                                            user?._id;

                                        const reviewUserId =
                                            review.user?._id ||
                                            review.user?.id ||
                                            review.user;


                                        const isOwner =
                                            currentUserId &&
                                            String(
                                                currentUserId
                                            ) ===
                                            String(
                                                reviewUserId
                                            );


                                        return (

                                            <article
                                                key={review._id}
                                                className="customer-review-card"
                                            >


                                                {/* Review top */}

                                                <div className="customer-review-top">

                                                    <div className="reviewer-info">

                                                        <div className="reviewer-avatar">

                                                            {review.user?.name
                                                                ?.charAt(
                                                                    0
                                                                )
                                                                ?.toUpperCase() ||
                                                                "U"}

                                                        </div>

                                                        <div>

                                                            <h4>
                                                                {review.user?.name ||
                                                                    "Customer"}
                                                            </h4>

                                                            <small>
                                                                {review.createdAt
                                                                    ? new Date(
                                                                          review.createdAt
                                                                      ).toLocaleDateString(
                                                                          "en-GB",
                                                                          {
                                                                              day: "2-digit",
                                                                              month: "short",
                                                                              year: "numeric",
                                                                          }
                                                                      )
                                                                    : "Recently"}
                                                            </small>

                                                        </div>

                                                    </div>


                                                    {/* Rating */}

                                                    <div className="customer-review-rating">

                                                        {[1, 2, 3, 4, 5].map(
                                                            (star) => (

                                                                <span
                                                                    key={star}
                                                                    className={
                                                                        star <=
                                                                        Number(
                                                                            review.rating
                                                                        )
                                                                            ? "active"
                                                                            : ""
                                                                    }
                                                                >
                                                                    ★
                                                                </span>

                                                            )
                                                        )}

                                                    </div>

                                                </div>


                                                {/* Comment */}

                                                <div className="customer-review-content">

                                                    <p>
                                                        {review.comment}
                                                    </p>

                                                </div>


                                                {/* Actions */}

                                                {isOwner && (

                                                    <div className="review-actions">

                                                        <button
                                                            type="button"
                                                            className="review-edit-btn"
                                                            onClick={() => {

                                                                setEditingReview(
                                                                    review
                                                                );

                                                                setEditData({

                                                                    rating:
                                                                        review.rating,

                                                                    comment:
                                                                        review.comment,

                                                                });

                                                            }}
                                                        >
                                                            Edit
                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="review-delete-btn"
                                                            onClick={() =>
                                                                handleDeleteReview(
                                                                    review._id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                )}


                                                {/* =================================================
                                                    EDIT REVIEW
                                                ================================================= */}

                                                {editingReview &&
                                                    editingReview._id ===
                                                        review._id && (

                                                        <div className="edit-review-box">

                                                            <h4>
                                                                Edit Your Review
                                                            </h4>


                                                            <div className="edit-rating">

                                                                {[1, 2, 3, 4, 5].map(
                                                                    (star) => (

                                                                        <button
                                                                            key={star}
                                                                            type="button"
                                                                            className={
                                                                                star <=
                                                                                editData.rating
                                                                                    ? "active"
                                                                                    : ""
                                                                            }
                                                                            onClick={() =>
                                                                                setEditData(
                                                                                    {
                                                                                        ...editData,
                                                                                        rating:
                                                                                            star,
                                                                                    }
                                                                                )
                                                                            }
                                                                        >
                                                                            ★
                                                                        </button>

                                                                    )
                                                                )}

                                                            </div>


                                                            <textarea
                                                                value={
                                                                    editData.comment
                                                                }
                                                                onChange={(e) =>
                                                                    setEditData(
                                                                        {
                                                                            ...editData,
                                                                            comment:
                                                                                e.target.value,
                                                                        }
                                                                    )
                                                                }
                                                                rows="4"
                                                            />


                                                            <div className="edit-review-actions">

                                                                <button
                                                                    type="button"
                                                                    className="save-review-btn"
                                                                    onClick={
                                                                        handleUpdateReview
                                                                    }
                                                                >
                                                                    Save Changes
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    className="cancel-review-btn"
                                                                    onClick={() =>
                                                                        setEditingReview(
                                                                            null
                                                                        )
                                                                    }
                                                                >
                                                                    Cancel
                                                                </button>

                                                            </div>

                                                        </div>

                                                    )}

                                            </article>

                                        );

                                    }
                                )}

                            </div>

                        )}

                    </div>

                </section>


                {/* =====================================================
                    RELATED PRODUCTS
                ===================================================== */}

                {relatedProducts.length > 0 && (

                    <div className="related-products-wrapper">

                        <RelatedProducts
                            products={
                                relatedProducts
                            }
                        />

                    </div>

                )}

            </div>

        </div>

    );

}


export default ProductDetails;
import React from "react";
import { Link } from "react-router-dom";

import { addToCart } from "../../services/cartService";
import { toast } from "react-toastify";

import "../../styles/product-card.css";

function ProductCard({ product }) {

    const handleAddToCart = async () => {

        try {

            await addToCart({
                product: product._id,
                quantity: 1,
            });

            toast.success("Product Added To Cart");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Please Login First"
            );
        }
    };

    return (
        <div className="product-card">

            {/* PRODUCT IMAGE */}

            <Link
                to={`/product/${product._id}`}
                className="product-card-image-link"
            >

                <div className="product-card-image">

                    {/* {product.stock > 0 && (
                        <span className="product-available-badge">
                            In Stock
                        </span>
                    )} */}

                    <img
                        src={
                            product.images?.[0] ||
                            product.image ||
                            "https://via.placeholder.com/300x250?text=No+Image"
                        }
                        alt={product.name}
                    />

                </div>

            </Link>


            {/* PRODUCT CONTENT */}

            <div className="product-card-body">

                <span className="product-category">
                    {product.category?.name || "Product"}
                </span>


                <Link
                    to={`/product/${product._id}`}
                    className="product-name-link"
                >

                    <h5 className="product-card-title">
                        {product.name}
                    </h5>

                </Link>


                <p className="product-card-description">

                    {product.description?.length > 65
                        ? product.description.substring(0, 65) + "..."
                        : product.description}

                </p>


                <div className="product-card-price-row">

                    <h4 className="product-card-price">
                        ₹ {product.price}
                    </h4>

                    {product.discount > 0 && (
                        <span className="product-discount">
                            {product.discount}% OFF
                        </span>
                    )}

                </div>


                <div className="product-card-bottom">

                    <p className="product-stock">

                        {product.stock > 0 ? (
                            <span className="in-stock">
                                ● In Stock
                            </span>
                        ) : (
                            <span className="out-stock">
                                ● Out Of Stock
                            </span>
                        )}

                    </p>

                </div>


                {/* BUTTONS */}

                <div className="product-card-buttons">

                    <Link
                        to={`/product/${product._id}`}
                        className="product-details-btn"
                    >
                        View Details
                    </Link>

                    <button
                        className="product-cart-btn"
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                    >
                        Add To Cart
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductCard;
import React from "react";
import { Link } from "react-router-dom";

import { addToCart } from "../../services/cartService";
import { addToWishlist } from "../../services/wishlistService";
import { toast } from "react-toastify";

function ProductCard({ product }) {

    const handleAddToCart = async () => {
        try {
            await addToCart({
                product: product._id,
                quantity: 1,
            });
            toast.success("Product Added To Wishlist");

        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Please Login First"
            ); 
        }
    };

    return (

        <div className="card h-100 shadow-sm border-0">

            {/* Product Image */}
            <img
                src={
                 product.image
                    ? "/src/assets/images/"+ product.image
                    : "https://via.placeholder.com/300x250?text=No+Image"
                }
                className="card-img-top"
                alt={product.name}
                style={{
                    height: "250px",
                    objectFit: "cover"
                }}
            />

            <div className="card-body d-flex flex-column">

                {/* Category */}
                <span className="badge bg-primary mb-2 align-self-start">
                    {product.category?.name}
                </span>

                {/* Product Name */}
                <h5 className="card-title">
                    {product.name}
                </h5>

                {/* Description */}
                <p className="card-text text-muted">
                    {product.description?.length > 70
                        ? product.description.substring(0, 70) + "..."
                        : product.description}
                </p>

                {/* Price */}
                <h4 className="text-success fw-bold">
                    ₹ {product.price}
                </h4>

                {/* Stock */}
                <p className="mb-3">
                    {
                        product.stock > 0
                            ? (
                                <span className="text-success">
                                    In Stock
                                </span>
                            )
                            : (
                                <span className="text-danger">
                                    Out Of Stock
                                </span>
                            )
                    }
                </p>

                {/* Buttons */}
                <div className="mt-auto d-grid gap-2">

                    <Link
                        to={`/product/${product._id}`}
                        className="btn btn-dark"
                    >
                        View Details
                    </Link>

                    <button
                        className="btn btn-primary"
                        onClick={handleAddToCart}
                    >
                        Add To Cart
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ProductCard;
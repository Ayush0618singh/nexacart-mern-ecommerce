import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
    getSingleProduct,
    getRelatedProducts,
} from "../../services/productService";

import RelatedProducts from "../../components/product/RelatedProducts";
import { addToWishlist } from "../../services/wishlistService";
import { addToCart } from "../../services/cartService";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {

        try {

            const { data } = await getSingleProduct(id);
            setProduct(data.product);

            const related = await getRelatedProducts(id);
            setRelatedProducts(related.data.products);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load product");

        } finally {

            setLoading(false);

        }

    };

    const handleAddToWishlist = async () => {

    try {

        await addToWishlist({
            product: product._id,
        });

        toast.success("Product Added To Wishlist");

    } catch (error) {

        console.log(error);

        toast.error(
            error.response?.data?.message || "Please Login First"
        );

    } 

};
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
            error.response?.data?.message || "Please Login First"

        );
    }
};

    useEffect(() => {

        fetchProduct();

    }, [id]);

    if (loading) {

        return (
            <div className="text-center py-5">
                <h3>Loading...</h3>
            </div>
        );

    }

    if (!product) {

        return (
            <div className="text-center py-5">

                <h3>Product Not Found</h3>

            </div>
        );

    }

    return (

        <div className="container py-5">

            <div className="row">

                <div className="col-md-6">

                    <img
                        src={
                            product.image
                                ? "/src/assets/images/" + product.image
                                : "https://placehold.co/600x500"
                        }
                        alt={product.name}
                        className="img-fluid rounded shadow"
                    />

                </div>

                <div className="col-md-6">

                    <h2 className="fw-bold">

                        {product.name}

                    </h2>

                    <h3 className="text-success mt-3">

                        ₹ {product.price}

                    </h3>

                    <p className="mt-4">

                        {product.description}

                    </p>

                    <hr />

                    <h5>

                        Brand :

                        <span className="text-primary ms-2">

                            {product.brand}

                        </span>

                    </h5>

                    <h5>

                        Category :

                        <span className="text-primary ms-2">

                            {product.category?.name}

                        </span>

                    </h5>

                    <h5>

                        Stock :

                        {

                            product.stock > 0

                                ?

                                <span className="text-success ms-2">

                                    In Stock

                                </span>

                                :

                                <span className="text-danger ms-2">

                                    Out Of Stock

                                </span>

                        }

                    </h5>

                    <div className="mt-4 d-flex gap-3">

                        <button 
                            className="btn btn-primary"
                            onClick={handleAddToCart}
                        >
                            Add To Cart

                        </button>

                       <button
                           className="btn btn-outline-danger"
                           onClick={handleAddToWishlist}
                        >
                            Wishlist
                        </button>

                    </div>

                    <Link
                        to="/products"
                        className="btn btn-dark mt-4"
                    >

                        ← Back To Products

                    </Link>

                </div>

            </div>

            <RelatedProducts
                products={relatedProducts}
            />

        </div>
        

    );

}

export default ProductDetails;
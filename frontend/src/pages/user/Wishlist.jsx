import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
    getWishlist,
    removeWishlistItem,
} from "../../services/wishlistService";

function Wishlist() {

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {

        try {

            const { data } = await getWishlist();

            setWishlist(data.wishlist);

        } catch (error) {

            console.log(error);

            toast.error("Unable To Load Wishlist");

        } finally {

            setLoading(false);

        }

    };

    const handleRemove = async (id) => {

        try {

            await removeWishlistItem(id);

            toast.success("Removed From Wishlist");

            fetchWishlist();

        } catch (error) {

            console.log(error);

            toast.error("Unable To Remove");

        }

    };

    useEffect(() => {

        fetchWishlist();

    }, []);

    if (loading) {

        return (

            <div className="container py-5 text-center">

                <h3>Loading...</h3>

            </div>

        );

    }

    return (

        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="fw-bold">

                    My Wishlist

                </h2>

                <Link
                    to="/products"
                    className="btn btn-outline-primary"
                >

                    Continue Shopping

                </Link>

            </div>

            {
                wishlist.length === 0 ?

                    (

                        <div className="card shadow border-0">

                            <div className="card-body text-center py-5">

                                <h4>

                                    Wishlist Empty

                                </h4>

                                <Link
                                    to="/products"
                                    className="btn btn-primary mt-3"
                                >

                                    Browse Products

                                </Link>

                            </div>

                        </div>

                    )

                    :

                    (

                        <div className="row">

                            {

                                wishlist.map((item) => (

                                    <div
                                        className="col-md-4 mb-4"
                                        key={item._id}
                                    >

                                        <div className="card h-100">

                                            <img
                                                src={
                                                    item.product.image
                                                        ? "/src/assets/images/" + item.product.image
                                                        : "https://via.placeholder.com/300"
                                                }
                                                className="card-img-top"
                                                style={{
                                                    height: "250px",
                                                    objectFit: "cover"
                                                }}
                                                alt={item.product.name}
                                            />

                                            <div className="card-body">

                                                <h5>

                                                    {item.product.name}

                                                </h5>

                                                <h4 className="text-success">

                                                    ₹ {item.product.price}

                                                </h4>

                                                <button
                                                    className="btn btn-danger w-100 mt-3"
                                                    onClick={() => handleRemove(item._id)}
                                                >

                                                    Remove

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

}

export default Wishlist;
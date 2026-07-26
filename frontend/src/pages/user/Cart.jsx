import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
    getCartItems,
    updateCartQuantity,
    deleteCartItem,
} from "../../services/cartService";

function Cart() {

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {

        try {

            const { data } = await getCartItems();
            setCart(data.cart);

        } catch (error) {

            console.log(error);
            toast.error("Unable To Load Cart");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchCart();

    }, []);

    const increaseQuantity = async (item) => {

        try {

            await updateCartQuantity(item._id, {
                quantity: item.quantity + 1,
            });

            fetchCart();

        } catch (error) {

            toast.error("Unable To Update Cart");

        }

    };

    const decreaseQuantity = async (item) => {

        if (item.quantity <= 1) return;

        try {

            await updateCartQuantity(item._id, {
                quantity: item.quantity - 1,
            });

            fetchCart();

        } catch (error) {

            toast.error("Unable To Update Cart");

        }

    };

    const removeItem = async (id) => {

        try {

            await deleteCartItem(id);

            toast.success("Item Removed");

            fetchCart();

        } catch (error) {

            toast.error("Unable To Remove Item");

        }

    };

    const totalPrice = cart.reduce((total, item) => {

        return total + item.product.price * item.quantity;

    }, 0);

    if (loading) {

        return (
            <div className="text-center py-5">
                <h3>Loading...</h3>
            </div>
        );

    }

    if (cart.length === 0) {

        return (
            <div className="container py-5">

                <h2 className="mb-4">Shopping Cart</h2>

                <div className="card shadow-sm">

                    <div className="card-body text-center">

                        <h4>Your Cart Is Empty</h4>

                        <p className="text-muted">

                            Looks like you haven't added any products yet.

                        </p>

                        <Link
                            to="/products"
                            className="btn btn-primary"
                        >
                            Browse Products
                        </Link>

                    </div>

                </div>

            </div>
        );

    }

    return (

        <div className="container py-5">

            <h2 className="mb-4 fw-bold">

                Shopping Cart

            </h2>

            <div className="row">

                <div className="col-lg-8">

                    {
                        cart.map((item) => (

                            <div
                                key={item._id}
                                className="card mb-3 shadow-sm"
                            >

                                <div className="row g-0">

                                    <div className="col-md-3">

                                        <img
                                            src={
                                                item.product.image
                                                    ? "/src/assets/images/" + item.product.image
                                                    : "https://placehold.co/300x250"
                                            }
                                            className="img-fluid rounded-start"
                                            alt={item.product.name}
                                        />

                                    </div>

                                    <div className="col-md-9">

                                        <div className="card-body">

                                            <h5>

                                                {item.product.name}

                                            </h5>

                                            <h4 className="text-success">

                                                ₹ {item.product.price}

                                            </h4>

                                            <div className="d-flex align-items-center gap-2 mt-3">

                                                <button
                                                    className="btn btn-outline-dark"
                                                    onClick={() => decreaseQuantity(item)}
                                                >
                                                    -
                                                </button>

                                                <span>

                                                    {item.quantity}

                                                </span>

                                                <button
                                                    className="btn btn-outline-dark"
                                                    onClick={() => increaseQuantity(item)}
                                                >
                                                    +
                                                </button>

                                            </div>

                                            <button
                                                className="btn btn-danger mt-3"
                                                onClick={() => removeItem(item._id)}
                                            >

                                                Remove

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))
                    }

                </div>

                <div className="col-lg-4">

                    <div className="card shadow">

                        <div className="card-body">

                            <h4>

                                Order Summary

                            </h4>

                            <hr />

                            <h5>

                                Total : ₹ {totalPrice}

                            </h5>

                            <button
                                className="btn btn-success w-100 mt-3"
                            >

                                Proceed To Checkout

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Cart;
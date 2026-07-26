import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getMyOrders } from "../../services/orderService";

function Orders() {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {

        try {

            const { data } = await getMyOrders();

            setOrders(data.orders);

        } catch (error) {

            console.log(error);

            toast.error("Unable To Load Orders");

        }

    };

    useEffect(() => {

        fetchOrders();

    }, []);

    return (

        <div className="container py-5">

            <h2 className="fw-bold mb-4">

                My Orders

            </h2>

            {
                orders.length === 0 ? (

                    <div className="alert alert-info">

                        No Orders Found

                    </div>

                ) : (

                    orders.map((order) => (

                        <div
                            key={order._id}
                            className="card shadow-sm mb-4"
                        >

                            <div className="card-body">

                                <h5>

                                    Order ID :
                                    {" "}
                                    {order._id}

                                </h5>

                                <p>

                                    <strong>Status :</strong>

                                    {" "}

                                    {order.orderStatus}

                                </p>

                                <p>

                                    <strong>Total :</strong>

                                    ₹ {order.totalPrice}

                                </p>

                                <p>

                                    <strong>Payment :</strong>

                                    {" "}

                                    {order.paymentMethod}

                                </p>

                                <hr />

                                {
                                    order.products.map((item) => (

                                        <div
                                            key={item._id}
                                            className="d-flex justify-content-between mb-2"
                                        >

                                            <span>

                                               {item.product ? item.product.name : "Product Not Available"}

                                                {" × "}

                                                {item.quantity}

                                            </span>

                                            <span>

                                               ₹ {item.product ? item.product.price : 0}

                                            </span>

                                        </div>

                                    ))
                                }

                            </div>

                        </div>

                    ))

                )
            }

        </div>

    );

}

export default Orders;
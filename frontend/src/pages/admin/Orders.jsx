import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    getAdminOrders,
    updateOrderStatus,
} from "../../services/adminService";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    const fetchOrders = async () => {
        try {

            const { data } = await getAdminOrders();

            console.log(data);

            setOrders(data.orders);

        } catch (error) {

            console.log(error);

            toast.error("Unable To Load Orders");

        }

    };

    const handleStatusChange = async (id, status) => {

        try {

            await updateOrderStatus(id, status);
            toast.success("Order Status Updated");
            fetchOrders();
        } catch (error) {
                console.log(error);
                toast.error("Unable To Update Status");

            }

    };

    useEffect(() => {

        fetchOrders();

    }, []);

    const filteredOrders = orders.filter((order) => {
        const matchSearch =
            order.user?.name
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            order.user?.email
                ?.toLowerCase()
                .includes(search.toLowerCase());

        const matchStatus =
            statusFilter === "All"

                ||

            order.orderStatus === statusFilter;
        
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(
        filteredOrders.length / ordersPerPage
    );

    const indexOfLastOrder =
        currentPage * ordersPerPage;

    const indexOfFirstOrder =
        indexOfLastOrder - ordersPerPage;

    const currentOrders = filteredOrders.slice(
        indexOfFirstOrder,
        indexOfLastOrder
    );

    return (

        <div className="container py-5 admin-orders-page">
            <h2 className="fw-bold mb-4">

                Manage Orders

            </h2>

            <div className="row mb-3">
                <div className="col-md-6">
                    <input
                        style={{
                            borderRadius: "10px",
                        }}
                        type="text"
                        className="form-control"
                        placeholder="Search by User Name or Email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <select
                        className="form-select form-select-sm shadow-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        
                    </select>
                </div>
            </div>

            <div className="card shadow">
                <div className="card-body">
                    <table className="table table-hover table-bordered align-middle text-center">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Email</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Order Status</th>
                                <th>Order Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                currentOrders.map((order, index) => (
                                    <tr key={order._id}>
                                        <td>
                                            {indexOfFirstOrder + index + 1}
                                        </td>

                                        <td>
                                            <span className="badge bg-dark">
                                                #{order._id.slice(-6)}
                                            </span>
                                        </td>

                                        <td>
                                            {order.user?.name}
                                        </td>

                                        <td>
                                            {order.user?.email}
                                        </td>

                                        <td>
                                            ₹{Number(order.totalPrice).toLocaleString("en-IN")}
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${
                                                    order.paymentMethod === "COD"
                                                        ? "bg-warning text-dark"
                                                        : "bg-success"
                                                }`}
                                            >

                                                {order.paymentMethod}

                                            </span>
                                        </td>

                                        <td>
                                            <div className="mb-2">
                                                <span
                                                    className={`badge ${
                                                        order.orderStatus === "Delivered"
                                                            ? "bg-success"
                                                            : order.orderStatus === "Processing"
                                                            ? "bg-warning text-dark"
                                                            : order.orderStatus === "Shipped"
                                                            ? "bg-primary"
                                                            : order.orderStatus === "Cancelled"
                                                            ? "bg-danger"
                                                            : "bg-secondary"
                                                    }`}
                                                >
                                                    {order.orderStatus}
                                                </span>
                                            </div>

                                            <select
                                                className="form-select form-select-sm"
                                                value={order.orderStatus}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        order._id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>

                                                <option value="Processing">
                                                    Processing
                                                </option>
                                                <option value="Shipped">
                                                    Shipped
                                                </option>

                                                <option value="Delivered">
                                                    Delivered
                                                </option>
                                            </select>
                                        </td>

                                        <td>
                                            {new Date(order.createdAt).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </td>
                                        
                                        <td>
                                            <button
                                                className="btn btn-primary btn-sm px-3"
                                                onClick={() => setSelectedOrder(order)}
                                            >
                                                👁 View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <div className="d-flex justify-content-center mt-4">
                        <button
                            className="btn btn-outline-primary me-2"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>

                        <span className="align-self-center fw-bold">

                            Page {currentPage} of {totalPages}

                        </span>

                        <button
                            className="btn btn-outline-primary ms-2"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next

                        </button>
                    </div>
                </div>
            </div>

            {
                selectedOrder && (
                    <div
                        className="modal fade show"
                        style={{
                            display: "block",
                            background: "rgba(0,0,0,.5)"
                        }}
                    >
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Order Details
                                    </h5>

                                    <button
                                        className="btn-close"
                                        onClick={() =>
                                            setSelectedOrder(null)
                                        }
                                    ></button>
                                </div>
                                
                                <div className="modal-body">

                                    <p><strong>Order ID :</strong>  {selectedOrder._id}</p>

                                    <div className="card border-0 shadow-sm mb-3">
                                        <div className="card-body">

                                            <h5 className="fw-bold mb-3">

                                                👤 Customer Information

                                            </h5>

                                            <p><strong>Customer :</strong> {selectedOrder.user?.name}</p>
                                            <p><strong>Email :</strong> {selectedOrder.user?.email}</p>
                                            <p><strong>Phone :</strong> {selectedOrder.phone}</p>
                                            <p><strong>Address :</strong> {selectedOrder.shippingAddress}</p>

                                        </div>
                                    </div>
                                    
                                    <div className="card border-0 shadow-sm mb-3">
                                        <div className="card-body">
                                            <h5 className="fw-bold mb-3">

                                                💳 Payment Information

                                            </h5>

                                            <p>
                                                <strong>Payment :</strong>{" "}
                                                {
                                                    selectedOrder.paymentMethod === "COD" ? (
                                                        <span className="badge bg-warning text-dark">

                                                            💵 Cash On Delivery

                                                        </span>

                                                    ) : (
                                                        <span className="badge bg-success">

                                                            ✅ Online Payment

                                                        </span>
                                                    )
                                                }
                                            </p>

                                            <p className="mt-3">
                                                <strong>Status :</strong>{" "}
                                                <span
                                                    className={`badge ${
                                                        selectedOrder.orderStatus === "Delivered"
                                                            ? "bg-success"

                                                            : selectedOrder.orderStatus === "Processing"
                                                            ? "bg-warning text-dark"

                                                            : selectedOrder.orderStatus === "Shipped"
                                                            ? "bg-primary"

                                                            : "bg-secondary"
                                                    }`}
                                                >

                                                    {selectedOrder.orderStatus}

                                                </span>
                                            </p>

                                            <p className="mt-3">
                                                <strong>Total :</strong>{" "}
                                                <span className="text-success fw-bold fs-5">

                                                    ₹{Number(selectedOrder.totalPrice).toLocaleString("en-IN")}

                                                </span>
                                            </p>

                                        </div>
                                    </div>
                                        
                                    <hr />

                                    <h6>
                                        Ordered Products
                                    </h6>

                                   {
                                        selectedOrder.products.map((item) => {
                                            console.log(item.product);
                                                return (
                                                    <div
                                                        key={item._id}
                                                        className="card border-0 shadow-sm mb-3"
                                                    >
                                                        <div className="card-body d-flex align-items-center">

                                                            <img
                                                            src={
                                                                    item.product?.images?.[0]
                                                                        ? item.product.images?.[0]
                                                                        : "https://placehold.co/300x250"
                                                                }
                                                                alt={item.product?.name}
                                                                width="70"
                                                                height="70"
                                                                className="rounded border me-3"
                                                                style={{
                                                                    objectFit: "cover",
                                                                }}
                                                            />

                                                           <div className="flex-grow-1">
                                                                <h5 className="fw-bold mb-2">
                                                                    {item.product?.name}
                                                                </h5>

                                                                <p className="text-muted mb-1">
                                                                    Quantity :
                                                                    <strong> {item.quantity}</strong>
                                                                </p>

                                                                <h6 className="text-success fw-bold">
                                                                    ₹ {Number(item.product?.price).toLocaleString("en-IN")}
                                                                </h6>

                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    <hr />

                                    <h5>
                                        Total :
                                        ₹{selectedOrder.totalPrice}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Orders;
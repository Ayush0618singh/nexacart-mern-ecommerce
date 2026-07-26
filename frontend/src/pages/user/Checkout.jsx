import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { getCartItems } from "../../services/cartService";
import { placeOrder } from "../../services/orderService";

function Checkout() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        phone: "",
        city: "",
        state: "",
        pincode: "",
        paymentMethod: "COD",
    });
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const fetchCart = async () => {
        try {
            const { data } = await getCartItems();
            setCartItems(data.cart);
            const total = data.cart.reduce((sum, item) => {
                return sum + item.product.price * item.quantity;

            }, 0);
            setTotalPrice(total);

        } catch (error) {
            console.log(error);
            toast.error("Unable to load cart");
        }
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,

        });
    };
    const handlePlaceOrder = async () => {
        try {
            const shippingAddress =
                `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;
                const { data } = await placeOrder({
                    shippingAddress,
                    phone: formData.phone,
                    paymentMethod: formData.paymentMethod,
                });
                toast.success(data.message);
                navigate("/orders");

        } catch (error) {
                console.log(error);
                toast.error(
                    error.response?.data?.message ||
                    "Order Failed"
                );
            }
        };
        useEffect(() => {
            fetchCart();

        }, []);
        return (
        <div className= "container py-5">
            <h2 className="fw-bold mb-4">
                Checkout
            </h2>
            <div className="row">

                {/* Left Side */}
                <div className="col-lg-7">

                    {/* Billing Details */}
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body">
                            <h4 className="mb-3">
                                Billing Details
                            </h4>
                            <form>
                                <div className="mb-3">
                                    <label className="form-control">
                                        Full Name 
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Full Name"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />

                                </div>
                                <div className="mb-3">
                                    <label className="form-control">
                                        Address
                                    </label>
                                    <textarea 
                                        className="form-control"
                                        rows="3"
                                        placeholder="Enter Address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Phone Number 
                                    </label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Mobile Number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="row"> 
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            City 
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Entry City"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            State 
                                        </label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter State"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Pincode 
                                    </label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Pincode"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h4 className="mb-3">
                                Payment Method 
                            </h4>

                            <div className="form-check">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    checked 
                                    readOnly 
                                />

                                <label className="form-check-label"> 
                                    Cash on Delivery
                                </label>

                            </div>
                            <div className="form-check mt-2">
                                <input 
                                    className="form-check-input"
                                    type="radio"
                                    value="COD"
                                    checked={formData.paymentMethod === "COD"}
                                    onChange={handleChange}
         
                                />
                                <label className="form-check-label">
                                    Online Payment
                                </label>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    value="UPI"
                                    checked={formData.paymentMethod === "UPI"}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="col-lg-5">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h4 className="mb-3">
                                Order Summary 
                            </h4>
                            <div className="mb-3">
                                {
                                    cartItems.length > 0 ? (
                                        cartItems.map((item) => (
                                            <div 
                                                key={item._id}
                                                className="d-flex justify-content-between mb-2">
                                                    <span>
                                                        {item.product.name} ×  {item.quantity}                 
                                                    </span>
                                                    <span>
                                                        ₹ {item.product.price * item.quantity}
                                                    </span>
                                            </div>

                                        ))
                                    ) : (
                                        <p className="text-muted">
                                            No Products In Cart 
                                        </p>
                                    )
                                }
                            </div>
                            <hr/>
                            <div className="d-flex justify-content-between">
                                <span>Subtotal</span>
                                <span>
                                    ₹ {totalPrice}
                                </span>
                            </div>
                            <hr/>
                            <div className="d-flex justify-content-between mt-2">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <hr/>
                            <div className="d-flex justify-content-between fw-bold">
                                <span>Total</span>
                                <span>
                                      ₹ {totalPrice}
                                </span>
                                
                            </div>
                            <button 
                                className="btn btn-success w-100 mt-4"
                                onClick={handlePlaceOrder}
                            >
                                Place Order 
                            </button>                                                   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { AuthContext } from "../../context/AuthContext";

function Navbar() {
    const { user, setUser } = useContext(AuthContext);
    console.log(user);
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        setUser(null);

        toast.success("Logout Successfully");

        navigate("/login");

    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

            <div className="container">

                {/* Logo */}
                <Link className="navbar-brand fw-bold" to="/">
                    MERN Shop
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Products
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/wishlist">
                                Wishlist
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                Cart
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/orders">
                                Orders
                            </Link>
                        </li>

                        {
                            user?.role === "admin" && (
                                <li className="nav-item">
                                    <Link 
                                        className="nav-link"
                                        to="/admin/dashboard"
                                    >
                                        Admin 

                                    </Link>
                                </li>
                            )
                        }

                        {
                            user ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile">
                                            Profile
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <button
                                            className="btn btn-link nav-link"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
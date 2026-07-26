import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

function Login() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [formData, setFormData] = useState({
        
        email: "",
        password: "",

    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

       console.log("Login Button Clicked");
       console.log(formData);
        
        try {
            const { data } = await loginUser(formData);
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);

            toast.success(data.message);

            navigate("/");

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login Failed"
            );
        }
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow">    
                        <div className="card-body">
                            <h3 className="text-center mb-4">

                                Login

                            </h3>

                            <form onSubmit={handleSubmit}>

                                {/* Email */}
                                <div className="mb-3"> 
                                    <label className="form-label">
                                
                                        Email

                                    </label>

                                    <input 
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label className="form-label">

                                        Password

                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Button */}
                                <button
                                    className="btn btn-primary w-100"
                                    type="submit"
                                >

                                    Login

                                </button>
                            </form>

                            <p className="mt-3 text-center">

                                Don't have an account?{" "}
                            
                                <Link to="/register">

                                    Register

                                </Link>
                            </p>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default Login;

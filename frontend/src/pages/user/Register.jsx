import React from "react";
import { Link } from "react-router-dom"

function Register() {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card shadow border-0">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">

                                Create Account

                            </h2>

                            <form>
                                <div className="mb-3">
                                    <label className="form-label">

                                        FullName

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Your Name"
                                    />

                                </div>

                                <div className="mb-3">
                                    <label className="form-label">

                                        Email

                                    </label>

                                    <input 
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Your Email"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">

                                        Password 

                                    </label>

                                    <input 
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                    />

                                </div>

                                <button 
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Register 

                                </button>
                            </form>

                            <p className="text-center mt-3">

                                Already have an account?

                                <Link 
                                    to="/login"
                                    className="ms-2"
                                >
                                    Login 

                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
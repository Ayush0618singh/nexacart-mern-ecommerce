import React from "react";

function Dashboard() {

    return (

        <div className="container py-5">
            <h2 className="fw-bold mb-4">

                Admin Dashboard

            </h2>
            <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h3>0</h3>
                            <p>Total Products</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h3>0</h3>

                            <p>Total Categories</p>

                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">

                            <h3>0</h3>

                            <p>Total Orders</p>

                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h3>₹0</h3>

                            <p>Total Revenue</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Dashboard;
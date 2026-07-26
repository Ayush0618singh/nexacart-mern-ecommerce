import React from "react";
function Newsletter() {
    return (
        <section className="container my-5">
            <h2>

                Subscribe Newsletter

            </h2>

            <div className="row">
                <div className="col-md-6">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                    />
                </div>

                <div className="col-md-2">
                    <button className="btn btn-dark w-100">

                        Subscribe

                    </button>
                </div>
            </div>
        </section>
    );
}

export default Newsletter;
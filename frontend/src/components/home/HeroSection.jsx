import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <section className="py-5 bg-light">
            <div className="container">
                <div className="row align-items-center">

                    <div className="col-lg-6">
                        <h1 className="display-4 fw-bold">

                            Discover Amazing Products

                        </h1>

                        <p className="lead mt-3">

                            Shop the latest fashion, electronics, accessories and much more at the best prices.

                        </p>
                        <Link 
                            to="/products"
                            className="btn btn-primary btn-lg mt-3"
                        >

                            Shop Now

                        </Link>
                    </div>

                    <div className="col-lg-6 text-center">
                        <img
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
                            alt="Hero"
                            className="img-fuild rounded"
                        />
                    </div>
                </div>
            </div>
        </section>
    );

}

export default HeroSection;
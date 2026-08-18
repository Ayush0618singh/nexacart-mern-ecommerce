import React from "react";
import { Link } from "react-router-dom";

function OfferBanner() {

    return (
        <section className="offer-section">

            <div className="offer-banner">

                <div className="offer-decoration offer-decoration-one"></div>
                <div className="offer-decoration offer-decoration-two"></div>

                <div className="offer-icon">
                    %
                </div>

                <div className="offer-content">

                    <span className="offer-label">
                        LIMITED TIME OFFER
                    </span>

                    <h2>
                        Big Sale - Up To 50% OFF
                    </h2>

                    <p>
                        Grab your favorite products at amazing prices.
                        Don't miss out on these special offers.
                    </p>

                </div>

                <Link
                    to="/products"
                    className="offer-btn"
                >
                    Shop Now
                    <span>→</span>
                </Link>

            </div>

        </section>
    );
}

export default OfferBanner;
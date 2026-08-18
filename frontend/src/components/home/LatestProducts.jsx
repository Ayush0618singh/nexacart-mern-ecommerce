import React from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../product/ProductGrid";

function LatestProducts({ products }) {

    return (
        <section className="products-section latest-products-section">

            <div className="products-section-header">

                <div>

                    <span className="section-eyebrow">
                        NEW ARRIVALS
                    </span>

                    <h2>
                        Latest Products
                    </h2>

                    <p>
                        Check out our newest arrivals and
                        discover something you will love.
                    </p>

                </div>

                <Link
                    to="/products"
                    className="products-view-all"
                >
                    View All
                    <span>→</span>
                </Link>

            </div>

            <ProductGrid products={products} />

        </section>
    );
}

export default LatestProducts;
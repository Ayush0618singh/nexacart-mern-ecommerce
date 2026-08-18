import React from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../product/ProductGrid";

function FeaturedProducts({ products }) {

    return (
        <section className="products-section">

            <div className="products-section-header">

                <div>

                    <span className="section-eyebrow">
                        FEATURED
                    </span>

                    <h2>
                        Featured Products
                    </h2>

                    <p>
                        Explore our most popular products
                        selected specially for you.
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

export default FeaturedProducts;
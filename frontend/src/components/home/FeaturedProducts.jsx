import React from "react";

import ProductGrid from "../product/productGrid";

function FeaturedProducts({ products }) {
    return (
        <section className="container my-5">
            <h2>

                Featured Products

            </h2>

            <ProductGrid products={products}/>
            
        </section>
    );
}

export default FeaturedProducts;
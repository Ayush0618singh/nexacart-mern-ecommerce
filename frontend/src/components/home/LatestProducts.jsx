import React from "react";

import ProductGrid from "../product/ProductGrid";

function LatestProducts({ products }) {
    return (
        <section className="container my-5">
            <h2 className="mb-4">
                Latest Products
            </h2>

            <ProductGrid products= {products}/>

        </section>
    );
}

export default LatestProducts;
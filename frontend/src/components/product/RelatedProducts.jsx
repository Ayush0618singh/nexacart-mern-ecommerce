import React from "react";
import ProductGrid from "./ProductGrid";

function RelatedProducts({ products }) {

    if (!products || products.length === 0) {

        return null;

    }

    return (

        <div className="mt-5">

            <h3 className="fw-bold mb-4">

                Related Products

            </h3>

            <ProductGrid products={products} />

        </div>

    );

}

export default RelatedProducts;
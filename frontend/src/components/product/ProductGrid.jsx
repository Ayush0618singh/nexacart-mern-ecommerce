import React from "react";
import ProductCard from "./ProductCard";

function ProductGrid({ products }) {

    return (
        <div className="product-grid">

            {products?.map((product) => (

                <ProductCard
                    key={product._id}
                    product={product}
                />

            ))}

        </div>
    );
}

export default ProductGrid;
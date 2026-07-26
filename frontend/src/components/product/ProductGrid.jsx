import React from "react";
import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
    return(
        <div className="row">
            {
                products?.map((product) => (
                    <div
                        key={product._id}
                        className="col-md-3 mb-4"
                    >
                        <ProductCard product={product}/>

                    </div>
                ))
            }
        </div>
    );
}

export default ProductGrid;
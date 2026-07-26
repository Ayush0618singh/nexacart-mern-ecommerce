import React from "react";

function ProductSearch({ search, setSearch }) {
    return(
        <div className= "mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Search Products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

        </div>

    );
}

export default ProductSearch;
import React, { useEffect } from "react";

function ProductSearch({ search, setSearch }) {

    useEffect(() => {
        console.log("ProductSearch Mounted");
    }, []);
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
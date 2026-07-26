import React from "react";

function ProductSort({ sort, setSort }) {
    return (
        <select 
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
        >

            <option value="">

                Default

            </option>

            <option value="price">

                Price Low To High

            </option>

            <option value="-price">

                Price High To Low

            </option>

            <option value="name">

                Name A-Z

            </option>

            <option value="-createdAt">

                Newest

            </option>

        </select>
    );
}

export default ProductSort;
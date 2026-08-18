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

            <option value="priceLow">
                Price Low To High
            </option>

            <option value="priceHigh">
                Price High To Low
            </option>

            <option value="nameAZ">
                Name A-Z
            </option>

            <option value="oldest">
                Oldest
            </option>

            <option value="">
                Newest
            </option>

        </select>
    );
}

export default ProductSort;
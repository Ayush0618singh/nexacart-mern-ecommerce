import React from "react";

function ProductFilter({
    category,
    setCategory,
    categories = []

}) {
    return(
        <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        >

            <option value="">

                All Categories

            </option>

        {
            categories.map((item) => (
                <option
                    key={item._id}
                    value={item._id}
                >
                    {item.name}
                </option>
            ))
        }
        </select>
    );
}

export default ProductFilter;
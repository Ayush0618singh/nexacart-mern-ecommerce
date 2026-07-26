import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import ProductSearch from "../../components/product/ProductSearch";
import ProductFilter from "../../components/product/ProductFilter";
import ProductSort from "../../components/product/ProductSort";
import ProductGrid from "../../components/product/ProductGrid";

import { getAllProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";

function Products() {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    const [sort, setSort] = useState("");

    const [page, setPage] = useState(1); 

    const [totalPages, setTotalPages] = useState(1);

    //Fetch Products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await getAllProducts({
                page,
                limit:8,
                keyword: search,
                category,
                sort,
            });

            setProducts(data.products || []);
            setTotalPages(data.totalPages || 1);
        }
        catch (error) {
            toast.error("Unbale to Load Products");
        }
        finally {
            setLoading(false);
        }
    };

    //Fetch Categories
    const fetchCategories = async () => {
        try {
            const { data } = await getCategories();
            setCategories(data);
        }
        catch(error) {
            toast.error("Failed To Load Categories");
        }
    };

    //Products Effect
    useEffect(() => {
        fetchProducts();

    }, [page, search, category, sort]);

    //Categories Effect
    useEffect(() => {
        fetchCategories();

    }, []);

    //Loading
    if (loading) {
        return (
            <div className="text-center mt-5">
                <h3>Loading Products...</h3>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4">

                All Products

            </h2>
            
            <div className="row mb-4">

                {/* Search */}
                <div className="col-md-4">
                    <ProductSearch
                        search={search}
                        setSearch={setSearch}
                    />
                </div>

                {/* Category */}
                <div className="col-md-4">
                    <ProductFilter
                        category={category}
                        setCategory={setCategory}
                        categories={categories}
                    />
                </div>

                {/* Sort */}
                <div className="col-md-4">
                    <ProductSort
                        sort={sort}
                        setSort={setSort}
                    />
                </div>
            </div>

            {/* Product Grid */}
            <ProductGrid
                products={products}
            />
        </div>
    );
}

export default Products;


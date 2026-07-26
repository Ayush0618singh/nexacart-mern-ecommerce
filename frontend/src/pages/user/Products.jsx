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

    // Fetch Products
    const fetchProducts = async () => {

        try {

            setLoading(true);

            const { data } = await getAllProducts({
                page,
                limit: 8,
                keyword: search,
                category,
                sort,
            });

            setProducts(data.products || []);
            setTotalPages(data.totalPages || 1);

        } catch (error) {

            console.log(error);
            toast.error("Unable to load products");

        } finally {

            setLoading(false);

        }

    };

    // Fetch Categories
    const fetchCategories = async () => {

        try {

            const { data } = await getCategories();

            if (data.categories) {
                setCategories(data.categories);
            } else {
                setCategories(data);
            }

        } catch (error) {

            console.log(error);
            toast.error("Unable to load categories");

        }

    };

    useEffect(() => {

        fetchProducts();

    }, [page, search, category, sort]);

    useEffect(() => {

        fetchCategories();

    }, []);

    if (loading) {

        return (

            <div className="container py-5 text-center">

                <h3>Loading Products...</h3>

            </div>

        );

    }

    return (

        <div className="container py-5">

            <h2 className="fw-bold mb-4">
                All Products
            </h2>

            <div className="row mb-4">

                <div className="col-md-4">

                    <ProductSearch
                        search={search}
                        setSearch={setSearch}
                    />

                </div>

                <div className="col-md-4">

                    <ProductFilter
                        category={category}
                        setCategory={setCategory}
                        categories={categories}
                    />

                </div>

                <div className="col-md-4">

                    <ProductSort
                        sort={sort}
                        setSort={setSort}
                    />

                </div>

            </div>

            <ProductGrid
                products={products}
            />

            {/* Pagination Next Step */}
            <div className="d-flex justify-content-center mt-4">

                <button
                    className="btn btn-outline-primary me-2"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous

                </button>

                <span className="align-self-center fw-bold">

                    Page {page} of {totalPages}

                </span>

                <button
                    className="btn btn-outline-primary ms-2"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>

            </div>

        </div>

    );

}

export default Products;
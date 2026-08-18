import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import ProductFilter from "../../components/product/ProductFilter";
import ProductSort from "../../components/product/ProductSort";
import ProductGrid from "../../components/product/ProductGrid";

import { getAllProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";

import "../../styles/products-page.css";

function Products() {

    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategory, setSubcategory] = useState("");

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    // Fetch Products
    const fetchProducts = async () => {
        try {
            if (products.length === 0) {
                setLoading(true);
            }
            const { data } = await getAllProducts({
                page,
                limit: 8,
                keyword: debouncedSearch,
                category,
                subcategory,
                sort,
            });
            const fetchedProducts =
                data.products || [];

            const normalizedQuery =
                debouncedSearch.trim().toLowerCase();


            const rankedProducts =
                [...fetchedProducts].sort((a, b) => {

                    if (!normalizedQuery) {
                        return 0;
                    }

                    const aName =
                        a.name?.toLowerCase() || "";

                    const bName =
                        b.name?.toLowerCase() || "";

                    const aBrand =
                        a.brand?.toLowerCase() || "";

                    const bBrand =
                        b.brand?.toLowerCase() || "";


                    const aTags =
                        Array.isArray(a.searchTags)
                            ? a.searchTags.join(" ").toLowerCase()
                            : "";

                    const bTags =
                        Array.isArray(b.searchTags)
                            ? b.searchTags.join(" ").toLowerCase()
                            : "";


                    const getScore = (
                        name,
                        brand,
                        tags
                    ) => {

                        if (name === normalizedQuery) {
                            return 0;
                        }

                        if (
                            name.startsWith(
                                normalizedQuery
                            )
                        ) {
                            return 1;
                        }

                        if (
                            brand.startsWith(
                                normalizedQuery
                            )
                        ) {
                            return 2;
                        }

                        if (
                            tags.includes(
                                normalizedQuery
                            )
                        ) {
                            return 3;
                        }

                        if (
                            name.includes(
                                normalizedQuery
                            )
                        ) {
                            return 4;
                        }

                        if (
                            brand.includes(
                                normalizedQuery
                            )
                        ) {
                            return 5;
                        }

                        return 6;
                    };


                    return (
                        getScore(
                            aName,
                            aBrand,
                            aTags
                        ) -
                        getScore(
                            bName,
                            bBrand,
                            bTags
                        )
                    );
                });


            setProducts(rankedProducts);
            // console.log(data.products);
            // console.log(data.products.length);
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

            const allCategories =
                data.categories || data || [];

            setCategories(allCategories);

            const categoryFromURL =
                searchParams.get("category");

            if (categoryFromURL) {

                // Home page se category ID aa rahi hai
                const matchedCategory =
                    allCategories.find(
                        (item) =>
                            String(item._id) ===
                            String(categoryFromURL)
                    );

                if (matchedCategory) {

                    setCategory(
                        matchedCategory._id
                    );

                } else {

                    // Invalid category ID ho to
                    // category filter clear rakho
                    setCategory("");

                }

            } else {

                // URL me category nahi hai
                setCategory("");
            }

        } catch (error) {

            console.log(error);

            toast.error(
                "Unable to load categories"
            );
        }
    };
    useEffect(() => {

        fetchProducts();

    }, [debouncedSearch, category, subcategory, sort, page]);

    useEffect(() => {

        setPage(1);

    }, [debouncedSearch, category, subcategory, sort]);

   useEffect(() => {
        fetchCategories();
    }, [searchParams]);

    useEffect(() => {

        const urlSearch =
            searchParams.get("search") || "";

        setSearch(urlSearch);
        setDebouncedSearch(urlSearch);
        setPage(1);
    }, [searchParams]);

    return (
        <div className="products-page">

            <div className="products-page-container">

                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <section className="products-page-header">

                    <div>

                        <span className="products-page-kicker">
                            NEXACART COLLECTION
                        </span>

                        <h1>
                            Discover{" "}
                            <span>
                                Products
                            </span>
                        </h1>

                        <p>
                            Explore our collection, refine your search,
                            compare products and find what fits you best.
                        </p>

                    </div>

                    <div className="products-page-count">
                        <span>
                            AVAILABLE PRODUCTS
                        </span>

                        <strong>
                            {products.length}
                        </strong>
                    </div>

                </section>


                {/* =================================================
                    FILTER / SEARCH TOOLBAR
                ================================================= */}

                <section className="products-toolbar">

                    <div className="products-search-box">

                        <span>
                            🔎
                        </span>

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>


                    <div className="products-filter-box">

                        <ProductFilter
                            category={category}
                            setCategory={setCategory}
                            subcategory={subcategory}
                            setSubcategory={setSubcategory}
                            categories={categories}
                        />

                    </div>


                    <div className="products-sort-box">

                        <ProductSort
                            sort={sort}
                            setSort={setSort}
                        />

                    </div>

                </section>


                {/* =================================================
                    SEARCH RESULT INFO
                ================================================= */}

                {(debouncedSearch ||
                    category ||
                    subcategory ||
                    sort) && (

                    <div className="products-active-filters">

                        <div>

                            <span>
                                FILTERED RESULTS
                            </span>

                            <strong>
                                {products.length} products found
                            </strong>

                        </div>

                        {debouncedSearch && (
                            <span className="products-filter-chip">
                                Search: "{debouncedSearch}"
                            </span>
                        )}

                    </div>

                )}


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div className="products-loading">

                        <div className="products-loading-spinner" />

                        <h3>
                            Loading Products
                        </h3>

                        <p>
                            Finding the best products for you...
                        </p>

                    </div>

                )}


                {/* =================================================
                    PRODUCTS GRID
                ================================================= */}

                {!loading && (

                    <section className="products-results-section">

                        <div className="products-results-heading">

                            <div>

                                <span>
                                    PRODUCT COLLECTION
                                </span>

                                <h2>
                                    Shop Our Selection
                                </h2>

                            </div>

                            <span className="products-page-range">
                                Page {page} of {totalPages}
                            </span>

                        </div>

                        <ProductGrid
                            products={products}
                        />

                    </section>

                )}


                {/* =================================================
                    PAGINATION
                ================================================= */}

                {!loading &&
                    products.length > 0 && (

                    <div className="products-pagination">

                        <button
                            type="button"
                            disabled={page === 1}
                            onClick={() =>
                                setPage(page - 1)
                            }
                        >
                            ← Previous
                        </button>

                        <span>
                            Page{" "}
                            <strong>
                                {page}
                            </strong>{" "}
                            of{" "}
                            <strong>
                                {totalPages}
                            </strong>
                        </span>

                        <button
                            type="button"
                            disabled={
                                page === totalPages
                            }
                            onClick={() =>
                                setPage(page + 1)
                            }
                        >
                            Next →
                        </button>

                    </div>

                )}


                {/* =================================================
                    EMPTY RESULT
                ================================================= */}

                {!loading &&
                    products.length === 0 && (

                    <div className="products-empty">

                        <div className="products-empty-icon">
                            ✦
                        </div>

                        <span>
                            NO MATCHING PRODUCTS
                        </span>

                        <h2>
                            Nothing found here
                        </h2>

                        <p>
                            Try a different search term or
                            adjust your filters to explore more products.
                        </p>

                    </div>

                )}


                {/* =================================================
                    FOOTER LINE
                ================================================= */}

                <div className="products-page-footer">

                    <span>
                        © 2026 NexaCart Premium
                    </span>

                    <span>
                        Quality Products • Better Shopping Experience
                    </span>

                </div>

            </div>

        </div>
    );
}

export default Products;
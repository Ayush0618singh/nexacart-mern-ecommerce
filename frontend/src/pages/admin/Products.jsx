import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getCategories } from "../../services/categoryService";

import {
    getAdminProducts,
    deleteProduct,
    toggleFeatured,
    
} from "../../services/adminService";

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState(null);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");

    const [sortBy, setSortBy] = useState("latest");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [stockFilter, setStockFilter] = useState("");
    const [totalPages, setTotalPages] = useState(1);

    const productsPerPage = 5;

    const navigate = useNavigate();
    const fetchProducts = async () => {
    try {
        console.log("Current Page:", currentPage);
       const { data } = await getAdminProducts(
            currentPage,
            productsPerPage,
            search,
            selectedCategory,
            selectedBrand,
            stockFilter,
            sortBy
        );

        console.log("API Response:", data);
        
        setProducts(data.products);
        setTotalPages(data.totalPages);

    } catch (error) {

        console.log(error);
        toast.error("Unable To Load Products");
    }

};

const fetchCategories = async () => {
    try {
        const { data } = await getCategories();
        setCategories(data.categories);

    } catch (error) {
        console.log(error);
    }
};

const handleDelete = async (id) => {
    try {
        const { data } = await deleteProduct(id);
        toast.success(data.message);
        fetchProducts();
        setDeleteId(null);

    } catch (error) {

        console.log(error);
        toast.error(
            error.response?.data?.message ||
            "Unable To Delete Product"
        );
    }
};

const handleToggleFeatured = async (id) => {

    try {

        const { data } = await toggleFeatured(id);

        toast.success(data.message);
        fetchProducts();

    } catch (error) {

        console.log(error);

        toast.error(
            error.response?.data?.message ||
            "Unable To Update Featured Status"
        );
    }
};

useEffect(() => {
    fetchProducts();
}, [
    currentPage,
    search,
    selectedCategory,
    selectedBrand,
    stockFilter,
    sortBy
]);

useEffect(() => {
    fetchCategories();
    
}, []);

   return (
        <div className="container py-5 admin-products-page">
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold mb-0">
                            Manage Products
                        </h2>

                        <button
                            className="btn btn-success"
                            onClick={() => navigate("/admin/product/add")}
                        >
                            + Add Product
                        </button>

                    </div>

                    <div className="row g-3">
                        <div className="col-lg-4">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="🔍 Search Product..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>

                        <div className="col-lg-2">
                            <select
                                className="form-select"
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                            >

                                <option value="">
                                    Category
                                </option>

                                {
                                    categories.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category.name}
                                        >
                                            {category.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="col-lg-2">
                            <select
                                className="form-select"
                                value={selectedBrand}
                                onChange={(e) =>
                                    setSelectedBrand(e.target.value)
                                }
                            >
                                <option value="">
                                    Brand
                                </option>

                                {
                                    [...new Set(products.map(p => p.brand))]
                                    .map((brand) => (

                                        <option
                                            key={brand}
                                            value={brand}
                                        >
                                            {brand}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="col-lg-2">
                            <select
                                className="form-select"
                                value={stockFilter}
                                onChange={(e) =>
                                    setStockFilter(e.target.value)
                                }
                            >

                                <option value="">
                                    Stock
                                </option>

                                <option value="in">
                                    In Stock
                                </option>

                                <option value="low">
                                    Low Stock
                                </option>

                                <option value="out">
                                    Out Of Stock
                                </option>
                            </select>
                        </div>

                        <div className="col-lg-2">
                            <select
                                className="form-select"
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(e.target.value)
                                }
                            >
                                <option value="latest">
                                    Latest
                                </option>

                                <option value="oldest">
                                    Oldest
                                </option>

                                <option value="priceLow">
                                    Price ↑
                                </option>

                                <option value="priceHigh">
                                    Price ↓
                                </option>

                                <option value="stockLow">
                                    Stock ↑
                                </option>

                                <option value="stockHigh">
                                    Stock ↓
                                </option>

                                <option value="nameAZ">
                                    A → Z
                                </option>

                                <option value="nameZA">
                                    Z → A
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
               <span className="text-muted">

                    Showing

                    <strong>
                        {" "}
                        {(currentPage - 1) * productsPerPage + 1}
                    </strong>

                    -

                    <strong>
                        {" "}
                        {(currentPage - 1) * productsPerPage + products.length}
                    </strong>

                    {" "}of{" "}

                    <strong>
                        {products.length}
                    </strong>

                    {" "}Products

                </span>

                <span className="text-muted">

                    Page

                    <strong>

                        {" "}

                        {currentPage}
                    </strong>

                    {" "}of{" "}

                    <strong>
                        {totalPages}
                    </strong>
                </span>
            </div>

            <div className="card shadow">
                <div className="card-body">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Featured</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                products.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>
                                            {(currentPage - 1) * productsPerPage + index + 1}
                                        </td>

                                       <td>
                                            <img
                                                src={
                                                    product.images?.[0]
                                                        ? product.images[0]
                                                        : "https://placehold.co/300x250"
                                                }
                                                alt={product.name}
                                                style={{
                                                    width: "70px",
                                                    height: "70px",
                                                    objectFit: "cover",
                                                    borderRadius: "10px",
                                                    border: "1px solid #ddd",
                                                    padding: "3px",
                                                    background: "#fff",
                                                }}
                                            />
                                        </td>

                                        <td>
                                            <div className="fw-bold">
                                                {product.name}
                                            </div>

                                            <small className="text-muted">
                                                {product.brand}
                                            </small>
                                        </td>

                                        <td>
                                            <span
                                                className="fw-bold text-success fs-6"
                                            >
                                                ₹ {Number(product.price).toLocaleString("en-IN")}
                                            </span>
                                        </td>
                                       <td>

                                            {
                                                product.stock > 10 && (

                                                    <span className="badge bg-success px-3 py-2">

                                                        ✅ In Stock ({product.stock})

                                                    </span>

                                                )
                                            }

                                            {
                                                product.stock > 0 &&
                                                product.stock <= 10 && (
                                                    <span className="badge bg-warning text-dark px-3 py-2">

                                                        ⚠ Low Stock ({product.stock})

                                                    </span>
                                                )
                                            }

                                            {
                                                product.stock === 0 && (
                                                    <span className="badge bg-danger px-3 py-2">

                                                        ❌ Out Of Stock

                                                    </span>
                                                )
                                            }
                                        </td>

                                        <td>
                                            {product.category?.name}
                                        </td>

                                        <td>
                                            {product.brand}
                                        </td>

                                       <td>
                                            <button
                                                className={
                                                    product.isFeatured
                                                        ? "btn btn-success btn-sm"
                                                        : "btn btn-outline-secondary btn-sm"
                                                }
                                                onClick={() =>
                                                    handleToggleFeatured(product._id)
                                                }
                                            >

                                                {
                                                    product.isFeatured
                                                        ? "⭐ Featured"
                                                        : "☆ Normal"
                                                }

                                            </button>

                                        </td>

                                        <td>
                                            ⭐ {product.rating || 0}
                                            <br />
                                            <small className="text-muted">

                                                ({product.numReviews || 0} Reviews)

                                            </small>
                                        </td>

                                        <td>
                                            <div
                                                className="d-flex justify-content-center align-items-center gap-2 flex-wrap"
                                            >
                                                <button
                                                    className="btn btn-outline-primary btn-sm"
                                                    style={{ minWidth: "85px" }}
                                                    onClick={() => navigate(`/product/${product._id}`)}
                                                >
                                                    👁 View
                                                </button>

                                                <button
                                                    className="btn btn-outline-warning btn-sm"
                                                    style={{ minWidth: "85px" }}
                                                    onClick={() => navigate(`/admin/product/edit/${product._id}`)}
                                                >
                                                    ✏ Edit
                                                </button>

                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    style={{ minWidth: "85px" }}
                                                    onClick={() => handleDelete(product._id)}
                                                >
                                                    🗑 Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>

                    {
                        selectedProduct && (

                            <div
                                className="modal fade show"
                                style={{
                                    display: "block",
                                    background: "rgba(0,0,0,0.5)"
                                }}
                            >
                                <div className="modal-dialog modal-lg modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">
                                                Product Details
                                            </h5>

                                            <button
                                                className="btn-close"
                                                onClick={() => setSelectedProduct(null)}
                                            ></button>
                                        </div>

                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-md-4 text-center">
                                                   <img
                                                    src={
                                                        selectedProduct?.images
                                                            ? selectedProduct.images
                                                            : "https://placehold.co/300x250"
                                                    }
                                                    alt={selectedProduct?.name}
                                                    className="img-fluid rounded shadow"
                                                />
                                                </div>

                                                <div className="col-md-8">
                                                    <h3>{selectedProduct.name}</h3>

                                                    <hr />

                                                    <p>
                                                        <strong>Category :</strong>{" "}
                                                        {selectedProduct.category?.name}
                                                    </p>

                                                    <p>
                                                        <strong>Brand :</strong>{" "}
                                                        {selectedProduct.brand}
                                                    </p>

                                                    <p>
                                                        <strong>Price :</strong>{" "}
                                                        ₹{selectedProduct.price}
                                                    </p>

                                                    <p>
                                                        <strong>Stock :</strong>{" "}
                                                        {selectedProduct.stock}
                                                    </p>

                                                    <p>
                                                        <strong>Rating :</strong>{" "}
                                                        ⭐ {selectedProduct.rating}
                                                    </p>

                                                    <p>
                                                        <strong>Reviews :</strong>{" "}
                                                        {selectedProduct.numReviews}
                                                    </p>

                                                    <p>
                                                        <strong>Featured :</strong>{" "}
                                                        {
                                                            selectedProduct.isFeatured
                                                                ? "Yes"
                                                                : "No"
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <hr />

                                            <h5>Description</h5>

                                            <p>
                                                {selectedProduct.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="d-flex justify-content-center mt-4">
                        <button
                            className="btn btn-outline-primary me-2"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>

                        <span className="align-self-center fw-bold">

                            Page {currentPage} of {totalPages}

                        </span>

                        <button
                            className="btn btn-outline-primary ms-2"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {
                deleteId && (
                    <div
                        className="modal fade show"
                        style={{
                            display: "block",
                            background: "rgba(0,0,0,0.5)"
                        }}
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">

                                        Delete Product

                                    </h5>

                                    <button
                                        className="btn-close"
                                        onClick={() => setDeleteId(null)}
                                    ></button>

                                </div>

                                <div className="modal-body">
                                    <p>
                                        Are you sure you want to delete this product?
                                    </p>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setDeleteId(null)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(deleteId)}
                                    >
                                        Delete
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}


export default Products;
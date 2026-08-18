import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getCategories } from "../../services/categoryService";
import { addProduct } from "../../services/adminService";

function AddProduct() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [variants, setVariants] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discount: "",
        stock: "",
        brand: "",
        searchTags: "",
        category: "",
        subcategory: "",
        seller: "",
        deliveryTime: "",
        warranty: "",
        specifications: "",
        isFeatured: false,
        images: [],
    });

    // =========================
    // FETCH CATEGORIES
    // =========================

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
        fetchCategories();
    }, []);

    // =========================
    // ADD COLOR VARIANT
    // =========================

    const addVariant = () => {
        setVariants((prev) => [
            ...prev,
            {
                color: "",
                stock: "",
                price: "",
                discount: "",
                images: [],
                sizes: [],
            },
        ]);
    };

    // =========================
    // REMOVE COLOR VARIANT
    // =========================

    const removeVariant = (index) => {
        setVariants((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    // =========================
    // CHANGE VARIANT DETAILS
    // =========================

    const handleVariantChange = (
        index,
        field,
        value
    ) => {
        setVariants((prev) =>
            prev.map((variant, i) =>
                i === index
                    ? {
                        ...variant,
                        [field]: value,
                    }
                    : variant
            )
        );
    };

    // =========================
    // VARIANT IMAGES
    // =========================

    const handleVariantImages = (
        index,
        files
    ) => {
        const selectedFiles = Array.from(files);

        setVariants((prev) =>
            prev.map((variant, i) => {
                if (i !== index) {
                    return variant;
                }

                if (
                    variant.images.length +
                    selectedFiles.length >
                    10
                ) {
                    toast.error(
                        "Maximum 10 images are allowed for one color."
                    );

                    return variant;
                }

                return {
                    ...variant,
                    images: [
                        ...variant.images,
                        ...selectedFiles,
                    ],
                };
            })
        );
    };

    // =========================
    // ADD SIZE
    // =========================

    const addSize = (variantIndex) => {
        setVariants((prev) =>
            prev.map((variant, i) =>
                i === variantIndex
                    ? {
                        ...variant,
                        sizes: [
                            ...variant.sizes,
                            {
                                name: "",
                                stock: "",
                            },
                        ],
                    }
                    : variant
            )
        );
    };

    // =========================
    // REMOVE SIZE
    // =========================

    const removeSize = (
        variantIndex,
        sizeIndex
    ) => {
        setVariants((prev) =>
            prev.map((variant, i) =>
                i === variantIndex
                    ? {
                        ...variant,
                        sizes: variant.sizes.filter(
                            (_, index) =>
                                index !== sizeIndex
                        ),
                    }
                    : variant
            )
        );
    };

    // =========================
    // CHANGE SIZE
    // =========================

    const handleSizeChange = (
        variantIndex,
        sizeIndex,
        field,
        value
    ) => {
        setVariants((prev) =>
            prev.map((variant, i) =>
                i === variantIndex
                ? {
                    ...variant,
                    sizes: variant.sizes.map(
                        (size, index) =>
                        index === sizeIndex
                        ? {
                            ...size,
                            [field]: value,
                        }
                        : size
                    ),
                }
                : variant
            )
        );
    };

    // =========================
    // MAIN FORM CHANGE
    // =========================

    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked,
            files,
        } = e.target;

        // Category
        if (name === "category") {
            const selectedSubcategories =
                categories.filter(
                    (cat) =>
                        cat.parent?._id === value ||
                        cat.parent === value
                );

            setSubcategories(
                selectedSubcategories
            );

            setFormData((prev) => ({
                ...prev,
                category: value,
                subcategory: "",
            }));

            return;
        }

        // Main product images
        if (type === "file") {
            const selectedFiles =
                Array.from(files);

            if (
                formData.images.length +
                selectedFiles.length >
                10
            ) {
                toast.error(
                    "Maximum 10 product images are allowed."
                );
                return;
            }

            setFormData((prev) => ({
                ...prev,
                images: [
                    ...prev.images,
                    ...selectedFiles,
                ],
            }));

            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    // =========================
    // SUBMIT PRODUCT
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData =
                new FormData();

            // BASIC PRODUCT DETAILS
            productData.append(
                "name",
                formData.name
            );

            productData.append(
                "description",
                formData.description
            );

            productData.append(
                "price",
                formData.price
            );

            productData.append(
                "stock",
                formData.stock
            );

            productData.append(
                "brand",
                formData.brand
            );

            productData.append(
                "searchTags",
                formData.searchTags
            );

            productData.append(
                "discount",
                formData.discount
            );

            productData.append(
                "seller",
                formData.seller
            );

            productData.append(
                "deliveryTime",
                formData.deliveryTime
            );

            productData.append(
                "warranty",
                formData.warranty
            );

            productData.append(
                "specifications",
                formData.specifications
            );

            productData.append(
                "category",
                formData.category
            );

            productData.append(
                "subcategory",
                formData.subcategory
            );

            productData.append(
                "isFeatured",
                formData.isFeatured
            );

            // =========================
            // MAIN PRODUCT IMAGES
            // =========================

            formData.images.forEach(
                (image) => {
                    productData.append(
                        "images",
                        image
                    );
                }
            );

            // =========================
            // VARIANT IMAGES
            // =========================

            variants.forEach(
                (variant, index) => {
                    variant.images.forEach(
                        (image) => {
                            productData.append(
                                `variantImages_${index}`,
                                image
                            );
                        }
                    );
                }
            );

            // =========================
            // VARIANT DATA
            // =========================

            const variantData =
                variants.map(
                    (variant, index) => ({
                        color:
                            variant.color,

                        stock:
                            Number(
                                variant.stock
                            ) || 0,

                        price:
                            Number(
                                variant.price
                            ) ||
                            Number(
                                formData.price
                            ),

                        discount:
                            Number(
                                variant.discount
                            ) || 0,

                        imageField:
                            `variantImages_${index}`,

                        sizes:
                            variant.sizes.map(
                                (size) => ({
                                    name:
                                        size.name,

                                    stock:
                                        Number(
                                            size.stock
                                        ) || 0,
                                })
                            ),
                    })
                );

            productData.append(
                "variants",
                JSON.stringify(
                    variantData
                )
            );

            // SEND PRODUCT
            const { data } =
                await addProduct(
                    productData
                );

            toast.success(
                data.message
            );

            navigate(
                "/admin/products"
            );

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data
                    ?.message ||
                "Unable To Add Product"
            );
        }
    };

    return (
        <div className="container py-5 admin-add-product-page">

            <h2 className="fw-bold mb-4">
                Add Product
            </h2>

            <div className="card shadow">

                <div className="card-body">

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        {/* =========================
                            PRODUCT NAME
                        ========================= */}

                        <div className="mb-3">

                            <label className="form-label">
                                Product Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={
                                    formData.name
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>

                        {/* =========================
                            DESCRIPTION
                        ========================= */}

                        <div className="mb-3">

                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                name="description"
                                value={
                                    formData.description
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>

                        <div className="row">

                            {/* =========================
                                PRICE
                            ========================= */}

                            <div className="col-md-6">

                                <div className="mb-3">

                                    <label className="form-label">
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        min="0"
                                        value={
                                            formData.price
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>

                            </div>

                            {/* =========================
                                STOCK
                            ========================= */}

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Stock
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="stock"
                                        min="0"
                                        value={
                                            formData.stock
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            {/* =========================
                                BRAND
                            ========================= */}

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Brand
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="brand"
                                        value={
                                            formData.brand
                                        }
                                        onChange={  
                                            handleChange
                                        }
                                    />
                                </div>
                            </div>
                        
                            {/* SEARCH KEYWORDS */}

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Search Tags
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="searchTags"
                                        value={
                                            formData.searchTags
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="nike, shoes, sneakers, sports shoes"
                                    />
                                    <small className="text-muted">
                                        Enter keywords separated by commas.
                                    </small>
                                </div>
                            </div>

                            {/* =========================
                                DISCOUNT
                            ========================= */}

                            <div className="col-md-6">

                                <div className="mb-3">

                                    <label className="form-label">
                                        Discount (%)
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="discount"
                                        min="0"
                                        max="100"
                                        value={
                                            formData.discount
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                            </div>

                            {/* =========================
                                SELLER
                            ========================= */}

                            <div className="col-md-6">

                                <div className="mb-3">

                                    <label className="form-label">
                                        Seller
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="seller"
                                        value={
                                            formData.seller
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter Seller Name"
                                    />

                                </div>

                            </div>

                            {/* =========================
                                DELIVERY
                            ========================= */}

                            <div className="col-md-6">

                                <div className="mb-3">

                                    <label className="form-label">
                                        Delivery Time
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="deliveryTime"
                                        value={
                                            formData.deliveryTime
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="3-5 Days"
                                    />

                                </div>

                            </div>

                            {/* =========================
                                WARRANTY
                            ========================= */}

                            <div className="col-md-6">

                                <div className="mb-3">

                                    <label className="form-label">
                                        Warranty
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="warranty"
                                        value={
                                            formData.warranty
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="1 Year"
                                    />

                                </div>

                            </div>

                            {/* =========================
                                SPECIFICATIONS
                            ========================= */}

                            <div className="col-md-12">

                                <div className="mb-3">

                                    <label className="form-label">
                                        Specifications
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        name="specifications"
                                        value={
                                            formData.specifications
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder='{"RAM":"8GB","Storage":"128GB","Color":"Black"}'
                                    />

                                </div>

                            </div>

                            {/* =========================
                                CATEGORY
                            ========================= */}

                            <div className="col-md-6">

                                <div className="mb-3">

                                    <label className="form-label">
                                        Category
                                    </label>

                                    <select
                                        className="form-select"
                                        name="category"
                                        value={
                                            formData.category
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    >

                                        <option value="">
                                            Select Category
                                        </option>

                                        {categories
                                            .filter(
                                                (cat) =>
                                                    cat.parent ===
                                                    null
                                            )
                                            .map(
                                                (cat) => (
                                                    <option
                                                        key={
                                                            cat._id
                                                        }
                                                        value={
                                                            cat._id
                                                        }
                                                    >
                                                        {
                                                            cat.name
                                                        }
                                                    </option>
                                                )
                                            )}

                                    </select>

                                </div>

                            </div>

                            {/* =========================
                                SUBCATEGORY
                            ========================= */}

                            <div className="col-md-6">

                                <div className="mb-3">

                                    <label className="form-label">
                                        Subcategory
                                    </label>

                                    <select
                                        className="form-select"
                                        name="subcategory"
                                        value={
                                            formData.subcategory
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        disabled={
                                            !formData.category
                                        }
                                    >

                                        <option value="">
                                            Select Subcategory
                                        </option>

                                        {categories
                                            .filter(
                                                (cat) =>
                                                    cat.parent ===
                                                    formData.category ||
                                                    cat.parent?._id ===
                                                    formData.category
                                            )
                                            .map(
                                                (cat) => (
                                                    <option
                                                        key={
                                                            cat._id
                                                        }
                                                        value={
                                                            cat._id
                                                        }
                                                    >
                                                        {
                                                            cat.name
                                                        }
                                                    </option>
                                                )
                                            )}

                                    </select>

                                </div>

                            </div>

                        </div>

                        {/* =========================
                            FEATURED
                        ========================= */}

                        <div className="form-check mb-4">

                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="featured"
                                name="isFeatured"
                                checked={
                                    formData.isFeatured
                                }
                                onChange={
                                    handleChange
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="featured"
                            >
                                Featured Product
                            </label>

                        </div>

                        {/* =========================
                            COLOR VARIANTS
                        ========================= */}

                        <div className="mb-4">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <label className="form-label fw-bold mb-0">
                                    Product Color Variants
                                </label>

                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={
                                        addVariant
                                    }
                                >
                                    + Add Color
                                </button>

                            </div>

                            {variants.map(
                                (
                                    variant,
                                    index
                                ) => (

                                    <div
                                        key={index}
                                        className="border rounded p-3 mb-3"
                                    >

                                        {/* VARIANT HEADER */}

                                        <div className="d-flex justify-content-between align-items-center mb-3">

                                            <h6 className="fw-bold mb-0">
                                                Color Variant{" "}
                                                {index + 1}
                                            </h6>

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    removeVariant(
                                                        index
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>

                                        </div>

                                        <div className="row">

                                            {/* COLOR */}

                                            <div className="col-md-6 mb-3">

                                                <label className="form-label">
                                                    Color
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        variant.color
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        handleVariantChange(
                                                            index,
                                                            "color",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    placeholder="Example: Purple"
                                                    required
                                                />

                                            </div>

                                            {/* STOCK */}

                                            <div className="col-md-6 mb-3">

                                                <label className="form-label">
                                                    Stock
                                                </label>

                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    min="0"
                                                    value={
                                                        variant.stock
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        handleVariantChange(
                                                            index,
                                                            "stock",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    placeholder="Example: 10"
                                                />

                                            </div>

                                            {/* VARIANT PRICE */}

                                            <div className="col-md-6 mb-3">

                                                <label className="form-label">
                                                    Variant Price
                                                </label>

                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    min="0"
                                                    value={
                                                        variant.price
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        handleVariantChange(
                                                            index,
                                                            "price",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    placeholder="Same as main price if empty"
                                                />

                                            </div>

                                            {/* VARIANT DISCOUNT */}

                                            <div className="col-md-6 mb-3">

                                                <label className="form-label">
                                                    Variant Discount (%)
                                                </label>

                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    min="0"
                                                    max="100"
                                                    value={
                                                        variant.discount
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        handleVariantChange(
                                                            index,
                                                            "discount",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    placeholder="Same as main discount if empty"
                                                />

                                            </div>

                                            {/* VARIANT IMAGES */}

                                            <div className="col-12 mb-3">

                                                <label className="form-label">
                                                    Color Images{" "}
                                                    <small className="text-muted">
                                                        (Optional, maximum 10)
                                                    </small>
                                                </label>

                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    multiple
                                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        handleVariantImages(
                                                            index,
                                                            e
                                                                .target
                                                                .files
                                                        )
                                                    }
                                                />

                                                {variant.images.length >
                                                    0 && (

                                                    <div className="d-flex flex-wrap gap-2 mt-3">

                                                        {variant.images.map(
                                                            (
                                                                image,
                                                                imageIndex
                                                            ) => (

                                                                <div
                                                                    key={
                                                                        imageIndex
                                                                    }
                                                                    className="position-relative"
                                                                >

                                                                    <img
                                                                        src={URL.createObjectURL(
                                                                            image
                                                                        )}
                                                                        alt={`${variant.color} ${imageIndex + 1}`}
                                                                        style={{
                                                                            width: "100px",
                                                                            height: "100px",
                                                                            objectFit:
                                                                                "contain",
                                                                            border:
                                                                                "1px solid #ddd",
                                                                            borderRadius:
                                                                                "8px",
                                                                        }}
                                                                    />

                                                                </div>

                                                            )
                                                        )}

                                                    </div>

                                                )}

                                            </div>

                                            {/* SIZES */}

                                            <div className="col-12">

                                                <div className="d-flex justify-content-between align-items-center mb-3">

                                                    <label className="form-label fw-bold mb-0">
                                                        Sizes{" "}
                                                        <small className="text-muted">
                                                            (Optional)
                                                        </small>
                                                    </label>

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() =>
                                                            addSize(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        + Add Size
                                                    </button>

                                                </div>

                                                {variant.sizes.length ===
                                                    0 && (

                                                    <div className="alert alert-light border">
                                                        No sizes added.
                                                        Use this for
                                                        clothing or
                                                        other products
                                                        that have sizes.
                                                    </div>

                                                )}

                                                {variant.sizes.map(
                                                    (
                                                        size,
                                                        sizeIndex
                                                    ) => (

                                                        <div
                                                            key={
                                                                sizeIndex
                                                            }
                                                            className="row align-items-end mb-2"
                                                        >

                                                            <div className="col-md-5">

                                                                <label className="form-label">
                                                                    Size
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={
                                                                        size.name
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleSizeChange(
                                                                            index,
                                                                            sizeIndex,
                                                                            "name",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    placeholder="S / M / L / XL / 2XL"
                                                                />

                                                            </div>

                                                            <div className="col-md-5">

                                                                <label className="form-label">
                                                                    Size Stock
                                                                </label>

                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    min="0"
                                                                    value={
                                                                        size.stock
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleSizeChange(
                                                                            index,
                                                                            sizeIndex,
                                                                            "stock",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    placeholder="Example: 10"
                                                                />

                                                            </div>

                                                            <div className="col-md-2">

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-danger w-100"
                                                                    onClick={() =>
                                                                        removeSize(
                                                                            index,
                                                                            sizeIndex
                                                                        )
                                                                    }
                                                                >
                                                                    Remove
                                                                </button>

                                                            </div>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                            {variants.length ===
                                0 && (

                                <div className="alert alert-light border">

                                    No color variants
                                    added yet. Click{" "}
                                    <strong>
                                        + Add Color
                                    </strong>{" "}
                                    only when the product
                                    has different colors.

                                </div>

                            )}

                        </div>

                        {/* =========================
                            MAIN PRODUCT IMAGES
                        ========================= */}

                        <div className="mb-4">

                            <label className="form-label fw-bold">
                                Product Images
                                <small className="text-muted">
                                    {" "}
                                    (Maximum 10)
                                </small>
                            </label>

                            <input
                                type="file"
                                className="form-control"
                                name="images"
                                multiple
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                onChange={
                                    handleChange
                                }
                            />

                            {formData.images.length >
                                0 && (

                                <div className="d-flex flex-wrap gap-2 mt-3">

                                    {formData.images.map(
                                        (
                                            image,
                                            index
                                        ) => (

                                            <img
                                                key={index}
                                                src={URL.createObjectURL(
                                                    image
                                                )}
                                                alt={`Product ${index + 1}`}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit:
                                                        "contain",
                                                    border:
                                                        "1px solid #ddd",
                                                    borderRadius:
                                                        "8px",
                                                }}
                                            />

                                        )
                                    )}

                                </div>

                            )}

                        </div>

                        {/* =========================
                            SUBMIT
                        ========================= */}

                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Add Product
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddProduct;
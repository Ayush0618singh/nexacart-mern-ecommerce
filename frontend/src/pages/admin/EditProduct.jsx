import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
    getProductById,
    updateProduct,
} from "../../services/adminService";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discount: "",
        stock: "",
        brand: "",
        searchTags: "",
        seller: "",
        deliveryTime: "",
        warranty: "",
        specifications: {},
        images: [],
        variants: [],
    });

    const [previewImages, setPreviewImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [variants, setVariants] = useState([]);

    // Fetch Product
    const fetchProduct = async () => {
        try {
            const { data } = await getProductById(id);

            const product = data.product;

           setFormData({
                name: data.product.name || "",
                description: data.product.description || "",
                price: data.product.price || "",
                discount: data.product.discount || 0,
                stock: data.product.stock || 0,
                brand: data.product.brand || "",
                searchTags: Array.isArray(data.product.searchTags)
                ? data.product.searchTags.join(", ")
                : "",
                seller: data.product.seller || "",
                deliveryTime: data.product.deliveryTime || "",
                warranty: data.product.warranty || "",
                specifications: data.product.specifications || {},
                images: [],
                variants: data.product.variants || [],
            });

            setExistingImages(data.product.images || []);
            setPreviewImages(data.product.images || []);

            setVariants(
                (product.variants || []).map((variant) => ({
                    color: variant.color || "",
                    stock: variant.stock || 0,
                    price: variant.price || product.price || 0,
                    discount: variant.discount || 0,
                    images: Array.isArray(variant.images)
                        ? variant.images
                        : [],
                    sizes: Array.isArray(variant.sizes)
                        ? variant.sizes
                        : [],
                }))
            );

        } catch (error) {
            console.log(error);
            toast.error("Unable to load product");
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        // Image Upload
        if (type === "file") {
            const selectedFiles = Array.from(files);

            const allowedTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
            ];

            for (const file of selectedFiles) {
                if (!allowedTypes.includes(file.type)) {
                    toast.error(
                        "Only JPG, JPEG, PNG and WEBP images are allowed."
                    );
                    return;
                }

                if (file.size > 2 * 1024 * 1024) {
                    toast.error("Image size should be less than 2 MB.");
                    return;
                }
            }

           const totalImages =
                existingImages.length +
                formData.images.length +
                selectedFiles.length;

            if (totalImages > 30) {
                toast.error("Maximum 30 product images are allowed.");
                return;
            }

            setFormData((prev) => ({
                ...prev,
                images: [
                    ...prev.images,
                    ...selectedFiles,
                ],
            }));

            setPreviewImages([
                ...existingImages,
                ...formData.images.map((file) =>
                    URL.createObjectURL(file)
                ),
                ...selectedFiles.map((file) =>
                    URL.createObjectURL(file)
                ),
            ]);

            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Remove Existing Image
    const removeExistingImage = (index) => {
        const updatedImages = existingImages.filter(
            (_, i) => i !== index
        );

        setExistingImages(updatedImages);

        setPreviewImages([
            ...updatedImages,
            ...formData.images.map((file) =>
                URL.createObjectURL(file)
            ),
        ]);
    };

    // Add Color Variant
    const addVariant = () => {
        setVariants((prev) => [
            ...prev,
            {
                color: "",
                stock: "",
                price: formData.price || "",
                discount: formData.discount || 0,
                images: [],
            },
        ]);
    };

    // Remove Color Variant
    const removeVariant = (index) => {
        setVariants((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    // Change Variant
    const handleVariantChange = (index, field, value) => {
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

    // Specification Change
    const handleSpecificationChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            specifications: {
                ...prev.specifications,
                [key]: value,
            },
        }));
    };

    // Add New Color Variant
    // const handleAddVariant = () => {
    //     setFormData((prev) => ({
    //         ...prev,
    //         variants: [
    //             ...prev.variants,
    //             {
    //                 color: "",
    //                 stock: 0,
    //                 price: prev.price || 0,
    //                 discount: prev.discount || 0,
    //                 images: [],
    //                 sizes: [],
    //             },
    //         ],
    //     }));
    // };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();

            productData.append("name", formData.name);
            productData.append("description", formData.description);
            productData.append("price", formData.price);
            productData.append("discount", formData.discount);
            productData.append("stock", formData.stock);
            productData.append("brand", formData.brand);
            productData.append("searchTags", formData.searchTags);
            productData.append("seller", formData.seller);
            productData.append("deliveryTime", formData.deliveryTime);
            productData.append("warranty", formData.warranty);

            productData.append(
                "specifications",
                JSON.stringify(formData.specifications)
            );

            // Existing Images
            productData.append(
                "existingImages",
                JSON.stringify(existingImages)
            );

            // New Images
            formData.images.forEach((image) => {
                productData.append("images", image);
            });

            // Color Variants
            const cleanedVariants = variants
            .filter((variant) => variant.color?.trim())
            .map((variant) => ({
                color: variant.color.trim(),

                stock: Number(variant.stock) || 0,
                price:
                    Number(variant.price) ||
                    Number(formData.price) ||
                    0,

                discount:
                    Number(variant.discount) || 0,

                images: Array.isArray(variant.images)
                    ? variant.images
                    : [],

                sizes: Array.isArray(variant.sizes)
                    ? variant.sizes
                    : [],
            }));

        productData.append(
            "variants",
            JSON.stringify(cleanedVariants)
        );

            const { data } = await updateProduct(id, productData);
            toast.success(data.message);
            navigate("/admin/products");

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                    "Unable To Update Product"
            );
        }
    };

    return (
       <div className="container py-5 admin-edit-product-page">

            <h2 className="fw-bold mb-4">
                Edit Product
            </h2>

            <div className="card shadow">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        {/* Product Name */}
                        <div className="mb-3">
                            <label className="form-label">
                                Product Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                            <label className="form-label">
                                Price
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Discount */}
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
                                value={formData.discount}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Stock */}
                        <div className="mb-3">
                            <label className="form-label">
                                Stock
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Brand */}
                        <div className="mb-3">
                            <label className="form-label">
                                Brand
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Search Tags */}
                        <div className="mb-3">
                            <label className="form-label">
                                Search Tags
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="searchTags"
                                value={formData.searchTags}
                                onChange={handleChange}
                                placeholder="hp, laptop, notebook, computer"
                            />

                            <small className="text-muted">
                                Enter keywords separated by commas.
                            </small>
                        </div>

                        {/* Seller */}
                        <div className="mb-3">
                            <label className="form-label">
                                Seller
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="seller"
                                value={formData.seller}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Delivery */}
                        <div className="mb-3">
                            <label className="form-label">
                                Delivery Time
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="deliveryTime"
                                value={formData.deliveryTime}
                                onChange={handleChange}
                                placeholder="Example: 3-5 Days"
                            />
                        </div>

                        {/* Warranty */}
                        <div className="mb-3">
                            <label className="form-label">
                                Warranty
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="warranty"
                                value={formData.warranty}
                                onChange={handleChange}
                                placeholder="Example: 1 Year Manufacturer Warranty"
                            />
                        </div>

                        {/* Specifications */}
                        <div className="mb-4">

                            <label className="form-label fw-bold">
                                Specifications
                            </label>

                            {Object.keys(formData.specifications).length === 0 ? (
                                <div className="alert alert-secondary">
                                    No specifications available for this product.
                                </div>
                            ) : (
                                Object.entries(formData.specifications).map(
                                    ([key, value]) => (
                                        <div
                                            className="row mb-2"
                                            key={key}
                                        >
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={key}
                                                    readOnly
                                                />
                                            </div>

                                            <div className="col-md-8">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={value}
                                                    onChange={(e) =>
                                                        handleSpecificationChange(
                                                            key,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )
                                )
                            )}

                        </div>

                        {/* Color Variants */}
                        <div className="mb-4">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <label className="form-label fw-bold mb-0">
                                    Product Colors
                                </label>

                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={addVariant}
                                >
                                    + Add Color
                                </button>

                            </div>

                            {
                                variants.map((variant, index) => (
                                <React.Fragment key={index}>
                                    <div className="border rounded p-3 mb-3"> 

                                        <div className="d-flex justify-content-between align-items-center mb-3">

                                            <strong>
                                                Color {index + 1}
                                            </strong>

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    removeVariant(index)
                                                }
                                            >
                                                Remove
                                            </button>

                                        </div>
                                    </div>

                                    <div className="row">
                                        {/* Color */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                Color
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={variant.color}
                                                onChange={(e) =>
                                                    handleVariantChange(
                                                        index,
                                                        "color",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Example: Black"
                                            />
                                        </div>

                                        {/* Stock */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                Color Stock
                                            </label>

                                            <input
                                                type="number"
                                                className="form-control"
                                                min="0"
                                                value={variant.stock}
                                                onChange={(e) =>
                                                    handleVariantChange(
                                                        index,
                                                        "stock",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        {/* Price */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                Color Price
                                            </label>

                                            <input
                                                type="number"
                                                className="form-control"
                                                min="0"
                                                value={variant.price}
                                                onChange={(e) =>
                                                    handleVariantChange(
                                                        index,
                                                        "price",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        {/* Discount */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                Color Discount (%)
                                            </label>

                                            <input
                                                type="number"
                                                className="form-control"
                                                min="0"
                                                max="100"
                                                value={variant.discount}
                                                onChange={(e) =>
                                                    handleVariantChange(
                                                        index,
                                                        "discount",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                {/* Color Images */}
                                <div className="col-12 mt-2">

                                    <label className="form-label fw-bold">
                                        Select Images For {variant.color || `Color ${index + 1}`}
                                    </label>

                                    {existingImages.length === 0 ? (
                                        <div className="alert alert-warning">
                                            First upload product images below, then assign them to this color.
                                        </div>
                                    ) : (
                                        <div className="d-flex flex-wrap gap-3">

                                            {existingImages.map((image, imageIndex) => {

                                                const currentImages = Array.isArray(variant.images)
                                                    ? variant.images
                                                    : [];

                                                const isSelected = currentImages.includes(image);

                                                return (
                                                    <button
                                                        type="button"
                                                        key={`${image}-${imageIndex}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();

                                                            setVariants((prev) =>
                                                                prev.map((v, i) => {

                                                                    if (i !== index) {
                                                                        return v;
                                                                    }

                                                                    const images = Array.isArray(v.images)
                                                                        ? v.images
                                                                        : [];

                                                                    const alreadySelected =
                                                                        images.includes(image);

                                                                    return {
                                                                        ...v,
                                                                        images: alreadySelected
                                                                            ? images.filter(
                                                                                (img) => img !== image
                                                                            )
                                                                            : [...images, image],
                                                                    };
                                                                })
                                                            );
                                                        }}
                                                        style={{
                                                            width: "110px",
                                                            height: "130px",
                                                            border: isSelected
                                                                ? "3px solid #0d6efd"
                                                                : "1px solid #ddd",
                                                            borderRadius: "10px",
                                                            padding: "5px",
                                                            cursor: "pointer",
                                                            background: "#fff",
                                                            position: "relative",
                                                        }}
                                                    >

                                                        <img
                                                            src={image}
                                                            alt={`Product ${imageIndex + 1}`}
                                                            style={{
                                                                width: "100%",
                                                                height: "100px",
                                                                objectFit: "contain",
                                                                pointerEvents: "none",
                                                            }}
                                                        />

                                                        {isSelected && (
                                                            <span
                                                                style={{
                                                                    position: "absolute",
                                                                    top: "4px",
                                                                    right: "4px",
                                                                    background: "#0d6efd",
                                                                    color: "#fff",
                                                                    width: "24px",
                                                                    height: "24px",
                                                                    borderRadius: "50%",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    fontSize: "14px",
                                                                    fontWeight: "bold",
                                                                }}
                                                            >
                                                                ✓
                                                            </span>
                                                        )}

                                                    </button>
                                                );
                                            })}

                                        </div>
                                    )}

                                    <small className="text-muted d-block mt-2">
                                        Click image(s) to assign or remove them from this color.
                                    </small>

                                </div>
                            </React.Fragment>
                            ))}

                            {variants.length === 0 && (
                                <div className="alert alert-light border">
                                    No color variants added. This is completely
                                    okay for products that have only one color.
                                </div>
                            )}

                        </div>

                        {/* Product Images */}
                        <div className="mb-4">

                            <label className="form-label fw-bold">
                                Product Images
                            </label>

                            {previewImages.length > 0 && (

                                <div className="d-flex flex-wrap gap-3 mb-3">
                                    {previewImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className="position-relative"
                                        >

                                            <img
                                                src={image}
                                                alt={`Product ${index + 1}`}
                                                className="img-thumbnail"
                                                style={{
                                                    width: "180px",
                                                    height: "180px",
                                                    objectFit: "contain",
                                                }}
                                            />

                                            {index < existingImages.length && (
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                                    onClick={() =>
                                                        removeExistingImage(
                                                            index
                                                        )
                                                    }
                                                >
                                                    ×
                                                </button>
                                            )}

                                        </div>

                                    ))}

                                </div>

                            )}

                            <small className="text-muted d-block mb-2">
                                Maximum 30 images allowed.
                            </small>

                            <input
                                type="file"
                                className="form-control"
                                name="images"
                                multiple
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                onChange={handleChange}
                            />

                        </div>

                        {/* Update */}
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Update Product
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default EditProduct;
const Product = require("../models/Product");
const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");

//Add Product
const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discount,
            category,
            subcategory,
            brand,
            stock,
            specifications,
            seller,
            deliveryTime,
            warranty,
            isFeatured,
            variants,
            searchTags,
            type,
            tags,
        } = req.body;

        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        // SEARCH TAGS
        let productSearchTags = [];

        if (searchTags) {
            try {
                productSearchTags = JSON.parse(searchTags);

                if (!Array.isArray(productSearchTags)) {
                    productSearchTags = [];
                }

            } catch (error) {
                productSearchTags = searchTags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean);
            }

            productSearchTags = productSearchTags
                .map((tag) => String(tag).trim().toLowerCase())
                .filter(Boolean);
        }

        // Main Product Images
        let images = [];

        if (req.files && req.files.length > 0) {
            images = req.files
                .filter((file) => file.fieldname === "images")
                .map((file) => file.path);
        }

        // Product Variants
        let productVariants = [];

        if (req.body.variants) {
            try {
                productVariants = JSON.parse(req.body.variants);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid variants data",
                });
            }
        }

        if (productVariants.length > 0) {
            productVariants = productVariants.map((variant) => ({
                color: variant.color?.trim() || "",

                stock: Number(variant.stock) || 0,

                price:
                    variant.price === null ||
                    variant.price === undefined ||
                    variant.price === ""
                        ? Number(price)
                        : Number(variant.price),

                discount:
                    variant.discount === null ||
                    variant.discount === undefined ||
                    variant.discount === ""
                        ? Number(discount) || 0
                        : Number(variant.discount),

                images: Array.isArray(variant.images)
                    ? variant.images
                    : [],

                sizes: Array.isArray(variant.sizes)
                    ? variant.sizes
                    : [],
            }));
        }

        // Create Product
        const product = await Product.create({
            name,
            description,
            price,
            discount,
            category,
            subcategory: subcategory || null,
            brand,
            searchTags: productSearchTags,
            stock,
            images,
            variants: productVariants,
            specifications: specifications
                ? JSON.parse(specifications)
                : {},
            seller,
            deliveryTime,
            warranty,
            isFeatured,
        });

        res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Get All Product
const getProducts = async (req, res) => {
    try { 
        let keyword = {};
            if (req.query.keyword) {
                const searchWords = req.query.keyword
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean);

                const searchConditions = [];

                for (const word of searchWords) {

                    // Search category/subcategory names
                    const matchingCategories = await Category.find({
                        name: {
                            $regex: word,
                            $options: "i",
                        },
                    }).select("_id");

                    const categoryIds = matchingCategories.map(
                        (category) => category._id
                    );

                    searchConditions.push({
                        $or: [
                            {
                                name: {
                                    $regex: word,
                                    $options: "i",
                                },
                            },
                            {
                                brand: {
                                    $regex: word,
                                    $options: "i",
                                },
                            },

                            {
                                description: {
                                    $regex: word,
                                    $options: "i",
                                },
                            },

                           {
                                searchTags: {
                                    $regex: word,
                                    $options: "i",
                                },
                            },

                            {
                                category: {
                                    $in: categoryIds,
                                },
                            },
                            {
                                subcategory: {
                                    $in: categoryIds,
                                },
                            },
                        ],
                    });
                }

                keyword = {
                    $and: searchConditions,
                };
            }  
        
            // Category Filter
            let category = {};

            if (req.query.category) {

                category = {
                    category: req.query.category,
                };

            }
            let subcategory = {};

            if (req.query.subcategory) {
                subcategory = {
                    subcategory: req.query.subcategory,
                };
            }
            let brand = {};

                if (req.query.brand) {
                    brand = {
                        brand: req.query.brand,
                    };
                }

            //Price Filter
            const priceFilter =
            req.query.minPrice || req.query.maxPrice
            ? {
                    price: {
                        ...(req.query.minPrice && {
                            $gte: Number(req.query.minPrice),

                    }),

                        ...(req.query.maxPrice && {
                            $lte: Number(req.query.maxPrice),
                        }),
                        },
                    }
                    : {};
                    let sortOption = "-createdAt";

                        switch (req.query.sort) {

                            case "oldest":
                                sortOption = "createdAt";
                                break;

                            case "priceLow":
                                sortOption = "price";
                                break;

                            case "priceHigh":
                                sortOption = "-price";
                                break;

                            case "stockLow":
                                sortOption = "stock";
                                break;

                            case "stockHigh":
                                sortOption = "-stock";
                                break;

                            case "nameAZ":
                                sortOption = "name";
                                break;

                            case "nameZA":
                                sortOption = "-name";
                                break;

                            default:
                                sortOption = "-createdAt";

                        }

                    //Pagination
                    //Current Page
                    // Example:  /api/products?page=2
                    const page = Number(req.query.page) || 1;

                    //Number of Products Per Page
                    //Example: /api/products?limit=5
                    const limit = Number(req.query.limit) || 5;

                    //Skip Products
                    //Formula: (Current Page - 1) * limit
                    const skip = (page -1) * limit;

                    let stock = {};

                    if (req.query.stock === "in") {
                        stock = {
                            stock: { $gt: 10 },
                        };
                    }

                    if (req.query.stock === "low") {
                        stock = {
                            stock: {
                                $gt: 0,
                                $lte: 10,
                            },
                        };
                    }

                    if (req.query.stock === "out") {
                        stock = {
                            stock: 0,
                        };
                    }
                    //Total Products Count
                    const totalProducts = await Product.countDocuments({
                        ...keyword,
                        ...category,
                        ...subcategory,
                        ...brand,
                        ...stock,
                        ...priceFilter,
                    });

                //Fetch Products using Search + Category + Price Filter + Sorting
                const products = await Product.find({        
                    ...keyword,
                    ...category,
                    ...subcategory,
                    ...brand,
                    ...stock,
                    ...priceFilter,
                })
                .populate("category")
                .populate("subcategory")
                .sort(sortOption)
                .skip(skip)          //Skip Previous Page Products
                .limit(limit);       //Number of Products Per Page

                res.status(200).json({
                    success: true,
                    page,
                    limit,
                    totalProducts,
                    totalPages: Math.ceil(totalProducts / limit),
                    count: products.length,
                    products,
                });

            }catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        };

    //Get Single Product
    const getSingleProduct = async (req, res) => {
        try{
            const product = await Product.findById(req.params.id)
            .populate("category")
            .populate("subcategory");

            if(!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product Not Found",
                });
            }

            res.status(200).json({
                success: true,
                product,
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }

    };

    //Delete Product
    const deleteProduct = async ( req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if(!product) {
                return res.status(404).json ({
                    success: false,
                    message: "Product Not Found",
                    
                });
            }

           // Delete images from Cloudinary
            if (product.images && product.images.length > 0) {
                for (const imageUrl of product.images) {

                    const publicId = imageUrl
                        .split("/")
                        .slice(-2)
                        .join("/")
                        .split(".")[0];

                    try {
                        await cloudinary.uploader.destroy(publicId);
                    } catch (err) {
                        console.log("Cloudinary Delete Error:", err.message);
                    }
                }
            }

            // Delete product from MongoDB
            await Product.findByIdAndDelete(req.params.id);

            res.status(200).json({
                success: true,
                message: "Product Deleted Successfully",
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

// Update Product (Admin)
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });
        }
 
        // BASIC PRODUCT DATA
        const updateData = {
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            discount: Number(req.body.discount) || 0,
            stock: Number(req.body.stock) || 0,
            brand: req.body.brand,
            searchTags: req.body.searchTags
            ? req.body.searchTags
                .split(",")
                .map((tag) => tag.trim().toLowerCase())
                .filter(Boolean)
            : [],
            seller: req.body.seller,
            deliveryTime: req.body.deliveryTime,
            warranty: req.body.warranty,
        };

        // SPECIFICATIONS
        if (req.body.specifications) {
            try {
                updateData.specifications =
                    JSON.parse(req.body.specifications);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid specifications data",
                });
            }
        }

        // PRODUCT IMAGES
        // Maximum = 30
        // PRODUCT IMAGES

        let existingImages = [];

        if (req.body.existingImages) {
            try {
                existingImages = JSON.parse(req.body.existingImages);

                if (!Array.isArray(existingImages)) {
                    existingImages = [];
                }
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid existing images data",
                });
            }
        }

        const newImages = (req.files || [])
            .filter((file) => file.fieldname === "images")
            .map((file) => file.path);

        updateData.images = [
            ...existingImages,
            ...newImages,
        ].slice(0, 30);

        
        // COLOR VARIANTS
        if (req.body.variants !== undefined) {
            try {
                const variants =
                    JSON.parse(req.body.variants);

                if (!Array.isArray(variants)) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid variants data",
                    });
                }

                updateData.variants = variants.map(
                    (variant) => ({
                        color:
                            variant.color?.trim() || "",

                        stock:
                            Number(variant.stock) || 0,

                        price:
                            variant.price === "" ||
                            variant.price === null ||
                            variant.price === undefined
                                ? Number(req.body.price)
                                : Number(variant.price),

                        discount:
                            variant.discount === "" ||
                            variant.discount === null ||
                            variant.discount === undefined
                                ? Number(req.body.discount) || 0
                                : Number(variant.discount),

                        // Color-specific images
                        images:
                            Array.isArray(variant.images)
                                ? variant.images
                                : [],

                        // Clothing sizes
                        sizes:
                            Array.isArray(variant.sizes)
                                ? variant.sizes
                                : [],
                    })
                );

            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid variants data",
                });
            }
        }

        // UPDATE PRODUCT
        const updatedProduct =
            await Product.findByIdAndUpdate(
                req.params.id,
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            )
                .populate("category")
                .populate("subcategory");

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            product: updatedProduct,
        });

    } catch (error) {
        console.log(
            "Update Product Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Get Featured products
const getFeaturedProducts = async (req, res) => {
    try{

        //Fetch Only Featured Products
        const products = await Product.find({
            isFeatured: true,

        })
        .populate("category") //show category Details
        .populate("subcategory")
        .sort("-createdAt");  //latest featured Products First

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch(error) {
        res.status(500).json({
            success:false,
            message: error.message,
        });
    }
};

//Get Latest Products
const getLatestProducts = async (req, res) => {
    try{ 
        const products= await Product.find()
        .populate("category")
        .populate("subcategory")
        .sort("-createdAt")
        .limit(8);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });

    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//get Top Rated Products
const getTopRatedProducts = async (req, res) => {
    try{
        const products = await Product.find()
        .populate("category")
        .populate("subcategory")
        .sort("-rating")
        .limit(8);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch(error) {
        
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Get related Products
const getRelatedProducts = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not  Found",
            });
        }

        //Same Category products
        const relatedProducts = await Product.find({
            category: product.category,
            _id: { $ne: product._id },   //$ne = Not Equal
        })
        .populate("category")
        .populate("subcategory")
        .limit(4);

        res.status(200).json({
            success: true,
            count: relatedProducts.length,
            products: relatedProducts,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Toggle Featured Product
const toggleFeatured = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({

                success: false,
                message: "Product Not Found",

            });

        }

        product.isFeatured = !product.isFeatured;

        await product.save();

        res.status(200).json({

            success: true,
            message: `Product ${
                product.isFeatured
                    ? "Marked as Featured"
                    : "Removed from Featured"
            }`,

            product,

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message,

        });

    }

};

module.exports = {
    addProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    getFeaturedProducts,
    getLatestProducts,
    getTopRatedProducts,
    getRelatedProducts,
    toggleFeatured,
};
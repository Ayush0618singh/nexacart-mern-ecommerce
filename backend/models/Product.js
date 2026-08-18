const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        discount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },

        brand: {
            type: String,
            default: "No Brand",
            trim: true,
        },

        searchTags: {
            type: [String],
            default: [],
            trim: true,
        },

        type: {
            type: String,
            default: "",
            trim: true,
        },

        tags: {
            type: [String],
            default: [],
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        // Common product images (Maximum 10)
        images: {
            type: [String],
            default: [],
        },

        // Optional color variants with images and sizes
        variants: {
            type: [
                {
                    color: {
                        type: String,
                        default: "",
                        trim: true,
                    },

                    stock: {
                        type: Number,
                        default: 0,
                        min: 0,
                    },

                    price: {
                        type: Number,
                        default: 0,
                        min: 0,
                    },

                    discount: {
                        type: Number,
                        default: 0,
                        min: 0,
                        max: 100,
                    },

                    // Color-specific images
                    images: {
                        type: [String],
                        default: [],
                    },

                    // Sizes (Clothing/Fashion products)
                    sizes: {
                        type: [
                            {
                                name: {
                                    type: String,
                                    trim: true,
                                },

                                stock: {
                                    type: Number,
                                    default: 0,
                                    min: 0,
                                },
                            },
                        ],
                        default: [],
                    },
                },
            ],
            default: [],
        },

        rating: {
            type: Number,
            default: 0,
        },

        numReviews: {
            type: Number,
            default: 0,
        },

        // Map type set with Mixed to allow numbers, strings & booleans
        specifications: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
            default: {},
        },

        seller: {
            type: String,
            default: "Official Seller",
            trim: true,
        },

        deliveryTime: {
            type: String,
            default: "3-5 Days",
        },

        warranty: {
            type: String,
            default: "No Warranty",
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports =
    mongoose.models.Product ||
    mongoose.model("Product", productSchema);
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        // Category / Subcategory name
        name: {
            type: String,
            required: true,
            trim: true,
        },

        // Category description
        description: {
            type: String,
            default: "",
        },

        // Parent category
        // Main category ke liye null rahega
        // Subcategory ke liye parent category ki _id rahegi
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports =
    mongoose.models.Category ||
    mongoose.model("Category", categorySchema);
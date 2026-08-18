const Category = require("../models/Category");

// Add Category
const addCategory = async (req, res) => {
    try {
        const {
            name,
            description,
            parent
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });
        }

        const existingCategory = await Category.findOne({
            name,
            parent: parent || null,
        });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category already exists",
            });
        }

        // If subcategory, check parent category
        if (parent) {
            const parentCategory = await Category.findById(parent);

            if (!parentCategory) {
                return res.status(404).json({
                    success: false,
                    message: "Parent Category Not Found",
                });
            }
        }

        const category = await Category.create({
            name,
            description,
            parent: parent || null,
        });

        res.status(201).json({
            success: true,
            message: "Category Added Successfully",
            category,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .populate("parent", "name")
            .sort({ parent: 1, name: 1 });

        res.status(200).json({
            success: true,
            count: categories.length,
            categories,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Main Categories
const getMainCategories = async (req, res) => {
    try {
        const categories = await Category.find({
            parent: null,
        }).sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: categories.length,
            categories,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Subcategories
const getSubcategories = async (req, res) => {
    try {
        const categories = await Category.find({
            parent: req.params.parentId,
        }).sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: categories.length,
            categories,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Category
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category Not Found",
            });
        }

        category.name = req.body.name || category.name;
        category.description =
            req.body.description || category.description;

        if (req.body.parent !== undefined) {
            category.parent = req.body.parent || null;
        }

        await category.save();

        res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
            category,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Category
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category Not Found",
            });
        }

        // Delete subcategories also
        await Category.deleteMany({
            parent: category._id,
        });

        await Category.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Category Deleted Successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addCategory,
    getCategories,
    getMainCategories,
    getSubcategories,
    updateCategory,
    deleteCategory,
};
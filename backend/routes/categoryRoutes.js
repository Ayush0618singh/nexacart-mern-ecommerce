const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
    addCategory,
    getCategories,
    getMainCategories,
    getSubcategories,
    updateCategory,
    deleteCategory,

} = require("../controllers/categoryController");

router.post("/add", auth, admin, addCategory);

router.get("/", getCategories);

router.get("/main", getMainCategories);

router.get("/sub/:parentId", getSubcategories);

router.put("/:id", auth, admin, updateCategory);

router.delete("/:id", auth, admin, deleteCategory);

module.exports = router;
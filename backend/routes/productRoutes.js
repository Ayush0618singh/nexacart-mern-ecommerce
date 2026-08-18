const express = require("express");
const router = express.Router();

//Middleware
const auth = require("../middleware/auth"); 
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");

//Controllers
const {
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

} = require("../controllers/productController");

//Public Routes
router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/latest", getLatestProducts);
router.get("/top-rated", getTopRatedProducts);
router.get("/:id/related", getRelatedProducts);
router.get("/:id", getSingleProduct);

//Admin Routes
router.post(
    "/",
    auth,
    admin,
    upload.any(),
    addProduct
);

router.put(
    "/:id",
    auth,
    admin,
    upload.array("images", 5),
    updateProduct
);

router.put(
    "/:id/featured",
    auth,
    admin,
    toggleFeatured
);
router.delete(
    "/:id",
    auth, 
    admin, 
    deleteProduct
);

module.exports = router;
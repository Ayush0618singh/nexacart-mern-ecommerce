const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const{
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
    getAllReviews,

} = require("../controllers/reviewControllers");

router.post("/", auth, addReview);

router.get("/admin/all", getAllReviews);

router.get("/product/:productId", getProductReviews);

router.put("/:id", auth, updateReview);

router.delete("/:id", auth, deleteReview);

module.exports = router;
const Review = require("../models/Review");
const Product = require("../models/Product");

//Add Review
const addReview = async (req, res) => {
    try {
        const{ product, rating, comment } = req.body;
        const existingReview = await Review.findOne({
            user: req.user.id,
            product,
        });
        if(existingReview) {
            return res.status(400).json({
                success: false,
                message: "You already reviewed this product",
            });
        }
        const review = await Review.create({
            user: req.user.id,
            product,
            rating,
            comment,
        });

        await updateProductRating(product);

        res.status(201).json({
            success: true,
            message: "Review Added Successfully",
            review,
        });

    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Get Product Reviews
const getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({
            product: req.params.productId,
        })
        .populate("user", "name email");

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Update Review 
const updateReview = async(req, res) => {
    try{ 
        const review = await Review.findById(req.params.id);
        if(!review) {
            return res.status(404).json({
                success: false,
                message: "Review Not Found",
            });
        }

        //Only Review Owner Can Update
        if(review.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access Denied",
            });
        }
        review.rating = req.body.rating || review.rating;
        review.comment = req.body.comment || review.comment;
        await review.save();

        await updateProductRating(review.product);
        res.status(200).json({
            success: true,
            message: "Review Updated",
            review,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Delete Review
const deleteReview = async(req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if(!review) {
            return res.status(404).json ({
                success: false,
                message: "Review Not Found",
            });
        }
        if(review.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access Denied",
            });
        }
        const productId = review.product;
        await review.deleteOne();
        await updateProductRating(productId);
        res.status(200).json({
            success: true,
            message: "Review Deleted Successfully",
        });
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Update roduct Rating & review Count
const updateProductRating = async (productId) => {
    
    const reviews = await Review.find({
        product: productId,
    });

    let averageRating = 0;
    if(reviews.length > 0) {
        const totalRating = reviews.reduce(
            (sum, review) => sum + review.rating,

            0
        );
        averageRating =
        Number((totalRating / reviews.length).toFixed(1));
    }

    //Update Product
    await Product.findByIdAndUpdate(
        productId,
        {
            rating: averageRating,
            numReviews: reviews.length,
        }
    );

};

// Get All Reviews (Admin)

const getAllReviews = async (req, res) => {
    try {

        const reviews = await Review.find()
            .populate("user", "name email")
            .populate("product", "name")
            .sort("-createdAt");

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
    getAllReviews,
};
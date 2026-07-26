const Wishlist = require("../models/Wishlist");

//Add Product To Wishlist
const addToWishlist = async (req, res) => {
    try {
        const { product  } = req.body;

        //Check if already exists
        const existingItem = await Wishlist.findOne({
            user: req.user.id,
            product,
        });

        if(existingItem) {
            return res.status(400).json({
                success: false,
                message: "Product already in Wishlist",
            });
        }
        const wishlistItem = await Wishlist.create({
            user: req.user.id,
            product,
        });

        res.status(201).json({
            success: true,
            message: "Product Added To Wishlist",
            Wishlist: wishlistItem,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Get Logged In User Wishlist
const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({
            user: req.user.id,
        }).populate("product");

        res.status(200).json({
            success: true,
            count: wishlist.length,
            wishlist,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Remove Product From Wishlist
const removeWishlistItem = async(req, res) => {
    try {
       const wishlistItem = await Wishlist.findOne({
       _id: req.params.id,
       user: req.user.id,
    });
        if(!wishlistItem) {
            return res.status(404).json({
                success: false,
                message: "Wishlist Item Not Found",
            });
        }
        await wishlistItem.deleteOne();
        res.status(200).json({
            success: true,
            message: "Product Removed From Wishlist",
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    addToWishlist,
    getWishlist,
    removeWishlistItem,
}
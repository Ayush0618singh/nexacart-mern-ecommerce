const Cart = require("../models/cart");
 
//Add Product to Cart
const addToCart = async (req, res) => {
    try {
        const { product, quantity } = req.body;

        //Check if product already exists in user's cart
        let cartItem = await Cart.findOne({
            user: req.user.id,
            product,
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();

            return res.status(200).json({
                success: true,
                message: "Cart Quantity Updated",
                cart: cartItem,
            });
        }

        const cart = await Cart.create({
            user: req.user.id,
            product,
            quantity,
        });

        res.status(201).json({
            success: true,
            message: "Product Added To Cart",
            cart,

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Get Logged In User Cart
// const getCartItems = async(req, res) => {
//     try {
//         if (!req.user?.id) {
//             return res.status(401).json({
//                 success: false,
//                 message: "User authentication failed",
//             });
//         }
//         const cart = await Cart.find({
//             user: req.user.id,
//         }).populate({
//             path: "product",
//             populate: {
//                 path: "category",
//                 model: "Category",
//             },
//         });

//         res.status(200).json({
//             success: true,
//             count: cart.length,
//             cart,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

//Get Logged In User Cart
const getCartItems = async (req, res) => {
    try {

        console.log("========== NAVBAR CART CHECK ==========");
        console.log("Logged User ID:", req.user.id);

        const cart = await Cart.find({
            user: req.user.id,
        }).populate({
            path: "product",
            populate: {
                path: "category",
                model: "Category",
            },
        });

        console.log("Cart Items For This User:", cart.length);
        console.log(
            "Cart Item IDs:",
            cart.map((item) => item._id.toString())
        );

        res.status(200).json({
            success: true,
            count: cart.length,
            cart,
        });

    } catch (error) {

        console.error("Get Cart Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Update Cart Quantity
const updateCartQuantity = async(req, res) => {
    try {
        const { quantity } = req.body;
        const cartItem = await Cart.findOne({
        _id: req.params.id,
         user: req.user.id,
    });

        if(!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart Item Not Found",
            });
        }
        cartItem.quantity = quantity;

        await cartItem.save();

        res.status(200).json({
            success: true,
            message: "Cart Updated Successfully",
            cart: cartItem,
        });
    } catch(error)  {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


//Delete Cart Item
const deleteCartItem = async(req, res) => {
    try {
        const cartItem = await Cart.findOne({
        _id: req.params.id,
        user: req.user.id,
    });

        if(!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart Item Not Found",
            });
        }
        await cartItem.deleteOne();
        res.json({
            success: true,
            message: "Cart Item Removed Successfully",
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addToCart,
    getCartItems,
    updateCartQuantity,
    deleteCartItem,
};
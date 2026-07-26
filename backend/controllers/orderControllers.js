const Order = require("../models/Order");
const Cart = require("../models/Cart");

//Place Order
const placeOrder = async (req, res) => {
    try {
        const { shippingAddress, phone, paymentMethod } = req.body;

        //Get User Cart
        const cartItems = await Cart.find({ user: req.user.id }).populate("product");

        if(cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is Empty",
            });
        }

        //Calculate Total Price
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += item.product.price * item.quantity;
        });

        //Create Products Array
        const products = cartItems.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
        }));

        //Craete Order
        const order = await Order.create({
            user: req.user.id,
            products,
            totalPrice,
            shippingAddress,
            phone,
            paymentMethod,
        });

        //Clear Cart
        await Cart.deleteMany({ user: req.user.id });

        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            order,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Get Logged In User Orders

const getMyOrders = async(req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
        .populate("products.product")
        .sort({ createdAt: -1});

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Get Single Oder

const getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        .populate("products.product")
        .populate("user","name email");

        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found",
            });
        }
        res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Get All Orders (Admin)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("user", "name email")
        .populate("products.product", "name price");

        res.json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Update Order Status (Admin)
const updateOrderStatus = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order) {
            return res.status(404).json({
                success: false,
                message:"Order Not Found",
            });
        }
        order.orderStatus = req.body.orderStatus;
        await order.save();
        res.json({
            success: true,
            message: "Order Status Updated",
            order,
        });
    } catch(error) {

        res.status(500).json ({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    placeOrder,
    getMyOrders,
    getSingleOrder,
    getAllOrders,
    updateOrderStatus,
};
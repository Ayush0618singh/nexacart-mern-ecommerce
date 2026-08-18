const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
    createPaymentOrder,
    verifyPayment,

} = require("../controllers/paymentControllers");

//Create RazorPay Order
router.post("/create-order", auth, createPaymentOrder);

//Verify Razorpay Payment
router.post("/verify", auth, verifyPayment);

module.exports = router;
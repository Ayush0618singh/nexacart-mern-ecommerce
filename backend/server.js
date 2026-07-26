const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

//Load Envirnoment Varriable (.env)
dotenv.config();
const connectDB = require("./config/db");

const orderRoutes = require("./routes/orderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
 
const errorHandler = require("./middleware/errorHandler");

const auth = require("./middleware/auth");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
 
 
// app.use(
//     "/uploads",
//     express.static(
//         path.join(__dirname, "uploads")
//     )
// );


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews",  reviewRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
    res.send("E-Commerce API Running...");
});

//Protected Route
app.get("/api/profile", auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Protected Route",
        user: req.user,
    });
});

const PORT = process.env.PORT  || 5000;

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
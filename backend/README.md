# NexaCart — Backend

Production-ready REST API backend for **NexaCart**, a modern MERN-based e-commerce platform.

The NexaCart backend is built with **Node.js, Express.js, MongoDB, and Mongoose**. It provides secure APIs for authentication, product and category management, shopping cart, wishlist, reviews, orders, coupons, Razorpay payments, Cloudinary media management, customer support, newsletter subscriptions, and administrative operations.

The backend follows a modular architecture using controllers, routes, models, middleware, configuration modules, and utility functions.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Password Hashing with bcryptjs
* User and Admin Roles
* Protected API Routes
* Role-Based Authorization
* Admin Authorization Middleware
* User-Specific Data Access
* Protected Customer APIs

---

## 📦 Product Management

* Product Creation
* Product Retrieval
* Product Update
* Product Deletion
* Product Search
* Product Filtering
* Product Sorting
* Product Pagination
* Featured Products
* Latest Products
* Top-Rated Products
* Related Products
* Product Variants
* Color Variants
* Stock Management
* Product Specifications
* Product Image Management
* Variant Image Assignment
* Stock Validation

---

## 🗂️ Category Management

* Category Creation
* Category Retrieval
* Category Update
* Category Deletion
* Category Relationships
* Category-Based Product Filtering

---

## 🛒 Cart & Wishlist

### Shopping Cart

* Add Product to Cart
* Update Cart Quantity
* Remove Cart Item
* Cart Retrieval
* Stock Validation
* Cart Total Calculation

### Wishlist

* Add Product to Wishlist
* Remove Product from Wishlist
* Wishlist Retrieval
* Wishlist Management

---

## ⭐ Review & Rating System

* Create Product Reviews
* Product Ratings
* Review Retrieval
* Review Management
* Admin Review Management
* Admin Review Deletion

---

## 📦 Order Management

The backend provides APIs for the complete order lifecycle.

* Order Creation
* Cart Checkout
* Buy Now Checkout
* Order History
* Single Order Details
* User Order Access
* Admin Order Management
* Order Status Management
* Shipping Address Management
* Order Amount Calculation
* Payment Status Management
* COD Order Processing
* Online Payment Order Processing

### Supported Order Statuses

Depending on the order lifecycle, the backend supports statuses such as:

* Pending
* Processing
* Shipped
* Delivered
* Cancelled

---

## 🎟️ Coupon & Discount System

NexaCart includes a backend-controlled coupon system.

* Coupon Creation
* Coupon Retrieval
* Coupon Update
* Coupon Deletion
* Coupon Activation / Management
* Percentage Discounts
* Fixed Discounts
* Minimum Order Amount
* Coupon Expiry
* Usage Limits
* Coupon Usage Tracking
* Coupon Validation
* Backend Discount Calculation
* Secure Final Payable Amount Calculation

> Coupon validation and final amount calculation are performed on the backend to prevent client-side price manipulation.

---

## 💳 Payment System

NexaCart supports both **Razorpay online payments** and **Cash on Delivery (COD)**.

### Razorpay

* Razorpay Payment Order Creation
* Razorpay Checkout Support
* Razorpay Order ID Handling
* Payment ID Handling
* Payment Status Tracking
* Payment Timestamp Handling
* Razorpay Signature Verification
* Secure Backend Payment Verification
* Paid Order Handling

Sensitive Razorpay operations and secret credentials remain on the backend.

### Cash on Delivery

* COD Order Placement
* COD Order Status Management
* Delivery Status Tracking

---

## ☁️ Cloudinary & File Uploads

NexaCart uses **Cloudinary** for product image storage and management.

The backend uses Multer middleware for handling uploaded files before they are processed through the configured Cloudinary storage system.

### Media Features

* Product Image Upload
* Multiple Product Images
* Product Image Management
* Variant Image Assignment
* File Upload Handling
* Supported Image Formats

```text
JPG
JPEG
PNG
WEBP
```

---

## 👨‍💼 Admin Management

The backend provides protected administrative APIs for managing the e-commerce platform.

* Admin Authentication
* Admin Authorization
* Dashboard Statistics
* Sales Analytics Data
* Revenue Analytics Data
* Order Statistics
* Product Management
* Category Management
* Order Management
* User Management
* Review Management
* Coupon Management
* Low Stock Monitoring
* Top Selling Products
* Recent Orders
* Recent Reviews
* Admin Profile
* Admin Settings

---

## 📩 Support & Newsletter

### Customer Support

* Customer Support API
* Support Request Handling

### Newsletter

* Newsletter Subscription
* Newsletter Subscription Management
* Newsletter API

---

# 🛠️ Tech Stack

| Technology | Purpose                       |
| ---------- | ----------------------------- |
| Node.js    | JavaScript Runtime            |
| Express.js | REST API Framework            |
| MongoDB    | Database                      |
| Mongoose   | MongoDB ODM                   |
| JWT        | Authentication                |
| bcryptjs   | Password Hashing              |
| Multer     | File Upload Handling          |
| Cloudinary | Cloud Image Storage           |
| Razorpay   | Online Payment Gateway        |
| CORS       | Cross-Origin Resource Sharing |
| dotenv     | Environment Configuration     |

---

# 🏗️ Backend Architecture

NexaCart follows a modular REST API architecture.

```text
                    React Frontend
                         │
                         │ HTTP / REST API
                         ▼
                 Express.js Server
                         │
            ┌────────────┼────────────┐
            │            │            │
            ▼            ▼            ▼
         Routes      Middleware   Controllers
            │            │            │
            │            │            ▼
            │            │          Models
            │            │            │
            └────────────┴────────────▼
                              MongoDB
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
                Cloudinary                Razorpay
```

### Request Flow

```text
Client Request
      ↓
Express Route
      ↓
Authentication / Authorization Middleware
      ↓
Controller
      ↓
Mongoose Model
      ↓
MongoDB
      ↓
Controller Response
      ↓
Client
```

---

# 📁 Project Structure

The following structure reflects the backend project included in the repository.

```text
backend/
│
├── config/
│   ├── cloudinary.js
│   ├── db.js
│   └── razorpay.js
│
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── cartControllers.js
│   ├── categoryController.js
│   ├── couponController.js
│   ├── newsletterController.js
│   ├── orderControllers.js
│   ├── paymentControllers.js
│   ├── productController.js
│   ├── reviewControllers.js
│   ├── supportController.js
│   └── wishlistController.js
│
├── middleware/
│   ├── admin.js
│   ├── auth.js
│   ├── errorHandler.js
│   └── upload.js
│
├── models/
│   ├── Cart.js
│   ├── Category.js
│   ├── Coupon.js
│   ├── newsletterModel.js
│   ├── Order.js
│   ├── Product.js
│   ├── Review.js
│   ├── User.js
│   └── WishList.js
│
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   ├── categoryRoutes.js
│   ├── couponRoutes.js
│   ├── newsletterRoutes.js
│   ├── orderRoutes.js
│   ├── paymentRoutes.js
│   ├── productRoutes.js
│   ├── reviewRoutes.js
│   ├── supportRoutes.js
│   └── wishlistRoutes.js
│
├── utils/
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

> The local `.env`, `node_modules`, and uploaded files are intentionally excluded from the GitHub repository.

---

# 🔌 API Modules

The backend exposes REST API modules for the major NexaCart features.

```text
/api/auth
/api/products
/api/categories
/api/cart
/api/orders
/api/wishlist
/api/reviews
/api/payment
/api/coupons
/api/support
/api/newsletter
/api/admin
```

The exact endpoints, HTTP methods, request bodies, and response structures are implemented in the corresponding route and controller modules.

---

# 🔑 Environment Variables

The backend uses environment variables for database credentials, authentication secrets, third-party services, and server configuration.

**Never commit the real `.env` file to GitHub.**

The repository contains:

```text
.env.example
```

Create a local:

```text
.env
```

file inside the backend directory and configure it using `.env.example` as the reference.

### Example `.env.example`

```env
# Server
PORT=5000

# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 🔒 Never Commit

The following must remain private:

```text
.env
MONGO_URI
JWT_SECRET
CLOUDINARY_API_SECRET
RAZORPAY_KEY_SECRET
```

The `.gitignore` file already excludes sensitive environment files and other local-only resources.

---

# ⚙️ Installation & Setup

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB or a MongoDB Atlas database
* Git
* NexaCart Frontend
* Cloudinary account for image management
* Razorpay account for online payment testing

---

## 1. Navigate to the Backend

```bash
cd backend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create:

```text
backend/.env
```

Use:

```text
backend/.env.example
```

as the configuration reference.

Add your MongoDB, JWT, Cloudinary, and Razorpay credentials locally.

---

## 4. Start the Backend

Run the development script configured in `package.json`.

For a typical development setup:

```bash
npm run dev
```

If the project is configured with a different script, use the corresponding script from `package.json`.

The backend normally runs on:

```text
http://localhost:5000
```

---

# 🌐 API Base URL

The local API base URL is:

```text
http://localhost:5000/api
```

The frontend uses this base URL to communicate with the backend.

Typical API modules include:

```text
/api/auth
/api/products
/api/categories
/api/cart
/api/orders
/api/wishlist
/api/reviews
/api/payment
/api/coupons
/api/support
/api/newsletter
/api/admin
```

---

# 🔐 Security

NexaCart follows several backend security practices.

### Authentication

* JWT-based authentication
* Protected routes
* Authentication middleware
* User-specific API access

### Authorization

* Separate user and admin roles
* Admin authorization middleware
* Protected administrative APIs

### Password Security

* Password hashing with bcryptjs
* Passwords are not stored as plain text

### Payment Security

* Razorpay signature verification
* Server-side payment verification
* Private Razorpay credentials stored only in environment variables

### Order & Pricing Security

* Backend coupon validation
* Server-side discount calculation
* Server-side final payable amount calculation
* Stock validation
* User-specific order access

> Client-side values such as price, discount, payment status, or stock availability must not be trusted as the final source of truth. The backend validates sensitive operations before processing them.

---

# 💰 Razorpay Payment Flow

The online payment flow follows a server-verified approach.

```text
Customer Checkout
       │
       ▼
Select Razorpay
       │
       ▼
Backend Payment Request
       │
       ▼
Create Razorpay Order
       │
       ▼
Razorpay Checkout
       │
       ▼
Customer Completes Payment
       │
       ▼
Payment Response
       │
       ▼
Backend Signature Verification
       │
       ▼
Payment Verified
       │
       ▼
Update Payment Details
       │
       ▼
Update Order Payment Status
```

Private Razorpay credentials are never exposed to the frontend.

---

# 🎟️ Coupon Processing Flow

Coupon processing is validated on the backend.

```text
Customer Applies Coupon
          │
          ▼
Backend Coupon Validation
          │
          ├── Coupon Exists?
          ├── Active?
          ├── Expired?
          ├── Minimum Order Met?
          └── Usage Limit Available?
          │
          ▼
Calculate Valid Discount
          │
          ▼
Calculate Final Payable Amount
          │
          ▼
Order / Payment Processing
```

This prevents users from manipulating discounts or final payable amounts through frontend requests.

---

# 🖼️ Image Upload Flow

Product image uploads are handled through the backend.

```text
Admin Product Form
        │
        ▼
Multipart File Upload
        │
        ▼
Multer Middleware
        │
        ▼
Cloudinary Storage
        │
        ▼
Image URL
        │
        ▼
Product Data
```

Uploaded files and local upload directories are excluded from the GitHub repository.

---

# 📊 Admin Dashboard Data

The backend provides data used by the admin dashboard, including:

* Total Products
* Total Categories
* Total Orders
* Total Users
* Total Reviews
* Total Revenue
* Pending Orders
* Delivered Orders
* Revenue Growth Data
* Order Growth Data
* Sales Data
* Order Status Distribution
* Recent Orders
* Recent Reviews
* Low Stock Products
* Top Selling Products

---

# 🧪 Development Structure

The backend is organized into separate layers:

```text
Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Models
  ↓
MongoDB
```

### Routes

Define API endpoints and connect them to middleware/controllers.

### Middleware

Handles authentication, authorization, file uploads, and error handling.

### Controllers

Contain request handling and application/business logic.

### Models

Define MongoDB schemas using Mongoose.

### Config

Contains database, Cloudinary, and Razorpay configuration.

### Utils

Contains reusable backend utility functionality.

This modular structure makes the backend easier to maintain, test, debug, and extend.

---

# 🗄️ Database

NexaCart uses **MongoDB** with **Mongoose**.

Major data models include:

* User
* Product
* Category
* Cart
* Wishlist
* Order
* Review
* Coupon
* Newsletter

The database connection is configured through the environment variable:

```env
MONGO_URI=your_mongodb_connection_string
```

---

# 🧹 Git & Repository Safety

The backend `.gitignore` excludes sensitive and unnecessary files such as:

```text
node_modules/
.env
.env.local
.env.*.local
uploads/
*.log
.vscode/
.idea/
```

This keeps the repository clean and prevents sensitive configuration and generated files from being committed.

---

# 🚀 Production Considerations

Before deploying the backend:

* Configure production MongoDB
* Configure production environment variables
* Use a strong JWT secret
* Keep Razorpay secret credentials private
* Configure Cloudinary credentials securely
* Configure production CORS
* Verify payment signature validation
* Test authentication and authorization
* Test coupon validation
* Test order and payment flows
* Disable development-only configuration where applicable
* Never commit `.env` files
* Run security and API testing before production deployment

---

# 📌 Future Improvements

Potential future improvements include:

* Automated API testing
* Integration and unit tests
* Swagger / OpenAPI API documentation
* Email notifications
* Automated invoices
* Advanced analytics
* Product recommendation engine
* Additional payment methods
* Advanced coupon rules
* Rate limiting
* Production logging and monitoring
* Performance optimization
* Production deployment automation

---

# 👨‍💻 Author

**Ayush Singh**

MCA Student & Full-Stack Developer

### Project

**NexaCart — Modern MERN E-Commerce Platform**

---

# 📄 License

This backend project is created for learning, development, portfolio, and demonstration purposes.

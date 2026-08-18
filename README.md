# NexaCart — Modern MERN E-Commerce Platform

NexaCart is a modern, full-stack e-commerce platform built with the **MERN stack**, designed to provide a complete and secure online shopping experience.

The platform includes customer authentication, product discovery, search and filtering, product variants, cart and wishlist management, reviews and ratings, coupons and discounts, checkout, Cash on Delivery (COD), Razorpay online payments, order management, Cloudinary image storage, customer support, newsletter functionality, and a dedicated admin dashboard.

NexaCart follows a modular frontend and backend architecture, making the project maintainable, scalable, and suitable for **full-stack development, portfolio demonstration, and real-world application development**.

---

## 📌 Project Overview

NexaCart is divided into two main applications:

* **Frontend** — React.js + Vite
* **Backend** — Node.js + Express.js + MongoDB

The frontend communicates with the backend through REST APIs using Axios.

```text
                    NexaCart
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
   React Frontend            Node.js Backend
      + Vite                   + Express.js
          │                         │
          │       REST APIs         │
          └────────────┬────────────┘
                       │
                       ▼
                   MongoDB
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
         Cloudinary           Razorpay
```

---

# ✨ Key Features

## 👤 Customer Features

Customers can:

* Create an account
* Login securely
* Authenticate using JWT
* Manage their profile
* Browse products
* Search products
* Get live search suggestions
* Filter products
* Sort products
* Paginate product results
* View product details
* View product image galleries
* Select product variants
* Select product colors
* Check product stock
* View product ratings
* Read product reviews
* Add products to cart
* Update cart quantities
* Remove products from cart
* Add products to wishlist
* Remove products from wishlist
* Apply coupons
* Receive applicable discounts
* Checkout products
* Pay using Cash on Delivery
* Pay using Razorpay
* Place orders
* View order history
* View order details
* View payment status
* View order status
* Submit product reviews
* Access customer support
* Access FAQ and Help Center
* View shipping, return, privacy, terms, and payment security information

---

# 👨‍💼 Admin Features

NexaCart includes a dedicated protected admin dashboard.

Administrators can:

* Login through protected admin authentication
* Access the admin dashboard
* View dashboard statistics
* Monitor sales data
* Monitor revenue data
* View order statistics
* Manage products
* Add products
* Edit products
* Delete products
* Manage product images
* Manage product variants
* Manage product stock
* Manage categories
* Manage orders
* Update order statuses
* Manage users
* Manage reviews
* Delete reviews
* Manage coupons
* Create coupons
* Update coupons
* Delete coupons
* Activate or manage coupons
* Monitor low-stock products
* View top-selling products
* View recent orders
* View recent reviews
* Manage admin profile
* Manage admin settings

---

# 🔐 Authentication & Authorization

NexaCart implements authentication and role-based authorization across the application.

### Authentication

* User registration
* User login
* JWT-based authentication
* Password hashing using bcryptjs
* Persistent authentication state
* Logout functionality
* Protected user routes
* Protected backend APIs

### Authorization

* User roles
* Admin roles
* Role-based access control
* Protected admin routes
* Admin authorization middleware
* User-specific data access

```text
User
 │
 ▼
Login / Register
 │
 ▼
JWT Authentication
 │
 ▼
Authentication Context
 │
 ▼
Protected Routes
 │
 ├── Customer Routes
 │
 └── Admin Routes
```

---

# 🛍️ Product Discovery & Management

NexaCart provides a complete product discovery and management system.

### Customer Product Experience

* Product listing
* Product search
* Live search suggestions
* Category filtering
* Product filtering
* Product sorting
* Product pagination
* Featured products
* Latest products
* Top-rated products
* Related products
* Product details
* Product image gallery
* Product variants
* Color variants
* Stock availability
* Product specifications
* Product ratings
* Product reviews
* Add to cart
* Add to wishlist

### Admin Product Management

* Create products
* Update products
* Delete products
* Manage product images
* Upload multiple images
* Manage product variants
* Assign variant images
* Manage stock
* Manage featured products
* Manage product information

---

# 🗂️ Category Management

NexaCart supports complete category management.

Administrators can:

* Create categories
* View categories
* Update categories
* Delete categories
* Manage category relationships

Customers can use categories for product discovery and filtering.

---

# 🛒 Shopping Cart

The shopping cart provides complete cart management functionality.

### Features

* Add products to cart
* Update product quantity
* Remove products
* Retrieve cart
* Calculate cart totals
* Validate stock
* Checkout cart products

```text
Product
   │
   ▼
Add to Cart
   │
   ▼
Cart
   │
   ├── Update Quantity
   ├── Remove Item
   └── Checkout
```

---

# ❤️ Wishlist

Customers can maintain a personal wishlist.

### Features

* Add products to wishlist
* Remove products from wishlist
* Retrieve wishlist
* Manage wishlist products
* Move from product discovery toward cart/checkout

Wishlist data is associated with the authenticated user.

---

# ⭐ Reviews & Ratings

NexaCart includes a product review and rating system.

### Customer Features

* Submit product reviews
* Submit product ratings
* View product reviews
* View product ratings

### Admin Features

* View reviews
* Manage reviews
* Delete reviews

---

# 🎟️ Coupons & Discounts

NexaCart includes a backend-validated coupon and discount system.

### Coupon Features

* Create coupons
* Update coupons
* Delete coupons
* Activate/manage coupons
* Percentage-based discounts
* Fixed-value discounts
* Minimum order amount
* Coupon expiry
* Usage limits
* Coupon usage tracking
* Coupon validation
* Backend discount calculation
* Secure final payable amount calculation

### Coupon Flow

```text
Customer Applies Coupon
          │
          ▼
Backend Validation
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
Checkout / Payment
```

> Coupon validation and final payable amount calculation are performed on the backend to reduce the risk of client-side price manipulation.

---

# 💳 Checkout & Payment System

NexaCart supports both **Cash on Delivery (COD)** and **Razorpay online payments**.

## Cash on Delivery

* COD checkout
* COD order placement
* Order confirmation
* COD order processing
* Order status management
* Delivery status tracking

## Razorpay

* Razorpay payment order creation
* Razorpay Checkout integration
* Razorpay Order ID handling
* Payment ID handling
* Payment status tracking
* Payment timestamp handling
* Razorpay signature verification
* Secure backend payment verification
* Paid order handling

Sensitive Razorpay operations and private credentials remain on the backend.

### Payment Flow

```text
Customer Checkout
       │
       ▼
Select Payment Method
       │
       ├──────────────────┐
       │                  │
       ▼                  ▼
      COD              Razorpay
       │                  │
       │                  ▼
       │          Create Payment Order
       │                  │
       │                  ▼
       │          Razorpay Checkout
       │                  │
       │                  ▼
       │          Payment Completed
       │                  │
       │                  ▼
       │        Backend Verification
       │                  │
       │                  ▼
       │          Payment Verified
       │                  │
       └─────────┬────────┘
                 ▼
          Create / Update Order
                 │
                 ▼
          Order Confirmation
```

---

# 📦 Order Management

NexaCart provides a complete order lifecycle.

### Customer Order Features

* Order creation
* Cart checkout
* Buy Now checkout
* Order history
* Order details
* User-specific order access
* Shipping address management
* Payment status display
* Order status display
* COD order processing
* Online payment order processing

### Admin Order Features

* View orders
* View order details
* Manage orders
* Update order status
* Monitor payment status
* Monitor order lifecycle

### Supported Order Statuses

Depending on the order lifecycle, the backend supports statuses such as:

* Pending
* Processing
* Shipped
* Delivered
* Cancelled

---

# ☁️ Cloudinary & Image Management

NexaCart uses **Cloudinary** for cloud-based product image storage.

The backend uses **Multer** for handling uploaded files before processing them through the configured Cloudinary storage system.

### Media Features

* Product image upload
* Multiple product images
* Product image gallery
* Product image management
* Variant image assignment
* Image preview
* Cloud-based image storage

### Supported Image Formats

```text
JPG
JPEG
PNG
WEBP
```

### Image Upload Flow

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
Cloudinary
        │
        ▼
Image URL
        │
        ▼
Product Data
```

---

# 📊 Admin Dashboard & Analytics

The admin dashboard provides centralized management and analytics data.

### Dashboard Statistics

* Total products
* Total categories
* Total orders
* Total users
* Total reviews
* Total revenue
* Pending orders
* Delivered orders
* Sales data
* Revenue growth data
* Order growth data
* Order status distribution
* Recent orders
* Recent reviews
* Low-stock products
* Top-selling products

---

# 📩 Customer Support & Newsletter

NexaCart also includes supporting customer-focused modules.

### Customer Support

* Customer support API
* Support request handling
* Help Center
* FAQ
* Help articles
* Feedback

### Newsletter

* Newsletter subscription
* Newsletter subscription management

### Informational Pages

* Shipping Policy
* Return Policy
* Privacy Policy
* Terms & Conditions
* Payment Security Information
* Licenses

---

# 🛠️ Technology Stack

## Frontend

| Technology        | Purpose                 |
| ----------------- | ----------------------- |
| React.js          | Frontend UI             |
| Vite              | Frontend build tool     |
| React Router      | Client-side routing     |
| Bootstrap         | UI framework            |
| React Bootstrap   | Bootstrap components    |
| Axios             | REST API communication  |
| React Icons       | UI icons                |
| React Toastify    | Notifications           |
| JavaScript (ES6+) | Application development |
| Custom CSS        | Application styling     |
| ESLint            | Code quality            |

## Backend

| Technology | Purpose                       |
| ---------- | ----------------------------- |
| Node.js    | JavaScript runtime            |
| Express.js | REST API framework            |
| MongoDB    | Database                      |
| Mongoose   | MongoDB ODM                   |
| JWT        | Authentication                |
| bcryptjs   | Password hashing              |
| Multer     | File upload handling          |
| CORS       | Cross-origin resource sharing |
| dotenv     | Environment configuration     |

## External Services

| Service    | Purpose                |
| ---------- | ---------------------- |
| Cloudinary | Product image storage  |
| Razorpay   | Online payment gateway |

---

# 🏗️ System Architecture

NexaCart follows a client-server architecture.

```text
                         NexaCart
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
      React Frontend                Express Backend
          + Vite                         │
             │                           │
             │       REST APIs            │
             └─────────────┬─────────────┘
                           │
                           ▼
                       MongoDB
                           │
                 ┌─────────┴─────────┐
                 │                   │
                 ▼                   ▼
             Cloudinary           Razorpay
```

---

# 🔄 Application Request Flow

The general application request flow is:

```text
Client
  │
  ▼
React Frontend
  │
  ▼
Axios Instance
  │
  ▼
Express Route
  │
  ▼
Authentication / Authorization Middleware
  │
  ▼
Controller
  │
  ▼
Mongoose Model
  │
  ▼
MongoDB
  │
  ▼
Controller Response
  │
  ▼
React Frontend
```

External services are integrated when required:

```text
Product Images ───────► Cloudinary

Online Payments ──────► Razorpay
```

---

# 🖥️ Frontend Architecture

The frontend follows a component-based React architecture.

```text
User / Admin
      │
      ▼
React Pages
      │
      ▼
Reusable Components
      │
      ▼
Context / Hooks
      │
      ▼
Service Layer
      │
      ▼
Axios Instance
      │
      ▼
NexaCart REST API
      │
      ▼
Backend
```

### Main Frontend Layers

* Components
* Pages
* Routes
* Context
* Hooks
* Services
* Constants
* Utilities
* Styles
* Assets

### Application State

NexaCart uses React Context for application-level state management.

```text
AuthContext
CartContext
WishlistContext
```

Supporting hooks include:

```text
useAuth()
useCart()
useWishlist()
```

---

# ⚙️ Backend Architecture

The backend follows a modular architecture.

```text
Routes
  │
  ▼
Middleware
  │
  ▼
Controllers
  │
  ▼
Models
  │
  ▼
MongoDB
```

### Routes

Define API endpoints and connect requests to the appropriate middleware and controllers.

### Middleware

Handles:

* Authentication
* Authorization
* Admin authorization
* File uploads
* Error handling

### Controllers

Contain request handling and application/business logic.

### Models

Define MongoDB schemas using Mongoose.

### Configuration

Contains configuration for:

* MongoDB
* Cloudinary
* Razorpay

### Utilities

Contains reusable backend utility functionality.

---

# 📁 Project Structure

The project is organized into separate frontend and backend applications.

```text
E-Commerce Website/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/
│   │   │
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── common/
│   │   │   ├── home/
│   │   │   ├── layout/
│   │   │   └── product/
│   │   │
│   │   ├── constants/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── user/
│   │   │
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/
│   │
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── razorpay.js
│   │
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── cartControllers.js
│   │   ├── categoryController.js
│   │   ├── couponController.js
│   │   ├── newsletterController.js
│   │   ├── orderControllers.js
│   │   ├── paymentControllers.js
│   │   ├── productController.js
│   │   ├── reviewControllers.js
│   │   ├── supportController.js
│   │   └── wishlistController.js
│   │
│   ├── middleware/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Category.js
│   │   ├── Coupon.js
│   │   ├── newsletterModel.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   ├── Review.js
│   │   ├── User.js
│   │   └── WishList.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── couponRoutes.js
│   │   ├── newsletterRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── productRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── supportRoutes.js
│   │   └── wishlistRoutes.js
│   │
│   ├── utils/
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── README.md
│
├── .gitignore
└── README.md
```

---

# 🔌 REST API Modules

The backend provides REST API modules for the major NexaCart features.

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

These modules handle:

* Authentication
* Products
* Categories
* Cart
* Wishlist
* Orders
* Reviews
* Payments
* Coupons
* Customer support
* Newsletter subscriptions
* Administrative operations

For detailed endpoint implementation, request/response structures, controllers, and routes, refer to the backend documentation.

---

# 🔑 Environment Variables

NexaCart uses environment variables for sensitive configuration.

**Never commit real `.env` files, API keys, database credentials, or private secrets to GitHub.**

Both applications provide `.env.example` files as configuration templates.

---

## Frontend Environment

Create:

```text
frontend/.env
```

Use:

```text
frontend/.env.example
```

as the reference.

Example:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Only client-safe/public configuration should be exposed to the frontend.

---

## Backend Environment

Create:

```text
backend/.env
```

Use:

```text
backend/.env.example
```

as the reference.

Example:

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

### Never Commit

The following must remain private:

```text
.env
MONGO_URI
JWT_SECRET
CLOUDINARY_API_SECRET
RAZORPAY_KEY_SECRET
```

> The real environment files should remain local and must never be pushed to GitHub.

---

# 🔒 Security Practices

NexaCart follows security-conscious development practices across the frontend and backend.

## Authentication Security

* JWT-based authentication
* Protected frontend routes
* Protected backend APIs
* Authentication middleware
* User-specific data access

## Authorization Security

* Separate customer and admin roles
* Role-based authorization
* Admin authorization middleware
* Protected administrative APIs

## Password Security

* Password hashing using bcryptjs
* Passwords are never stored as plain text

## Payment Security

* Razorpay signature verification
* Server-side payment verification
* Private Razorpay credentials stored through environment variables
* Sensitive payment operations handled by the backend

## Order & Pricing Security

* Backend coupon validation
* Server-side discount calculation
* Server-side final payable amount calculation
* Stock validation
* User-specific order access

> Frontend validation improves user experience but is not considered a trusted security boundary. Sensitive operations are validated by the backend.

---

# 🧹 Git & Repository Safety

The repository is configured to keep sensitive and generated files out of version control.

Typical ignored files include:

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

### Important

Never push:

```text
MongoDB credentials
JWT secrets
Cloudinary API secrets
Razorpay secret keys
Real environment files
```

The repository should contain:

```text
frontend/.env.example
backend/.env.example
```

instead of real environment files.

---

# ⚙️ Installation & Setup

## Prerequisites

Install the following before running NexaCart:

* Node.js
* npm
* Git
* MongoDB or MongoDB Atlas
* Cloudinary account
* Razorpay account for online payment testing

---

## 1. Clone the Repository

Clone the repository:

```bash
git clone <your-github-repository-url>
```

Navigate into the project:

```bash
cd <repository-folder>
```

---

## 2. Setup the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create the local environment file:

```text
backend/.env
```

Use:

```text
backend/.env.example
```

as the configuration reference.

Configure:

* MongoDB connection
* JWT secret
* Cloudinary credentials
* Razorpay credentials
* Server port

Start the backend:

```bash
npm run dev
```

The backend normally runs at:

```text
http://localhost:5000
```

The API base URL is:

```text
http://localhost:5000/api
```

---

## 3. Setup the Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env
```

using:

```text
frontend/.env.example
```

as the reference.

Example:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Start the frontend:

```bash
npm run dev
```

Vite will display the frontend development URL in the terminal.

---

# 🧪 Development Workflow

A typical NexaCart workflow looks like:

```text
Authentication
      │
      ▼
Product Discovery
      │
      ▼
Product Details
      │
      ▼
Cart / Wishlist
      │
      ▼
Coupon Application
      │
      ▼
Checkout
      │
      ├───────────────┐
      ▼               ▼
     COD           Razorpay
      │               │
      └───────┬───────┘
              ▼
        Order Creation
              │
              ▼
        Order Tracking
              │
              ▼
      Reviews & Ratings
              │
              ▼
       Admin Management
```

---

# 🧭 Frontend Routing

The frontend uses **React Router** for client-side navigation.

### Customer Routes

The application includes routes for:

* Home
* Products
* Product Details
* Login
* Register
* Cart
* Wishlist
* Checkout
* Orders
* Profile
* Help Center
* FAQ
* Contact Support
* Feedback
* Privacy Policy
* Terms & Conditions
* Shipping Policy
* Return Policy
* Payment Security
* Licenses

### Admin Routes

The admin panel includes routes for:

* Dashboard
* Products
* Add Product
* Edit Product
* Categories
* Orders
* Users
* Reviews
* Coupons
* Admin Profile
* Admin Settings

Protected routes prevent unauthorized users from accessing restricted pages.

---

# 🎨 UI / UX

NexaCart focuses on providing a modern, responsive, and consistent e-commerce experience.

### Design Highlights

* Premium NexaCart branding
* Modern product cards
* Responsive navigation
* Responsive product grids
* Interactive product galleries
* Product variant selection
* Clean checkout experience
* Responsive forms
* Toast notifications
* Dedicated admin dashboard
* Responsive tables
* Mobile-friendly layouts
* Consistent styling across customer and admin interfaces

### Responsive Support

The frontend is designed for:

* Desktop
* Laptop
* Tablet
* Mobile

Responsive styling is implemented using Bootstrap and custom CSS.

---

# 🧹 Code Quality

The frontend uses ESLint for code quality and consistency.

Run the frontend linter from the `frontend` directory:

```bash
npm run lint
```

Create a production frontend build with:

```bash
npm run build
```

Preview the production build with:

```bash
npm run preview
```

---

# 🗄️ Database

NexaCart uses **MongoDB** with **Mongoose**.

### Major Data Models

```text
User
Product
Category
Cart
Wishlist
Order
Review
Coupon
Newsletter
```

The MongoDB connection is configured using:

```env
MONGO_URI=your_mongodb_connection_string
```

---

# 📚 Detailed Documentation

The root README provides the complete project overview.

More detailed implementation documentation is maintained inside the respective applications.

### Frontend Documentation

```text
frontend/README.md
```

The frontend README contains detailed information about:

* React architecture
* Components
* Pages
* Context
* Hooks
* Services
* Routes
* Styling
* Frontend environment configuration
* Frontend setup

### Backend Documentation

```text
backend/README.md
```

The backend README contains detailed information about:

* API architecture
* Controllers
* Models
* Routes
* Middleware
* Authentication
* Authorization
* Payments
* Coupons
* Cloudinary
* Database
* Security
* Backend environment configuration
* Backend setup

---

# 🚀 Production Considerations

Before deploying NexaCart to production:

* Configure production environment variables
* Use a production MongoDB database
* Use a strong JWT secret
* Keep all private credentials outside source control
* Configure production CORS
* Configure the production frontend API URL
* Configure the production Razorpay public key
* Keep the Razorpay secret key on the backend only
* Configure Cloudinary securely
* Verify Razorpay payment signatures
* Test authentication and authorization
* Test coupon validation
* Test stock validation
* Test order workflows
* Test COD payments
* Test Razorpay payments
* Test protected admin routes
* Verify responsive layouts
* Run the frontend production build
* Add automated testing
* Add production logging and monitoring

---

# 📌 Future Improvements

Potential future enhancements include:

* Automated email notifications
* Automated invoices
* Advanced analytics
* Product recommendation engine
* Additional payment methods
* Advanced coupon rules
* Automated API testing
* Unit testing
* Integration testing
* Swagger / OpenAPI documentation
* Rate limiting
* Production monitoring
* Performance optimization
* Advanced customer analytics
* Deployment automation
* Progressive Web App (PWA) support
* Enhanced accessibility
* Improved personalized shopping features

---

# 💡 Project Highlights

NexaCart demonstrates a complete full-stack e-commerce workflow:

```text
Authentication
      ↓
Product Discovery
      ↓
Product Details
      ↓
Cart & Wishlist
      ↓
Coupons & Discounts
      ↓
Checkout
      ↓
COD / Razorpay
      ↓
Order Management
      ↓
Reviews & Ratings
      ↓
Admin Dashboard
      ↓
Store Management
```

The project combines:

* A modern React frontend
* A modular Node.js/Express backend
* MongoDB database integration
* JWT authentication
* Role-based authorization
* Cloudinary media storage
* Razorpay payment integration
* Backend-controlled pricing and coupon validation
* Customer and admin workflows
* Responsive UI/UX

---

# 👨‍💻 Author

**Ayush Singh**

MCA Student & Full-Stack Developer

### Project

**NexaCart — Modern MERN E-Commerce Platform**

---

# 📄 License

This project is created for **learning, development, portfolio, and demonstration purposes**.

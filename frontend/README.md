# NexaCart — Frontend

NexaCart is a modern, responsive, and feature-rich e-commerce frontend built with **React.js and Vite**.

The frontend provides a complete shopping experience including authentication, product discovery, search, filtering, sorting, product variants, reviews, cart and wishlist management, checkout, coupons, online payment integration, order management, customer support, and a dedicated admin dashboard.

It communicates with the NexaCart backend through REST APIs using Axios and provides separate user and administrator experiences.

---

## 🚀 Features

### 👤 Customer Features

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes
* User Profile Management
* Product Search
* Live Search Suggestions
* Product Filtering
* Product Sorting
* Product Pagination
* Product Details
* Product Image Gallery
* Product Variants
* Color Selection
* Stock Availability
* Product Ratings
* Product Reviews
* Shopping Cart
* Cart Quantity Management
* Wishlist
* Checkout
* Cash on Delivery (COD)
* Online Payment
* Coupon Application
* Discount Calculation
* Order Placement
* Order History
* Order Details
* Responsive User Interface
* Toast Notifications
* Customer Support
* FAQ
* Help Center
* Privacy Policy
* Terms & Conditions
* Shipping Policy
* Return Policy
* Payment Security Information

---

## 🛠️ Admin Features

The frontend includes a dedicated admin panel for managing the e-commerce platform.

* Admin Authentication
* Protected Admin Routes
* Admin Dashboard
* Dashboard Statistics
* Sales & Revenue Analytics
* Order Statistics
* Product Management
* Add Products
* Edit Products
* Delete Products
* Featured Product Management
* Product Image Management
* Product Variant Management
* Category Management
* Order Management
* Order Status Management
* User Management
* Review Management
* Review Deletion
* Coupon Management
* Create Coupons
* Update Coupons
* Delete Coupons
* Coupon Activation / Management
* Admin Profile
* Admin Settings
* Low Stock Monitoring
* Top Selling Products
* Recent Orders
* Recent Reviews
* Responsive Admin Interface

---

## 💳 Checkout & Payment

NexaCart provides a complete frontend checkout experience supporting both offline and online payment methods.

### Cash on Delivery

* COD Checkout
* Order Placement
* Order Confirmation
* Order Status Tracking

### Razorpay Online Payment

The frontend integrates with Razorpay for online payments.

* Razorpay Checkout Integration
* Payment Order Creation Request
* Razorpay Payment Flow
* Payment Response Handling
* Payment Status Handling
* Payment Success / Failure Feedback

> Payment verification and sensitive payment operations are handled by the backend. Private payment secrets must never be stored in the frontend.

---

## 🎟️ Coupon & Discount System

The frontend supports coupon-based discounts during checkout.

* Coupon Code Application
* Coupon Validation
* Percentage Discounts
* Fixed Discounts
* Minimum Order Validation
* Coupon Expiry Handling
* Usage Limit Handling
* Discount Display
* Updated Checkout Total

> Final coupon validation and payable amount calculation are performed by the backend for security.

---

## 🛍️ Product Experience

NexaCart provides a complete product browsing and discovery experience.

* Product Listing
* Product Search
* Search Suggestions
* Category Filtering
* Product Filtering
* Product Sorting
* Pagination
* Product Cards
* Product Rating Display
* Product Stock Display
* Product Variants
* Color Selection
* Product Image Gallery
* Related Products
* Product Reviews
* Product Specifications
* Add to Cart
* Add to Wishlist

---

## 🧾 Order Management

Customers can manage their orders through the frontend.

* Order Placement
* Order History
* Order Details
* Payment Status Display
* Order Status Display
* COD Orders
* Online Payment Orders
* Order Tracking Information

The admin interface provides order management functionality including order status updates.

---

## 🔐 Authentication & Authorization

The frontend implements authentication and route protection.

* User Registration
* User Login
* JWT Token Handling
* Authentication Context
* Protected User Routes
* Protected Admin Routes
* Admin Authorization
* Logout
* Persistent Authentication State

Authentication state is managed through React Context and supporting hooks/services.

---

# 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Bootstrap
* React Bootstrap
* Axios
* React Icons
* React Toastify
* Custom CSS
* JavaScript (ES6+)
* ESLint

### API Communication

* REST APIs
* Axios
* Axios Interceptors

### Payment

* Razorpay Checkout Integration

---

# 🏗️ Frontend Architecture

NexaCart follows a component-based React architecture.

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

The frontend is organized into reusable components, pages, contexts, hooks, services, routes, constants, utilities, and styles.

---

# 📁 Project Structure

```text
frontend/
│
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminLayout.jsx
│   │   │   └── AdminSidebar.jsx
│   │   │
│   │   ├── common/
│   │   │   └── ScrollToTop.jsx
│   │   │
│   │   ├── home/
│   │   ├── layout/
│   │   └── product/
│   │
│   ├── constants/
│   │   ├── api.js
│   │   └── routes.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   └── useWishlist.js
│   │
│   ├── pages/
│   │   ├── admin/
│   │   └── user/
│   │
│   ├── routes/
│   │   ├── AdminRoutes.jsx
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── services/
│   │   ├── adminService.js
│   │   ├── authService.js
│   │   ├── axiosInstance.js
│   │   ├── cartService.js
│   │   ├── categoryService.js
│   │   ├── couponService.js
│   │   ├── newsletterService.js
│   │   ├── orderService.js
│   │   ├── paymentService.js
│   │   ├── productService.js
│   │   ├── reviewService.js
│   │   ├── storageService.js
│   │   ├── supportService.js
│   │   └── wishlistService.js
│   │
│   ├── styles/
│   │   ├── admin.css
│   │   ├── auth.css
│   │   ├── cart.css
│   │   ├── checkout.css
│   │   ├── dashboard.css
│   │   ├── footer.css
│   │   ├── global.css
│   │   ├── help.css
│   │   ├── home.css
│   │   ├── navbar.css
│   │   ├── orders.css
│   │   ├── product-card.css
│   │   ├── product-details.css
│   │   ├── product-gallery.css
│   │   ├── product-reviews.css
│   │   ├── product-specifications.css
│   │   ├── product.css
│   │   ├── products-page.css
│   │   ├── profile.css
│   │   ├── related-products.css
│   │   └── wishlist.css
│   │
│   ├── utils/
│   │   ├── calculateRating.js
│   │   ├── fromatPrice.js
│   │   └── truncateText.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

# 🧩 Main Frontend Modules

### Authentication

```text
AuthContext
      ↓
Auth Hooks
      ↓
Auth Service
      ↓
Axios API
```

Handles user authentication, login state, logout, and protected access.

### Cart

```text
CartContext
      ↓
Cart Hooks
      ↓
Cart Service
      ↓
Backend API
```

Manages cart state and cart-related operations.

### Wishlist

```text
WishlistContext
      ↓
Wishlist Hooks
      ↓
Wishlist Service
      ↓
Backend API
```

Provides wishlist state and wishlist operations.

### Products

```text
Product Search
      ↓
Filters / Sort
      ↓
Product Grid
      ↓
Product Details
      ↓
Cart / Wishlist
```

### Checkout

```text
Cart
  ↓
Checkout
  ↓
Coupon
  ↓
Payment Method
  ├── COD
  └── Razorpay
  ↓
Order
```

---

# 🧭 Routing

The application uses **React Router** for client-side navigation.

Main route categories include:

### Customer Routes

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
* Terms
* Shipping Policy
* Return Policy
* Payment Security
* Licenses

### Admin Routes

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

Protected routes prevent unauthorized access to authenticated and administrative pages.

---

# 🔌 API & Service Layer

The frontend communicates with the backend through dedicated service modules.

```text
src/services/
```

Main service modules include:

* `authService.js`
* `productService.js`
* `categoryService.js`
* `cartService.js`
* `wishlistService.js`
* `orderService.js`
* `paymentService.js`
* `couponService.js`
* `reviewService.js`
* `adminService.js`
* `supportService.js`
* `newsletterService.js`
* `storageService.js`

The centralized Axios instance handles API communication and authentication-related request configuration.

---

# 🌐 Environment Variables

**Never commit your real `.env` file or API keys to GitHub.**

The repository should contain:

```text
.env.example
```

and your local development environment should use:

```text
.env
```

### Frontend Environment Configuration

Example:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Use the `.env.example` file as the template for your local `.env` file.

### Important Security Rule

Never expose private backend credentials in frontend environment variables.

Do **not** put the following in frontend code or public repositories:

```text
MONGO_URI
JWT_SECRET
RAZORPAY_KEY_SECRET
CLOUDINARY_API_SECRET
```

Only public/client-side configuration such as the Razorpay public key may be used by the frontend where required.

---

# ⚙️ Installation & Setup

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git
* NexaCart Backend

---

## 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

Navigate to the frontend directory:

```bash
cd frontend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a local `.env` file:

```text
frontend/.env
```

Use `.env.example` as the reference.

Example:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## 4. Start the Development Server

```bash
npm run dev
```

Vite will start the development server and display the local URL in the terminal.

---

## 5. Create a Production Build

```bash
npm run build
```

---

## 6. Preview the Production Build

```bash
npm run preview
```

---

# 🧹 Code Quality

The project uses ESLint for code-quality checks.

Run ESLint with:

```bash
npm run lint
```

The ESLint configuration is available in:

```text
eslint.config.js
```

---

# 🔒 Frontend Security Practices

The frontend follows security-conscious development practices including:

* Protected routes
* Admin route protection
* JWT-based authentication flow
* Centralized Axios configuration
* Environment variables for client-side configuration
* No hardcoded private backend credentials
* Backend-dependent validation for sensitive operations
* Backend validation for coupons and final order amounts
* Secure payment verification handled by the backend

> Frontend validation improves user experience but must never be considered a replacement for backend validation.

---

# 🎨 UI / UX

NexaCart is designed with a modern and responsive e-commerce interface.

### Design Highlights

* Premium NexaCart branding
* Modern product cards
* Responsive navigation
* Responsive product grids
* Interactive product galleries
* Product variant selection
* Clean checkout interface
* Responsive forms
* Toast notifications
* Dedicated admin dashboard
* Responsive tables
* Mobile-friendly layouts
* Consistent styling across customer and admin interfaces

---

# 📱 Responsive Design

The frontend is designed to work across different screen sizes, including:

* Desktop
* Laptop
* Tablet
* Mobile

Responsive styling is implemented through Bootstrap and custom CSS.

---

# 📊 State Management

NexaCart uses React Context for application-level state management.

### Authentication State

```text
AuthContext.jsx
```

### Cart State

```text
CartContext.jsx
```

### Wishlist State

```text
WishlistContext.jsx
```

Custom hooks provide convenient access to these contexts:

```text
useAuth()
useCart()
useWishlist()
```

---

# 🧰 Utility Functions

Reusable utility functions are located in:

```text
src/utils/
```

Current utilities include:

* Rating calculation
* Price formatting
* Text truncation

---

# 🖼️ Assets

Frontend assets are organized inside:

```text
src/assets/
```

The project includes branding assets, product/category images, and other visual resources used throughout the application.

---

# 🔗 Backend Integration

The frontend requires the NexaCart backend to be running for API-dependent functionality.

The frontend communicates with the backend through REST APIs.

```text
NexaCart Frontend
        │
        │ HTTP Requests
        ▼
NexaCart Backend
        │
        ├── Authentication
        ├── Products
        ├── Categories
        ├── Cart
        ├── Wishlist
        ├── Orders
        ├── Reviews
        ├── Coupons
        ├── Payments
        ├── Support
        └── Newsletter
```

For backend configuration and API documentation, refer to the backend README.

---

# 🚀 Production Considerations

Before deploying the frontend:

* Configure production API URL
* Configure production Razorpay public key
* Verify backend CORS configuration
* Run the production build
* Test authentication flows
* Test checkout and payment flows
* Test protected admin routes
* Verify responsive layouts
* Ensure `.env` is not committed
* Ensure production secrets remain on the backend

---

# 📌 Future Improvements

Potential future improvements include:

* Progressive Web App (PWA) support
* Advanced product recommendation UI
* Enhanced analytics visualizations
* Improved accessibility
* Advanced search experience
* More personalized shopping features
* Performance optimization
* Image lazy loading improvements
* Additional payment options
* Enhanced customer notification system

---

# 👨‍💻 Author

**Ayush Singh**

MCA Student & Full-Stack Developer

### Project

**NexaCart — Modern MERN E-Commerce Platform**

---

# 📄 License

This project is created for learning, development, portfolio, and demonstration purposes.

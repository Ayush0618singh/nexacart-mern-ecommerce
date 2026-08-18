import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";


// =====================================================
// LAYOUTS
// =====================================================

import Layout from "../components/layout/Layout";
import AdminLayout from "../components/admin/AdminLayout";
import ScrollToTop from "../components/common/ScrollToTop";


// =====================================================
// ADMIN PROTECTION
// =====================================================

import AdminRoute from "./AdminRoutes";


// =====================================================
// USER PAGES
// =====================================================

import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Products from "../pages/user/Products";
import ProductDetails from "../pages/user/ProductDetails";
import Cart from "../pages/user/Cart";
import Wishlist from "../pages/user/Wishlist";
import Checkout from "../pages/user/Checkout";
import Orders from "../pages/user/Orders";
import Profile from "../pages/user/Profile";

import HelpCenter from "../pages/user/HelpCenter";
import FAQ from "../pages/user/FAQ";
import ContactSupport from "../pages/user/ContactSupport";
import ShippingPolicy from "../pages/user/ShippingPolicy";
import ReturnPolicy from "../pages/user/ReturnPolicy";
import PaymentSecurity from "../pages/user/PaymentSecurity";
import PrivacyPolicy from "../pages/user/PrivacyPolicy";
import Terms from "../pages/user/Terms";
import Feedback from "../pages/user/Feedback";
import Licenses from "../pages/user/Licenses";

import HelpArticle from "../pages/user/HelpArticle";


// =====================================================
// ADMIN PAGES
// =====================================================

import Dashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/Products";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import Categories from "../pages/admin/Categories";
import AdminOrders from "../pages/admin/Orders";
import Users from "../pages/admin/Users";
import Reviews from "../pages/admin/Reviews";

import Coupons from "../pages/admin/Coupons";
import Settings from "../pages/admin/Settings";
import AdminProfile from "../pages/admin/AdminProfile";


function AppRoutes() {

    return (

        <BrowserRouter>

        <ScrollToTop />

            <Routes>

                {/* =================================================
                    USER ROUTES
                ================================================= */}

                <Route
                    path="/"
                    element={<Layout />}
                >

                    {/* HOME */}

                    <Route
                        index
                        element={<Home />}
                    />


                    {/* AUTHENTICATION */}

                    <Route
                        path="login"
                        element={<Login />}
                    />

                    <Route
                        path="register"
                        element={<Register />}
                    />


                    {/* PRODUCTS */}

                    <Route
                        path="products"
                        element={<Products />}
                    />

                    <Route
                        path="product/:id"
                        element={<ProductDetails />}
                    />


                    {/* CART */}

                    <Route
                        path="cart"
                        element={<Cart />}
                    />


                    {/* WISHLIST */}

                    <Route
                        path="wishlist"
                        element={<Wishlist />}
                    />


                    {/* CHECKOUT */}

                    <Route
                        path="checkout"
                        element={<Checkout />}
                    />


                    {/* ORDERS */}

                    <Route
                        path="orders"
                        element={<Orders />}
                    />


                    {/* PROFILE */}

                    <Route
                        path="profile"
                        element={<Profile />}
                    />

                </Route>

                {/* =================================================
                    HELP & INFORMATION
                ================================================= */}

                <Route
                    path="help"
                    element={<HelpCenter />}
                />

                <Route
                    path="faq"
                    element={<FAQ />}
                />

                <Route
                    path="contact-support"
                    element={<ContactSupport />}
                />

                <Route
                    path="shipping-policy"
                    element={<ShippingPolicy />}
                />

                <Route
                    path="return-policy"
                    element={<ReturnPolicy />}
                />

                <Route
                    path="payment-security"
                    element={<PaymentSecurity />}
                />

                <Route
                    path="privacy-policy"
                    element={<PrivacyPolicy />}
                />

                <Route
                    path="terms"
                    element={<Terms />}
                />

                <Route
                    path="feedback"
                    element={<Feedback />}
                />

                <Route
                    path="licenses"
                    element={<Licenses />}
                />

                <Route
                    path="help/article/:slug"
                    element={<HelpArticle />}
                />


                {/* =================================================
                    ADMIN ROUTES
                    IMPORTANT:
                    OUTSIDE USER LAYOUT
                ================================================= */}

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminLayout />
                        </AdminRoute>
                    }
                >

                    {/* DASHBOARD */}

                    <Route
                        path="dashboard"
                        element={<Dashboard />}
                    />


                    {/* PRODUCTS */}

                    <Route
                        path="products"
                        element={<AdminProducts />}
                    />


                    {/* ADD PRODUCT */}

                    <Route
                        path="product/add"
                        element={<AddProduct />}
                    />


                    {/* EDIT PRODUCT */}

                    <Route
                        path="product/edit/:id"
                        element={<EditProduct />}
                    />


                    {/* CATEGORIES */}

                    <Route
                        path="categories"
                        element={<Categories />}
                    />


                    {/* REVIEWS */}

                    <Route
                        path="reviews"
                        element={<Reviews />}
                    />

                    <Route
                        path="coupons"
                        element={<Coupons />}
                    />

                    <Route
                        path="settings"
                        element={<Settings />}
                    />

                    <Route
                        path="profile"
                        element={<AdminProfile />}
                    />


                    {/* ORDERS */}

                    <Route
                        path="orders"
                        element={<AdminOrders />}
                    />


                    {/* USERS */}

                    <Route
                        path="users"
                        element={<Users />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );
}


export default AppRoutes;
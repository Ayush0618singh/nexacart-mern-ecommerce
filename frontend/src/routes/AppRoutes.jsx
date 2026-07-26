import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

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
import Dashboard from "../pages/admin/Dashboard";
 

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* User Layout */}
                <Route  path= "/" element= {<Layout />}>

                    {/* Home Route */}
                    <Route index element={<Home />}/>

                    {/* Authentication */}
                    <Route path= "login" element={<Login />}/>
                    <Route path= "register" element={<Register />}/>

                     {/* Products */}
                    <Route path= "products" element={<Products />}/>
                    <Route path= "product/:id" element={<ProductDetails />}/>

                     {/* Cart & Wishlist */}
                    <Route path= "cart" element={<Cart/>}/>
                    <Route path= "wishlist" element={<Wishlist />}/>

                     {/* Checkout & Orders */}
                    <Route path= "checkout" element={<Checkout />}/>
                    <Route path= "orders" element={<Orders />}/>

                     {/* User Profile */}
                    <Route path= "profile" element={<Profile />}/>

                    <Route path="admin/dashboard" element={<Dashboard />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );

}

export default AppRoutes;
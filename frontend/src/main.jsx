// Import React
import React from "react";
import { ToastContainer } from "react-toastify";

import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";

import ReactDOM from "react-dom/client";

//Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

//Import Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

//Import Toastify CSS
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <WishlistProvider>

        <App />

        <ToastContainer
          position="top-right"
          autoClose={3000}
        />

      </WishlistProvider>
    </CartProvider>
  </AuthProvider>
);

import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
    return (
        <>
            {/* Top Navigation */}
            <Navbar />
            
            {/* Page Content */}
            <main className="container mt-4">
                
                <Outlet />
            </main>
            
            {/* Footer */}
            <Footer/>
        </>
    );
}

export default Layout;
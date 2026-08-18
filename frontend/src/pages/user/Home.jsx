import React, { useEffect, useState } from "react";

import HeroSection from "../../components/home/HeroSection";
import CategorySection from "../../components/home/CategorySection";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import LatestProducts from "../../components/home/LatestProducts";

import { getCategories } from "../../services/categoryService";

import TrustStrip from "../../components/home/TrustStrip";
import WhyChooseNexaCart from "../../components/home/WhyChooseNexaCart";

import {
    getFeaturedProducts,
    getLatestProducts,
} from "../../services/productService";

import { toast } from "react-toastify";

import "../../styles/home.css";

function Home() {

    const [categories, setCategories] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHomeData = async () => {

        try {

            const [
                categoriesResponse,
                featuredResponse,
                latestResponse,
            ] = await Promise.all([
                getCategories(),
                getFeaturedProducts(),
                getLatestProducts(),
            ]);

            setCategories(
                categoriesResponse.data.categories
            );

            setFeaturedProducts(
                featuredResponse.data.products
            );

            setLatestProducts(
                latestResponse.data.products
            );

        } catch (error) {

            console.error(error);

            toast.error("Failed to load Home Page");

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchHomeData();

    }, []);

    if (loading) {

        return (
            <div className="home-page">

                <div className="container text-center py-5">

                    <h3>Loading...</h3>

                </div>

            </div>
        );
    }

    return (

        <div className="home-page">

            <div className="home-container">

                <HeroSection />

                <TrustStrip />

                <CategorySection
                    categories={categories}
                />

                <FeaturedProducts
                    products={featuredProducts}
                />

                <WhyChooseNexaCart />

                <LatestProducts
                    products={latestProducts}
                />

            </div>

        </div>
    );
}

export default Home;
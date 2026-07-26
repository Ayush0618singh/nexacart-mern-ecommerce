import React, {useEffect, useState } from "react";

import HeroSection from "../../components/home/HeroSection";
import CategorySection from "../../components/home/CategorySection";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import LatestProducts from "../../components/home/LatestProducts";
import OfferBanner from "../../components/home/OfferBanner";
import Newsletter from "../../components/home/Newsletter";

import { getCategories } from "../../services/categoryService";
import {
    getFeaturedProducts,
    getLatestProducts,

} from "../../services/productService";

import { toast } from "react-toastify";

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

            setCategories(categoriesResponse.data.categories);

            setFeaturedProducts(featuredResponse.data.products);

            setLatestProducts(latestResponse.data.products);

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
            <div className="container text-center my-5">
                <h3>Loading..</h3>
            </div>
        );
    }
    return (
        <>
            <HeroSection /> 
            
            <CategorySection
                categories={categories}
             />
            
            <FeaturedProducts 
                products={featuredProducts}
            />
            
            <LatestProducts
                products={latestProducts}
             />
            
            <OfferBanner />
            
            <Newsletter />
        </>

    );
}

export default Home;
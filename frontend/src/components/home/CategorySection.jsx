import React from "react";
import { Link } from "react-router-dom";

import booksImage from "../../assets/images/books.png";
import footwearImage from "../../assets/images/footwear.png";
import mensImage from "../../assets/images/mens.png";
import womensImage from "../../assets/images/womens.png";
import electronicsImage from "../../assets/images/electronics.png";
import cricketImage from "../../assets/images/cricket.png";


function CategorySection({ categories = [] }) {

    // =====================================================
    // DESIRED CATEGORY ORDER
    // =====================================================

    const desiredCategories = [
        {
            label: "Books",
            keywords: [
                "book",
                "books",
                "novel",
                "novels",
                "reading",
                "literature"
            ],
            icon: booksImage,
        },
        {
            label: "Footwear",
            keywords: [
                "footwear",
                "shoe",
                "shoes",
                "slipper",
                "slippers",
                "sneaker",
                "sneakers",
                "sandals",
                "sandal",
                "boots",
                "boot"
            ],
            icon: footwearImage,
        },
        {
            label: "Men's",
            keywords: [
                "men",
                "men's",
                "mens",
                "male",
                "man"
            ],
            icon: mensImage,
            },
            {
            label: "Women's",
            keywords: [
                "women",
                "women's",
                "womens",
                "woman",
                "ladies",
                "female"
            ],
            icon: womensImage,
        },
        {
            label: "Electronics",
            keywords: [
                "electronics",
                "electronic",
                "mobile",
                "mobiles",
                "phone",
                "smartphone",
                "iphone",
                "android",
                "laptop",
                "computer",
                "tablet",
                "ipad",
                "tv",
                "television",
                "smart tv",
                "watch",
                "smartwatch",
                "earbuds",
                "airpods",
                "headphones",
                "speaker",
                "charger",
                "camera"
            ],
            icon: electronicsImage,
        },
        {
            label: "Cricket",
            keywords: [
                "cricket",
                "sports",
                "bat",
                "cricket bat",
                "ball",
                "cricket ball",
                "wicket",
                "stumps",
                "helmet",
                "pads",
                "gloves",
                "kit",
                "sports accessories",
                "football",
                "badminton"
            ],
            icon: cricketImage,
        },
    ];


    // =====================================================
    // NORMALIZE CATEGORY NAME
    // =====================================================

    const normalize = (value = "") => {
        return value
            .toLowerCase()
            .replace(/['’]/g, "")
            .replace(/[^a-z0-9]+/g, " ")
            .trim();
    };


    // =====================================================
    // MATCH BACKEND CATEGORIES
    // =====================================================

    const categoryItems =
        desiredCategories.map(
            (desiredCategory) => {

                const normalizedKeywords =
                    desiredCategory.keywords.map(
                        (keyword) =>
                            normalize(keyword)
                    );


                const matchedCategory =
                    categories.find(
                        (category) => {

                            const categoryName =
                                normalize(
                                    category?.name
                                );

                            // =========================================
                            // 1. EXACT CATEGORY NAME MATCH
                            // =========================================

                            if (
                                normalizedKeywords.includes(
                                    categoryName
                                )
                            ) {
                                return true;
                            }


                            // =========================================
                            // 2. WORD-BASED MATCH
                            // Prevents:
                            // "men" matching "women"
                            // =========================================

                            const categoryWords =
                                categoryName.split(" ");


                            return normalizedKeywords.some(
                                (keyword) => {

                                    return categoryWords.some(
                                        (word) =>
                                            word === keyword
                                    );

                                }
                            );

                        }
                    );


                return {

                    ...desiredCategory,

                    _id:
                        matchedCategory?._id ||
                        null,

                    actualName:
                        matchedCategory?.name ||
                        desiredCategory.label,

                };

            }
        );


    return (

        <section className="category-section">

            {/* =================================================
                HEADING
            ================================================= */}

            <div className="section-heading">

                <h2>
                    Shop By Category
                </h2>


                <Link to="/products">
                    View All Categories →
                </Link>

            </div>


            {/* =================================================
                CATEGORY GRID
            ================================================= */}

            <div className="category-grid">

                {categoryItems.map(
                    (category, index) => {

                        const categoryLink =
                            category._id
                                ? `/products?category=${category._id}`
                                : `/products?search=${encodeURIComponent(
                                      category.label
                                  )}`;


                        return (

                            <Link
                                to={categoryLink}
                                className="category-card"
                                key={`${category.label}-${index}`}
                            >

                                {/* CATEGORY IMAGE */}

                                <div className="category-icon">

                                    <img
                                        src={category.icon}
                                        alt={category.label}
                                    />

                                </div>


                                {/* CATEGORY CONTENT */}

                                <div className="category-content">

                                    <h3>
                                        {category.label}
                                    </h3>

                                    <span>
                                        Explore Collection
                                    </span>

                                </div>

                            </Link>

                        );
                    }
                )}

            </div>

        </section>
    );
}


export default CategorySection;
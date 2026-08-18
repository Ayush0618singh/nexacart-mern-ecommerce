import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import one8Image from "../../assets/images/one8.webp";

function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [

        // =====================================================
        // 1. BOOK
        // =====================================================

        {
            eyebrow:
                "FOR EVERY CURIOUS MIND",

            title:
                "Read More,",

            highlight:
                "Discover More",

            description:
                "Explore inspiring books and timeless ideas that make every reading experience meaningful.",

            primaryButton:
                "Explore Books",

            secondaryButton:
                "View Products",

            link:
                "/products",

            image:
                "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1600&q=90",

            imageAlt:
                "Books and reading collection",
        },


        // =====================================================
        // 2. SHOES
        // =====================================================

        {
            eyebrow:
                "NEXACART PREMIUM COLLECTION",

            title:
                "Discover",

            highlight:
                "Better Choices",

            description:
                "Explore thoughtfully selected fashion, electronics, accessories and everyday essentials in one premium shopping experience.",

            primaryButton:
                "Explore Products",

            secondaryButton:
                "Browse Collection",

            link:
                "/products",

            image:
                one8Image,

            imageAlt:
                "Premium shoes collection",
        },


        // =====================================================
        // 3. WATCH
        // =====================================================

        {
            eyebrow:
                "SMARTER TECHNOLOGY",

            title:
                "Upgrade Your",

            highlight:
                "Everyday",

            description:
                "Discover smart watches, audio, mobiles and modern technology designed to fit your lifestyle.",

            primaryButton:
                "Explore Electronics",

            secondaryButton:
                "View Collection",

            link:
                "/products",

            image:
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=90",

            imageAlt:
                "Premium smart watch",
        },


        // =====================================================
        // 4. CLOTHES
        // =====================================================

        {
            eyebrow:
                "MODERN STYLE",

            title:
                "Style That",

            highlight:
                "Feels Like You",

            description:
                "Discover fashion and accessories that bring effortless style to your everyday look.",

            primaryButton:
                "Explore Fashion",

            secondaryButton:
                "View Collection",

            link:
                "/products",

            image:
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=90",

            imageAlt:
                "Modern fashion collection",
        },

    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(
                (prev) => (prev + 1) % slides.length
            );
        }, 4500);

        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide(
            (prev) => (prev + 1) % slides.length
        );
    };

    const prevSlide = () => {
        setCurrentSlide(
            (prev) =>
                (prev - 1 + slides.length) %
                slides.length
        );
    };

    const slide = slides[currentSlide];

    return (
        <section className="home-hero">
            <div className="hero-slider">
                <div className="hero-image">
                    <img
                        key={slide.image}
                        src={slide.image}
                        alt={slide.imageAlt}
                    />

                    <div className="hero-image-overlay" />
                </div>

                <div className="hero-content">
                    <div className="hero-text">
                        <span className="hero-eyebrow">
                            {slide.eyebrow}
                        </span>

                        <h1>
                            {slide.title}{" "}
                            <span>{slide.highlight}</span>
                        </h1>

                        <p>{slide.description}</p>

                        <div className="hero-actions">
                            <Link
                                to={slide.link}
                                className="hero-btn"
                            >
                                {slide.primaryButton}
                                <span>→</span>
                            </Link>

                            <Link
                                to="/products"
                                className="hero-secondary-btn"
                            >
                                {slide.secondaryButton}
                            </Link>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className="hero-arrow hero-arrow-left"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                >
                    ‹
                </button>

                <button
                    type="button"
                    className="hero-arrow hero-arrow-right"
                    onClick={nextSlide}
                    aria-label="Next slide"
                >
                    ›
                </button>

                <div className="hero-dots">
                    {slides.map((_, index) => (
                        <button
                            type="button"
                            key={index}
                            className={
                                currentSlide === index
                                    ? "hero-dot active"
                                    : "hero-dot"
                            }
                            onClick={() =>
                                setCurrentSlide(index)
                            }
                            aria-label={`Go to slide ${
                                index + 1
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
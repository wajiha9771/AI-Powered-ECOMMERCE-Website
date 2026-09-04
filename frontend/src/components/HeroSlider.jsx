import React, { useState, useEffect } from "react";
import { useCMS } from "../hooks/useCMS";
import { Link } from "react-router-dom";
import "./HeroSlider.css";
import SlideImage1 from "../assets/slide4.png";
import SlideImage2 from "../assets/slide5.png";
import SlideImage3 from "../assets/slide6.png";

const fallbackStaticData = [
  {
    id: 1,
    imageUrl: SlideImage1,
    subtitle: "NEW COLLECTION 2025",
    title: "Elevate Your Style Define Your Look",
    description:
      "Discover the premium luxury outerwear collection. Tailored textures and modern silhouettes crafted for you.",
    buttonText: "Discover Blazers",
    secondaryButtonText: "Shop New Arrivals",
    positionMobile: "center top",
  },
  {
    id: 2,
    imageUrl: SlideImage2,
    subtitle: "WARDROBE ESSENTIALS",
    title: "Chic Everyday Trendy Vibes",
    description:
      "Upgrade your seasonal essentials closet. High-quality foundational garments built for daily rotation.",
    buttonText: "Shop Essentials",
    secondaryButtonText: "Discover New Arrivals",
    positionMobile: "center center",
  },
  {
    id: 3,
    imageUrl: SlideImage3,
    subtitle: "LITTLE TRENDSETTERS",
    title: "Playful Comfort Modern Fits",
    description:
      "Super comfortable, bright, and stylish outfits designed with premium durable fabrics for your kids.",
    buttonText: "Shop Kids Collection",
    secondaryButtonText: "Explore New Arrivals",
    positionMobile: "center top",
  },
];

const HeroSlider = () => {
  const { data: cmsData, isLoading } = useCMS();

  const dbSliders = cmsData?.heroSliders;
  const activeSlides = dbSliders?.length > 0 ? dbSliders : fallbackStaticData;

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = activeSlides?.length || 0;

  useEffect(() => {
    if (slideLength === 0) return;

    const autoScroll = setInterval(() => {
      setCurrentSlide((prev) => (prev === slideLength - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(autoScroll);
  }, [currentSlide, slideLength]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slideLength - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slideLength - 1 : prev - 1));
  };

  if (isLoading) {
    return (
      <div className="hero-loading-wrapper">
        <div className="hero-loading">Loading Dynamic Sliders... ⏳</div>
      </div>
    );
  }

  return (
    <div className="slider-container">
      <div className="hero-slider-wrapper">
        {/* Previous Arrow */}
        <button
          type="button"
          className="arrow prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ❮
        </button>

        {/* Next Arrow */}
        <button
          type="button"
          className="arrow next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          ❯
        </button>

        {/* Slides */}
        {activeSlides.map((slide, index) => {
          const isCurrent = index === currentSlide;

          return (
            <div
              className={isCurrent ? "slide current" : "slide"}
              key={slide?._id || slide?.id || index}
            >
              {isCurrent && (
                <div className="hero-slide-content">
                  {/* Left: Text Content */}
                  <div className="slider-content">
                    <span className="slider-subtitle">
                      {slide?.subtitle || "NEW COLLECTION 2025"}
                    </span>

                    <h1 className="slider-title">
                      {slide?.title || "Elevate Your Style Define Your Look"}
                    </h1>

                    <p className="slider-description">
                      {slide?.description ||
                        "Discover the latest trends in fashion. Premium quality, stylish designs, crafted for you."}
                    </p>

                    {/* Slider Buttons */}
                    <div className="slider-buttons">
                      <Link to="/arrival" className="inline-block">
                        <button type="button" className="cta-button">
                          {slide?.buttonText || "Shop Now"}
                        </button>
                      </Link>

                      <Link to="/arrival" className="inline-block">
                        <button type="button" className="cta-button-secondary">
                          {slide?.secondaryButtonText || "Explore Collection"}
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="slider-image-wrapper">
                    <img
                      src={slide?.imageUrl || SlideImage1}
                      alt={slide?.title || "Slide"}
                      className="slider-image"
                      style={{
                        "--mobile-pos": slide?.positionMobile || "center top",
                      }}
                      onError={(e) => {
                        e.target.src = SlideImage1;
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Slider Dots */}
        <div className="dots-container">
          {activeSlides.map((_, index) => (
            <button
              type="button"
              key={index}
              className={index === currentSlide ? "dot active" : "dot"}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;

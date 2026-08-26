import React, { useState, useEffect } from "react";
import { useCMS } from "../hooks/useCMS";
import { Link } from "react-router-dom";
import "./HeroSlider.css";
import SlideImage1 from "../assets/slide1.jpg";
import SlideImage2 from "../assets/slide2.jpg";
import SlideImage3 from "../assets/slide3.jpg";

const fallbackStaticData = [
  {
    id: 1,
    imageUrl: SlideImage1,
    title: "Elegance Redefined",
    subtitle:
      "Discover the premium exclusive Women Luxury Collection with flat 30% off.",
    buttonText: "View Girls Collection",
    positionMobile: "center top",
  },
  {
    id: 2,
    imageUrl: SlideImage2,
    title: "Playful Little Trendsetters",
    subtitle:
      "Super comfortable, bright, and stylish outfits designed for your kids.",
    buttonText: "Explore Kids Wear",
    positionMobile: "right top",
  },
  {
    id: 3,
    imageUrl: SlideImage3,
    title: "Chic & Trendy Vibes",
    subtitle:
      "Upgrade your everyday look with our latest collection for teenage girls.",
    buttonText: "View Women Wear",
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
      nextSlide();
    }, 5000);
    return () => clearInterval(autoScroll);
  }, [currentSlide, slideLength]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slideLength - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slideLength - 1 : prev - 1));
  };

  if (isLoading)
    return (
      <div className="slider-container loading">
        Loading Dynamic Sliders... ⏳
      </div>
    );

  return (
    <div className="slider-container">
      <button className="arrow prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="arrow next" onClick={nextSlide}>
        ❯
      </button>

      {activeSlides.map((slide, index) => {
        const isCurrent = index === currentSlide;
        return (
          <div
            className={isCurrent ? "slide current" : "slide"}
            key={slide?._id || slide?.id || index}
          >
            {isCurrent && (
              <>
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
                <div className="slider-content">
                  <h2>{slide?.title || "Premium Quality"}</h2>
                  <p>
                    {slide?.subtitle ||
                      "Exclusive lifestyle trends collection."}
                  </p>
                  <Link to={slide?.linkTo || "/women"} className="inline-block">
                    <button className="cta-button">
                      {slide?.buttonText || "Explore Now"}
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        );
      })}

      <div className="dots-container">
        {activeSlides.map((_, index) => (
          <span
            key={index}
            className={index === currentSlide ? "dot active" : "dot"}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;

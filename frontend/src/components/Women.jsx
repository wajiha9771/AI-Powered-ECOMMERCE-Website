import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useProducts } from "../hooks/useProducts";
import "./ProductGrid.css";

export default function Women() {
  const { data: allProducts, isLoading, isError, error } = useProducts();
  const { addToCart } = useCart();
  const [activeImageIndexes, setActiveImageIndexes] = useState({});

  // Loading aur Error states
  if (isLoading)
    return (
      <div className="text-center p-10 font-bold">
        Women's Collection Loading... ⏳
      </div>
    );

  if (isError)
    return (
      <div className="text-center p-10 text-red-500 font-bold">
        Error: {error.message} ❌
      </div>
    );

  const womenProducts =
    allProducts?.filter((product) =>
      product.category?.toLowerCase().includes("women"),
    ) || [];

  const handleThumbHover = (productId, imgIndex) => {
    setActiveImageIndexes((prev) => ({
      ...prev,
      [productId]: imgIndex,
    }));
  };

  const handleAddToCartClick = (product) => {
    const rawPrice =
      typeof product.price === "string"
        ? parseFloat(product.price.replace("$", ""))
        : product.price;

    addToCart({
      ...product,
      price: rawPrice,
    });
  };

  return (
    <section className="products-section">
      <h2 className="section-title">Women's Collection</h2>

      <p className="section-subtitle">
        Premium international styles designed beautifully for Women.
      </p>

      <div className="products-grid">
        {womenProducts.map((product) => {
          const currentActiveIndex = activeImageIndexes[product._id] ?? 0;

          const currentImageSrc = product.images?.[currentActiveIndex] || "";

          return (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="product-card"
            >
              <div className="card-image-box">
                {product.badge && (
                  <span className="product-badge">{product.badge}</span>
                )}

                <img
                  src={currentImageSrc}
                  alt={product.name}
                  className="product-img"
                  onError={(e) => {
                    e.target.src = "image not available";
                  }}
                />

                <button
                  className="add-to-cart-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCartClick(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>

              <div className="product-gallery-frame">
                {product.images?.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className={`frame-thumb ${
                      idx === currentActiveIndex ? "active-frame" : ""
                    }`}
                    onMouseEnter={() => handleThumbHover(product._id, idx)}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      onError={(e) => {
                        e.target.src = "Image not Available";
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="card-details">
                <span className="product-cat">{product.category}</span>

                <h3 className="product-title">{product.name}</h3>

                <div className="product-price-box">
                  <span className="current-price">
                    {typeof product.price === "number"
                      ? `$${product.price}`
                      : product.price}
                  </span>

                  {product.oldPrice && (
                    <span className="old-price">
                      {typeof product.oldPrice === "number"
                        ? `$${product.oldPrice}`
                        : product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

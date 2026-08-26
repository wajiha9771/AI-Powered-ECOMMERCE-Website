import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useProducts } from "../hooks/useProducts";
import "./ProductGrid.css";

export default function FeaturedCollectionGrid() {
  const { data: products, isLoading, isError, error } = useProducts();
  const [activeImageIndexes, setActiveImageIndexes] = useState({});
  const { addToCart } = useCart();

  if (isLoading)
    return (
      <div className="text-center p-10 font-bold">Products Loading... ⏳</div>
    );
  if (isError)
    return (
      <div className="text-center p-10 text-red-500 font-bold">
        Error: {error.message} ❌
      </div>
    );
  const featuredProducts =
    products?.filter((product) => product?.isFeatured === true) || [];
  const handleThumbHover = (productId, imgIndex) => {
    setActiveImageIndexes((prev) => ({
      ...prev,
      [productId]: imgIndex,
    }));
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const numericPrice = Number(product.price);
    addToCart({ ...product, price: numericPrice });
  };

  return (
    <section className="products-section">
      <h2 className="section-title">Featured Collection</h2>
      <p className="section-subtitle">
        Premium International styles for the whole family.
      </p>

      <div className="products-grid">
        {featuredProducts.map((product) => {
          const currentActiveIndex = activeImageIndexes[product._id] ?? 0;
          const currentImageSrc =
            product.images?.[currentActiveIndex] || product.images?.[0];

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
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  Add to Cart
                </button>
              </div>
              <div className="card-details">
                <span className="product-cat">{product.category}</span>
                <h3 className="product-title">{product.name}</h3>
                <div className="product-price-box">
                  <span className="current-price">${product.price}</span>
                  {product.oldPrice && (
                    <span className="old-price">${product.oldPrice}</span>
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

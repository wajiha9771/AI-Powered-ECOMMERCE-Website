import React from "react";
import { useCart } from "../CartContext";
import "./ProductInfo.css";

const ProductInfo = ({ product, selectedSize, setSelectedSize }) => {
  const { addToCart } = useCart();

  const stock = Number(product.stock) || 0;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      alert("Sorry, this product is currently out of stock.");
      return;
    }

    if (!selectedSize) {
      alert("Please select a technical size configuration first.");
      return;
    }

    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: `${product.title} (${selectedSize})`,
      price: product.price,
      stock: stock,
      images:
        product.images && product.images.length > 0
          ? [product.images[0]]
          : ["https://placeholder.com"],
    });
  };

  return (
    <div className="info-container">
      <div>
        <span className="brand-badge">Nex-Style OutFit</span>

        <h1 className="product-main-title">{product.title}</h1>

        <p className="product-price">${product.price.toFixed(2)}</p>

        {/* STOCK STATUS */}
        <div
          style={{
            marginTop: "8px",
            marginBottom: "10px",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {isOutOfStock ? (
            <span style={{ color: "#dc2626" }}>● Out of Stock</span>
          ) : isLowStock ? (
            <span style={{ color: "#d97706" }}>
              ● Only {stock} left in stock
            </span>
          ) : (
            <span style={{ color: "#16a34a" }}>● In Stock</span>
          )}
        </div>
      </div>

      <div className="desc-divider">
        <p className="desc-text">{product.description}</p>
      </div>

      <div className="selector-matrix-box">
        <div>
          <h3 className="matrix-title">Sizing</h3>

          <div className="size-grid-frame">
            {product.sizes &&
              product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={isOutOfStock}
                  className={`size-btn ${
                    selectedSize === size ? "active-size" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="action-btn-wrapper">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="add-cart-btn"
          style={{
            opacity: isOutOfStock ? 0.55 : 1,
            cursor: isOutOfStock ? "not-allowed" : "pointer",
          }}
        >
          {isOutOfStock ? "Out of Stock" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;

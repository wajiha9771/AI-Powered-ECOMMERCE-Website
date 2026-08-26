import React from "react";
import { useCart } from "../CartContext";
import "./ProductInfo.css";

const ProductInfo = ({ product, selectedSize, setSelectedSize }) => {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a technical size configuration first.");
      return;
    }

    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: `${product.title} (${selectedSize})`,
      price: product.price,
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
        <button onClick={handleAddToCart} className="add-cart-btn">
          Add To Cart
        </button>
      </div>{" "}
    </div>
  );
};

export default ProductInfo;

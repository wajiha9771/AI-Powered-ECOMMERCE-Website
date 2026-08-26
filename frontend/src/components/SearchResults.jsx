import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAISearch } from "../hooks/useAISearch";
import { useTrackEvent } from "../hooks/useAnalytics";
import "./ProductGrid.css";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const { mutate: searchWithAI, isPending } = useAISearch();
  const { mutate: trackEvent } = useTrackEvent();
  const { addToCart } = useCart();
  useEffect(() => {
    if (!searchQuery.trim()) {
      setProducts([]);
      return;
    }

    searchWithAI(searchQuery, {
      onSuccess: (data) => {
        setProducts(data.products || []);

        trackEvent({
          eventType: "search",
          target: searchQuery,
          meta: `AI-powered search | Results: ${data.products?.length || 0}`,
        });
      },
      onError: (error) => {
        console.error("AI Search Error:", error);
        setProducts([]);
      },
    });
  }, [searchQuery, searchWithAI, trackEvent]);
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const numericPrice =
      typeof product.price === "string"
        ? parseFloat(product.price.replace("$", ""))
        : Number(product.price);
    addToCart({
      ...product,
      price: numericPrice,
    });
  };

  if (isPending) {
    return (
      <section className="products-section">
        <h2 className="section-title">AI Search</h2>
        <div className="text-center p-10 font-bold">
          🤖 Nex AI is finding the best products for you... ⏳
        </div>
      </section>
    );
  }

  return (
    <section className="products-section">
      <h2 className="section-title">Search Results</h2>
      {searchQuery && (
        <p className="section-subtitle">Results for: "{searchQuery}"</p>
      )}

      {products.length === 0 ? (
        <div className="text-center p-10 font-bold">
          No matching products found. 😔
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
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
                  src={product.images?.[0]}
                  alt={product.name}
                  className="product-img"
                  onError={(e) => {
                    e.target.style.display = "none";
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
          ))}
        </div>
      )}
    </section>
  );
}

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "./CartContext";
import { useTrackEvent } from "../hooks/useAnalytics";
import ImageGallery from "./products/ImageGallery";
import ProductInfo from "./products/ProductInfo";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const {
    data: products,
    isLoading: isProductsLoading,
    isError,
  } = useProducts();

  const { mutate: trackEvent } = useTrackEvent();
  const [selectedSize, setSelectedSize] = useState("");
  const [formattedProduct, setFormattedProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (products) {
      const foundProduct = products.find(
        (p) => p._id === id || p.id === parseInt(id),
      );

      if (foundProduct) {
        setSelectedSize("");
        const formatted = {
          id: foundProduct._id || foundProduct.id,
          title: foundProduct.name,
          name: foundProduct.name,
          price:
            typeof foundProduct.price === "number"
              ? foundProduct.price
              : parseFloat(foundProduct.price?.replace("$", "") || 0),
          description:
            foundProduct.description ||
            `Premium engineered ${foundProduct.name} from the elite ${foundProduct.category}. Designed with climate-adaptive fibers and futuristic aesthetics tailored for Nex-Style.`,
          images: foundProduct.images,
          sizes: ["XS", "S", "M", "L", "XL"],
        };
        setFormattedProduct(formatted);
        trackEvent({
          eventType: "click",
          target: foundProduct.name,
          meta: `Product detail viewed | Product ID: ${foundProduct._id || foundProduct.id}`,
        });
      } else {
        setFormattedProduct(null);
      }
    }
  }, [id, products, trackEvent]);

  if (isProductsLoading) {
    return (
      <div
        style={{
          color: "#ffffff",
          textAlign: "center",
          paddingTop: "100px",
        }}
      >
        Loading System Configuration... ⏳
      </div>
    );
  }
  if (isError || !formattedProduct) {
    return (
      <div
        style={{
          color: "#ffffff",
          textAlign: "center",
          paddingTop: "100px",
          fontFamily: "sans-serif",
        }}
      >
        <h2>Product Not Found</h2>
        <p>
        Unable to load Product.
        </p>
      </div>
    );
  }

  return (
    <div className="detail-page-wrapper">
      <div className="split-layout-matrix">
        <div className="left-gallery-span">
          <ImageGallery
            images={formattedProduct.images}
            title={formattedProduct.title}
          />
        </div>
        <div className="right-info-span">
          <ProductInfo
            product={formattedProduct}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            addToCart={addToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

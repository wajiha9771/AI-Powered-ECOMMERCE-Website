import React, { useState, useEffect } from "react";
import "./ImageGallery.css";

const ImageGallery = ({ images, title }) => {
  const initialImage = images && images.length > 0 ? images[0] : "";
  const [activeImg, setActiveImg] = useState(initialImage);
  const imagesList = images ? images : [];

  useEffect(() => {
    if (images && images.length > 0) {
      setActiveImg(images[0]);
    }
  }, [images]);

  return (
    <div className="gallery-container">
      <div className="thumbnails-sidebar">
        {imagesList.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImg(img)}
            className={`thumb-btn ${activeImg === img ? "active" : "inactive"}`}
          >
            <img src={img} alt="thumbnail" className="thumb-img" />
          </button>
        ))}
      </div>
      <div className="hero-display-frame">
        {activeImg ? (
          <img src={activeImg} alt={title} className="hero-img" />
        ) : (
          <div className="no-image-fallback">No Image</div>
        )}
        <div className="lab-badge">Nex-Style Laboratory Edition</div>
      </div>
    </div>
  );
};

export default ImageGallery;
